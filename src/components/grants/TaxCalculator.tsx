import { useState } from "react";
import { motion } from "framer-motion";
import { BadgePercent, ShieldCheck, Calculator } from "lucide-react";

const TaxCalculator = () => {
  const [revenue, setRevenue] = useState(500000);
  const [brCosts, setBrCosts] = useState(200000);
  const [ipIncome, setIpIncome] = useState(300000);

  const brSaving = Math.round(brCosts * 2 * 0.19);
  const ipBoxSaving = Math.round(ipIncome * (0.19 - 0.05));
  const totalSaving = brSaving + ipBoxSaving;

  const formatPLN = (n: number) =>
    n.toLocaleString("pl-PL", { style: "currency", currency: "PLN", minimumFractionDigits: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
        <span className="w-1.5 h-7 rounded-full bg-accent inline-block" />
        Kalkulator oszczędności podatkowych
      </h2>
      <p className="text-sm text-muted-foreground mb-8 ml-5">
        Orientacyjna symulacja — sprawdź ile możesz zaoszczędzić dzięki ulgom B+R i IP Box.
      </p>

      <div className="glass-surface rounded-xl p-6 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* B+R costs slider */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-2 block">
              Koszty B+R (rocznie)
            </label>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={50000}
              value={brCosts}
              onChange={(e) => setBrCosts(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="text-lg font-bold text-accent mt-1">{formatPLN(brCosts)}</div>
          </div>

          {/* IP income slider */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-2 block">
              Dochód z IP (rocznie)
            </label>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={50000}
              value={ipIncome}
              onChange={(e) => setIpIncome(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="text-lg font-bold text-primary mt-1">{formatPLN(ipIncome)}</div>
          </div>
        </div>

        {/* Results */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-accent/5 border border-accent/10 p-4 text-center">
            <BadgePercent className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Ulga B+R (200%)</div>
            <div className="text-xl font-bold text-accent">{formatPLN(brSaving)}</div>
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 text-center">
            <ShieldCheck className="w-5 h-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">IP Box (5% CIT)</div>
            <div className="text-xl font-bold text-primary">{formatPLN(ipBoxSaving)}</div>
          </div>
          <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 text-center">
            <Calculator className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Łączna oszczędność</div>
            <div className="text-2xl font-bold text-accent">{formatPLN(totalSaving)}</div>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground mt-4 text-center">
          * Kalkulacja orientacyjna przy stawce CIT 19%. Rzeczywiste oszczędności zależą od indywidualnej sytuacji podatkowej.
        </p>
      </div>
    </motion.div>
  );
};

export default TaxCalculator;
