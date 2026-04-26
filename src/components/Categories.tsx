import { motion } from "framer-motion";
import { ArrowUpRight, Flag, Settings, Sparkles, Trophy } from "lucide-react";

const categories = [
  { icon: Sparkles, name: "Beginner", count: "12 Models", desc: "Easy control. Built to learn.", color: "from-neon-cyan/20 to-transparent" },
  { icon: Trophy, name: "Pro", count: "24 Models", desc: "Race-grade performance.", color: "from-neon-blue/20 to-transparent" },
  { icon: Flag, name: "Drift Kits", count: "18 Builds", desc: "Sideways, all the time.", color: "from-neon-purple/20 to-transparent" },
  { icon: Settings, name: "Accessories", count: "80+ Parts", desc: "Tires, batteries, mods.", color: "from-neon-red/20 to-transparent" },
];

const Categories = () => {
  return (
    <section id="categories" className="relative py-24 md:py-32">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">Find Your Style</div>
          <h2 className="font-display text-4xl md:text-5xl font-black">
            Shop by <span className="text-gradient-brand">category</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <motion.a
              key={c.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card-grad p-6 hover:border-primary/40 transition-drift"
            >
              <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${c.color} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative flex flex-col h-full min-h-[180px]">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl glass-strong border border-primary/30 group-hover:shadow-neon transition-drift">
                    <c.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary-glow group-hover:rotate-12 transition-all" />
                </div>
                <div className="mt-auto pt-8">
                  <div className="font-display text-2xl font-bold">{c.name}</div>
                  <div className="text-xs text-primary-glow mt-1 uppercase tracking-widest">{c.count}</div>
                  <p className="text-sm text-muted-foreground mt-3">{c.desc}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
