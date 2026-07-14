"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Tag,
  Check,
  ArrowRight,
  Bike,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { mockCoupons } from "@/lib/mockData";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { formatCurrency, cn } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal, getDeliveryFee } =
    useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const discount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? Math.min(
          (subtotal * appliedCoupon.discountValue) / 100,
          appliedCoupon.maximumDiscount || Infinity
        )
      : appliedCoupon.discountValue
    : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyCoupon = () => {
    const coupon = mockCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase() && c.isActive
    );
    if (!coupon) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      setCouponSuccess(false);
    } else if (subtotal < coupon.minimumOrder) {
      setCouponError(`Minimum order ${formatCurrency(coupon.minimumOrder)} required`);
      setAppliedCoupon(null);
      setCouponSuccess(false);
    } else {
      setAppliedCoupon(coupon);
      setCouponError("");
      setCouponSuccess(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 px-4 min-h-screen flex flex-col items-center justify-center text-center max-w-sm mx-auto">
        <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-purple-400" />
        </div>
        <h1 className="text-white text-xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 text-sm mb-8">Add items from a restaurant to get started</p>
        <Link href="/home">
          <Button variant="primary" size="lg">Browse Restaurants</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 16px 40px", maxWidth: 768, margin: "0 auto" }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-400 text-sm hover:text-red-300 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="h-4 w-4" />
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {/* Restaurant header */}
          {items[0] && (
            <div className="flex items-center gap-3 p-3 bg-[#181424] border border-white/[0.06] rounded-2xl mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <Image src={items[0].restaurant.image} alt={items[0].restaurant.name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{items[0].restaurant.name}</p>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <Bike className="h-3 w-3" />
                  Delivery: {formatCurrency(deliveryFee)}
                </p>
              </div>
            </div>
          )}

          {items.map((item) => (
            <Card key={item.id} variant="default" padding="sm">
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#1E1830]">
                  <Image src={item.foodItem.image} alt={item.foodItem.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{item.foodItem.name}</h3>
                  <p className="text-gray-500 text-xs mb-3">
                    {formatCurrency(item.foodItem.price)} each
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.05] text-gray-400 hover:text-white transition-all"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-white font-bold text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-purple-400 font-bold">{formatCurrency(item.totalPrice)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <Card variant="default" padding="md">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4 text-purple-400" />
              Promo Code
            </h3>
            <div className="flex gap-2">
              <Input
                id="coupon-input"
                type="text"
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                error={couponError}
                inputClassName="h-10 text-xs"
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={handleApplyCoupon} className="flex-shrink-0">
                Apply
              </Button>
            </div>
            {couponSuccess && appliedCoupon && (
              <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                <Check className="h-3 w-3" />
                {appliedCoupon.description}
              </p>
            )}

            {/* Available coupons */}
            <div className="mt-3 space-y-2">
              {mockCoupons.slice(0, 2).map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setCouponCode(c.code); }}
                  className="w-full text-left p-2 bg-purple-500/5 border border-purple-500/20 rounded-xl hover:bg-purple-500/10 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400 font-bold text-xs">{c.code}</span>
                    <span className="text-gray-500 text-xs">
                      {c.discountType === "percentage" ? `${c.discountValue}% off` : formatCurrency(c.discountValue) + " off"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-[10px] mt-0.5">{c.description}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Order Summary */}
          <Card variant="default" padding="md">
            <h3 className="text-white font-semibold text-sm mb-4">Order Summary</h3>
            <div className="space-y-3">
              {[
                { label: "Subtotal", value: subtotal },
                { label: "Delivery Fee", value: deliveryFee },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="text-white">{formatCurrency(row.value)}</span>
                </div>
              ))}
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Discount</span>
                  <span className="text-green-400">-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="border-t border-white/[0.06] pt-3 flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-purple-400 text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block mt-4">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
