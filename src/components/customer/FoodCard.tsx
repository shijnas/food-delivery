"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Heart, Star, Clock, Flame, Leaf } from "lucide-react";
import { useState } from "react";
import { FoodItem, Restaurant } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { cn, formatCurrency, calculateDiscount } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface FoodCardProps {
  item: FoodItem;
  restaurant: Pick<Restaurant, "id" | "name" | "image" | "deliveryFee">;
  className?: string;
}

export default function FoodCard({ item, restaurant, className }: FoodCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(item, restaurant);
    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  const discount = item.originalPrice
    ? calculateDiscount(item.originalPrice, item.price)
    : 0;

  return (
    <Link href={`/food/${item.id}`}>
      <div
        className={cn(
          "group bg-[#181424] border border-white/[0.06] rounded-3xl overflow-hidden",
          "transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/20",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(139,92,246,0.1)]",
          "cursor-pointer",
          className
        )}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-[#1E1830]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181424]/60 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {item.isPopular && (
              <Badge variant="purple" size="sm">🔥 Popular</Badge>
            )}
            {item.tags?.includes("new") && (
              <Badge variant="green" size="sm">✨ New</Badge>
            )}
            {discount > 0 && (
              <Badge variant="red" size="sm">-{discount}%</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            id={`wishlist-${item.id}`}
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center",
              "backdrop-blur-sm border transition-all",
              wishlisted
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : "bg-black/30 border-white/10 text-gray-300 hover:text-red-400"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
          </button>

          {/* Diet badges */}
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {item.isVegan && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-[10px] text-green-400">
                <Leaf className="h-2.5 w-2.5" /> Vegan
              </span>
            )}
            {item.isSpicy && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded-full text-[10px] text-red-400">
                <Flame className="h-2.5 w-2.5" /> Spicy
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1 group-hover:text-purple-200 transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{item.rating}</span>
              <span>({item.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.preparationTime}m
            </span>
            {item.calories && (
              <span>{item.calories} cal</span>
            )}
          </div>

          {/* Price & Add */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-white font-bold text-base">
                {formatCurrency(item.price)}
              </span>
              {item.originalPrice && (
                <span className="text-gray-600 text-xs line-through">
                  {formatCurrency(item.originalPrice)}
                </span>
              )}
            </div>

            <button
              id={`add-to-cart-${item.id}`}
              onClick={handleAddToCart}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300",
                adding
                  ? "bg-purple-500 scale-110 rotate-12"
                  : "bg-gradient-to-br from-purple-600 to-pink-600 hover:shadow-neon-purple hover:scale-110"
              )}
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus className="h-4.5 w-4.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
