// ============================================
// User Types
// ============================================
export type UserRole = "customer" | "restaurant" | "driver" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
}

export interface Customer extends User {
  role: "customer";
  addresses: Address[];
  loyaltyPoints: number;
  walletBalance: number;
  referralCode: string;
}

export interface Driver extends User {
  role: "driver";
  vehicleType: string;
  vehiclePlate: string;
  isOnline: boolean;
  rating: number;
  totalDeliveries: number;
  earnings: number;
  location?: { lat: number; lng: number };
}

// ============================================
// Restaurant Types
// ============================================
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  coverImage?: string;
  logo?: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  isFeatured: boolean;
  address: string;
  location: { lat: number; lng: number };
  categories: Category[];
  priceRange: "$" | "$$" | "$$$" | "$$$$";
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  restaurantId?: string;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isPopular: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  preparationTime: number;
  calories?: number;
  tags: string[];
  customizations?: Customization[];
}

export interface Customization {
  id: string;
  name: string;
  type: "single" | "multiple";
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

// ============================================
// Order Types
// ============================================
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  driverId?: string;
  restaurant: Restaurant;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: Address;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  estimatedDelivery: Date;
  deliveredAt?: Date;
  notes?: string;
}

export interface OrderItem {
  id: string;
  foodItem: FoodItem;
  quantity: number;
  price: number;
  customizations?: string[];
}

// ============================================
// Address & Location
// ============================================
export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  lat?: number;
  lng?: number;
  isDefault?: boolean;
}

// ============================================
// Payment Types
// ============================================
export type PaymentMethod = "card" | "wallet" | "cash" | "upi";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
  createdAt: Date;
}

// ============================================
// Review Types
// ============================================
export interface Review {
  id: string;
  userId: string;
  user: Pick<User, "name" | "avatar">;
  restaurantId: string;
  foodItemId?: string;
  orderId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  helpfulCount: number;
}

// ============================================
// Coupon & Promotions
// ============================================
export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrder: number;
  maximumDiscount?: number;
  expiresAt: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

// ============================================
// Notification
// ============================================
export type NotificationType =
  | "order"
  | "promotion"
  | "system"
  | "payment"
  | "delivery";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  action?: { label: string; href: string };
}

// ============================================
// Cart Types
// ============================================
export interface CartItem {
  id: string;
  foodItem: FoodItem;
  restaurant: Pick<Restaurant, "id" | "name" | "image" | "deliveryFee">;
  quantity: number;
  customizations?: string[];
  totalPrice: number;
}

// ============================================
// Analytics Types
// ============================================
export interface AnalyticsData {
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
  growth: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  value2?: number;
}

// ============================================
// Wallet
// ============================================
export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  createdAt: Date;
  balance: number;
}

// ============================================
// Loyalty
// ============================================
export interface LoyaltyTier {
  name: string;
  minPoints: number;
  maxPoints?: number;
  color: string;
  benefits: string[];
}
