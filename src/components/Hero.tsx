import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-drift.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-hero">
      {/* Grid backdrop */}
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Black RC drift car sliding sideways with neon blue and purple light trails and tire smoke"
          width={1920}
          height={1088}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/30" />
      </div>

      {/* Smoke blobs */}
      <div className="absolute -left-20 bottom-20 w-96 h-96 rounded-full bg-neon-purple/30 blur-[120px] animate-drift-smoke" />
      <div className="absolute right-10 top-32 w-80 h-80 rounded-full bg-neon-blue/30 blur-[120px] animate-drift-smoke" style={{ animationDelay: "1.5s" }} />

      {/* Skid lines */}
      <div className="skid-line top-1/3 left-0 w-1/3 opacity-30" />
      <div className="skid-line top-1/3 left-0 w-1/4 mt-2 opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col justify-center pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-primary-glow mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            New Drop · Drift Series 04
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight"
          >
            Control
            <br />
            the <span className="text-gradient-brand">Drift.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground"
          >
            Precision-engineered RC drift cars built for speed, style, and zero hesitation. Carve corners. Burn rubber. Own the track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button variant="hero" size="xl">
              Shop Drift Series
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="neon" size="xl">
              <Play className="h-4 w-4 fill-current" />
              Watch Drift Reel
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-16 grid grid-cols-3 max-w-lg gap-6"
          >
            {[
              { v: "85", suf: "km/h", l: "Top Speed" },
              { v: "1:10", suf: "scale", l: "Pro Build" },
              { v: "4WD", suf: "drive", l: "Drift Tuned" },
            ].map((s) => (
              <div key={s.l} className="border-l border-border/60 pl-4">
                <div className="font-display text-2xl md:text-3xl font-bold">
                  {s.v}<span className="text-sm text-muted-foreground ml-1">{s.suf}</span>
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
