"use client";

import { useState, useEffect } from "react";
import { Search, Mic, Filter, TrendingUp, Sparkles, Clock, Gift, Download, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockRestaurants, mockFoodItems, mockCategories } from "@/lib/mockData";
import FoodCard from "@/components/customer/FoodCard";
import Badge from "@/components/ui/Badge";

const banners = [
  { id: 1, title: "50% OFF",        subtitle: "On your first order this weekend", code: "FIRST50",     gradA: "#7C3AED", gradB: "#EC4899" },
  { id: 2, title: "Free Delivery",  subtitle: "On all orders above $25 today",   code: "FREEDEL",     gradA: "#2563EB", gradB: "#06B6D4" },
  { id: 3, title: "New: AI Picks",  subtitle: "Let AI choose your next meal",    code: null,           gradA: "#059669", gradB: "#10B981" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const [search, setSearch] = useState("");
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Capacitor) {
      setIsNative(true);
    }
  }, []);

  // Filter restaurants by search and selected category
  const filteredRestaurants = mockRestaurants.filter((r) => {
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchCuisine = !selectedCategory || r.cuisine.some(c => c.toLowerCase() === selectedCategory.toLowerCase());
    return matchSearch && matchCuisine;
  });

  // Filter food items by search and selected category
  const filteredFoods = mockFoodItems.filter((item) => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    
    // Find parent restaurant
    const restaurant = mockRestaurants.find((r) => r.id === item.restaurantId);
    if (!restaurant) return false;

    // Check category match
    const matchCategory = !selectedCategory || 
      restaurant.cuisine.some(c => c.toLowerCase() === selectedCategory.toLowerCase()) ||
      item.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      item.description.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchSearch && matchCategory;
  });

  return (
    <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "32px 20px 80px", boxSizing: "border-box" }}>

      {/* ── 1. GREETING ROW (Centered) ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", marginBottom: 28 }}>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 6 }}>Good evening 👋</p>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 16 }}>
          What are you craving?
        </h1>
        {/* Download App Button (Centered pill) */}
        {!isNative && (
          <a href="/kayikk.apk" download="kayikk.apk" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 100,
            background: "linear-gradient(135deg, #7C3AED, #EC4899)",
            color: "#fff", textDecoration: "none",
            fontSize: 13, fontWeight: 700,
            boxShadow: "0 0 20px rgba(124,58,237,0.35)",
          }}>
            <Download style={{ width: 14, height: 14 }} />
            Download App
          </a>
        )}
      </div>

      {/* ── 2. SEARCH BAR (Centered & Constrained) ── */}
      <div style={{ position: "relative", maxWidth: 640, margin: "0 auto 36px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, height: 52,
          background: "#181424", border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 16, padding: "0 16px",
        }}>
          <Search style={{ width: 18, height: 18, color: "#4B5563", flexShrink: 0 }} />
          <input
            id="food-search"
            type="text"
            placeholder="Search restaurants, food, cuisines..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(139,92,246,0.12)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#A78BFA" }}>
              <Mic style={{ width: 14, height: 14 }} />
            </button>
            <button style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
              <Filter style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. BROWSE CATEGORIES (Centered) ── */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Browse Categories</h2>
        <div className="no-scrollbar" style={{ display: "flex", gap: 12, overflowX: "auto", justifyContent: "center", paddingBottom: 4 }}>
          {[{ id: "all", name: "All", icon: "🍽️" }, ...mockCategories].map((cat) => {
            const isActive = cat.id === "all" ? !selectedCategory : selectedCategory === cat.name;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id === "all" ? null : cat.name)}
                style={{
                  flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  padding: "12px 16px", borderRadius: 16, border: "1px solid",
                  borderColor: isActive ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)",
                  background: isActive ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer", minWidth: 68, transition: "all 0.2s",
                }}>
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: isActive ? "#C4B5FD" : "#6B7280" }}>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. PROMO BANNERS (Centered) ── */}
      <div style={{ marginBottom: 44 }}>
        <div className="no-scrollbar" style={{ display: "flex", gap: 16, overflowX: "auto", justifyContent: "center", paddingBottom: 8 }}>
          {banners.map((banner, i) => (
            <div
              key={banner.id}
              onClick={() => setActiveBanner(i)}
              style={{
                flexShrink: 0, width: 280, height: 130, borderRadius: 20,
                background: `linear-gradient(135deg, ${banner.gradA}, ${banner.gradB})`,
                position: "relative", overflow: "hidden", cursor: "pointer",
                outline: i === activeBanner ? "2px solid rgba(255,255,255,0.3)" : "none",
                outlineOffset: 2,
              }}
            >
              <div style={{ position: "relative", zIndex: 1, padding: "20px 20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 500, marginBottom: 4 }}>{banner.subtitle}</p>
                  <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>{banner.title}</h3>
                </div>
                {banner.code && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 10, width: "fit-content" }}>
                    <Gift style={{ width: 11, height: 11, color: "#fff" }} />
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{banner.code}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => setActiveBanner(i)} style={{
              height: 5, borderRadius: 3, border: "none", cursor: "pointer",
              width: i === activeBanner ? 24 : 6,
              background: i === activeBanner ? "#8B5CF6" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* ── 5. FEATURED RESTAURANTS (Centered Grid) ── */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <TrendingUp style={{ width: 18, height: 18, color: "#A78BFA" }} />
            <h2 style={{ color: "#fff", fontSize: 19, fontWeight: 700 }}>
              {selectedCategory ? `${selectedCategory} Restaurants` : "Featured Restaurants"}
            </h2>
            <span style={{ color: "#4B5563", fontSize: 13 }}>({filteredRestaurants.length})</span>
          </div>
          <Link href="/restaurants" style={{ color: "#A78BFA", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>See all →</Link>
        </div>
        {filteredRestaurants.length === 0 ? (
          <p style={{ color: "#6B7280", fontSize: 14, textAlign: "center", padding: "30px 0" }}>No restaurants found in this category.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            {filteredRestaurants.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/restaurant/${r.id}`} style={{ textDecoration: "none", width: "100%", maxWidth: 280, flexShrink: 0 }}>
                <div style={{ borderRadius: 20, overflow: "hidden", background: "#181424", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.25)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <div style={{ position: "relative", height: 160, background: "#1E1830", overflow: "hidden" }}>
                    <Image src={r.image} alt={r.name} fill style={{ objectFit: "cover" }} sizes="300px" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(24,20,36,0.8) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{r.name}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: 8 }}>
                        <Star style={{ width: 11, height: 11, color: "#FBBF24", fill: "#FBBF24" }} />
                        <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{r.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#6B7280", fontSize: 12 }}>{r.cuisine.slice(0, 2).join(" • ")}</p>
                    <div style={{ display: "flex", gap: 12, color: "#6B7280", fontSize: 12 }}>
                      <span>🕒 {r.deliveryTime} min</span>
                      <span style={{ color: "#4ADE80" }}>Free</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── 6. AI RECOMMENDATIONS (Centered Grid) ── */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Sparkles style={{ width: 18, height: 18, color: "#A78BFA" }} />
            <h2 style={{ color: "#fff", fontSize: 19, fontWeight: 700 }}>
              {selectedCategory ? `${selectedCategory} Specials` : "AI Picks For You"}
            </h2>
            <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(139,92,246,0.2)", color: "#C4B5FD", border: "1px solid rgba(139,92,246,0.3)", padding: "2px 7px", borderRadius: 6 }}>NEW</span>
          </div>
        </div>
        {filteredFoods.length === 0 ? (
          <p style={{ color: "#6B7280", fontSize: 14, textAlign: "center", padding: "30px 0" }}>No food items found in this category.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {filteredFoods.slice(0, 4).map((item) => {
              const restaurant = mockRestaurants.find((r) => r.id === item.restaurantId)!;
              return (
                <div key={item.id} style={{ width: "100%", maxWidth: 220, flexShrink: 0 }}>
                  <FoodCard item={item} restaurant={{ id: restaurant.id, name: restaurant.name, image: restaurant.image, deliveryFee: restaurant.deliveryFee }} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 7. RECENTLY VIEWED (Centered) ── */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Clock style={{ width: 18, height: 18, color: "#A78BFA" }} />
            <h2 style={{ color: "#fff", fontSize: 19, fontWeight: 700 }}>Recently Viewed</h2>
          </div>
        </div>
        <div className="no-scrollbar" style={{ display: "flex", gap: 16, overflowX: "auto", justifyContent: "center", paddingBottom: 4 }}>
          {mockFoodItems.slice(4, 8).map((item) => {
            const restaurant = mockRestaurants.find((r) => r.id === item.restaurantId);
            if (!restaurant) return null;
            return (
              <div key={item.id} style={{ flexShrink: 0, width: 220 }}>
                <FoodCard item={item} restaurant={{ id: restaurant.id, name: restaurant.name, image: restaurant.image, deliveryFee: restaurant.deliveryFee }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 8. LOYALTY WIDGET (Centered Constraint) ── */}
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", padding: 24, borderRadius: 20, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", overflow: "hidden", width: "100%", maxWidth: 640 }}>
          <div style={{ position: "absolute", top: "-30%", right: "-5%", width: 200, height: 200, borderRadius: "50%", background: "rgba(139,92,246,0.15)", filter: "blur(60px)" }} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #7C3AED, #EC4899)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🏆</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Loyalty Points</h3>
                <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(139,92,246,0.2)", color: "#C4B5FD", border: "1px solid rgba(139,92,246,0.3)", padding: "3px 8px", borderRadius: 6 }}>Gold Member</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 28, fontWeight: 800, background: "linear-gradient(to right, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Outfit, sans-serif" }}>1,250</span>
                <span style={{ color: "#6B7280", fontSize: 13 }}>points</span>
              </div>
              <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "62%", height: "100%", background: "linear-gradient(to right, #7C3AED, #EC4899)", borderRadius: 3 }} />
              </div>
              <p style={{ color: "#4B5563", fontSize: 11, marginTop: 6 }}>750 pts to Platinum tier</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
