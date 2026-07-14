"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CreditCard, Wallet, Banknote, Clock, ChevronRight, Plus, Check, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { formatCurrency, cn } from "@/lib/utils";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
  { id: "wallet", label: "Kayikk Wallet", icon: Wallet, desc: "Balance: ₹450.00" },
  { id: "cash", label: "Cash on Delivery", icon: Banknote, desc: "Pay when delivered" },
];

const savedAddresses = [
  { id: "1", label: "🏠 Home", address: "456 Oak Avenue, Apt 3B, New York, NY 10001" },
  { id: "2", label: "🏢 Work", address: "100 Corporate Plaza, Manhattan, NY 10005" },
];

const deliverySlots = [
  { id: "asap", label: "ASAP", sub: "25-35 min" },
  { id: "12pm", label: "12:00 PM", sub: "Scheduled" },
  { id: "1pm", label: "1:00 PM", sub: "Scheduled" },
  { id: "2pm", label: "2:00 PM", sub: "Scheduled" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDeliveryFee, getTotal } = useCartStore();
  const [selectedAddress, setSelectedAddress] = useState("1");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedSlot, setSelectedSlot] = useState("asap");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    router.push("/track/ord-001");
  };

  return (
    <div style={{ padding: "40px 24px 60px", maxWidth: 1120, margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
      <h1 className="text-white text-3xl font-extrabold tracking-tight mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left column details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Delivery Address */}
          <Card variant="default" padding="lg" className="border border-white/[0.04] bg-[#12101C]/40">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-white text-lg font-bold flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-purple-400" />
                Delivery Address
              </h2>
              <button className="flex items-center gap-1.5 text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors">
                <Plus className="h-3.5 w-3.5" />
                Add address
              </button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => {
                const isSelected = selectedAddress === addr.id;
                return (
                  <button
                    key={addr.id}
                    id={`address-${addr.id}`}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all relative flex flex-col justify-between min-h-[100px]",
                      isSelected
                        ? "bg-gradient-to-br from-[#1D172E] to-[#13101E] border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                        : "bg-[#12101C]/60 border-white/[0.04] hover:border-white/[0.1] hover:bg-[#151320]"
                    )}
                  >
                    <div>
                      <p className="text-white text-sm font-bold flex items-center gap-1.5">
                        {addr.label}
                      </p>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed">{addr.address}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Delivery Time */}
          <Card variant="default" padding="lg" className="border border-white/[0.04] bg-[#12101C]/40">
            <h2 className="text-white text-lg font-bold mb-5 flex items-center gap-2.5">
              <Clock className="h-5 w-5 text-purple-400" />
              Delivery Time
            </h2>
            
            {/* Grid display instead of horizontal scroll */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {deliverySlots.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    id={`slot-${slot.id}`}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center",
                      isSelected
                        ? "bg-gradient-to-br from-[#1D172E] to-[#13101E] border-purple-500/30 text-white font-bold"
                        : "bg-[#12101C]/60 border-white/[0.04] hover:border-white/[0.1] hover:bg-[#151320] text-gray-400"
                    )}
                  >
                    <span className={cn("text-sm font-bold", isSelected ? "text-purple-300" : "text-white")}>
                      {slot.label}
                    </span>
                    <span className="text-gray-500 text-[10px] mt-1">{slot.sub}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Payment Method */}
          <Card variant="default" padding="lg" className="border border-white/[0.04] bg-[#12101C]/40">
            <h2 className="text-white text-lg font-bold mb-5 flex items-center gap-2.5">
              <CreditCard className="h-5 w-5 text-purple-400" />
              Payment Method
            </h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedPayment === method.id;
                return (
                  <button
                    key={method.id}
                    id={`payment-${method.id}`}
                    onClick={() => setSelectedPayment(method.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left relative",
                      isSelected
                        ? "bg-gradient-to-br from-[#1D172E] to-[#13101E] border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                        : "bg-[#12101C]/60 border-white/[0.04] hover:border-white/[0.1] hover:bg-[#151320]"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      isSelected ? "bg-purple-500/20" : "bg-white/[0.04]"
                    )}>
                      <method.icon className={cn("h-5 w-5", isSelected ? "text-purple-400" : "text-gray-400")} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-bold">{method.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{method.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Order notes */}
          <Card variant="default" padding="lg" className="border border-white/[0.04] bg-[#12101C]/40">
            <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2.5">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              Special Instructions
            </h2>
            <textarea
              id="order-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="No onions, extra sauce, ring doorbell..."
              rows={3}
              className="w-full bg-[#12101C]/60 border border-white/[0.06] rounded-2xl p-4 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 resize-none transition-all"
            />
          </Card>
        </div>

        {/* Right column order summary */}
        <div>
          <Card variant="default" padding="lg" className="sticky top-24 border border-white/[0.04] bg-[#12101C]/40 shadow-xl">
            <h2 className="text-white text-lg font-bold mb-5">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-3 mb-5 max-h-48 overflow-y-auto no-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm p-2.5 bg-white/[0.02] rounded-xl border border-white/[0.02]">
                  <span className="text-gray-300 font-semibold line-clamp-1 flex-1">
                    {item.quantity}x {item.foodItem.name}
                  </span>
                  <span className="text-white ml-3 font-bold">{formatCurrency(item.totalPrice)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-white/[0.06] pt-4 space-y-3">
              {[
                { label: "Subtotal", value: subtotal },
                { label: "Delivery Charge", value: deliveryFee },
                { label: "Tax (8%)", value: subtotal * 0.08 },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">{row.label}</span>
                  <span className="text-white font-semibold">{formatCurrency(row.value)}</span>
                </div>
              ))}
              
              <div className="flex justify-between font-bold pt-3.5 border-t border-white/[0.06] items-center">
                <span className="text-white text-sm font-extrabold">Total Amount</span>
                <span className="text-purple-400 text-xl font-black">{formatCurrency(total + subtotal * 0.08)}</span>
              </div>
            </div>

            {/* Place order CTA */}
            <Button
              id="place-order"
              variant="primary"
              size="lg"
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_24px_rgba(139,92,246,0.2)]"
              loading={loading}
              onClick={handlePlaceOrder}
            >
              {!loading && (
                <span className="flex items-center justify-center gap-1.5 font-bold">
                  Place Order
                  <ChevronRight className="h-5 w-5" />
                </span>
              )}
            </Button>

            <p className="text-gray-500 text-[10px] text-center mt-4 leading-relaxed">
              By placing an order you agree to Kayikk's standard <span className="text-purple-400 cursor-pointer hover:underline">Terms & Conditions</span>
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
}
