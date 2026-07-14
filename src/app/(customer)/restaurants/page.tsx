"use client";

import { useState } from "react";
import { Search, Star, Clock, Bike, Filter, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockRestaurants } from "@/lib/mockData";

const cuisines = ["All", "American", "Japanese", "Italian", "Mexican", "Healthy", "Vegan"];
const sortOptions = [
  { value: "rating", label: "Top Rated" },
  { value: "time",   label: "Fastest"   },
  { value: "fee",    label: "Free Delivery" },
];

export default function RestaurantsPage() {
  const [search, setSearch]         = useState("");
  const [cuisine, setCuisine]       = useState("All");
  const [sortBy, setSortBy]         = useState("rating");
  const [showSort, setShowSort]     = useState(false);

  const filtered = mockRestaurants
    .filter((r) => {
      const matchSearch  = !search  || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()));
      const matchCuisine = cuisine === "All" || r.cuisine.some(c => c.toLowerCase() === cuisine.toLowerCase());
      return matchSearch && matchCuisine;
    })
    .sort((a, b) =>
      sortBy === "rating" ? b.rating - a.rating :
      sortBy === "time"   ? parseInt(a.deliveryTime) - parseInt(b.deliveryTime) :
      a.deliveryFee - b.deliveryFee
    );

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "32px 20px 80px", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>Restaurants</h1>
        <p style={{ color: "#6B7280", fontSize: 14 }}>Discover the best food near you</p>
      </div>

      {/* Search + Sort row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, height: 48, background: "#181424", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "0 14px" }}>
          <Search style={{ width: 16, height: 16, color: "#4B5563", flexShrink: 0 }} />
          <input type="text" placeholder="Search by restaurant name or cuisine..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14 }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowSort(!showSort)} style={{
            height: 48, padding: "0 16px", borderRadius: 14, display: "flex", alignItems: "center", gap: 8,
            background: "#181424", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontSize: 14, cursor: "pointer",
          }}>
            <Filter style={{ width: 15, height: 15 }} />
            {sortOptions.find(o => o.value === sortBy)?.label}
            <ChevronDown style={{ width: 14, height: 14 }} />
          </button>
          {showSort && (
            <div style={{ position: "absolute", right: 0, top: 54, background: "#181424", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", zIndex: 20, width: 160 }}>
              {sortOptions.map(o => (
                <button key={o.value} onClick={() => { setSortBy(o.value); setShowSort(false); }}
                  style={{ width: "100%", padding: "11px 16px", background: sortBy === o.value ? "rgba(139,92,246,0.12)" : "transparent", border: "none", color: sortBy === o.value ? "#C4B5FD" : "#9CA3AF", fontSize: 13, cursor: "pointer", textAlign: "left" }}>
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cuisine tabs */}
      <div className="no-scrollbar" style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 28, paddingBottom: 4 }}>
        {cuisines.map(c => (
          <button key={c} onClick={() => setCuisine(c)} style={{
            flexShrink: 0, padding: "8px 18px", borderRadius: 12, border: "1px solid",
            borderColor: cuisine === c ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)",
            background: cuisine === c ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
            color: cuisine === c ? "#C4B5FD" : "#6B7280", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ color: "#4B5563", fontSize: 13, marginBottom: 20 }}>{filtered.length} restaurants found</p>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {filtered.map((r) => (
          <Link key={r.id} href={`/restaurant/${r.id}`} style={{ textDecoration: "none" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", background: "#181424", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.25)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 180, background: "#1E1830", overflow: "hidden" }}>
                <Image src={r.image} alt={r.name} fill style={{ objectFit: "cover" }} sizes="350px" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(24,20,36,0.85) 0%, transparent 55%)" }} />
                {r.isFeatured && (
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(139,92,246,0.9)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>⭐ Featured</div>
                )}
                <div style={{ position: "absolute", top: 12, right: 12, background: r.isOpen ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>
                  {r.isOpen ? "Open" : "Closed"}
                </div>
                <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{r.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{r.cuisine.slice(0, 2).join(" • ")}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", padding: "4px 9px", borderRadius: 9 }}>
                    <Star style={{ width: 11, height: 11, color: "#FBBF24", fill: "#FBBF24" }} />
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{r.rating}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#6B7280", fontSize: 12 }}>
                    <Clock style={{ width: 12, height: 12 }} /> {r.deliveryTime} min
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: r.deliveryFee === 0 ? "#4ADE80" : "#6B7280", fontSize: 12 }}>
                    <Bike style={{ width: 12, height: 12 }} /> {r.deliveryFee === 0 ? "Free delivery" : `$${r.deliveryFee}`}
                  </span>
                </div>
                <span style={{ color: "#4B5563", fontSize: 11 }}>Min. ${r.minimumOrder}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
          <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No restaurants found</h3>
          <p style={{ color: "#6B7280", fontSize: 14 }}>Try a different search or cuisine filter</p>
        </div>
      )}
    </div>
  );
}
