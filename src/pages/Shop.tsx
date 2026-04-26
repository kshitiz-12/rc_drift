import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products, type CarType } from "@/data/products";

const TYPES: CarType[] = ["Beginner", "Pro", "Drift", "Limited"];
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "speed-desc", label: "Fastest" },
] as const;

const Shop = () => {
  const [maxPrice, setMaxPrice] = useState(800);
  const [minSpeed, setMinSpeed] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<CarType[]>([]);
  const [sort, setSort] = useState<typeof SORTS[number]["id"]>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    document.title = "Shop — RC Drift Cars";
    window.scrollTo(0, 0);
  }, []);

  const toggleType = (t: CarType) =>
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.price <= maxPrice &&
        p.speedKmh >= minSpeed &&
        (selectedTypes.length === 0 || selectedTypes.includes(p.type)),
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "speed-desc":
        list = [...list].sort((a, b) => b.speedKmh - a.speedKmh);
        break;
    }
    return list;
  }, [maxPrice, minSpeed, selectedTypes, sort]);

  const reset = () => {
    setMaxPrice(800);
    setMinSpeed(0);
    setSelectedTypes([]);
    setSort("featured");
  };

  const Filters = (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Type</label>
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => {
            const active = selectedTypes.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-drift ${
                  active
                    ? "bg-brand text-primary-foreground border-transparent shadow-neon"
                    : "border-border bg-secondary/40 text-foreground/80 hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Max Price</label>
          <span className="text-sm font-display font-bold text-gradient-brand">${maxPrice}</span>
        </div>
        <input
          type="range"
          min={300}
          max={800}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>$300</span>
          <span>$800</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Min Speed</label>
          <span className="text-sm font-display font-bold text-gradient-brand">{minSpeed} km/h</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={minSpeed}
          onChange={(e) => setMinSpeed(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>0</span>
          <span>100 km/h</span>
        </div>
      </div>

      <Button variant="neon" className="w-full" onClick={reset}>
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">The Garage</div>
            <h1 className="font-display text-4xl md:text-6xl font-black">
              All <span className="text-gradient-brand">Drift Cars</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              {filtered.length} {filtered.length === 1 ? "build" : "builds"} ready to ship. Filter by your weapon of choice.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <Button
              variant="neon"
              size="default"
              className="lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {selectedTypes.length > 0 && (
                <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {selectedTypes.length}
                </span>
              )}
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-muted-foreground hidden sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="h-10 rounded-md bg-secondary/60 border border-border px-3 text-sm focus:border-primary focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 rounded-2xl border border-border/60 bg-card-grad p-6">
                {Filters}
              </div>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-9">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border/60 bg-card-grad p-16 text-center">
                  <div className="font-display text-xl font-bold">No matches</div>
                  <p className="text-sm text-muted-foreground mt-2 mb-6">
                    Try loosening your filters.
                  </p>
                  <Button variant="hero" onClick={reset}>Reset Filters</Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl glass-strong border-t border-border/60 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-display font-bold tracking-widest">FILTERS</div>
              <Button variant="ghostNeon" size="icon" onClick={() => setFiltersOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </Button>
            </div>
            {Filters}
            <Button variant="hero" className="w-full mt-6" onClick={() => setFiltersOpen(false)}>
              Show {filtered.length} results
            </Button>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Shop;
