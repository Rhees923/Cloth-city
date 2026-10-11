import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle, 
  HelpCircle, 
  Clock, 
  CheckCircle2,
  Package,
  Search
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { KERALA_PINCODES } from '../data/initialData';

// ABOUT US / BRAND STORY
export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          OUR KERALA ROOTS
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-950">
          Your Style. Your City.
        </h1>
        <p className="text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
          ClothCity was founded in Kochi with one driving mission: to give Kerala’s Gen-Z youth premium, trend-driven streetwear built for the coastal climate.
        </p>
      </div>

      <div className="prose prose-zinc text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 bg-white p-6 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm">
        <h3 className="font-display font-bold text-lg text-zinc-950">
          The Problem with Fast Fashion in Kerala
        </h3>
        <p>
          For years, young people in Kochi, Calicut, and Trivandrum had two choices: cheap thin tees that turned transparent after one wash, or international fast-fashion brands that used synthetic polyesters completely unsuited for Kerala's 85% humidity.
        </p>
        <p>
          We set out to engineer clothing from the ground up: <strong>240 GSM super-combed cotton</strong> that feels substantial, drapes cleanly with an oversized streetwear silhouette, and lets sea breezes circulate naturally.
        </p>

        <h3 className="font-display font-bold text-lg text-zinc-950 pt-4">
          Celebrating Kerala Street Culture
        </h3>
        <p>
          From the skate spots and cafes of Fort Kochi to the bustling campus culture of CUSAT, CET, and Farook College, our designs celebrate regional pride without relying on tacky tourist clichés. Our Kasavu-accented edits honor heritage with modern minimalist restraint.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200 not-prose text-center">
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <strong className="text-xl font-extrabold text-zinc-950 block">Kochi HQ</strong>
            <span className="text-xs text-zinc-500">Design studio in Ernakulam</span>
          </div>
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <strong className="text-xl font-extrabold text-zinc-950 block">14 Districts</strong>
            <span className="text-xs text-zinc-500">Fast doorstep courier express</span>
          </div>
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <strong className="text-xl font-extrabold text-zinc-950 block">240 GSM</strong>
            <span className="text-xs text-zinc-500">Combed bio-washed cotton</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// CONTACT US PAGE
export const ContactPage: React.FC = () => {
  const { submitEnquiry } = useStore();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    submitEnquiry(form);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display font-extrabold text-3xl text-zinc-950">
          Contact ClothCity Kerala
        </h1>
        <p className="text-xs text-zinc-500">
          We’re here to help with sizing, order queries, college fest bulk drops, and exchanges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-zinc-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-white">
              Kochi Hub & Support Desk
            </h3>
            <div className="space-y-4 text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B4F724] shrink-0 mt-0.5" />
                <span>Building 4, Infopark Express Avenue, Kakkanad, Kochi, Kerala - 682042</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B4F724] shrink-0" />
                <span>+91 98471 23456 (Mon–Sat 9AM–7PM)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B4F724] shrink-0" />
                <span>care@clothcity.in</span>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919847123456?text=Hi%20ClothCity%20team,%20I%20have%20an%20enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#B4F724] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl text-center hover:bg-[#a3e635] transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-sm">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-zinc-900">Message Received!</h3>
              <p className="text-xs text-zinc-500">
                Our Kochi support desk will respond to your email or WhatsApp within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anandhu Mohan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98471 23456"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Sizing query / Exchange help"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 uppercase text-[11px] mb-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

// FAQ PAGE
export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'How fast is delivery to locations in Kerala?',
      a: 'We ship from our central hub in Kochi (Aluva). Orders to Ernakulam, Kozhikode, and Trivandrum are typically delivered within 1–2 business days. Outlying districts (Wayanad, Idukki, Kasaragod) take 2–3 business days via DTDC Kerala Express or Delhivery.'
    },
    {
      q: 'Is Cash on Delivery (COD) available?',
      a: 'Yes! COD is enabled across all 14 Kerala districts. You can pay via cash or UPI QR code to the delivery rider at your doorstep.'
    },
    {
      q: 'What makes your fabric suitable for Kerala’s climate?',
      a: 'We use 100% long-staple combed cotton in a breathable 240 GSM French terry weave. Unlike polyester-heavy tees that trap moisture, our cotton is silicone bio-washed so air circulates freely, preventing sweat patches in coastal heat.'
    },
    {
      q: 'How does your 7-Day Exchange work?',
      a: 'If the size or fit isn’t 100% what you wanted, simply click "Exchange" in your account dashboard. Our courier will pick up the item from your doorstep across Kerala for free and deliver the replacement size.'
    },
    {
      q: 'Can college students get bulk custom discounts for tech fests or cultural events?',
      a: 'Yes! We frequently support college unions across CUSAT, CET, Rajagiri, NIT Calicut, etc. Send an enquiry through our Contact page or WhatsApp for bulk custom prints.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display font-extrabold text-3xl text-zinc-950">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-zinc-500">
          Everything you need to know about ClothCity orders, sizing, and Kerala shipping
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-zinc-500" />
              <span>{f.q}</span>
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed pl-6">
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// SHIPPING & DELIVERY POLICY
export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="font-display font-extrabold text-3xl text-zinc-950">
        Kerala Shipping & Delivery Policy
      </h1>
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 shadow-sm">
        <p>
          At <strong>ClothCity</strong>, all orders are dispatched directly from our central fulfillment warehouse in Ernakulam (Kochi), Kerala.
        </p>
        <h3 className="font-bold text-base text-zinc-900 pt-2">Shipping Charges & Thresholds</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Orders above ₹999:</strong> FREE Express Delivery anywhere in Kerala.</li>
          <li><strong>Orders below ₹999:</strong> Flat shipping fee of ₹60.</li>
          <li><strong>Priority Same-Day / Next-Day:</strong> Available in Kochi & Kozhikode urban zones for an additional ₹49.</li>
        </ul>

        <h3 className="font-bold text-base text-zinc-900 pt-2">Logistics Partners</h3>
        <p>
          We partner with <strong>DTDC Kerala Express</strong>, <strong>Delhivery</strong>, and <strong>India Post Speed Post</strong> for rural hill tracts to ensure 100% PIN code coverage.
        </p>

        <h3 className="font-bold text-base text-zinc-900 pt-2">Estimated Delivery Timelines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <strong>Ernakulam, Kozhikode, Trivandrum:</strong>
            <span className="block text-xs text-zinc-500">1 to 2 business days</span>
          </div>
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <strong>All Other 11 Districts:</strong>
            <span className="block text-xs text-zinc-500">2 to 3 business days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// RETURNS & REFUND POLICY
export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="font-display font-extrabold text-3xl text-zinc-950">
        7-Day Returns & Exchange Policy
      </h1>
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 shadow-sm">
        <p>
          We want you to love your ClothCity fits. If an item doesn't fit the way you like, we offer a hassle-free <strong>7-day doorstep return and exchange</strong> window from the date of delivery.
        </p>
        <h3 className="font-bold text-base text-zinc-900 pt-2">Eligibility Criteria</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Item must be unused, unwashed, and in its original condition with tags intact.</li>
          <li>Return request must be initiated via your ClothCity account within 7 days of delivery.</li>
        </ul>

        <h3 className="font-bold text-base text-zinc-900 pt-2">Refund Processing</h3>
        <p>
          For prepaid orders (UPI / Card / Net Banking), refunds are initiated back to the original source within 24–48 hours of warehouse inspection. For Cash on Delivery orders, refunds are credited directly to your provided UPI ID or bank account.
        </p>
      </div>
    </div>
  );
};

// PRIVACY POLICY & TERMS
export const PrivacyAndTermsPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="font-display font-extrabold text-3xl text-zinc-950">
        {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
      </h1>
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 shadow-sm">
        <p>
          Welcome to ClothCity Retail Private Limited (GSTIN: 32AABCC9812K1Z9), Kochi, Kerala. By using our website and placing orders, you agree to the following provisions.
        </p>
        <h3 className="font-bold text-base text-zinc-900 pt-2">
          {type === 'privacy' ? 'Data Protection & Security' : 'Store Terms & Fair Use'}
        </h3>
        <p>
          We respect your privacy. We collect customer shipping addresses and phone numbers solely to execute courier dispatch and send delivery timeline updates. We do not sell or lease customer information to third parties. Payments are processed securely via SSL-encrypted payment infrastructure.
        </p>
      </div>
    </div>
  );
};

// TRACK ORDER SEARCH PAGE
export const TrackOrderSearchPage: React.FC = () => {
  const { orders } = useStore();
  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    if (!clean) return;
    setHasSearched(true);
    const found = orders.find(
      (o) => o.orderNumber.toUpperCase() === clean || o.trackingNumber?.toUpperCase() === clean
    );
    setSearchedOrder(found || null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display font-extrabold text-3xl text-zinc-950">
          Track Your ClothCity Order
        </h1>
        <p className="text-xs text-zinc-500">
          Enter your Order ID (e.g. CC-KER-84920) or DTDC AWB Tracking Number
        </p>
      </div>

      <form onSubmit={handleTrackSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. CC-KER-84920"
          className="flex-1 bg-white p-3 rounded-2xl border border-zinc-200 text-xs font-bold uppercase focus:outline-none focus:border-zinc-900 shadow-sm"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-[#B4F724] font-bold text-xs uppercase tracking-wider rounded-2xl cursor-pointer"
        >
          Track Now
        </button>
      </form>

      {hasSearched && (
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          {searchedOrder ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900">{searchedOrder.orderNumber}</h3>
                  <p className="text-xs text-zinc-500">
                    Destination: {searchedOrder.shippingAddress.locality}, {searchedOrder.shippingAddress.district}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-zinc-900 text-[#B4F724] font-bold text-xs rounded-lg">
                  {searchedOrder.orderStatus}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Timeline Progression
                </p>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                  {searchedOrder.timeline.map((item: any, i: number) => (
                    <div key={i} className="relative text-xs">
                      <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-black ring-4 ring-white" />
                      <span className="font-bold text-zinc-900">{item.status}</span>
                      <span className="text-[11px] text-zinc-400 ml-2">{item.timestamp}</span>
                      <p className="text-zinc-600 mt-0.5">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-zinc-500">
              No shipment found matching "{query}". Please double-check your Order ID.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
