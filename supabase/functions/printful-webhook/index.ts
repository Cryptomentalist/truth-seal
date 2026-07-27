import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

// Receives Printful webhook events, updates the order row and sends
// automatic customer notifications (shipped / tracking number).

const json = (data: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) return json({ error: 'Server configuration error' }, 500)

  // Optional shared-secret protection (?secret=... configured in Printful)
  const expectedSecret = Deno.env.get('PRINTFUL_WEBHOOK_SECRET')
  if (expectedSecret) {
    const provided = new URL(req.url).searchParams.get('secret')
    if (provided !== expectedSecret) return json({ error: 'Unauthorized' }, 401)
  }

  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const type = String(payload.type ?? '')
  // deno-lint-ignore no-explicit-any
  const data: any = payload.data ?? {}
  // deno-lint-ignore no-explicit-any
  const pfOrder: any = data.order ?? data.shipment?.order ?? {}
  // deno-lint-ignore no-explicit-any
  const shipment: any = data.shipment ?? {}

  const printfulOrderId = pfOrder.id ? String(pfOrder.id) : null
  const externalId = pfOrder.external_id ? String(pfOrder.external_id) : null
  if (!printfulOrderId && !externalId) return json({ ok: true, skipped: 'no order id' })

  const supabase = createClient(supabaseUrl, serviceKey)

  const query = supabase.from('shop_orders').select('*').limit(1)
  const { data: rows, error: findErr } = printfulOrderId
    ? await query.eq('printful_order_id', printfulOrderId)
    : await query.eq('order_no', externalId!)

  if (findErr) {
    console.error('Order lookup failed', findErr)
    return json({ error: 'Lookup failed' }, 500)
  }
  const order = rows?.[0]
  if (!order) return json({ ok: true, skipped: 'order not found' })

  const trackingNumber: string | null = shipment.tracking_number ?? null
  const trackingUrl: string | null = shipment.tracking_url ?? null

  const isShipmentEvent = type === 'package_shipped'
  const printfulStatus: string | null = pfOrder.status ?? (isShipmentEvent ? 'fulfilled' : null)
  const becomesShipped = isShipmentEvent || printfulStatus === 'fulfilled'

  const update: Record<string, unknown> = { printful_status: printfulStatus }
  if (becomesShipped) update.status = 'shipped'
  if (trackingNumber) update.tracking_number = trackingNumber
  if (trackingUrl) update.tracking_url = trackingUrl

  const { error: updateErr } = await supabase
    .from('shop_orders')
    .update(update)
    .eq('id', order.id)

  if (updateErr) {
    console.error('Order update failed', updateErr)
    return json({ error: 'Update failed' }, 500)
  }

  const templateData = {
    name: order.name,
    orderNo: order.order_no,
    lang: order.lang,
    trackingNumber: trackingNumber ?? order.tracking_number ?? undefined,
    trackingUrl: trackingUrl ?? order.tracking_url ?? undefined,
  }

  const sends: Promise<unknown>[] = []

  // 1. Status changed to "shipped"
  if (becomesShipped && order.status !== 'shipped') {
    sends.push(
      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'order-shipped',
          recipientEmail: order.email,
          idempotencyKey: `order-shipped-${order.id}`,
          templateData,
        },
      }),
    )
  }

  // 2. Tracking number became available (and wasn't sent before)
  if (trackingNumber && trackingNumber !== order.tracking_number) {
    sends.push(
      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'order-tracking',
          recipientEmail: order.email,
          idempotencyKey: `order-tracking-${order.id}-${trackingNumber}`,
          templateData: { ...templateData, trackingNumber },
        },
      }),
    )
  }

  const results = await Promise.allSettled(sends)
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('Notification send failed', r.reason)
  })

  return json({ ok: true, notifications: sends.length })
})
