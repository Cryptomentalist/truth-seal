import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="container max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-bold">
          <Shield className="w-5 h-5 text-primary" />
          <span>
            Invention<span className="text-primary">Proof</span>.org
          </span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          MindMark™ · Pre-patent · Deep-tech · S-Impact
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} InventorProof.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
