import React from 'react';
import { Euro, MapPin, Calendar, Sliders } from 'lucide-react';

export default function CalculatorInputs({
  ral,
  onChangeRal,
  city,
  onChangeCity,
  mensilita,
  onChangeMensilita
}) {
  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      onChangeRal(num);
    } else if (val === '') {
      onChangeRal(0);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-900">
            <Sliders className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
            Parametri di Calcolo
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-mono">TUIR 2026 Engine</span>
      </div>

      <div className="space-y-6">

        {/* RAL Input & Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="ral-numeric" className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <Euro className="w-4 h-4 text-slate-700" />
              Retribuzione Annua Lorda (RAL)
            </label>
            <span className="text-xs text-slate-500 font-medium">
              Range: €10.000 — €120.000
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Range Slider */}
            <div className="md:col-span-2 space-y-2">
              <input
                id="ral-slider"
                type="range"
                min="10000"
                max="120000"
                step="500"
                value={ral}
                onChange={(e) => onChangeRal(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>€10.000</span>
                <span>€35.000</span>
                <span>€65.000</span>
                <span>€90.000</span>
                <span>€120.000</span>
              </div>
            </div>

            {/* Numeric Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700 font-bold">
                €
              </div>
              <input
                id="ral-numeric"
                type="text"
                value={ral === 0 ? '' : ral.toLocaleString('it-IT')}
                onChange={handleInputChange}
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-lg focus:ring-2 focus:ring-black focus:border-black transition-all font-mono"
                placeholder="32.000"
              />
            </div>
          </div>
        </div>

        {/* Controls Grid: City & Mensilità */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          
          {/* City Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-700" />
              Città di Residenza
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl">
              <button
                type="button"
                onClick={() => onChangeCity('Milano')}
                className={`py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1 ${
                  city === 'Milano'
                    ? 'bg-black text-white font-medium shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent font-normal'
                }`}
              >
                <span>Milano</span>
                <span className="text-[10px] opacity-70 font-normal">(Lombardia)</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeCity('Roma')}
                className={`py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1 ${
                  city === 'Roma'
                    ? 'bg-black text-white font-medium shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent font-normal'
                }`}
              >
                <span>Roma</span>
                <span className="text-[10px] opacity-70 font-normal">(Lazio)</span>
              </button>
            </div>
          </div>

          {/* Mensilità Switch */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-700" />
              Numero Mensilità
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl">
              <button
                type="button"
                onClick={() => onChangeMensilita(13)}
                className={`py-2 px-3 rounded-lg text-xs transition-all ${
                  mensilita === 13
                    ? 'bg-black text-white font-medium shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent font-normal'
                }`}
              >
                13 Mensilità
              </button>
              <button
                type="button"
                onClick={() => onChangeMensilita(14)}
                className={`py-2 px-3 rounded-lg text-xs transition-all ${
                  mensilita === 14
                    ? 'bg-black text-white font-medium shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent font-normal'
                }`}
              >
                14 Mensilità
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
