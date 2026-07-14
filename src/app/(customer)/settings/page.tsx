"use client";

import { useState } from "react";
import { ChevronLeft, User, Mail, Phone, Lock, Bell, Shield, ArrowRight, Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  color: "#fff",
  fontSize: 14,
  padding: "0 14px 0 40px",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.2s",
};

export default function SettingsPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "User Name",
    email: "user@example.com",
    phone: "+1 (555) 000-0000",
    oldPassword: "",
    newPassword: "",
    emailPromo: true,
    pushOrder: true,
    twoFactor: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ width: "100%", maxWidth: 640, margin: "0 auto", padding: "32px 20px 80px", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <Link href="/profile" style={{
          width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#9CA3AF", textDecoration: "none",
        }}>
          <ChevronLeft style={{ width: 16, height: 16 }} />
        </Link>
        <div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "Outfit, sans-serif", margin: 0 }}>Account Settings</h1>
          <p style={{ color: "#6B7280", fontSize: 13, margin: "2px 0 0" }}>Update your personal details & preferences</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Section 1: Profile Details */}
        <div style={{ padding: 20, borderRadius: 20, background: "#181424", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <User style={{ width: 16, height: 16, color: "#A78BFA" }} /> Personal Details
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required
                  style={{ ...inputStyle, borderColor: focused === "name" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required
                  style={{ ...inputStyle, borderColor: focused === "email" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Phone Number</label>
              <div style={{ position: "relative" }}>
                <Phone style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} required
                  style={{ ...inputStyle, borderColor: focused === "phone" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Password Change */}
        <div style={{ padding: 20, borderRadius: 20, background: "#181424", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Lock style={{ width: 16, height: 16, color: "#A78BFA" }} /> Change Password
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Current Password</label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                <input type={showPassword ? "text" : "password"} placeholder="Enter current password"
                  value={form.oldPassword} onChange={e => setForm({ ...form, oldPassword: e.target.value })}
                  onFocus={() => setFocused("oldPass")} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, borderColor: focused === "oldPass" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>New Password</label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#4B5563" }} />
                <input type={showPassword ? "text" : "password"} placeholder="Enter new password"
                  value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })}
                  onFocus={() => setFocused("newPass")} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, paddingRight: 40, borderColor: focused === "newPass" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4B5563" }}>
                  {showPassword ? <EyeOff style={{ width: 15, height: 15 }} /> : <Eye style={{ width: 15, height: 15 }} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Notification Toggles */}
        <div style={{ padding: 20, borderRadius: 20, background: "#181424", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Bell style={{ width: 16, height: 16, color: "#A78BFA" }} /> Notifications & Security
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Promo email toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: 0 }}>Promotions & Offers</p>
                <p style={{ color: "#6B7280", fontSize: 11, margin: "2px 0 0" }}>Receive promo alerts, coupons and newsletters</p>
              </div>
              <button type="button" onClick={() => setForm({ ...form, emailPromo: !form.emailPromo })} style={{
                width: 44, height: 24, borderRadius: 100, border: "none", cursor: "pointer",
                background: form.emailPromo ? "linear-gradient(to right, #7C3AED, #EC4899)" : "rgba(255,255,255,0.08)",
                position: "relative", transition: "all 0.2s",
              }}>
                <span style={{ position: "absolute", top: 2, left: form.emailPromo ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "all 0.2s" }} />
              </button>
            </div>

            {/* Push order notifications */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: 0 }}>Order Tracking Alerts</p>
                <p style={{ color: "#6B7280", fontSize: 11, margin: "2px 0 0" }}>Get real-time push notifications on active deliveries</p>
              </div>
              <button type="button" onClick={() => setForm({ ...form, pushOrder: !form.pushOrder })} style={{
                width: 44, height: 24, borderRadius: 100, border: "none", cursor: "pointer",
                background: form.pushOrder ? "linear-gradient(to right, #7C3AED, #EC4899)" : "rgba(255,255,255,0.08)",
                position: "relative", transition: "all 0.2s",
              }}>
                <span style={{ position: "absolute", top: 2, left: form.pushOrder ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "all 0.2s" }} />
              </button>
            </div>

            {/* Two factor toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: 0 }}>Two-Factor Authentication</p>
                <p style={{ color: "#6B7280", fontSize: 11, margin: "2px 0 0" }}>Secure your account using SMS code verification</p>
              </div>
              <button type="button" onClick={() => setForm({ ...form, twoFactor: !form.twoFactor })} style={{
                width: 44, height: 24, borderRadius: 100, border: "none", cursor: "pointer",
                background: form.twoFactor ? "linear-gradient(to right, #7C3AED, #EC4899)" : "rgba(255,255,255,0.08)",
                position: "relative", transition: "all 0.2s",
              }}>
                <span style={{ position: "absolute", top: 2, left: form.twoFactor ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "all 0.2s" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          {saved && <span style={{ color: "#4ADE80", fontSize: 13, fontWeight: 600 }}>✓ Changes saved successfully!</span>}
          <button type="submit" disabled={loading} style={{
            marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 14,
            border: "none", background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 0 20px rgba(124,58,237,0.35)",
          }}>
            {loading ? "Saving..." : <><Save style={{ width: 15, height: 15 }} /> Save Changes</>}
          </button>
        </div>

      </form>
    </div>
  );
}
