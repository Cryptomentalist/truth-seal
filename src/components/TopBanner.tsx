import { Shield, Heart } from "lucide-react";

const TopBanner = () => (
  <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-1 sm:py-1.5 text-center">
    <div className="container flex items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs font-semibold tracking-wide">
      <div className="flex items-center gap-1 sm:gap-2">
        <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="whitespace-nowrap">Chroń swoje IP</span>
      </div>
      <span className="text-primary-foreground/50">|</span>
      <div className="flex items-center gap-1">
        <Heart className="w-3 h-3 flex-shrink-0 hidden sm:block" />
        <span className="truncate">
          <a
            href="https://konstelacja.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/80 transition-colors"
          >
            Konstelacja.org
          </a>
          <span className="hidden sm:inline">
            {" "}({" "}
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
        </span>
      </div>
    </div>
  </div>
);

export default TopBanner;
