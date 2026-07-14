import {
  Restaurant,
  FoodItem,
  Order,
  Review,
  Coupon,
  Notification,
  Category,
} from "@/types";

// ============================================
// CATEGORIES
// ============================================
export const mockCategories: Category[] = [
  { id: "1", name: "Pizza", icon: "🍕" },
  { id: "2", name: "Burgers", icon: "🍔" },
  { id: "3", name: "Sushi", icon: "🍱" },
  { id: "4", name: "Pasta", icon: "🍝" },
  { id: "5", name: "Tacos", icon: "🌮" },
  { id: "6", name: "Salads", icon: "🥗" },
  { id: "7", name: "Desserts", icon: "🍰" },
  { id: "8", name: "Drinks", icon: "🧋" },
  { id: "9", name: "Ramen", icon: "🍜" },
  { id: "10", name: "Wings", icon: "🍗" },
  { id: "11", name: "Healthy", icon: "🥑" },
  { id: "12", name: "BBQ", icon: "🔥" },
];

// ============================================
// RESTAURANTS
// ============================================
export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Bliss",
    slug: "burger-bliss",
    description:
      "Crafted smash burgers with fresh ingredients and secret sauces. The best burgers in town.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
    cuisine: ["American", "Burgers", "Fast Food"],
    rating: 4.8,
    reviewCount: 2341,
    deliveryTime: "20-30",
    deliveryFee: 1.99,
    minimumOrder: 15,
    isOpen: true,
    isFeatured: true,
    address: "123 Main St, Downtown",
    location: { lat: 40.7128, lng: -74.006 },
    priceRange: "$$",
    categories: [
      { id: "c1", name: "Signature Burgers", icon: "🍔" },
      { id: "c2", name: "Sides", icon: "🍟" },
      { id: "c3", name: "Drinks", icon: "🥤" },
      { id: "c4", name: "Desserts", icon: "🍦" },
    ],
  },
  {
    id: "2",
    name: "Sakura Sushi",
    slug: "sakura-sushi",
    description:
      "Authentic Japanese sushi crafted by master chefs with premium fish flown in daily from Tokyo.",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=1200&q=80",
    cuisine: ["Japanese", "Sushi", "Asian"],
    rating: 4.9,
    reviewCount: 1876,
    deliveryTime: "35-50",
    deliveryFee: 3.99,
    minimumOrder: 30,
    isOpen: true,
    isFeatured: true,
    address: "45 Cherry Blossom Ave",
    location: { lat: 40.7589, lng: -73.9851 },
    priceRange: "$$$",
    categories: [
      { id: "c5", name: "Nigiri", icon: "🍣" },
      { id: "c6", name: "Rolls", icon: "🌀" },
      { id: "c7", name: "Sashimi", icon: "🐟" },
      { id: "c8", name: "Hot Food", icon: "🔥" },
    ],
  },
  {
    id: "3",
    name: "Pizza Palace",
    slug: "pizza-palace",
    description:
      "Wood-fired Neapolitan pizzas with imported Italian ingredients. Authentic taste, modern vibe.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
    cuisine: ["Italian", "Pizza", "Mediterranean"],
    rating: 4.7,
    reviewCount: 3102,
    deliveryTime: "25-40",
    deliveryFee: 2.49,
    minimumOrder: 20,
    isOpen: true,
    isFeatured: false,
    address: "78 Napoli Street",
    location: { lat: 40.7282, lng: -73.7949 },
    priceRange: "$$",
    categories: [
      { id: "c9", name: "Classic Pizzas", icon: "🍕" },
      { id: "c10", name: "Gourmet Pizzas", icon: "⭐" },
      { id: "c11", name: "Pasta", icon: "🍝" },
      { id: "c12", name: "Salads", icon: "🥗" },
    ],
  },
  {
    id: "4",
    name: "Taco Fiesta",
    slug: "taco-fiesta",
    description:
      "Authentic Mexican street tacos with homemade salsas and fresh tortillas made in-house daily.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80",
    cuisine: ["Mexican", "Tacos", "Latin"],
    rating: 4.6,
    reviewCount: 987,
    deliveryTime: "20-35",
    deliveryFee: 1.49,
    minimumOrder: 12,
    isOpen: true,
    isFeatured: true,
    address: "200 Fiesta Blvd",
    location: { lat: 40.6892, lng: -74.0445 },
    priceRange: "$",
    categories: [
      { id: "c13", name: "Tacos", icon: "🌮" },
      { id: "c14", name: "Burritos", icon: "🌯" },
      { id: "c15", name: "Nachos", icon: "🧀" },
      { id: "c16", name: "Drinks", icon: "🧃" },
    ],
  },
  {
    id: "5",
    name: "Ramen Republic",
    slug: "ramen-republic",
    description:
      "Rich tonkotsu broths simmered for 24 hours. Experience the depth of authentic Japanese ramen.",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80",
    cuisine: ["Japanese", "Ramen", "Asian"],
    rating: 4.8,
    reviewCount: 1543,
    deliveryTime: "30-45",
    deliveryFee: 2.99,
    minimumOrder: 25,
    isOpen: false,
    isFeatured: false,
    address: "88 Umami Lane",
    location: { lat: 40.7831, lng: -73.9712 },
    priceRange: "$$",
    categories: [
      { id: "c17", name: "Ramen", icon: "🍜" },
      { id: "c18", name: "Sides", icon: "🥟" },
      { id: "c19", name: "Appetizers", icon: "🍡" },
    ],
  },
  {
    id: "6",
    name: "Green Bowl",
    slug: "green-bowl",
    description:
      "Healthy, organic bowls and salads packed with nutrients. Fuel your body the right way.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80",
    cuisine: ["Healthy", "Vegan", "Salads"],
    rating: 4.5,
    reviewCount: 876,
    deliveryTime: "15-25",
    deliveryFee: 0.99,
    minimumOrder: 18,
    isOpen: true,
    isFeatured: false,
    address: "12 Garden Place",
    location: { lat: 40.7614, lng: -73.9776 },
    priceRange: "$$",
    categories: [
      { id: "c20", name: "Bowls", icon: "🥣" },
      { id: "c21", name: "Salads", icon: "🥗" },
      { id: "c22", name: "Smoothies", icon: "🥤" },
      { id: "c23", name: "Wraps", icon: "🌯" },
    ],
  },
];

// ============================================
// FOOD ITEMS
// ============================================
export const mockFoodItems: FoodItem[] = [
  {
    id: "f1",
    restaurantId: "1",
    categoryId: "c1",
    name: "Classic Smash Burger",
    description:
      "Double smash patty, cheddar cheese, secret sauce, pickles, onions on a brioche bun.",
    price: 14.99,
    originalPrice: 18.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    rating: 4.9,
    reviewCount: 843,
    isAvailable: true,
    isPopular: true,
    isVegan: false,
    isSpicy: false,
    preparationTime: 15,
    calories: 680,
    tags: ["bestseller", "new"],
    customizations: [
      {
        id: "cu1",
        name: "Patty",
        type: "single",
        required: true,
        options: [
          { id: "o1", name: "Single", price: 0 },
          { id: "o2", name: "Double", price: 3 },
          { id: "o3", name: "Triple", price: 6 },
        ],
      },
      {
        id: "cu2",
        name: "Add-ons",
        type: "multiple",
        required: false,
        options: [
          { id: "o4", name: "Extra Cheese", price: 1.5 },
          { id: "o5", name: "Bacon", price: 2 },
          { id: "o6", name: "Avocado", price: 2.5 },
        ],
      },
    ],
  },
  {
    id: "f2",
    restaurantId: "1",
    categoryId: "c1",
    name: "BBQ Bacon Crunch",
    description:
      "Crispy fried chicken, smoky BBQ sauce, bacon, coleslaw, and pickled jalapeños.",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80",
    rating: 4.7,
    reviewCount: 621,
    isAvailable: true,
    isPopular: true,
    isVegan: false,
    isSpicy: true,
    preparationTime: 18,
    calories: 820,
    tags: ["spicy", "popular"],
  },
  {
    id: "f3",
    restaurantId: "1",
    categoryId: "c2",
    name: "Truffle Parmesan Fries",
    description:
      "Hand-cut fries tossed in truffle oil, topped with shaved parmesan and fresh herbs.",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
    rating: 4.8,
    reviewCount: 1204,
    isAvailable: true,
    isPopular: true,
    isVegan: true,
    isSpicy: false,
    preparationTime: 10,
    calories: 380,
    tags: ["vegan", "bestseller"],
  },
  {
    id: "f4",
    restaurantId: "2",
    categoryId: "c6",
    name: "Dragon Roll",
    description:
      "Shrimp tempura, cucumber, avocado topped with thinly sliced avocado and spicy mayo.",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80",
    rating: 4.9,
    reviewCount: 754,
    isAvailable: true,
    isPopular: true,
    isVegan: false,
    isSpicy: true,
    preparationTime: 20,
    calories: 420,
    tags: ["popular", "spicy"],
  },
  {
    id: "f5",
    restaurantId: "2",
    categoryId: "c5",
    name: "Salmon Nigiri Set (6pc)",
    description:
      "Premium Atlantic salmon over seasoned sushi rice. Fresh, buttery, and melts in your mouth.",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    rating: 4.8,
    reviewCount: 432,
    isAvailable: true,
    isPopular: false,
    isVegan: false,
    isSpicy: false,
    preparationTime: 15,
    calories: 310,
    tags: ["premium"],
  },
  {
    id: "f6",
    restaurantId: "3",
    categoryId: "c9",
    name: "Margherita Classica",
    description:
      "San Marzano tomato, fresh fior di latte mozzarella, basil, EVOO on a blistered crust.",
    price: 17.99,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    rating: 4.7,
    reviewCount: 1893,
    isAvailable: true,
    isPopular: true,
    isVegan: true,
    isSpicy: false,
    preparationTime: 25,
    calories: 760,
    tags: ["vegetarian", "classic"],
  },
  {
    id: "f7",
    restaurantId: "3",
    categoryId: "c10",
    name: "Truffle & Mushroom",
    description:
      "Black truffle cream, wild mushrooms, fontina cheese, fresh thyme, drizzled with truffle oil.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    rating: 4.9,
    reviewCount: 567,
    isAvailable: true,
    isPopular: true,
    isVegan: false,
    isSpicy: false,
    preparationTime: 28,
    calories: 890,
    tags: ["premium", "gourmet"],
  },
  {
    id: "f8",
    restaurantId: "4",
    categoryId: "c13",
    name: "Carne Asada Street Tacos",
    description:
      "Grilled skirt steak, white onion, cilantro, salsa verde, on double corn tortillas.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    rating: 4.8,
    reviewCount: 934,
    isAvailable: true,
    isPopular: true,
    isVegan: false,
    isSpicy: false,
    preparationTime: 12,
    calories: 520,
    tags: ["bestseller"],
  },
];

// ============================================
// ORDERS
// ============================================
export const mockOrders: Order[] = [
  {
    id: "ord-001",
    customerId: "user-1",
    restaurantId: "1",
    driverId: "driver-1",
    restaurant: mockRestaurants[0],
    items: [
      {
        id: "oi1",
        foodItem: mockFoodItems[0],
        quantity: 2,
        price: 14.99,
      },
      {
        id: "oi2",
        foodItem: mockFoodItems[2],
        quantity: 1,
        price: 7.99,
      },
    ],
    status: "on_the_way",
    subtotal: 37.97,
    deliveryFee: 1.99,
    discount: 5.0,
    total: 34.96,
    address: {
      id: "addr-1",
      label: "Home",
      street: "456 Oak Avenue, Apt 3B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      lat: 40.7488,
      lng: -73.9967,
    },
    couponCode: "FIRST20",
    paymentMethod: "card",
    createdAt: new Date(Date.now() - 1000 * 60 * 25),
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 10),
  },
  {
    id: "ord-002",
    customerId: "user-1",
    restaurantId: "2",
    restaurant: mockRestaurants[1],
    items: [
      {
        id: "oi3",
        foodItem: mockFoodItems[3],
        quantity: 1,
        price: 18.99,
      },
      {
        id: "oi4",
        foodItem: mockFoodItems[4],
        quantity: 1,
        price: 22.99,
      },
    ],
    status: "delivered",
    subtotal: 41.98,
    deliveryFee: 3.99,
    discount: 0,
    total: 45.97,
    address: {
      id: "addr-1",
      label: "Home",
      street: "456 Oak Avenue, Apt 3B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    paymentMethod: "wallet",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    estimatedDelivery: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 45),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 40),
  },
];

// ============================================
// REVIEWS
// ============================================
export const mockReviews: Review[] = [
  {
    id: "rev-1",
    userId: "user-2",
    user: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=5" },
    restaurantId: "1",
    orderId: "ord-x",
    rating: 5,
    comment:
      "Absolutely incredible! The smash burger was perfectly cooked with the right amount of char. The truffle fries are addictive. Delivery was super fast and everything was still hot.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    helpfulCount: 24,
  },
  {
    id: "rev-2",
    userId: "user-3",
    user: { name: "Marcus J.", avatar: "https://i.pravatar.cc/150?img=12" },
    restaurantId: "1",
    orderId: "ord-y",
    rating: 5,
    comment:
      "Best burger in the city, no contest. The secret sauce is incredible. Will be ordering weekly!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    helpfulCount: 18,
  },
  {
    id: "rev-3",
    userId: "user-4",
    user: { name: "Priya K.", avatar: "https://i.pravatar.cc/150?img=9" },
    restaurantId: "1",
    orderId: "ord-z",
    rating: 4,
    comment:
      "Really good food, the BBQ crunch burger was a highlight. Slightly longer delivery than expected but worth the wait.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    helpfulCount: 7,
  },
];

// ============================================
// COUPONS
// ============================================
export const mockCoupons: Coupon[] = [
  {
    id: "coup-1",
    code: "FIRST20",
    description: "20% off your first order",
    discountType: "percentage",
    discountValue: 20,
    minimumOrder: 15,
    maximumDiscount: 10,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    usedCount: 0,
    isActive: true,
  },
  {
    id: "coup-2",
    code: "SAVE5",
    description: "$5 off orders over $30",
    discountType: "fixed",
    discountValue: 5,
    minimumOrder: 30,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    usedCount: 142,
    isActive: true,
  },
  {
    id: "coup-3",
    code: "KAYIKK15",
    description: "15% off any order",
    discountType: "percentage",
    discountValue: 15,
    minimumOrder: 0,
    maximumDiscount: 20,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    usedCount: 0,
    isActive: true,
  },
];

// ============================================
// NOTIFICATIONS
// ============================================
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "order",
    title: "Order on its way! 🛵",
    message:
      "Your order from Burger Bliss is out for delivery. Alex is 10 min away.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    action: { label: "Track Order", href: "/track/ord-001" },
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "promotion",
    title: "🎉 Weekend Special!",
    message: "Get 25% off all Sushi orders this weekend. Use code: SUSHI25",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "notif-3",
    userId: "user-1",
    type: "payment",
    title: "Payment Successful ✅",
    message: "₹1,234 paid for your Sakura Sushi order.",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "notif-4",
    userId: "user-1",
    type: "system",
    title: "🏆 You earned 50 points!",
    message:
      "You've earned 50 loyalty points from your last order. Keep going!",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
];

// ============================================
// ANALYTICS (for dashboards)
// ============================================
export const salesChartData = [
  { label: "Mon", value: 1200, value2: 800 },
  { label: "Tue", value: 1900, value2: 1200 },
  { label: "Wed", value: 1400, value2: 1000 },
  { label: "Thu", value: 2200, value2: 1600 },
  { label: "Fri", value: 3100, value2: 2200 },
  { label: "Sat", value: 3800, value2: 2800 },
  { label: "Sun", value: 2900, value2: 2000 },
];

export const weeklyRevenueData = [
  { label: "Week 1", value: 12400 },
  { label: "Week 2", value: 15600 },
  { label: "Week 3", value: 13200 },
  { label: "Week 4", value: 18900 },
];
