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
  invoiceNumber?: string
  invoiceUrl?: string
  issuedAt?: string
}

const isEn = (lang?: string) => (lang || 'pl').toLowerCase().startsWith('en')

const Email = ({ name, orderNo, lang, invoiceNumber, invoiceUrl, issuedAt, ...summary }: Props) => {
  const en = isEn(lang)
  const greeting = name ? (en ? `Hi ${name},` : `Cześć ${name},`) : en ? 'Hi,' : 'Cześć,'
  return (
    <Html lang={en ? 'en' : 'pl'} dir="ltr">
      <Head />
      <Preview>
        {en
          ? `Invoice ${invoiceNumber ?? ''} for order ${orderNo ?? ''}`
          : `Faktura ${invoiceNumber ?? ''} do zamówienia ${orderNo ?? ''}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Konstelacja.org</Text>
          <Heading style={h1}>{en ? 'Your invoice is ready' : 'Twoja faktura jest gotowa'}</Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            {en
              ? `We've issued the invoice for your order ${orderNo ?? ''}. You can download the PDF at any time from your customer panel.`
              : `Wystawiliśmy fakturę do Twojego zamówienia ${orderNo ?? ''}. Plik PDF możesz w każdej chwili pobrać w panelu klienta.`}
          </Text>

          <Section style={box}>
            <Text style={label}>{en ? 'Invoice number' : 'Numer dokumentu'}</Text>
            <Text style={code}>{invoiceNumber ?? '—'}</Text>
            {issuedAt ? (
              <Text style={muted}>
                {(en ? 'Issue date: ' : 'Data wystawienia: ') + issuedAt}
              </Text>
            ) : null}
          </Section>

          {invoiceUrl ? (
            <Section style={{ textAlign: 'center' as const, margin: '20px 0' }}>
              <Button href={invoiceUrl} style={button}>
                {en ? 'Download invoice (PDF)' : 'Pobierz fakturę (PDF)'}
              </Button>
            </Section>
          ) : null}

          <OrderSummary en={en} {...summary} />

          <Text style={muted}>
            {en
              ? 'The download link opens your customer panel, where the invoice stays available.'
              : 'Link otwiera panel klienta, w którym faktura pozostaje dostępna do pobrania.'}
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
      ? `Invoice ${data?.invoiceNumber ?? ''} — Konstelacja.org`
      : `Faktura ${data?.invoiceNumber ?? ''} — Konstelacja.org`,
  displayName: 'Faktura wystawiona',
  previewData: {
    name: 'Anna',
    orderNo: 'KON-2026-AB12CD',
    invoiceNumber: 'FV/2026/0001',
    invoiceUrl: 'https://konstelacja.org/faktura/preview-token',
    issuedAt: '2026-07-27',
    lang: 'pl',
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
