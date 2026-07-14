"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Tags,
  Gift, Users, BarChart3, Bike, Star, DollarSign, Settings, LogOut
} from "lucide-react";

const navItems = [
  { label: "Dashboard",  id: "dashboard",  icon: LayoutDashboard },
  { label: "Orders",     id: "orders",     icon: ShoppingBag },
  { label: "Menu",       id: "menu",       icon: UtensilsCrossed },
  { label: "Categories", id: "categories", icon: Tags },
  { label: "Offers",     id: "offers",     icon: Gift },
  { label: "Customers",  id: "customers",  icon: Users },
  { label: "Analytics",  id: "analytics",  icon: BarChart3 },
  { label: "Drivers",    id: "drivers",    icon: Bike },
  { label: "Reviews",    id: "reviews",    icon: Star },
  { label: "Payouts",    id: "payouts",    icon: DollarSign },
];

const mobileNavItems = [
  { label: "Home",      id: "dashboard", icon: LayoutDashboard },
  { label: "Orders",    id: "orders",    icon: ShoppingBag },
  { label: "Menu",      id: "menu",      icon: UtensilsCrossed },
  { label: "Analytics", id: "analytics", icon: BarChart3 },
  { label: "Settings",  id: "settings",  icon: Settings },
];

export default function RestaurantSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  if (!pathname || !pathname.startsWith("/dashboard")) return null;

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="desktop-sidebar hidden lg:flex">

        {/* Logo */}
        <div className="px-6 pt-7 pb-6 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Kayikk"
              className="w-11 h-11 rounded-2xl border border-white/[0.10] object-cover shadow-lg"
            />
            <div>
              <span className="text-white font-bold text-[16px] tracking-tight block leading-none">Kayikk</span>
              <span className="text-gray-500 text-[11px] mt-0.5 block">Restaurant Portal</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-5 flex flex-col gap-2.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={`/dashboard?tab=${item.id}`}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13.5px] font-medium tracking-tight transition-all duration-200 relative group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/15 to-pink-500/10 border border-purple-500/25 text-white shadow-[0_4px_20px_rgba(139,92,246,0.15)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-gradient-to-b from-purple-400 to-pink-500 rounded-r-full" />
                )}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-purple-500/30 to-pink-500/20 border border-purple-500/30"
                    : "bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08] group-hover:border-white/[0.12]"
                }`}>
                  <Icon className={`h-4 w-4 ${isActive ? "text-purple-300" : "text-gray-400 group-hover:text-purple-400"}`} />
                </div>
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 pb-5 pt-3 border-t border-white/[0.05] flex flex-col gap-2.5">
          <Link
            href="/dashboard?tab=settings"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13.5px] font-medium tracking-tight transition-all duration-200 relative group ${
              activeTab === "settings"
                ? "bg-gradient-to-r from-purple-500/15 to-pink-500/10 border border-purple-500/25 text-white shadow-[0_4px_20px_rgba(139,92,246,0.15)]"
                : "text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            {activeTab === "settings" && (
              <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-gradient-to-b from-purple-400 to-pink-500 rounded-r-full" />
            )}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              activeTab === "settings"
                ? "bg-gradient-to-br from-purple-500/30 to-pink-500/20 border border-purple-500/30"
                : "bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08]"
            }`}>
              <Settings className={`h-4 w-4 ${activeTab === "settings" ? "text-purple-300" : "text-gray-400 group-hover:text-purple-400"}`} />
            </div>
            <span>Settings</span>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("restaurant_role");
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13.5px] font-medium tracking-tight text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-left border border-transparent hover:border-red-500/20 cursor-pointer bg-transparent group"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-500/[0.08] border border-red-500/15 group-hover:bg-red-500/15">
              <LogOut className="h-4 w-4 text-red-400" />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      <nav className="fixed bottom-0 left-0 right-0 h-[68px] bg-[#0d0b14]/95 backdrop-blur-xl border-t border-white/[0.06] flex items-center justify-around z-40 lg:hidden px-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              href={`/dashboard?tab=${item.id}`}
              className={`flex flex-col items-center justify-center gap-1.5 w-16 h-full transition-all ${
                isActive ? "text-purple-400" : "text-gray-500 hover:text-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                isActive ? "bg-purple-500/20 border border-purple-500/30" : ""
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
