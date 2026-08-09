import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { OrderSummary } from './order-summary.tsx'
import type { OrderSummaryProps } from './order-summary.tsx'
import { ConsentFooter } from './consent-footer.tsx'

interface Props extends OrderSummaryProps {
  name?: string
  orderNo?: string
  lang?: string
  accountUrl?: string
  hasDigital?: boolean
}

const isEn = (lang?: string) => (lang || 'pl').toLowerCase().startsWith('en')

const Email = ({ name, orderNo, lang, accountUrl, hasDigital, ...summary }: Props) => {
  const en = isEn(lang)
  const greeting = name ? (en ? `Hi ${name},` : `Cześć ${name},`) : en ? 'Hi,' : 'Cześć,'
  return (
    <Html lang={en ? 'en' : 'pl'} dir="ltr">
      <Head />
      <Preview>
        {en
          ? `Payment confirmed — order ${orderNo ?? ''}`
          : `Płatność potwierdzona — zamówienie ${orderNo ?? ''}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Konstelacja.org</Text>
          <Heading style={h1}>
            {en ? 'Thank you for your purchase' : 'Dziękujemy za zakup'}
          </Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            {en
              ? `We've received your payment for order ${orderNo ?? ''}. We're getting it ready right now.`
              : `Otrzymaliśmy Twoją płatność za zamówienie ${orderNo ?? ''}. Właśnie zabieramy się do jego realizacji.`}
          </Text>

          <Section style={box}>
            <Text style={label}>{en ? 'Order number' : 'Numer zamówienia'}</Text>
            <Text style={code}>{orderNo ?? '—'}</Text>
          </Section>

          <OrderSummary en={en} {...summary} />

          {hasDigital ? (
            <Text style={text}>
              {en
                ? 'Digital files are available in your customer panel right away.'
                : 'Pliki cyfrowe są już dostępne do pobrania w panelu klienta.'}
            </Text>
          ) : null}

          {accountUrl ? (
            <Section style={{ textAlign: 'center' as const, margin: '20px 0' }}>
              <Button href={accountUrl} style={button}>
                {en ? 'Open customer panel' : 'Otwórz panel klienta'}
              </Button>
            </Section>
          ) : null}

          <Text style={muted}>
            {en
              ? 'The VAT invoice will arrive in a separate email once the document is issued.'
              : 'Fakturę wyślemy w osobnej wiadomości zaraz po wystawieniu dokumentu.'}
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
      ? `Order ${data?.orderNo ?? ''} confirmed — Konstelacja.org`
      : `Potwierdzenie zamówienia ${data?.orderNo ?? ''} — Konstelacja.org`,
  displayName: 'Potwierdzenie zakupu',
  previewData: {
    name: 'Anna',
    orderNo: 'KON-2026-AB12CD',
    lang: 'pl',
    accountUrl: 'https://konstelacja.org/konto',
    items: [{ name: 'Koszulka Konstelacja', qty: 1, price: 129 }],
    subtotal: 129,
    shipping: 16,
    total: 145,
    currency: 'PLN',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px' }
const brand = { fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#0891b2', margin: '0 0 8px' }
const h1 = { fontSize: '22px', color: '#0f172a', margin: '0 0 12px' }
const text = { fontSize: '15px', lineHeight: '24px', color: '#1e293b', margin: '0 0 10px' }
const muted = { fontSize: '13px', color: '#64748b', margin: '6px 0 0' }
const box = { backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px 18px', margin: '16px 0' }
const label = { fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#64748b', margin: '0 0 6px' }
const code = { fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }
const button = {
  backgroundColor: '#0891b2',
  color: '#ffffff',
  borderRadius: '8px',
  padding: '12px 22px',
  fontSize: '15px',
  fontWeight: 700,
  textDecoration: 'none',
}
