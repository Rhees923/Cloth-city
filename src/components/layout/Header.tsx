import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  MapPin, 
  Menu, 
  X, 
  ShieldCheck, 
  Package, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const {
    navigateTo,
    currentPage,
    cartItemCount,
    wishlist,
    currentUser,
    logout,
    setIsCartOpen,
    setIsPinModalOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    selectedPincode,
    products,
    setIsCustomizerModalOpen,
    setIsAiStylistOpen,
    setIsVisualSearchOpen
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    navigateTo('shop', { q: searchQuery.trim() });
  };

  const trendingSearches = [
    'Oversized Drop Shoulder',
    'Tactical Baggy Cargos',
    'Onam Linen Co-Ord',
    'Monsoon Parachute Pants',
    'College Fit 240 GSM'
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      {/* 1. Slim Announcement Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wide">KERALA EXPRESS DISPATCH</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-300">Free delivery across 14 Kerala districts on orders over ₹999</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-zinc-400">
            <span>Use code <strong className="text-[#B4F724] font-semibold">KERALA20</strong> for 20% off</span>
            <span>·</span>
            <button 
              onClick={() => navigateTo('track-order')} 
              className="hover:text-white transition-colors underline-offset-2 hover:underline cursor-pointer"
            >
              Track Order
            </button>
            <span>·</span>
            <button 
              onClick={() => navigateTo('contact')} 
              className="hover:text-white transition-colors underline-offset-2 hover:underline cursor-pointer"
            >
              Help & Support
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          
          {/* Mobile menu trigger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-zinc-700 hover:text-black lg:hidden rounded-lg hover:bg-zinc-100 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* ClothCity Wordmark */}
            <button 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-black text-[#B4F724] font-extrabold flex items-center justify-center text-lg font-display tracking-tighter shadow-sm">
                CC
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-tight text-black group-hover:text-zinc-700 transition-colors">
                  CLOTHCITY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 -mt-1 hidden sm:block">
                  KERALA FASHION
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Categories Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-bold text-zinc-700 uppercase tracking-wider">
            <button
              onClick={() => navigateTo('shop', { gender: 'men' })}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'shop' ? 'text-black' : 'hover:text-black'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => navigateTo('shop', { gender: 'women' })}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'shop' ? 'text-black' : 'hover:text-black'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => navigateTo('shop', { gender: 'unisex' })}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'shop' ? 'text-black' : 'hover:text-black'
              }`}
            >
              Unisex
            </button>
            <button
              onClick={() => navigateTo('shop', { collection: 'onam-festive' })}
              className="relative text-zinc-900 font-extrabold hover:text-black transition-colors py-2 flex items-center gap-1 cursor-pointer"
            >
              <span>Kerala Edits</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B4F724]"></span>
            </button>
            
            {/* Customizer Studio Trigger */}
            <button
              onClick={() => setIsCustomizerModalOpen(true)}
              className="px-2.5 py-1 bg-black text-[#B4F724] rounded-lg text-[11px] font-extrabold tracking-wide hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Custom Tee</span>
              <span className="text-[9px] bg-[#B4F724] text-black px-1 rounded font-black">NEW</span>
            </button>

            {/* AI Sizing Consultant Trigger */}
            <button
              onClick={() => setIsAiStylistOpen(true)}
              className="text-zinc-600 hover:text-black transition-colors py-2 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#84cc16]" />
              <span>AI Stylist</span>
            </button>
          </nav>

          {/* Search Bar with Autocomplete & Visual Search */}
          <div ref={searchRef} className="relative flex-1 max-w-sm hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search oversized tees, cargos, linen..."
                className="w-full bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white text-xs text-zinc-900 placeholder-zinc-400 pl-9 pr-14 py-2.5 rounded-full border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsVisualSearchOpen(true)}
                    title="Search by outfit image"
                    className="text-zinc-400 hover:text-black cursor-pointer p-0.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-zinc-500 hover:text-black" />
                  </button>
                )}
              </div>
            </form>

            {/* Predictive Autocomplete Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {filteredSuggestions.length > 0 ? (
                  <div className="p-3">
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 pb-2">
                      Matching Catalog
                    </p>
                    {filteredSuggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery('');
                          navigateTo('product-detail', { id: product.id });
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 transition-colors text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-lg bg-zinc-100"
                          />
                          <div>
                            <p className="text-sm font-semibold text-zinc-900 group-hover:text-black line-clamp-1">
                              {product.title}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {product.category.replace('-', ' ')} · ₹{product.price}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-zinc-900" />
                      Popular in Kerala Right Now
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setIsSearchFocused(false);
                            navigateTo('shop', { q: term });
                          }}
                          className="text-xs px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons: PIN, Wishlist, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Kerala Delivery PIN Selector Button */}
            <button
              onClick={() => setIsPinModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-zinc-900" />
              <span>
                {selectedPincode ? (
                  <span className="font-semibold text-zinc-900">{selectedPincode.locality.split('/')[0]} ({selectedPincode.pincode})</span>
                ) : (
                  <span>Deliver to: Kerala PIN</span>
                )}
              </span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2.5 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#B4F724] text-zinc-950 text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account / Admin Menu */}
            <div className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700 font-bold">
                  {currentUser ? currentUser.name.charAt(0) : <User className="w-4 h-4" />}
                </div>
                <span className="hidden md:block">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Account Dropdown */}
              {isAccountMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-zinc-200 p-2 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setIsAccountMenuOpen(false)}
                >
                  {currentUser ? (
                    <>
                      <div className="p-3 border-b border-zinc-100">
                        <p className="text-sm font-bold text-zinc-900">{currentUser.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{currentUser.email}</p>
                        {currentUser.role === 'admin' && (
                          <span className="inline-block mt-1 text-[10px] font-bold bg-[#B4F724] text-black px-2 py-0.5 rounded">
                            Store Administrator
                          </span>
                        )}
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            navigateTo('account');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors text-left cursor-pointer"
                        >
                          <User className="w-4 h-4 text-zinc-400" />
                          My Account Dashboard
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            navigateTo('orders');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors text-left cursor-pointer"
                        >
                          <Package className="w-4 h-4 text-zinc-400" />
                          My Orders & Tracking
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            navigateTo('wishlist');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors text-left cursor-pointer"
                        >
                          <Heart className="w-4 h-4 text-zinc-400" />
                          Wishlist
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            navigateTo('admin');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors text-left cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-zinc-900" />
                          Admin Console
                        </button>
                      </div>
                      <div className="pt-1 border-t border-zinc-100">
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3">
                      <p className="text-xs text-zinc-600 mb-3">
                        Welcome to ClothCity. Sign in to view your orders, saved addresses, and wishlist.
                      </p>
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          setAuthModalMode('login');
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full py-2 px-3 bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                      >
                        Sign In / Register
                      </button>
                      <div className="mt-2 text-center">
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            navigateTo('admin');
                          }}
                          className="text-[11px] text-zinc-500 hover:text-black underline cursor-pointer"
                        >
                          Admin Access Portal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Row (visible on small screens) */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kerala oversized fits, cargos..."
              className="w-full bg-zinc-100 text-xs text-zinc-900 placeholder-zinc-400 pl-9 pr-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-black text-[#B4F724] font-extrabold flex items-center justify-center text-sm">
                  CC
                </div>
                <span className="font-display font-bold text-lg text-black">CLOTHCITY</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-zinc-500 hover:text-black rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Shop by Department
                </p>
                <div className="space-y-1 text-sm font-semibold">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop', { gender: 'men' }); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 cursor-pointer"
                  >
                    <span>Men's Fashion</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop', { gender: 'women' }); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 cursor-pointer"
                  >
                    <span>Women's Fashion</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop', { gender: 'unisex' }); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 cursor-pointer"
                  >
                    <span>Unisex Streetwear</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Curated Kerala Edits
                </p>
                <div className="space-y-1 text-sm font-medium">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop', { collection: 'onam-festive' }); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 cursor-pointer"
                  >
                    <span>Festival & Onam Co-Ords</span>
                    <span className="text-[10px] bg-[#B4F724] px-1.5 py-0.5 rounded font-bold text-black">HOT</span>
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop', { collection: 'college-wear' }); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 cursor-pointer"
                  >
                    <span>Kerala College Fits</span>
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop', { collection: 'monsoon-essentials' }); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 cursor-pointer"
                  >
                    <span>Monsoon Hydro Pants</span>
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop', { collection: 'under-999' }); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-900 cursor-pointer"
                  >
                    <span>Under ₹999 Budget Finds</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Customer & Policies
                </p>
                <div className="space-y-1 text-xs text-zinc-600">
                  <button onClick={() => { setIsMobileMenuOpen(false); navigateTo('size-guide'); }} className="block p-2 hover:text-black">Kerala Size Chart</button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigateTo('shipping-policy'); }} className="block p-2 hover:text-black">Kerala Shipping & Delivery</button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigateTo('returns'); }} className="block p-2 hover:text-black">Returns & 7-Day Exchange</button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigateTo('about'); }} className="block p-2 hover:text-black">Our Kerala Story</button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigateTo('contact'); }} className="block p-2 hover:text-black">Contact & WhatsApp</button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigateTo('admin'); }} className="block p-2 font-bold text-black">Admin Console</button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-200 bg-zinc-50">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPinModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800"
              >
                <MapPin className="w-3.5 h-3.5 text-zinc-900" />
                <span>Deliver to: {selectedPincode?.locality || 'Select Kerala PIN'}</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
