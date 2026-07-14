"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, leftIcon, rightIcon, inputClassName, ...props },
    ref
  ) => {
    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-12 rounded-2xl px-4 text-sm",
              "bg-white/[0.04] border border-white/[0.08] text-white",
              "placeholder:text-gray-600",
              "transition-all duration-200",
              "focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06]",
              "focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1),0_0_20px_rgba(139,92,246,0.1)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500/50 focus:border-red-500/70",
              inputClassName
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
