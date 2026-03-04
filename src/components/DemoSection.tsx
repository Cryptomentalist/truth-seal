import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Lock, Clock, CheckCircle2, FileText, ArrowDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple simulated digital fingerprint function (visual only)
function generateFingerprint(input: string): string {
  if (!input) return "";
  let h = 0x6a09e667;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 0x5bd1e995);
    h ^= h >>> 15;
  }
  const hex = (n: number) => (n >>> 0).toString(16).padStart(8, "0");
  let h2 = Math.imul(h ^ 0xbb67ae85, 0x1b873593);
  let h3 = Math.imul(h2 ^ 0x3c6ef372, 0xcc9e2d51);
  let h4 = Math.imul(h3 ^ 0xa54ff53a, 0x85ebca6b);
  let h5 = Math.imul(h4 ^ 0x510e527f, 0xc2b2ae35);
  let h6 = Math.imul(h5 ^ 0x9b05688c, 0x7c824f76);
  let h7 = Math.imul(h6 ^ 0x1f83d9ab, 0xa3b19574);
  let h8 = Math.imul(h7 ^ 0x5be0cd19, 0x5c4bcea8);
  return hex(h) + hex(h2) + hex(h3) + hex(h4) + hex(h5) + hex(h6) + hex(h7) + hex(h8);
}

type Step = "input" | "sealing" | "registered";

interface SealRecord {
  fingerprint: string;
  timestamp: string;
  sealNumber: number;
  preview: string;
}

const DemoSection = () => {
  const [text, setText] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [currentFingerprint, setCurrentFingerprint] = useState("");
  const [seals, setSeals] = useState<SealRecord[]>([]);
  const [sealingProgress, setSealingProgress] = useState(0);

  // Live fingerprint preview
  useEffect(() => {
    setCurrentFingerprint(generateFingerprint(text));
  }, [text]);

  const handleRegister = () => {
    if (!text.trim()) return;
    setStep("sealing");
    setSealingProgress(0);

    const interval = setInterval(() => {
      setSealingProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setSealingProgress(100);

      const record: SealRecord = {
        fingerprint: generateFingerprint(text),
        timestamp: new Date().toISOString(),
        sealNumber: 19_847_231 + seals.length,
        preview: text.length > 40 ? text.slice(0, 40) + "..." : text,
      };

      setSeals((prev) => [record, ...prev]);
      setStep("registered");

      setTimeout(() => {
        setText("");
        setStep("input");
      }, 4000);
    }, 1800);
  };

  return (
    <section className="section-padding relative overflow-hidden" id="demo">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            Interaktywne demo
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-4 mb-6">
            Zobacz, jak działa{" "}
            <span className="text-gradient-primary">MindMark™</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Wpisz opis swojego pomysłu i zobacz, jak system tworzy niepodważalny cyfrowy dowód.
          </p>
        </motion.div>

        {/* Demo card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-surface rounded-2xl p-6 md:p-8"
        >
          {/* Step 1: Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-3">
              <FileText className="w-4 h-4" />
              KROK 1 — Opisz swój wynalazek
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={step !== "input"}
              placeholder="Np. Nowy typ ogniwa perowskitowego o wydajności 28% z zastosowaniem warstwy kwantowej..."
              className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-28 font-mono text-sm transition-all disabled:opacity-50"
            />
          </div>

          {/* Live fingerprint preview */}
          <AnimatePresence>
            {currentFingerprint && step === "input" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-3">
                  <Fingerprint className="w-4 h-4" />
                  KROK 2 — Cyfrowy odcisk palca (podgląd na żywo)
                </label>
                <div className="bg-background/80 border border-primary/20 rounded-xl px-5 py-4 font-mono text-xs text-primary break-all leading-relaxed">
                  {currentFingerprint}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Zmień choćby jedną literę — cały odcisk zmieni się całkowicie. To Twoje unikalne DNA cyfrowe.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sealing animation */}
          <AnimatePresence>
            {step === "sealing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                <label className="flex items-center gap-2 text-sm font-mono text-primary mb-3">
                  <ShieldCheck className="w-4 h-4 animate-spin" />
                  Pieczętowanie w rozproszonym rejestrze...
                </label>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${Math.min(sealingProgress, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-muted-foreground">
                  <span>Tworzenie dowodu...</span>
                  <span>{Math.min(Math.round(sealingProgress), 100)}%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}
          <AnimatePresence>
            {step === "registered" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-6 bg-primary/5 border border-primary/30 rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-primary">
                    Dowód zapieczętowany w rejestrze MindMark™!
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Twój wynalazek jest teraz chroniony niepodważalnym cyfrowym dowodem.
                  Nikt nie może go cofnąć, zmienić ani usunąć.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Register button */}
          {step === "input" && (
            <Button
              variant="hero"
              size="lg"
              className="w-full py-4 sm:py-6 text-sm sm:text-base justify-start sm:justify-center pl-4 sm:pl-8"
              disabled={!text.trim()}
              onClick={handleRegister}
            >
              <Lock className="w-5 h-5 mr-2" />
              Zapieczętuj dowód w MindMark™
            </Button>
          )}
        </motion.div>

        {/* Registered seals */}
        {seals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono text-muted-foreground">
                Zapieczętowane dowody
              </span>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              {seals.map((seal, i) => (
                <motion.div
                  key={seal.timestamp}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-surface rounded-xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm font-semibold">
                        Pieczęć #{seal.sealNumber.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(seal.timestamp).toLocaleString("pl-PL")}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Dokument: <span className="text-secondary-foreground">{seal.preview}</span>
                  </div>
                  <div className="font-mono text-xs text-primary/80 break-all bg-background/50 rounded-lg px-3 py-2">
                    {seal.fingerprint}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-8 max-w-md mx-auto">
          To symulacja edukacyjna. W produkcji InventionProof.org używa technologii MindMark™ 
          — rozproszonego zapisu cyfrowego nie do podrobienia i nie do wymazania.
        </p>
      </div>
    </section>
  );
};

export default DemoSection;
