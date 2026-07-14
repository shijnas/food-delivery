"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Star,
  Clock,
  Shield,
  Zap,
  MapPin,
  Smartphone,
  TrendingUp,
  Check,
  ChevronRight,
  ChefHat,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Restaurants" },
  { value: "50k+", label: "Happy Customers" },
  { value: "4.9★", label: "App Rating" },
  { value: "25m", label: "Avg Delivery" },
];

const features = [
  { icon: Zap,        title: "Lightning Fast",   description: "Delivered in under 30 minutes with our optimized driver network.",   color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  { icon: Shield,     title: "100% Secure",       description: "End-to-end encrypted payments. Your data is always safe.",          color: "#22C55E", bg: "rgba(34,197,94,0.12)"  },
  { icon: MapPin,     title: "Live Tracking",     description: "Watch your driver on an interactive map in real-time.",             color: "#A855F7", bg: "rgba(168,85,247,0.12)" },
  { icon: TrendingUp, title: "AI Recommendations", description: "Smart picks tailored to your taste profile and history.",          color: "#06B6D4", bg: "rgba(6,182,212,0.12)"  },
];

const steps = [
  { n: "01", title: "Choose your food",    desc: "Browse hundreds of restaurants or let AI pick for you." },
  { n: "02", title: "Place your order",    desc: "Customize, add to cart, and checkout in seconds."       },
  { n: "03", title: "Enjoy & track live",  desc: "Watch your order progress on the map in real-time."     },
];

const testimonials = [
  { name: "Sarah Chen",    role: "Food Enthusiast",  avatar: "https://i.pravatar.cc/150?img=5",  rating: 5, text: "കയിക്ക് completely changed how I order food. Stunning UI and incredibly fast delivery!" },
  { name: "Marcus Johnson",role: "Software Engineer", avatar: "https://i.pravatar.cc/150?img=12", rating: 5, text: "The live tracking feature is a game changer. I always know exactly where my food is." },
  { name: "Priya Kumar",   role: "Entrepreneur",     avatar: "https://i.pravatar.cc/150?img=9",  rating: 5, text: "Incredible restaurant selection and the AI recommendations are surprisingly accurate!" },
];

const mockRestaurants = [
  { name: "Burger Bliss",  cuisine: "American • Burgers",      rating: 4.8, time: "20-30 min", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
  { name: "Sakura Sushi",  cuisine: "Japanese • Asian",        rating: 4.9, time: "35-50 min", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80" },
  { name: "Pizza Palace",  cuisine: "Italian • Mediterranean", rating: 4.7, time: "25-40 min", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" },
];

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Capacitor) {
      setIsNative(true);
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (isNative) {
    return <div style={{ backgroundColor: "#0D0B14", minHeight: "100vh" }} />;
  }

  return (
    <div style={{ backgroundColor: "#0D0B14", color: "#fff", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 64,
        display: "flex", alignItems: "center",
        padding: "0 32px",
        background: scrolled ? "rgba(13,11,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/logo.jpg" alt="കയിക്ക്" style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 20, fontWeight: 700, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              കയിക്ക്
            </span>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[["Features","#features"],["How It Works","#how-it-works"],["Restaurants","#restaurants"]].map(([l,h]) => (
              <a key={l} href={h} style={{ color: "#9CA3AF", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
              >{l}</a>
            ))}
          </nav>

          {/* Auth */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/login" style={{ color: "#9CA3AF", fontSize: 14, textDecoration: "none" }}>Sign In</Link>
            <a href="/kayikk.apk" download="kayikk.apk" style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 12,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#D1D5DB", textDecoration: "none",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </a>
            <Link href="/login" style={{
              fontSize: 14, fontWeight: 600, padding: "9px 20px", borderRadius: 12,
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              color: "#fff", textDecoration: "none",
              boxShadow: "0 0 20px rgba(139,92,246,0.35)",
            }}>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "rgba(124,58,237,0.18)", filter: "blur(120px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "rgba(236,72,153,0.12)", filter: "blur(120px)", pointerEvents: "none" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "120px 24px 80px", textAlign: "center" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#C4B5FD", fontSize: 13, marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6", display: "inline-block", animation: "pulse 2s infinite" }} />
            Now live in 50+ cities worldwide
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24, fontFamily: "Outfit, sans-serif" }}>
            <span style={{ color: "#fff" }}>Food you love,</span><br />
            <span style={{ background: "linear-gradient(135deg, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              delivered in minutes.
            </span>
          </h1>

          <p style={{ fontSize: 18, color: "#9CA3AF", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Order from 500+ top-rated restaurants near you. Real-time GPS tracking, seamless checkout, and food that arrives hot — every time.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 72 }}>
            <Link href="/home" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", borderRadius: 16, fontWeight: 700, fontSize: 16,
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              color: "#fff", textDecoration: "none",
              boxShadow: "0 0 40px rgba(139,92,246,0.4)",
              transition: "all 0.3s",
            }}>
              Order Now <ArrowRight style={{ width: 20, height: 20 }} />
            </Link>
            <Link href="/register?role=restaurant" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", borderRadius: 16, fontWeight: 600, fontSize: 16,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff", textDecoration: "none",
              transition: "all 0.3s",
            }}>
              Become a Partner
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 600, margin: "0 auto" }}>
            {stats.map(s => (
              <div key={s.label} style={{ padding: "20px 12px", borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)", margin: "0 10%" }} />

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5CF6", marginBottom: 16 }}>Why കയിക്ക്?</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "Outfit, sans-serif", lineHeight: 1.15 }}>
              Built for a{" "}
              <span style={{ background: "linear-gradient(135deg, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                premium experience
              </span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {features.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} style={{ padding: 28, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon style={{ width: 26, height: 26, color: f.color }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.15), transparent)", margin: "0 10%" }} />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "120px 24px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5CF6", marginBottom: 16 }}>Simple Process</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>
              How{" "}
              <span style={{ background: "linear-gradient(135deg, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>കയിക്ക്</span>
              {" "}works
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ textAlign: "center", position: "relative" }}>
                {i < steps.length - 1 && (
                  <div style={{ position: "absolute", top: 27, left: "calc(50% + 36px)", right: "calc(-50% + 36px)", height: 1, background: "linear-gradient(to right, rgba(139,92,246,0.4), transparent)" }} />
                )}
                <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 24px" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "linear-gradient(135deg, #7C3AED, #EC4899)", filter: "blur(10px)", opacity: 0.5 }} />
                  <div style={{ position: "relative", width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #7C3AED, #EC4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "Outfit, sans-serif" }}>{s.n}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.15), transparent)", margin: "0 10%" }} />

      {/* ── RESTAURANTS ── */}
      <section id="restaurants" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B5CF6", marginBottom: 12 }}>Top Picks</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#fff" }}>Popular Restaurants</h2>
            </div>
            <Link href="/restaurants" style={{ display: "flex", alignItems: "center", gap: 4, color: "#8B5CF6", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Browse all <ChevronRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {mockRestaurants.map((r, i) => (
              <Link key={i} href="/restaurants" style={{ textDecoration: "none" }}>
                <div style={{ borderRadius: 24, overflow: "hidden", background: "#181424", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.1)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#1E1830" }}>
                    <Image src={r.img} alt={r.name} fill style={{ objectFit: "cover" }} sizes="400px" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(24,20,36,0.9) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 17, marginBottom: 2 }}>{r.name}</h3>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>{r.cuisine}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 10 }}>
                        <Star style={{ width: 12, height: 12, color: "#FBBF24", fill: "#FBBF24" }} />
                        <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{r.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#6B7280", fontSize: 12 }}>
                      <Clock style={{ width: 13, height: 13 }} /> {r.time}
                    </span>
                    <span style={{ color: "#4ADE80", fontSize: 12, fontWeight: 600 }}>Free delivery</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/restaurants" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)",
              color: "#9CA3AF", fontSize: 14, fontWeight: 500, textDecoration: "none",
              transition: "all 0.2s",
            }}>
              View all 500+ restaurants <ChevronRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.15), transparent)", margin: "0 10%" }} />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "120px 24px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 12 }}>
              Loved by{" "}
              <span style={{ background: "linear-gradient(135deg, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>50,000+</span>
              {" "}customers
            </h2>
            <p style={{ color: "#6B7280", fontSize: 15 }}>Here&apos;s what our community says</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ padding: 28, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} style={{ width: 14, height: 14, color: "#FBBF24", fill: "#FBBF24" }} />)}
                </div>
                <p style={{ fontSize: 14, color: "#D1D5DB", lineHeight: 1.7, marginBottom: 24 }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(139,92,246,0.25)", flexShrink: 0 }}>
                    <Image src={t.avatar} alt={t.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{t.name}</p>
                    <p style={{ color: "#6B7280", fontSize: 12 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.15), transparent)", margin: "0 10%" }} />

      {/* ── CTA ── */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ position: "relative", padding: "72px 48px", borderRadius: 32, overflow: "hidden", border: "1px solid rgba(139,92,246,0.2)" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.08))" }} />
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 300, height: 150, background: "rgba(124,58,237,0.25)", filter: "blur(60px)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#C4B5FD", fontSize: 13, marginBottom: 24 }}>
                <Smartphone style={{ width: 14, height: 14 }} />
                Available on iOS & Android
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 16, lineHeight: 1.2 }}>
                Ready for your first order?
              </h2>
              <p style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 36 }}>
                Sign up today and get{" "}
                <span style={{ color: "#A78BFA", fontWeight: 700 }}>20% off</span>{" "}
                your first order. No subscription required.
              </p>
              <div style={{ marginBottom: 32 }}>
                <Link href="/login" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "16px 36px", borderRadius: 16, fontWeight: 700, fontSize: 16,
                  background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                  color: "#fff", textDecoration: "none",
                  boxShadow: "0 0 40px rgba(139,92,246,0.4)",
                }}>
                  Start Ordering Free <ArrowRight style={{ width: 20, height: 20 }} />
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
                {["No credit card", "Free first delivery", "Cancel anytime"].map(b => (
                  <span key={b} style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B7280", fontSize: 13 }}>
                    <Check style={{ width: 15, height: 15, color: "#4ADE80" }} /> {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <img src="/logo.jpg" alt="കയിക്ക്" style={{ width: 32, height: 32, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }} />
                <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>കയിക്ക്</span>
              </div>
              <p style={{ color: "#4B5563", fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>
                Premium food delivery for the modern world. Fast, fresh, and always delicious.
              </p>
            </div>
            {[
              { title: "Company",  links: ["About","Blog","Careers","Press"] },
              { title: "Partners", links: ["Restaurants","Drivers","Advertise","API"] },
              { title: "Support",  links: ["Help Center","Contact","Privacy","Terms"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>{col.title}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map(link => (
                    <a key={link} href="#" style={{ color: "#4B5563", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#4B5563")}
                    >{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "#374151", fontSize: 13 }}>© 2025 കയിക്ക്. All rights reserved.</p>
            <p style={{ color: "#374151", fontSize: 13 }}>Made with 💜 for food lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
