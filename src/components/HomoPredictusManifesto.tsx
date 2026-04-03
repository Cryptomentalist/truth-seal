import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const HomoPredictusManifesto = () => {
  return (
    <section className="container max-w-3xl px-4 pb-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            Homo Predictus
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-2">
            Nowa era. Era intencji.
          </h2>
          <p className="text-muted-foreground text-lg">
            Kolejny etap ewolucji —{" "}
            <a
              href="https://homopredictus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold underline decoration-accent/50 underline-offset-4 hover:decoration-accent transition-colors"
            >
              Homo Predictus
            </a>
            .
          </p>
        </div>

        <div className="space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Nie pytaj, czy potrafisz.</p>
            <p>Każdy coś potrafi.</p>
            <p>
              Każdy jest unikalny — jak ziarnko piasku, ukształtowane przez ocean.
              Ty przez czas i doświadczenie.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-accent/30 pl-5">
            <p>Kluczem nie jest walka o miejsce.</p>
            <p className="font-semibold text-foreground">
              Kluczem jest zrozumienie — gdzie naprawdę pasujesz.
            </p>
          </div>

          <div className="space-y-1">
            <p>Gdy to odkryjesz:</p>
            <ul className="list-none space-y-1 pl-4">
              <li className="text-accent">→ planowanie staje się proste,</li>
              <li className="text-accent">→ działanie naturalne,</li>
              <li className="text-accent">→ a efekty — nieuniknione.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p>Dobra energia.</p>
            <p>Spójna intencja.</p>
            <p>Działanie w rytmie, który jest Twój — nie narzucony.</p>
          </div>

          <div className="border-t border-b border-accent/20 py-6 space-y-3">
            <p className="font-semibold text-foreground text-lg">I najważniejsze: ludzie.</p>
            <p>Dobieraj ich świadomie.</p>
            <p className="text-muted-foreground italic">
              Nie każdy, kto daje — wspiera.<br />
              Nie każdy, kto pomaga — buduje.
            </p>
            <p className="text-muted-foreground">
              Są tacy, którzy chcą dobrze — ale nie rozumieją. <span className="text-accent font-medium">To lekcja.</span>
            </p>
            <p className="text-muted-foreground">
              Są tacy, którzy dają — ale tylko po to, by kontrolować. <span className="text-accent font-medium">To blokada.</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-foreground">
              Projekt nie upada przez brak zasobów.
            </p>
            <p>Upada przez złe intencje wokół niego.</p>
          </div>

          <div className="space-y-2 bg-accent/5 rounded-xl p-5 border border-accent/10">
            <p className="font-semibold text-foreground mb-3">Dlatego:</p>
            <ul className="list-none space-y-2">
              <li>→ twórz w zgodzie z wartościami,</li>
              <li>→ buduj na jakości,</li>
              <li>→ dobieraj ludzi po intencjach. Nie wyjdzie? Nauczycie się. Przyjaciele są od tego.</li>
              <li>→ działaj dla wspólnego dobra. Twórz najpierw wartość.</li>
            </ul>
          </div>

          <blockquote className="text-center pt-4 space-y-3">
            <p className="text-lg sm:text-xl font-semibold italic">
              Bo przyszłość nie należy do najsilniejszych.<br />
              Ani do najszybszych.
            </p>
            <p className="text-xl sm:text-2xl font-black text-accent">
              Przyszłość należy do tych,<br />
              którzy rozumieją,<br />
              jak działa energia decyzji.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Jak działa to, co nas stworzyło. To chce, abyśmy To zrozumieli. To jest sens życia.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mt-4 border-t border-border/50 pt-4">
              Życie to całość: praca i prywatność. Balance sprawia, że masz więcej energii i osiągasz lepsze efekty. Nadmiar i niedosyt dają ten sam efekt — chorobę systemu. Jak z niedożywienia i przejedzenia.
            </p>
          </blockquote>
        </div>
      </motion.div>
    </section>
  );
};

export default HomoPredictusManifesto;
