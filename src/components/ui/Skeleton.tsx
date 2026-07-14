"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rect" | "circle" | "text";
  width?: string;
  height?: string;
  lines?: number;
}

function SkeletonBase({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/[0.06] rounded-xl",
        className
      )}
      {...props}
    />
  );
}

export function Skeleton({ className, variant = "rect", lines = 1, ...props }: SkeletonProps) {
  if (variant === "circle") {
    return <SkeletonBase className={cn("rounded-full", className)} {...props} />;
  }
  if (variant === "text") {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={cn("h-4", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full", className)}
          />
        ))}
      </div>
    );
  }
  return <SkeletonBase className={className} {...props} />;
}

export function FoodCardSkeleton() {
  return (
    <div className="bg-[#181424] rounded-3xl overflow-hidden border border-white/[0.06]">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-[#181424] rounded-3xl overflow-hidden border border-white/[0.06]">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
