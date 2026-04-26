import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're in. Welcome to the drift crew.");
    setEmail("");
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl glass-strong border border-primary/20 p-10 md:p-16"
        >
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-neon-purple/30 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-neon-blue/30 blur-[120px]" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">Drift Newsletter</div>
              <h2 className="font-display text-3xl md:text-5xl font-black leading-tight">
                Get the drop. <br />
                <span className="text-gradient-brand">Before everyone else.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                New releases, exclusive builds, and 10% off your first order.
              </p>
            </div>

            <form onSubmit={submit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 lg:min-w-[420px]">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 rounded-lg bg-background/60 border border-border px-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-drift"
              />
              <Button type="submit" variant="hero" size="xl">
                Subscribe
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
