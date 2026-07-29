import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment, hasPaymentsToken } from "@/lib/stripe";

export interface SubscriptionRow {
  id: string;
  price_id: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

/** Dostęp trwa do końca opłaconego okresu, także po anulowaniu. */
export function isSubscriptionActive(sub: SubscriptionRow | null): boolean {
  if (!sub) return false;
  const end = sub.current_period_end ? new Date(sub.current_period_end).getTime() : null;
  const notExpired = end === null || end > Date.now();
  if (["active", "trialing", "past_due"].includes(sub.status)) return notExpired;
  if (sub.status === "canceled") return end !== null && end > Date.now();
  return false;
}

export function useSubscription() {
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (userId: string) => {
    if (!hasPaymentsToken) {
      setSubscription(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("subscriptions")
      .select("id, price_id, status, current_period_end, cancel_at_period_end")
      .eq("user_id", userId)
      .eq("environment", getStripeEnvironment())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setSubscription((data as SubscriptionRow | null) ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (!s) {
        setSubscription(null);
        setLoading(false);
        return;
      }
      setTimeout(() => void load(s.user.id), 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) setLoading(false);
      else void load(data.session.user.id);
    });

    return () => sub.subscription.unsubscribe();
  }, [load]);

  useEffect(() => {
    if (!session) return;
    const userId = session.user.id;
    const channel = supabase
      .channel("subscriptions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${userId}` },
        () => void load(userId),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [session, load]);

  return {
    session,
    subscription,
    loading,
    isActive: isSubscriptionActive(subscription),
    refresh: () => (session ? load(session.user.id) : Promise.resolve()),
  };
}
