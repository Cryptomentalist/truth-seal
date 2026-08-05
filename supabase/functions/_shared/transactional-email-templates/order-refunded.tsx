import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { ConsentFooter } from './consent-footer.tsx'

interface Props {
  name?: string
  orderNo?: string
  lang?: string
  amount?: number
  currency?: string
  partial?: boolean
}

const isEn = (lang?: string) => (lang || 'pl').toLowerCase().startsWith('en')

const money = (v?: number, c?: string) =>
  typeof v === 'number' ? `${v.toFixed(2).replace('.', ',')} ${c === 'PLN' || !c ? 'zł' : c}` : '—'

const Email = ({ name, orderNo, lang, amount, currency, partial }: Props) => {
  const en = isEn(lang)
  const greeting = name ? (en ? `Hi ${name},` : `Cześć ${name},`) : en ? 'Hi,' : 'Cześć,'
  return (
    <Html lang={en ? 'en' : 'pl'} dir="ltr">
      <Head />
      <Preview>
        {en ? `Refund for order ${orderNo ?? ''}` : `Zwrot za zamówienie ${orderNo ?? ''}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Konstelacja.org</Text>
          <Heading style={h1}>
            {partial
              ? en ? 'Partial refund processed' : 'Zwrot częściowy zrealizowany'
              : en ? 'Refund processed' : 'Zwrot zrealizowany'}
          </Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            {en
              ? `We have refunded your payment for order ${orderNo ?? ''}. Depending on your bank, the money should be back on your account within a few business days.`
              : `Zwróciliśmy płatność za zamówienie ${orderNo ?? ''}. W zależności od banku środki powinny wrócić na Twoje konto w ciągu kilku dni roboczych.`}
          </Text>

          <Section style={box}>
            <Text style={label}>{en ? 'Refunded amount' : 'Kwota zwrotu'}</Text>
            <Text style={code}>{money(amount, currency)}</Text>
            <Text style={muted}>
              {(en ? 'Order: ' : 'Zamówienie: ') + (orderNo ?? '—')}
            </Text>
          </Section>

          <Text style={muted}>
            {en
              ? 'Digital files you already unlocked stay available in your customer panel — consider them our thank you for the support.'
              : 'Materiały cyfrowe, które już odblokowałaś/eś, pozostają dostępne w panelu klienta — traktuj je jako nasze podziękowanie za wsparcie.'}
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
      ? `Refund processed — order ${data?.orderNo ?? ''}`
      : `Zwrot zrealizowany — zamówienie ${data?.orderNo ?? ''}`,
  displayName: 'Zwrot środków',
  previewData: {
    name: 'Anna',
    orderNo: 'KON-2026-AB12CD',
    lang: 'pl',
    amount: 145,
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
