import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { validEmail } from '../_shared/customer-validation.ts'
import { testTemplateData, testWebhookPayload } from '../_shared/test-fixtures.ts'

// Narzędzia testowe dla administratora:
//  - action "send_test_email": wysyła wybrany szablon na wskazany adres
//  - action "simulate_webhook": odpala webhook Printful w trybie testowym
// Dostęp wyłącznie dla zalogowanego użytkownika z rolą "admin".

const json = (data: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const ALLOWED_TEMPLATES = ['order-shipped', 'order-tracking', 'order-confirmation']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_PUBLISHABLE_KEY')
  if (!supabaseUrl || !serviceKey || !anonKey) return json({ error: 'Server configuration error' }, 500)

  // --- Autoryzacja: ważny JWT + rola admin ---
  const authHeader = req.headers.get('Authorization') ?? ''
  if (!authHeader.startsWith('Bearer ')) return json({ error: 'Unauthorized' }, 401)

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: userData, error: userErr } = await userClient.auth.getUser()
  if (userErr || !userData?.user) return json({ error: 'Unauthorized' }, 401)

  const admin = createClient(supabaseUrl, serviceKey)
  const { data: isAdmin, error: roleErr } = await admin.rpc('has_role', {
    _user_id: userData.user.id,
    _role: 'admin',
  })
  if (roleErr) return json({ error: 'Role check failed' }, 500)
  if (!isAdmin) return json({ error: 'Forbidden' }, 403)

  // --- Payload ---
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const action = String(body.action ?? 'send_test_email')
  const lang = String(body.lang ?? 'pl') === 'en' ? 'en' : 'pl'
  const recipient = String(body.recipientEmail ?? userData.user.email ?? '').trim().toLowerCase()

  if (!validEmail(recipient)) return json({ error: 'invalid_email' }, 400)

  if (action === 'simulate_webhook') {
    const secret = Deno.env.get('PRINTFUL_WEBHOOK_SECRET')
    const target = `${supabaseUrl}/functions/v1/printful-webhook${secret ? `?secret=${encodeURIComponent(secret)}&test=1` : '?test=1'}`
    const res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${serviceKey}` },
      body: JSON.stringify({ ...testWebhookPayload(), testEmail: recipient, lang }),
    })
    const text = await res.text()
    let parsed: unknown = text
    try {
      parsed = JSON.parse(text)
    } catch { /* zostaw tekst */ }
    return json({ ok: res.ok, status: res.status, webhook: parsed as Record<string, unknown> })
  }

  if (action === 'resend_order_confirmation') {
    const orderNo = String(body.orderNo ?? '').trim().toUpperCase()
    if (!orderNo) return json({ error: 'missing_order_no' }, 400)

    const { data: order, error: orderErr } = await admin
      .from('shop_orders')
      .select('*')
      .eq('order_no', orderNo)
      .maybeSingle()

    if (orderErr) return json({ error: 'lookup_failed' }, 500)
    if (!order) return json({ error: 'order_not_found' }, 404)

    const items = Array.isArray(order.items) ? (order.items as Record<string, unknown>[]) : []
    const target = body.recipientEmail ? recipient : String(order.email ?? '').toLowerCase()
    if (!validEmail(target)) return json({ error: 'invalid_email' }, 400)

    const siteUrl = Deno.env.get('SITE_URL') ?? 'https://konstelacja.org'
    const { data: sendData, error: sendErr } = await admin.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'order-confirmation',
        recipientEmail: target,
        idempotencyKey: `order-confirmation-resend-${order.id}-${Date.now()}`,
        templateData: {
          name: order.name,
          orderNo: order.order_no,
          lang: order.lang,
          accountUrl: `${siteUrl}/konto`,
          hasDigital: items.some((i) => i?.type === 'digital' || i?.digital === true),
          items,
          subtotal: Number(order.subtotal || 0),
          shipping: Number(order.shipping || 0),
          total: Number(order.total || 0),
          currency: order.currency || 'PLN',
          shippingMethod: order.shipping_method,
          street: order.street,
          zip: order.zip,
          city: order.city,
        },
      },
    })

    if (sendErr) {
      console.error('Resend order confirmation failed', sendErr)
      return json({ error: 'send_failed', detail: String(sendErr.message ?? sendErr) }, 502)
    }

    await admin
      .from('shop_orders')
      .update({ confirmation_email_sent_at: new Date().toISOString() })
      .eq('id', order.id)

    return json({ ok: true, recipient: target, orderNo: order.order_no, result: sendData ?? null })
  }

  const templateName = String(body.templateName ?? 'order-shipped')
  if (!ALLOWED_TEMPLATES.includes(templateName)) return json({ error: 'unknown_template' }, 400)


  const { data, error } = await admin.functions.invoke('send-transactional-email', {
    body: {
      templateName,
      recipientEmail: recipient,
      idempotencyKey: `admin-test-${templateName}-${Date.now()}`,
      templateData: testTemplateData(lang as 'pl' | 'en'),
    },
  })

  if (error) {
    console.error('Test email failed', error)
    return json({ error: 'send_failed', detail: String(error.message ?? error) }, 502)
  }

  return json({ ok: true, recipient, templateName, result: data ?? null })
})
