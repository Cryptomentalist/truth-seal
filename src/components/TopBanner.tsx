import { Shield, Heart } from "lucide-react";

const TopBanner = () => (
  <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-1.5 sm:py-2 text-center">
    <div className="container flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold tracking-wide flex-wrap">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4" />
        <span>Chroń swoje IP</span>
      </div>
      <span className="hidden sm:inline text-primary-foreground/50">|</span>
      <div className="flex items-center gap-1.5">
        <Heart className="w-3.5 h-3.5" />
        <span>
          Pod patronatem:{" "}
          <a
            href="https://konstelacja.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/80 transition-colors"
          >
            Fundacji Konstelacja.org
          </a>
          {" "}(
          <a
            href="https://constellation.love"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/80 transition-colors"
          >
            Constellation.love
          </a>
          )
        </span>
      </div>
    </div>
  </div>
);

export default TopBanner;
