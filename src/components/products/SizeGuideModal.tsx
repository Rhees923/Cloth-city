import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, Info, Globe, HelpCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [activeTab, setActiveTab] = useState<'chart' | 'international' | 'howToMeasure'>('chart');

  if (!isSizeGuideOpen) return null;

  const sizeTable = [
    { size: 'S', chestIn: '42', chestCm: '107', lengthIn: '28', lengthCm: '71', shoulderIn: '21', shoulderCm: '53', bodyType: 'Slim to Athletic' },
    { size: 'M', chestIn: '44', chestCm: '112', lengthIn: '29', lengthCm: '74', shoulderIn: '22', shoulderCm: '56', bodyType: 'Regular / Average' },
    { size: 'L', chestIn: '46', chestCm: '117', lengthIn: '30', lengthCm: '76', shoulderIn: '23', shoulderCm: '58', bodyType: 'Athletic / Broad' },
    { size: 'XL', chestIn: '48', chestCm: '122', lengthIn: '31', lengthCm: '79', shoulderIn: '24', shoulderCm: '61', bodyType: 'Broad / Heavy' },
    { size: 'XXL', chestIn: '50', chestCm: '127', lengthIn: '32', lengthCm: '81', shoulderIn: '25', shoulderCm: '63', bodyType: 'Plus Size / Maximum Drape' }
  ];

  const internationalConversions = [
    { size: 'S', ind: '38', uk: '38', us: '38 (S)', eu: '48', jp: 'M (Asia)', height: '5\'6" - 5\'8"' },
    { size: 'M', ind: '40', uk: '40', us: '40 (M)', eu: '50', jp: 'L (Asia)', height: '5\'8" - 5\'10"' },
    { size: 'L', ind: '42', uk: '42', us: '42 (L)', eu: '52', jp: 'XL (Asia)', height: '5\'10" - 6\'0"' },
    { size: 'XL', ind: '44', uk: '44', us: '44 (XL)', eu: '54', jp: 'XXL (Asia)', height: '6\'0" - 6\'2"' },
    { size: 'XXL', ind: '46', uk: '46', us: '46 (XXL)', eu: '56', jp: '3XL (Asia)', height: '6\'2"+' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-zinc-900">
                  ClothCity Sizing & Fit Guide
                </h3>
                <p className="text-xs text-zinc-500">
                  Tailored for Kerala streetwear oversized & relaxed drapes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-2 mt-4 pb-2 border-b border-zinc-100 text-xs font-bold">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                activeTab === 'chart' ? 'bg-zinc-950 text-[#B4F724]' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              }`}
            >
              Garment Dimensions
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors flex items-center gap-1 ${
                activeTab === 'international' ? 'bg-zinc-950 text-[#B4F724]' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>International Conversion</span>
            </button>
            <button
              onClick={() => setActiveTab('howToMeasure')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors flex items-center gap-1 ${
                activeTab === 'howToMeasure' ? 'bg-zinc-950 text-[#B4F724]' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Measurement Guide</span>
            </button>
          </div>

          {activeTab === 'chart' && (
            <>
              {/* Unit Toggle */}
              <div className="flex items-center justify-between mt-4 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Dimensions ({unit})
                </span>
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
                  <button
                    onClick={() => setUnit('inches')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      unit === 'inches' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-black'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      unit === 'cm' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-black'
                    }`}
                  >
                    Centimetres
                  </button>
                </div>
              </div>

              {/* Sizing Table */}
              <div className="overflow-x-auto border border-zinc-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-200">
                    <tr>
                      <th className="p-3">Size</th>
                      <th className="p-3">Chest ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Length ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Shoulder ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3 hidden sm:table-cell">Recommended Fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {sizeTable.map((row) => (
                      <tr key={row.size} className="hover:bg-zinc-50 font-medium">
                        <td className="p-3 font-bold text-zinc-900 bg-zinc-50/50">{row.size}</td>
                        <td className="p-3 tabular-nums font-semibold text-zinc-800">
                          {unit === 'inches' ? row.chestIn : row.chestCm}
                        </td>
                        <td className="p-3 tabular-nums text-zinc-700">
                          {unit === 'inches' ? row.lengthIn : row.lengthCm}
                        </td>
                        <td className="p-3 tabular-nums text-zinc-700">
                          {unit === 'inches' ? row.shoulderIn : row.shoulderCm}
                        </td>
                        <td className="p-3 text-zinc-500 hidden sm:table-cell">
                          {row.bodyType}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'international' && (
            <div className="mt-4 space-y-4">
              <p className="text-xs text-zinc-500">
                Converting standard Indian, UK, US, European, and Asian size conventions for overseas shoppers and NRIs.
              </p>
              <div className="overflow-x-auto border border-zinc-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-200">
                    <tr>
                      <th className="p-3">ClothCity</th>
                      <th className="p-3">India / UK</th>
                      <th className="p-3">US</th>
                      <th className="p-3">EU</th>
                      <th className="p-3">Japan / Asia</th>
                      <th className="p-3">Ideal Height</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {internationalConversions.map((r) => (
                      <tr key={r.size} className="hover:bg-zinc-50 font-medium">
                        <td className="p-3 font-bold text-zinc-950 bg-zinc-50/50">{r.size}</td>
                        <td className="p-3 text-zinc-800">{r.ind}</td>
                        <td className="p-3 text-zinc-800">{r.us}</td>
                        <td className="p-3 text-zinc-800">{r.eu}</td>
                        <td className="p-3 text-zinc-800">{r.jp}</td>
                        <td className="p-3 text-zinc-500">{r.height}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'howToMeasure' && (
            <div className="mt-4 space-y-3 text-xs text-zinc-600">
              <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-1">
                <strong className="text-zinc-900 block font-bold">1. Chest Circumference</strong>
                <p>Measure horizontally around the fullest part of your chest, keeping the tape snug under armpits.</p>
              </div>
              <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-1">
                <strong className="text-zinc-900 block font-bold">2. Drop Shoulder Width</strong>
                <p>Measure across from the point where the shoulder seam naturally falls off the shoulder blade for relaxed aesthetic.</p>
              </div>
              <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-1">
                <strong className="text-zinc-900 block font-bold">3. Garment Body Length</strong>
                <p>Measure from the highest point of the neck ribbing straight down to the bottom hem.</p>
              </div>
            </div>
          )}

          {/* Kerala Weather & Fit Guidelines */}
          <div className="mt-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
              <Info className="w-4 h-4 text-zinc-900" />
              <span>How our fits are tailored for Kerala's Climate:</span>
            </div>
            <ul className="text-xs text-zinc-600 space-y-1.5 pl-6 list-disc">
              <li>
                <strong>Oversized Fits:</strong> Intentionally cut with a 4–6 inch chest allowance over regular tees for airy circulation during hot coastal afternoons.
              </li>
              <li>
                <strong>True-to-Size Pick:</strong> Buy your regular shirt size for the authentic loose streetwear drape seen in our lookbook.
              </li>
              <li>
                <strong>Pre-Shrunk Bio-Washed:</strong> 240 GSM heavy combed cotton undergoes silicon softening so your garment will not shrink after home washing.
              </li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-6 py-2.5 bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
