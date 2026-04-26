import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import showcase from "@/assets/showcase-drift.jpg";

const CountUp = ({
  value,
  label,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="bg-card p-6 md:p-8 text-center">
      <div className="font-display text-3xl md:text-4xl font-black text-gradient-brand">
        {display.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{label}</div>
    </div>
  );
};

const Showcase = () => {
  return (
    <section id="showcase" className="relative pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border/60 group cursor-pointer"
        >
          <img
            src={showcase}
            alt="RC drift car drifting through neon-lit city at night with smoke clouds"
            loading="lazy"
            width={1600}
            height={900}
            className="w-full h-[420px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl scale-150 animate-pulse-glow" />
              <button className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full glass-strong border border-primary/50 group-hover:scale-110 transition-transform duration-500">
                <Play className="h-8 w-8 md:h-10 md:w-10 fill-primary-glow text-primary-glow ml-1" />
              </button>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">Watch Reel</div>
            <h2 className="font-display text-3xl md:text-5xl font-black max-w-2xl">
              Tokyo nights. <span className="text-gradient-brand">Endless drift.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              See the Drift Series 04 in action across underground tracks worldwide.
            </p>
          </div>
        </motion.div>

        {/* Stat strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-border/60">
          <CountUp value={120} suffix="K+" label="Drivers Worldwide" />
          <CountUp value={4.9} decimals={1} suffix="/5" label="Average Rating" />
          <CountUp value={50} suffix="+" label="Countries Shipped" />
          <CountUp value={2014} label="Building Drift" />
        </div>
      </div>
    </section>
  );
};

export default Showcase;
