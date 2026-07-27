import * as React from 'npm:react@18.3.1'
import { Column, Hr, Row, Section, Text } from 'npm:@react-email/components@0.0.22'

export interface OrderItem {
  name?: string
  title?: string
  qty?: number
  quantity?: number
  price?: number
  currency?: string
}

export interface OrderSummaryProps {
  en?: boolean
  items?: OrderItem[]
  subtotal?: number
  shipping?: number
  total?: number
  currency?: string
  shippingMethod?: string
  street?: string
  zip?: string
  city?: string
}

const money = (value?: number, currency = 'PLN') =>
  typeof value === 'number' ? `${value.toFixed(2)} ${currency}` : '—'

export const OrderSummary = ({
  en,
  items = [],
  subtotal,
  shipping,
  total,
  currency = 'PLN',
  shippingMethod,
  street,
  zip,
  city,
}: OrderSummaryProps) => {
  if (!items.length && typeof total !== 'number') return null
  const address = [street, [zip, city].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  return (
    <Section style={wrap}>
      <Text style={heading}>{en ? 'Order summary' : 'Podsumowanie zamówienia'}</Text>
      {items.map((item, i) => (
        <Row key={i} style={row}>
          <Column style={cellLeft}>
            <Text style={itemText}>
              {(item.name ?? item.title ?? '—') + ' × ' + String(item.qty ?? item.quantity ?? 1)}
            </Text>
          </Column>
          <Column style={cellRight}>
            <Text style={itemText}>{money(item.price, item.currency ?? currency)}</Text>
          </Column>
        </Row>
      ))}
      {items.length ? <Hr style={hr} /> : null}
      <Row style={row}>
        <Column style={cellLeft}>
          <Text style={muted}>{en ? 'Subtotal' : 'Wartość produktów'}</Text>
        </Column>
        <Column style={cellRight}>
          <Text style={muted}>{money(subtotal, currency)}</Text>
        </Column>
      </Row>
      <Row style={row}>
        <Column style={cellLeft}>
          <Text style={muted}>
            {(en ? 'Shipping' : 'Dostawa') + (shippingMethod ? ` (${shippingMethod})` : '')}
          </Text>
        </Column>
        <Column style={cellRight}>
          <Text style={muted}>{money(shipping, currency)}</Text>
        </Column>
      </Row>
      <Row style={row}>
        <Column style={cellLeft}>
          <Text style={totalText}>{en ? 'Total' : 'Razem'}</Text>
        </Column>
        <Column style={cellRight}>
          <Text style={totalText}>{money(total, currency)}</Text>
        </Column>
      </Row>
      {address ? (
        <Text style={muted}>
          {(en ? 'Delivery address: ' : 'Adres dostawy: ') + address}
        </Text>
      ) : null}
    </Section>
  )
}

const wrap = { backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px 18px', margin: '16px 0' }
const heading = { fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#64748b', margin: '0 0 10px' }
const row = { width: '100%' }
const cellLeft = { textAlign: 'left' as const }
const cellRight = { textAlign: 'right' as const }
const itemText = { fontSize: '14px', color: '#1e293b', margin: '2px 0' }
const muted = { fontSize: '13px', color: '#64748b', margin: '2px 0' }
const totalText = { fontSize: '15px', color: '#0f172a', fontWeight: 700, margin: '6px 0 0' }
const hr = { borderColor: '#e2e8f0', margin: '10px 0' }
