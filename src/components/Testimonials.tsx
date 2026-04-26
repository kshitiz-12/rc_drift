import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Kenji Watanabe",
    role: "Pro Drifter · Osaka",
    text: "The Phantom Edge handles tighter than my real S15. Insane balance and grip on transition.",
    rating: 5,
  },
  {
    name: "Maya Chen",
    role: "Track Builder · LA",
    text: "Built like a tank, drifts like a dream. Clients ask me about RC Drift Cars every single weekend.",
    rating: 5,
  },
  {
    name: "Lukas Brandt",
    role: "Hobbyist · Berlin",
    text: "Out of the box, dialed in perfectly. The smart gyro is genuinely game-changing.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">From the Track</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">
            Real drivers. <span className="text-gradient-brand">Real reviews.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border/60 bg-card-grad p-7 hover:border-primary/40 transition-drift"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-border/60">
                <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center font-display font-bold text-primary-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
