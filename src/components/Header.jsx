import React from 'react';
import { Rocket, Sparkles, TrendingUp } from 'lucide-react';

export default function Header({ ral, onSelectPreset }) {
  const presets = [25000, 35000, 45000, 60000];

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand Logo & Title (Solid Black Jet HR Minimalist Style) */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center shadow-sm">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-extrabold text-xl tracking-tight text-black font-sans">
                  Jet HR
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-600" />
                  Product Prototype
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Net Salary & Cost-Saving Engine — Product Builder Team
              </p>
            </div>
          </div>

          {/* Quick Presets (B&W Brutalist Style) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <TrendingUp className="w-3.5 h-3.5 text-slate-700" /> Preset RAL:
            </span>
            {presets.map((presetVal) => {
              const isActive = ral === presetVal;
              return (
                <button
                  key={presetVal}
                  onClick={() => onSelectPreset(presetVal)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white font-medium shadow-sm scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent font-normal'
                  }`}
                >
                  €{(presetVal / 1000).toFixed(0)}k
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </header>
  );
}
