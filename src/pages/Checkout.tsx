import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Truck } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Field = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block">
    <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{label}</span>
    <input
      {...props}
      className="mt-2 w-full h-12 rounded-lg bg-background/60 border border-border px-4 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-drift"
    />
  </label>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  useEffect(() => {
    document.title = "Checkout — RC Drift Cars";
    window.scrollTo(0, 0);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      clear();
      setProcessing(false);
      setSubmitted(true);
      toast.success("Order placed. Welcome to the crew.");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center rounded-3xl glass-strong border border-primary/30 p-10 shadow-neon"
          >
            <div className="mx-auto h-16 w-16 rounded-full bg-brand flex items-center justify-center mb-6 animate-pulse-glow">
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-black">Order confirmed.</h1>
            <p className="text-muted-foreground mt-3">
              Your RC Drift Cars build is being prepped. You'll get tracking by email within 24 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" asChild>
                <Link to="/shop">Keep Shopping</Link>
              </Button>
              <Button variant="neon" asChild>
                <Link to="/">Back Home</Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-glow transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase mb-3">Secure Checkout</div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-10">
            Almost <span className="text-gradient-brand">on the track</span>.
          </h1>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-border/60 bg-card-grad p-16 text-center max-w-xl">
              <div className="font-display text-xl font-bold">Your cart is empty</div>
              <p className="text-muted-foreground mt-2 mb-6">Add a build before you check out.</p>
              <Button variant="hero" asChild>
                <Link to="/shop">Browse Shop</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-7 space-y-8">
                <section className="rounded-2xl border border-border/60 bg-card-grad p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Truck className="h-4 w-4 text-primary-glow" />
                    <h2 className="font-display font-bold tracking-widest uppercase text-sm">Shipping</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email" type="email" required placeholder="you@apex.com" className="sm:col-span-2" />
                    <Field label="First name" required placeholder="Drift" />
                    <Field label="Last name" required placeholder="King" />
                    <Field label="Address" required placeholder="123 Apex Lane" className="sm:col-span-2" />
                    <Field label="City" required placeholder="Tokyo" />
                    <Field label="ZIP / Postal" required placeholder="100-0001" />
                    <Field label="Country" required placeholder="Japan" className="sm:col-span-2" />
                  </div>
                </section>

                <section className="rounded-2xl border border-border/60 bg-card-grad p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-4 w-4 text-primary-glow" />
                    <h2 className="font-display font-bold tracking-widest uppercase text-sm">Payment</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Card number" required placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                    <Field label="Expiry" required placeholder="MM / YY" />
                    <Field label="CVC" required placeholder="123" />
                    <Field label="Name on card" required placeholder="DRIFT KING" className="sm:col-span-2" />
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Encrypted, PCI-compliant. We never store card details.
                  </div>
                </section>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 rounded-2xl border border-border/60 bg-card-grad p-6 md:p-8">
                  <h2 className="font-display font-bold tracking-widest uppercase text-sm mb-6">Order Summary</h2>
                  <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-bold text-sm truncate">{item.product.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{item.product.tag}</div>
                        </div>
                        <div className="font-display font-bold text-sm">${item.product.price * item.quantity}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/60 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground font-medium">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-foreground font-medium">{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span className="text-foreground font-medium">${tax}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-border/60 font-display font-bold text-lg">
                      <span>Total</span>
                      <span className="text-gradient-brand">${total}</span>
                    </div>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full mt-6" disabled={processing}>
                    {processing ? "Processing..." : `Pay $${total}`}
                  </Button>
                </div>
              </aside>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
