import { ReactNode } from "react";
import { C, F, type ShopProduct } from "@/data/shopProducts";

export const money = (v: number) => `${v.toFixed(2)} zł`;

export function Motif({ p, small }: { p: ShopProduct; small?: boolean }) {
  const lines = p.slogan.split("\n");
  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ background: p.tint, aspectRatio: small ? "4 / 3" : "1 / 1", borderRadius: 10 }}
      aria-hidden="true"
    >
      <div className="px-6 text-center">
        {lines.map((l, i) => (
          <p
            key={i}
            style={{
              fontFamily: F.mono,
              fontSize: small ? "0.7rem" : "0.95rem",
              letterSpacing: "0.14em",
              color: C.paper,
              lineHeight: 1.7,
            }}
          >
            {l}
          </p>
        ))}
        <div style={{ height: 2, width: 40, background: C.amber, margin: "14px auto 0" }} />
      </div>
    </div>
  );
}

export const Impact = ({ text, size = "0.72rem" }: { text: string; size?: string }) => (
  <p style={{ fontFamily: F.mono, fontSize: size, color: C.amber, lineHeight: 1.6 }}>{text}</p>
);

export const Price = ({ v, size = "0.95rem" }: { v: number; size?: string }) => (
  <span style={{ fontFamily: F.mono, fontSize: size, color: C.indigo }}>{money(v)}</span>
);

export function Btn({
  children,
  onClick,
  kind = "primary",
  full,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: "primary" | "ghost";
  full?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base = {
    fontFamily: F.body,
    fontSize: "0.9rem",
    borderRadius: 8,
    padding: "12px 20px",
    fontWeight: 500,
    width: full ? "100%" : undefined,
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "opacity .15s",
  } as const;
  const style =
    kind === "primary"
      ? { ...base, background: C.indigo, color: C.paper, border: `1px solid ${C.indigo}` }
      : { ...base, background: "transparent", color: C.indigo, border: `1px solid ${C.rule}` };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ fontFamily: F.body, fontSize: "0.78rem", color: C.ink2, display: "block", marginBottom: 6 }}>
        {label}
        {required && <span style={{ color: C.amber }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
        style={{
          fontFamily: F.body,
          fontSize: "0.95rem",
          color: C.indigo,
          background: C.surface,
          border: `1px solid ${C.rule}`,
          borderRadius: 8,
          padding: "11px 12px",
          outline: "none",
        }}
      />
    </div>
  );
}

export function Check({
  checked,
  onChange,
  children,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  id: string;
}) {
  return (
    <label htmlFor={id} className="flex gap-3 items-start cursor-pointer" style={{ fontFamily: F.body, fontSize: "0.82rem", color: C.ink2, lineHeight: 1.6 }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1"
        style={{ accentColor: C.indigo, width: 16, height: 16, flexShrink: 0 }}
      />
      <span>{children}</span>
    </label>
  );
}

export const H = ({ children, mt }: { children: ReactNode; mt?: number }) => (
  <h2 style={{ fontFamily: F.display, fontSize: "1.05rem", color: C.indigo, marginTop: mt ?? 0, marginBottom: 14 }}>{children}</h2>
);

export const Row = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex justify-between items-center py-1.5">
    <span style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.ink2 }}>{label}</span>
    <span style={{ fontFamily: F.mono, fontSize: "0.85rem", color: C.indigo }}>{value}</span>
  </div>
);
