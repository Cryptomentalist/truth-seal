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
import { ConsentFooter } from './consent-footer.tsx'

interface Props {
  name?: string
  orderNo?: string
  lang?: string
  retryUrl?: string
}

const isEn = (lang?: string) => (lang || 'pl').toLowerCase().startsWith('en')

const Email = ({ name, orderNo, lang, retryUrl }: Props) => {
  const en = isEn(lang)
  const greeting = name ? (en ? `Hi ${name},` : `Cześć ${name},`) : en ? 'Hi,' : 'Cześć,'
  return (
    <Html lang={en ? 'en' : 'pl'} dir="ltr">
      <Head />
      <Preview>
        {en
          ? `Payment for order ${orderNo ?? ''} did not go through`
          : `Płatność za zamówienie ${orderNo ?? ''} nie doszła do skutku`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Konstelacja.org</Text>
          <Heading style={h1}>
            {en ? 'Payment was not completed' : 'Płatność nie została zrealizowana'}
          </Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            {en
              ? `The payment for order ${orderNo ?? ''} was declined or left unfinished, so we have not started production. Nothing was charged.`
              : `Płatność za zamówienie ${orderNo ?? ''} została odrzucona lub nie została dokończona, więc nie rozpoczęliśmy realizacji. Nic nie zostało pobrane z Twojego konta.`}
          </Text>

          <Section style={box}>
            <Text style={label}>{en ? 'Order number' : 'Numer zamówienia'}</Text>
            <Text style={code}>{orderNo ?? '—'}</Text>
          </Section>

          {retryUrl ? (
            <Section style={{ textAlign: 'center' as const, margin: '20px 0' }}>
              <Button href={retryUrl} style={button}>
                {en ? 'Place the order again' : 'Złóż zamówienie ponownie'}
              </Button>
            </Section>
          ) : null}

          <Text style={muted}>
            {en
              ? 'If the amount was reserved by your bank, it will be released automatically within a few business days.'
              : 'Jeśli bank zablokował środki, zostaną one zwolnione automatycznie w ciągu kilku dni roboczych.'}
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
      ? `Payment not completed — order ${data?.orderNo ?? ''}`
      : `Płatność nieudana — zamówienie ${data?.orderNo ?? ''}`,
  displayName: 'Płatność nieudana',
  previewData: {
    name: 'Anna',
    orderNo: 'KON-2026-AB12CD',
    lang: 'pl',
    retryUrl: 'https://konstelacja.org/sklep',
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
