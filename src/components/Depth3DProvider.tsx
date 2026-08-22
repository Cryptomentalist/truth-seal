import { useEffect } from "react";

/**
 * Globalny, lekki system 3D: śledzi kursor nad kartami i ustawia zmienne CSS
 * (--tilt-x / --tilt-y / --mx / --my), z których korzystają utility w index.css.
 * Wyłączony na urządzeniach dotykowych i przy prefers-reduced-motion.
 */
const SELECTOR = ".glass-surface, .tilt-3d, [data-tilt]";
const MAX_DEG = 6;

const Depth3DProvider = () => {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduced || coarse) return;

    document.documentElement.classList.add("depth-3d-on");

    let active: HTMLElement | null = null;
    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const reset = (el: HTMLElement) => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };

    const apply = () => {
      frame = 0;
      if (!active || !lastEvent) return;
      const rect = active.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (lastEvent.clientX - rect.left) / rect.width;
      const py = (lastEvent.clientY - rect.top) / rect.height;
      active.style.setProperty("--tilt-y", `${(px - 0.5) * 2 * MAX_DEG}deg`);
      active.style.setProperty("--tilt-x", `${(0.5 - py) * 2 * MAX_DEG}deg`);
      active.style.setProperty("--mx", `${px * 100}%`);
      active.style.setProperty("--my", `${py * 100}%`);
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.(SELECTOR) as HTMLElement | null;

      if (el !== active) {
        if (active) reset(active);
        active = el;
      }
      if (!active) return;

      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (active) reset(active);
      document.documentElement.classList.remove("depth-3d-on");
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
};

export default Depth3DProvider;
