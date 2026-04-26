import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, setQuantity, subtotal, count } = useCart();
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[440px] glass-strong border-l border-border/60 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand">
                  <ShoppingBag className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-display font-bold tracking-widest text-sm">YOUR CART</div>
                  <div className="text-xs text-muted-foreground">{count} {count === 1 ? "item" : "items"}</div>
                </div>
              </div>
              <Button variant="ghostNeon" size="icon" onClick={closeCart} aria-label="Close cart">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <div className="font-display text-lg font-bold">Cart is empty</div>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                    No drift cars yet. Time to fix that.
                  </p>
                  <Button variant="hero" className="mt-6" onClick={closeCart} asChild>
                    <Link to="/shop">Browse the Shop</Link>
                  </Button>
                </div>
              )}

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 rounded-xl border border-border/60 bg-card-grad p-3"
                  >
                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-display font-bold text-sm leading-tight hover:text-primary-glow transition-colors truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Remove"
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.product.tag} · {item.product.scale}</div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 rounded-md border border-border bg-background/60">
                          <button
                            onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                            className="h-7 w-7 flex items-center justify-center hover:text-primary-glow transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                            className="h-7 w-7 flex items-center justify-center hover:text-primary-glow transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="font-display font-bold text-gradient-brand">
                          ${item.product.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border/60 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground font-medium">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground font-medium">
                      {shipping === 0 ? "FREE" : `$${shipping}`}
                    </span>
                  </div>
                  {subtotal < 150 && (
                    <div className="text-xs text-primary-glow">
                      Add ${150 - subtotal} for free shipping.
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-border/60 font-display font-bold text-lg">
                    <span>Total</span>
                    <span className="text-gradient-brand">${total}</span>
                  </div>
                </div>
                <Button variant="hero" size="lg" className="w-full" asChild onClick={closeCart}>
                  <Link to="/checkout">Checkout</Link>
                </Button>
                <button
                  onClick={closeCart}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
