import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Ruler, 
  Check, 
  MapPin, 
  AlertCircle,
  Plus,
  Share2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Palette,
  Gift,
  Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/products/ProductCard';
import { Size, Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    pageParams,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
    setIsSizeGuideOpen,
    setIsPinModalOpen,
    selectedPincode,
    addProductReview,
    navigateTo,
    showToast,
    addToRecentlyViewed,
    recentlyViewed,
    setIsCustomizerModalOpen,
    setIsAiStylistOpen
  } = useStore();

  const productId = pageParams?.id || 'cc-prod-001';
  const product = products.find((p) => p.id === productId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>(product.variants[0]?.size || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [sizeRegion, setSizeRegion] = useState<'IN/UK' | 'US' | 'EU' | 'JP'>('IN/UK');

  // Track recently viewed
  React.useEffect(() => {
    if (product?.id) {
      addToRecentlyViewed(product.id);
    }
  }, [product?.id]);

  // Review Form state
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    userName: '',
    userCity: 'Kochi, Kerala',
    rating: 5,
    title: '',
    comment: '',
    fitFeedback: 'Perfect oversized drape' as const
  });

  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const isFavorited = isInWishlist(product.id);
  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const isOutOfStock = !selectedVariant || selectedVariant.stock === 0;
  const isLowStock = selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5;
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // Paired product for mix-and-match
  const pairedProduct = products.find(
    (p) =>
      p.id !== product.id &&
      (product.category.includes('tshirts') || product.category === 'shirts'
        ? p.category === 'pants-cargos' || p.category === 'jeans'
        : p.category === 'oversized-tshirts')
  ) || products[1];

  const bundleSavings = pairedProduct ? Math.round((product.price + pairedProduct.price) * 0.15) : 0;
  const bundlePrice = pairedProduct ? product.price + pairedProduct.price - bundleSavings : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(
      product,
      selectedSize,
      selectedColor,
      quantity,
      giftWrap ? `Gift Wrapped with note: "${giftNote || 'Best wishes from Kerala'}"` : undefined
    );
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(
      product,
      selectedSize,
      selectedColor,
      quantity,
      giftWrap ? `Gift Wrapped with note: "${giftNote || 'Best wishes from Kerala'}"` : undefined
    );
    setIsCartOpen(true);
  };

  const handleAddBundleToCart = () => {
    if (!pairedProduct) return;
    addToCart(product, selectedSize, selectedColor, 1);
    const pairedVariant = pairedProduct.variants[0];
    addToCart(pairedProduct, pairedVariant?.size || 'L', pairedProduct.availableColors[0]?.name || 'Standard', 1);
    showToast(`Added Complete Look Bundle (${product.title} + ${pairedProduct.title}) to Bag with ₹${bundleSavings} bundle discount!`);
    setIsCartOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.userName || !newReviewForm.comment) return;
    addProductReview(product.id, {
      ...newReviewForm,
      verifiedPurchase: true
    });
    setIsAddingReview(false);
    setNewReviewForm({
      userName: '',
      userCity: 'Kochi, Kerala',
      rating: 5,
      title: '',
      comment: '',
      fitFeedback: 'Perfect oversized drape'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.subtitle,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  // Similar Products
  const similarProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-medium">
        <button onClick={() => navigateTo('home')} className="hover:text-black cursor-pointer">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('shop', { category: product.category })} className="hover:text-black cursor-pointer capitalize">
          {product.category.replace('-', ' ')}
        </button>
        <span>/</span>
        <span className="text-zinc-900 font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT: Product Gallery (Sticky on desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 h-fit lg:sticky lg:top-24">
          
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  activeImageIndex === idx ? 'border-black ring-2 ring-black/10' : 'border-zinc-200 hover:border-zinc-400'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Large Showcase Image */}
          <div className="relative flex-1 aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                isFavorited ? 'bg-red-50 text-red-600' : 'bg-white/90 text-zinc-700 hover:text-black'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* RIGHT: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                {product.fitType} Fit · {product.gender.toUpperCase()}
              </span>
              <button
                onClick={handleShare}
                className="text-zinc-400 hover:text-black p-1 transition-colors cursor-pointer"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1 leading-snug">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 bg-zinc-100 px-2.5 py-1 rounded-lg text-xs font-bold text-zinc-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-400">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-zinc-300">·</span>
              <span className="text-xs font-semibold text-emerald-700">100% Genuine Kerala Stock</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-extrabold text-3xl text-zinc-950 tabular-nums">
                ₹{product.price}
              </span>
              <span className="text-base text-zinc-400 line-through tabular-nums">
                ₹{product.mrp}
              </span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                Save {discountPercent}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Inclusive of all taxes (Kerala GST) · Free delivery above ₹999
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
              Color: <strong className="text-zinc-950 font-semibold">{selectedColor}</strong>
            </label>
            <div className="flex gap-2">
              {product.availableColors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    selectedColor === col.name
                      ? 'border-black bg-zinc-900 text-white shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:border-black'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span>{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection & Sizing Modal Trigger */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Select Size
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAiStylistOpen(true)}
                  className="text-xs font-bold text-zinc-950 flex items-center gap-1 hover:bg-[#B4F724] cursor-pointer bg-[#B4F724]/30 px-2 py-0.5 rounded-lg border border-[#B4F724] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                  <span>AI Fit Finder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-black underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.variants.map((v) => {
                const isSelected = selectedSize === v.size;
                const isUnavailable = v.stock === 0;
                return (
                  <button
                    key={v.id}
                    disabled={isUnavailable}
                    onClick={() => setSelectedSize(v.size)}
                    className={`py-3 rounded-xl font-display font-extrabold text-sm border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-black text-[#B4F724] border-black shadow-md'
                        : isUnavailable
                        ? 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through cursor-not-allowed'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:border-black'
                    }`}
                  >
                    <span>{v.size}</span>
                  </button>
                );
              })}
            </div>

            {/* Model Height & Fit Drape Note */}
            <div className="mt-2.5 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-[11px] text-zinc-600">
              <span>Model Height: <strong>6'0" (183cm)</strong> · Wearing <strong>Size L</strong></span>
              <span className="font-semibold text-zinc-900 bg-zinc-200/70 px-1.5 py-0.5 rounded">
                Fit: {product.fitType}
              </span>
            </div>

            {/* Stock alert */}
            <div className="mt-2 text-xs">
              {isOutOfStock ? (
                <span className="text-red-600 font-bold">Currently Sold Out in {selectedSize}</span>
              ) : isLowStock ? (
                <span className="text-amber-700 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Hurry! Only {selectedVariant.stock} items left in size {selectedSize}
                </span>
              ) : (
                <span className="text-emerald-700 font-medium">In Stock at Kochi Central Hub</span>
              )}
            </div>
          </div>

          {/* Customization Maker Studio Promo Banner */}
          <div className="p-3.5 bg-gradient-to-r from-zinc-950 to-zinc-800 text-white rounded-2xl flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#B4F724] text-black">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-xs font-bold">Custom Print & Embroidery</strong>
                <span className="text-[11px] text-zinc-300">Add initials, college tag, or custom Malayalam/English graphic</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCustomizerModalOpen(true)}
              className="px-3 py-1.5 bg-[#B4F724] text-black text-xs font-extrabold rounded-xl hover:bg-white transition-colors cursor-pointer shrink-0"
            >
              Customize
            </button>
          </div>

          {/* Primary Action Buttons (Add to Cart / Buy Now) */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 bg-white hover:bg-zinc-50 border-2 border-black text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 bg-black hover:bg-zinc-800 text-[#B4F724] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gift Wrapping & Message Option */}
          <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs space-y-2">
            <label className="flex items-center gap-2 font-bold text-zinc-800 cursor-pointer">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="rounded text-black focus:ring-black cursor-pointer"
              />
              <Gift className="w-4 h-4 text-zinc-900" />
              <span>Add Eco-friendly Gift Wrapping & Kerala Postcard (+₹49)</span>
            </label>
            {giftWrap && (
              <input
                type="text"
                placeholder="Personalized message on gift card (e.g., Happy Birthday Rahul!)..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full p-2 bg-white rounded-xl border border-zinc-200 text-xs"
              />
            )}
          </div>

          {/* Complete the Look / Mix & Match Bundle */}
          {pairedProduct && (
            <div className="p-4 bg-zinc-100/80 rounded-2xl border border-zinc-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-zinc-900" />
                  <span>Complete the Look (Mix & Match)</span>
                </span>
                <span className="text-[10px] font-bold bg-[#B4F724] text-black px-2 py-0.5 rounded">
                  SAVE 15% COMBO
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={pairedProduct.images[0]}
                  alt={pairedProduct.title}
                  className="w-14 h-16 rounded-xl object-cover bg-white border border-zinc-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 truncate">
                    {pairedProduct.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    Pair with: {pairedProduct.availableColors[0]?.name}
                  </p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xs font-bold text-zinc-900">Combo: ₹{bundlePrice}</span>
                    <span className="text-[10px] text-zinc-400 line-through">₹{product.price + pairedProduct.price}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddBundleToCart}
                  className="px-3 py-2 bg-black text-[#B4F724] text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                >
                  Add Both
                </button>
              </div>
            </div>
          )}

          {/* Delivery PIN Code Checker */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-zinc-900" />
                <span>Delivery to Kerala</span>
              </span>
              <button
                onClick={() => setIsPinModalOpen(true)}
                className="font-bold text-black underline cursor-pointer"
              >
                Change PIN
              </button>
            </div>

            {selectedPincode ? (
              <div className="text-xs text-zinc-600 space-y-1 pt-1">
                <p>
                  Destination: <strong>{selectedPincode.locality} ({selectedPincode.pincode})</strong>
                </p>
                <p className="text-emerald-700 font-semibold">
                  ✓ Estimated arrival in <strong>{selectedPincode.deliveryDays} business {selectedPincode.deliveryDays === 1 ? 'day' : 'days'}</strong>
                </p>
                <p className="text-zinc-500 text-[11px]">
                  Cash on Delivery: {selectedPincode.codAvailable ? 'Available' : 'Prepaid Only'}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsPinModalOpen(true)}
                className="text-xs text-zinc-500 hover:text-black underline cursor-pointer"
              >
                Enter your 6-digit Kerala PIN to check exact delivery date
              </button>
            )}
          </div>

          {/* Fabric & Kerala Humidity Specs */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 text-xs">
            <h3 className="font-bold text-zinc-900 uppercase tracking-wider">
              Fabric & Weather Specification
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              {product.fabric}
            </p>
            <ul className="space-y-1.5 text-zinc-600 list-disc pl-5">
              {product.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Care Instructions & Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-200 text-xs">
            <div className="flex items-start gap-2.5">
              <RotateCcw className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-bold">7-Day Free Exchange</strong>
                <span className="text-[11px] text-zinc-500">Doorstep Kerala return pickup</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-bold">100% Cotton Bio-Washed</strong>
                <span className="text-[11px] text-zinc-500">Won’t shrink or lose drape</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* VERIFIED CUSTOMER REVIEWS SECTION */}
      <section className="mt-16 pt-12 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-zinc-950">
              Verified Customer Reviews ({product.reviews.length})
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Real feedback from shoppers across Kerala
            </p>
          </div>

          <button
            onClick={() => setIsAddingReview(!isAddingReview)}
            className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Verified Review</span>
          </button>
        </div>

        {/* Review Form Drawer/Card */}
        {isAddingReview && (
          <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-zinc-50 rounded-3xl border border-zinc-200 max-w-xl space-y-3 text-xs">
            <h3 className="font-bold text-sm text-zinc-900">Your Experience with {product.title}</h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name (e.g. Rahul Nair)"
                value={newReviewForm.userName}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, userName: e.target.value })}
                className="bg-white p-2.5 rounded-xl border border-zinc-200"
                required
              />
              <input
                type="text"
                placeholder="City (e.g. Kochi, Kerala)"
                value={newReviewForm.userCity}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, userCity: e.target.value })}
                className="bg-white p-2.5 rounded-xl border border-zinc-200"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newReviewForm.rating}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: Number(e.target.value) })}
                className="bg-white p-2.5 rounded-xl border border-zinc-200 font-bold"
              >
                <option value={5}>★★★★★ 5 Stars (Exceptional)</option>
                <option value={4}>★★★★☆ 4 Stars (Great)</option>
                <option value={3}>★★★☆☆ 3 Stars (Good)</option>
              </select>
              <select
                value={newReviewForm.fitFeedback}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, fitFeedback: e.target.value as any })}
                className="bg-white p-2.5 rounded-xl border border-zinc-200"
              >
                <option value="Perfect oversized drape">Fit: Perfect oversized drape</option>
                <option value="True to size">Fit: True to size</option>
                <option value="Runs large">Fit: Runs large</option>
                <option value="Runs small">Fit: Runs small</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Headline (e.g. Best fabric for humid weather!)"
              value={newReviewForm.title}
              onChange={(e) => setNewReviewForm({ ...newReviewForm, title: e.target.value })}
              className="w-full bg-white p-2.5 rounded-xl border border-zinc-200 font-medium"
              required
            />
            <textarea
              rows={3}
              placeholder="Write your detailed review..."
              value={newReviewForm.comment}
              onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
              className="w-full bg-white p-2.5 rounded-xl border border-zinc-200"
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingReview(false)}
                className="px-4 py-2 text-zinc-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white font-bold rounded-xl"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-zinc-900">{rev.userName}</span>
                  <span className="text-[11px] text-zinc-400">({rev.userCity})</span>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <h4 className="text-xs font-bold text-zinc-900">{rev.title}</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
              
              {rev.fitFeedback && (
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Feedback: <strong>{rev.fitFeedback}</strong></span>
                  <span>{rev.date}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SIMILAR PRODUCTS / COMPLETE THE LOOK */}
      <section className="mt-16 pt-12 border-t border-zinc-200">
        <h2 className="font-display font-extrabold text-2xl text-zinc-950 mb-8">
          Similar Trending Fits in Kerala
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {similarProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* MOBILE STICKY BUY BAR (Complies with 15% Mobile Sticky Cap) */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md p-3 border-t border-zinc-200 shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-zinc-500 font-bold block">Size: {selectedSize}</span>
          <span className="font-display font-extrabold text-base text-zinc-950 tabular-nums">
            ₹{product.price}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 bg-zinc-100 text-zinc-900 font-extrabold text-xs rounded-xl"
          >
            Add
          </button>
          <button
            onClick={handleBuyNow}
            className="px-5 py-2.5 bg-black text-[#B4F724] font-extrabold text-xs rounded-xl shadow"
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
};
