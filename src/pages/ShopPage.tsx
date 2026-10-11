import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  X, 
  ChevronDown, 
  SlidersHorizontal,
  Search,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/products/ProductCard';
import { Gender, Category, FitType, Size, KeralaCollection } from '../types';

export const ShopPage: React.FC = () => {
  const { products, pageParams, navigateTo } = useStore();

  // Filter States
  const [selectedGender, setSelectedGender] = useState<string>(pageParams?.gender || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(pageParams?.category || 'all');
  const [selectedCollection, setSelectedCollection] = useState<string>(pageParams?.collection || 'all');
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [searchQuery, setSearchQuery] = useState<string>(pageParams?.q || '');
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'price-low' | 'price-high' | 'rating'>('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync state if pageParams changes
  React.useEffect(() => {
    if (pageParams?.gender) setSelectedGender(pageParams.gender);
    if (pageParams?.category) setSelectedCategory(pageParams.category);
    if (pageParams?.collection) setSelectedCollection(pageParams.collection);
    if (pageParams?.q) setSearchQuery(pageParams.q);
  }, [pageParams]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesSub = p.subtitle.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesSub) return false;
      }

      // Gender
      if (selectedGender !== 'all') {
        if (selectedGender === 'men' && p.gender !== 'men' && p.gender !== 'unisex') return false;
        if (selectedGender === 'women' && p.gender !== 'women' && p.gender !== 'unisex') return false;
        if (selectedGender === 'unisex' && p.gender !== 'unisex') return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Kerala Collection
      if (selectedCollection !== 'all') {
        if (selectedCollection === 'trending' && !p.isTrending) return false;
        if (selectedCollection === 'new-arrivals' && !p.isNewArrival) return false;
        if (selectedCollection === 'best-sellers' && !p.isBestSeller) return false;
        if (selectedCollection === 'under-499' && p.price > 499) return false;
        if (selectedCollection === 'under-999' && p.price > 999) return false;
        if (
          !['trending', 'new-arrivals', 'best-sellers', 'under-499', 'under-999'].includes(selectedCollection) &&
          !p.collections.includes(selectedCollection as KeralaCollection)
        ) {
          return false;
        }
      }

      // Fit
      if (selectedFit !== 'all' && p.fitType !== selectedFit) {
        return false;
      }

      // Size
      if (selectedSize !== 'all') {
        const hasSize = p.variants.some((v) => v.size === selectedSize && v.stock > 0);
        if (!hasSize) return false;
      }

      // Price
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, selectedGender, selectedCategory, selectedCollection, selectedFit, selectedSize, maxPrice, searchQuery]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    // Default: popularity / best seller
    return list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSelectedGender('all');
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedFit('all');
    setSelectedSize('all');
    setMaxPrice(2000);
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedGender !== 'all' || 
    selectedCategory !== 'all' || 
    selectedCollection !== 'all' || 
    selectedFit !== 'all' || 
    selectedSize !== 'all' || 
    maxPrice < 2000 || 
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* 1. Header & Breadcrumb Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 capitalize">
            {selectedCollection !== 'all' 
              ? selectedCollection.replace('-', ' ') 
              : selectedCategory !== 'all' 
              ? selectedCategory.replace('-', ' ') 
              : selectedGender !== 'all' 
              ? `${selectedGender}'s Fashion` 
              : 'All Kerala Streetwear'}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Showing {sortedProducts.length} curated products tailored for Kerala's weather
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex lg:hidden items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 shadow-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-1.5 shadow-sm text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-zinc-800 focus:outline-none cursor-pointer"
            >
              <option value="popularity">Sort: Popularity / Trending</option>
              <option value="newest">Sort: Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Main Layout: Filters Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-zinc-200 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <span className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wider">
              Filters
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-zinc-500 hover:text-black cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Department / Gender */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Department
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Departments' },
                { id: 'men', label: "Men's Fashion" },
                { id: 'women', label: "Women's Streetwear" },
                { id: 'unisex', label: 'Unisex Essentials' }
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer font-medium text-zinc-700 hover:text-black">
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === item.id}
                    onChange={() => setSelectedGender(item.id)}
                    className="text-black focus:ring-black"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'oversized-tshirts', label: 'Oversized T-Shirts' },
                { id: 'graphic-tshirts', label: 'Graphic T-Shirts' },
                { id: 'plain-tshirts', label: 'Plain Heavyweight Tees' },
                { id: 'shirts', label: 'Linen & Casual Shirts' },
                { id: 'pants-cargos', label: 'Pants & Cargos' },
                { id: 'jeans', label: 'Denim & Baggy Jeans' },
                { id: 'shorts', label: 'French Terry Shorts' },
                { id: 'coords', label: 'Co-Ord Sets' }
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer font-medium text-zinc-700 hover:text-black">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === item.id}
                    onChange={() => setSelectedCategory(item.id)}
                    className="text-black focus:ring-black"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Kerala Curated Collections */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Kerala Collections
            </label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Collections' },
                { id: 'onam-festive', label: 'Festival & Onam Edit' },
                { id: 'college-wear', label: 'College Wear Fits' },
                { id: 'monsoon-essentials', label: 'Monsoon Essentials' },
                { id: 'weekend-fits', label: 'Fort Kochi Weekend' },
                { id: 'under-499', label: 'Under ₹499 Budget Steals' },
                { id: 'under-999', label: 'Under ₹999 Daily Essentials' }
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer font-medium text-zinc-700 hover:text-black">
                  <input
                    type="radio"
                    name="collection"
                    checked={selectedCollection === item.id}
                    onChange={() => setSelectedCollection(item.id)}
                    className="text-black focus:ring-black"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-black text-[#B4F724] border-black'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                  }`}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              <span>Max Price</span>
              <span className="text-zinc-950 font-bold tabular-nums">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="399"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>₹399</span>
              <span>₹2000</span>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200">
              <Sparkles className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-zinc-800">No matching fits found</h3>
              <p className="text-xs text-zinc-500 mt-1 mb-4 max-w-sm mx-auto">
                Try widening your price range or clearing specific size filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="flex min-h-full items-end justify-center">
            <div className="relative w-full bg-white rounded-t-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto space-y-5 animate-in slide-in-from-bottom duration-200">
              
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <span className="font-display font-bold text-base text-zinc-950">Filter Products</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-zinc-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Department</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['all', 'men', 'women', 'unisex'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold capitalize ${
                        selectedGender === g ? 'bg-black text-[#B4F724] border-black' : 'border-zinc-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 text-xs"
                >
                  <option value="all">All Categories</option>
                  <option value="oversized-tshirts">Oversized T-Shirts</option>
                  <option value="graphic-tshirts">Graphic T-Shirts</option>
                  <option value="plain-tshirts">Plain T-Shirts</option>
                  <option value="shirts">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="pants-cargos">Pants & Cargos</option>
                  <option value="shorts">Shorts</option>
                  <option value="coords">Co-Ords</option>
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">
                  Max Price: ₹{maxPrice}
                </label>
                <input
                  type="range"
                  min="399"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 flex gap-3">
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="flex-1 py-2.5 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-black text-[#B4F724] rounded-xl text-xs font-bold"
                >
                  Apply Filters ({sortedProducts.length})
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
