import { createContext, useContext, useEffect, useReducer, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + qty } : i,
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: qty }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items
          .map((i) => (i.product.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i))
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
};

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "apexrc_cart_v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed?.items) dispatch({ type: "HYDRATE", state: parsed });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, hydrated]);

  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    count,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (product, quantity) => {
      dispatch({ type: "ADD", product, quantity });
      setIsOpen(true);
    },
    removeItem: (id) => dispatch({ type: "REMOVE", id }),
    setQuantity: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const noopCart: CartContextValue = {
  items: [],
  count: 0,
  subtotal: 0,
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  clear: () => {},
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    if (import.meta.env.DEV) {
      console.warn("useCart called outside CartProvider — returning noop cart");
    }
    return noopCart;
  }
  return ctx;
};
