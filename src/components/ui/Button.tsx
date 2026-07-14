"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "glass";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  loading?: boolean;
  glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      glow = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden select-none active:scale-95 active:duration-75";

    const variants = {
      primary:
        "bg-gradient-to-r from-[#9D5CFF] to-[#EC4899] text-white shadow-lg hover:shadow-[0_0_20px_rgba(157,92,255,0.35)] hover:-translate-y-0.5",
      secondary:
        "bg-white/[0.04] text-white border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.08]",
      ghost: "text-gray-300 hover:text-white hover:bg-white/5",
      outline:
        "border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 hover:border-purple-300",
      danger:
        "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25",
      glass:
        "bg-white/5 backdrop-blur-[40px] border border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.06)]",
    };

    const sizes = {
      sm: "h-8 px-4 text-xs gap-1.5",
      md: "h-10 px-6 text-sm gap-2",
      lg: "h-12 px-8 text-base gap-2",
      xl: "h-14 px-10 text-lg gap-2.5",
      icon: "h-10 w-10 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glow && variant === "primary" && "animate-glow-pulse",
          className
        )}
        {...props}
      >
        {/* Shimmer overlay for primary */}
        {variant === "primary" && (
          <span className="absolute inset-0 -translate-x-full hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
        )}
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
