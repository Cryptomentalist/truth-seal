import * as React from 'npm:react@18.3.1'
import { Hr, Link, Text } from 'npm:@react-email/components@0.0.22'

interface Props {
  en?: boolean
  /** Powód otrzymania wiadomości (D5) — domyślnie: zamówienie w sklepie. */
  reason?: string
}

/**
 * Stopka zgodności (D1/D4/D5): tożsamość nadawcy, dane rejestrowe,
 * powód otrzymania wiadomości i link do polityki prywatności.
 * Link rezygnacji (unsubscribe) dokłada automatycznie system e-mail.
 */
export const ConsentFooter = ({ en, reason }: Props) => (
  <>
    <Hr style={hr} />
    <Text style={muted}>
      {reason ??
        (en
          ? 'You are receiving this message because you placed an order in the Konstelacja shop. It is a transactional message related to that order.'
          : 'Otrzymujesz tę wiadomość, ponieważ złożyłaś/eś zamówienie w sklepie Konstelacja. Jest to wiadomość transakcyjna dotycząca tego zamówienia.')}
    </Text>
    <Text style={muted}>
      {en
        ? 'Data controller: Fundacja Konstelacja.org, ul. Morska 30B/5, 84-240 Reda, Poland. We process your data to fulfil the order and, where you consented, to send news. You may withdraw consent at any time.'
        : 'Administrator danych: Fundacja Konstelacja.org, ul. Morska 30B/5, 84-240 Reda. Dane przetwarzamy w celu realizacji zamówienia, a jeśli wyraziłaś/eś zgodę — także w celu wysyłki informacji o projektach. Zgodę możesz wycofać w dowolnym momencie.'}
    </Text>
    <Text style={muted}>
      <Link href="https://konstelacja.org/polityka-prywatnosci" style={link}>
        {en ? 'Privacy policy' : 'Polityka prywatności'}
      </Link>
      {' · '}
      <Link href="https://konstelacja.org/sklep" style={link}>
        {en ? 'Shop rules' : 'Regulamin sklepu'}
      </Link>
      {' · '}
      <Link href="mailto:kontakt@konstelacja.org" style={link}>
        kontakt@konstelacja.org
      </Link>
    </Text>
  </>
)

const hr = { borderColor: '#E6E4DE', margin: '26px 0 16px' }
const muted = { fontSize: '11px', lineHeight: '18px', color: '#6B6B6B', margin: '0 0 8px' }
const link = { color: '#2C2C6B', textDecoration: 'underline' }
