"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Clock, Trash2, ShoppingCart, Bike } from "lucide-react";
import { mockRestaurants, mockFoodItems } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";

export default function WishlistPage() {
  const [wishlistRestaurants, setWishlistRestaurants] = useState(mockRestaurants.slice(0, 3));
  const [wishlistFoods, setWishlistFoods] = useState(mockFoodItems.slice(0, 4));
  const [tab, setTab] = useState<"restaurants" | "foods">("restaurants");
  const addItem = useCartStore((s) => s.addItem);

  const removeRestaurant = (id: string) => {
    setWishlistRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const removeFood = (id: string) => {
    setWishlistFoods((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart style={{ width: 20, height: 20, color: "#EF4444", fill: "#EF4444" }} />
        </div>
        <div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>Wishlist</h1>
          <p style={{ color: "#6B7280", fontSize: 14 }}>
            {wishlistRestaurants.length + wishlistFoods.length} saved items
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {(["restaurants", "foods"] as const).map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 18px", borderRadius: 12, border: "1px solid",
              borderColor: tab === t ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)",
              background: tab === t ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
              color: tab === t ? "#C4B5FD" : "#6B7280", fontSize: 13, fontWeight: 600, cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "restaurants" ? (
        /* ── RESTAURANTS TAB ── */
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {wishlistRestaurants.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <Heart style={{ width: 44, height: 44, color: "#374151", margin: "0 auto 16px" }} />
              <p style={{ color: "#6B7280", fontSize: 14 }}>No favorite restaurants yet</p>
            </div>
          ) : (
            wishlistRestaurants.map((r) => (
              <div key={r.id} style={{
                background: "#181424", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 16,
                display: "flex", gap: 16, alignItems: "center", transition: "all 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ position: "relative", width: 68, height: 68, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
                  <Link href={`/restaurant/${r.id}`}>
                    <Image src={r.image} alt={r.name} fill style={{ objectFit: "cover" }} sizes="68px" />
                  </Link>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <Link href={`/restaurant/${r.id}`} style={{ textDecoration: "none" }}>
                      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#C4B5FD")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
                      >
                        {r.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeRestaurant(r.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#4B5563", padding: 2 }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#F87171")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#4B5563")}
                    >
                      <Trash2 style={{ width: 15, height: 15 }} />
                    </button>
                  </div>
                  <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 8 }}>{r.cuisine.join(" • ")}</p>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#6B7280" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star style={{ width: 12, height: 12, color: "#FBBF24", fill: "#FBBF24" }} /> {r.rating}
                    </span>
                    <span>🕒 {r.deliveryTime}m</span>
                    <span style={{ color: r.deliveryFee === 0 ? "#4ADE80" : "#6B7280" }}>
                      <Bike style={{ width: 12, height: 12, display: "inline", marginRight: 3, verticalAlign: "middle" }} />
                      {r.deliveryFee === 0 ? "Free" : formatCurrency(r.deliveryFee)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* ── FOODS TAB ── */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {wishlistFoods.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 0" }}>
              <Heart style={{ width: 44, height: 44, color: "#374151", margin: "0 auto 16px" }} />
              <p style={{ color: "#6B7280", fontSize: 14 }}>No favorite foods yet</p>
            </div>
          ) : (
            wishlistFoods.map((food) => {
              const restaurant = mockRestaurants.find((r) => r.id === food.restaurantId)!;
              return (
                <div key={food.id} style={{
                  background: "#181424", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20,
                  overflow: "hidden", transition: "all 0.25s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.25)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <div style={{ position: "relative", height: 130, overflow: "hidden", background: "#1E1830" }}>
                    <Link href={`/food/${food.id}`}>
                      <Image src={food.image} alt={food.name} fill style={{ objectFit: "cover" }} sizes="220px" />
                    </Link>
                    <button
                      onClick={() => removeFood(food.id)}
                      style={{
                        position: "absolute", top: 10, right: 10, width: 28, height: 28,
                        borderRadius: 8, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        color: "#F87171",
                      }}
                    >
                      <Heart style={{ width: 13, height: 13, fill: "currentColor" }} />
                    </button>
                  </div>
                  <div style={{ padding: 14 }}>
                    <Link href={`/food/${food.id}`} style={{ textDecoration: "none" }}>
                      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{food.name}</h3>
                    </Link>
                    <p style={{ color: "#4B5563", fontSize: 11, marginBottom: 12 }}>{restaurant.name}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: "#C4B5FD", fontWeight: 800, fontSize: 15 }}>{formatCurrency(food.price)}</span>
                      <button
                        onClick={() => addItem(food, { id: restaurant.id, name: restaurant.name, image: restaurant.image, deliveryFee: restaurant.deliveryFee })}
                        style={{
                          width: 32, height: 32, borderRadius: 10, border: "none", cursor: "pointer",
                          background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                        }}
                      >
                        <ShoppingCart style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
