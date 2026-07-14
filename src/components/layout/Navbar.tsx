"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ShoppingCart, Bell, Search, ChefHat, User,
  LogOut, Settings, Heart, Package, Download, X,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

const navLinks = [
  { label: "Home",        href: "/home" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Orders",      href: "/orders" },
  { label: "Wishlist",    href: "/wishlist" },
];

const profileItems = [
  { label: "Profile",  href: "/profile",  icon: User    },
  { label: "Orders",   href: "/orders",   icon: Package },
  { label: "Wishlist", href: "/wishlist", icon: Heart   },
  { label: "Settings", href: "/settings",  icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.getItemCount());
  const { setCartDrawerOpen } = useUIStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 64,
        background: "rgba(13,11,20,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1280, width: "100%", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: 24 }}>

          {/* Logo */}
          <Link href="/home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img src="/logo.jpg" alt="കയിക്ക്" style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 19, fontWeight: 800, fontFamily: "Outfit, sans-serif", background: "linear-gradient(to right,#A78BFA,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              കയിക്ക്
            </span>
          </Link>

          {/* Nav links — hidden on mobile */}
          <nav style={{ display: "flex", gap: 4, flex: 1 }} className="hide-mobile">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{
                padding: "8px 14px", borderRadius: 10, fontSize: 14, fontWeight: 500,
                textDecoration: "none",
                color: pathname === link.href ? "#fff" : "#6B7280",
                background: pathname === link.href ? "rgba(255,255,255,0.08)" : "transparent",
                transition: "all 0.2s",
              }}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            {/* Download */}
            <a href="/kayikk.apk" download="kayikk.apk" style={{
              display: "flex", alignItems: "center", gap: 6,
              height: 36, padding: "0 14px", borderRadius: 10,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#9CA3AF", cursor: "pointer", fontSize: 13, fontWeight: 600,
              textDecoration: "none",
            }} className="hide-mobile">
              <Download style={{ width: 14, height: 14 }} />
              <span>Download</span>
            </a>

            {/* Search */}
            <Link href="/restaurants" style={{
              width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#6B7280", textDecoration: "none", transition: "all 0.2s",
            }}>
              <Search style={{ width: 16, height: 16 }} />
            </Link>

            {/* Notifications */}
            <Link href="/notifications" style={{
              position: "relative", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#6B7280", textDecoration: "none",
            }}>
              <Bell style={{ width: 16, height: 16 }} />
              <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "#8B5CF6", borderRadius: "50%", border: "1.5px solid #0D0B14" }} />
            </Link>

            {/* Cart */}
            <button
              id="cart-button"
              onClick={() => setCartDrawerOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                height: 36, padding: "0 14px", borderRadius: 10,
                background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
                color: "#A78BFA", cursor: "pointer", fontSize: 13, fontWeight: 600,
              }}
            >
              <ShoppingCart style={{ width: 15, height: 15 }} />
              {cartCount > 0 && (
                <span style={{ background: "#8B5CF6", color: "#fff", fontSize: 11, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <div style={{ position: "relative" }}>
              <button
                id="profile-button"
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  width: 36, height: 36, borderRadius: 10, border: "2px solid rgba(139,92,246,0.35)",
                  background: "linear-gradient(135deg,#7C3AED,#EC4899)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 13, fontWeight: 800,
                }}
              >
                U
              </button>

              {profileOpen && (
                <div style={{
                  position: "absolute", right: 0, top: 44, width: 220,
                  background: "#181424", border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  overflow: "hidden", zIndex: 100,
                }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <p style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>User Name</p>
                    <p style={{ color: "#6B7280", fontSize: 12, marginTop: 2 }}>user@example.com</p>
                  </div>
                  <div style={{ padding: 8 }}>
                    {profileItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.href} href={item.href} onClick={() => setProfileOpen(false)} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "10px 12px", borderRadius: 10,
                          color: "#D1D5DB", fontSize: 13, textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#D1D5DB"; }}
                        >
                          <Icon style={{ width: 15, height: 15 }} /> {item.label}
                        </Link>
                      );
                    })}
                     <button 
                      onClick={() => {
                        localStorage.removeItem("restaurant_role");
                        window.location.href = "/login";
                      }}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px", borderRadius: 10, marginTop: 4,
                        background: "none", border: "none", cursor: "pointer",
                        color: "#F87171", fontSize: 13,
                      }}
                     >
                       <LogOut style={{ width: 15, height: 15 }} /> Sign Out
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {profileOpen && <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setProfileOpen(false)} />}

      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
