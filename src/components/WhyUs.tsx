import { motion } from "framer-motion";
import { Cpu, Gauge, ShieldCheck, Truck } from "lucide-react";

const features = [
  { icon: Gauge, title: "Race-Spec Speed", desc: "Brushless motors hitting 90+ km/h out of the box." },
  { icon: Cpu, title: "Smart Drift Control", desc: "Onboard gyro stabilization for clean, controlled slides." },
  { icon: ShieldCheck, title: "2-Year Warranty", desc: "Real coverage. No fine print. Built to crash and live." },
  { icon: Truck, title: "Free Worldwide Ship", desc: "On every order over $150. Tracked and insured." },
];

const WhyUs = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">Why RC Drift Cars</div>
            <h2 className="font-display text-4xl md:text-5xl font-black leading-[1.05]">
              Built by drifters.
              <br />
              <span className="text-gradient-brand">Tuned for chaos.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              We don't just sell RC cars. We engineer track-ready machines built around one rule — never lift off the throttle.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/60 bg-card-grad p-6 hover:border-primary/40 transition-drift hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 border border-primary/30 mb-5 group-hover:shadow-neon transition-drift">
                  <f.icon className="h-5 w-5 text-primary-glow" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
