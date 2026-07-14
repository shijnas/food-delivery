"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingCart, Heart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Browse", href: "/restaurants", icon: UtensilsCrossed },
  { label: "Cart", href: "#", icon: ShoppingCart, isCart: true },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.getItemCount());
  const setCartDrawerOpen = useUIStore((s) => s.setCartDrawerOpen);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-bottom">
      <div className="mx-4 mb-4 bg-[#181424]/95 backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const isActive = !tab.isCart && pathname === tab.href;
            const Icon = tab.icon;

            if (tab.isCart) {
              return (
                <button
                  key="cart"
                  id="mobile-cart-button"
                  onClick={() => setCartDrawerOpen(true)}
                  className="relative flex flex-col items-center gap-1 p-2"
                  aria-label="Cart"
                >
                  <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-neon-purple">
                    <Icon className="h-5 w-5 text-white" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-purple-600 text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center gap-1 p-2 group"
                aria-label={tab.label}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isActive
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-gray-500 group-hover:text-gray-300 group-hover:bg-white/5"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isActive ? "text-purple-400" : "text-gray-600"
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
