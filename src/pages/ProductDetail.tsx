import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Star, Truck, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getProduct, products } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — RC Drift Cars`;
      window.scrollTo(0, 0);
      setActiveImage(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto pt-32 pb-20 text-center">
          <h1 className="font-display text-4xl font-black">Build not found</h1>
          <p className="text-muted-foreground mt-3 mb-6">That model isn't in the garage.</p>
          <Button variant="hero" asChild>
            <Link to="/shop">Browse Shop</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on: true,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-glow transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <div
                className="relative aspect-square overflow-hidden rounded-3xl border border-border/60 bg-card-grad cursor-zoom-in"
                onMouseMove={handleZoom}
                onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.gallery[activeImage]}
                    alt={`${product.name} view ${activeImage + 1}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full w-full object-cover"
                    style={
                      zoom.on
                        ? {
                            transform: "scale(1.6)",
                            transformOrigin: `${zoom.x}% ${zoom.y}%`,
                            transition: "transform 0.1s linear",
                          }
                        : undefined
                    }
                  />
                </AnimatePresence>
                <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                  {product.tag}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-drift ${
                      activeImage === i ? "border-primary shadow-neon" : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
              <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">{product.type}</div>
              <h1 className="font-display text-4xl md:text-5xl font-black leading-tight">{product.name}</h1>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-4xl font-black text-gradient-brand">${product.price}</span>
                <span className="text-sm text-muted-foreground">shipping calculated at checkout</span>
              </div>

              <p className="mt-6 text-foreground/80 leading-relaxed">{product.description}</p>

              {/* Drift Performance */}
              <div className="mt-8 rounded-2xl border border-border/60 bg-card-grad p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-4 w-4 text-primary-glow" />
                  <div className="text-xs font-bold tracking-widest uppercase">Drift Performance</div>
                </div>
                <div className="space-y-3">
                  {product.performance.map((p) => (
                    <div key={p.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{p.label}</span>
                        <span className="font-display font-bold">{p.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.value}%` }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-brand"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity + add */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center rounded-lg border border-border bg-background/60 h-14">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-14 w-12 flex items-center justify-center hover:text-primary-glow transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-display font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-14 w-12 flex items-center justify-center hover:text-primary-glow transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  variant="hero"
                  size="xl"
                  className="flex-1"
                  onClick={() => addItem(product, quantity)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary-glow" />
                Free worldwide shipping over $150 · 2-year warranty
              </div>

              {/* Features */}
              <div className="mt-8">
                <div className="text-xs font-bold tracking-widest uppercase mb-3 text-muted-foreground">Includes</div>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specs */}
          <section className="mt-20">
            <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">Specifications</div>
            <h2 className="font-display text-3xl md:text-4xl font-black mb-8">Built to spec.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border/60">
              {product.specs.map((s) => (
                <div key={s.label} className="bg-card p-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  <div className="font-display font-bold mt-1">{s.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mt-20">
            <h2 className="font-display text-3xl md:text-4xl font-black mb-8">You might also drift.</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card-grad hover:border-primary/40 transition-drift"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="font-display font-bold">{p.name}</div>
                    <div className="font-display font-bold text-gradient-brand">${p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
