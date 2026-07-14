"use client";

import {
  User, Mail, Phone, MapPin, Gift, Wallet, CreditCard, Settings,
  LogOut, ChevronRight, Bell, Shield, Languages, Package, Star, Clock
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const profileLinks = [
  { icon: Wallet,      label: "കയിക്ക് Wallet",    href: "#",             desc: "Balance: ₹1,350", badge: "New" },
  { icon: Gift,        label: "Refer & Earn",      href: "#",             desc: "Get ₹300 for each referral" },
  { icon: Settings,    label: "Account Settings",  href: "/settings",      desc: "Edit name, email, password" },
  { icon: Bell,        label: "Notifications",     href: "/notifications", desc: "Manage alerts" },
  { icon: Languages,   label: "Language & Region", href: "#",             desc: "English (IN) • INR" },
];

export default function ProfilePage() {
  return (
    <div style={{ width: "100%", maxWidth: 640, margin: "0 auto", padding: "32px 20px 80px", boxSizing: "border-box" }}>

      {/* ── PROFILE HERO CARD ── */}
      <div style={{
        position: "relative", padding: "28px 24px", borderRadius: 24,
        background: "linear-gradient(135deg, #181424 0%, #1e1233 100%)",
        border: "1px solid rgba(139,92,246,0.2)",
        overflow: "hidden", marginBottom: 24,
        boxShadow: "0 12px 30px rgba(0,0,0,0.4)"
      }}>
        <div style={{ position: "absolute", top: "-50%", right: "-20%", width: 250, height: 250, borderRadius: "50%", background: "rgba(139,92,246,0.12)", filter: "blur(50px)" }} />
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: "linear-gradient(135deg, #7C3AED, #EC4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 32, fontWeight: 800,
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 20px rgba(124,58,237,0.3)",
            marginBottom: 14
          }}>
            U
          </div>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0, fontFamily: "Outfit, sans-serif" }}>User Name</h1>
          <p style={{ color: "#9CA3AF", fontSize: 13, marginTop: 4, marginBottom: 8 }}>user@example.com</p>
          <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(139,92,246,0.2)", color: "#C4B5FD", border: "1px solid rgba(139,92,246,0.3)", padding: "3px 10px", borderRadius: 8 }}>
            🏆 Gold Member
          </span>
        </div>

        {/* Core Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18 }}>
          {[
            { label: "Orders", value: "48", icon: "📦" },
            { label: "Points", value: "1,250", icon: "⭐" },
            { label: "Reviews", value: "12", icon: "💬" },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 18, margin: "0 0 4px" }}>{stat.icon}</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0 }}>{stat.value}</p>
              <p style={{ color: "#6B7280", fontSize: 11, margin: "2px 0 0" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WALLET BALANCE (Dashboard Style) ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: 20, borderRadius: 20, background: "#181424",
        border: "1px solid rgba(255,255,255,0.07)", marginBottom: 20
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wallet style={{ width: 20, height: 20, color: "#22C55E" }} />
          </div>
          <div>
            <p style={{ color: "#6B7280", fontSize: 11, margin: 0 }}>Wallet Balance</p>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "2px 0 0", fontFamily: "Outfit, sans-serif" }}>₹1,350</p>
          </div>
        </div>
        <button style={{
          padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(34,197,94,0.3)",
          background: "rgba(34,197,94,0.06)", color: "#86EFAC", fontSize: 12, fontWeight: 700,
          cursor: "pointer", transition: "all 0.2s"
        }}>
          Top Up
        </button>
      </div>

      {/* ── RECENT ACTIVITY (Clearly separates Profile from Settings) ── */}
      <div style={{
        padding: 20, borderRadius: 20, background: "#181424",
        border: "1px solid rgba(255,255,255,0.07)", marginBottom: 24
      }}>
        <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <Clock style={{ width: 15, height: 15, color: "#A78BFA" }} /> Recent Order
        </h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: 0 }}>Pizza Palace</p>
            <p style={{ color: "#6B7280", fontSize: 11, margin: "2px 0 0" }}>1x Veggie Supreme Pizza • ₹450</p>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, background: "rgba(34,197,94,0.15)",
            color: "#86EFAC", border: "1px solid rgba(34,197,94,0.3)",
            padding: "2px 8px", borderRadius: 6
          }}>
            Delivered
          </span>
        </div>
      </div>

      {/* ── SETTINGS LINKS LIST ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {profileLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 14, padding: 14,
              background: "#181424", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16,
              textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,92,246,0.2)"; (e.currentTarget as HTMLAnchorElement).style.background = "#1E1830"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLAnchorElement).style.background = "#181424"; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
                <Icon style={{ width: 18, height: 18 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <p style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: 0 }}>{item.label}</p>
                  {item.badge && <span style={{ fontSize: 9, fontWeight: 700, background: "rgba(139,92,246,0.15)", color: "#C4B5FD", border: "1px solid rgba(139,92,246,0.3)", padding: "1px 6px", borderRadius: 4 }}>{item.badge}</span>}
                </div>
                <p style={{ color: "#6B7280", fontSize: 11, margin: "2px 0 0" }}>{item.desc}</p>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: "#4B5563" }} />
            </Link>
          );
        })}
      </div>

      {/* Sign Out Button */}
      <button 
        onClick={() => {
          localStorage.removeItem("restaurant_role");
          window.location.href = "/login";
        }}
        style={{
          width: "100%", height: 50, borderRadius: 16, border: "none", cursor: "pointer",
          background: "rgba(239,68,68,0.12)", color: "#FCA5A5", fontSize: 14, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        <LogOut style={{ width: 16, height: 16 }} /> Sign Out
      </button>

    </div>
  );
}
