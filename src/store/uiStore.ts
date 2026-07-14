"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  darkMode: boolean;
  sidebarOpen: boolean;
  cartDrawerOpen: boolean;
  searchOpen: boolean;
  toggleDarkMode: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      darkMode: true,
      sidebarOpen: false,
      cartDrawerOpen: false,
      searchOpen: false,

      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
      setSearchOpen: (open) => set({ searchOpen: open }),
    }),
    {
      name: "kayikk-ui",
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);
