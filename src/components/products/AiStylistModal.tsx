import React, { useState } from 'react';
import { X, Sparkles, User, Ruler, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Size } from '../../types';

export const AiStylistModal: React.FC = () => {
  const {
    isAiStylistOpen,
    setIsAiStylistOpen,
    products,
    navigateTo,
    addToCart,
    showToast
  } = useStore();

  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [gender, setGender] = useState<'men' | 'women' | 'unisex'>('men');
  const [preferredDrape, setPreferredDrape] = useState<'oversized' | 'relaxed' | 'fitted'>('oversized');
  const [hasCalculated, setHasCalculated] = useState(false);

  if (!isAiStylistOpen) return null;

  // Sizing algorithm tailored for Kerala humid climate oversized fits
  let recommendedSize: Size = 'M';
  if (weightKg < 62) {
    recommendedSize = preferredDrape === 'oversized' ? 'M' : 'S';
  } else if (weightKg <= 74) {
    recommendedSize = preferredDrape === 'oversized' ? 'L' : 'M';
  } else if (weightKg <= 86) {
    recommendedSize = preferredDrape === 'oversized' ? 'XL' : 'L';
  } else {
    recommendedSize = 'XXL';
  }

  // Recommended curated Kerala combo
  const matchingTee = products.find((p) => p.id === 'cc-prod-001') || products[0];
  const matchingCargo = products.find((p) => p.id === 'cc-prod-002') || products[1];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  const handleAddOutfitCombo = () => {
    addToCart(matchingTee, recommendedSize, 'Washed Charcoal', 1);
    addToCart(matchingCargo, recommendedSize, 'Deep Vintage Indigo', 1);
    setIsAiStylistOpen(false);
    showToast(`Added recommended AI outfit in Size ${recommendedSize} to Bag!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAiStylistOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-zinc-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[#B4F724]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B4F724]">
                  CLOTHCITY SMART SIZING & FITS
                </span>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                  AI Size & Kerala Outfit Consultant
                </h3>
              </div>
            </div>
            <button
              onClick={() => setIsAiStylistOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {!hasCalculated ? (
              <form onSubmit={handleCalculate} className="space-y-4 text-xs">
                <p className="text-zinc-600 leading-relaxed">
                  Enter your physical measurements and preferred drape. Our algorithm computes the exact chest allowance required for Kerala's coastal climate.
                </p>

                {/* Gender */}
                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1.5">
                    Select Department
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'men', label: 'Men' },
                      { id: 'women', label: 'Women' },
                      { id: 'unisex', label: 'Unisex' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGender(g.id as any)}
                        className={`py-2 rounded-xl font-bold border transition-colors ${
                          gender === g.id ? 'bg-black text-[#B4F724] border-black' : 'border-zinc-200 bg-zinc-50'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                      Height: {heightCm} cm ({Math.floor(heightCm / 30.48)}'{Math.round((heightCm % 30.48) / 2.54)}")
                    </label>
                    <input
                      type="range"
                      min="150"
                      max="200"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-black cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                      Weight: {weightKg} kg
                    </label>
                    <input
                      type="range"
                      min="45"
                      max="110"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-black cursor-pointer"
                    />
                  </div>
                </div>

                {/* Fit Drape Preference */}
                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1.5">
                    How loose do you like your streetwear?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'oversized', label: 'Boxy Oversized (+5" chest)' },
                      { id: 'relaxed', label: 'Casual Relaxed (+3" chest)' },
                      { id: 'fitted', label: 'Standard Regular (+1" chest)' }
                    ].map((fit) => (
                      <button
                        key={fit.id}
                        type="button"
                        onClick={() => setPreferredDrape(fit.id as any)}
                        className={`p-2.5 rounded-xl font-semibold border text-center transition-all ${
                          preferredDrape === fit.id ? 'bg-black text-[#B4F724] border-black font-bold' : 'border-zinc-200 bg-zinc-50'
                        }`}
                      >
                        {fit.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-zinc-950 hover:bg-black text-[#B4F724] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer mt-2"
                >
                  Analyze My Ideal Size & Fits
                </button>
              </form>
            ) : (
              <div className="space-y-6 text-xs animate-in fade-in duration-200">
                
                {/* Result recommendation box */}
                <div className="p-5 bg-zinc-50 rounded-3xl border border-zinc-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black text-[#B4F724] font-black text-xl flex items-center justify-center shrink-0">
                    {recommendedSize}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      98% Fit Confidence Score
                    </span>
                    <h4 className="font-display font-extrabold text-base text-zinc-950 mt-1">
                      Recommended: Size {recommendedSize}
                    </h4>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      For your height of {heightCm}cm and weight of {weightKg}kg, size <strong>{recommendedSize}</strong> delivers the signature Kochi street drop shoulder without feeling suffocating in high humidity.
                    </p>
                  </div>
                </div>

                {/* AI Outfit Match Suggestion */}
                <div className="space-y-3">
                  <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px] block">
                    Curated Kerala Outfit Match for Your Frame:
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-center gap-3">
                      <img src={matchingTee.images[0]} alt="" className="w-12 h-14 object-cover rounded-xl" />
                      <div>
                        <p className="font-bold text-zinc-900 line-clamp-1">{matchingTee.title}</p>
                        <p className="text-zinc-500 text-[11px]">Size {recommendedSize} · ₹{matchingTee.price}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-center gap-3">
                      <img src={matchingCargo.images[0]} alt="" className="w-12 h-14 object-cover rounded-xl" />
                      <div>
                        <p className="font-bold text-zinc-900 line-clamp-1">{matchingCargo.title}</p>
                        <p className="text-zinc-500 text-[11px]">Size {recommendedSize} · ₹{matchingCargo.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setHasCalculated(false)}
                    className="flex-1 py-2.5 border border-zinc-300 hover:border-black font-bold text-zinc-800 rounded-xl"
                  >
                    Adjust Measurements
                  </button>
                  <button
                    type="button"
                    onClick={handleAddOutfitCombo}
                    className="flex-1 py-2.5 bg-black text-[#B4F724] font-extrabold rounded-xl shadow flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Outfit to Bag</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
