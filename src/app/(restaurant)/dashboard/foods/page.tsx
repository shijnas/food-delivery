"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FoodsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard?tab=menu");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D0B14] pl-64 p-8 flex items-center justify-center">
      <div className="text-gray-500 text-sm">Redirecting to Menu Manager...</div>
    </div>
  );
}
