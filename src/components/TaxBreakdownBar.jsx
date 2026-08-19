import React from 'react';
import { formatCurrency, formatPercent } from '../utils/taxCalculator';

export default function TaxBreakdownBar({ results }) {
  const {
    nettoAnnuale,
    inps,
    totaleFisco,
    ral,
    pctNetto,
    pctInps,
    pctFisco
  } = results;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Ripartizione della Retribuzione Annua Lorda (RAL)
          </h3>
          <p className="text-xs text-slate-500 font-normal">
            Suddivisione percentuale tra guadagno effettivo, previdenza ed erario
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 self-start sm:self-auto">
          RAL Totale: {formatCurrency(ral, 0)}
        </span>
      </div>

      {/* Multi-color Horizontal Progress Bar (Light background track) */}
      <div className="space-y-2">
        <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200 shadow-inner">
          
          {/* Net Salary Segment */}
          <div
            style={{ width: `${Math.max(1, pctNetto)}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-300 relative group cursor-pointer"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none">
              Netto: {formatCurrency(nettoAnnuale)} ({formatPercent(pctNetto)})
            </div>
          </div>

          {/* INPS Segment */}
          <div
            style={{ width: `${Math.max(1, pctInps)}%` }}
            className="h-full bg-indigo-600 transition-all duration-300 relative group cursor-pointer"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none">
              INPS: {formatCurrency(inps)} ({formatPercent(pctInps)})
            </div>
          </div>

          {/* Fisco Segment */}
          <div
            style={{ width: `${Math.max(1, pctFisco)}%` }}
            className="h-full bg-amber-500 rounded-r-full transition-all duration-300 relative group cursor-pointer"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none">
              Fisco Totale: {formatCurrency(totaleFisco)} ({formatPercent(pctFisco)})
            </div>
          </div>

        </div>
      </div>

      {/* Legend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        
        {/* Netto Legend */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
            <div>
              <p className="text-xs font-semibold text-slate-900">Netto in Tasca</p>
              <p className="text-xs text-slate-500">Stipendio reale</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold font-mono text-emerald-700">{formatCurrency(nettoAnnuale)}</p>
            <p className="text-[10px] text-slate-500 font-mono">{formatPercent(pctNetto)}</p>
          </div>
        </div>

        {/* INPS Legend */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-indigo-600 shadow-sm"></span>
            <div>
              <p className="text-xs font-semibold text-slate-900">Previdenza INPS</p>
              <p className="text-xs text-slate-500">Aliquota dipendente 9,19%</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold font-mono text-indigo-700">{formatCurrency(inps)}</p>
            <p className="text-[10px] text-slate-500 font-mono">{formatPercent(pctInps)}</p>
          </div>
        </div>

        {/* Fisco Legend */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></span>
            <div>
              <p className="text-xs font-semibold text-slate-900">Fisco Totale</p>
              <p className="text-xs text-slate-500">IRPEF + Addizionali</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold font-mono text-amber-700">{formatCurrency(totaleFisco)}</p>
            <p className="text-[10px] text-slate-500 font-mono">{formatPercent(pctFisco)}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
