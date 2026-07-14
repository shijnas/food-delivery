"use client";

import { use, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Star, Clock, Heart, Plus, Minus, Flame, Leaf, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockFoodItems, mockRestaurants } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn, formatCurrency } from "@/lib/utils";

export default function FoodDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const item = mockFoodItems.find((f) => f.id === id) || mockFoodItems[0];
  const restaurant = mockRestaurants.find((r) => r.id === item.restaurantId) || mockRestaurants[0];

  const handleAddToCart = () => {
    setAdding(true);
    addItem(item, {
      id: restaurant.id,
      name: restaurant.name,
      image: restaurant.image,
      deliveryFee: restaurant.deliveryFee,
    }, quantity);
    setTimeout(() => setAdding(false), 500);
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#0D0B14]">
      {/* Image */}
      <div className="relative h-80 md:h-[420px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0D0B14]" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={cn(
              "w-10 h-10 backdrop-blur-md border rounded-xl flex items-center justify-center transition-all",
              wishlisted ? "bg-red-500/30 border-red-500/40 text-red-400" : "bg-black/40 border-white/10 text-white"
            )}
          >
            <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative z-10 pb-32">
        <div className="bg-[#181424] border border-white/[0.06] rounded-3xl p-5 mb-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {item.isPopular && <Badge variant="purple">🔥 Popular</Badge>}
            {item.isVegan && <Badge variant="green"><Leaf className="h-3 w-3" /> Vegan</Badge>}
            {item.isSpicy && <Badge variant="red"><Flame className="h-3 w-3" /> Spicy</Badge>}
          </div>

          <h1 className="text-white text-2xl font-bold mb-2">{item.name}</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-white font-semibold">{item.rating}</span>
              <span className="text-gray-500">({item.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Clock className="h-4 w-4" />
              {item.preparationTime} min
            </span>
            {item.calories && (
              <span className="text-gray-500">{item.calories} cal</span>
            )}
          </div>
        </div>

        {/* Restaurant */}
        <div className="flex items-center gap-3 p-4 bg-[#181424] border border-white/[0.06] rounded-2xl mb-5">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden">
            <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" sizes="48px" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{restaurant.name}</p>
            <p className="text-gray-500 text-xs">{restaurant.deliveryTime} min delivery</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </div>

        {/* Customizations */}
        {item.customizations && item.customizations.length > 0 && (
          <div className="space-y-4 mb-5">
            {item.customizations.map((customization) => (
              <div key={customization.id} className="bg-[#181424] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">{customization.name}</h3>
                  {customization.required && (
                    <Badge variant="red" size="sm">Required</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  {customization.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl cursor-pointer hover:bg-white/[0.06] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type={customization.type === "single" ? "radio" : "checkbox"}
                          name={customization.id}
                          className="accent-purple-500 w-4 h-4"
                        />
                        <span className="text-white text-sm">{option.name}</span>
                      </div>
                      {option.price > 0 && (
                        <span className="text-purple-400 text-sm">+{formatCurrency(option.price)}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nutritional Info */}
        {item.calories && (
          <div className="bg-[#181424] border border-white/[0.06] rounded-2xl p-4 mb-5">
            <h3 className="text-white font-semibold text-sm mb-3">Nutritional Info</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Calories", value: `${item.calories}` },
                { label: "Protein", value: "24g" },
                { label: "Carbs", value: "42g" },
              ].map((info) => (
                <div key={info.label} className="text-center p-2 bg-white/[0.03] rounded-xl">
                  <p className="text-white font-bold text-sm">{info.value}</p>
                  <p className="text-gray-600 text-xs">{info.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0D0B14]/95 backdrop-blur-xl border-t border-white/[0.06] p-4">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          {/* Quantity */}
          <div className="flex items-center gap-3 bg-[#181424] border border-white/[0.06] rounded-2xl p-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/[0.05] text-gray-400 hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-white font-bold text-base min-w-[24px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to cart */}
          <Button
            id="add-to-cart-detail"
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
          >
            Add to Cart • {formatCurrency(item.price * quantity)}
          </Button>
        </div>
      </div>
    </div>
  );
}
