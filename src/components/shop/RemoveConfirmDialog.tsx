import { C, F } from "@/data/shopProducts";
import type { ShopStrings } from "@/data/shopStrings";

interface Props {
  open: boolean;
  t: ShopStrings;
  itemName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/** Potwierdzenie usunięcia pozycji z koszyka (z możliwością cofnięcia przez toast). */
const RemoveConfirmDialog = ({ open, t, itemName, onCancel, onConfirm }: Props) => {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.rm_title}
      className="fixed inset-0 z-[70] flex items-center justify-center px-5"
      style={{ background: "rgba(20,20,30,0.45)" }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.surface,
          border: `1px solid ${C.rule}`,
          borderRadius: 12,
          padding: 22,
          maxWidth: 420,
          width: "100%",
        }}
      >
        <h2 style={{ fontFamily: F.display, fontSize: "1.15rem", color: C.indigo }}>{t.rm_title}</h2>
        {itemName && (
          <p style={{ fontFamily: F.mono, fontSize: "0.72rem", color: C.ink2, marginTop: 6 }}>{itemName}</p>
        )}
        <p style={{ fontFamily: F.body, fontSize: "0.85rem", color: C.ink2, lineHeight: 1.6, marginTop: 10 }}>
          {t.rm_body}
        </p>
        <div className="flex gap-3 justify-end" style={{ marginTop: 20 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              fontFamily: F.body,
              fontSize: "0.85rem",
              color: C.indigo,
              border: `1px solid ${C.rule}`,
              borderRadius: 8,
              padding: "9px 16px",
              background: "transparent",
            }}
          >
            {t.rm_cancel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              fontFamily: F.body,
              fontSize: "0.85rem",
              color: "#fff",
              background: "#B3261E",
              borderRadius: 8,
              padding: "9px 16px",
            }}
          >
            {t.rm_confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveConfirmDialog;
