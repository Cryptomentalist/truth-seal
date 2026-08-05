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

export type ClubVariant = 'welcome' | 'payment_failed' | 'canceled' | 'expired'

interface Props {
  name?: string
  lang?: string
  variant?: ClubVariant
  /** Data, do której dostęp pozostaje aktywny (format lokalny, np. 12.08.2026). */
  accessUntil?: string
  actionUrl?: string
}

const isEn = (lang?: string) => (lang || 'pl').toLowerCase().startsWith('en')

const COPY: Record<ClubVariant, { pl: { h: string; p: string; cta: string }; en: { h: string; p: string; cta: string } }> = {
  welcome: {
    pl: {
      h: 'Witamy w Klubie Konstelacji',
      p: 'Dostęp jest już aktywny. W panelu klienta czeka cała biblioteka e-booków i przewodników — możesz pobierać je bez limitu przez cały okres subskrypcji.',
      cta: 'Otwórz bibliotekę',
    },
    en: {
      h: 'Welcome to the Konstelacja Club',
      p: 'Your access is active. The full library of e-books and guides is waiting in your customer panel — download as much as you like for as long as your membership runs.',
      cta: 'Open the library',
    },
  },
  payment_failed: {
    pl: {
      h: 'Nie udało się odnowić subskrypcji',
      p: 'Bank odrzucił płatność odnowieniową. Zaktualizuj metodę płatności w panelu subskrypcji — spróbujemy jeszcze kilka razy, zanim dostęp wygaśnie.',
      cta: 'Zaktualizuj płatność',
    },
    en: {
      h: 'We could not renew your membership',
      p: 'Your bank declined the renewal payment. Update your payment method in the subscription panel — we will retry a few more times before access expires.',
      cta: 'Update payment method',
    },
  },
  canceled: {
    pl: {
      h: 'Subskrypcja anulowana',
      p: 'Subskrypcja nie odnowi się automatycznie. Dostęp do biblioteki działa jeszcze do końca opłaconego okresu — nic nie tracisz z dnia na dzień.',
      cta: 'Wróć do Klubu',
    },
    en: {
      h: 'Membership canceled',
      p: 'Your membership will not renew automatically. Access to the library stays active until the end of the period you already paid for.',
      cta: 'Back to the Club',
    },
  },
  expired: {
    pl: {
      h: 'Dostęp do Klubu wygasł',
      p: 'Opłacony okres dobiegł końca, więc biblioteka jest już zamknięta. Zakupione wcześniej pojedyncze materiały nadal masz w panelu klienta.',
      cta: 'Odnów dostęp',
    },
    en: {
      h: 'Your Club access has expired',
      p: 'The paid period has ended, so the library is closed. Individual materials you bought separately remain in your customer panel.',
      cta: 'Renew access',
    },
  },
}

const SUBJECT: Record<ClubVariant, { pl: string; en: string }> = {
  welcome: { pl: 'Witamy w Klubie Konstelacji', en: 'Welcome to the Konstelacja Club' },
  payment_failed: { pl: 'Płatność za Klub nie przeszła', en: 'Club payment failed' },
  canceled: { pl: 'Subskrypcja Klubu anulowana', en: 'Club membership canceled' },
  expired: { pl: 'Dostęp do Klubu wygasł', en: 'Club access expired' },
}

const Email = ({ name, lang, variant = 'welcome', accessUntil, actionUrl }: Props) => {
  const en = isEn(lang)
  const copy = (COPY[variant] ?? COPY.welcome)[en ? 'en' : 'pl']
  const greeting = name ? (en ? `Hi ${name},` : `Cześć ${name},`) : en ? 'Hi,' : 'Cześć,'
  return (
    <Html lang={en ? 'en' : 'pl'} dir="ltr">
      <Head />
      <Preview>{copy.h}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>Konstelacja.org</Text>
          <Heading style={h1}>{copy.h}</Heading>
          <Text style={text}>{greeting}</Text>
          <Text style={text}>{copy.p}</Text>

          {accessUntil ? (
            <Section style={box}>
              <Text style={label}>{en ? 'Access active until' : 'Dostęp aktywny do'}</Text>
              <Text style={code}>{accessUntil}</Text>
            </Section>
          ) : null}

          {actionUrl ? (
            <Section style={{ textAlign: 'center' as const, margin: '20px 0' }}>
              <Button href={actionUrl} style={button}>
                {copy.cta}
              </Button>
            </Section>
          ) : null}

          <ConsentFooter en={en} />
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) => {
    const v = (data?.variant ?? 'welcome') as ClubVariant
    const s = SUBJECT[v] ?? SUBJECT.welcome
    return `${isEn(data?.lang) ? s.en : s.pl} — Konstelacja.org`
  },
  displayName: 'Klub — status subskrypcji',
  previewData: {
    name: 'Anna',
    lang: 'pl',
    variant: 'welcome',
    accessUntil: '12.08.2026',
    actionUrl: 'https://konstelacja.org/konto',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px' }
const brand = { fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#0891b2', margin: '0 0 8px' }
const h1 = { fontSize: '22px', color: '#0f172a', margin: '0 0 12px' }
const text = { fontSize: '15px', lineHeight: '24px', color: '#1e293b', margin: '0 0 10px' }
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
