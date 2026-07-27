import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { OrderSummary } from './order-summary.tsx'
import { ConsentFooter } from './consent-footer.tsx'
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
          ? `Tracking number for order ${orderNo ?? ''}`
          : `Numer śledzenia zamówienia ${orderNo ?? ''}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Konstelacja.org</Text>
          <Heading style={h1}>
            {en ? 'Your parcel can now be tracked' : 'Możesz już śledzić przesyłkę'}
          </Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            {en
              ? `The carrier has registered your order ${orderNo ?? ''}. Here is your tracking number:`
              : `Przewoźnik zarejestrował Twoje zamówienie ${orderNo ?? ''}. Oto numer śledzenia:`}
          </Text>
          <Section style={box}>
            <Text style={label}>{en ? 'Tracking number' : 'Numer śledzenia'}</Text>
            <Text style={code}>{trackingNumber ?? '—'}</Text>
          </Section>
          {trackingUrl ? (
            <Button href={trackingUrl} style={button}>
              {en ? 'Track your parcel' : 'Śledź przesyłkę'}
            </Button>
          ) : null}
          <OrderSummary {...summary} en={en} />
          <Hr style={hr} />
          <Text style={muted}>
            {en
              ? 'Delivery status can take a few hours to appear on the carrier site.'
              : 'Status doręczenia może pojawić się u przewoźnika po kilku godzinach.'}
          </Text>
          <ConsentFooter en={en} />

        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) =>
    isEn(data?.lang)
      ? `Tracking number for order ${data?.orderNo ?? ''}`
      : `Numer śledzenia zamówienia ${data?.orderNo ?? ''}`,
  displayName: 'Order tracking number',
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
const code = { fontSize: '18px', color: '#0f172a', fontWeight: 700, margin: '0' }
const button = { backgroundColor: '#0e7490', color: '#ffffff', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', textDecoration: 'none' }
const hr = { borderColor: '#e2e8f0', margin: '20px 0' }
