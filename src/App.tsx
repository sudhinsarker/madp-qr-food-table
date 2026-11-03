import React, { useState } from "react";
import { Utensils, QrCode, ShoppingBag, CheckCircle, Plus, Minus, X, CreditCard, DollarSign } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isVeg: boolean;
  tag?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "m1", name: "Crispy Truffle Fries", category: "Starters", price: 7.50, description: "Hand-cut potato fries tossed in aromatic white truffle oil, sea salt, and parmesan cheese.", isVeg: true, tag: "Popular" },
  { id: "m2", name: "Smoked Chicken Wings", category: "Starters", price: 9.80, description: "Glazed in house-made spicy BBQ & honey reduction, served with herb ranch dipping sauce.", isVeg: false },
  { id: "m3", name: "Wood-Fired Margherita", category: "Mains", price: 13.50, description: "San Marzano tomatoes, fresh buffalo mozzarella, aromatic basil leaves, extra virgin olive oil.", isVeg: true, tag: "Chef's Pick" },
  { id: "m4", name: "Signature Wagyu Burger", category: "Mains", price: 16.90, description: "200g grilled Wagyu patty, aged cheddar, caramelised onion jam, brioche bun with crispy fries.", isVeg: false, tag: "Best Seller" },
  { id: "m5", name: "Wild Mushroom Tagliatelle", category: "Mains", price: 14.20, description: "Fresh pasta ribbons sauteed with chanterelles, porcini cream sauce, roasted garlic, micro-greens.", isVeg: true },
  { id: "m6", name: "Artisanal Citrus Iced Tea", category: "Drinks", price: 4.50, description: "Cold-brewed Ceylon tea infused with fresh yuzu, blood orange, and fragrant garden mint.", isVeg: true },
  { id: "m7", name: "Sparkling Berry Fizz", category: "Drinks", price: 5.20, description: "Crushed raspberries, blackberries, sparkling mineral water, splash of Sicilian lime.", isVeg: true },
  { id: "m8", name: "Warm Molten Choco Lava", category: "Desserts", price: 6.80, description: "Belgian dark chocolate cake with flowing warm center, served with Madagascan vanilla gelato.", isVeg: true }
];

const CATEGORIES = ["All", "Starters", "Mains", "Drinks", "Desserts"];

export default function App() {
  const [table] = useState("Table 4");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [payMethod, setPayMethod] = useState<"counter" | "card">("counter");
  const [notes, setNotes] = useState("");
  const [activeOrder, setActiveOrder] = useState<{ id: string; time: string; items: { name: string; qty: number; price: number }[]; total: number; status: string } | null>(null);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[id]) return prev;
      if (copy[id] <= 1) delete copy[id];
      else copy[id] -= 1;
      return copy;
    });
  };

  const placeOrder = () => {
    if (totalItems === 0) return;
    const orderItems = Object.entries(cart).map(([id, qty]) => {
      const it = MENU_ITEMS.find((m) => m.id === id)!;
      return { name: it.name, qty, price: it.price };
    });
    const order = {
      id: "RST-" + Math.floor(1000 + Math.random() * 9000),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      items: orderItems,
      total: subtotal,
      status: "Accepted by Kitchen"
    };
    setActiveOrder(order);
    setCart({});
    setCartOpen(false);
  };

  const filteredItems = activeCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-orange-500/20">
              <Utensils size={20} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight text-lg">RestroQR Dining</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <QrCode size={12} className="text-emerald-600" />
                <span>Connected via Table QR code</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {table}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-28">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 p-5 text-white shadow-lg">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 mb-2">Instant Table Order</span>
          <h2 className="text-xl md:text-2xl font-bold">Browse & Order Directly from Your Phone</h2>
          <p className="text-xs md:text-sm text-white/85 mt-1">No registration required. Select your dishes and our staff will deliver straight to {table}.</p>
        </div>

        {activeOrder && (
          <div className="mb-6 rounded-2xl bg-white border border-emerald-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-emerald-600" size={20} />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Order #{activeOrder.id} Active</h3>
                  <p className="text-xs text-slate-500">Placed at {activeOrder.time} · {table}</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {activeOrder.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
              <span>{activeOrder.items.length} items ordered</span>
              <span className="font-semibold text-slate-900">${activeOrder.total.toFixed(2)}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-2/3 rounded-full transition-all duration-500" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={"px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 " + (
                activeCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const count = cart[item.id] || 0;
            return (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={"inline-block w-2.5 h-2.5 rounded-full " + (item.isVeg ? "bg-emerald-500" : "bg-red-500")} title={item.isVeg ? "Vegetarian" : "Non-Veg"} />
                      <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                    </div>
                    {item.tag && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-900 text-lg">${item.price.toFixed(2)}</span>
                  {count > 0 ? (
                    <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-1">
                      <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-lg bg-white text-orange-700 flex items-center justify-center font-bold hover:bg-orange-100 shadow-xs">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-xs px-1 text-orange-950">{count}</span>
                      <button onClick={() => addToCart(item.id)} className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold hover:bg-orange-700 shadow-xs">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-xs flex items-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {totalItems > 0 && !cartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full bg-slate-950 text-white rounded-2xl p-4 shadow-xl flex items-center justify-between hover:bg-slate-900 transition border border-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-sm">
                <ShoppingBag size={18} />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">{totalItems} {totalItems === 1 ? "item" : "items"} in order</div>
                <div className="text-xs text-slate-400">Delivering to {table}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-base">${subtotal.toFixed(2)}</span>
              <span className="px-3 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold">View Cart</span>
            </div>
          </button>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Order Summary</h3>
                <p className="text-xs text-slate-500">{table} · Instant Kitchen Order</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {Object.entries(cart).map(([id, qty]) => {
                const item = MENU_ITEMS.find((m) => m.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-slate-900 text-sm truncate">{item.name}</div>
                      <div className="text-xs text-slate-500">${item.price.toFixed(2)} each</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(id)} className="w-6 h-6 rounded-md bg-white text-slate-700 flex items-center justify-center border border-slate-200 text-xs">
                        <Minus size={12} />
                      </button>
                      <span className="font-bold text-xs text-slate-900 w-4 text-center">{qty}</span>
                      <button onClick={() => addToCart(id)} className="w-6 h-6 rounded-md bg-white text-slate-700 flex items-center justify-center border border-slate-200 text-xs">
                        <Plus size={12} />
                      </button>
                      <span className="font-bold text-xs text-slate-900 ml-2 w-12 text-right">
                        ${(item.price * qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Alex"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kitchen Notes / Dietary Requests</label>
                <textarea
                  placeholder="e.g. Extra spicy, dressing on the side..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayMethod("counter")}
                    className={"p-3 rounded-xl border text-left text-xs transition " + (
                      payMethod === "counter"
                        ? "border-orange-600 bg-orange-50 text-orange-950 font-semibold"
                        : "border-slate-200 bg-white text-slate-700"
                    )}
                  >
                    <DollarSign size={16} className="mb-1 text-orange-600" />
                    <div>Pay at Counter</div>
                    <div className="text-[10px] text-slate-500 font-normal">Cash or POS terminal</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayMethod("card")}
                    className={"p-3 rounded-xl border text-left text-xs transition " + (
                      payMethod === "card"
                        ? "border-orange-600 bg-orange-50 text-orange-950 font-semibold"
                        : "border-slate-200 bg-white text-slate-700"
                    )}
                  >
                    <CreditCard size={16} className="mb-1 text-orange-600" />
                    <div>Card / Digital Pay</div>
                    <div className="text-[10px] text-slate-500 font-normal">Instant settlement</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 mb-3">
                <span>Total Amount:</span>
                <span className="text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={placeOrder}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                <span>Confirm & Send to Kitchen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
