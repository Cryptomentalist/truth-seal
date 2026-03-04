import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Calculator,
  ShieldCheck,
  Leaf,
  Bot,
  TrendingUp,
  Info,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

/* ── Helpers ─────────────────────────────────────── */

const fmt = (n: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);

const pct = (n: number) => `${Math.round(n)}%`;

/* ── Module ROI configs ──────────────────────────── */

interface SliderConfig {
  id: string;
  label: string;
  tooltip: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit: string;
  format: (v: number) => string;
}

interface ModuleROI {
  icon: any;
  title: string;
  color: string;
  bg: string;
  sliders: SliderConfig[];
  calculate: (values: Record<string, number>) => {
    saving: number;
    roi: number;
    label: string;
  };
}

const modulesROI: ModuleROI[] = [
  {
    icon: ArrowRightLeft,
    title: "BarterChain",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    sliders: [
      {
        id: "transactions",
        label: "Transakcje barterowe / mies.",
        tooltip: "Szacunkowa liczba transakcji barterowych w ekosystemie miesięcznie.",
        min: 10,
        max: 500,
        step: 10,
        default: 50,
        unit: "szt.",
        format: (v) => `${v} szt.`,
      },
      {
        id: "avgValue",
        label: "Średnia wartość transakcji",
        tooltip: "Średnia wartość jednej transakcji barterowej w PLN.",
        min: 1000,
        max: 100000,
        step: 1000,
        default: 15000,
        unit: "PLN",
        format: (v) => fmt(v),
      },
      {
        id: "feePercent",
        label: "Obecna prowizja pośredników",
        tooltip: "Procent wartości transakcji tracony na prowizje bankowe i pośredników.",
        min: 1,
        max: 10,
        step: 0.5,
        default: 3,
        unit: "%",
        format: (v) => `${v}%`,
      },
    ],
    calculate: (v) => {
      const monthlySaving = v.transactions * v.avgValue * (v.feePercent / 100);
      const annualSaving = monthlySaving * 12;
      return {
        saving: annualSaving,
        roi: (annualSaving / 120000) * 100,
        label: "Roczna oszczędność na kosztach transakcyjnych",
      };
    },
  },
  {
    icon: Calculator,
    title: "Kalkulator B+R / IP Box",
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20",
    sliders: [
      {
        id: "rdSpend",
        label: "Roczne wydatki na B+R",
        tooltip: "Łączne koszty kwalifikowane B+R (wynagrodzenia, materiały, amortyzacja).",
        min: 100000,
        max: 10000000,
        step: 50000,
        default: 1000000,
        unit: "PLN",
        format: (v) => fmt(v),
      },
      {
        id: "ipIncome",
        label: "Przychód z praw IP",
        tooltip: "Przychody z kwalifikowanych praw własności intelektualnej objęte IP Box.",
        min: 0,
        max: 5000000,
        step: 50000,
        default: 500000,
        unit: "PLN",
        format: (v) => fmt(v),
      },
    ],
    calculate: (v) => {
      const rdDeduction = v.rdSpend * 0.19 * 2; // podwójne odliczenie 200% kosztów × 19% CIT
      const ipBoxSaving = v.ipIncome * (0.19 - 0.05); // różnica między 19% CIT a 5% IP Box
      const totalSaving = rdDeduction + ipBoxSaving;
      return {
        saving: totalSaving,
        roi: (totalSaving / 80000) * 100,
        label: "Szacunkowa roczna oszczędność podatkowa",
      };
    },
  },
  {
    icon: ShieldCheck,
    title: "MindMark™ / InventionProof",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    sliders: [
      {
        id: "projects",
        label: "Projekty B+R rocznie",
        tooltip: "Liczba aktywnych projektów wymagających ochrony IP.",
        min: 1,
        max: 50,
        step: 1,
        default: 8,
        unit: "szt.",
        format: (v) => `${v} szt.`,
      },
      {
        id: "patentCost",
        label: "Koszt patentu tradycyjnego",
        tooltip: "Średni koszt jednego zgłoszenia patentowego (rzecznik + opłaty UPRP).",
        min: 5000,
        max: 100000,
        step: 5000,
        default: 25000,
        unit: "PLN",
        format: (v) => fmt(v),
      },
    ],
    calculate: (v) => {
      const traditionalCost = v.projects * v.patentCost;
      const mindmarkCost = v.projects * 2000; // MindMark koszt per projekt
      const saving = traditionalCost - mindmarkCost;
      return {
        saving,
        roi: (saving / mindmarkCost) * 100,
        label: "Oszczędność vs. tradycyjna ochrona patentowa",
      };
    },
  },
  {
    icon: Leaf,
    title: "ESG Compliance",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
    sliders: [
      {
        id: "employees",
        label: "Liczba pracowników",
        tooltip: "Wielkość firmy wpływa na zakres obowiązkowego raportowania CSRD.",
        min: 50,
        max: 5000,
        step: 50,
        default: 250,
        unit: "os.",
        format: (v) => `${v} os.`,
      },
      {
        id: "auditCost",
        label: "Koszt zewnętrznego audytu ESG",
        tooltip: "Roczny koszt zlecenia raportowania ESG firmie zewnętrznej.",
        min: 20000,
        max: 500000,
        step: 10000,
        default: 120000,
        unit: "PLN",
        format: (v) => fmt(v),
      },
    ],
    calculate: (v) => {
      const moduleCost = 50000 + v.employees * 20; // koszt modułu
      const saving = v.auditCost - moduleCost;
      return {
        saving: Math.max(saving, 0),
        roi: saving > 0 ? (saving / moduleCost) * 100 : 0,
        label: "Oszczędność vs. zewnętrzny audyt ESG",
      };
    },
  },
  {
    icon: Bot,
    title: "AIagent.gratis",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
    sliders: [
      {
        id: "processes",
        label: "Procesy do automatyzacji",
        tooltip: "Liczba powtarzalnych procesów ERP możliwych do automatyzacji przez agentów AI.",
        min: 5,
        max: 100,
        step: 5,
        default: 20,
        unit: "szt.",
        format: (v) => `${v} szt.`,
      },
      {
        id: "hoursSaved",
        label: "Godziny zaoszczędzone / proces / mies.",
        tooltip: "Średnia liczba roboczogodzin oszczędzanych na jednym zautomatyzowanym procesie.",
        min: 1,
        max: 40,
        step: 1,
        default: 8,
        unit: "h",
        format: (v) => `${v} h`,
      },
      {
        id: "hourlyRate",
        label: "Stawka godzinowa pracownika",
        tooltip: "Pełny koszt pracodawcy za godzinę pracy (brutto + ZUS).",
        min: 30,
        max: 200,
        step: 10,
        default: 80,
        unit: "PLN/h",
        format: (v) => `${v} PLN/h`,
      },
    ],
    calculate: (v) => {
      const annualSaving = v.processes * v.hoursSaved * v.hourlyRate * 12;
      return {
        saving: annualSaving,
        roi: (annualSaving / 200000) * 100,
        label: "Roczna oszczędność na automatyzacji procesów",
      };
    },
  },
];

/* ── Component ───────────────────────────────────── */

const ModuleROICard = ({ module }: { module: ModuleROI }) => {
  const defaultValues: Record<string, number> = {};
  module.sliders.forEach((s) => {
    defaultValues[s.id] = s.default;
  });

  const [values, setValues] = useState(defaultValues);
  const result = module.calculate(values);

  return (
    <div className={`glass-surface rounded-xl p-5 sm:p-6 border-l-4 ${module.bg}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${module.bg}`}>
          <module.icon className={`w-4 h-4 ${module.color}`} />
        </div>
        <h3 className="font-bold text-sm sm:text-base">{module.title}</h3>
      </div>

      {/* Sliders */}
      <div className="space-y-5 mb-6">
        {module.sliders.map((slider) => (
          <div key={slider.id}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">{slider.label}</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-muted-foreground/50" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px] text-xs">
                    {slider.tooltip}
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className={`text-xs font-mono font-bold ${module.color}`}>
                {slider.format(values[slider.id])}
              </span>
            </div>
            <Slider
              value={[values[slider.id]]}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              onValueChange={([v]) =>
                setValues((prev) => ({ ...prev, [slider.id]: v }))
              }
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Result */}
      <div className={`rounded-lg p-4 ${module.bg}`}>
        <span className="text-[10px] font-mono text-muted-foreground block mb-1">
          {result.label}
        </span>
        <div className="flex items-end justify-between gap-4">
          <span className={`text-xl sm:text-2xl font-bold ${module.color}`}>
            {fmt(result.saving)}
          </span>
          <div className="flex items-center gap-1.5">
            <TrendingUp className={`w-4 h-4 ${module.color}`} />
            <span className={`text-sm font-bold ${module.color}`}>
              ROI {pct(result.roi)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ROICalculator = () => {
  const totalSaving = modulesROI.reduce((sum, mod) => {
    const defaults: Record<string, number> = {};
    mod.sliders.forEach((s) => {
      defaults[s.id] = s.default;
    });
    return sum + mod.calculate(defaults).saving;
  }, 0);

  return (
    <section className="py-12 px-4 md:px-8 print:break-before-page">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Kalkulator ROI</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Dostosuj parametry do swojej firmy — oblicz zwrot z inwestycji.
              </p>
            </div>
            <div className="glass-surface rounded-lg px-4 py-3 border border-primary/20">
              <span className="text-[10px] font-mono text-muted-foreground block">
                Łączna oszczędność (domyślne wartości)
              </span>
              <span className="text-lg font-bold text-primary">{fmt(totalSaving)}</span>
              <span className="text-xs text-muted-foreground"> / rok</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {modulesROI.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ModuleROICard module={mod} />
              </motion.div>
            ))}
          </div>

          <p className="text-[10px] text-muted-foreground text-center mt-6 italic">
            * Kalkulacje mają charakter szacunkowy i mogą się różnić w zależności od specyfiki firmy. ROI obliczany względem szacunkowego kosztu wdrożenia modułu.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
