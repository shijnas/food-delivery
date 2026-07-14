"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Clock,
  Bike,
  MapPin,
  Heart,
  Share2,
  Send,
  MessageSquare
} from "lucide-react";
import { mockRestaurants, mockFoodItems } from "@/lib/mockData";
import FoodCard from "@/components/customer/FoodCard";
import { formatCurrency } from "@/lib/utils";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export default function RestaurantClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [wishlisted, setWishlisted] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([
    { name: "Sarah C.", rating: 5, text: "Amazing food, super fast delivery!", date: "2d ago", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "Marcus J.", rating: 5, text: "Best in the city! Will order again.", date: "5d ago", avatar: "https://i.pravatar.cc/150?img=12" },
  ]);

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const restaurant = mockRestaurants.find((r) => r.id === id) || mockRestaurants[0];
  const foodItems = mockFoodItems.filter((f) => f.restaurantId === restaurant.id);

  const categories = [
    { id: "all", name: "All", icon: "🍽️" },
    ...restaurant.categories,
  ];

  const filteredItems =
    activeCategory === "all"
      ? foodItems
      : foodItems.filter((f) => f.categoryId === activeCategory);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview: Review = {
      name: "You (Customer)",
      rating: newRating,
      text: newComment,
      date: "Just now",
      avatar: "https://i.pravatar.cc/150?img=33", // placeholder user avatar
    };

    setReviews([newReview, ...reviews]);
    setNewComment("");
    setNewRating(5);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0D0B14", fontFamily: "Inter, sans-serif" }}>

      {/* ── HERO HEADER PANEL ── */}
      <div style={{ position: "relative", height: 320, overflow: "hidden", background: "#160d2e" }}>
        <Image
          src={restaurant.coverImage || restaurant.image}
          alt={restaurant.name}
          fill
          style={{ objectFit: "cover", opacity: 0.8 }}
          sizes="100vw"
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 60%, #0D0B14 100%)" }} />

        {/* Floating Top Controls */}
        <div style={{ position: "absolute", top: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between", zIndex: 20 }}>
          <button
            onClick={() => router.back()}
            style={{
              width: 40, height: 40, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.5)", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
            }}
          >
            <ArrowLeft style={{ width: 18, height: 18 }} />
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              style={{
                width: 40, height: 40, borderRadius: 12, border: wishlisted ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.12)",
                background: wishlisted ? "rgba(239,68,68,0.2)" : "rgba(0,0,0,0.5)",
                color: wishlisted ? "#EF4444" : "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
              }}
            >
              <Heart style={{ width: 18, height: 18, fill: wishlisted ? "currentColor" : "none" }} />
            </button>
            <button
              style={{
                width: 40, height: 40, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.5)", color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Share2 style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── CORE CONTENT BLOCK ── */}
      <div style={{ width: "100%", maxWidth: 1024, margin: "-48px auto 0", padding: "0 20px 80px", boxSizing: "border-box", position: "relative", zIndex: 30 }}>

        {/* Restaurant Profile Information Card */}
        <div style={{
          background: "#181424", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24, padding: 24, marginBottom: 32,
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0, fontFamily: "Outfit, sans-serif" }}>{restaurant.name}</h1>
              <p style={{ color: "#6B7280", fontSize: 13, marginTop: 4 }}>{restaurant.cuisine.join(" • ")}</p>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, borderRadius: 8, padding: "4px 10px",
              background: restaurant.isOpen ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
              color: restaurant.isOpen ? "#86EFAC" : "#FCA5A5",
              border: restaurant.isOpen ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(239,68,68,0.3)",
            }}>
              ● {restaurant.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>

          <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>{restaurant.description}</p>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18 }}>
            {[
              { icon: Star, value: `${restaurant.rating} ★`, label: `${reviews.length} Customer Reviews`, color: "#FBBF24" },
              { icon: Clock, value: `${restaurant.deliveryTime} mins`, label: "Average Delivery", color: "#60A5FA" },
              { icon: Bike, value: restaurant.deliveryFee === 0 ? "Free" : formatCurrency(restaurant.deliveryFee), label: "Delivery Charge", color: "#34D399" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <Icon style={{ width: 18, height: 18, color: stat.color, marginBottom: 4 }} />
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{stat.value}</span>
                  <span style={{ color: "#4B5563", fontSize: 10, marginTop: 2 }}>{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Map Location Placeholder */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontSize: 12, color: "#6B7280" }}>
            <MapPin style={{ width: 14, height: 14 }} />
            <span>{restaurant.address}</span>
          </div>
        </div>

        {/* ── MENU CATEGORIES PILLES ── */}
        <div className="no-scrollbar" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 24 }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: 8,
                padding: "10px 18px", borderRadius: 16, border: "1px solid",
                borderColor: activeCategory === cat.id ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)",
                background: activeCategory === cat.id ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                color: activeCategory === cat.id ? "#C4B5FD" : "#6B7280",
                fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 16 }}>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* ── FOOD ITEMS SECTION (Flex wrapped & Centered) ── */}
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Select Dishes</h2>
        {filteredItems.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 48 }}>
            {filteredItems.map((item) => (
              <div key={item.id} style={{ width: "100%", maxWidth: 220, flexShrink: 0 }}>
                <FoodCard
                  item={item}
                  restaurant={{
                    id: restaurant.id,
                    name: restaurant.name,
                    image: restaurant.image,
                    deliveryFee: restaurant.deliveryFee,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", marginBottom: 48 }}>
            <p style={{ color: "#6B7280", fontSize: 14 }}>No food items available in this category.</p>
          </div>
        )}

        {/* ── REVIEWS & ADD REVIEW BLOCK (Split two columns on wide screens) ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }} className="reviews-layout">
          
          {/* Write a Review Block */}
          <div style={{
            flex: 1, background: "#181424", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24, padding: 22, height: "fit-content",
          }}>
            <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <MessageSquare style={{ width: 16, height: 16, color: "#A78BFA" }} /> Write a Review
            </h3>
            <form onSubmit={handleAddReview} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              
              {/* Stars selector */}
              <div>
                <label style={{ display: "block", color: "#6B7280", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Rating</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setNewRating(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(null)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      <Star style={{
                        width: 22, height: 22,
                        color: starVal <= (hoverRating ?? newRating) ? "#FBBF24" : "#374151",
                        fill: starVal <= (hoverRating ?? newRating) ? "#FBBF24" : "none",
                        transition: "colors 0.15s",
                      }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Input details */}
              <div>
                <label style={{ display: "block", color: "#6B7280", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Your Comment</label>
                <textarea
                  placeholder="Share your dining experience with others..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  style={{
                    width: "100%", height: 90, background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12,
                    color: "#fff", fontSize: 13, padding: 12, outline: "none",
                    boxSizing: "border-box", resize: "none",
                  }}
                />
              </div>

              <button type="submit" style={{
                height: 44, borderRadius: 12, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "#fff",
                fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                boxShadow: "0 0 16px rgba(124,58,237,0.3)", marginTop: 4,
              }}>
                <Send style={{ width: 14, height: 14 }} />
                Submit Review
              </button>
            </form>
          </div>

          {/* User Reviews List */}
          <div style={{ flex: 1.3 }}>
            <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Customer Reviews ({reviews.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {reviews.map((review, i) => (
                <div key={i} style={{
                  background: "#181424", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20, padding: 16, display: "flex", gap: 14,
                }}>
                  <div style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(139,92,246,0.3)", flexShrink: 0 }}>
                    <Image src={review.avatar} alt={review.name} fill style={{ objectFit: "cover" }} sizes="36px" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                      <div>
                        <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: 0 }}>{review.name}</h4>
                        <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
                          {Array(5).fill(0).map((_, starIndex) => (
                            <Star key={starIndex} style={{
                              width: 10, height: 10,
                              color: starIndex < review.rating ? "#FBBF24" : "#374151",
                              fill: starIndex < review.rating ? "#FBBF24" : "none",
                            }} />
                          ))}
                        </div>
                      </div>
                      <span style={{ color: "#4B5563", fontSize: 11 }}>{review.date}</span>
                    </div>
                    <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.5, margin: "8px 0 0" }}>{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Screen layout breakpoints styles */}
      <style>{`
        @media (min-width: 768px) {
          .reviews-layout {
            flex-direction: row !important;
          }
        }
      `}</style>
    </div>
  );
}
