"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "sm",
  showValue = false,
  reviewCount,
  interactive = false,
  onRate,
  className,
}: StarRatingProps) {
  const sizes = { sm: "h-3.5 w-3.5", md: "h-4.5 w-4.5", lg: "h-6 w-6" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <button
              key={i}
              type="button"
              onClick={() => interactive && onRate?.(i + 1)}
              disabled={!interactive}
              className={cn(
                "transition-transform",
                interactive && "cursor-pointer hover:scale-125",
                !interactive && "cursor-default"
              )}
            >
              <Star
                className={cn(
                  sizes[size],
                  filled || partial
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600 fill-gray-600/20"
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className={cn("font-semibold text-white ml-0.5", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn("text-gray-500", textSizes[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
