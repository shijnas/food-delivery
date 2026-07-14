"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glow" | "hover" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", padding = "md", children, ...props },
    ref
  ) => {
    const variants = {
      default: "liquid-glass",
      glass: "liquid-glass",
      glow: "liquid-glass border border-purple-500/20 hover:border-purple-500/40 shadow-[0_0_20px_rgba(157,92,255,0.15)]",
      hover: "liquid-glass card-hover",
      flat: "liquid-glass",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-3xl", variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
