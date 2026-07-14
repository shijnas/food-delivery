"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid
} from "recharts";
import {
  TrendingUp, ShoppingBag, Users, Star, DollarSign, Clock,
  ArrowUpRight, Plus, Trash2, Edit2, Check, X,
  Bike, AlertCircle, Gift, Bell, MessageSquare, Sun,
  Search, ChefHat, Tag, BarChart3, FileText, Download,
  Eye, Phone, Filter, Calendar, RefreshCw, Copy,
  ToggleLeft, ToggleRight, Shield, CreditCard, QrCode,
  UserPlus, Flame, Leaf, ChevronRight, Heart,
  CheckCircle, Timer, Home, Percent, Hash, LogOut,
  Upload, Package
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────

const initialMenuItems = [
  { id: "f1", name: "Chicken Biriyani", price: 220, description: "Fragrant basmati rice with succulent chicken.", isVeg: false, isAvailable: true, prepTime: 25, discount: 10, category: "Biriyani", inventory: 15, sales: 184, rating: 4.8 },
  { id: "f2", name: "Classic Beef Burger", price: 180, description: "Flame-grilled beef patty with signature sauce.", isVeg: false, isAvailable: true, prepTime: 15, discount: 0, category: "Burgers", inventory: 8, sales: 127, rating: 4.6 },
  { id: "f3", name: "Chicken Shawarma", price: 120, description: "Tender chicken wrapped in kubboos with garlic paste.", isVeg: false, isAvailable: true, prepTime: 10, discount: 15, category: "Shawarma", inventory: 2, sales: 98, rating: 4.5 },
  { id: "f4", name: "Fresh Mango Juice", price: 80, description: "Pure Alphonso mango pulp blended with ice.", isVeg: true, isAvailable: true, prepTime: 5, discount: 0, category: "Juice", inventory: 20, sales: 76, rating: 4.7 },
  { id: "f5", name: "Chocolate Lava Cake", price: 150, description: "Rich chocolate cake with molten warm center.", isVeg: true, isAvailable: true, prepTime: 12, discount: 5, category: "Desserts", inventory: 12, sales: 54, rating: 4.9 },
];

const initialCategoryData = [
  { name: "Biriyani", count: 4, revenue: 18400, color: "from-orange-500 to-amber-400" },
  { name: "Burgers", count: 3, revenue: 11200, color: "from-red-500 to-rose-400" },
  { name: "Shawarma", count: 3, revenue: 9800, color: "from-yellow-500 to-orange-400" },
  { name: "Juice", count: 5, revenue: 5100, color: "from-green-500 to-emerald-400" },
  { name: "Desserts", count: 4, revenue: 7200, color: "from-pink-500 to-purple-400" },
];

const initialOrders = [
  { id: "1056", customer: "Amal Jose", items: "2× Chicken Biriyani, 1× Coke", payment: "UPI", total: 590, status: "pending", driver: null, time: "2 min ago" },
  { id: "1055", customer: "Fathima N.", items: "1× Classic Beef Burger, 1× Mango Juice", payment: "COD", total: 260, status: "preparing", driver: "Arun Kumar", time: "8 min ago" },
  { id: "1054", customer: "Rahul R.", items: "3× Chicken Shawarma", payment: "Wallet", total: 360, status: "ready", driver: "Deepak S.", time: "15 min ago" },
  { id: "1053", customer: "Sreya Pillai", items: "2× Chocolate Lava Cake", payment: "Card", total: 300, status: "delivered", driver: "Nithin V.", time: "32 min ago" },
];

const initialCustomers = [
  { id: "c1", name: "Amal Jose", email: "amal@gmail.com", orders: 12, spent: 4890, lastOrder: "Today", favoriteItem: "Chicken Biriyani", loyalty: "Gold" },
  { id: "c2", name: "Fathima N.", email: "fathima@gmail.com", orders: 8, spent: 2540, lastOrder: "Yesterday", favoriteItem: "Beef Burger", loyalty: "Silver" },
  { id: "c3", name: "Rahul R.", email: "rahul@gmail.com", orders: 5, spent: 1890, lastOrder: "3 days ago", favoriteItem: "Shawarma", loyalty: "New" },
  { id: "c4", name: "Sreya Pillai", email: "sreya@gmail.com", orders: 15, spent: 6300, lastOrder: "Today", favoriteItem: "Chocolate Lava Cake", loyalty: "Gold" },
];

const initialReviews = [
  { id: "r1", user: "Anjali M.", rating: 5, food: "Chicken Biriyani", comment: "Absolutely delicious! Packaging was neat and delivery was hot.", date: "2 hrs ago", reply: null as string | null, likes: 4 },
  { id: "r2", user: "Deepak P.", rating: 4, food: "Beef Burger", comment: "Burger was nice, but the fries were a bit soggy. Will order again!", date: "1 day ago", reply: "Thank you Deepak! We'll work on keeping the fries crispy." as string | null, likes: 2 },
  { id: "r3", user: "Meera Nair", rating: 2, food: "Chicken Shawarma", comment: "Shawarma was cold when it arrived. Quite disappointed.", date: "3 days ago", reply: null as string | null, likes: 0 },
];

const initialOffers = [
  { code: "SAVE20", type: "percent", discount: "20", minSpend: 400, expiry: "2026-08-31", active: true, uses: 38, revenue: 12400 },
  { code: "WELCOME50", type: "fixed", discount: "50", minSpend: 250, expiry: "2026-12-31", active: true, uses: 14, revenue: 4200 },
];

const initialPayouts = [
  { id: "PAY-009", date: "July 12, 2026", amount: 15420, status: "Paid" },
  { id: "PAY-008", date: "July 05, 2026", amount: 12130, status: "Paid" },
  { id: "PAY-007", date: "June 28, 2026", amount: 18450, status: "Paid" },
  { id: "PAY-006", date: "June 21, 2026", amount: 9200, status: "Paid" },
];

const driversData = [
  { id: "d1", name: "Arun Kumar", status: "online", orders: 8, rating: 4.9, current: "Delivering #1054" },
  { id: "d2", name: "Deepak S.", status: "online", orders: 12, rating: 4.7, current: "Available" },
  { id: "d3", name: "Nithin V.", status: "offline", orders: 6, rating: 4.8, current: "Offline" },
  { id: "d4", name: "Sajan M.", status: "online", orders: 4, rating: 4.6, current: "Available" },
];

const salesChartData = [
  { label: "Mon", value: 12400, orders: 32 },
  { label: "Tue", value: 14200, orders: 38 },
  { label: "Wed", value: 15420, orders: 43 },
  { label: "Thu", value: 13000, orders: 34 },
  { label: "Fri", value: 18200, orders: 48 },
  { label: "Sat", value: 24500, orders: 65 },
  { label: "Sun", value: 22100, orders: 59 },
];

const peakHoursData = [
  { hour: "12–2 PM", orders: 48 },
  { hour: "2–6 PM", orders: 18 },
  { hour: "6–9 PM", orders: 74 },
  { hour: "9–11 PM", orders: 35 },
];

const categoryPieData = [
  { name: "Biriyani", value: 45 },
  { name: "Burgers", value: 25 },
  { name: "Shawarma", value: 18 },
  { name: "Desserts", value: 12 },
];

const PIE_COLORS = ["#8B5CF6", "#EC4899", "#F59E0B", "#06B6D4"];

// ─────────────────────────────────────────────────────────────────
// DESIGN SYSTEM PRIMITIVES
// ─────────────────────────────────────────────────────────────────

function Kard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.10] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${className}`}>
      {children}
    </div>
  );
}

function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-12">
      <div>
        <h1 className="text-[32px] font-bold text-white tracking-tight leading-none">{title}</h1>
        {subtitle && <p className="text-[14px] text-gray-400 mt-2">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

function SectionHdr({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-[18px] font-semibold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-[12px] text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Chip({ children, color = "gray", size = "sm" }: { children: React.ReactNode; color?: "gray"|"green"|"yellow"|"red"|"purple"|"blue"|"orange"; size?: "xs"|"sm" }) {
  const c = { gray:"bg-white/[0.06] text-gray-300 border-white/[0.08]", green:"bg-green-500/10 text-green-400 border-green-500/20", yellow:"bg-yellow-500/10 text-yellow-400 border-yellow-500/20", red:"bg-red-500/10 text-red-400 border-red-500/20", purple:"bg-purple-500/10 text-purple-400 border-purple-500/20", blue:"bg-blue-500/10 text-blue-400 border-blue-500/20", orange:"bg-orange-500/10 text-orange-400 border-orange-500/20" };
  const s = { xs:"px-2 py-0.5 text-[10px]", sm:"px-2.5 py-1 text-[11px]" };
  return <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${c[color]} ${s[size]}`}>{children}</span>;
}

function PBtn({ children, onClick, icon, sm }: { children: React.ReactNode; onClick?: () => void; icon?: React.ReactNode; sm?: boolean }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 border-none cursor-pointer whitespace-nowrap flex-shrink-0 ${sm ? "text-[12px] px-5 py-2.5" : "text-[13.5px] px-6 py-3"}`}>
      {icon}{children}
    </button>
  );
}

function SBtn({ children, onClick, icon, sm }: { children: React.ReactNode; onClick?: () => void; icon?: React.ReactNode; sm?: boolean }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2.5 rounded-full bg-white/[0.05] border border-white/[0.10] text-gray-300 font-medium hover:bg-white/[0.10] hover:text-white transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${sm ? "text-[12px] px-4.5 py-2" : "text-[13.5px] px-5.5 py-3"}`}>
      {icon}{children}
    </button>
  );
}

function Avi({ name, size = "md" }: { name: string; size?: "sm"|"md"|"lg" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();
  const bgs = ["from-purple-500 to-pink-500","from-blue-500 to-cyan-500","from-green-500 to-emerald-500","from-orange-500 to-red-500","from-yellow-500 to-orange-500"];
  const bg = bgs[name.charCodeAt(0) % bgs.length];
  const sz = { sm:"w-8 h-8 text-[10px]", md:"w-10 h-10 text-[12px]", lg:"w-12 h-12 text-[14px]" };
  return <div className={`${sz[size]} rounded-full bg-gradient-to-br ${bg} flex items-center justify-center font-bold text-white flex-shrink-0`}>{initials}</div>;
}

function Empty({ icon, title, desc, action }: { icon: React.ReactNode; title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-3xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-gray-500">{icon}</div>
      <h3 className="text-[16px] font-semibold text-white mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 max-w-xs mb-6">{desc}</p>
      {action}
    </div>
  );
}

function SearchInput({ ph, value, onChange }: { ph: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" style={{ left: "16px" }} />
      <input type="text" placeholder={ph} value={value} onChange={e => onChange?.(e.target.value)} className="h-11 pr-4 w-full bg-white/[0.05] border border-white/[0.09] rounded-full text-[13.5px] text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)] transition-all" style={{ paddingLeft: "46px" }} />
    </div>
  );
}

function FormInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full">
      <label className="text-[12.5px] text-gray-400 mb-2 block font-semibold">{label}</label>
      <input {...props} className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.09] rounded-2xl text-[13.5px] text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] transition-all" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────

export default function RestaurantDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0B14] flex items-center justify-center text-gray-500 text-sm">Loading…</div>}>
      <DashboardContent />
    </Suspense>
  );
}

// ─────────────────────────────────────────────────────────────────
// DASHBOARD CONTENT
// ─────────────────────────────────────────────────────────────────

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "dashboard";
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);

  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const tick = () => setTimeStr(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  const [orders, setOrders] = useState(initialOrders);
  const [ordersSearch, setOrdersSearch] = useState("");
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [catData, setCatData] = useState(initialCategoryData);
  const [offers, setOffers] = useState(initialOffers);
  const [reviews, setReviews] = useState(initialReviews);
  const [newOrderAlert, setNewOrderAlert] = useState<any>(null);
  const [showAddFood, setShowAddFood] = useState(false);
  const [showAddCat, setShowAddCat] = useState(false);
  const [replyInputs, setReplyInputs] = useState<Record<string,string>>({});
  const [menuSearch, setMenuSearch] = useState("");
  const [menuCat, setMenuCat] = useState("All");
  const [custSearch, setCustSearch] = useState("");
  const [reviewFilter, setReviewFilter] = useState(0);
  const [settingsTab, setSettingsTab] = useState("restaurant");
  const [foodForm, setFoodForm] = useState({ name:"", price:"", description:"", category:"Biriyani", prepTime:"20", isVeg:false, inventory:"20" });
  const [newOffer, setNewOffer] = useState({ code:"", type:"percent", discount:"", minSpend:"", expiry:"" });
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setNewOrderAlert({ id:"1057", customer:"Sherin V.", items:"1× Biriyani, 2× Shawarma", total:460 }), 10000);
    return () => clearTimeout(t);
  }, []);

  const moveOrder = (id: string, next: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      let driver = o.driver;
      if (next === "preparing" && !driver) driver = "Arun Kumar";
      if (next === "ready" && !driver) driver = "Deepak S.";
      return { ...o, status: next, driver };
    }));
  };

  const addFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodForm.name || !foodForm.price) return;
    setMenuItems(prev => [{ id:"f"+Date.now(), name:foodForm.name, price:parseFloat(foodForm.price), description:foodForm.description, isVeg:foodForm.isVeg, isAvailable:true, prepTime:parseInt(foodForm.prepTime)||15, discount:0, category:foodForm.category, inventory:parseInt(foodForm.inventory)||20, sales:0, rating:0 }, ...prev]);
    setShowAddFood(false);
    setFoodForm({ name:"", price:"", description:"", category:"Biriyani", prepTime:"20", isVeg:false, inventory:"20" });
  };

  const addOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.code || !newOffer.discount) return;
    setOffers(prev => [{ ...newOffer, minSpend:parseInt(newOffer.minSpend)||0, active:true, uses:0, revenue:0 }, ...prev]);
    setNewOffer({ code:"", type:"percent", discount:"", minSpend:"", expiry:"" });
  };

  const submitReply = (id: string) => {
    const text = replyInputs[id];
    if (!text?.trim()) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, reply: text } : r));
    setReplyInputs(prev => ({ ...prev, [id]:"" }));
  };

  const kpis = [
    { label:"Today's Sales", value:"₹15,420", sub:"+12% vs yesterday", up:true, icon:DollarSign, color:"text-green-400" },
    { label:"Orders Today", value:"43", sub:"8 active now", up:true, icon:ShoppingBag, color:"text-blue-400" },
    { label:"Pending", value:"7", sub:"Needs attention", up:false, icon:Timer, color:"text-yellow-400" },
    { label:"Completed", value:"36", sub:"83% completion rate", up:true, icon:CheckCircle, color:"text-green-400" },
    { label:"Customers", value:"221", sub:"+18 new today", up:true, icon:Users, color:"text-purple-400" },
    { label:"Avg Rating", value:"4.8★", sub:"From 94 reviews", up:true, icon:Star, color:"text-yellow-400" },
  ];

  const tabLabel: Record<string,string> = { dashboard:"Overview", orders:"Orders", menu:"Menu", categories:"Categories", offers:"Offers", customers:"Customers", analytics:"Analytics", drivers:"Drivers", reviews:"Reviews", payouts:"Payouts", settings:"Settings" };

  const filteredOrders = orders.filter(o => o.customer.toLowerCase().includes(ordersSearch.toLowerCase()) || o.id.toLowerCase().includes(ordersSearch.toLowerCase()) || o.items.toLowerCase().includes(ordersSearch.toLowerCase()));
  const filteredMenu = menuItems.filter(m => (menuCat==="All"||m.category===menuCat) && m.name.toLowerCase().includes(menuSearch.toLowerCase()));
  const filteredCustomers = initialCustomers.filter(c => c.name.toLowerCase().includes(custSearch.toLowerCase()));
  const filteredReviews = reviewFilter===0 ? reviews : reviews.filter(r => r.rating===reviewFilter);

  return (
    <div className="main-content-layout">
      <div className="liquid-glass-mesh-bg" />

      {/* TOP NAVBAR */}
      <header className="sticky-header-nav">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-gray-600 text-[12px] hidden sm:block font-medium">Dashboard</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-700 hidden sm:block" />
          <span className="text-[14px] font-semibold text-white">{tabLabel[activeTab]||activeTab}</span>
        </div>

        {/* Search — grows to fill space */}
        <div className="flex-1 max-w-md mx-6 relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search orders, dishes, customers…"
            className="header-search"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-white/[0.04] border border-white/[0.07] rounded-full text-[12px] text-gray-400">
            <Sun className="h-3.5 w-3.5 text-yellow-400" />
            <span>28°C · Kochi</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white/[0.04] border border-white/[0.07] rounded-full text-[12px] font-mono text-gray-300">
            <Clock className="h-3.5 w-3.5 text-purple-400" />
            <span>{timeStr}</span>
          </div>

          {/* Bell Icon Dropdown */}
          <div className="relative">
            <button onClick={() => { setShowNotificationsDropdown(!showNotificationsDropdown); setShowMessagesDropdown(false); }} className={`relative w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer border-solid ${showNotificationsDropdown ? "bg-purple-500/20 border-purple-500/40" : "bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.10]"}`}>
              <Bell className="h-4.5 w-4.5 text-gray-300" style={{ width: 18, height: 18 }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 border border-[#08050F]" />
            </button>
            {showNotificationsDropdown && (
              <div className="absolute right-0 mt-3.5 w-80 bg-[#181424]/95 border border-white/[0.08] rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-[14px] font-bold text-white">Alerts & Notifications</span>
                  <span className="text-[11px] text-pink-400 font-medium">3 New</span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-[12px] text-white font-medium">Low Stock Alert: Chicken Shawarma</p>
                      <span className="text-[10px] text-gray-500">Only 2 items left in inventory</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-[12px] text-white font-medium">Payout Processed successfully</p>
                      <span className="text-[10px] text-gray-500">₹8,240 transferred to bank</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-[12px] text-white font-medium">New 5★ Rating received</p>
                      <span className="text-[10px] text-gray-500">From Amal Jose on Beef Burger</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Icon Dropdown */}
          <div className="relative">
            <button onClick={() => { setShowMessagesDropdown(!showMessagesDropdown); setShowNotificationsDropdown(false); }} className={`relative w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer border-solid ${showMessagesDropdown ? "bg-purple-500/20 border-purple-500/40" : "bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.10]"}`}>
              <MessageSquare style={{ width: 18, height: 18 }} className="text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-400 border border-[#08050F]" />
            </button>
            {showMessagesDropdown && (
              <div className="absolute right-0 mt-3.5 w-80 bg-[#181424]/95 border border-white/[0.08] rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-[14px] font-bold text-white">Message Notifications</span>
                  <span className="text-[11px] text-blue-400 font-medium">2 New</span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-start gap-2.5">
                    <Avi name="Amal Jose" size="sm" />
                    <div className="flex-1">
                      <p className="text-[12.5px] text-white font-semibold">Amal Jose</p>
                      <p className="text-[12px] text-gray-300 mt-0.5 leading-snug">Wants extra mayonnaise for beef burger</p>
                      <span className="text-[10px] text-gray-500 block mt-1">2 min ago</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Avi name="Arun Kumar" size="sm" />
                    <div className="flex-1">
                      <p className="text-[12.5px] text-white font-semibold">Arun Kumar (Driver)</p>
                      <p className="text-[12px] text-gray-300 mt-0.5 leading-snug">I have arrived at the restaurant pick location</p>
                      <span className="text-[10px] text-gray-500 block mt-1">10 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div
            onClick={() => {
              setSettingsTab("restaurant");
              router.push("/dashboard?tab=settings");
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[13px] font-bold text-white cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            B
          </div>
        </div>
      </header>

      {/* NEW ORDER POPUP */}
      {newOrderAlert && (
        <div className="fixed top-20 right-6 z-50 w-80 bg-[#1a1527] border border-purple-500/40 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><Bell className="h-4 w-4 text-purple-400" /></div>
              <span className="text-[13px] font-semibold text-white">New Order!</span>
            </div>
            <button onClick={() => setNewOrderAlert(null)} className="text-gray-500 hover:text-white cursor-pointer border-none bg-transparent"><X className="h-4 w-4" /></button>
          </div>
          <p className="text-[15px] font-bold text-white">Order #{newOrderAlert.id}</p>
          <p className="text-[12px] text-gray-400 mt-1 mb-3">{newOrderAlert.items}</p>
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 mb-4">
            <span className="text-[12px] text-gray-500">Total</span>
            <span className="text-[15px] font-bold text-green-400">₹{newOrderAlert.total}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setNewOrderAlert(null)} className="flex-1 h-9 rounded-full border border-white/[0.08] bg-white/[0.04] text-[12px] text-gray-300 cursor-pointer hover:bg-white/[0.08] transition-all">Reject</button>
            <button onClick={() => { setOrders(prev => [{ id:"1057", customer:newOrderAlert.customer, items:newOrderAlert.items, payment:"UPI", total:newOrderAlert.total, status:"preparing", driver:"Assigned", time:"Just now" }, ...prev]); setNewOrderAlert(null); }} className="flex-1 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[12px] font-semibold text-white cursor-pointer border-none hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all">Accept</button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-[1600px] mx-auto px-8 lg:px-12 py-12">

        {/* ══════════ DASHBOARD ══════════ */}
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            {/* Welcome Hero */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/10 via-transparent to-transparent border border-white/[0.06] rounded-3xl px-8 py-6">
              <div>
                <p className="text-[13px] text-gray-400 mb-1">Welcome back 👋</p>
                <h1 className="text-[28px] font-bold text-white tracking-tight leading-none">Burger Bliss</h1>
                <div className="flex items-center gap-2 mt-2.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                  <span className="text-[12px] text-green-400 font-medium">Online · Accepting Orders</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <PBtn onClick={() => setShowAddFood(true)} icon={<Plus className="h-4.5 w-4.5" />}>Add Food</PBtn>
                <Link href="/dashboard?tab=analytics" className="inline-flex flex-shrink-0">
                  <SBtn icon={<BarChart3 className="h-4.5 w-4.5" />}>Analytics</SBtn>
                </Link>
              </div>
            </div>

            {/* 6 KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
              {kpis.map((k, i) => {
                const Icon = k.icon;
                return (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest leading-tight">{k.label}</span>
                      <Icon className={`h-3.5 w-3.5 ${k.color} flex-shrink-0`} />
                    </div>
                    <div className="text-[22px] font-bold text-white tracking-tight">{k.value}</div>
                    <div className={`text-[11px] mt-1.5 ${k.up?"text-green-400":"text-gray-500"}`}>{k.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Charts: 70/30 */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
              <Kard className="lg:col-span-7">
                <SectionHdr title="Weekly Revenue" subtitle="₹1,19,820 this week · +22% vs last week" action={<SBtn sm onClick={() => alert("Weekly revenue report downloaded successfully!")} icon={<Download className="h-3.5 w-3.5" />}>Export</SBtn>} />
                <div className="h-[210px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesChartData} margin={{ top:5, right:5, left:-25, bottom:0 }}>
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="label" tick={{ fontSize:11, fill:"#6B7280" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize:11, fill:"#6B7280" }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ background:"#1a1527", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, fontSize:12, color:"#fff" }} formatter={(v:any)=>[`₹${v.toLocaleString()}`,"Revenue"]} />
                      <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#g1)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Kard>

              <Kard className="lg:col-span-3">
                <SectionHdr title="Recent Orders" action={<a href="/dashboard?tab=orders" className="text-[12px] text-purple-400 hover:text-purple-300">View all</a>} />
                <div className="flex flex-col gap-3 mt-4">
                  {orders.slice(0,4).map(o => (
                    <div key={o.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all">
                      <Avi name={o.customer} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-white truncate">{o.customer}</div>
                        <div className="text-[11px] text-gray-500 truncate">{o.items}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[13px] font-semibold text-white">₹{o.total}</div>
                        <Chip color={o.status==="pending"?"yellow":o.status==="preparing"?"blue":o.status==="ready"?"purple":"green"} size="xs">{o.status}</Chip>
                      </div>
                    </div>
                  ))}
                </div>
              </Kard>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Kard>
                <SectionHdr title="Popular Dishes" subtitle="Top sellers this week" />
                <div className="flex flex-col gap-4 mt-4">
                  {menuItems.slice(0,4).map((item, i) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <span className="text-[11px] text-gray-600 font-mono w-5 flex-shrink-0">0{i+1}</span>
                      <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background:`linear-gradient(135deg, hsl(${i*60+240},60%,25%), hsl(${i*60+280},60%,35%))` }}><ChefHat className="h-4 w-4 text-white/40" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-white">{item.name}</div>
                        <div className="text-[11px] text-gray-500">{item.category} · {item.sales} sold</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[13px] font-semibold text-white">₹{item.price}</div>
                        <div className="text-[11px] text-yellow-400">★ {item.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Kard>

              <Kard>
                <SectionHdr title="Inventory Alerts" subtitle="Items running low" />
                {menuItems.filter(m=>m.inventory<=5).length===0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                    <p className="text-[13px] text-gray-400">All items stocked well</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {menuItems.filter(m=>m.inventory<=5).map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-red-500/[0.05] border border-red-500/20">
                        <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[13px] font-medium text-white">{item.name}</div>
                          <div className="text-[11px] text-red-400">Only {item.inventory} left</div>
                        </div>
                        <Chip color="red" size="xs">Low Stock</Chip>
                      </div>
                    ))}
                  </div>
                )}
              </Kard>
            </div>
          </div>
        )}

        {/* ══════════ ORDERS ══════════ */}
        {activeTab === "orders" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Orders" subtitle="Real-time order management" actions={
              <><SBtn onClick={() => alert("Orders records exported successfully!")} icon={<Download className="h-4 w-4" />}>Export</SBtn><SBtn onClick={() => { setOrders(initialOrders); alert("Orders data refreshed!"); }} icon={<RefreshCw className="h-4 w-4" />}>Refresh</SBtn></>
            } />
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px] max-w-xs"><SearchInput ph="Search orders…" value={ordersSearch} onChange={setOrdersSearch} /></div>
              <SBtn sm onClick={() => alert("Filter overlays display.")} icon={<Filter className="h-3.5 w-3.5" />}>Filter</SBtn>
              <SBtn sm onClick={() => alert("Display filtered by today.")} icon={<Calendar className="h-3.5 w-3.5" />}>Today</SBtn>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {(["pending","preparing","ready","delivered"] as const).map(status => {
                const cfg = {
                  pending:   { label:"Pending",   accent:"bg-yellow-400/10 border-yellow-400/20", tc:"text-yellow-400", btn:"Accept Order",   next:"preparing" },
                  preparing: { label:"Preparing", accent:"bg-blue-400/10 border-blue-400/20",    tc:"text-blue-400",   btn:"Mark Ready",     next:"ready"     },
                  ready:     { label:"Ready",     accent:"bg-purple-400/10 border-purple-400/20",tc:"text-purple-400", btn:"Out for Delivery",next:"delivered" },
                  delivered: { label:"Delivered", accent:"bg-green-400/10 border-green-400/20",  tc:"text-green-400",  btn:"View",           next:""          },
                }[status];
                const col = filteredOrders.filter(o=>o.status===status);
                const payC: Record<string,"green"|"orange"|"blue"|"purple"> = { UPI:"green", COD:"orange", Card:"blue", Wallet:"purple" };
                return (
                  <div key={status} className="flex flex-col gap-4">
                    <div className={`flex items-center justify-between px-4 py-2.5 rounded-2xl border ${cfg.accent}`}>
                      <span className={`text-[13px] font-semibold ${cfg.tc}`}>{cfg.label}</span>
                      <span className={`text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center ${cfg.accent} ${cfg.tc}`}>{col.length}</span>
                    </div>
                    <div className="flex flex-col gap-4 min-h-[120px]">
                      {col.length===0 && <div className="py-10 text-center"><p className="text-[12px] text-gray-600">No orders</p></div>}
                      {col.map(order => (
                        <div key={order.id} className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 hover:bg-white/[0.05] transition-all duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <Avi name={order.customer} size="sm" />
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-semibold text-white">{order.customer}</div>
                              <div className="text-[11px] text-gray-500">#{order.id} · {order.time}</div>
                            </div>
                          </div>
                          <p className="text-[12px] text-gray-400 mb-4 leading-relaxed">{order.items}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Chip color={payC[order.payment]||"gray"} size="xs"><CreditCard className="h-3 w-3" />{order.payment}</Chip>
                            {order.driver && <Chip color="gray" size="xs"><Bike className="h-3 w-3" />{order.driver}</Chip>}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-white">₹{order.total}</span>
                            {status!=="delivered"
                              ? <PBtn sm onClick={() => moveOrder(order.id, cfg.next)}>{cfg.btn}</PBtn>
                              : <SBtn sm icon={<Eye className="h-3.5 w-3.5" />}>View</SBtn>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════ MENU ══════════ */}
        {activeTab === "menu" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Menu" subtitle={`${menuItems.length} dishes · ${menuItems.filter(m=>m.isAvailable).length} available`} actions={
              <PBtn onClick={() => setShowAddFood(true)} icon={<Plus className="h-4 w-4" />}>Add Food</PBtn>
            } />
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-[200px] max-w-xs"><SearchInput ph="Search menu…" value={menuSearch} onChange={setMenuSearch} /></div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                {["All", ...initialCategoryData.map(c=>c.name)].map(cat => (
                  <button key={cat} onClick={() => setMenuCat(cat)} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer border ${menuCat===cat?"bg-purple-500/20 text-purple-300 border-purple-500/40":"bg-white/[0.04] text-gray-400 border-white/[0.06] hover:bg-white/[0.08] hover:text-white"}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMenu.map((item, i) => (
                <div key={item.id} className="group bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <div className="relative h-36" style={{ background:`linear-gradient(135deg, hsl(${i*60+240},55%,18%), hsl(${i*60+280},55%,28%))` }}>
                    <div className="absolute inset-0 flex items-center justify-center"><ChefHat className="h-10 w-10 text-white/15" /></div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 cursor-pointer border-none"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 cursor-pointer border-none"><Copy className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setMenuItems(prev=>prev.filter(m=>m.id!==item.id))} className="w-8 h-8 rounded-full bg-red-500/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/80 cursor-pointer border-none"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                    {item.inventory<=5 && <div className="absolute top-2 left-2"><Chip color="red" size="xs">Low Stock</Chip></div>}
                    <button onClick={() => setMenuItems(prev=>prev.map(m=>m.id===item.id?{...m,isAvailable:!m.isAvailable}:m))} className="absolute top-2 right-2 cursor-pointer border-none bg-transparent">
                      {item.isAvailable ? <ToggleRight className="h-7 w-7 text-green-400 drop-shadow" /> : <ToggleLeft className="h-7 w-7 text-gray-500" />}
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[14px] font-semibold text-white leading-tight">{item.name}</h3>
                      {item.isVeg ? <Leaf className="h-4 w-4 text-green-400 flex-shrink-0" /> : <Flame className="h-4 w-4 text-red-400 flex-shrink-0" />}
                    </div>
                    <Chip color="gray" size="xs">{item.category}</Chip>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[16px] font-bold text-white">₹{item.price}</span>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><Clock className="h-3 w-3" />{item.prepTime}m</div>
                    </div>
                    <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-white/[0.04]">
                      <span className="text-[11px] text-gray-500">{item.sales} sold</span>
                      <span className="text-[11px] text-yellow-400">★ {item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredMenu.length===0 && <Empty icon={<ChefHat className="h-6 w-6" />} title="No dishes found" desc="Try a different filter or add a new dish." action={<PBtn onClick={() => setShowAddFood(true)} icon={<Plus className="h-4 w-4" />}>Add Food</PBtn>} />}
          </div>
        )}

        {/* ══════════ CATEGORIES ══════════ */}
        {activeTab === "categories" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Categories" subtitle="Organise your menu by food type" actions={
              <PBtn onClick={() => setShowAddCat(true)} icon={<Plus className="h-4 w-4" />}>Add Category</PBtn>
            } />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {catData.map(cat => (
                <Kard key={cat.name}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                      <Tag className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.10] cursor-pointer border-solid"><Edit2 className="h-3.5 w-3.5 text-gray-400" /></button>
                      <button onClick={() => setCatData(prev=>prev.filter(c=>c.name!==cat.name))} className="w-8 h-8 rounded-full bg-red-500/[0.08] border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 cursor-pointer border-solid"><Trash2 className="h-3.5 w-3.5 text-red-400" /></button>
                    </div>
                  </div>
                  <h3 className="text-[18px] font-semibold text-white mb-1">{cat.name}</h3>
                  <div className="flex items-center gap-3 text-[13px] text-gray-500">
                    <span>{cat.count} dishes</span>
                    <span>·</span>
                    <span className="text-green-400 font-medium">₹{cat.revenue.toLocaleString()}</span>
                  </div>
                </Kard>
              ))}
              <button onClick={() => setShowAddCat(true)} className="bg-white/[0.02] border border-dashed border-white/[0.10] rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.04] hover:border-purple-500/40 transition-all cursor-pointer min-h-[140px]">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center"><Plus className="h-5 w-5 text-gray-500" /></div>
                <span className="text-[13px] text-gray-500">New Category</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════ OFFERS ══════════ */}
        {activeTab === "offers" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Offers & Coupons" subtitle="Create discounts and track performance" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <Kard className="lg:col-span-2 !p-7">
                <SectionHdr title="Create Coupon" subtitle="Design a new promotional offer" />
                <form onSubmit={addOffer} className="space-y-4">
                  <FormInput label="Coupon Code *" value={newOffer.code} onChange={e => setNewOffer(p=>({...p,code:e.target.value.toUpperCase()}))} placeholder="e.g. SAVE20" className="font-mono" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[12px] text-gray-500 mb-1.5 block font-medium">Type</label>
                      <select value={newOffer.type} onChange={e=>setNewOffer(p=>({...p,type:e.target.value}))} className="w-full h-10 px-4 rounded-2xl text-[13px] text-white outline-none transition-all appearance-none cursor-pointer border border-white/[0.08]" style={{ background:"rgba(255,255,255,0.04)" }}>
                        <option value="percent" style={{ background:"#1a1527" }}>Percent %</option>
                        <option value="fixed" style={{ background:"#1a1527" }}>Fixed ₹</option>
                      </select>
                    </div>
                    <FormInput label="Discount" value={newOffer.discount} onChange={e=>setNewOffer(p=>({...p,discount:e.target.value}))} placeholder={newOffer.type==="percent"?"20":"50"} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormInput label="Min Spend (₹)" value={newOffer.minSpend} onChange={e=>setNewOffer(p=>({...p,minSpend:e.target.value}))} placeholder="200" />
                    <div>
                      <label className="text-[12px] text-gray-500 mb-1.5 block font-medium">Expiry</label>
                      <input type="date" value={newOffer.expiry} onChange={e=>setNewOffer(p=>({...p,expiry:e.target.value}))} className="w-full h-10 px-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-[13px] text-white outline-none focus:border-purple-500/50 transition-all" style={{ colorScheme:"dark" }} />
                    </div>
                  </div>
                  <PBtn icon={<Plus className="h-4 w-4" />}>Create Coupon</PBtn>
                </form>
              </Kard>

              <div className="lg:col-span-3 flex flex-col gap-4">
                <SectionHdr title="Coupon Library" subtitle={`${offers.length} coupons · ${offers.filter(o=>o.active).length} active`} />
                {offers.length===0 && <Empty icon={<Gift className="h-6 w-6" />} title="No coupons yet" desc="Create your first discount offer." />}
                {offers.map((offer, i) => (
                  <Kard key={i} className="!p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                        {offer.type==="percent"?<Percent className="h-5 w-5 text-purple-400" />:<Hash className="h-5 w-5 text-pink-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[15px] font-bold text-white font-mono">{offer.code}</span>
                          <Chip color={offer.active?"green":"gray"} size="xs">{offer.active?"Active":"Expired"}</Chip>
                        </div>
                        <p className="text-[12px] text-gray-500">{offer.type==="percent"?`${offer.discount}% off`:`₹${offer.discount} off`} · Min ₹{offer.minSpend} · Expires {offer.expiry||"—"}</p>
                        <div className="flex items-center gap-4 mt-1.5 text-[11px] text-gray-600">
                          <span><span className="text-white font-semibold">{offer.uses}</span> uses</span>
                          <span><span className="text-green-400 font-semibold">₹{offer.revenue.toLocaleString()}</span> revenue</span>
                        </div>
                      </div>
                      <button onClick={() => setOffers(prev=>prev.filter((_,j)=>j!==i))} className="w-8 h-8 rounded-full bg-red-500/[0.08] border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 cursor-pointer border-solid flex-shrink-0"><Trash2 className="h-3.5 w-3.5 text-red-400" /></button>
                    </div>
                  </Kard>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ CUSTOMERS ══════════ */}
        {activeTab === "customers" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Customers" subtitle={`${initialCustomers.length} total customers`} actions={
              <SBtn onClick={() => alert("Customers statistics list downloaded!")} icon={<Download className="h-4 w-4" />}>Export</SBtn>
            } />
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px] max-w-xs"><SearchInput ph="Search customers…" value={custSearch} onChange={setCustSearch} /></div>
              <SBtn sm onClick={() => alert("Filter applied!")} icon={<Filter className="h-3.5 w-3.5" />}>Filter</SBtn>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCustomers.map(c => {
                const lMap: Record<string,{color:"yellow"|"gray"|"green",label:string}> = {
                  Gold:{ color:"yellow", label:"⭐ Gold Member" },
                  Silver:{ color:"gray", label:"Silver Member" },
                  New:{ color:"green", label:"New Customer" },
                };
                const lc = lMap[c.loyalty]||lMap.New;
                return (
                  <Kard key={c.id}>
                    <div className="flex items-start gap-4 mb-4">
                      <Avi name={c.name} size="lg" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[16px] font-semibold text-white">{c.name}</h3>
                        <p className="text-[12px] text-gray-500 truncate">{c.email}</p>
                        <div className="mt-1"><Chip color={lc.color} size="xs">{lc.label}</Chip></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/[0.03] rounded-2xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Orders</div>
                        <div className="text-[20px] font-bold text-white">{c.orders}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-2xl p-3">
                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Lifetime</div>
                        <div className="text-[18px] font-bold text-white">₹{c.spent.toLocaleString()}</div>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-500 mb-4">Fav: <span className="text-gray-300">{c.favoriteItem}</span> · Last: <span className="text-gray-300">{c.lastOrder}</span></p>
                    <SBtn sm icon={<Eye className="h-3.5 w-3.5" />}>View Profile</SBtn>
                  </Kard>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════ ANALYTICS ══════════ */}
        {activeTab === "analytics" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Analytics" subtitle="Business performance insights" actions={
              <><SBtn sm onClick={() => alert("Filtered dataset for this week")} icon={<Calendar className="h-4 w-4" />}>This Week</SBtn><PBtn onClick={() => alert("Analytics report exported successfully")} icon={<Download className="h-4 w-4" />}>Export</PBtn></>
            } />
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
              {[
                { label:"Total Revenue", value:"₹1,19,820", change:"+22%", icon:DollarSign, color:"text-green-400" },
                { label:"Total Orders", value:"319", change:"+15%", icon:ShoppingBag, color:"text-blue-400" },
                { label:"Avg Order Value", value:"₹375", change:"+8%", icon:TrendingUp, color:"text-purple-400" },
                { label:"Return Rate", value:"68%", change:"+5%", icon:Users, color:"text-pink-400" },
              ].map((k,i) => {
                const Icon = k.icon;
                return (
                  <Kard key={i}>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{k.label}</span>
                      <Icon className={`h-4 w-4 ${k.color}`} />
                    </div>
                    <div className="text-[28px] font-bold text-white">{k.value}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <ArrowUpRight className="h-3.5 w-3.5 text-green-400" />
                      <span className="text-[12px] text-green-400 font-medium">{k.change} vs last week</span>
                    </div>
                  </Kard>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <Kard className="lg:col-span-3">
                <SectionHdr title="Revenue Trend" subtitle="Daily revenue this week" />
                <div className="h-[220px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesChartData} margin={{ top:5, right:5, left:-25, bottom:0 }}>
                      <defs>
                        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="label" tick={{ fontSize:11, fill:"#6B7280" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize:11, fill:"#6B7280" }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v/1000}k`} />
                      <Tooltip contentStyle={{ background:"#1a1527", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, fontSize:12, color:"#fff" }} />
                      <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#g2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Kard>
              <Kard className="lg:col-span-2">
                <SectionHdr title="Category Split" />
                <div className="h-[190px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {categoryPieData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background:"#1a1527", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, fontSize:12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-3">
                  {categoryPieData.map((d,i)=>(
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background:PIE_COLORS[i] }} />
                      <span className="text-[12px] text-gray-400">{d.name}</span>
                    </div>
                  ))}
                </div>
              </Kard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Kard>
                <SectionHdr title="Daily Orders" />
                <div className="h-[190px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesChartData} margin={{ top:5, right:5, left:-25, bottom:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="label" tick={{ fontSize:11, fill:"#6B7280" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize:11, fill:"#6B7280" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background:"#1a1527", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, fontSize:12, color:"#fff" }} />
                      <Bar dataKey="orders" fill="#EC4899" radius={[5,5,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Kard>
              <Kard>
                <SectionHdr title="Peak Hours" subtitle="Busiest times of day" />
                <div className="space-y-5 mt-4">
                  {peakHoursData.map((p,i)=>(
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-400">{p.hour}</span>
                        <span className="text-white font-semibold">{p.orders} orders</span>
                      </div>
                      <div className="h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width:`${(p.orders/80)*100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Kard>
            </div>
          </div>
        )}

        {/* ══════════ DRIVERS ══════════ */}
        {activeTab === "drivers" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Drivers" subtitle={`${driversData.filter(d=>d.status==="online").length} online · ${driversData.length} total`} actions={
              <PBtn onClick={() => alert("Invite a driver form overlay.")} icon={<UserPlus className="h-4 w-4" />}>Add Driver</PBtn>
            } />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {driversData.map(driver => (
                <Kard key={driver.id}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avi name={driver.name} size="lg" />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0d0b14] ${driver.status==="online"?"bg-green-400":"bg-gray-500"}`} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-white">{driver.name}</h3>
                        <Chip color={driver.status==="online"?"green":"gray"} size="xs">{driver.status==="online"?"● Online":"○ Offline"}</Chip>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-gray-500">Rating</div>
                      <div className="text-[15px] font-bold text-yellow-400">★ {driver.rating}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-white/[0.03] rounded-2xl p-4 text-center">
                      <div className="text-[24px] font-bold text-white">{driver.orders}</div>
                      <div className="text-[11px] text-gray-500 mt-1">Orders Today</div>
                    </div>
                    <div className="bg-white/[0.03] rounded-2xl p-4 text-center">
                      <div className="text-[12px] text-gray-300 font-medium leading-snug">{driver.current}</div>
                      <div className="text-[11px] text-gray-500 mt-1">Current Status</div>
                    </div>
                  </div>
                  <SBtn sm onClick={() => alert(`Calling driver ${driver.name} at +91 9988776655`)} icon={<Phone className="h-3.5 w-3.5" />}>Call Driver</SBtn>
                </Kard>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ REVIEWS ══════════ */}
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Reviews" subtitle={`${reviews.length} reviews · ${(reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1)} avg`} />
            <Kard>
              <div className="flex items-center gap-12 flex-wrap">
                <div className="text-center">
                  <div className="text-[52px] font-bold text-white leading-none">{(reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1)}</div>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s=><Star key={s} className={`h-4 w-4 ${s<=Math.round(reviews.reduce((a,r)=>a+r.rating,0)/reviews.length)?"text-yellow-400 fill-yellow-400":"text-gray-700"}`} />)}
                  </div>
                  <div className="text-[12px] text-gray-500 mt-1">{reviews.length} reviews</div>
                </div>
                <div className="flex-1 min-w-[160px] space-y-2">
                  {[5,4,3,2,1].map(s=>{
                    const count=reviews.filter(r=>r.rating===s).length;
                    return (
                      <div key={s} className="flex items-center gap-3">
                        <span className="text-[12px] text-gray-500 w-5 text-right">{s}★</span>
                        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-yellow-400 transition-all" style={{ width:`${reviews.length?(count/reviews.length)*100:0}%` }} />
                        </div>
                        <span className="text-[11px] text-gray-600 w-4">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Kard>
            <div className="flex items-center gap-3 flex-wrap">
              {[0,5,4,3,2,1].map(s=>(
                <button key={s} onClick={()=>setReviewFilter(s)} className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all cursor-pointer border ${reviewFilter===s?"bg-purple-500/20 text-purple-300 border-purple-500/40":"bg-white/[0.04] text-gray-400 border-white/[0.06] hover:bg-white/[0.08]"}`}>
                  {s===0?"All Reviews":`${s} Stars`}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {filteredReviews.map(review => (
                <Kard key={review.id}>
                  <div className="flex items-start gap-5">
                    <Avi name={review.user} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[15px] font-semibold text-white">{review.user}</span>
                          <span className="text-[12px] text-gray-500 ml-2">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(s=><Star key={s} className={`h-4 w-4 ${s<=review.rating?"text-yellow-400 fill-yellow-400":"text-gray-700"}`} />)}
                        </div>
                      </div>
                      <div className="mb-3"><Chip color="purple" size="xs">{review.food}</Chip></div>
                      <p className="text-[14px] text-gray-300 leading-relaxed">{review.comment}</p>
                      {review.reply && (
                        <div className="mt-4 p-4 bg-purple-500/[0.08] border border-purple-500/20 rounded-2xl">
                          <p className="text-[11px] text-purple-400 font-medium mb-1">Your reply</p>
                          <p className="text-[13px] text-gray-300">{review.reply}</p>
                        </div>
                      )}
                      {!review.reply && (
                        <div className="mt-4 flex items-center gap-3">
                          <input value={replyInputs[review.id]||""} onChange={e=>setReplyInputs(p=>({...p,[review.id]:e.target.value}))} placeholder="Write a reply…" className="flex-1 h-9 px-4 bg-white/[0.04] border border-white/[0.08] rounded-full text-[13px] text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-all" />
                          <PBtn sm onClick={()=>submitReply(review.id)}>Reply</PBtn>
                        </div>
                      )}
                    </div>
                  </div>
                </Kard>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ PAYOUTS ══════════ */}
        {activeTab === "payouts" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Payouts" subtitle="Financial overview and transaction history" actions={
              <PBtn onClick={() => alert("Downloading all payouts statement PDF...")} icon={<Download className="h-4 w-4" />}>Download All</PBtn>
            } />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label:"Available Balance", value:"₹8,240", sub:"Ready to withdraw", grad:"from-green-500/15 to-emerald-500/15", border:"border-green-500/25", vc:"text-green-400", icon:DollarSign },
                { label:"Pending Payout", value:"₹2,180", sub:"Processing — Jul 19", grad:"from-yellow-500/15 to-orange-500/15", border:"border-yellow-500/25", vc:"text-yellow-400", icon:Timer },
                { label:"Total Paid", value:"₹55,200", sub:"All-time earnings", grad:"from-purple-500/15 to-pink-500/15", border:"border-purple-500/25", vc:"text-purple-400", icon:TrendingUp },
              ].map((k,i)=>{
                const Icon=k.icon;
                return (
                  <div key={i} className={`bg-gradient-to-br ${k.grad} border ${k.border} rounded-3xl p-8`}>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[12px] text-gray-400 font-medium">{k.label}</span>
                      <Icon className={`h-5 w-5 ${k.vc}`} />
                    </div>
                    <div className={`text-[36px] font-bold ${k.vc}`}>{k.value}</div>
                    <div className="text-[13px] text-gray-500 mt-2">{k.sub}</div>
                  </div>
                );
              })}
            </div>
            <Kard className="!p-0 overflow-hidden">
              <div className="px-8 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-semibold text-white">Transactions</h2>
                  <p className="text-[13px] text-gray-500 mt-1">All payout records</p>
                </div>
                <SBtn sm onClick={() => alert("Filter transactions overlay.")} icon={<Filter className="h-3.5 w-3.5" />}>Filter</SBtn>
              </div>
              <div>
                {initialPayouts.map((payout,i)=>(
                  <div key={i} className="flex items-center gap-5 px-8 py-5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0"><DollarSign className="h-4 w-4 text-green-400" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-white">{payout.id}</div>
                      <div className="text-[12px] text-gray-500">{payout.date}</div>
                    </div>
                    <Chip color="green">{payout.status}</Chip>
                    <div className="text-[16px] font-bold text-white">₹{payout.amount.toLocaleString()}</div>
                    <button onClick={() => alert(`Downloading invoice for transaction ${payout.id}...`)} className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.10] cursor-pointer border-solid flex-shrink-0"><Download className="h-3.5 w-3.5 text-gray-400" /></button>
                  </div>
                ))}
              </div>
            </Kard>
          </div>
        )}

        {/* ══════════ SETTINGS ══════════ */}
        {activeTab === "settings" && (
          <div className="flex flex-col gap-10 lg:gap-12">
            <PageHeader title="Settings" subtitle="Manage your restaurant profile and preferences" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <Kard className="!p-3 h-fit">
                {[
                  { id:"restaurant", label:"Restaurant", icon:ChefHat },
                  { id:"business", label:"Business", icon:FileText },
                  { id:"payments", label:"Payments", icon:CreditCard },
                  { id:"notifications", label:"Notifications", icon:Bell },
                  { id:"security", label:"Security", icon:Shield },
                  { id:"team", label:"Team", icon:Users },
                  { id:"qr", label:"QR Code", icon:QrCode },
                ].map(item=>{
                  const Icon=item.icon;
                  return (
                    <button key={item.id} onClick={()=>setSettingsTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-medium transition-all text-left cursor-pointer border-none mb-0.5 ${settingsTab===item.id?"bg-purple-500/15 text-purple-300":"text-gray-400 hover:bg-white/[0.04] hover:text-white bg-transparent"}`}>
                      <Icon className="h-4 w-4" />{item.label}
                    </button>
                  );
                })}
              </Kard>

              <div className="lg:col-span-3">
                {settingsTab === "restaurant" && (
                  <Kard>
                    <SectionHdr title="Restaurant Info" subtitle="Your public profile seen by customers" />
                    <div className="flex flex-col gap-6 mt-4">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/[0.10]"><img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" /></div>
                        <SBtn onClick={() => alert("Change logo upload popup.")} icon={<Upload className="h-4 w-4" />}>Change Logo</SBtn>
                      </div>
                      {[{label:"Restaurant Name",val:"Burger Bliss"},{label:"Description",val:"Premium burgers, biriyani & more"},{label:"Phone",val:"+91 9876543210"},{label:"Email",val:"burgerbliss@kayikk.com"},{label:"Address",val:"Marine Drive, Kochi, Kerala"}].map(f=>(
                        <FormInput key={f.label} label={f.label} defaultValue={f.val} />
                      ))}
                      <PBtn onClick={() => alert("Restaurant profile updated!")} icon={<Check className="h-4 w-4" />}>Save Changes</PBtn>
                    </div>
                  </Kard>
                )}
                {settingsTab === "notifications" && (
                  <Kard>
                    <SectionHdr title="Notifications" subtitle="Choose what updates you receive" />
                    <div className="flex flex-col gap-4 mt-4">
                      {[
                        { label:"New Order Alerts", desc:"Alert when a new order arrives", on:true },
                        { label:"Order Status Updates", desc:"Track order progress changes", on:true },
                        { label:"Low Stock Alerts", desc:"Alert when items run low", on:true },
                        { label:"Payout Notifications", desc:"When payouts are processed", on:false },
                        { label:"Customer Reviews", desc:"New reviews and feedback", on:true },
                      ].map((item,i)=>(
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
                          <div>
                            <div className="text-[14px] font-medium text-white">{item.label}</div>
                            <div className="text-[12px] text-gray-500 mt-0.5">{item.desc}</div>
                          </div>
                          <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${item.on?"bg-purple-500":"bg-white/[0.10]"}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.on?"left-6":"left-1"}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Kard>
                )}
                {settingsTab === "security" && (
                  <Kard className="!p-7">
                    <SectionHdr title="Security" subtitle="Protect your account" />
                    <div className="space-y-4">
                      <FormInput label="Current Password" type="password" placeholder="••••••••" />
                      <FormInput label="New Password" type="password" placeholder="••••••••" />
                      <FormInput label="Confirm New Password" type="password" placeholder="••••••••" />
                      <PBtn onClick={() => alert("Security password updated successfully!")} icon={<Shield className="h-4 w-4" />}>Update Password</PBtn>
                    </div>
                  </Kard>
                )}
                {settingsTab === "team" && (
                  <Kard className="!p-7">
                    <SectionHdr title="Team Members" subtitle="Manage staff access" action={<PBtn sm onClick={() => alert("Invite teammate email copied to clipboard.")} icon={<UserPlus className="h-3.5 w-3.5" />}>Invite</PBtn>} />
                    <div className="space-y-3">
                      {[{name:"Shinas Yunus",role:"Owner",email:"shinas@kayikk.com"},{name:"Amal Jose",role:"Manager",email:"amal@kayikk.com"},{name:"Meera Nair",role:"Staff",email:"meera@kayikk.com"}].map((member,i)=>(
                        <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
                          <Avi name={member.name} size="md" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-medium text-white">{member.name}</div>
                            <div className="text-[12px] text-gray-500">{member.email}</div>
                          </div>
                          <Chip color={member.role==="Owner"?"purple":member.role==="Manager"?"blue":"gray"}>{member.role}</Chip>
                        </div>
                      ))}
                    </div>
                  </Kard>
                )}
                {["business","payments","qr"].includes(settingsTab) && (
                  <Kard className="!p-7">
                    <Empty icon={settingsTab==="qr"?<QrCode className="h-6 w-6" />:settingsTab==="payments"?<CreditCard className="h-6 w-6" />:<FileText className="h-6 w-6" />}
                      title={settingsTab==="qr"?"QR Code":settingsTab==="payments"?"Payment Settings":"Business Settings"}
                      desc="This section is coming soon. We're building it with care."
                      action={<SBtn icon={<Bell className="h-4 w-4" />}>Notify Me</SBtn>}
                    />
                  </Kard>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ADD FOOD MODAL */}
      {showAddFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setShowAddFood(false)} />
          <div className="relative z-10 w-full max-w-md bg-[#1a1527] border border-white/[0.10] rounded-3xl p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-bold text-white">Add New Food</h2>
              <button onClick={()=>setShowAddFood(false)} className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.10] flex items-center justify-center hover:bg-white/[0.12] cursor-pointer border-solid"><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <form onSubmit={addFood} className="flex flex-col gap-5">
              <FormInput label="Dish Name *" required value={foodForm.name} onChange={e=>setFoodForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Chicken Biriyani" />
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Price (₹) *" required type="number" value={foodForm.price} onChange={e=>setFoodForm(p=>({...p,price:e.target.value}))} placeholder="220" />
                <div>
                  <label className="text-[12.5px] text-gray-400 mb-2 block font-semibold">Category</label>
                  <select value={foodForm.category} onChange={e=>setFoodForm(p=>({...p,category:e.target.value}))} className="w-full h-11 px-4 border border-white/[0.09] rounded-2xl text-[13.5px] text-white outline-none focus:border-purple-500/50 transition-all appearance-none" style={{ background:"rgba(255,255,255,0.04)" }}>
                    {initialCategoryData.map(c=><option key={c.name} value={c.name} style={{ background:"#1a1527" }}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[12.5px] text-gray-400 mb-2 block font-semibold">Description</label>
                <textarea value={foodForm.description} onChange={e=>setFoodForm(p=>({...p,description:e.target.value}))} placeholder="Brief description of the dish…" rows={2} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.09] rounded-2xl text-[13.5px] text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Prep Time (min)" type="number" value={foodForm.prepTime} onChange={e=>setFoodForm(p=>({...p,prepTime:e.target.value}))} />
                <FormInput label="Stock Qty" type="number" value={foodForm.inventory} onChange={e=>setFoodForm(p=>({...p,inventory:e.target.value}))} />
              </div>
              <div className="py-1">
                <label className="flex items-center gap-3.5 cursor-pointer w-fit">
                  <div onClick={()=>setFoodForm(p=>({...p,isVeg:!p.isVeg}))} className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${foodForm.isVeg?"bg-green-500":"bg-white/[0.10]"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${foodForm.isVeg?"left-6":"left-1"}`} />
                  </div>
                  <span className="text-[13.5px] font-medium text-gray-300">Vegetarian Dish</span>
                </label>
              </div>
              <div className="flex gap-4 pt-3 justify-end border-t border-white/[0.06]">
                <SBtn onClick={()=>setShowAddFood(false)}>Cancel</SBtn>
                <PBtn icon={<Plus className="h-4.5 w-4.5" />}>Add Dish</PBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CATEGORY MODAL */}
      {showAddCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setShowAddCat(false)} />
          <div className="relative z-10 w-full max-w-sm bg-[#1a1527] border border-white/[0.10] rounded-3xl p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-bold text-white">Add Category</h2>
              <button onClick={()=>setShowAddCat(false)} className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.10] flex items-center justify-center cursor-pointer border-solid"><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <div className="flex flex-col gap-5">
              <FormInput label="Category Name" value={newCatName} onChange={e=>setNewCatName(e.target.value)} placeholder="e.g. Pizza" />
              <div className="flex gap-4 pt-2 justify-end border-t border-white/[0.06]">
                <SBtn onClick={()=>setShowAddCat(false)}>Cancel</SBtn>
                <PBtn onClick={()=>{ if(newCatName.trim()&&!catData.find(c=>c.name===newCatName.trim())){ setCatData(prev=>[...prev,{ name:newCatName.trim(), count:0, revenue:0, color:"from-purple-500 to-pink-500" }]); } setNewCatName(""); setShowAddCat(false); }} icon={<Plus className="h-4.5 w-4.5" />}>Add</PBtn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
