import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Banknote,
  Building
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Address, Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const {
    cart,
    cartTotal,
    discountAmount,
    deliveryFee,
    finalPayableAmount,
    appliedCoupon,
    addresses,
    addAddress,
    currentUser,
    placeOrder,
    selectedPincode
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Contact, 2: Address, 3: Delivery Speed, 4: Payment

  // Form states
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Anandhu Mohan');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'anandhu.mohan@example.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+91 98471 23456');

  // Address selection
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || '');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddrForm, setNewAddrForm] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    street: '',
    locality: '',
    city: 'Kochi',
    district: 'Ernakulam',
    pincode: selectedPincode?.pincode || '682024',
    addressType: 'home' as const,
    isDefault: true
  });

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'cred'>('gpay');
  const [selectedBank, setSelectedBank] = useState('Federal Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  const currentSelectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleAddNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrForm.street || !newAddrForm.locality || !newAddrForm.pincode) return;
    addAddress({
      ...newAddrForm,
      state: 'Kerala'
    });
    setIsAddingNewAddress(false);
  };

  const handlePlaceOrderSubmit = () => {
    if (!currentSelectedAddress) {
      alert('Please select or add a delivery address.');
      setStep(2);
      return;
    }

    setIsProcessingPayment(true);

    // Simulated payment processing (Razorpay flow)
    setTimeout(() => {
      const order = placeOrder({
        address: currentSelectedAddress,
        paymentMethod,
        customerName,
        customerEmail,
        customerPhone
      });
      setIsProcessingPayment(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
          
          {/* Top Stepper Banner */}
          <div className="p-4 sm:p-6 bg-zinc-950 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#B4F724]">
                CLOTHCITY EXPRESS CHECKOUT
              </span>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                {step === 1 && '1. Contact Information'}
                {step === 2 && '2. Kerala Delivery Address'}
                {step === 3 && '3. Delivery Method'}
                {step === 4 && '4. Payment Selection (Razorpay / COD)'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Dots */}
          <div className="bg-zinc-100 px-6 py-2 border-b border-zinc-200 flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span className={step >= 1 ? 'text-zinc-950 font-bold' : ''}>1. Contact</span>
            <span>·</span>
            <span className={step >= 2 ? 'text-zinc-950 font-bold' : ''}>2. Address</span>
            <span>·</span>
            <span className={step >= 3 ? 'text-zinc-950 font-bold' : ''}>3. Shipping</span>
            <span>·</span>
            <span className={step >= 4 ? 'text-zinc-950 font-bold' : ''}>4. Payment</span>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            
            {/* STEP 1: Contact Details */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-500">
                  We’ll send your order confirmation, SMS tracking alerts, and tax invoice here.
                </p>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-50 text-xs text-zinc-900 px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-zinc-50 text-xs text-zinc-900 px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-zinc-50 text-xs text-zinc-900 px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Address */}
            {step === 2 && (
              <div className="space-y-4">
                {!isAddingNewAddress ? (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Select Delivery Address
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(true)}
                        className="text-xs font-bold text-black hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add New Address
                      </button>
                    </div>

                    <div className="space-y-3">
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            selectedAddressId === addr.id || (!selectedAddressId && addr.isDefault)
                              ? 'bg-zinc-50 border-black ring-1 ring-black'
                              : 'bg-white border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === addr.id || (!selectedAddressId && addr.isDefault)}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 text-black focus:ring-black"
                          />
                          <div className="flex-1 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-zinc-900">{addr.fullName}</span>
                              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-zinc-200 rounded">
                                {addr.addressType}
                              </span>
                            </div>
                            <p className="text-zinc-600 mt-1 leading-relaxed">
                              {addr.street}, {addr.locality}, {addr.city}, {addr.district} District, Kerala - <strong>{addr.pincode}</strong>
                            </p>
                            <p className="text-zinc-500 mt-0.5">Phone: {addr.phone}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleAddNewAddressSubmit} className="space-y-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                      <span className="text-xs font-bold text-zinc-900 uppercase">New Kerala Address</span>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(false)}
                        className="text-xs text-zinc-500 hover:text-black cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddrForm.fullName}
                        onChange={(e) => setNewAddrForm({ ...newAddrForm, fullName: e.target.value })}
                        className="bg-white text-xs p-2.5 rounded-xl border border-zinc-300 focus:outline-none"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Phone"
                        value={newAddrForm.phone}
                        onChange={(e) => setNewAddrForm({ ...newAddrForm, phone: e.target.value })}
                        className="bg-white text-xs p-2.5 rounded-xl border border-zinc-300 focus:outline-none"
                        required
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="House / Flat / Building / Street"
                      value={newAddrForm.street}
                      onChange={(e) => setNewAddrForm({ ...newAddrForm, street: e.target.value })}
                      className="w-full bg-white text-xs p-2.5 rounded-xl border border-zinc-300 focus:outline-none"
                      required
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Locality / Landmark"
                        value={newAddrForm.locality}
                        onChange={(e) => setNewAddrForm({ ...newAddrForm, locality: e.target.value })}
                        className="bg-white text-xs p-2.5 rounded-xl border border-zinc-300 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="6-digit Kerala PIN (e.g. 682001)"
                        value={newAddrForm.pincode}
                        onChange={(e) => setNewAddrForm({ ...newAddrForm, pincode: e.target.value })}
                        className="bg-white text-xs p-2.5 rounded-xl border border-zinc-300 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City / Town"
                        value={newAddrForm.city}
                        onChange={(e) => setNewAddrForm({ ...newAddrForm, city: e.target.value })}
                        className="bg-white text-xs p-2.5 rounded-xl border border-zinc-300 focus:outline-none"
                        required
                      />
                      <select
                        value={newAddrForm.district}
                        onChange={(e) => setNewAddrForm({ ...newAddrForm, district: e.target.value })}
                        className="bg-white text-xs p-2.5 rounded-xl border border-zinc-300 focus:outline-none"
                      >
                        <option value="Ernakulam">Ernakulam / Kochi</option>
                        <option value="Kozhikode">Kozhikode / Calicut</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Alappuzha">Alappuzha</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Kasaragod">Kasaragod</option>
                        <option value="Wayanad">Wayanad</option>
                        <option value="Idukki">Idukki</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Save & Use This Address
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* STEP 3: Delivery Speed */}
            {step === 3 && (
              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                    deliveryMethod === 'standard'
                      ? 'bg-zinc-50 border-black ring-1 ring-black'
                      : 'bg-white border-zinc-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={deliveryMethod === 'standard'}
                    onChange={() => setDeliveryMethod('standard')}
                    className="mt-1 text-black focus:ring-black"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900">Standard Kerala Express Dispatch</span>
                      <span className="font-bold text-emerald-700">
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <p className="text-zinc-500 mt-1">
                      Delivered within 1–2 business days across all 14 districts via DTDC / Delhivery.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                    deliveryMethod === 'express'
                      ? 'bg-zinc-50 border-black ring-1 ring-black'
                      : 'bg-white border-zinc-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={deliveryMethod === 'express'}
                    onChange={() => setDeliveryMethod('express')}
                    className="mt-1 text-black focus:ring-black"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900">Priority Metro Same-Day / Next-Day</span>
                      <span className="font-bold text-zinc-900">+₹49</span>
                    </div>
                    <p className="text-zinc-500 mt-1">
                      Priority dispatch from Aluva central fulfillment center (Kochi, Calicut & Trivandrum urban areas).
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* STEP 4: Payment */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Payment Method (Secured via Razorpay)
                </p>

                {/* Option 1: UPI */}
                <label
                  onClick={() => setPaymentMethod('UPI')}
                  className={`block p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'UPI' ? 'bg-zinc-50 border-black ring-1 ring-black' : 'border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Instant UPI (Google Pay, PhonePe, Paytm, CRED)</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      FASTEST
                    </span>
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 pt-3 border-t border-zinc-200 grid grid-cols-4 gap-2 text-center text-[11px] font-medium">
                      {(['gpay', 'phonepe', 'paytm', 'cred'] as const).map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setSelectedUpiApp(app)}
                          className={`p-2 rounded-xl border capitalize transition-colors ${
                            selectedUpiApp === app
                              ? 'bg-black text-[#B4F724] border-black font-bold'
                              : 'bg-white text-zinc-700 border-zinc-200'
                          }`}
                        >
                          {app === 'gpay' ? 'GPay' : app}
                        </button>
                      ))}
                    </div>
                  )}
                </label>

                {/* Option 2: Cards */}
                <label
                  onClick={() => setPaymentMethod('Card')}
                  className={`block p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'Card' ? 'bg-zinc-50 border-black ring-1 ring-black' : 'border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Credit / Debit Card (Visa, MasterCard, RuPay)</span>
                  </div>
                  {paymentMethod === 'Card' && (
                    <div className="mt-3 pt-3 border-t border-zinc-200 text-xs text-zinc-500">
                      Card gateway simulated in sandbox mode. No real card details stored.
                    </div>
                  )}
                </label>

                {/* Option 3: Net Banking */}
                <label
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`block p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'NetBanking' ? 'bg-zinc-50 border-black ring-1 ring-black' : 'border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <Building className="w-4 h-4 text-purple-600" />
                    <span>Net Banking (Federal Bank, SBI, HDFC, South Indian Bank)</span>
                  </div>
                  {paymentMethod === 'NetBanking' && (
                    <div className="mt-3 pt-3 border-t border-zinc-200">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-white text-xs p-2 rounded-xl border border-zinc-300"
                      >
                        <option value="Federal Bank">Federal Bank (Kerala)</option>
                        <option value="South Indian Bank">South Indian Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="Canara Bank">Canara Bank</option>
                      </select>
                    </div>
                  )}
                </label>

                {/* Option 4: COD */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`block p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'COD' ? 'bg-zinc-50 border-black ring-1 ring-black' : 'border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <Banknote className="w-4 h-4 text-zinc-700" />
                    <span>Cash on Delivery (Pay at doorstep)</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 pl-6">
                    Pay in cash or UPI QR code to the courier delivery executive upon arrival.
                  </p>
                </label>
              </div>
            )}

            {/* Summary Preview Box */}
            <div className="mt-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-600">
                <span>Items ({cart.length})</span>
                <span className="font-semibold text-zinc-900 tabular-nums">₹{cartTotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-bold tabular-nums">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Delivery Charge</span>
                <span className="font-semibold tabular-nums">
                  {deliveryFee === 0 && deliveryMethod === 'standard' ? 'FREE' : `₹${deliveryFee + (deliveryMethod === 'express' ? 49 : 0)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Total Amount to Pay</span>
                <span className="tabular-nums">₹{finalPayableAmount + (deliveryMethod === 'express' ? 49 : 0)}</span>
              </div>
            </div>

          </div>

          {/* Stepper Footer Controls */}
          <div className="p-4 sm:p-6 bg-white border-t border-zinc-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handlePlaceOrderSubmit}
                className="px-8 py-3 bg-[#B4F724] hover:bg-[#a3e635] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{finalPayableAmount + (deliveryMethod === 'express' ? 49 : 0)} & Confirm Order</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
