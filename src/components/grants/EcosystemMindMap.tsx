import { motion } from "framer-motion";
import { 
  Heart, ShieldCheck, Rocket, ArrowRightLeft, Users, Leaf, 
  BarChart3, Landmark, Search, Briefcase, Network, Globe,
  Lightbulb, FlaskConical, UserCheck, Handshake, MessageCircleHeart
} from "lucide-react";

const centralNode = {
  name: "AI Venture\nAnticrisis Integrator",
  icon: Network,
};

interface MapNode {
  name: string;
  icon: any;
  color: string;
  children?: { name: string; url?: string }[];
}

const branches: MapNode[] = [
  {
    name: "Ochrona IP",
    icon: ShieldCheck,
    color: "text-emerald-400",
    children: [
      { name: "InventionProof.org", url: "https://inventionproof.org" },
      { name: "MindMark™ (pre-patent)" },
      { name: "Patenty krajowe & PCT" },
    ],
  },
  {
    name: "intrapreneurs.app",
    icon: Heart,
    color: "text-rose-400",
    children: [
      { name: "Serce ekosystemu", url: "https://intrapreneurs.app" },
      { name: "Dobór intrapreneurów do projektów" },
      { name: "Filtr kompetencji" },
    ],
  },
  {
    name: "Inkubacja & Akceleracja",
    icon: Rocket,
    color: "text-sky-400",
    children: [
      { name: "AI Start-up Studio" },
      { name: "MVP & walidacja" },
      { name: "B+R Lab" },
    ],
  },
  {
    name: "AIagent.gratis",
    icon: Globe,
    color: "text-teal-400",
    children: [
      { name: "Baza Agentów AI", url: "https://aiagent.gratis" },
      { name: "Komplementarność agentów" },
      { name: "Marketplace autonomicznych AI" },
      { name: "Integracja z projektami ekosystemu" },
    ],
  },
  {
    name: "Franczyza & MiR",
    icon: Handshake,
    color: "text-amber-400",
    children: [
      { name: "Filtr jakości franczyzodawców" },
      { name: "Dofinansowanie UE (rozmowy z MiR)" },
      { name: "Praca pod marką ekosystemu" },
    ],
  },
  {
    name: "Finansowanie",
    icon: Landmark,
    color: "text-violet-400",
    children: [
      { name: "Dotacje UE & Granty", url: "/dotacje" },
      { name: "Fundusze norweskie" },
      { name: "Ulgi: B+R, IP Box, prototyp" },
      { name: "Inwestorzy & VC" },
    ],
  },
  {
    name: "ESG & Compliance",
    icon: Leaf,
    color: "text-green-400",
    children: [
      { name: "esg.legal", url: "https://esg.legal" },
      { name: "ESG SDG Mapper", url: "https://esg-sdg-mapper.lovable.app" },
      { name: "radakobiet.org", url: "https://radakobiet.org" },
    ],
  },
  {
    name: "Wymiana wartości",
    icon: ArrowRightLeft,
    color: "text-orange-400",
    children: [
      { name: "BarterChain" },
      { name: "Fractaleco.com", url: "https://fractaleco.com" },
      { name: "Wymiana barterowa bez pośredników" },
    ],
  },
  {
    name: "Narzędzia biznesowe",
    icon: BarChart3,
    color: "text-cyan-400",
    children: [
      { name: "MindMark HR (Biz Tool)" },
      { name: "5P Business Tool" },
      { name: "rejestruj.biz", url: "https://rejestruj.biz" },
    ],
  },
  {
    name: "Społeczność & Komunikacja",
    icon: MessageCircleHeart,
    color: "text-pink-400",
    children: [
      { name: "GenBridge" },
      { name: "Gentleman Agreement Club" },
      { name: "Fundacja Konstelacja.org" },
    ],
  },
];

const EcosystemMindMap = () => {
  return (
    <div className="py-4">
      {/* Central node */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="glass-surface rounded-2xl px-6 py-4 border-2 border-accent/30 text-center">
          <centralNode.icon className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-bold text-sm sm:text-base whitespace-pre-line">
            {centralNode.name}
          </h3>
          <p className="text-[10px] text-muted-foreground mt-1">Samowystarczalny ekosystem innowacji</p>
        </div>
      </motion.div>

      {/* Branches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            className="glass-surface rounded-xl p-4 border-t-2 border-t-accent/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <branch.icon className={`w-5 h-5 ${branch.color}`} />
              <h4 className="font-bold text-sm">{branch.name}</h4>
            </div>
            <ul className="space-y-1.5">
              {branch.children?.map((child, j) => (
                <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${branch.color.replace('text-', 'bg-')}`} />
                  {child.url ? (
                    <a
                      href={child.url}
                      target={child.url.startsWith("http") ? "_blank" : undefined}
                      rel={child.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover:text-accent transition-colors underline decoration-dotted underline-offset-2"
                    >
                      {child.name}
                    </a>
                  ) : (
                    child.name
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* intrapreneurs.app highlight */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 glass-surface rounded-xl p-5 text-center border border-rose-400/20"
      >
        <Heart className="w-6 h-6 text-rose-400 mx-auto mb-2" />
        <p className="text-sm font-semibold mb-1">
          <a href="https://intrapreneurs.app" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline">
            intrapreneurs.app
          </a>{" "}
          — serce ekosystemu
        </p>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Każdy projekt w ekosystemie może wybrać intraprenera z tej aplikacji. To centralny punkt łączący ludzi z projektami.
        </p>
      </motion.div>
    </div>
  );
};

export default EcosystemMindMap;
