import React from 'react';
import { Home, Grid, Heart, User, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileNav: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    cartItemCount, 
    wishlist, 
    setIsCartOpen,
    currentUser,
    setIsAuthModalOpen
  } = useStore();

  const handleAccountClick = () => {
    if (currentUser) {
      navigateTo('account');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 lg:hidden px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors cursor-pointer ${
            currentPage === 'home' ? 'text-black' : 'text-zinc-500 hover:text-black'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        {/* 2. Shop Categories */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors cursor-pointer ${
            currentPage === 'shop' ? 'text-black' : 'text-zinc-500 hover:text-black'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Shop</span>
        </button>

        {/* 3. Wishlist */}
        <button
          onClick={() => navigateTo('wishlist')}
          className={`relative flex flex-col items-center gap-0.5 p-1 transition-colors cursor-pointer ${
            currentPage === 'wishlist' ? 'text-black' : 'text-zinc-500 hover:text-black'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] font-semibold">Wishlist</span>
        </button>

        {/* 4. Bag / Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-0.5 p-1 text-zinc-500 hover:text-black transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-[#B4F724] text-black text-[9px] font-extrabold rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="text-[10px] font-semibold">Bag</span>
        </button>

        {/* 5. Account */}
        <button
          onClick={handleAccountClick}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors cursor-pointer ${
            currentPage.startsWith('account') ? 'text-black' : 'text-zinc-500 hover:text-black'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold">
            {currentUser ? 'Account' : 'Sign In'}
          </span>
        </button>
      </div>
    </nav>
  );
};
