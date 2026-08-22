import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";

interface Props {
  orderId: string;
  returnUrl: string;
}

/** Osadzony formularz płatności Stripe (BLIK, Przelewy24, karta, portfele). */
const ShopPayment = ({ orderId, returnUrl }: Props) => {
  const fetchClientSecret = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { orderId, returnUrl, environment: getStripeEnvironment() },
    });
    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("create-checkout failed:", details);
      throw new Error(details || "Nie udało się rozpocząć płatności.");
    }
    if (!data?.clientSecret) throw new Error("Nie udało się rozpocząć płatności.");
    return data.clientSecret as string;
  };

  return (
    <div id="checkout">
      {getStripeEnvironment() === "sandbox" && (
        <div
          style={{
            marginBottom: 12,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #E0C56B",
            background: "#FFF8E1",
            color: "#4A3B00",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          Tryb testowy płatności (podgląd). Prawdziwy kod BLIK z banku nie zadziała — bank nie
          wyśle potwierdzenia. Realne płatności BLIK działają na opublikowanej stronie
          konstelacja.org.
        </div>
      )}
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default ShopPayment;
