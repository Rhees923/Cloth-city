import React, { useState } from 'react';
import { X, Camera, Upload, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';

export const VisualSearchModal: React.FC = () => {
  const { isVisualSearchOpen, setIsVisualSearchOpen, products, navigateTo } = useStore();
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState<any[]>([]);

  if (!isVisualSearchOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPreview(reader.result as string);
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          // Match 3 closest products from catalog
          setMatchedProducts(products.slice(0, 3));
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsVisualSearchOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-zinc-900" />
              <h3 className="font-display font-extrabold text-lg text-zinc-950">
                Visual Outfit Matcher
              </h3>
            </div>
            <button
              onClick={() => setIsVisualSearchOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-black rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-6 text-xs">
            {!uploadedPreview ? (
              <div className="p-8 border-2 border-dashed border-zinc-300 hover:border-black rounded-3xl text-center space-y-3 bg-zinc-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-zinc-200 text-zinc-600 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900">Upload an outfit screenshot or photo</p>
                  <p className="text-zinc-500 mt-0.5">We'll scan for similar oversized fits, cargos, and linen shirts in our Kerala catalog</p>
                </div>
                <label className="inline-block px-5 py-2.5 bg-black text-[#B4F724] font-extrabold rounded-xl cursor-pointer">
                  <span>Browse Photo</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <img src={uploadedPreview} alt="Uploaded outfit" className="w-16 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <span className="font-bold text-zinc-900 block">Visual Search Analysis</span>
                    <span className="text-zinc-500">
                      {isAnalyzing ? 'Matching aesthetic and silhouette...' : 'Detected: Relaxed Kerala Streetwear & Baggy Utility'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedPreview(null);
                      setMatchedProducts([]);
                    }}
                    className="text-xs font-bold text-zinc-500 hover:text-black underline cursor-pointer"
                  >
                    Change Image
                  </button>
                </div>

                {isAnalyzing ? (
                  <div className="py-8 text-center text-xs text-zinc-500 font-semibold flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-zinc-900" />
                    <span>Searching Kerala fashion catalog...</span>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-zinc-950 mb-3">
                      Closest Matching Fits in Store:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {matchedProducts.map((p) => (
                        <div 
                          key={p.id}
                          onClick={() => {
                            setIsVisualSearchOpen(false);
                            navigateTo('product-detail', { id: p.id });
                          }}
                          className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl border border-zinc-200 cursor-pointer transition-colors"
                        >
                          <img src={p.images[0]} alt="" className="w-full aspect-[4/5] object-cover rounded-xl" />
                          <p className="font-bold text-zinc-900 mt-2 line-clamp-1">{p.title}</p>
                          <p className="font-extrabold text-zinc-900 mt-0.5">₹{p.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
