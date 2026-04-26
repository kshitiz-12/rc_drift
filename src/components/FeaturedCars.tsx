import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const FeaturedCars = () => {
  const featured = products.slice(0, 4);
  return (
    <section id="shop" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">
              Drift Series 04
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight max-w-2xl">
              Engineered for <span className="text-gradient-brand">precision</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Every chassis is hand-tuned, balanced, and stress-tested. Pick your weapon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button variant="neon" size="lg" asChild>
            <Link to="/shop">
              View All Builds
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
