"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, Check, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const { getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handlePay = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));
    setLoading(false);
    clearCart();
    setStep("success");
    setTimeout(() => {
      router.push("/track/ord-001");
    }, 2000);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#0D0B14] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-cart">
            <Check className="h-12 w-12 text-green-400" />
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">Payment Successful! 🎉</h1>
          <p className="text-gray-500 mb-4">Redirecting to order tracking...</p>
          <p className="text-purple-400 font-bold text-xl">{formatCurrency(total)}</p>
        </div>
      </div>
    );
  }

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  const formatExpiry = (val: string) =>
    val.replace(/\D/g, "").replace(/^(.{2})/, "$1/").slice(0, 5);

  return (
    <div style={{ padding: "24px 16px 40px", maxWidth: 448, margin: "0 auto" }}>
      <h1 className="text-white text-2xl font-bold mb-2">Secure Payment</h1>
      <div className="flex items-center gap-2 mb-8 text-gray-500 text-sm">
        <Lock className="h-4 w-4 text-green-400" />
        256-bit SSL encrypted
      </div>

      <Card variant="default" padding="lg" className="mb-5">
        {/* Card Preview */}
        <div className="relative h-44 bg-gradient-to-br from-purple-700 to-pink-700 rounded-2xl p-5 mb-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white" />
            <div className="absolute top-4 right-14 w-20 h-20 rounded-full border-2 border-white" />
          </div>
          <div className="flex justify-between items-start mb-8">
            <span className="text-white/70 text-sm font-medium">kayikk Pay</span>
            <CreditCard className="h-6 w-6 text-white/70" />
          </div>
          <p className="text-white text-lg font-mono tracking-widest mb-3">
            {card.number || "•••• •••• •••• ••••"}
          </p>
          <div className="flex justify-between">
            <div>
              <p className="text-white/50 text-[10px] uppercase">Card Holder</p>
              <p className="text-white text-sm font-medium">{card.name || "Your Name"}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[10px] uppercase">Expires</p>
              <p className="text-white text-sm font-medium">{card.expiry || "MM/YY"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            id="card-number"
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
            leftIcon={<CreditCard className="h-4 w-4" />}
          />
          <Input
            id="card-name"
            label="Cardholder Name"
            placeholder="John Smith"
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="card-expiry"
              label="Expiry"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
            />
            <Input
              id="card-cvc"
              label="CVC"
              placeholder="•••"
              type="password"
              maxLength={3}
              value={card.cvc}
              onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 3) })}
            />
          </div>
        </div>
      </Card>

      {/* Order total */}
      <div className="flex justify-between items-center p-4 bg-[#181424] border border-white/[0.06] rounded-2xl mb-5">
        <div>
          <p className="text-gray-500 text-sm">Amount to pay</p>
          <p className="text-white text-2xl font-bold">{formatCurrency(total || 34.96)}</p>
        </div>
        <Badge variant="green">Secured</Badge>
      </div>

      <Button
        id="pay-now"
        variant="primary"
        size="xl"
        className="w-full"
        loading={loading}
        glow
        onClick={handlePay}
      >
        {!loading && (
          <>
            Pay {formatCurrency(total || 34.96)}
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </Button>

      <div className="flex justify-center gap-6 mt-5">
        {["Visa", "Mastercard", "Amex", "PayPal"].map((brand) => (
          <span key={brand} className="text-gray-700 text-xs">{brand}</span>
        ))}
      </div>
    </div>
  );
}
