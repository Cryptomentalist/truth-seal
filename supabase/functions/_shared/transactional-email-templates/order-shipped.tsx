import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { OrderSummary } from './order-summary.tsx'
import type { OrderSummaryProps } from './order-summary.tsx'

interface Props extends OrderSummaryProps {
  name?: string
  orderNo?: string
  lang?: string
  trackingNumber?: string
  trackingUrl?: string
}

const isEn = (lang?: string) => (lang || 'pl').toLowerCase().startsWith('en')

const Email = ({ name, orderNo, lang, trackingNumber, trackingUrl, ...summary }: Props) => {
  const en = isEn(lang)
  const greeting = name ? (en ? `Hi ${name},` : `Cześć ${name},`) : en ? 'Hi,' : 'Cześć,'
  return (
    <Html lang={en ? 'en' : 'pl'} dir="ltr">
      <Head />
      <Preview>
        {en
          ? `Your order ${orderNo ?? ''} has been shipped`
          : `Twoje zamówienie ${orderNo ?? ''} zostało wysłane`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Konstelacja.org</Text>
          <Heading style={h1}>
            {en ? 'Your order has been shipped' : 'Twoje zamówienie zostało wysłane'}
          </Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            {en
              ? `Good news — your order ${orderNo ?? ''} has left our print partner and is on its way to you.`
              : `Dobra wiadomość — Twoje zamówienie ${orderNo ?? ''} opuściło drukarnię i jest w drodze do Ciebie.`}
          </Text>
          {trackingNumber ? (
            <Section style={box}>
              <Text style={label}>{en ? 'Tracking number' : 'Numer śledzenia'}</Text>
              <Text style={code}>{trackingNumber}</Text>
              {trackingUrl ? (
                <Link href={trackingUrl} style={link}>
                  {en ? 'Track your parcel' : 'Śledź przesyłkę'}
                </Link>
              ) : null}
            </Section>
          ) : (
            <Text style={muted}>
              {en
                ? 'We will send you the tracking number as soon as the carrier provides it.'
                : 'Numer śledzenia prześlemy, gdy tylko otrzymamy go od przewoźnika.'}
            </Text>
          )}
          <OrderSummary {...summary} en={en} />
          <Hr style={hr} />
          <Text style={muted}>
            {en
              ? 'Thank you for supporting our charitable mission.'
              : 'Dziękujemy za wsparcie naszej misji charytatywnej.'}
          </Text>
          <Text style={muted}>Fundacja Konstelacja.org · ul. Morska 30B/5, 84-240 Reda</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) =>
    isEn(data?.lang)
      ? `Your order ${data?.orderNo ?? ''} has been shipped`
      : `Zamówienie ${data?.orderNo ?? ''} zostało wysłane`,
  displayName: 'Order shipped',
  previewData: {
    name: 'Anna',
    orderNo: 'KON-2026-0001',
    lang: 'pl',
    trackingNumber: 'PL123456789',
    trackingUrl: 'https://example.com/track/PL123456789',
    items: [
      { name: 'Koszulka Konstelacja', qty: 1, price: 129 },
    ],
    subtotal: 129,
    shipping: 15,
    total: 144,
    currency: 'PLN',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '28px 26px', maxWidth: '560px' }
const brand = { fontSize: '13px', letterSpacing: '2px', color: '#0e7490', textTransform: 'uppercase' as const, margin: '0 0 8px' }
const h1 = { fontSize: '22px', color: '#0f172a', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '24px', color: '#1e293b', margin: '0 0 12px' }
const muted = { fontSize: '13px', lineHeight: '20px', color: '#64748b', margin: '0 0 8px' }
const box = { backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '16px 18px', margin: '16px 0' }
const label = { fontSize: '12px', color: '#64748b', margin: '0 0 4px', textTransform: 'uppercase' as const, letterSpacing: '1px' }
const code = { fontSize: '18px', color: '#0f172a', fontWeight: 700, margin: '0 0 8px' }
const link = { fontSize: '14px', color: '#0e7490' }
const hr = { borderColor: '#e2e8f0', margin: '20px 0' }
