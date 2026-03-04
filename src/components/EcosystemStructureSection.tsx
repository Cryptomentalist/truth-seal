import { motion } from "framer-motion";
import maslowImg from "@/assets/maslow-ecosystem.jpg";

const nodes = [
  { id: "core", label: "AI Venture\nIntegrator", x: 50, y: 50, size: 80, color: "primary", glow: true },
  { id: "invention", label: "InventionProof", x: 18, y: 18, size: 52, color: "accent" },
  { id: "startup", label: "AI Start-up\nStudio", x: 82, y: 18, size: 52, color: "accent" },
  { id: "barter", label: "BarterChain", x: 15, y: 75, size: 48, color: "accent" },
  { id: "comarch", label: "COMARCH\nERP XL", x: 85, y: 75, size: 48, color: "accent" },
  { id: "esg", label: "ESG &\nAudyt", x: 50, y: 10, size: 44, color: "muted" },
  { id: "mrit", label: "MRiT\nPatronat", x: 10, y: 46, size: 42, color: "muted" },
  { id: "konstelacja", label: "Fundacja\nKonstelacja.org", x: 90, y: 46, size: 46, color: "muted" },
  { id: "dotacje", label: "Dotacje UE\n& Granty", x: 30, y: 90, size: 44, color: "muted" },
  { id: "rada", label: "Rada\nKobiet.org", x: 70, y: 90, size: 42, color: "muted" },
];

const connections: [string, string][] = [
  ["core", "invention"],
  ["core", "startup"],
  ["core", "barter"],
  ["core", "comarch"],
  ["core", "esg"],
  ["core", "mrit"],
  ["core", "konstelacja"],
  ["core", "dotacje"],
  ["core", "rada"],
  ["invention", "barter"],
  ["startup", "comarch"],
  ["barter", "dotacje"],
];

const EcosystemStructureSection = () => {
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="container max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            Struktura
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-4 mb-6">
            Wizualna mapa{" "}
            <span className="text-primary">ekosystemu</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Każdy element ekosystemu jest połączony z pozostałymi — tworząc samowystarczalną sieć
            odporną na kryzysy.
          </p>
        </motion.div>

        {/* Network visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-surface rounded-2xl p-4 sm:p-8"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full max-w-3xl mx-auto"
            style={{ aspectRatio: "1" }}
          >
            <defs>
              <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
              <filter id="glow-filter">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {connections.map(([fromId, toId], i) => {
              const from = getNode(fromId);
              const to = getNode(toId);
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="hsl(var(--accent))"
                  strokeOpacity="0.2"
                  strokeWidth="0.3"
                  strokeDasharray="1,1"
                />
              );
            })}

            {/* Core glow */}
            <circle cx={50} cy={50} r={14} fill="url(#core-glow)" />

            {/* Nodes */}
            {nodes.map((node) => {
              const r = node.size / 10;
              const isCore = node.id === "core";
              const fillColor = isCore
                ? "hsl(var(--primary))"
                : node.color === "accent"
                ? "hsl(var(--accent))"
                : "hsl(var(--muted-foreground))";

              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    fill={fillColor}
                    fillOpacity={isCore ? 0.15 : 0.08}
                    stroke={fillColor}
                    strokeOpacity={isCore ? 0.6 : 0.3}
                    strokeWidth={isCore ? 0.4 : 0.25}
                    filter={isCore ? "url(#glow-filter)" : undefined}
                  />
                  {node.label.split("\n").map((line, li) => (
                    <text
                      key={li}
                      x={node.x}
                      y={node.y + (li - (node.label.split("\n").length - 1) / 2) * 2.4}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="hsl(var(--foreground))"
                      fontSize={isCore ? 2.2 : 1.7}
                      fontWeight={isCore ? 700 : 500}
                      opacity={isCore ? 1 : 0.85}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary/40 border border-primary/60" />
            Centrum ekosystemu
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent/30 border border-accent/50" />
            Projekty kluczowe
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-muted-foreground/20 border border-muted-foreground/40" />
            Partnerzy &amp; patroni
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemStructureSection;
