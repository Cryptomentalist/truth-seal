const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken) {
    return (
      <div className="w-full bg-destructive/10 border-b border-destructive/30 px-4 py-2 text-center text-sm text-destructive">
        Płatności produkcyjne nie są jeszcze skonfigurowane — dokończ uruchomienie trybu live.
      </div>
    );
  }
  if (clientToken.startsWith("pk_test_")) {
    return (
      <div className="w-full bg-accent/20 border-b border-accent px-4 py-2 text-center text-sm text-foreground">
        Płatności w podglądzie działają w trybie testowym.
      </div>
    );
  }
  return null;
}

export default PaymentTestModeBanner;
