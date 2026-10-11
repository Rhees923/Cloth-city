import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Address,
  Order,
  Coupon,
  User,
  ContactMessage,
  KeralaDistrictPincode,
  Size,
  OrderStatus,
  Review
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  KERALA_PINCODES
} from '../data/initialData';

interface StoreContextType {
  // Navigation & View state
  currentPage: string;
  navigateTo: (page: string, params?: Record<string, string>) => void;
  pageParams: Record<string, string>;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'reviews' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateStock: (productId: string, variantId: string, newStock: number) => void;
  addProductReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  moderateReview: (productId: string, reviewId: string, status: 'approved' | 'rejected') => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    size: Size,
    color: string,
    quantity?: number,
    customText?: string,
    customPrintPosition?: 'front' | 'back' | 'chest'
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  freeShippingThreshold: number;
  deliveryFee: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalPayableAmount: number;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (id: string) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Authentication & Profile
  currentUser: User | null;
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  defaultAddress: Address | null;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    address: Address;
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, courier?: string, trackingNumber?: string) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  requestReturn: (orderId: string, reason: string) => void;

  // Kerala Pincode Deliverability
  selectedPincode: KeralaDistrictPincode | null;
  checkPincode: (pin: string) => KeralaDistrictPincode | null;
  setSelectedPincode: (pinData: KeralaDistrictPincode | null) => void;

  // Coupons Admin
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (code: string) => void;

  // Contact / Support
  enquiries: ContactMessage[];
  submitEnquiry: (enquiry: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;

  // UI Drawers / Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPinModalOpen: boolean;
  setIsPinModalOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  activeInvoiceOrder: Order | null;
  setActiveInvoiceOrder: (order: Order | null) => void;
  isCustomizerModalOpen: boolean;
  setIsCustomizerModalOpen: (open: boolean) => void;
  isAiStylistOpen: boolean;
  setIsAiStylistOpen: (open: boolean) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;

  // Global Toast / Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigateTo = (page: string, params: Record<string, string> = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products state (persisted)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('clothcity_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('clothcity_products', JSON.stringify(products));
  }, [products]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('clothcity_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('clothcity_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('clothcity_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['cc-prod-001', 'cc-prod-003'];
  });

  useEffect(() => {
    localStorage.setItem('clothcity_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('clothcity_recently_viewed');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['cc-prod-001', 'cc-prod-002'];
  });

  useEffect(() => {
    localStorage.setItem('clothcity_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 8);
    });
  };

  // Auth User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('clothcity_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default logged in demo customer
    return {
      id: 'user-001',
      name: 'Anandhu Mohan',
      email: 'anandhu.mohan@example.com',
      phone: '+91 98471 23456',
      role: 'customer',
      loyaltyPoints: 450,
      referralCode: 'CLOTH-ANANDHU-0484',
      savedSizes: { top: 'L', bottom: '32 / L' },
      createdAt: '2026-08-01'
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('clothcity_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('clothcity_user');
    }
  }, [currentUser]);

  // Addresses state
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('clothcity_addresses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'addr-01',
        fullName: 'Anandhu Mohan',
        phone: '+91 98471 23456',
        street: 'Flat 4B, Skyline Ivy League, Seaport-Airport Road',
        locality: 'Kakkanad near Infopark',
        city: 'Kochi',
        district: 'Ernakulam',
        state: 'Kerala',
        pincode: '682024',
        addressType: 'home',
        isDefault: true
      },
      {
        id: 'addr-02',
        fullName: 'Anandhu Mohan',
        phone: '+91 98471 23456',
        street: 'Door No. 12/480, Beach Road',
        locality: 'Near SM Street & Corporation Office',
        city: 'Kozhikode',
        district: 'Kozhikode',
        state: 'Kerala',
        pincode: '673001',
        addressType: 'work',
        isDefault: false
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('clothcity_addresses', JSON.stringify(addresses));
  }, [addresses]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('clothcity_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('clothcity_orders', JSON.stringify(orders));
  }, [orders]);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('clothcity_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COUPONS;
  });

  useEffect(() => {
    localStorage.setItem('clothcity_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Enquiries / Messages
  const [enquiries, setEnquiries] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('clothcity_enquiries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'msg-01',
        name: 'Rahul K. Varghese',
        email: 'rahul.k@cusat.ac.in',
        phone: '+91 94470 11223',
        subject: 'Bulk order inquiry for College Fest in CUSAT Kalamassery',
        message: 'Hi team ClothCity, our college department wants 60 custom oversized drop shoulder tees for our upcoming tech fest. Can you provide custom back print?',
        date: '2026-10-10',
        status: 'unread'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('clothcity_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  // Selected Kerala PIN code
  const [selectedPincode, setSelectedPincode] = useState<KeralaDistrictPincode | null>(() => {
    const saved = localStorage.getItem('clothcity_pincode');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return KERALA_PINCODES[0]; // Kochi default
  });

  useEffect(() => {
    if (selectedPincode) {
      localStorage.setItem('clothcity_pincode', JSON.stringify(selectedPincode));
    }
  }, [selectedPincode]);

  // Coupon applied
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals & UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);
  const [isCustomizerModalOpen, setIsCustomizerModalOpen] = useState(false);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Calculations
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 999;
  
  // Shipping calculation: Free if >= 999 or coupon FREESHIP, else ₹60 standard Kerala delivery
  const isFreeShipCoupon = appliedCoupon?.code === 'FREESHIP';
  const deliveryFee = cart.length === 0 ? 0 : cartTotal >= freeShippingThreshold || isFreeShipCoupon ? 0 : 60;

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon && appliedCoupon.code !== 'FREESHIP') {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = Math.round((cartTotal * appliedCoupon.discountValue) / 100);
      discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const finalPayableAmount = Math.max(0, cartTotal - discountAmount + deliveryFee);

  // Cart operations
  const addToCart = (
    product: Product,
    size: Size,
    color: string,
    quantity = 1,
    customText?: string,
    customPrintPosition?: 'front' | 'back' | 'chest'
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color &&
          item.customText === customText
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      const newItem: CartItem = {
        cartItemId: `${product.id}-${size}-${color}-${Date.now()}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
        price: product.price,
        customText,
        customPrintPosition
      };
      return [...prev, newItem];
    });

    showToast(`Added ${product.title} (${size}) to your bag!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === clean && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (cartTotal < found.minOrderValue) {
      return {
        success: false,
        message: `Coupon requires minimum order value of ₹${found.minOrderValue}`
      };
    }
    setAppliedCoupon(found);
    showToast(`Applied ${found.code} successfully!`);
    return { success: true, message: `Applied ${found.code} successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Authentication
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const isSpecialAdmin = email.toLowerCase().includes('admin') || role === 'admin';
    const user: User = {
      id: isSpecialAdmin ? 'admin-001' : `user-${Date.now().toString().slice(-4)}`,
      name: isSpecialAdmin ? 'ClothCity Store Admin' : email.split('@')[0].replace('.', ' '),
      email,
      phone: '+91 98470 54321',
      role: isSpecialAdmin ? 'admin' : 'customer',
      loyaltyPoints: isSpecialAdmin ? 1000 : 250,
      referralCode: isSpecialAdmin ? 'CCADMIN' : `CCKER${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.');
    if (currentPage.startsWith('admin') || currentPage.startsWith('account')) {
      navigateTo('home');
    }
  };

  const updateProfile = (name: string, phone: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name,
        phone
      });
      showToast('Profile updated successfully.');
    }
  };

  // Addresses
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    showToast('Address added successfully.');
  };

  const updateAddress = (updated: Address) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === updated.id) return updated;
        if (updated.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
    showToast('Address updated.');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed.');
  };

  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0] || null;

  // Kerala Pincodes
  const checkPincode = (pin: string) => {
    const match = KERALA_PINCODES.find((k) => k.pincode === pin.trim());
    return match || null;
  };

  // Orders
  const placeOrder = (data: {
    address: Address;
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => {
    const orderNum = `CC-KER-${Math.floor(10000 + Math.random() * 90000)}`;
    const invoiceNum = `INV-2026-KL-${Math.floor(1000 + Math.random() * 9000)}`;

    const deliveryDays = selectedPincode?.deliveryDays || 2;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);
    const estDateString = estDate.toISOString().split('T')[0];

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      userId: currentUser?.id,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingAddress: data.address,
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        image: item.product.images[0],
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        unitPrice: item.price,
        subtotal: item.price * item.quantity
      })),
      itemTotal: cartTotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      deliveryFee,
      totalAmount: finalPayableAmount,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Order Placed',
      courierName: 'DTDC Kerala Express',
      trackingNumber: `DTDC-KER-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDeliveryDate: estDateString,
      invoiceNumber: invoiceNum,
      timeline: [
        {
          status: 'Order Placed',
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          description: `Order successfully placed via ClothCity (${data.paymentMethod})`
        },
        ...(data.paymentMethod !== 'COD'
          ? [
              {
                status: 'Payment Confirmed' as OrderStatus,
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                description: `Payment authorized via Razorpay Gateway (${data.paymentMethod})`
              }
            ]
          : [])
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItemForProduct = cart.filter((c) => c.product.id === prod.id);
        if (cartItemForProduct.length === 0) return prod;

        const updatedVariants = prod.variants.map((v) => {
          const match = cartItemForProduct.find((c) => c.selectedSize === v.size && c.selectedColor === v.colorName);
          if (match) {
            return { ...v, stock: Math.max(0, v.stock - match.quantity) };
          }
          return v;
        });

        return { ...prod, variants: updatedVariants };
      })
    );

    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, courier?: string, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          const updatedTimeline = [
            ...o.timeline,
            {
              status,
              timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              description: `Status updated to ${status} by ClothCity Operations Hub`
            }
          ];
          return {
            ...o,
            orderStatus: status,
            timeline: updatedTimeline,
            ...(courier ? { courierName: courier } : {}),
            ...(trackingNumber ? { trackingNumber } : {}),
            ...(status === 'Delivered' && o.paymentMethod === 'COD' ? { paymentStatus: 'Paid' } : {})
          };
        }
        return o;
      })
    );
    showToast(`Order status updated to ${status}.`);
  };

  const cancelOrder = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          return {
            ...o,
            orderStatus: 'Cancelled',
            timeline: [
              ...o.timeline,
              {
                status: 'Cancelled',
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                description: `Order cancelled by customer. Reason: ${reason}`
              }
            ]
          };
        }
        return o;
      })
    );
    showToast('Order cancelled.');
  };

  const requestReturn = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          return {
            ...o,
            orderStatus: 'Return Requested',
            timeline: [
              ...o.timeline,
              {
                status: 'Return Requested',
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                description: `Return requested by customer. Reason: ${reason}`
              }
            ]
          };
        }
        return o;
      })
    );
    showToast('Return request submitted. Our Kerala pickup executive will contact you.');
  };

  // Product mutations for Admin
  const addProduct = (data: Omit<Product, 'id' | 'createdAt' | 'reviews' | 'rating' | 'reviewCount'>) => {
    const newProd: Product = {
      ...data,
      id: `cc-prod-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      reviews: [],
      rating: 5.0,
      reviewCount: 0
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast('New product created successfully!');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Product updated successfully.');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product archived.');
  };

  const updateStock = (productId: string, variantId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            variants: p.variants.map((v) => (v.id === variantId ? { ...v, stock: newStock } : v))
          };
        }
        return p;
      })
    );
    showToast('Stock count updated.');
  };

  const addProductReview = (productId: string, reviewData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'approved'
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const newAvg = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvg,
            reviewCount: updatedReviews.length
          };
        }
        return p;
      })
    );
    showToast('Thank you! Your verified review has been published.');
  };

  const moderateReview = (productId: string, reviewId: string, status: 'approved' | 'rejected') => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            reviews: p.reviews.map((r) => (r.id === reviewId ? { ...r, status } : r))
          };
        }
        return p;
      })
    );
    showToast(`Review status set to ${status}.`);
  };

  // Coupons Admin
  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon ${newCoupon.code} created!`);
  };

  const toggleCouponActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  // Contact Enquiries
  const submitEnquiry = (data: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'unread'
    };
    setEnquiries((prev) => [newMsg, ...prev]);
    showToast('Thank you! Your message has been received. Our team will contact you soon.');
  };

  const updateEnquiryStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        navigateTo,
        pageParams,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        addProductReview,
        moderateReview,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        freeShippingThreshold,
        deliveryFee,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalPayableAmount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        login,
        logout,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        defaultAddress,
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        cancelOrder,
        requestReturn,
        selectedPincode,
        checkPincode,
        setSelectedPincode,
        coupons,
        addCoupon,
        toggleCouponActive,
        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        isCartOpen,
        setIsCartOpen,
        isPinModalOpen,
        setIsPinModalOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        activeInvoiceOrder,
        setActiveInvoiceOrder,
        recentlyViewed,
        addToRecentlyViewed,
        isCustomizerModalOpen,
        setIsCustomizerModalOpen,
        isAiStylistOpen,
        setIsAiStylistOpen,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
