"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Users, UtensilsCrossed, Car, DollarSign, ShoppingBag, TrendingUp, ArrowUpRight, AlertTriangle, CheckCircle, Shield, Settings, Menu } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { salesChartData, mockRestaurants, mockOrders } from "@/lib/mockData";
import { formatCurrency, getOrderStatusColor, getOrderStatusLabel } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const kpis = [
  { label: "Total Revenue", value: "₹12,48,200", change: "+22.4%", icon: DollarSign, color: "from-purple-600 to-pink-600" },
  { label: "Total Users", value: "52,490", change: "+8.1%", icon: Users, color: "from-blue-600 to-cyan-600" },
  { label: "Restaurants", value: "1,284", change: "+14.2%", icon: UtensilsCrossed, color: "from-green-600 to-emerald-600" },
  { label: "Active Drivers", value: "342", change: "+5.7%", icon: Car, color: "from-orange-500 to-yellow-500" },
  { label: "Total Orders", value: "89,120", change: "+18.9%", icon: ShoppingBag, color: "from-pink-600 to-rose-600" },
  { label: "Monthly Growth", value: "+22.4%", change: "+2.1%", icon: TrendingUp, color: "from-indigo-600 to-violet-600" },
];

const adminNavItems = [
  { label: "Dashboard", href: "/admin", active: true },
  { label: "Users", href: "/admin/users" },
  { label: "Restaurants", href: "/admin/restaurants" },
  { label: "Drivers", href: "/admin/drivers" },
  { label: "Coupons", href: "/admin/coupons" },
  { label: "Payments", href: "/admin/payments" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Reports", href: "/admin/reports" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#0D0B14] flex text-white font-sans">
      
      {/* Admin Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#12101C]/80 backdrop-blur-xl border-r border-white/[0.04] flex flex-col min-h-screen">
        <div className="p-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <div>
              <span className="text-white font-extrabold text-sm tracking-tight">Kayikk Portal</span>
              <p className="text-gray-500 text-[10px]">Super Administration</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {adminNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center px-4 py-3 rounded-2xl text-xs font-semibold transition-all border-none text-left cursor-pointer ${
                activeTab === item.label
                  ? "bg-purple-500/10 border border-purple-500/20 text-purple-300"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-5 border-t border-white/[0.04]">
          <Badge variant="green" dot>All Services Active</Badge>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto max-w-7xl mx-auto w-full">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/[0.04] pb-6">
          <div>
            <span className="text-purple-400 text-[10px] font-extrabold uppercase tracking-widest">Administrator Overview</span>
            <h1 className="text-white text-3xl font-extrabold tracking-tight mt-1">Admin Control Center</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-xs font-bold">Systems Operational</span>
            </div>
            <button onClick={() => alert("Launching platform logs console...")} className="p-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-md`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="flex items-center gap-0.5 text-[10px] text-green-400 font-extrabold">
                    <ArrowUpRight className="h-3 w-3" /> {kpi.change}
                  </span>
                </div>
                <p className="text-white text-2xl font-black">{kpi.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{kpi.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts & Diagnostics */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Revenue Chart */}
          <Card variant="glass" padding="md" className="lg:col-span-2 border border-white/[0.04] bg-[#12101C]/40">
            <h2 className="text-white font-bold text-sm mb-5">Platform Revenue Growth</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={salesChartData}>
                <defs>
                  <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="label" stroke="rgba(179,179,179,0.3)" tick={{ fontSize: 10 }} />
                <YAxis stroke="rgba(179,179,179,0.3)" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#12101C", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", color: "white", fontSize: "11px" }} />
                <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#adminGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* System Alerts */}
          <Card variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
            <h2 className="text-white font-bold text-sm mb-4">Diagnostics & Alerts</h2>
            <div className="space-y-3">
              {[
                { type: "warning", msg: "Merchant #42 cancel-rate elevated" },
                { type: "info", msg: "Payment gateway latency: 45ms" },
                { type: "success", msg: "Platform backup completed successfully" },
                { type: "success", msg: "34 new driver applications pending review" },
              ].map((alert, i) => (
                <div key={i} className={`flex gap-3 p-3 rounded-xl ${
                  alert.type === "warning" ? "bg-yellow-500/5 border border-yellow-500/10" :
                  alert.type === "info" ? "bg-blue-500/5 border border-blue-500/10" :
                  "bg-green-500/5 border border-green-500/10"
                }`}>
                  {alert.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${alert.type === "info" ? "text-blue-400" : "text-green-400"}`} />
                  )}
                  <p className="text-gray-300 text-[11px] leading-relaxed">{alert.msg}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Activity Logs */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Top Restaurants */}
          <Card variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
            <h2 className="text-white font-bold text-sm mb-4">Top Merchant Performance</h2>
            <div className="space-y-3.5">
              {mockRestaurants.slice(0, 4).map((r, i) => (
                <div key={r.id} className="flex items-center gap-3 p-2.5 bg-white/[0.01] rounded-xl border border-white/[0.02]">
                  <span className="text-gray-500 text-xs font-bold w-5">{i + 1}</span>
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={r.image} alt={r.name} fill className="object-cover" sizes="36px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold line-clamp-1">{r.name}</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">⭐ {r.rating} • {r.reviewCount} reviews</p>
                  </div>
                  <span className="text-purple-400 text-xs font-black">₹1,24,000</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Orders */}
          <Card variant="glass" padding="md" className="border border-white/[0.04] bg-[#12101C]/40">
            <h2 className="text-white font-bold text-sm mb-4">Live Platform Orders</h2>
            <div className="space-y-3">
              {[...mockOrders, ...mockOrders].slice(0, 4).map((order, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-white/[0.01] rounded-xl border border-white/[0.02]">
                  <div>
                    <p className="text-white text-xs font-bold">Order #{order.id}-{i}</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">{order.restaurant.name}</p>
                  </div>
                  <div className="flex-1" />
                  <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold capitalize ${getOrderStatusColor(order.status)}`}>
                    {getOrderStatusLabel(order.status)}
                  </span>
                  <span className="text-white text-xs font-black">{formatCurrency(order.total)}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
