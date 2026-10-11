import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed! Check your inbox for your 10% welcome voucher.');
    setNewsletterEmail('');
  };

  const keralaDistricts = [
    'Kochi / Ernakulam', 'Kozhikode', 'Thiruvananthapuram', 'Thrissur', 
    'Kannur', 'Kottayam', 'Malappuram', 'Palakkad', 
    'Alappuzha', 'Kollam', 'Kasaragod', 'Wayanad', 'Idukki', 'Pathanamthitta'
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-24 lg:pb-12 border-t border-zinc-800">
      {/* 1. Value Proposition Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-zinc-900 text-[#B4F724] shrink-0 border border-zinc-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Kerala Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                1–2 day dispatch to all 14 districts. Same-day available in Kochi & Calicut.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-zinc-900 text-[#B4F724] shrink-0 border border-zinc-800">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Hassle-Free Returns</h4>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                Free doorstep pickup across Kerala for exchanges or full refunds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-zinc-900 text-[#B4F724] shrink-0 border border-zinc-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine Heavyweight Cotton</h4>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                240 GSM combed cotton tailored for humid coastal comfort.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-zinc-900 text-[#B4F724] shrink-0 border border-zinc-800">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct WhatsApp Support</h4>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                Instant sizing help and order updates from our Kochi team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#B4F724] text-black font-extrabold flex items-center justify-center text-lg font-display">
                CC
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                CLOTHCITY
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Kerala's homegrown streetwear & everyday trending fashion label. Designed in Kochi for Gen-Z boys, girls, college students, and lovers of effortless oversized drapes.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Join the Kerala Streetwear Club
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#B4F724] font-medium p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the community! Check your email for code CLOTH10.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email for 15% off..."
                    className="flex-1 bg-zinc-900 text-xs text-white placeholder-zinc-500 px-3.5 py-2.5 rounded-xl border border-zinc-800 focus:border-[#B4F724] focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#B4F724] text-black hover:bg-[#a3e635] text-xs font-extrabold rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* WhatsApp Direct Help */}
            <div className="pt-2">
              <a
                href="https://wa.me/919847123456?text=Hi%20ClothCity%20team,%20I%20have%20a%20question%20about%20orders%20and%20sizing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-medium text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp: +91 98471 23456</span>
              </a>
            </div>
          </div>

          {/* Column: Categories */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Catalogue
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => navigateTo('shop', { gender: 'men' })} className="hover:text-white transition-colors cursor-pointer">
                  Men's Streetwear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { gender: 'women' })} className="hover:text-white transition-colors cursor-pointer">
                  Women's Relaxed Fits
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { gender: 'unisex' })} className="hover:text-white transition-colors cursor-pointer">
                  Unisex Essentials
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'oversized-tshirts' })} className="hover:text-white transition-colors cursor-pointer">
                  Oversized T-Shirts
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'pants-cargos' })} className="hover:text-white transition-colors cursor-pointer">
                  Baggy Cargos & Pants
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'shirts' })} className="hover:text-white transition-colors cursor-pointer">
                  Linen-Look Coastal Shirts
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'coords' })} className="hover:text-white transition-colors cursor-pointer">
                  Everyday Co-Ord Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Kerala Collections */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Kerala Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => navigateTo('shop', { collection: 'college-wear' })} className="hover:text-white transition-colors cursor-pointer">
                  College Wear Fits
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { collection: 'weekend-fits' })} className="hover:text-white transition-colors cursor-pointer">
                  Fort Kochi Weekend Fits
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { collection: 'onam-festive' })} className="hover:text-white transition-colors cursor-pointer">
                  Festival & Onam Edit
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { collection: 'monsoon-essentials' })} className="hover:text-white transition-colors cursor-pointer">
                  Monsoon Essentials
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { collection: 'summer-comfort' })} className="hover:text-white transition-colors cursor-pointer">
                  Coastal Summer Comfort
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { collection: 'under-499' })} className="hover:text-white transition-colors cursor-pointer">
                  Under ₹499 Student Steals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { collection: 'under-999' })} className="hover:text-white transition-colors cursor-pointer">
                  Under ₹999 Best Buys
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Customer Help & Legal */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Help & Policies
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => navigateTo('track-order')} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('size-guide')} className="hover:text-white transition-colors cursor-pointer">
                  Kerala Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns')} className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us / Kochi HQ
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy & Terms
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-zinc-500 hover:text-[#B4F724] transition-colors cursor-pointer font-bold">
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Delivery Coverage District Tags */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
            Express Deliveries Across All 14 Kerala Districts
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400">
            {keralaDistricts.map((district, idx) => (
              <span key={district} className="hover:text-white transition-colors">
                {district}{idx < keralaDistricts.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Copyright & Disclaimer */}
        <div className="mt-8 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} ClothCity Retail Private Limited, Kochi, Kerala. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>GSTIN: 32AABCC9812K1Z9</span>
            <span>·</span>
            <button onClick={() => navigateTo('privacy')} className="hover:text-white">Privacy</button>
            <span>·</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-white">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
