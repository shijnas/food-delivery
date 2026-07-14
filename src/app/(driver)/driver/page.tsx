"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin, Navigation, DollarSign, Package, CheckCircle, Clock,
  Star, Bike, AlertTriangle, ShieldAlert, Phone, MessageSquare,
  ChevronRight, Key, ArrowRight, User, Bell, LayoutDashboard,
  Wallet, Trophy, Eye, EyeOff, Shield, RefreshCw, Settings
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

// Mock earnings chart
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const earningsChartData = [
  { day: "Mon", amt: 1200 },
  { day: "Tue", amt: 1450 },
  { day: "Wed", amt: 1850 }, // Today
  { day: "Thu", amt: 1600 },
  { day: "Fri", amt: 2100 },
  { day: "Sat", amt: 2300 },
  { day: "Sun", amt: 1900 },
];

function DriverContent() {
  const router = useRouter();

  // Navigation states
  const [activeTab, setActiveTab] = useState<"home" | "deliveries" | "earnings" | "notifications" | "profile">("home");
  const [isOnline, setIsOnline] = useState(true);

  // Stats states
  const [earningsToday, setEarningsToday] = useState(1850);
  const [completedCount, setCompletedCount] = useState(12);
  const [walletBalance, setWalletBalance] = useState(3540);
  const [incentiveCount, setIncentiveCount] = useState(14);

  // Active delivery flow states
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [incomingRequest, setIncomingRequest] = useState<any>(null);
  const [countdown, setCountdown] = useState(20);
  
  // Stages: "accepted" | "navigate_restaurant" | "picked_up" | "navigate_customer" | "delivered"
  const [deliveryStage, setDeliveryStage] = useState<string>("accepted");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);

  // SOS state
  const [sosActive, setSosActive] = useState(false);

  // Simulate incoming order after 5s if online and has no active order
  useEffect(() => {
    if (!isOnline || activeOrder || incomingRequest) return;

    const timer = setTimeout(() => {
      setIncomingRequest({
        id: "1520",
        restaurant: "Burger King",
        customer: "Rahul",
        pickupDistance: "1.8 km",
        dropDistance: "4.2 km",
        estTime: "22 mins",
        fee: 120,
        bonus: 25,
        total: 145,
        items: "Burger x2, Coke x1",
        payment: "COD"
      });
      setCountdown(20);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOnline, activeOrder, incomingRequest]);

  // Countdown timer for incoming request
  useEffect(() => {
    if (!incomingRequest) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIncomingRequest(null);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [incomingRequest]);

  // Accept Order
  const handleAcceptRequest = () => {
    setActiveOrder(incomingRequest);
    setIncomingRequest(null);
    setDeliveryStage("accepted");
    setActiveTab("deliveries"); // transition to active route view
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (otpInput === "2456") {
      setEarningsToday(prev => prev + activeOrder.total);
      setCompletedCount(prev => prev + 1);
      setWalletBalance(prev => prev + activeOrder.total);
      setIncentiveCount(prev => Math.min(20, prev + 1));
      
      setDeliveryStage("delivered");
      
      setTimeout(() => {
        setActiveOrder(null);
        setActiveTab("home");
      }, 2000);
      
      setOtpInput("");
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const handleGoOffline = () => {
    setIsOnline(false);
    setIncomingRequest(null);
  };

  return (
    <div className="min-h-screen bg-[#0D0B14] pb-28 text-white font-sans">
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#181424]/90 backdrop-blur-md border-b border-white/[0.06] px-8 py-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-bold text-base shadow-lg shadow-purple-500/20">
              S
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Good Afternoon 👋</p>
              <h1 className="text-white font-extrabold text-sm mt-0.5">Shijnas Yunus</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* SOS button */}
            <button
              onClick={() => {
                setSosActive(!sosActive);
                if (!sosActive) alert("SOS Activated! Emergency dispatchers are reviewing your location coordinates.");
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                sosActive ? "bg-red-600/30 border-red-500 text-red-400 animate-pulse" : "bg-red-500/10 border-red-500/20 text-red-500"
              }`}
            >
              <ShieldAlert className="h-4.5 w-4.5" />
            </button>

            {/* Online toggle */}
            <button
              onClick={() => { isOnline ? handleGoOffline() : setIsOnline(true); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isOnline
                  ? "bg-green-500/15 border-green-500/30 text-green-400"
                  : "bg-white/[0.03] border-white/[0.06] text-gray-500"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-600"}`} />
              {isOnline ? "Online" : "Offline"}
            </button>
          </div>
        </div>
      </header>

      {/* ── INCOMING REQUEST MODAL OVERLAY ── */}
      {incomingRequest && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16
        }} className="flex items-center justify-center">
          <div style={{
            width: "100%", maxWidth: 360, background: "#1C192E", border: "2px solid #8B5CF6",
            borderRadius: 24, padding: 24, boxShadow: "0 10px 40px rgba(124,58,237,0.3)"
          }}>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="purple">NEW DELIVERY REQUEST</Badge>
              <span className="text-red-400 font-extrabold text-sm flex items-center gap-1">
                ⏱️ {countdown}s
              </span>
            </div>

            <h3 className="text-white text-2xl font-black mb-1">{incomingRequest.restaurant}</h3>
            <p className="text-gray-400 text-xs mb-4">To customer: {incomingRequest.customer}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/[0.04] text-center">
                <p className="text-gray-500 text-[10px]">Pickup Dist</p>
                <p className="text-white font-bold text-sm mt-0.5">{incomingRequest.pickupDistance}</p>
              </div>
              <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/[0.04] text-center">
                <p className="text-gray-500 text-[10px]">Drop Dist</p>
                <p className="text-white font-bold text-sm mt-0.5">{incomingRequest.dropDistance}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-3 mb-5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span className="text-white font-semibold">{incomingRequest.estTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span className="text-white">₹{incomingRequest.fee}</span>
              </div>
              <div className="flex justify-between border-t border-white/[0.04] pt-2 mt-2">
                <span className="font-bold text-white">Total Earnings:</span>
                <span className="text-green-400 font-black text-base">₹{incomingRequest.total}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIncomingRequest(null)}
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white text-xs font-semibold cursor-pointer py-2.5"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptRequest}
                className="flex-[1.5] rounded-xl border-none bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-extrabold cursor-pointer py-2.5 shadow-lg shadow-purple-500/25"
              >
                Accept Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN PAGES CONTAINER ── */}
      <div className="px-8 lg:px-12 w-full pb-12" style={{ paddingTop: "135px" }}>

        {/* ──────────────────────────────────────────────────────── */}
        {/* ── TAB 1: HOME PAGE ── */}
        {/* ──────────────────────────────────────────────────────── */}
        {activeTab === "home" && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Left/Middle Column (Main workflow) */}
            <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
              
              {/* KPI Stats Row */}
              <div className="grid sm:grid-cols-2 gap-6">
                <Card variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Earnings</p>
                  <p className="text-3xl font-black text-[#4ADE80] mt-2">₹{earningsToday}</p>
                  <p className="text-gray-500 text-[10px] mt-2">Acceptance Rate: <span className="text-white font-bold">98%</span></p>
                </Card>

                <Card variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Completed Trips</p>
                  <p className="text-3xl font-black text-purple-400 mt-2">{completedCount}</p>
                  <p className="text-gray-500 text-[10px] mt-2">Average Rating: <span className="text-white font-bold">4.9★</span></p>
                </Card>
              </div>

              {/* Offline Warning banner */}
              {!isOnline && (
                <div className="p-5 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">You are currently offline</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Toggle your status to Online in the top-right corner to start receiving new delivery requests.</p>
                  </div>
                </div>
              )}

              {/* Active Trip card */}
              {activeOrder ? (
                <Card variant="glow" padding="lg" className="bg-[#12101C]/40 border-purple-500/20">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="purple">ACTIVE DELIVERY TRIP</Badge>
                    <span className="text-xs text-gray-500 font-mono">Order #{activeOrder.id}</span>
                  </div>
                  <h3 className="text-white text-xl font-bold">{activeOrder.restaurant}</h3>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                    Status: <span className="text-purple-300 font-bold capitalize">{
                      deliveryStage === "accepted" ? "Order Accepted" :
                      deliveryStage === "navigate_restaurant" ? "Navigating to Restaurant" :
                      deliveryStage === "picked_up" ? "Order Picked Up" :
                      deliveryStage === "navigate_customer" ? "Navigating to Customer" : "Delivered"
                    }</span>
                  </p>
                  <button
                    onClick={() => setActiveTab("deliveries")}
                    className="w-full mt-5 py-3 bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/25 text-purple-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    Open Live Navigation Map <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </Card>
              ) : (
                <Card variant="glass" padding="lg" className="flex flex-col items-center justify-center text-center bg-[#12101C]/20 border border-white/[0.04] py-12 gap-3.5">
                  <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-1">
                    <Bike className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-white font-extrabold text-sm">No Active Deliveries</h3>
                  <p className="text-gray-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">Once you are Online, new order dispatches will automatically populate here.</p>
                </Card>
              )}

              {/* Travel metrics stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Distance", val: "38.4 km", sub: "Today's Trip" },
                  { label: "Hours Active", val: "5.2 hrs", sub: "Since 8 AM" },
                  { label: "Fuel Cost", val: "₹180", sub: "Estimate" }
                ].map((item, i) => (
                  <Card key={i} variant="glass" padding="md" className="text-center bg-[#12101C]/40 border-white/[0.04]">
                    <p className="text-white font-extrabold text-sm">{item.val}</p>
                    <p className="text-gray-400 text-[10px] mt-1 font-bold">{item.label}</p>
                    <p className="text-gray-600 text-[9px] mt-0.5">{item.sub}</p>
                  </Card>
                ))}
              </div>

            </div>

            {/* Right Column (Insights & Alerts) */}
            <div className="flex flex-col gap-6 lg:gap-8">
              
              {/* Surge alert card */}
              <div className="p-5 bg-purple-500/5 border border-purple-500/15 rounded-2xl flex items-start gap-4">
                <Navigation className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold text-sm">🔥 High-Demand Zone Alert</p>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">High order density detected near **Marine Drive**. Head towards this zone to secure Peak-Hour bonus payouts.</p>
                </div>
              </div>

              {/* Quick Wallet Summary */}
              <Card variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Settlement Balance</p>
                <div className="flex justify-between items-center mt-3 gap-4">
                  <p className="text-3xl font-black text-white">₹{walletBalance}</p>
                  <button
                    onClick={() => {
                      if (walletBalance <= 0) return;
                      alert(`Initiating transfer of ₹${walletBalance} to registered bank UPI account...`);
                      setWalletBalance(0);
                    }}
                    className="px-4.5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-xs font-bold text-white whitespace-nowrap flex-shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    Withdraw
                  </button>
                </div>
              </Card>

              {/* Incentive trophy tracker */}
              <Card variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-bold text-xs flex items-center gap-2"><Trophy className="h-4 w-4 text-yellow-400" /> Today's Incentives</h3>
                  <span className="text-[10px] text-green-400 font-extrabold">Reward: ₹500</span>
                </div>
                
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2.5">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(incentiveCount/20)*100}%` }} />
                </div>
                
                <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold">
                  <span>Complete 20 Deliveries</span>
                  <span className="text-white font-bold">{incentiveCount} / 20</span>
                </div>
              </Card>

            </div>

          </div>
        )}

        {/* ──────────────────────────────────────────────────────── */}
        {/* ── TAB 2: DELIVERIES (ACTIVE TRIP ROUTE & NAVIGATION) ── */}
        {/* ──────────────────────────────────────────────────────── */}
        {activeTab === "deliveries" && (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {activeOrder ? (
              <>
                {/* Left/Middle Navigation column */}
                <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
                  
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
                    <div>
                      <span className="text-purple-400 text-[10px] font-extrabold uppercase tracking-widest">Active Dispatch Trip</span>
                      <h2 className="text-white text-xl font-black mt-0.5">Trip Order #{activeOrder.id}</h2>
                    </div>
                    <Badge variant="green" dot>ETA: 12 min</Badge>
                  </div>

                  {/* Progress stages */}
                  <div className="flex justify-between items-center gap-1.5 px-2">
                    {[
                      { label: "Accepted", id: "accepted" },
                      { label: "Navigate", id: "navigate_restaurant" },
                      { label: "Picked Up", id: "picked_up" },
                      { label: "Drop Off", id: "navigate_customer" },
                      { label: "Verify OTP", id: "delivered" }
                    ].map((stage, i) => {
                      const isPassed = ["accepted", "navigate_restaurant", "picked_up", "navigate_customer", "delivered"].indexOf(deliveryStage) >= i;
                      return (
                        <div key={stage.id} className="flex-1 flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isPassed ? "bg-purple-600 text-white font-black" : "bg-white/10 text-gray-500"
                          }`}>
                            {i + 1}
                          </div>
                          <span className="text-[8px] text-gray-500 mt-1 text-center font-bold capitalize">{stage.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Map canvas */}
                  {deliveryStage !== "delivered" && (
                    <Card variant="glass" padding="none" className="h-80 overflow-hidden relative border border-white/[0.04] bg-[#12101C]/40">
                      <div className="absolute inset-0 bg-[#12101C]">
                        {/* Grid */}
                        <svg width="100%" height="100%" opacity="0.15">
                          <pattern id="navGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="1" />
                          </pattern>
                          <rect width="100%" height="100%" fill="url(#navGrid)" />
                        </svg>

                        {/* Route Line */}
                        <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
                          <path d="M 50 180 L 150 110 L 280 60" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeDasharray="6 4" />
                        </svg>

                        {/* Pins */}
                        <div className="absolute bottom-12 left-10 flex flex-col items-center">
                          <MapPin className="h-5 w-5 text-blue-400 fill-blue-400" />
                          <span className="text-[8px] bg-black/80 px-1 py-0.5 rounded text-white mt-1">You</span>
                        </div>

                        <div className="absolute top-20 left-1/3 flex flex-col items-center">
                          <Bike className="h-6 w-6 text-purple-400" />
                        </div>

                        <div className="absolute top-10 right-20 flex flex-col items-center">
                          <MapPin className="h-5 w-5 text-pink-500 fill-pink-500" />
                          <span className="text-[8px] bg-black/80 px-1 py-0.5 rounded text-white mt-1">{activeOrder.restaurant}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 bg-[#1C192E]/90 border border-white/[0.06] rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="text-gray-400 text-[10px]">Traffic density</p>
                          <p className="text-green-400 text-xs font-bold mt-0.5 font-bold">Light Traffic • Clear path</p>
                        </div>
                        <button
                          onClick={() => alert("Launching external Google Maps Navigation coordinates...")}
                          className="px-3.5 py-2 bg-[#8B5CF6] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer border-none"
                        >
                          <Navigation className="h-3.5 w-3.5" /> Navigation
                        </button>
                      </div>
                    </Card>
                  )}

                  {/* Trip completed banner */}
                  {deliveryStage === "delivered" && (
                    <Card variant="glass" padding="lg" className="text-center bg-green-500/10 border-green-500/20 py-12">
                      <CheckCircle className="h-14 w-14 text-green-400 mx-auto mb-3" />
                      <h3 className="text-white font-extrabold text-xl">Delivery Trip Completed!</h3>
                      <p className="text-gray-400 text-xs mt-1.5">₹{activeOrder.total} has been credited to your settlement wallet balance.</p>
                    </Card>
                  )}

                </div>

                {/* Right Address & Verification panel */}
                <div className="flex flex-col gap-6 lg:gap-8">
                  
                  {/* Pickup stage */}
                  {(deliveryStage === "accepted" || deliveryStage === "navigate_restaurant") && (
                    <Card variant="glass" padding="md" className="bg-[#12101C]/40 border border-white/[0.04]">
                      <div className="flex justify-between items-start mb-3 border-b border-white/[0.04] pb-3">
                        <div>
                          <p className="text-purple-400 text-[10px] font-extrabold">PICKUP FROM</p>
                          <h3 className="text-white text-base font-bold mt-0.5">{activeOrder.restaurant}</h3>
                          <p className="text-gray-500 text-xs mt-0.5">Marine Drive, Kochi Bypass</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => alert("Calling restaurant...")} className="p-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 rounded-xl cursor-pointer"><Phone className="h-4 w-4" /></button>
                          <button onClick={() => alert("Opening live chat with restaurant merchant...")} className="p-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 rounded-xl cursor-pointer"><MessageSquare className="h-4 w-4" /></button>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs leading-relaxed mb-4">📋 <b>Instructions:</b> Ask merchant for Order #{activeOrder.id} token verification code.</p>

                      <button
                        onClick={() => setDeliveryStage("picked_up")}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
                      >
                        Confirm Arrival & Mark Picked Up
                      </button>
                    </Card>
                  )}

                  {/* Drop off stage */}
                  {(deliveryStage === "picked_up" || deliveryStage === "navigate_customer") && (
                    <Card variant="glass" padding="md" className="bg-[#12101C]/40 border border-white/[0.04]">
                      <div className="flex justify-between items-start mb-3 border-b border-white/[0.04] pb-3">
                        <div>
                          <p className="text-purple-400 text-[10px] font-extrabold">DELIVER TO CUSTOMER</p>
                          <h3 className="text-white text-base font-bold mt-0.5">{activeOrder.customer}</h3>
                          <p className="text-gray-500 text-xs mt-0.5">Vyttila Hub Road, Phase 2, Kochi</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => alert("Calling customer...")} className="p-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 rounded-xl cursor-pointer"><Phone className="h-4 w-4" /></button>
                          <button onClick={() => alert("Opening live chat with customer...")} className="p-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 rounded-xl cursor-pointer"><MessageSquare className="h-4 w-4" /></button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4 border-b border-white/[0.02] pb-3">
                        <p>🍔 Items: <span className="text-white font-bold">{activeOrder.items}</span></p>
                        <p>💳 Payment Mode: <span className="text-[#4ADE80] font-black">{activeOrder.payment}</span></p>
                      </div>

                      <div className="flex flex-col gap-4.5">
                        <input
                          type="text"
                          placeholder="Enter Delivery OTP (e.g. 2456)"
                          className="w-full bg-[#12101C]/60 border border-white/[0.06] rounded-xl p-3.5 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                          value={otpInput}
                          onChange={e => setOtpInput(e.target.value)}
                        />
                        <button
                          onClick={handleVerifyOtp}
                          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-extrabold rounded-xl text-xs uppercase cursor-pointer"
                        >
                          Verify & Complete Deliver
                        </button>
                      </div>
                      {otpError && (
                        <p className="text-red-400 text-[10px] mt-2 font-bold">✕ Invalid OTP. Enter OTP: 2456.</p>
                      )}
                    </Card>
                  )}

                </div>
              </>
            ) : (
              <div className="col-span-3 text-center py-16">
                <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bike className="h-8 w-8 text-gray-600" />
                </div>
                <h2 className="text-white font-bold mb-2">No Active Trips</h2>
                <p className="text-gray-500 text-sm mb-6">Head back to the Home tab to check for available dispatches.</p>
                <button
                  onClick={() => setActiveTab("home")}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xs font-bold text-white cursor-pointer border-none shadow-md"
                >
                  Go to Home Screen
                </button>
              </div>
            )}

          </div>
        )}

        {/* ──────────────────────────────────────────────────────── */}
        {/* ── TAB 3: EARNINGS PAGE & INCENTIVES ── */}
        {/* ──────────────────────────────────────────────────────── */}
        {activeTab === "earnings" && (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left/Middle Column (Analytics & Payouts) */}
            <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
              
              <div className="grid sm:grid-cols-2 gap-6">
                <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Weekly Earnings</p>
                  <p className="text-3xl font-black text-white mt-2">₹10,520</p>
                </Card>
                <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Monthly Earnings</p>
                  <p className="text-3xl font-black text-white mt-2">₹38,600</p>
                </Card>
              </div>

              {/* Earnings chart */}
              <Card variant="glass" padding="md" className="bg-[#12101C]/40 border border-white/[0.04]">
                <h2 className="text-white font-bold mb-4 text-sm">Weekly Growth Metrics</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={earningsChartData}>
                    <defs>
                      <linearGradient id="drvGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                    <XAxis dataKey="day" stroke="rgba(179,179,179,0.3)" tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="amt" stroke="#8B5CF6" strokeWidth={2} fill="url(#drvGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

            </div>

            {/* Right Column (Wallet & reviews) */}
            <div className="flex flex-col gap-6 lg:gap-8">
              
              <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Settlement Wallet Balance</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-3xl font-black text-white">₹{walletBalance}</p>
                  <button
                    onClick={() => {
                      if (walletBalance <= 0) return;
                      alert(`Initiating transfer of ₹${walletBalance} to your registered UPI bank account...`);
                      setWalletBalance(0);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-xs font-bold text-white cursor-pointer"
                  >
                    Withdraw
                  </button>
                </div>
              </Card>

              {/* Incentives tracker */}
              <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-bold text-xs flex items-center gap-1.5"><Trophy className="h-4 w-4 text-yellow-400" /> Today's Incentives</h3>
                  <span className="text-[10px] text-green-400 font-bold">Reward: ₹500</span>
                </div>
                
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(incentiveCount/20)*100}%` }} />
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Complete 20 Deliveries</span>
                  <span className="text-white font-bold">{incentiveCount} / 20</span>
                </div>
              </Card>

              {/* Ratings */}
              <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                <h3 className="text-white font-bold text-xs mb-3 flex items-center gap-1.5"><Star className="h-4 w-4 text-orange-400" /> Recent Reviews</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { comment: "Super fast delivery! Appreciated.", rating: 5 },
                    { comment: "Very polite driver.", rating: 5 }
                  ].map((rev, i) => (
                    <div key={i} className="p-2.5 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                      <p className="text-gray-300 text-xs">{rev.comment}</p>
                      <div className="flex gap-0.5 mt-1.5">
                        {Array(rev.rating).fill(0).map((_, idx) => <span key={idx} className="text-yellow-400 text-[9px]">★</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

          </div>
        )}

        {/* ──────────────────────────────────────────────────────── */}
        {/* ── TAB 4: NOTIFICATIONS SCREEN ── */}
        {/* ──────────────────────────────────────────────────────── */}
        {activeTab === "notifications" && (
          <div className="flex justify-center w-full">
            <div className="w-full max-w-3xl flex flex-col gap-5">
              <h1 className="text-white text-2xl font-bold mb-4 mt-2">Notifications</h1>
              {[
                { title: "🎉 Daily Incentive Earned", desc: "You completed 20 trips yesterday. ₹500 bonus credited.", date: "1 day ago" },
                { title: "💰 Payout Released", desc: "Weekly settlement payout of ₹12,130 sent to SBI Account.", date: "2 days ago" },
                { title: "⚡ Peak Hours Active", desc: "Order demand is high in Kakkanad. Surge pricing enabled.", date: "3 days ago" },
              ].map((notif, i) => (
                <div key={i} className="p-5 bg-[#12101C]/40 border border-white/[0.06] rounded-2xl transition-all hover:bg-[#12101C]/65">
                  <p className="text-white text-sm font-semibold">{notif.title}</p>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{notif.desc}</p>
                  <span className="text-[10px] text-gray-500 mt-2.5 block">{notif.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────── */}
        {/* ── TAB 5: PROFILE & VEHICLE SETTINGS ── */}
        {/* ──────────────────────────────────────────────────────── */}
        {activeTab === "profile" && (
          <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
              
              <div className="flex flex-col gap-6">
                {/* Driver Profile card */}
                <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                  <div className="flex items-center gap-4 border-b border-white/[0.04] pb-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg text-white">
                      S
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">Shijnas Yunus</h3>
                      <p className="text-gray-500 text-xs">ID: DRV-99281</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-xs text-gray-400">
                    <div className="flex justify-between"><span>Phone Number:</span><span className="text-white font-semibold">+91 9447000000</span></div>
                    <div className="flex justify-between"><span>License Number:</span><span className="text-white">KL-07-2024009281</span></div>
                    <div className="flex justify-between"><span>Registered Vehicle:</span><span className="text-white font-semibold">Hero Splendor Plus (Bike)</span></div>
                    <div className="flex justify-between"><span>Vehicle Number:</span><span className="text-white font-mono uppercase">KL-07-CD-1056</span></div>
                  </div>
                </Card>

                {/* Bank details settlings */}
                <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                  <h3 className="text-white font-bold text-xs mb-3 flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-green-400" /> Registered Bank Account</h3>
                  <div className="flex flex-col gap-3 text-xs text-gray-400">
                    <div className="flex justify-between"><span>Bank Name:</span><span className="text-white">State Bank of India</span></div>
                    <div className="flex justify-between"><span>IFSC Code:</span><span className="text-white font-mono">SBIN0007812</span></div>
                    <div className="flex justify-between"><span>Account Number:</span><span className="text-white font-mono">38920199201</span></div>
                    <div className="flex justify-between"><span>UPI ID:</span><span className="text-purple-400 font-bold">shijnas@oksbi</span></div>
                  </div>
                </Card>
              </div>

              <div className="flex flex-col gap-6">
                {/* General settings */}
                <Card variant="glass" padding="md" className="bg-[#12101C]/40 border-white/[0.04]">
                  <h3 className="text-white font-bold text-xs mb-3 flex items-center gap-1.5"><Settings className="h-4 w-4 text-purple-400" /> Settings & Preferences</h3>
                  
                  <div className="divide-y divide-white/[0.04]">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400 text-xs">Language translation</span>
                      <select className="bg-white/[0.04] border border-white/[0.08] text-white text-xs rounded px-2.5 py-1">
                        <option>English</option>
                        <option>Malayalam (മലയാളം)</option>
                      </select>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400 text-xs">Dark Mode</span>
                      <Badge variant="purple">Enabled</Badge>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400 text-xs">Preferred Map</span>
                      <select className="bg-white/[0.04] border border-white/[0.08] text-white text-xs rounded px-2.5 py-1">
                        <option>Google Maps</option>
                        <option>Waze Navigation</option>
                      </select>
                    </div>
                  </div>
                </Card>

                <button
                  onClick={() => {
                    localStorage.removeItem("restaurant_role");
                    window.location.href = "/login";
                  }}
                  className="w-full py-3.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-xs uppercase transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ── STICKY BOTTOM NAVIGATION BAR ── */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#181424]/95 backdrop-blur-md border-t border-white/[0.06] flex items-center justify-around z-50">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-around">
          {[
            { id: "home", label: "Home", icon: LayoutDashboard },
            { id: "deliveries", label: "Deliveries", icon: Bike },
            { id: "earnings", label: "Earnings", icon: DollarSign },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "profile", label: "Profile", icon: User }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-all border-none bg-transparent cursor-pointer ${
                  isActive ? "text-purple-400" : "text-gray-500 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}

export default function DriverDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0B14] flex items-center justify-center text-gray-500 text-sm">Loading Driver Portal...</div>}>
      <DriverContent />
    </Suspense>
  );
}
