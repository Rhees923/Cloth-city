import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    freeShippingThreshold,
    deliveryFee,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalPayableAmount,
    navigateTo
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingDifference = Math.max(0, freeShippingThreshold - cartTotal);
  const freeShippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError(null);
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="font-display font-bold text-lg text-zinc-900">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-zinc-50 p-3 sm:px-5 border-b border-zinc-200 text-xs">
            {freeShippingDifference > 0 && !appliedCoupon?.code.includes('FREESHIP') ? (
              <div>
                <p className="text-zinc-700 font-medium flex items-center justify-between mb-1.5">
                  <span>Add <strong className="text-zinc-950 font-bold">₹{freeShippingDifference}</strong> more for Free Kerala Delivery</span>
                  <Truck className="w-4 h-4 text-zinc-600" />
                </p>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-zinc-900 h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>You unlocked FREE Express Delivery anywhere in Kerala!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-zinc-900">Your bag is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explore our trending oversized fits, cargos, and modern Kerala festival collections.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-5 py-2.5 bg-black text-white hover:bg-zinc-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Explore Trending Fits
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.cartItemId}
                  className="flex gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-xl bg-zinc-200 shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product-detail', { id: item.product.id });
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('product-detail', { id: item.product.id });
                          }}
                          className="text-xs font-bold text-zinc-900 hover:text-black line-clamp-1 cursor-pointer"
                        >
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500 font-medium">
                        <span className="bg-white px-2 py-0.5 rounded border border-zinc-200">
                          Size: {item.selectedSize}
                        </span>
                        <span className="truncate max-w-[110px]">
                          {item.selectedColor}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200/60">
                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="text-zinc-500 hover:text-black cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold tabular-nums w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="text-zinc-500 hover:text-black cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-zinc-900 tabular-nums">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.product.mrp > item.price && (
                          <span className="block text-[10px] text-zinc-400 line-through tabular-nums">
                            ₹{item.product.mrp * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-200 bg-white space-y-4">
              
              {/* Coupon Section */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-zinc-100 rounded-xl border border-zinc-300 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-zinc-900" />
                      <div>
                        <span className="font-bold text-zinc-900">{appliedCoupon.code}</span>
                        <span className="text-zinc-500 text-[11px] ml-1.5">(-₹{discountAmount})</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-zinc-500 hover:text-red-600 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter coupon (e.g. KERALA20)"
                        className="flex-1 bg-zinc-50 text-xs text-zinc-900 uppercase font-semibold px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-600 pl-1">{couponError}</p>
                    )}
                    <div className="flex gap-1.5 text-[10px] text-zinc-500 pl-1">
                      <span>Try:</span>
                      <button 
                        type="button" 
                        onClick={() => applyCoupon('KERALA20')} 
                        className="font-bold text-zinc-800 hover:underline cursor-pointer"
                      >
                        KERALA20
                      </button>
                      <span>·</span>
                      <button 
                        type="button" 
                        onClick={() => applyCoupon('CLOTH10')} 
                        className="font-bold text-zinc-800 hover:underline cursor-pointer"
                      >
                        CLOTH10
                      </button>
                      <span>·</span>
                      <button 
                        type="button" 
                        onClick={() => applyCoupon('FREESHIP')} 
                        className="font-bold text-zinc-800 hover:underline cursor-pointer"
                      >
                        FREESHIP
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 pt-2 border-t border-zinc-100">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">₹{cartTotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span className="font-bold tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Kerala Delivery Charge</span>
                  <span className="font-semibold tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-base">₹{finalPayableAmount}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                <span>Secure SSL checkout · Razorpay UPI & COD Supported</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
