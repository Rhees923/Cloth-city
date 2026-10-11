import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, Size } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, isInWishlist, toggleWishlist, addToCart } = useStore();
  const [selectedQuickSize, setSelectedQuickSize] = useState<Size | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleQuickAdd = (e: React.MouseEvent, size: Size) => {
    e.stopPropagation();
    const variant = product.variants.find((v) => v.size === size);
    if (!variant || variant.stock === 0) return;

    addToCart(product, size, product.availableColors[0].name, 1);
    setSelectedQuickSize(size);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  return (
    <div
      onClick={() => navigateTo('product-detail', { id: product.id })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-zinc-200/90 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* 1. Image Showcase Container */}
      <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Status Tag (Max 1 subtle text tag) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isTrending && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black text-[#B4F724] px-2.5 py-1 rounded-md shadow-sm">
              Trending
            </span>
          )}
          {!product.isTrending && product.isNewArrival && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-zinc-900 text-white px-2.5 py-1 rounded-md shadow-sm">
              New Fit
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-10 ${
            isFavorited 
              ? 'bg-red-50 text-red-600 shadow-sm' 
              : 'bg-white/80 hover:bg-white text-zinc-600 hover:text-black'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Size Select Bar on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200 hidden sm:block z-10">
          <p className="text-[10px] text-white/90 font-bold uppercase tracking-wider mb-1.5 px-1">
            Quick Add Size
          </p>
          <div className="flex gap-1.5 justify-start">
            {product.variants.slice(0, 5).map((v) => (
              <button
                key={v.id}
                disabled={v.stock === 0}
                onClick={(e) => handleQuickAdd(e, v.size)}
                className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  v.stock === 0
                    ? 'bg-zinc-800/80 text-zinc-500 line-through cursor-not-allowed'
                    : selectedQuickSize === v.size && justAdded
                    ? 'bg-[#B4F724] text-black scale-105'
                    : 'bg-white/90 hover:bg-white text-black'
                }`}
              >
                {justAdded && selectedQuickSize === v.size ? <Check className="w-3 h-3 inline" /> : v.size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Product Details Content */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Fit Type */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium mb-1">
            <span className="uppercase tracking-wider font-semibold text-zinc-600">
              {product.fitType} Fit
            </span>
            <span>·</span>
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-zinc-900 group-hover:text-black line-clamp-1 leading-snug">
            {product.title}
          </h3>

          {/* Subtitle / Fabric snippet */}
          <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* 3. Rating & Pricing Strip */}
        <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-zinc-950 tabular-nums">
              ₹{product.price}
            </span>
            <span className="text-xs text-zinc-400 line-through tabular-nums">
              ₹{product.mrp}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 tabular-nums">
              {discountPercent}% OFF
            </span>
          </div>

          {/* Actual Rating */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-zinc-400 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
