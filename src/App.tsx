/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { InvoiceModal } from './components/checkout/InvoiceModal';
import { SizeGuideModal } from './components/products/SizeGuideModal';
import { PinCheckerModal } from './components/products/PinCheckerModal';
import { AuthModal } from './components/auth/AuthModal';
import { CustomizerModal } from './components/products/CustomizerModal';
import { AiStylistModal } from './components/products/AiStylistModal';
import { VisualSearchModal } from './components/products/VisualSearchModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AccountView } from './components/account/AccountView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { 
  AboutPage, 
  ContactPage, 
  FAQPage, 
  ShippingPolicyPage, 
  ReturnsPolicyPage, 
  PrivacyAndTermsPage,
  TrackOrderSearchPage 
} from './pages/StaticPages';
import { Order } from './types';
import { CheckCircle2, Truck, FileText, ArrowRight } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    toastMessage,
    activeInvoiceOrder,
    setActiveInvoiceOrder,
    isInvoiceModalOpen,
    setIsInvoiceModalOpen
  } = useStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900 selection:bg-[#B4F724] selection:text-black">
      
      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-zinc-950 text-white text-xs font-semibold py-3 px-5 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <div className="w-2 h-2 rounded-full bg-[#B4F724]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {(currentPage === 'account' || 
          currentPage === 'orders' || 
          currentPage === 'wishlist' || 
          currentPage === 'addresses' || 
          currentPage === 'coupons') && <AccountView />}
        {currentPage === 'admin' && <AdminDashboard />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'size-guide' && (
          <div className="py-8">
            <HomePage />
          </div>
        )}
        {currentPage === 'shipping-policy' && <ShippingPolicyPage />}
        {currentPage === 'returns' && <ReturnsPolicyPage />}
        {currentPage === 'privacy' && <PrivacyAndTermsPage type="privacy" />}
        {currentPage === 'terms' && <PrivacyAndTermsPage type="terms" />}
        {currentPage === 'track-order' && <TrackOrderSearchPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Navigation */}
      <MobileNav />

      {/* Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation Screen Modal */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmedOrder(null)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-150">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B4F724] bg-black px-2.5 py-1 rounded">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-950 mt-3">
                  Thank You, {confirmedOrder.customerName}!
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Order ID: <strong className="text-zinc-900">{confirmedOrder.orderNumber}</strong> · Kerala Express Dispatch
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Destination:</span>
                  <span className="font-bold text-zinc-900">{confirmedOrder.shippingAddress.locality}, {confirmedOrder.shippingAddress.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Courier Partner:</span>
                  <span className="font-bold text-zinc-900">{confirmedOrder.courierName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Est. Delivery Date:</span>
                  <span className="font-bold text-emerald-700">{confirmedOrder.estimatedDeliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Paid:</span>
                  <span className="font-extrabold text-zinc-950 tabular-nums">₹{confirmedOrder.totalAmount} ({confirmedOrder.paymentMethod})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveInvoiceOrder(confirmedOrder);
                    setIsInvoiceModalOpen(true);
                  }}
                  className="py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Tax Invoice</span>
                </button>
                <button
                  onClick={() => {
                    const ord = confirmedOrder;
                    setConfirmedOrder(null);
                    navigateTo('orders', { orderId: ord.id });
                  }}
                  className="py-2.5 px-3 bg-black hover:bg-zinc-800 text-[#B4F724] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Shipment</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  navigateTo('shop');
                }}
                className="text-xs font-bold text-zinc-500 hover:text-black cursor-pointer"
              >
                Continue Shopping →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      <InvoiceModal
        order={activeInvoiceOrder}
        onClose={() => {
          setIsInvoiceModalOpen(false);
          setActiveInvoiceOrder(null);
        }}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal />

      {/* Kerala PIN Code Deliverability Modal */}
      <PinCheckerModal />

      {/* Auth / Login Modal */}
      <AuthModal />

      {/* Clothing Customizer & T-Shirt Designer Modal */}
      <CustomizerModal />

      {/* Fit Recommendation & AI Stylist Modal */}
      <AiStylistModal />

      {/* Visual Outfit Matcher Modal */}
      <VisualSearchModal />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
