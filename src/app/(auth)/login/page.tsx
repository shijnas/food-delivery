"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChefHat, Eye, EyeOff, Mail, Lock, ArrowRight, Star, Zap, MapPin, Shield } from "lucide-react";

const features = [
  { icon: Zap,    text: "Delivered in under 30 minutes" },
  { icon: MapPin, text: "Live GPS tracking on every order" },
  { icon: Shield, text: "Secure & encrypted payments" },
  { icon: Star,   text: "4.9★ rated by 50,000+ customers" },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const inputStyle = {
  width: "100%",
  height: 52,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 14,
  color: "#fff",
  fontSize: 14,
  padding: "0 16px 0 44px",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box" as const,
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState("customer");

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "restaurant" || roleParam === "driver" || roleParam === "customer") {
      setRole(roleParam);
    }
  }, [searchParams]);

  // Removed auto-redirection bypass to ensure the login page is always displayed directly when accessed.
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);

    if (role === "restaurant") {
      localStorage.setItem("restaurant_role", "true");
      router.push("/dashboard");
    } else if (role === "driver") {
      router.push("/driver");
    } else {
      router.push("/home");
    }
  };

  const selectGoogleAccount = async (name: string, email: string) => {
    setShowGoogleChooser(false);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    if (role === "restaurant") {
      localStorage.setItem("restaurant_role", "true");
      router.push("/dashboard");
    } else if (role === "driver") {
      router.push("/driver");
    } else {
      router.push("/home");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#0D0B14", fontFamily: "Inter, sans-serif" }}>

      {/* ── MOCK GOOGLE ACCOUNT CHOOSER WIDGET ── */}
      {showGoogleChooser && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16
        }}>
          <div style={{
            width: "100%", maxWidth: 360, background: "#fff", color: "#000",
            borderRadius: 16, padding: "24px 20px 20px", fontFamily: "Roboto, Arial, sans-serif",
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
          }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: 12, display: "inline-block" }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 4px", color: "#202124" }}>Choose an account</h3>
              <p style={{ fontSize: 13, color: "#5f6368", margin: 0 }}>to continue to <span style={{ fontWeight: 600, color: "#8B5CF6" }}>Kayikk</span></p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 1, borderTop: "1px solid #dadce0", borderBottom: "1px solid #dadce0", padding: "8px 0", marginBottom: 16 }}>
              <button
                onClick={() => selectGoogleAccount("Shijnas Yunus", "shijnas.yunus@gmail.com")}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", background: "none",
                  border: "none", borderRadius: 8, width: "100%", textAlign: "left", cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f1f3f4"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#8B5CF6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                  S
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#3c4043", margin: 0 }}>Shijnas Yunus</p>
                  <p style={{ fontSize: 11, color: "#5f6368", margin: 0 }}>shijnas.yunus@gmail.com</p>
                </div>
              </button>

              <button
                onClick={() => selectGoogleAccount("Guest User", "guest@kayikk.com")}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", background: "none",
                  border: "none", borderRadius: 8, width: "100%", textAlign: "left", cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f1f3f4"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#4B5563", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                  G
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#3c4043", margin: 0 }}>Guest User</p>
                  <p style={{ fontSize: 11, color: "#5f6368", margin: 0 }}>guest@kayikk.com</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowGoogleChooser(false)}
              style={{
                width: "100%", padding: "10px 0", background: "none", border: "1px solid #dadce0",
                borderRadius: 8, color: "#5f6368", fontSize: 13, fontWeight: 500, cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── LEFT PANEL (branding) ── */}
      <div style={{
        display: "none",
        flex: 1,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1a1035 0%, #0D0B14 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
        className="lg-show"
      >
        <div style={{ position: "absolute", top: "10%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.25)", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(236,72,153,0.18)", filter: "blur(80px)" }} />

        <div style={{ position: "relative", zIndex: 1, padding: "60px 56px", display: "flex", flexDirection: "column", height: "100%" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "auto" }}>
            <img src="/logo.jpg" alt="കയിക്ക്" style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kayikk</span>
          </Link>

          <div style={{ marginBottom: "auto" }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, fontFamily: "Outfit, sans-serif", lineHeight: 1.2, marginBottom: 16, color: "#fff" }}>
              The food app<br />
              <span style={{ background: "linear-gradient(135deg,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                you&apos;ll love.
              </span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
              Order from hundreds of restaurants, track your delivery live, and enjoy every bite.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon style={{ width: 16, height: 16, color: "#A78BFA" }} />
                    </div>
                    <span style={{ color: "#D1D5DB", fontSize: 14 }}>{f.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding: 24, borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
              {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 13, height: 13, color: "#FBBF24", fill: "#FBBF24" }} />)}
            </div>
            <p style={{ color: "#D1D5DB", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
              &ldquo;Kayikk has the best food selection I&apos;ve ever seen on a delivery app. 10/10!&rdquo;
            </p>
            <p style={{ color: "#6B7280", fontSize: 12 }}>— Sarah Chen, Food Enthusiast</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-20%", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 300, height: 300, borderRadius: "50%", background: "rgba(236,72,153,0.08)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 40 }}>
            <img src="/logo.jpg" alt="കയിക്ക്" style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kayikk</span>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#fff", marginBottom: 8 }}>Welcome back 👋</h1>
            <p style={{ color: "#6B7280", fontSize: 14 }}>Sign in to continue your food journey</p>
          </div>

          {/* Segmented Role Selector */}
          <div style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 14,
            padding: 4,
            marginBottom: 24,
            gap: 4
          }}>
            {[
              { id: "customer", label: "Customer" },
              { id: "restaurant", label: "Restaurant" },
              { id: "driver", label: "Driver" }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                style={{
                  flex: 1,
                  height: 38,
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  color: role === r.id ? "#fff" : "#9CA3AF",
                  background: role === r.id ? "linear-gradient(135deg, #7C3AED, #EC4899)" : "transparent",
                  boxShadow: role === r.id ? "0 4px 12px rgba(124, 58, 237, 0.25)" : "none"
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Google button */}
          <button
            id="google-signin"
            onClick={() => setShowGoogleChooser(true)}
            disabled={loading}
            style={{
              width: "100%", height: 52, borderRadius: 14,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "all 0.2s", marginBottom: 24,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.09)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
          >
            <GoogleIcon /> Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            <span style={{ color: "#4B5563", fontSize: 12 }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "#9CA3AF", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Email address</label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#4B5563" }} />
                <input
                  id="email-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ ...inputStyle, borderColor: focused === "email" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", color: "#9CA3AF", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#4B5563" }} />
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ ...inputStyle, paddingRight: 48, borderColor: focused === "password" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4B5563" }}>
                  {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CA3AF", fontSize: 13, cursor: "pointer", userSelect: "none" }}>
                <input
                  type="checkbox"
                  style={{
                    width: 16,
                    height: 16,
                    accentColor: "#8B5CF6",
                    cursor: "pointer",
                  }}
                />
                Always remember me
              </label>
              <a href="#" style={{ color: "#8B5CF6", fontSize: 13, textDecoration: "none" }}>Forgot password?</a>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              style={{
                width: "100%", height: 54, borderRadius: 14,
                background: loading ? "rgba(124,58,237,0.6)" : "linear-gradient(135deg, #7C3AED, #EC4899)",
                border: "none", color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              ) : (
                <><span>Sign In</span><ArrowRight style={{ width: 18, height: 18 }} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 14, marginTop: 24 }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "#A78BFA", fontWeight: 600, textDecoration: "none" }}>Sign up free</Link>
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
            {[["Restaurant Login", "/login?role=restaurant"], ["Driver Login", "/login?role=driver"], ["Admin", "/admin"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ color: "#374151", fontSize: 12, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#6B7280")}
                onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 1024px) { .lg-show { display: flex !important; } }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#0D0B14", alignItems: "center", justifyContent: "center", color: "#6B7280", fontSize: 14 }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
