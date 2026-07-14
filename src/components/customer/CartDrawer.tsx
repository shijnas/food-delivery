"use client";

import { X, ShoppingCart, Minus, Plus, Trash2, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { formatCurrency } from "@/lib/utils";

export default function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, updateQuantity, removeItem, getSubtotal, getDeliveryFee, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  if (!cartDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer */}
      <div style={{
        position: "fixed", right: 0, top: 0, bottom: 0, zIndex: 100,
        width: "100%", maxWidth: 380,
        background: "#0D0B14", borderLeft: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "-10px 0 40px rgba(0,0,0,0.5)",
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 20, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #7C3AED, #EC4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingCart style={{ width: 18, height: 18, color: "#fff" }} />
            </div>
            <div>
              <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: 0 }}>Your Cart</h2>
              <p style={{ color: "#6B7280", fontSize: 12, margin: "2px 0 0" }}>
                {items.length === 0 ? "Empty" : `${items.reduce((a, i) => a + i.quantity, 0)} items`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            style={{
              width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#9CA3AF", cursor: "pointer",
            }}
          >
            <X style={{ width: 15, height: 15 }} />
          </button>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <ShoppingCart style={{ width: 28, height: 28, color: "#A78BFA" }} />
              </div>
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Cart is empty</h3>
              <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>Add items from a restaurant to start your order</p>
              <button
                onClick={() => setCartDrawerOpen(false)}
                style={{
                  padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                  color: "#fff", fontSize: 14, fontWeight: 700,
                  boxShadow: "0 0 20px rgba(124,58,237,0.35)",
                }}
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <>
              {/* Restaurant Header inside Cart */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ position: "relative", width: 40, height: 40, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                  <Image src={items[0].restaurant.image} alt={items[0].restaurant.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{items[0].restaurant.name}</p>
                  <p style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>Delivery: {formatCurrency(deliveryFee)}</p>
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: 12, padding: 12, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ position: "relative", width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#1E1830" }}>
                      <Image src={item.foodItem.image} alt={item.foodItem.name} fill style={{ objectFit: "cover" }} sizes="56px" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.foodItem.name}
                      </h4>
                      <p style={{ color: "#C4B5FD", fontSize: 13, fontWeight: 700, margin: "4px 0 8px" }}>
                        {formatCurrency(item.totalPrice)}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {/* Quantity Controls */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", padding: 3, borderRadius: 10 }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{ width: 22, height: 22, borderRadius: 6, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.05)", color: "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Minus style={{ width: 10, height: 10 }} />
                          </button>
                          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: "center" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{ width: 22, height: 22, borderRadius: 6, border: "none", cursor: "pointer", background: "rgba(139,92,246,0.2)", color: "#C4B5FD", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Plus style={{ width: 10, height: 10 }} />
                          </button>
                        </div>
                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#4B5563" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#F87171")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#4B5563")}
                        >
                          <Trash2 style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: 20, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6B7280" }}>
                <span>Subtotal</span>
                <span style={{ color: "#fff" }}>{formatCurrency(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6B7280" }}>
                <span>Delivery Fee</span>
                <span style={{ color: "#fff" }}>{formatCurrency(deliveryFee)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#fff", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10 }}>
                <span>Total</span>
                <span style={{ color: "#C4B5FD", fontSize: 16 }}>{formatCurrency(total)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={() => setCartDrawerOpen(false)} style={{ textDecoration: "none" }}>
              <button
                style={{
                  width: "100%", height: 48, borderRadius: 14, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                  color: "#fff", fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  boxShadow: "0 0 20px rgba(124,58,237,0.35)",
                }}
              >
                Checkout <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
