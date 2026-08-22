REVOKE EXECUTE ON FUNCTION public.has_active_subscription(uuid, text) FROM authenticated;

DROP POLICY IF EXISTS "Admins can update puzzle briefs" ON public.puzzle_briefs;
CREATE POLICY "Admins can update puzzle briefs"
ON public.puzzle_briefs FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete puzzle briefs" ON public.puzzle_briefs;
CREATE POLICY "Admins can delete puzzle briefs"
ON public.puzzle_briefs FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));