import { Download } from "lucide-react";

const PrintButton = () => {
  return (
    <button
      onClick={() => window.print()}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity print:hidden"
      aria-label="Drukuj / Pobierz PDF"
    >
      <Download className="w-4 h-4" />
      Drukuj PDF
    </button>
  );
};

export default PrintButton;
