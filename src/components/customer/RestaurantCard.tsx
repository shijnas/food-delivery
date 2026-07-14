"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Bike, ChevronRight } from "lucide-react";
import { Restaurant } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
  layout?: "grid" | "list";
}

export default function RestaurantCard({
  restaurant,
  className,
  layout = "grid",
}: RestaurantCardProps) {
  if (layout === "list") {
    return (
      <Link href={`/restaurant/${restaurant.id}`}>
        <div
          className={cn(
            "group flex gap-4 p-4 bg-[#181424] border border-white/[0.06] rounded-2xl",
            "transition-all duration-300 hover:border-purple-500/20 hover:bg-[#1E1830]",
            "cursor-pointer",
            className
          )}
        >
          <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-[#1E1830]">
            <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-white text-sm line-clamp-1">{restaurant.name}</h3>
              {!restaurant.isOpen && <Badge variant="red" size="sm">Closed</Badge>}
            </div>
            <p className="text-gray-500 text-xs line-clamp-1 mb-2">{restaurant.cuisine.join(" • ")}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">{restaurant.rating}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {restaurant.deliveryTime} min
              </span>
              <span className="flex items-center gap-1">
                <Bike className="h-3 w-3" />
                {restaurant.deliveryFee === 0 ? "Free" : formatCurrency(restaurant.deliveryFee)}
              </span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-purple-400 transition-colors self-center flex-shrink-0" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div
        className={cn(
          "group bg-[#181424] border border-white/[0.06] rounded-3xl overflow-hidden",
          "transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/20",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(139,92,246,0.08)]",
          "cursor-pointer",
          className
        )}
      >
        {/* Cover Image */}
        <div className="relative h-44 overflow-hidden bg-[#1E1830]">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181424]/70 via-transparent to-transparent" />

          {/* Featured badge */}
          {restaurant.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge variant="purple" size="sm">⭐ Featured</Badge>
            </div>
          )}

          {/* Open/Closed */}
          <div className="absolute top-3 right-3">
            {restaurant.isOpen ? (
              <Badge variant="green" size="sm" dot>Open</Badge>
            ) : (
              <Badge variant="red" size="sm">Closed</Badge>
            )}
          </div>

          {/* Promo overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <span className="text-xs text-white/70">{restaurant.priceRange}</span>
            <span className="text-xs text-white/70">Min. {formatCurrency(restaurant.minimumOrder)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-white text-sm group-hover:text-purple-200 transition-colors line-clamp-1 flex-1">
              {restaurant.name}
            </h3>
          </div>

          <p className="text-gray-500 text-xs mb-3 line-clamp-1">
            {restaurant.cuisine.join(" • ")}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{restaurant.rating}</span>
              <span className="text-gray-600">({restaurant.reviewCount.toLocaleString()})</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {restaurant.deliveryTime} min
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="flex items-center gap-1">
              <Bike className="h-3 w-3" />
              {restaurant.deliveryFee === 0
                ? <span className="text-green-400">Free</span>
                : formatCurrency(restaurant.deliveryFee)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
