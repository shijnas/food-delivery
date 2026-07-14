"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChefHat, Eye, EyeOff, Mail, Lock, User, Phone,
  ArrowRight, ChevronLeft, Check, Sparkles, ShieldCheck, Zap,
  Building, MapPin, Upload, Clock, CreditCard, CheckCircle, Info
} from "lucide-react";

type Role = "customer" | "restaurant" | "driver";

const roles: { id: Role; emoji: string; title: string; desc: string; color: string }[] = [
  { id: "customer",   emoji: "🍽️", title: "Customer",   desc: "Order food from top restaurants", color: "#8B5CF6" },
  { id: "restaurant", emoji: "👨‍🍳", title: "Restaurant", desc: "List your restaurant & grow",     color: "#EC4899" },
  { id: "driver",     emoji: "🛵", title: "Driver",     desc: "Deliver and earn on your schedule", color: "#F59E0B" },
];

const perks = [
  { icon: Zap,        text: "Get 20% off your first order" },
  { icon: ShieldCheck,text: "Safe & secure checkout" },
  { icon: Sparkles,   text: "AI-powered food recommendations" },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  color: "#fff",
  fontSize: 13,
  padding: "0 14px 0 40px",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.2s",
};

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isRestaurant = localStorage.getItem("restaurant_role") === "true";
      if (isRestaurant) {
        router.replace("/dashboard");
      }
    }
  }, [router]);

  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // Google account picker modal state
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

  // General registration form
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  // Onboarding Wizard Sub-steps for Restaurant (1 to 7)
  const [onboardStep, setOnboardStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  // Restaurant details state
  const [restaurantForm, setRestaurantForm] = useState({
    // Step 1: Account
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    // Step 2: Details
    cuisineType: "Biriyani & Indian",
    description: "Premium traditional recipe delicacies and grills.",
    gstNumber: "",
    fssaiNumber: "12224009000871",
    // Step 3: Location
    address: "45/A Baker Avenue, Marine Drive",
    city: "Kochi",
    state: "Kerala",
    zipCode: "682031",
    deliveryRadius: 8,
    lat: 9.9816,
    lng: 76.2798,
    // Step 4: Hours
    open24h: false,
    hours: {
      Monday: { active: true, start: "09:00 AM", end: "10:00 PM" },
      Tuesday: { active: true, start: "09:00 AM", end: "10:00 PM" },
      Wednesday: { active: true, start: "09:00 AM", end: "10:00 PM" },
      Thursday: { active: true, start: "09:00 AM", end: "10:00 PM" },
      Friday: { active: true, start: "09:00 AM", end: "10:00 PM" },
      Saturday: { active: true, start: "09:00 AM", end: "10:00 PM" },
      Sunday: { active: true, start: "10:00 AM", end: "09:00 PM" },
    },
    // Step 5: Uploads (File name placeholders)
    logo: "logo_bliss.png",
    coverImage: "cover_bliss.jpg",
    photos: ["menu_spread.jpg", "interior.jpg"],
    fssaiCertificate: "fssai_verified_cert.pdf",
    // Step 6: Bank details
    accountHolder: "Burger Bliss Food Ventures",
    bankName: "State Bank of India",
    ifsc: "SBIN0007812",
    accountNumber: "38920199201",
    upiId: "burgerbliss@okaxis"
  });

  // Mock Draggable Pin coordinate simulation
  const [pinOffset, setPinOffset] = useState({ x: 120, y: 100 });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPinOffset({ x, y });

    // convert pixels to mock coordinates
    const baseLat = 9.9800;
    const baseLng = 76.2700;
    const computedLat = (baseLat + (200 - y) * 0.0001).toFixed(4);
    const computedLng = (baseLng + x * 0.0001).toFixed(4);

    setRestaurantForm(prev => ({
      ...prev,
      lat: parseFloat(computedLat),
      lng: parseFloat(computedLng)
    }));
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    if (role === "driver") {
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
      setRestaurantForm(prev => ({
        ...prev,
        ownerName: name,
        email: email,
        restaurantName: name + "'s Restaurant"
      }));
      setStep(2);
      setOnboardStep(1);
    } else if (role === "driver") {
      router.push("/driver");
    } else {
      router.push("/home");
    }
  };

  const handleRestaurantSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    localStorage.setItem("restaurant_role", "true");
    localStorage.setItem("restaurant_name", restaurantForm.restaurantName || "Burger Bliss");
    router.push("/dashboard");
  };

  const selectedRole = roles.find(r => r.id === role)!;

  // File Upload Helper Mock
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({
    logo: "logo_bliss.png",
    coverImage: "cover_bliss.jpg",
    fssaiCertificate: "fssai_verified_cert.pdf"
  });

  const simulateUpload = (field: string, mockFileName: string) => {
    setUploadedFiles(prev => ({ ...prev, [field]: mockFileName }));
    setRestaurantForm(prev => ({ ...prev, [field]: mockFileName }));
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
            {/* Header */}
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

            {/* Accounts list */}
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

            {/* Close / cancel */}
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

      {/* ── LEFT PANEL ── */}
      <div style={{
        flex: 1, position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #160d2e 0%, #0D0B14 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "none",
      }} className="auth-left">
        <div style={{ position: "absolute", top: "5%", left: "5%",   width: 360, height: 360, borderRadius: "50%", background: "rgba(124,58,237,0.2)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "0%", width: 280, height: 280, borderRadius: "50%", background: "rgba(236,72,153,0.15)", filter: "blur(70px)" }} />

        <div style={{ position: "relative", zIndex: 1, height: "100%", padding: "56px 52px", display: "flex", flexDirection: "column" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "auto" }}>
            <img src="/logo.jpg" alt="കയിക്ക്" style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kayikk</span>
          </Link>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontSize: 38, fontWeight: 800, fontFamily: "Outfit, sans-serif", lineHeight: 1.2, color: "#fff", marginBottom: 14 }}>
              Join 50,000+<br />
              <span style={{ background: "linear-gradient(135deg,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>food lovers.</span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
              Sign up in seconds and start ordering from the best restaurants near you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {perks.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon style={{ width: 16, height: 16, color: "#A78BFA" }} />
                    </div>
                    <span style={{ color: "#D1D5DB", fontSize: 14 }}>{p.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#4B5563", fontSize: 12, marginBottom: 8 }}>Signing up as</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{selectedRole.emoji}</span>
              <div>
                <p style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>{selectedRole.title}</p>
                <p style={{ color: "#6B7280", fontSize: 12 }}>{selectedRole.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1.5, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflowX: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-15%", width: 350, height: 350, borderRadius: "50%", background: "rgba(124,58,237,0.1)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 280, height: 280, borderRadius: "50%", background: "rgba(236,72,153,0.07)", filter: "blur(70px)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: (role === "restaurant" && step === 2) ? 680 : 440, position: "relative", zIndex: 1, transition: "max-width 0.3s" }}>
          {/* Mobile logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 36 }} className="auth-mobile-logo">
            <img src="/logo.jpg" alt="കയിക്ക്" style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kayikk</span>
          </div>

          {/* ───────────────── STEP 1: ROLE SELECTION ───────────────── */}
          {step === 1 && (
            <>
              <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
                <div style={{ height: 4, borderRadius: 2, flex: 1, background: "linear-gradient(to right,#7C3AED,#EC4899)" }} />
                <div style={{ height: 4, borderRadius: 2, flex: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>

              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#fff", marginBottom: 6 }}>Join Kayikk</h1>
                <p style={{ color: "#6B7280", fontSize: 14 }}>How would you like to use Kayikk?</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {roles.map((r) => (
                  <button key={r.id} onClick={() => setRole(r.id)} style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "16px 18px",
                    borderRadius: 16, border: `1px solid ${role === r.id ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
                    background: role === r.id ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: role === r.id ? `${r.color}22` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                      {r.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{r.title}</p>
                      <p style={{ color: "#6B7280", fontSize: 12 }}>{r.desc}</p>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      background: role === r.id ? "#8B5CF6" : "rgba(255,255,255,0.07)",
                      border: `1px solid ${role === r.id ? "#8B5CF6" : "rgba(255,255,255,0.12)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {role === r.id && <Check style={{ width: 12, height: 12, color: "#fff" }} />}
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(2)} style={{
                width: "100%", height: 52, borderRadius: 14, border: "none",
                background: "linear-gradient(135deg,#7C3AED,#EC4899)",
                color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 0 30px rgba(124,58,237,0.35)", marginBottom: 20,
              }}>
                Continue <ArrowRight style={{ width: 18, height: 18 }} />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                <span style={{ color: "#4B5563", fontSize: 12 }}>or</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
              </div>

              <button
                onClick={() => setShowGoogleChooser(true)}
                disabled={loading}
                style={{
                  width: "100%", height: 52, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                }}
              >
                <GoogleIcon /> Continue with Google
              </button>
            </>
          )}

          {/* ───────────────── STEP 2: RESTAURANT ONBOARDING WIZARD ───────────────── */}
          {step === 2 && role === "restaurant" && (
            <>
              {/* Main wizard header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button onClick={() => { if (onboardStep > 1) setOnboardStep(prev => (prev - 1) as any); else setStep(1); }} style={{
                    width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF"
                  }}>
                    <ChevronLeft style={{ width: 16, height: 16 }} />
                  </button>
                  <div>
                    <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>Restaurant Onboarding</h1>
                    <p style={{ color: "#A78BFA", fontSize: 12, fontWeight: 600 }}>Step {onboardStep} of 7 — {
                      onboardStep === 1 ? "Account Setup" :
                      onboardStep === 2 ? "Restaurant Details" :
                      onboardStep === 3 ? "Location & Delivery" :
                      onboardStep === 4 ? "Business Hours" :
                      onboardStep === 5 ? "Upload Logo & Documents" :
                      onboardStep === 6 ? "Bank details" : "Review & Submit"
                    }</p>
                  </div>
                </div>

                {/* Sub-steps indicator */}
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 4, 5, 6, 7].map(s => (
                    <div key={s} style={{
                      width: onboardStep === s ? 24 : 8, height: 6, borderRadius: 3,
                      background: s <= onboardStep ? "linear-gradient(to right, #8B5CF6, #EC4899)" : "rgba(255,255,255,0.1)",
                      transition: "all 0.3s"
                    }} />
                  ))}
                </div>
              </div>

              <div style={{ background: "#181424", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: 28, marginBottom: 20 }}>
                
                {/* ── ONBOARD STEP 1: ACCOUNT ── */}
                {onboardStep === 1 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                      <User style={{ width: 16, height: 16, color: "#8B5CF6" }} /> Onboarding User Details
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-mobile-1">
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Owner Name</label>
                        <div style={{ position: "relative" }}>
                          <User style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#4B5563" }} />
                          <input type="text" placeholder="John Doe" required style={inputStyle} value={restaurantForm.ownerName} onChange={e => setRestaurantForm({...restaurantForm, ownerName: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Restaurant Name</label>
                        <div style={{ position: "relative" }}>
                          <Building style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#4B5563" }} />
                          <input type="text" placeholder="Burger Bliss" required style={inputStyle} value={restaurantForm.restaurantName} onChange={e => setRestaurantForm({...restaurantForm, restaurantName: e.target.value})} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Owner Email Address</label>
                      <div style={{ position: "relative" }}>
                        <Mail style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#4B5563" }} />
                        <input type="email" placeholder="owner@burgerbliss.com" required style={inputStyle} value={restaurantForm.email} onChange={e => setRestaurantForm({...restaurantForm, email: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Phone Number</label>
                      <div style={{ position: "relative" }}>
                        <Phone style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#4B5563" }} />
                        <input type="tel" placeholder="+91 9447000000" required style={inputStyle} value={restaurantForm.phone} onChange={e => setRestaurantForm({...restaurantForm, phone: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Password</label>
                      <div style={{ position: "relative" }}>
                        <Lock style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#4B5563" }} />
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: 40 }} value={restaurantForm.password} onChange={e => setRestaurantForm({...restaurantForm, password: e.target.value})} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4B5563" }}>
                          {showPassword ? <EyeOff style={{ width: 14, height: 14 }} /> : <Eye style={{ width: 14, height: 14 }} />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ONBOARD STEP 2: RESTAURANT DETAILS ── */}
                {onboardStep === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                      <Building style={{ width: 16, height: 16, color: "#EC4899" }} /> Restaurant Particulars
                    </h3>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Cuisine Type (e.g. Italian, Burgers, Biriyani)</label>
                      <input type="text" placeholder="Biriyani, Indian, Grills" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.cuisineType} onChange={e => setRestaurantForm({...restaurantForm, cuisineType: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Description</label>
                      <textarea placeholder="Write a short description about the restaurant specialties..." style={{
                        width: "100%", height: 72, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12, color: "#fff", fontSize: 13, padding: 10, outline: "none", resize: "none", boxSizing: "border-box"
                      }} value={restaurantForm.description} onChange={e => setRestaurantForm({...restaurantForm, description: e.target.value})} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-mobile-1">
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>GSTIN Number (Optional)</label>
                        <input type="text" placeholder="32AAAAA1111A1Z1" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.gstNumber} onChange={e => setRestaurantForm({...restaurantForm, gstNumber: e.target.value})} />
                      </div>
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>FSSAI License Number</label>
                        <input type="text" placeholder="12224009000871" required style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.fssaiNumber} onChange={e => setRestaurantForm({...restaurantForm, fssaiNumber: e.target.value})} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ONBOARD STEP 3: LOCATION ── */}
                {onboardStep === 3 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                      <MapPin style={{ width: 16, height: 16, color: "#F59E0B" }} /> Location & Mapping
                    </h3>
                    
                    {/* Interactive Mock Map */}
                    <div>
                      <p style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 8 }}>Drag or click on the map to set your location pin</p>
                      <div
                        onClick={handleMapClick}
                        style={{
                          height: 200, background: "#1b192e", borderRadius: 16, position: "relative",
                          border: "1px solid rgba(139,92,246,0.15)", overflow: "hidden", cursor: "crosshair"
                        }}
                      >
                        {/* Map Grid SVG Representation */}
                        <svg width="100%" height="100%" opacity="0.3">
                          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                          </pattern>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                          <path d="M 0 50 Q 150 70 300 50 T 600 50" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="8" />
                          <path d="M 120 0 L 120 200" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
                          <path d="M 450 0 L 450 200" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
                        </svg>

                        {/* Draggable pin indicator */}
                        <div style={{
                          position: "absolute", left: pinOffset.x - 12, top: pinOffset.y - 28,
                          pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center"
                        }}>
                          <MapPin style={{ width: 24, height: 24, color: "#EC4899", fill: "#EC4899" }} />
                          <span style={{
                            background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: 9,
                            padding: "2px 6px", borderRadius: 4, marginTop: 4, whiteSpace: "nowrap"
                          }}>
                            {restaurantForm.lat}, {restaurantForm.lng}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Full Address</label>
                      <input type="text" placeholder="45/A Baker Avenue, Marine Drive" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.address} onChange={e => setRestaurantForm({...restaurantForm, address: e.target.value})} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="grid-mobile-1">
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>City</label>
                        <input type="text" placeholder="Kochi" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.city} onChange={e => setRestaurantForm({...restaurantForm, city: e.target.value})} />
                      </div>
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>State</label>
                        <input type="text" placeholder="Kerala" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.state} onChange={e => setRestaurantForm({...restaurantForm, state: e.target.value})} />
                      </div>
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>ZIP Code</label>
                        <input type="text" placeholder="682031" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.zipCode} onChange={e => setRestaurantForm({...restaurantForm, zipCode: e.target.value})} />
                      </div>
                    </div>

                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Delivery Radius ({restaurantForm.deliveryRadius} km)</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <input type="range" min="1" max="25" style={{ flex: 1, accentColor: "#8B5CF6" }} value={restaurantForm.deliveryRadius} onChange={e => setRestaurantForm({...restaurantForm, deliveryRadius: parseInt(e.target.value)})} />
                        <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{restaurantForm.deliveryRadius} km</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ONBOARD STEP 4: BUSINESS HOURS ── */}
                {onboardStep === 4 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}>
                      <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                        <Clock style={{ width: 16, height: 16, color: "#10B981" }} /> Operating Hours
                      </h3>
                      {/* Open 24h toggle */}
                      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none" }}>
                        <input type="checkbox" checked={restaurantForm.open24h} onChange={e => setRestaurantForm({...restaurantForm, open24h: e.target.checked})} style={{ width: 16, height: 16, accentColor: "#8B5CF6" }} />
                        <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Open 24 Hours</span>
                      </label>
                    </div>

                    {!restaurantForm.open24h ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 220, overflowY: "auto", paddingRight: 6 }} className="no-scrollbar">
                        {Object.keys(restaurantForm.hours).map((day) => {
                          const item = restaurantForm.hours[day as keyof typeof restaurantForm.hours];
                          return (
                            <div key={day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: 10, borderRadius: 12 }}>
                              <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, width: 90 }}>{day}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <input type="text" style={{ width: 78, height: 28, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 11, borderRadius: 6, textAlign: "center", outline: "none" }} value={item.start} onChange={e => {
                                  const updated = { ...restaurantForm.hours };
                                  updated[day as keyof typeof restaurantForm.hours].start = e.target.value;
                                  setRestaurantForm({ ...restaurantForm, hours: updated });
                                }} />
                                <span style={{ color: "#6B7280", fontSize: 11 }}>to</span>
                                <input type="text" style={{ width: 78, height: 28, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 11, borderRadius: 6, textAlign: "center", outline: "none" }} value={item.end} onChange={e => {
                                  const updated = { ...restaurantForm.hours };
                                  updated[day as keyof typeof restaurantForm.hours].end = e.target.value;
                                  setRestaurantForm({ ...restaurantForm, hours: updated });
                                }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center", padding: "40px 0", color: "#6B7280" }}>
                        <Clock style={{ width: 36, height: 36, color: "#8B5CF6", marginBottom: 12 }} />
                        <p style={{ fontSize: 13 }}>Your restaurant is configured to stay <b>Open 24/7</b>.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── ONBOARD STEP 5: UPLOADS ── */}
                {onboardStep === 5 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                      <Upload style={{ width: 16, height: 16, color: "#EC4899" }} /> Media & Certificates
                    </h3>
                    
                    {[
                      { label: "Restaurant Logo", field: "logo", placeholder: "logo_bliss.png" },
                      { label: "Cover Image", field: "coverImage", placeholder: "cover_bliss.jpg" },
                      { label: "FSSAI Certificate", field: "fssaiCertificate", placeholder: "fssai_cert.pdf" }
                    ].map((item) => (
                      <div key={item.field} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 14 }}>
                        <div>
                          <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{item.label}</p>
                          <p style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>{uploadedFiles[item.field] || "No file chosen"}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => simulateUpload(item.field, item.placeholder)}
                          style={{
                            padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                            background: "rgba(139,92,246,0.15)", color: "#C4B5FD", fontSize: 12, fontWeight: 600
                          }}
                        >
                          Upload
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── ONBOARD STEP 6: BANK DETAILS ── */}
                {onboardStep === 6 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                      <CreditCard style={{ width: 16, height: 16, color: "#06B6D4" }} /> Settlement Bank Details
                    </h3>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Account Holder Name</label>
                      <input type="text" placeholder="Burger Bliss Inc" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.accountHolder} onChange={e => setRestaurantForm({...restaurantForm, accountHolder: e.target.value})} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-mobile-1">
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Bank Name</label>
                        <input type="text" placeholder="SBI Bank" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.bankName} onChange={e => setRestaurantForm({...restaurantForm, bankName: e.target.value})} />
                      </div>
                      <div>
                        <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>IFSC Code</label>
                        <input type="text" placeholder="SBIN0007812" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.ifsc} onChange={e => setRestaurantForm({...restaurantForm, ifsc: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>Account Number</label>
                      <input type="text" placeholder="38920199201" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.accountNumber} onChange={e => setRestaurantForm({...restaurantForm, accountNumber: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ color: "#9CA3AF", fontSize: 12, display: "block", marginBottom: 6 }}>UPI ID (Optional)</label>
                      <input type="text" placeholder="burgerbliss@okaxis" style={{ ...inputStyle, paddingLeft: 14 }} value={restaurantForm.upiId} onChange={e => setRestaurantForm({...restaurantForm, upiId: e.target.value})} />
                    </div>
                  </div>
                )}

                {/* ── ONBOARD STEP 7: REVIEW & SUBMIT ── */}
                {onboardStep === 7 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle style={{ width: 16, height: 16, color: "#10B981" }} /> Review Onboarding Info
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 230, overflowY: "auto", paddingRight: 6 }} className="no-scrollbar">
                      {/* Section: Info */}
                      <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                        <p style={{ color: "#8B5CF6", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>✓ RESTAURANT INFORMATION</p>
                        <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{restaurantForm.restaurantName || "Burger Bliss"}</p>
                        <p style={{ color: "#6B7280", fontSize: 12, marginTop: 2 }}>{restaurantForm.cuisineType} • FSSAI: {restaurantForm.fssaiNumber}</p>
                      </div>

                      {/* Section: Address */}
                      <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                        <p style={{ color: "#EC4899", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>✓ ADDRESS & MAPPING</p>
                        <p style={{ color: "#fff", fontSize: 13 }}>{restaurantForm.address}, {restaurantForm.city}</p>
                        <p style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>Radius: {restaurantForm.deliveryRadius} km • Coordinates: {restaurantForm.lat}, {restaurantForm.lng}</p>
                      </div>

                      {/* Section: Media */}
                      <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                        <p style={{ color: "#F59E0B", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>✓ UPLOADED MEDIA</p>
                        <p style={{ color: "#fff", fontSize: 12 }}>Logo: {restaurantForm.logo} • Cover: {restaurantForm.coverImage}</p>
                      </div>

                      {/* Section: Bank */}
                      <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                        <p style={{ color: "#06B6D4", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>✓ SETTLEMENT BANK DETAILS</p>
                        <p style={{ color: "#fff", fontSize: 13 }}>{restaurantForm.bankName} • Account: {restaurantForm.accountNumber}</p>
                        <p style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>Holder: {restaurantForm.accountHolder} • IFSC: {restaurantForm.ifsc}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Navigation controls */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <button
                  type="button"
                  onClick={() => {
                    if (onboardStep > 1) {
                      setOnboardStep(prev => (prev - 1) as any);
                    } else {
                      setStep(1);
                    }
                  }}
                  style={{
                    flex: 1, height: 48, borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onboardStep < 7) {
                      setOnboardStep(prev => (prev + 1) as any);
                    } else {
                      handleRestaurantSubmit();
                    }
                  }}
                  disabled={loading}
                  style={{
                    flex: 1.5, height: 48, borderRadius: 12, border: "none", cursor: loading ? "not-allowed" : "pointer",
                    background: onboardStep === 7 ? "linear-gradient(135deg, #10B981, #059669)" : "linear-gradient(135deg, #8B5CF6, #EC4899)",
                    color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    boxShadow: "0 0 20px rgba(124,58,237,0.3)"
                  }}
                >
                  {loading ? (
                    <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  ) : onboardStep === 7 ? (
                    <>Submit Onboarding</>
                  ) : (
                    <>Next Step <ArrowRight style={{ width: 16, height: 16 }} /></>
                  )}
                </button>
              </div>
            </>
          )}

          {/* ───────────────── STEP 2: GENERAL SIGNUP (CUSTOMER/DRIVER) ───────────────── */}
          {step === 2 && role !== "restaurant" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <button onClick={() => setStep(1)} style={{
                  width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF",
                }}>
                  <ChevronLeft style={{ width: 16, height: 16 }} />
                </button>
                <div>
                  <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>Create your account</h1>
                  <p style={{ color: "#6B7280", fontSize: 13 }}>
                    Signing up as <span style={{ color: "#A78BFA", fontWeight: 600, textTransform: "capitalize" }}>{role}</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handleGeneralSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Name */}
                <div>
                  <label style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 500, display: "block", marginBottom: 7 }}>Full Name</label>
                  <div style={{ position: "relative" }}>
                    <User style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                    <input id="name-input" type="text" placeholder="John Smith" required
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: focused === "name" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)" }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 500, display: "block", marginBottom: 7 }}>Email address</label>
                  <div style={{ position: "relative" }}>
                    <Mail style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                    <input id="register-email" type="email" placeholder="you@example.com" required
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: focused === "email" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)" }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 500, display: "block", marginBottom: 7 }}>Phone Number</label>
                  <div style={{ position: "relative" }}>
                    <Phone style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                    <input id="phone-input" type="tel" placeholder="+91 9447000000" required
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: focused === "phone" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)" }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 500, display: "block", marginBottom: 7 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                    <input id="register-password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" required
                      value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, paddingRight: 48, borderColor: focused === "password" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)" }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4B5563" }}>
                      {showPassword ? <EyeOff style={{ width: 15, height: 15 }} /> : <Eye style={{ width: 15, height: 15 }} />}
                    </button>
                  </div>
                </div>

                <p style={{ color: "#4B5563", fontSize: 12 }}>
                  By signing up, you agree to our{" "}
                  <a href="#" style={{ color: "#A78BFA", textDecoration: "none" }}>Terms</a> &{" "}
                  <a href="#" style={{ color: "#A78BFA", textDecoration: "none" }}>Privacy Policy</a>.
                </p>

                <button type="submit" disabled={loading} style={{
                  width: "100%", height: 52, borderRadius: 14, border: "none",
                  background: loading ? "rgba(124,58,237,0.6)" : "linear-gradient(135deg,#7C3AED,#EC4899)",
                  color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 0 30px rgba(124,58,237,0.35)",
                }}>
                  {loading
                    ? <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    : <><span>Create Account</span><ArrowRight style={{ width: 18, height: 18 }} /></>
                  }
                </button>
              </form>
            </>
          )}

          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 14, marginTop: 24 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#A78BFA", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 1024px) {
          .auth-left { display: flex !important; }
          .auth-mobile-logo { display: none !important; }
        }
        @media (max-width: 768px) {
          .grid-mobile-1 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
