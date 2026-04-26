import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const accentMap = {
  blue: "from-neon-blue/40 to-transparent",
  red: "from-neon-red/40 to-transparent",
  purple: "from-neon-purple/40 to-transparent",
  cyan: "from-neon-cyan/40 to-transparent",
};

const ProductCard = ({ product }: { product: Product }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const { addItem } = useCart();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card-grad border border-border/60 transition-drift group-hover:border-primary/40 shadow-card-soft group-hover:shadow-neon">
        <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-tr ${accentMap[product.accent]} opacity-60`} />
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            animate={{ scale: hover ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-foreground">
            {product.tag}
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
            onClick={(e) => e.preventDefault()}
          >
            <Button
              variant="hero"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                addItem(product, 1);
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="neon" size="sm" asChild>
              <Link to={`/product/${product.slug}`} onClick={(e) => e.stopPropagation()}>View</Link>
            </Button>
          </motion.div>
        </Link>

        <Link to={`/product/${product.slug}`} className="block p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display font-bold text-lg leading-tight">{product.name}</h3>
            <div className="font-display text-lg font-bold text-gradient-brand whitespace-nowrap">
              ${product.price}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Zap className="h-3 w-3 text-primary" /> {product.speedKmh} km/h
            </span>
            <span className="text-border">|</span>
            <span>{product.scale}</span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
