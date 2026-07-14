"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "purple"
    | "green"
    | "red"
    | "yellow"
    | "blue"
    | "orange"
    | "gray"
    | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export default function Badge({
  className,
  variant = "purple",
  size = "sm",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    purple: "bg-purple-500/15 text-purple-300 border border-purple-500/25",
    green: "bg-green-500/15 text-green-300 border border-green-500/25",
    red: "bg-red-500/15 text-red-300 border border-red-500/25",
    yellow: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/25",
    blue: "bg-blue-500/15 text-blue-300 border border-blue-500/25",
    orange: "bg-orange-500/15 text-orange-300 border border-orange-500/25",
    gray: "bg-white/10 text-gray-300 border border-white/10",
    outline: "border border-white/20 text-gray-300",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 rounded-full",
    md: "text-xs px-2.5 py-1 rounded-full",
  };

  const dotColors = {
    purple: "bg-purple-400",
    green: "bg-green-400",
    red: "bg-red-400",
    yellow: "bg-yellow-400",
    blue: "bg-blue-400",
    orange: "bg-orange-400",
    gray: "bg-gray-400",
    outline: "bg-gray-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
