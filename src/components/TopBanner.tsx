import { Shield } from "lucide-react";

const TopBanner = () => (
  <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-2 text-center">
    <div className="container flex items-center justify-center gap-2 text-sm font-semibold tracking-wide">
      <Shield className="w-4 h-4" />
      <span>Chroń swoje IP</span>
    </div>
  </div>
);

export default TopBanner;
