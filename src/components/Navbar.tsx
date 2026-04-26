import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, ShoppingCart, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/#categories", anchor: true },
  { label: "Showcase", to: "/#showcase", anchor: true },
  { label: "About", to: "/#about", anchor: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-drift ${
        scrolled ? "glass-strong border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-brand blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-md bg-brand">
              <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-widest">RC <span className="text-gradient-brand">DRIFT CARS</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) =>
            l.anchor ? (
              <a
                key={l.to}
                href={l.to}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghostNeon" size="icon" aria-label="Cart" className="relative" onClick={openCart}>
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
              >
                {count}
              </motion.span>
            )}
          </Button>
          <Button variant="hero" size="default" className="hidden md:inline-flex" asChild>
            <Link to="/shop">Shop Now</Link>
          </Button>
          <Button
            variant="ghostNeon"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-strong border-t border-border/50"
        >
          <nav className="container mx-auto flex flex-col py-4 gap-1">
            {links.map((l) =>
              l.anchor ? (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-foreground/80 hover:text-primary-glow hover:bg-primary/5 rounded-md transition-colors"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-foreground/80 hover:text-primary-glow hover:bg-primary/5 rounded-md transition-colors"
                >
                  {l.label}
                </Link>
              ),
            )}
            <Button variant="hero" className="mt-2" asChild>
              <Link to="/shop">Shop Now</Link>
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
