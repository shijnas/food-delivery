import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = "INR"
): string {
  const scaledAmount = Math.round(amount * 30);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(scaledAmount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    confirmed: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    preparing: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    ready: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    picked_up: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    on_the_way: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    delivered: "text-green-400 bg-green-400/10 border-green-400/20",
    cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
  };
  return colors[status] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
}

export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    preparing: "Preparing",
    ready: "Ready",
    picked_up: "Picked Up",
    on_the_way: "On the Way",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function calculateDiscount(
  originalPrice: number,
  discountedPrice: number
): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}
