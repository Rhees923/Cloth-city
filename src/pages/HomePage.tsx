import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Instagram,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/products/ProductCard';
import { 
  HERO_BANNER_IMG, 
  OVERSIZED_TEE_IMG, 
  BAGGY_CARGOS_IMG, 
  KERALA_FESTIVE_IMG 
} from '../data/initialData';

export const HomePage: React.FC = () => {
  const { products, navigateTo, addToCart } = useStore();

  const trendingProducts = products.filter((p) => p.isTrending);
  const oversizedProducts = products.filter((p) => p.category === 'oversized-tshirts');
  const newArrivalProducts = products.filter((p) => p.isNewArrival);
  const pantsAndCargos = products.filter((p) => p.category === 'pants-cargos' || p.category === 'jeans');
  const womensCollection = products.filter((p) => p.gender === 'women' || p.gender === 'unisex');
  const keralaFestivalEdits = products.filter((p) => p.collections.includes('onam-festive') || p.collections.includes('everyday-kerala'));
  const budgetFinds = products.filter((p) => p.price <= 999);
  const bestSellers = products.filter((p) => p.isBestSeller);

  // Complete the look combo items
  const lookTee = products.find((p) => p.id === 'cc-prod-001') || products[0];
  const lookCargo = products.find((p) => p.id === 'cc-prod-002') || products[1];
  const comboPrice = lookTee.price + lookCargo.price - 200; // Bundle offer discount

  const handleAddLookCombo = () => {
    addToCart(lookTee, 'L', 'Washed Charcoal', 1);
    addToCart(lookCargo, 'M', 'Deep Vintage Indigo', 1);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 3. HERO CAMPAIGN BANNER */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-[#B4F724]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KERALA STREETWEAR REVOLUTION</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
                YOUR STYLE. <br />
                <span className="text-[#B4F724]">YOUR CITY.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-lg leading-relaxed font-normal">
                Discover oversized fits, everyday essentials and streetwear made for your vibe. Engineered in 240 GSM breathable combed cotton for Kerala's coastal climate.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('shop', { collection: 'new-arrivals' })}
                  className="px-7 py-3.5 bg-[#B4F724] hover:bg-[#a3e635] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('shop', { collection: 'trending' })}
                  className="px-7 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Explore Trending Fits
                </button>
              </div>

              {/* Social Proof Strip */}
              <div className="pt-6 border-t border-zinc-800/80 flex items-center gap-6 text-xs text-zinc-400">
                <div>
                  <strong className="text-white font-extrabold text-sm block">12,000+</strong>
                  <span>Kerala Orders</span>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div>
                  <strong className="text-white font-extrabold text-sm block">1–2 Days</strong>
                  <span>Kochi & Calicut Dispatch</span>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div>
                  <strong className="text-white font-extrabold text-sm block">4.8 / 5.0</strong>
                  <span>Verified Customer Rating</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
                <img
                  src={HERO_BANNER_IMG}
                  alt="ClothCity Kerala Streetwear Campaign"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-xs">
                    <span className="font-bold text-[#B4F724] uppercase tracking-wider">K-Street Collection</span>
                    <p className="text-white font-semibold">Fort Kochi Urban Lookbook 2026</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SHOP MEN'S, WOMEN'S AND UNISEX DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950">
              Explore by Department
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Curated silhouettes for everyday college life, cafes, and city movement
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Men's Fashion */}
          <div
            onClick={() => navigateTo('shop', { gender: 'men' })}
            className="group relative h-96 rounded-3xl overflow-hidden shadow-sm cursor-pointer border border-zinc-200"
          >
            <img
              src={OVERSIZED_TEE_IMG}
              alt="Men's Fashion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-bold text-[#B4F724] uppercase tracking-wider">01. Department</span>
              <h3 className="font-display font-extrabold text-2xl mt-1">Men's Streetwear</h3>
              <p className="text-xs text-zinc-300 mt-1">Heavyweight drop shoulders, relaxed trousers & polos</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                Browse Men's <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Women's Fashion */}
          <div
            onClick={() => navigateTo('shop', { gender: 'women' })}
            className="group relative h-96 rounded-3xl overflow-hidden shadow-sm cursor-pointer border border-zinc-200"
          >
            <img
              src={HERO_BANNER_IMG}
              alt="Women's Fashion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-bold text-[#B4F724] uppercase tracking-wider">02. Department</span>
              <h3 className="font-display font-extrabold text-2xl mt-1">Women's Streetwear</h3>
              <p className="text-xs text-zinc-300 mt-1">Boxy crop tops, wide-leg jeans & campus casuals</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                Browse Women's <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Unisex Essentials */}
          <div
            onClick={() => navigateTo('shop', { gender: 'unisex' })}
            className="group relative h-96 rounded-3xl overflow-hidden shadow-sm cursor-pointer border border-zinc-200"
          >
            <img
              src={BAGGY_CARGOS_IMG}
              alt="Unisex Streetwear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-bold text-[#B4F724] uppercase tracking-wider">03. Department</span>
              <h3 className="font-display font-extrabold text-2xl mt-1">Unisex Essentials</h3>
              <p className="text-xs text-zinc-300 mt-1">Tactical cargos, neutral basics & parachute pants</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                Browse Unisex <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRENDING NOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">Real Sales Verified</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
              Trending in Kerala Now
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { collection: 'trending' })}
            className="text-xs font-extrabold text-zinc-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. OVERSIZED T-SHIRT COLLECTION SPOTLIGHT */}
      <section className="bg-zinc-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Signature ClothCity Drops
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
                Oversized Heavyweight T-Shirts (240 GSM)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
                Heavy draping fabric that doesn't cling to your body in coastal humidity. Pre-shrunk French terry weave that holds crisp boxy shoulders wash after wash.
              </p>
            </div>
            <button
              onClick={() => navigateTo('shop', { category: 'oversized-tshirts' })}
              className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer self-start sm:self-auto"
            >
              Shop All Oversized Tees
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {oversizedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Fresh From the Kochi Hub
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
              New Arrivals This Week
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { collection: 'new-arrivals' })}
            className="text-xs font-extrabold text-zinc-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivalProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 8. JEANS, PANTS AND CARGOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Wide-Leg & Tactical Utility
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
              Jeans, Pants & Monsoon Cargos
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'pants-cargos' })}
            className="text-xs font-extrabold text-zinc-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>View All Bottoms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pantsAndCargos.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 9. WOMEN'S EVERYDAY STREETWEAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Effortless College & Weekend Fits
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
              Women's Everyday Streetwear
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { gender: 'women' })}
            className="text-xs font-extrabold text-zinc-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>Shop Women's</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {womensCollection.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 10. KERALA-INSPIRED SEASONAL COLLECTION (FESTIVAL & ONAM EDIT) */}
      <section className="bg-zinc-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#B4F724]">
                HERITAGE MEETS STREETWEAR
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Festival & Onam Edit: Kasavu Accent Co-Ords
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                We re-imagined the classic Kerala Kasavu with modern boxy linen silhouettes and subtle antique gold piping. Made with pure European cotton-linen slub so you look sharp during celebrations without sweating through heavy silk or dhotis.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('shop', { collection: 'onam-festive' })}
                  className="px-6 py-3 bg-[#B4F724] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#a3e635] transition-colors cursor-pointer"
                >
                  Explore Kerala Edits
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800">
                <img
                  src={KERALA_FESTIVE_IMG}
                  alt="Kerala Onam Linen Co-Ord"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 hidden sm:block">
                <img
                  src={HERO_BANNER_IMG}
                  alt="Kerala Street Lookbook"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. BUDGET FINDS (UNDER ₹499 & UNDER ₹999) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Student Pocket Friendly
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
              Budget Finds: Under ₹499 & Under ₹999
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigateTo('shop', { collection: 'under-499' })}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-xs font-bold rounded-xl text-zinc-800 cursor-pointer"
            >
              Under ₹499
            </button>
            <button
              onClick={() => navigateTo('shop', { collection: 'under-999' })}
              className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Under ₹999
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {budgetFinds.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 12. COMPLETE THE LOOK BUNDLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                Bundle & Save ₹200
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950">
                Complete The Look: Kochi Campus Combo
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Pair our signature K-Street 0484 Heavyweight Oversized Tee with the Tactical Utility Baggy Cargos for the ultimate effortless Kerala streetwear drip.
              </p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-zinc-950 tabular-nums">
                  ₹{comboPrice}
                </span>
                <span className="text-base text-zinc-400 line-through tabular-nums">
                  ₹{lookTee.price + lookCargo.price}
                </span>
                <span className="text-xs font-bold text-emerald-700">Save ₹200 on bundle</span>
              </div>

              <button
                onClick={handleAddLookCombo}
                className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-zinc-800 text-[#B4F724] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Both Items to Bag (₹{comboPrice})</span>
              </button>
            </div>

            {/* Visual Pairing Cards */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div 
                onClick={() => navigateTo('product-detail', { id: lookTee.id })}
                className="w-full sm:w-1/2 p-3 bg-zinc-50 rounded-2xl border border-zinc-200 cursor-pointer"
              >
                <img src={lookTee.images[0]} alt={lookTee.title} className="w-full aspect-[4/5] object-cover rounded-xl" />
                <p className="text-xs font-bold text-zinc-900 mt-2 line-clamp-1">{lookTee.title}</p>
                <p className="text-xs font-extrabold text-zinc-900 mt-0.5">₹{lookTee.price}</p>
              </div>

              <span className="text-2xl font-black text-zinc-300">+</span>

              <div 
                onClick={() => navigateTo('product-detail', { id: lookCargo.id })}
                className="w-full sm:w-1/2 p-3 bg-zinc-50 rounded-2xl border border-zinc-200 cursor-pointer"
              >
                <img src={lookCargo.images[0]} alt={lookCargo.title} className="w-full aspect-[4/5] object-cover rounded-xl" />
                <p className="text-xs font-bold text-zinc-900 mt-2 line-clamp-1">{lookCargo.title}</p>
                <p className="text-xs font-extrabold text-zinc-900 mt-0.5">₹{lookCargo.price}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 13. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Community Favorites
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
              ClothCity Best Sellers
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { collection: 'best-sellers' })}
            className="text-xs font-extrabold text-zinc-900 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 14. CUSTOMER REVIEWS FROM GENUINE PURCHASERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Real Feedback from Kerala Shoppers
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
            Loved Across Kochi, Calicut & Trivandrum
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs font-bold text-zinc-900">
              "The French terry drape doesn’t stick to skin in 34°C humidity"
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Living in Ernakulam, regular t-shirts get soaked within 2 hours. ClothCity’s 240 GSM combed weave stays structured and super airy. Fast 1-day delivery too!
            </p>
            <div className="pt-2 border-t border-zinc-100 text-xs">
              <span className="font-bold text-zinc-900 block">Arjun Nambiar</span>
              <span className="text-zinc-400 text-[11px]">Kochi, Kerala · Verified Purchaser</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs font-bold text-zinc-900">
              "Kasavu co-ord set was the highlight of our college fest"
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Wore the modern linen co-ord with antique gold line for Onam celebrations at CUSAT. Zero itchiness, super comfortable fit, and got so many compliments.
            </p>
            <div className="pt-2 border-t border-zinc-100 text-xs">
              <span className="font-bold text-zinc-900 block">Aiswarya Menon</span>
              <span className="text-zinc-400 text-[11px]">Thrissur, Kerala · Verified Purchaser</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs font-bold text-zinc-900">
              "Baggy cargo jeans have the cleanest sneaker stack"
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              The ankle bungee drawstrings let you cinch them over your shoes. The phone zipper pockets mean my phone doesn’t slip out on scooter rides across Calicut beach.
            </p>
            <div className="pt-2 border-t border-zinc-100 text-xs">
              <span className="font-bold text-zinc-900 block">Gautham Krishna</span>
              <span className="text-zinc-400 text-[11px]">Kozhikode, Kerala · Verified Purchaser</span>
            </div>
          </div>
        </div>
      </section>

      {/* 15. INSTAGRAM COMMUNITY GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-zinc-900" />
            <h3 className="font-display font-bold text-lg text-zinc-950">
              #ClothCityFits · Kochi Community
            </h3>
          </div>
          <span className="text-xs font-bold text-zinc-500">Tag @clothcity.in on Instagram</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 group relative">
            <img src={HERO_BANNER_IMG} alt="Community fit" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 group relative">
            <img src={OVERSIZED_TEE_IMG} alt="Community fit" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 group relative">
            <img src={BAGGY_CARGOS_IMG} alt="Community fit" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 group relative">
            <img src={KERALA_FESTIVE_IMG} alt="Community fit" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
        </div>
      </section>

    </div>
  );
};
