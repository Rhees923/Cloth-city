export type Gender = 'men' | 'women' | 'unisex';

export type Category = 
  | 'oversized-tshirts'
  | 'graphic-tshirts'
  | 'plain-tshirts'
  | 'shirts'
  | 'jeans'
  | 'pants-cargos'
  | 'shorts'
  | 'coords'
  | 'hoodies'
  | 'caps-accessories'
  | 'ethnicwear'
  | 'sportswear';

export type KeralaCollection = 
  | 'college-wear'
  | 'weekend-fits'
  | 'monsoon-essentials'
  | 'summer-comfort'
  | 'minimal-streetwear'
  | 'oversized-collection'
  | 'everyday-kerala'
  | 'onam-festive'
  | 'black-white'
  | 'new-gen-fits'
  | 'under-499'
  | 'under-999';

export type FitType = 'Oversized' | 'Drop-Shoulder' | 'Boxy' | 'Relaxed' | 'Baggy' | 'Straight' | 'Regular';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductVariant {
  id: string;
  size: Size;
  colorName: string;
  colorHex: string;
  stock: number;
  sku: string;
}

export interface Review {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
  fitFeedback?: 'Runs small' | 'True to size' | 'Runs large' | 'Perfect oversized drape';
  helpfulVotes?: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  sku?: string;
  price: number;
  mrp: number;
  gender: Gender;
  category: Category;
  collections: KeralaCollection[];
  fitType: FitType;
  fabric: string; // e.g., '100% Breathable Heavyweight Cotton (240 GSM)'
  careInstructions: string;
  description: string;
  highlights: string[];
  images: string[];
  videoUrl?: string;
  has360View?: boolean;
  modelStats?: {
    height: string;
    wearingSize: Size;
    fitDrape: string;
  };
  customizationSupported?: boolean;
  variants: ProductVariant[];
  availableColors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: Size;
  selectedColor: string;
  quantity: number;
  price: number;
  customText?: string;
  customPrintPosition?: 'front' | 'back' | 'chest';
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  alternativePhone?: string;
  street: string;
  locality: string;
  city: string;
  district: string;
  state: string; // Defaults to Kerala
  pincode: string;
  addressType: 'home' | 'work' | 'other';
  isDefault: boolean;
}

export type OrderStatus = 
  | 'Order Placed'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested'
  | 'Returned'
  | 'Refund Processing'
  | 'Refunded';

export interface OrderItemSnapshot {
  productId: string;
  title: string;
  image: string;
  size: Size;
  color: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  customText?: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
  location?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItemSnapshot[];
  itemTotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  orderStatus: OrderStatus;
  timeline: OrderTimelineEvent[];
  courierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDeliveryDate: string;
  invoiceNumber: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  validUntil: string;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  loyaltyPoints: number;
  referralCode: string;
  savedSizes?: { top: Size; bottom: string };
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

export interface KeralaDistrictPincode {
  pincode: string;
  district: string;
  locality: string;
  deliveryDays: number;
  codAvailable: boolean;
  expressAvailable: boolean;
}

