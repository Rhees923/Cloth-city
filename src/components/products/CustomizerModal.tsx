import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Upload, Type, Move, Palette } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Size } from '../../types';

export const CustomizerModal: React.FC = () => {
  const {
    isCustomizerModalOpen,
    setIsCustomizerModalOpen,
    products,
    addToCart,
    showToast
  } = useStore();

  const baseProduct = products.find((p) => p.category === 'oversized-tshirts') || products[0];

  const [customText, setCustomText] = useState('KOCHI 0484');
  const [printPosition, setPrintPosition] = useState<'chest' | 'front' | 'back'>('back');
  const [fontStyle, setFontStyle] = useState<'cyber' | 'minimal' | 'bold'>('cyber');
  const [selectedColor, setSelectedColor] = useState('#27272a');
  const [colorName, setColorName] = useState('Washed Charcoal');
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  if (!isCustomizerModalOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedLogo(reader.result as string);
        showToast('Custom graphic logo uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomTeeToCart = () => {
    if (!customText && !uploadedLogo) {
      alert('Please enter custom text or upload a logo.');
      return;
    }

    addToCart(
      baseProduct,
      selectedSize,
      colorName,
      1,
      `Custom Print: "${customText}" (${printPosition.toUpperCase()})`,
      printPosition
    );

    setIsCustomizerModalOpen(false);
    showToast(`Added your custom designed ${colorName} Streetwear Tee to Bag!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCustomizerModalOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-zinc-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B4F724] text-black font-extrabold flex items-center justify-center text-sm">
                CC
              </div>
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#B4F724] uppercase">
                  CLOTHCITY MAKER STUDIO
                </span>
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
                  Custom Kerala Streetwear Designer
                </h2>
              </div>
            </div>
            <button
              onClick={() => setIsCustomizerModalOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6">
            
            {/* Visual Canvas Mockup (Left 6 cols) */}
            <div className="md:col-span-6 flex flex-col items-center justify-center bg-zinc-100 p-6 rounded-3xl border border-zinc-200 relative overflow-hidden">
              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase bg-white/80 text-zinc-700 px-2 py-0.5 rounded shadow-sm">
                Live Preview: {printPosition.toUpperCase()} VIEW
              </span>

              {/* T-Shirt Canvas Mockup SVG/CSS */}
              <div 
                className="relative w-64 h-80 rounded-3xl shadow-lg flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: selectedColor }}
              >
                {/* Collar Rib Simulation */}
                <div className="absolute top-2 w-20 h-6 border-b-4 border-white/20 rounded-full" />

                {/* Print Placement Zone */}
                <div className={`p-4 text-center max-w-[180px] ${
                  printPosition === 'chest' ? '-mt-24 ml-12' : printPosition === 'front' ? 'mt-0' : 'mt-0'
                }`}>
                  {uploadedLogo && (
                    <img 
                      src={uploadedLogo} 
                      alt="Uploaded Logo" 
                      className="w-16 h-16 object-contain mx-auto mb-2 drop-shadow"
                    />
                  )}
                  {customText && (
                    <span className={`block tracking-tighter leading-none select-none text-[#B4F724] drop-shadow-md ${
                      fontStyle === 'cyber' 
                        ? 'font-black uppercase text-xl font-mono' 
                        : fontStyle === 'bold' 
                        ? 'font-extrabold uppercase text-lg font-display' 
                        : 'font-semibold tracking-widest text-sm uppercase'
                    }`}>
                      {customText}
                    </span>
                  )}
                  <span className="block text-[8px] tracking-widest text-white/50 uppercase mt-1">
                    CLOTHCITY KERALA
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 mt-3 text-center">
                High-density puff screen print · Won't crack or fade after washing
              </p>
            </div>

            {/* Customization Controls (Right 6 cols) */}
            <div className="md:col-span-6 space-y-4 text-xs">
              
              {/* Custom Text Input */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                  Custom Slogan / Name / Fest Text
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                    maxLength={24}
                    placeholder="e.g. KOCHI 0484 / CUSAT 26"
                    className="w-full bg-zinc-50 font-bold text-zinc-900 p-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                  <Type className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <div className="flex gap-1.5 mt-1 text-[10px] text-zinc-500">
                  <span>Quick ideas:</span>
                  <button type="button" onClick={() => setCustomText('FORT KOCHI')} className="hover:underline font-bold text-zinc-800">FORT KOCHI</button>
                  <span>·</span>
                  <button type="button" onClick={() => setCustomText('CALICUT 673')} className="hover:underline font-bold text-zinc-800">CALICUT 673</button>
                  <span>·</span>
                  <button type="button" onClick={() => setCustomText('MALABAR')} className="hover:underline font-bold text-zinc-800">MALABAR</button>
                </div>
              </div>

              {/* Upload Logo Option */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                  Upload Custom Graphic / College Logo
                </label>
                <label className="flex items-center justify-center gap-2 p-2.5 border-2 border-dashed border-zinc-300 hover:border-black rounded-xl cursor-pointer bg-zinc-50 transition-colors">
                  <Upload className="w-4 h-4 text-zinc-600" />
                  <span className="font-semibold text-zinc-700">Choose PNG / SVG transparent file</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>

              {/* Print Position */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                  Placement Zone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'back', label: 'Big Back Print' },
                    { id: 'front', label: 'Center Chest' },
                    { id: 'chest', label: 'Left Minimal' }
                  ].map((pos) => (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => setPrintPosition(pos.id as any)}
                      className={`p-2 rounded-xl border font-bold text-[11px] transition-all cursor-pointer ${
                        printPosition === pos.id 
                          ? 'bg-black text-[#B4F724] border-black shadow-sm' 
                          : 'bg-white text-zinc-700 border-zinc-200'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Garment Color Swatches */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                  Heavyweight Garment Color
                </label>
                <div className="flex gap-2">
                  {[
                    { name: 'Washed Charcoal', hex: '#27272a' },
                    { name: 'Pitch Black', hex: '#09090b' },
                    { name: 'Olive Green', hex: '#3f4f34' },
                    { name: 'Chalk White', hex: '#f4f4f5' }
                  ].map((col) => (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(col.hex);
                        setColorName(col.name);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer text-[11px] ${
                        selectedColor === col.hex ? 'border-black ring-1 ring-black font-bold' : 'border-zinc-200'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Select */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider text-[11px] mb-1">
                  Size (240 GSM Oversized Drape)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['S', 'M', 'L', 'XL', 'XXL'] as Size[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                        selectedSize === sz ? 'bg-black text-[#B4F724] border-black' : 'border-zinc-200 bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold block">Base Tee (₹699) + Custom Print (₹150)</span>
                  <span className="font-extrabold text-base text-zinc-950">₹849</span>
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomTeeToCart}
                  className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-[#B4F724] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Custom Tee</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
