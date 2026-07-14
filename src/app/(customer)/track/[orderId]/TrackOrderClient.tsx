"use client";

import { use, useState, useEffect } from "react";
import { Phone, MessageCircle, Star, MapPin, Clock } from "lucide-react";
import { mockOrders } from "@/lib/mockData";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const statusSteps = [
  { key: "confirmed", label: "Order Confirmed", icon: "✅", desc: "Restaurant received your order" },
  { key: "preparing", label: "Preparing", icon: "👨‍🍳", desc: "Your food is being prepared" },
  { key: "ready", label: "Ready for Pickup", icon: "📦", desc: "Order is packed and ready" },
  { key: "on_the_way", label: "On the Way", icon: "🛵", desc: "Driver is heading your way" },
  { key: "delivered", label: "Delivered", icon: "🎉", desc: "Enjoy your meal!" },
];

export default function TrackOrderClient({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [currentStatus] = useState(2); // "ready" index
  const [eta, setEta] = useState(18);

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  const [driverPosition, setDriverPosition] = useState({ x: 280, y: 60 });

  // Simulate live status updates and animate driver position
  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t = (t + 0.4) % 100;
      let x = 0;
      let y = 0;
      if (t < 50) {
        const p = t / 50;
        x = 280 + p * (150 - 280);
        y = 60 + p * (110 - 60);
      } else {
        const p = (t - 50) / 50;
        x = 150 + p * (50 - 150);
        y = 110 + p * (180 - 110);
      }
      setDriverPosition({ x, y });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 640, margin: "0 auto", padding: "96px 20px 40px", boxSizing: "border-box" }}>
      <h1 className="text-white text-2xl font-bold mb-2">Live Tracking</h1>
      <p className="text-gray-500 text-sm mb-6">Order #{order.id}</p>

      {/* Real Live Map */}
      <div className="relative h-72 bg-[#12101C] border border-purple-500/20 rounded-3xl overflow-hidden mb-6">
        {/* Grid lines background */}
        <svg width="100%" height="100%" opacity="0.15" className="absolute inset-0">
          <pattern id="navGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#navGrid)" />
        </svg>

        {/* Route Line */}
        <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
          <path d="M 50 180 L 150 110 L 280 60" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeDasharray="6 4" />
        </svg>

        {/* You / Delivery Pin */}
        <div className="absolute bottom-10 left-10 flex flex-col items-center">
          <MapPin className="h-6 w-6 text-blue-400 fill-blue-400 filter drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
          <span className="text-[9px] bg-black/80 border border-white/10 px-1.5 py-0.5 rounded text-white mt-1 font-bold">You</span>
        </div>

        {/* Dynamic Driver Marker */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
          style={{ left: driverPosition.x, top: driverPosition.y }}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 text-white text-base border border-white/25">
              🛵
            </div>
            <span className="text-[8px] bg-purple-950/90 border border-purple-500/30 px-1 py-0.2 rounded text-purple-300 mt-1 font-extrabold whitespace-nowrap">Alex (Live)</span>
          </div>
        </div>

        {/* Restaurant Pin */}
        <div className="absolute top-10 right-20 flex flex-col items-center">
          <MapPin className="h-6 w-6 text-pink-500 fill-pink-500 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
          <span className="text-[9px] bg-black/80 border border-white/10 px-1.5 py-0.5 rounded text-white mt-1 font-bold whitespace-nowrap">{order.restaurant.name}</span>
        </div>

        {/* ETA overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div className="bg-[#181424]/90 backdrop-blur-md border border-white/[0.08] rounded-2xl px-4 py-2.5 flex items-center gap-3">
            <Clock className="h-4 w-4 text-purple-400" />
            <div>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Estimated Time</p>
              <p className="text-white font-extrabold text-sm">{eta} mins remaining</p>
            </div>
          </div>
          <Badge variant="purple" dot className="px-3.5 py-1 text-xs">Live Tracking</Badge>
        </div>

        {/* Bottom Status bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#1C192E]/90 border border-white/[0.06] rounded-2xl p-3 flex justify-between items-center backdrop-blur-sm">
          <div>
            <p className="text-gray-400 text-[10px]">Traffic status</p>
            <p className="text-green-400 text-xs font-bold mt-0.5">Light Traffic • Clear path</p>
          </div>
          <span className="text-[10px] font-mono text-purple-300 font-bold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
            GPS Signal: Strong
          </span>
        </div>
      </div>

      {/* Driver Info */}
      <Card variant="default" padding="md" className="mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-2xl flex items-center justify-center text-2xl">
            👨
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">Alex Martinez</p>
            <div className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm font-medium">4.9</span>
              <span className="text-gray-500 text-xs">• Honda CB500 • KAY-123</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              id="call-driver"
              className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-all"
              aria-label="Call driver"
            >
              <Phone className="h-5 w-5" />
            </button>
            <button
              id="message-driver"
              className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 hover:bg-purple-500/20 transition-all"
              aria-label="Message driver"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Order Status Timeline */}
      <Card variant="default" padding="md" className="mb-5">
        <h2 className="text-white font-semibold mb-5">Order Status</h2>
        <div className="space-y-4">
          {statusSteps.map((step, i) => {
            const isDone = i <= currentStatus;
            const isCurrent = i === currentStatus;

            return (
              <div key={step.key} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 transition-all",
                      isDone
                        ? isCurrent
                          ? "bg-gradient-to-br from-purple-600 to-pink-600 shadow-neon-purple"
                          : "bg-purple-500/20 border border-purple-500/30"
                        : "bg-white/[0.04] border border-white/[0.06]"
                    )}
                  >
                    {step.icon}
                  </div>
                  {i < statusSteps.length - 1 && (
                    <div
                      className={cn(
                        "w-0.5 h-6 mt-1 rounded-full transition-all",
                        i < currentStatus ? "bg-purple-500/50" : "bg-white/[0.06]"
                      )}
                    />
                  )}
                </div>
                <div className={cn("pb-4", i === statusSteps.length - 1 && "pb-0")}>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isDone ? "text-white" : "text-gray-600"
                    )}
                  >
                    {step.label}
                    {isCurrent && (
                      <span className="ml-2 text-xs text-purple-400 animate-pulse">● Now</span>
                    )}
                  </p>
                  <p className={cn("text-xs mt-0.5", isDone ? "text-gray-500" : "text-gray-700")}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Delivery Address */}
      <Card variant="default" padding="md" className="mb-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Delivering to</p>
            <p className="text-white font-semibold text-sm">{order.address.label}</p>
            <p className="text-gray-500 text-xs">{order.address.street}, {order.address.city}</p>
          </div>
        </div>
      </Card>

      {/* Order Summary */}
      <Card variant="default" padding="md">
        <h2 className="text-white font-semibold mb-3 text-sm">Order from {order.restaurant.name}</h2>
        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-500">{item.quantity}x {item.foodItem.name}</span>
              <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold border-t border-white/[0.06] pt-3">
          <span className="text-white">Total paid</span>
          <span className="text-purple-400">${order.total.toFixed(2)}</span>
        </div>

        <Button variant="outline" size="md" className="w-full mt-4">
          <Star className="h-4 w-4" />
          Rate your experience
        </Button>
      </Card>
    </div>
  );
}
