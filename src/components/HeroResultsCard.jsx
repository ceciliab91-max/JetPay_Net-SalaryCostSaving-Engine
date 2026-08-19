import React from 'react';
import { ShieldAlert, PieChart, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/taxCalculator';

export default function HeroResultsCard({ results }) {
  const {
    nettoMensile,
    nettoAnnuale,
    totaleTrattenute,
    cuneoPercentuale,
    mensilita
  } = results;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
      
      <div>
        {/* Header Pill Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Netto in Busta Paga
          </span>
          <span className="text-xs font-mono font-medium text-slate-500">
            {mensilita} Mensilità
          </span>
        </div>

        {/* Hero Monthly Net Figure (Emerald Accent on White) */}
        <div className="space-y-1 my-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Stipendio Netto Mensile
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight font-mono">
              {formatCurrency(nettoMensile)}
            </span>
            <span className="text-sm font-semibold text-emerald-700">
              / mese
            </span>
          </div>
          <p className="text-xs text-slate-500 pt-1 font-normal">
            Calcolato su <span className="font-bold text-slate-900">{formatCurrency(nettoAnnuale)}</span> netti all'anno
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-100">
        
        {/* Total Deductions / Taxes Card */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              Totale Trattenute
            </p>
            <p className="text-sm font-bold text-slate-900 font-mono">
              {formatCurrency(totaleTrattenute)}
            </p>
            <p className="text-[10px] text-rose-600 font-medium">
              {formatPercent(cuneoPercentuale)} del lordo
            </p>
          </div>
        </div>

        {/* Tax Wedge % Card */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              Cuneo Fiscale %
            </p>
            <p className="text-sm font-bold text-slate-900 font-mono">
              {formatPercent(cuneoPercentuale)}
            </p>
            <p className="text-[10px] text-slate-500">
              Pressione fiscale totale
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
