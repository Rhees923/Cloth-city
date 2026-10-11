import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Tag, 
  RotateCcw, 
  Bell, 
  FileText, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

export const AccountView: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    logout,
    orders,
    addresses,
    addAddress,
    deleteAddress,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    coupons,
    cancelOrder,
    requestReturn,
    setActiveInvoiceOrder,
    setIsInvoiceModalOpen,
    navigateTo,
    pageParams,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<string>(pageParams?.tab || 'orders');
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');

  // Return / Cancellation modal states
  const [activeReturnOrder, setActiveReturnOrder] = useState<Order | null>(null);
  const [returnReason, setReturnReason] = useState('Fit too loose / want size exchange');
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  // Track order modal states
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<Order | null>(
    orders.find((o) => o.id === pageParams?.orderId || o.orderNumber === pageParams?.orderId) || orders[0] || null
  );

  // Address form modal
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    street: '',
    locality: '',
    city: 'Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    pincode: '682001',
    addressType: 'home' as const,
    isDefault: false
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileName, profilePhone);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddr);
    setIsAddingAddress(false);
  };

  const handleConfirmReturn = () => {
    if (activeReturnOrder) {
      requestReturn(activeReturnOrder.id, returnReason);
      setIsReturnModalOpen(false);
      setActiveReturnOrder(null);
    }
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Account Hero Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-[#B4F724] font-display font-black text-2xl flex items-center justify-center shadow-md">
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-zinc-950">
              {currentUser?.name || 'Guest Customer'}
            </h1>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              {currentUser?.email} · Kerala Fashion Insider
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('shop')}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            Explore Catalogue
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 border border-zinc-200 hover:border-red-300 text-xs font-semibold text-red-600 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Nav Tabs */}
        <div className="space-y-1 bg-white p-3 rounded-3xl border border-zinc-200 h-fit">
          {[
            { id: 'orders', label: 'My Orders & Tracking', icon: Package },
            { id: 'profile', label: 'Profile Details', icon: User },
            { id: 'addresses', label: 'Manage Addresses', icon: MapPin },
            { id: 'wishlist', label: 'Wishlist & Saved', icon: Heart, count: wishlist.length },
            { id: 'coupons', label: 'Coupons & Vouchers', icon: Tag },
            { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
            { id: 'notifications', label: 'Preferences', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  active 
                    ? 'bg-zinc-950 text-white shadow-sm' 
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-[#B4F724]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    active ? 'bg-zinc-800 text-[#B4F724]' : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Tab Container */}
        <div className="lg:col-span-3">

          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-extrabold text-zinc-900">
                  Your Orders ({orders.length})
                </h2>
                <span className="text-xs text-zinc-500">
                  Real-time Kerala logistics updates
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200">
                  <Package className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                  <h3 className="font-bold text-sm text-zinc-800">No orders placed yet</h3>
                  <p className="text-xs text-zinc-500 mt-1 mb-4">
                    Explore our trending oversized fits and enjoy free Kerala shipping!
                  </p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div 
                    key={order.id}
                    className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden"
                  >
                    {/* Order Head */}
                    <div className="p-4 sm:p-5 bg-zinc-50 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-zinc-900">{order.orderNumber}</span>
                        <span className="text-zinc-400 ml-2">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold ${
                          order.orderStatus === 'Delivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : order.orderStatus === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-zinc-200 text-zinc-800'
                        }`}>
                          {order.orderStatus}
                        </span>
                        <button
                          onClick={() => {
                            setActiveInvoiceOrder(order);
                            setIsInvoiceModalOpen(true);
                          }}
                          className="flex items-center gap-1 text-xs font-bold text-zinc-700 hover:text-black cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 sm:p-6 divide-y divide-zinc-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-20 object-cover rounded-xl bg-zinc-100 shrink-0"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                              </p>
                              <p className="text-xs font-extrabold text-zinc-900 mt-1">
                                ₹{item.unitPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer & Actions */}
                    <div className="p-4 sm:p-5 bg-zinc-50/50 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-zinc-600">
                        <span>Courier: <strong>{order.courierName || 'DTDC Kerala'}</strong> · AWB: <strong>{order.trackingNumber}</strong></span>
                        <span className="block text-[11px] text-zinc-500 mt-0.5">
                          Delivery to: {order.shippingAddress.locality}, {order.shippingAddress.district}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedTrackOrder(order)}
                          className="px-4 py-2 bg-zinc-950 text-white hover:bg-black text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#B4F724]" />
                          <span>Track Delivery</span>
                        </button>

                        {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
                          <button
                            onClick={() => cancelOrder(order.id, 'Customer requested cancellation')}
                            className="px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}

                        {order.orderStatus === 'Delivered' && (
                          <button
                            onClick={() => {
                              setActiveReturnOrder(order);
                              setIsReturnModalOpen(true);
                            }}
                            className="px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-black cursor-pointer"
                          >
                            Exchange / Return
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm">
              <h2 className="text-lg font-display font-extrabold text-zinc-900 mb-6">
                Customer Profile
              </h2>
              <form onSubmit={handleProfileSave} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-zinc-50 text-xs text-zinc-900 p-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    disabled
                    className="w-full bg-zinc-100 text-xs text-zinc-500 p-3 rounded-xl border border-zinc-200 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-zinc-50 text-xs text-zinc-900 p-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white hover:bg-zinc-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-extrabold text-zinc-900">
                  Manage Addresses ({addresses.length})
                </h2>
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {isAddingAddress && (
                <form onSubmit={handleCreateAddress} className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase">New Address Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street / Building"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    className="w-full bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Locality"
                      value={newAddr.locality}
                      onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                      className="bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                      required
                    />
                    <input
                      type="text"
                      placeholder="PIN Code"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      className="bg-zinc-50 text-xs p-2.5 rounded-xl border border-zinc-200"
                      required
                    />
                  </div>
                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 text-xs font-semibold text-zinc-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-zinc-900">{addr.fullName}</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-100 rounded text-zinc-700">
                          {addr.addressType}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {addr.street}, {addr.locality}, {addr.city}, {addr.district} - <strong>{addr.pincode}</strong>
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">Phone: {addr.phone}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                      {addr.isDefault ? (
                        <span className="text-[11px] font-bold text-emerald-700">Default Shipping Address</span>
                      ) : <div />}
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="text-lg font-display font-extrabold text-zinc-900">
                Your Saved Wishlist ({wishlistProducts.length})
              </h2>
              {wishlistProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200">
                  <Heart className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                  <h3 className="font-bold text-sm text-zinc-800">Your wishlist is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 mb-4">
                    Tap the heart icon on any oversized tee or cargo pants to save them here!
                  </p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden flex flex-col justify-between">
                      <img src={p.images[0]} alt={p.title} className="w-full aspect-[4/5] object-cover" />
                      <div className="p-3">
                        <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">{p.title}</h4>
                        <p className="text-xs font-extrabold text-zinc-900 mt-1">₹{p.price}</p>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => addToCart(p, p.variants[0].size, p.availableColors[0].name, 1)}
                            className="flex-1 py-1.5 bg-black text-white text-[11px] font-bold rounded-lg cursor-pointer"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg border border-zinc-200 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <h2 className="text-lg font-display font-extrabold text-zinc-900">
                Your Exclusive Kerala Coupons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coupons.map((coupon) => (
                  <div key={coupon.code} className="p-5 bg-white rounded-3xl border border-zinc-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-black text-base tracking-wider text-black bg-[#B4F724] px-2.5 py-1 rounded-lg">
                        {coupon.code}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-semibold">
                        Exp: {coupon.validUntil}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-700 font-medium mt-2">{coupon.description}</p>
                    <p className="text-[11px] text-zinc-400 mt-1">Min. order ₹{coupon.minOrderValue}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                        showToast(`Coupon code ${coupon.code} copied!`);
                      }}
                      className="mt-4 w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 rounded-xl transition-colors cursor-pointer"
                    >
                      Copy Voucher Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
              <h2 className="text-lg font-display font-extrabold text-zinc-900">
                Communication Preferences
              </h2>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 cursor-pointer">
                  <span>WhatsApp tracking and dispatch alerts</span>
                  <input type="checkbox" defaultChecked className="rounded text-black" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 cursor-pointer">
                  <span>SMS updates on out-for-delivery status</span>
                  <input type="checkbox" defaultChecked className="rounded text-black" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 cursor-pointer">
                  <span>Kerala festival secret drops & student discounts email</span>
                  <input type="checkbox" defaultChecked className="rounded text-black" />
                </label>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* TRACK ORDER DETAIL MODAL */}
      {selectedTrackOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTrackOrder(null)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h3 className="font-display font-bold text-base text-zinc-900">
                    Live Tracking: {selectedTrackOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Dispatched via {selectedTrackOrder.courierName || 'DTDC Kerala Express'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTrackOrder(null)}
                  className="p-1.5 text-zinc-400 hover:text-black rounded-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Courier info card */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                <div>
                  <p className="text-zinc-500">AWB Tracking Number</p>
                  <p className="font-bold text-zinc-900 mt-0.5">{selectedTrackOrder.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Est. Arrival</p>
                  <p className="font-bold text-emerald-700 mt-0.5">{selectedTrackOrder.estimatedDeliveryDate}</p>
                </div>
              </div>

              {/* Timeline Progress */}
              <div className="mt-6 space-y-4">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Shipment Progression Timeline
                </p>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                  {selectedTrackOrder.timeline.map((event, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-zinc-900 ring-4 ring-white" />
                      <div className="text-xs">
                        <span className="font-bold text-zinc-950">{event.status}</span>
                        <span className="text-zinc-400 text-[11px] ml-2">{event.timestamp}</span>
                        <p className="text-zinc-600 mt-0.5">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-end">
                <button
                  onClick={() => setSelectedTrackOrder(null)}
                  className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RETURN / EXCHANGE MODAL */}
      {isReturnModalOpen && activeReturnOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsReturnModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 animate-in zoom-in-95 duration-150">
              <h3 className="font-display font-bold text-base text-zinc-900 mb-1">
                Return or Exchange Request
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                Order: {activeReturnOrder.orderNumber} · 7-Day Doorstep Pickup
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                    Select Reason
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 text-xs"
                  >
                    <option value="Fit too loose / want size exchange">Fit too loose / want size exchange</option>
                    <option value="Fit too tight / want size exchange">Fit too tight / want size exchange</option>
                    <option value="Fabric / color differed from expectation">Fabric / color differed from expectation</option>
                    <option value="Defect or stitching issue">Defect or stitching issue</option>
                  </select>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl text-zinc-600 text-xs">
                  Doorstep pickup will be scheduled at your registered address ({activeReturnOrder.shippingAddress.locality}, {activeReturnOrder.shippingAddress.district}).
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setIsReturnModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReturn}
                  className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
