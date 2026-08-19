import React, { useState } from 'react';
import { Building2, Sparkles } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/taxCalculator';

export default function EmployerCostSavingWidget({ results }) {
  const [welfareAmount, setWelfareAmount] = useState(1000);

  const {
    ral,
    nettoAnnuale,
    costoAziendaTotale,
    inpsAzienda,
    tfrAzienda,
    aliquotaMarginaleTotale
  } = results;

  // Welfare conversion calculations:
  const employerInpsSaved = welfareAmount * 0.298;
  const employeeTaxExemptRate = aliquotaMarginaleTotale + 0.0919;
  const employeeTaxSaved = welfareAmount * employeeTaxExemptRate;
  const combinedTotalSaved = employerInpsSaved + employeeTaxSaved;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-black text-white shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                Vista Datore di Lavoro — Costo Azienda & Simulazione Welfare Jet HR
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                B2B FEATURE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Confronto tra costo totale azienda e stipendio netto percepito dal dipendente
            </p>
          </div>
        </div>
      </div>

      {/* KPI Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Costo Azienda */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Costo Azienda Totale</p>
          <p className="text-lg font-bold text-slate-900 font-mono">{formatCurrency(costoAziendaTotale)}</p>
          <p className="text-[10px] text-slate-500">RAL ({formatCurrency(ral, 0)}) + INPS Az. + TFR</p>
        </div>

        {/* INPS + TFR Azienda */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Oneri Aziendali (INPS+TFR)</p>
          <p className="text-lg font-bold text-slate-800 font-mono">{formatCurrency(inpsAzienda + tfrAzienda)}</p>
          <p className="text-[10px] text-slate-500">~36,7% oltre la RAL</p>
        </div>

        {/* Netto Dipendente */}
        <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Netto Dipendente in Tasca</p>
          <p className="text-lg font-bold text-emerald-600 font-mono">{formatCurrency(nettoAnnuale)}</p>
          <p className="text-[10px] text-emerald-700 font-medium">
            Solo il {formatPercent((nettoAnnuale / costoAziendaTotale) * 100)} del costo azienda arriva al lavoratore
          </p>
        </div>

      </div>

      {/* Interactive Welfare Cost-Saving Simulation */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-slate-900">Simulazione Welfare Aziendale Jet HR</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Premio / Welfare convertito:</span>
            <select
              value={welfareAmount}
              onChange={(e) => setWelfareAmount(Number(e.target.value))}
              className="bg-white border border-slate-300 text-slate-900 text-xs font-bold font-mono rounded-lg px-2.5 py-1 focus:ring-1 focus:ring-black"
            >
              <option value={500}>€ 500</option>
              <option value={1000}>€ 1.000 (Fringe Standard Art. 51 TUIR)</option>
              <option value={2000}>€ 2.000 (Welfare Multi-benefit)</option>
              <option value={3000}>€ 3.000 (Welfare Premium)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500 text-[11px]">Risparmio Datore di Lavoro</p>
            <p className="text-sm font-bold text-slate-900 font-mono">+{formatCurrency(employerInpsSaved)}</p>
            <p className="text-[10px] text-slate-500">Meno contributi INPS azienda (29,8%)</p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500 text-[11px]">Maggior Netto per Dipendente</p>
            <p className="text-sm font-bold text-emerald-600 font-mono">+{formatCurrency(employeeTaxSaved)}</p>
            <p className="text-[10px] text-slate-500">Esenzione IRPEF, Addizionali & INPS 9,19%</p>
          </div>

          <div className="p-3 bg-slate-900 text-white rounded-lg border border-slate-900 shadow-sm">
            <p className="text-slate-300 text-[11px] font-medium">Valore Totale Generato Jet HR</p>
            <p className="text-sm font-extrabold text-white font-mono">+{formatCurrency(combinedTotalSaved)}</p>
            <p className="text-[10px] text-slate-400">Efficienza fiscale complessiva azienda+dipendente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
