import RestaurantSidebar from "@/components/restaurant/RestaurantSidebar";
import { Suspense } from "react";

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0B14] flex justify-center items-start">
      <div className="w-full max-w-full flex px-8 py-6 gap-8 relative">
        <Suspense fallback={null}>
          <RestaurantSidebar />
        </Suspense>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
