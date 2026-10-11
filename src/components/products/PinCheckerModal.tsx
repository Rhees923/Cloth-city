import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, AlertCircle, Truck, Clock, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { KERALA_PINCODES } from '../../data/initialData';
import { KeralaDistrictPincode } from '../../types';

export const PinCheckerModal: React.FC = () => {
  const {
    isPinModalOpen,
    setIsPinModalOpen,
    selectedPincode,
    setSelectedPincode,
    showToast
  } = useStore();

  const [inputPin, setInputPin] = useState('');
  const [matchResult, setMatchResult] = useState<KeralaDistrictPincode | null>(selectedPincode);
  const [notFound, setNotFound] = useState(false);

  if (!isPinModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const clean = inputPin.trim();
    if (clean.length < 3) return;

    // Search by PIN or District Name
    const found = KERALA_PINCODES.find(
      (k) => k.pincode === clean || k.district.toLowerCase().includes(clean.toLowerCase()) || k.locality.toLowerCase().includes(clean.toLowerCase())
    );

    if (found) {
      setMatchResult(found);
      setNotFound(false);
    } else {
      setNotFound(true);
      setMatchResult(null);
    }
  };

  const handleSelectPincode = (item: KeralaDistrictPincode) => {
    setSelectedPincode(item);
    showToast(`Delivery location set to ${item.locality} (${item.pincode})`);
    setIsPinModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsPinModalOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 animate-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-zinc-900">
                  Select Kerala Delivery PIN Code
                </h3>
                <p className="text-xs text-zinc-500">
                  Check estimated dispatch & delivery dates for your district
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsPinModalOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-5 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputPin}
                onChange={(e) => {
                  setInputPin(e.target.value);
                  setNotFound(false);
                }}
                placeholder="Enter 6-digit PIN (e.g. 682001) or District"
                className="flex-1 bg-zinc-50 text-sm text-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-zinc-950 text-white hover:bg-black text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Check PIN
              </button>
            </div>
            {notFound && (
              <p className="text-xs text-amber-700 flex items-center gap-1.5 p-2 bg-amber-50 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>We ship to all 14 Kerala districts! Please select from the verified hubs below.</span>
              </p>
            )}
          </form>

          {/* Active Result Card */}
          {matchResult && (
            <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900">{matchResult.locality}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-zinc-200 text-zinc-800 rounded">
                      {matchResult.pincode}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{matchResult.district} District, Kerala</p>
                </div>
                <button
                  onClick={() => handleSelectPincode(matchResult)}
                  className="px-3 py-1.5 bg-[#B4F724] text-black hover:bg-[#a3e635] text-xs font-extrabold rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Location
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-200 grid grid-cols-2 gap-2 text-xs text-zinc-700">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-900" />
                  <span>Delivery in <strong>{matchResult.deliveryDays} business {matchResult.deliveryDays === 1 ? 'day' : 'days'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cash on Delivery: <strong>{matchResult.codAvailable ? 'Available' : 'Prepaid Only'}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Select Popular Kerala Hubs */}
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Major Kerala Distribution Hubs
            </p>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {KERALA_PINCODES.map((item) => (
                <button
                  key={item.pincode}
                  onClick={() => handleSelectPincode(item)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 text-left transition-colors cursor-pointer group"
                >
                  <div>
                    <span className="text-xs font-bold text-zinc-900 group-hover:text-black">
                      {item.locality.split('/')[0]}
                    </span>
                    <span className="text-[11px] text-zinc-500 ml-2">
                      ({item.district} · {item.pincode})
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-900">
                    {item.deliveryDays === 1 ? 'Next Day' : `${item.deliveryDays} Days`}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
