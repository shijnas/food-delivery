"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Clock, MapPin, ChevronRight, Star, RotateCcw } from "lucide-react";
import { mockOrders } from "@/lib/mockData";
import { formatCurrency, formatRelativeTime, getOrderStatusColor, getOrderStatusLabel } from "@/lib/utils";

const tabs = ["All", "Active", "Completed", "Cancelled"];

const statusBg: Record<string, { bg: string; color: string; dot: string }> = {
  pending:    { bg: "rgba(234,179,8,0.12)",  color: "#FCD34D", dot: "#EAB308" },
  confirmed:  { bg: "rgba(59,130,246,0.12)", color: "#93C5FD", dot: "#3B82F6" },
  preparing:  { bg: "rgba(249,115,22,0.12)", color: "#FDBA74", dot: "#F97316" },
  on_the_way: { bg: "rgba(139,92,246,0.12)", color: "#C4B5FD", dot: "#8B5CF6" },
  delivered:  { bg: "rgba(34,197,94,0.12)",  color: "#86EFAC", dot: "#22C55E" },
  cancelled:  { bg: "rgba(239,68,68,0.12)",  color: "#FCA5A5", dot: "#EF4444" },
};

export default function OrdersPage() {
  const [tab, setTab] = useState("All");

  const filtered = mockOrders.filter(o => {
    if (tab === "All")       return true;
    if (tab === "Active")    return ["pending","confirmed","preparing","on_the_way"].includes(o.status);
    if (tab === "Completed") return o.status === "delivered";
    if (tab === "Cancelled") return o.status === "cancelled";
    return true;
  });

  return (
    <div style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>My Orders</h1>
        <p style={{ color: "#6B7280", fontSize: 14 }}>{mockOrders.length} total orders</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 18px", borderRadius: 12, border: "1px solid",
            borderColor: tab === t ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)",
            background: tab === t ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
            color: tab === t ? "#C4B5FD" : "#6B7280", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <Package style={{ width: 56, height: 56, color: "#374151", margin: "0 auto 16px" }} />
          <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No orders here</h3>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 24 }}>Start ordering your favourite food!</p>
          <Link href="/home" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 14, background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((order) => {
            const st = statusBg[order.status] || statusBg.pending;
            return (
              <Link key={order.id} href={order.status === "on_the_way" ? `/track/${order.id}` : "#"} style={{ textDecoration: "none" }}>
                <div style={{ background: "#181424", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 20, transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.2)"; (e.currentTarget as HTMLDivElement).style.background = "#1E1830"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.background = "#181424"; }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <div style={{ position: "relative", width: 52, height: 52, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
                      <Image src={order.restaurant.image} alt={order.restaurant.name} fill style={{ objectFit: "cover" }} sizes="52px" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{order.restaurant.name}</h3>
                        <ChevronRight style={{ width: 16, height: 16, color: "#4B5563" }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: st.color }}>{getOrderStatusLabel(order.status)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {order.items.slice(0, 3).map((item, i) => (
                      <span key={i} style={{ fontSize: 12, color: "#6B7280", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", padding: "4px 10px", borderRadius: 8 }}>
                        {item.quantity}× {item.foodItem.name}
                      </span>
                    ))}
                    {order.items.length > 3 && <span style={{ fontSize: 12, color: "#4B5563", padding: "4px 0" }}>+{order.items.length - 3} more</span>}
                  </div>

                  {/* Bottom row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", gap: 16 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#4B5563", fontSize: 12 }}>
                        <Clock style={{ width: 12, height: 12 }} /> {formatRelativeTime(order.createdAt)}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#4B5563", fontSize: 12 }}>
                        <MapPin style={{ width: 12, height: 12 }} /> {order.address.label}
                      </span>
                    </div>
                    <span style={{ color: "#A78BFA", fontWeight: 800, fontSize: 16 }}>{formatCurrency(order.total)}</span>
                  </div>

                  {order.status === "on_the_way" && (
                    <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 12, textAlign: "center" }}>
                      <p style={{ color: "#C4B5FD", fontSize: 13, fontWeight: 600 }}>🛵 Your order is on the way! Tap to track live →</p>
                    </div>
                  )}

                  {order.status === "delivered" && (
                    <button style={{ marginTop: 12, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#9CA3AF", fontSize: 13, cursor: "pointer" }}>
                      <RotateCcw style={{ width: 13, height: 13 }} /> Reorder
                    </button>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
