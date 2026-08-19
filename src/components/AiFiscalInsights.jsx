import React from 'react';
import { Bot, Lightbulb, Gift, Utensils, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/taxCalculator';

export default function AiFiscalInsights({ results }) {
  const {
    ral,
    cuneoPercentuale,
    aliquotaMarginaleTotale,
    aliquotaMarginaleIrpef,
    addizionaliMarginaliTotali,
    totaleTrattenute,
    city
  } = results;

  let marginalBadgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
  if (aliquotaMarginaleIrpef >= 0.43) {
    marginalBadgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (aliquotaMarginaleIrpef <= 0.23) {
    marginalBadgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }

  // Calculate optimization savings
  const fringeBenefitLimit = 1000;
  const mealVouchersYearly = 2200; // 10.00€/day * 220 days = 2.200€/year
  
  const totalTaxExemptRate = aliquotaMarginaleTotale + 0.0919;
  const taxSavedFringe = fringeBenefitLimit * totalTaxExemptRate;
  const taxSavedMealVoucher = mealVouchersYearly * totalTaxExemptRate;

  const irpefPctStr = formatPercent(aliquotaMarginaleIrpef * 100, 1);
  const localPctStr = formatPercent(addizionaliMarginaliTotali * 100, 2);
  const totalPctStr = formatPercent(aliquotaMarginaleTotale * 100, 1);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 rounded-xl bg-black text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                AI Cost-Saving & Fiscal Insights
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                JET AI ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Analisi dell'impatto fiscale e strategie di ottimizzazione Retributiva & Welfare
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Dynamic Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: Aliquota Marginale Effettiva */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Aliquota Marginale Effettiva
            </span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${marginalBadgeColor}`}>
              {totalPctStr}
            </span>
          </div>
          <p className="text-xs text-slate-900 font-medium leading-relaxed">
            <strong>Aliquota Marginale Nominale Fiscale: {totalPctStr}</strong> (IRPEF {irpefPctStr} + Addizionali Locali {localPctStr} per {city}).
          </p>
          <p className="text-[11px] text-slate-500 font-normal">
            Per ogni <strong className="text-slate-900">€100</strong> aggiuntivi di premio cash in busta paga, lo Stato trattiene <strong className="text-slate-900">{formatCurrency(100 * aliquotaMarginaleTotale)}</strong> tra IRPEF e Addizionali Locali.
          </p>
        </div>

        {/* Card 2: Cuneo & Concentrazione */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Densità del Cuneo Fiscale
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-200 text-slate-800 border border-slate-300">
              {formatPercent(cuneoPercentuale)}
            </span>
          </div>
          <p className="text-xs text-slate-900 font-medium leading-relaxed">
            {ral <= 35000 ? (
              <>Su questa fascia di RAL (<strong className="text-slate-900">{formatCurrency(ral)}</strong>) la pressione fiscale beneficia delle detrazioni Art. 13 TUIR. L'ottimizzazione welfare evita il degradare progressivo delle detrazioni al crescere del lordo.</>
            ) : (
              <>Su questa RAL di <strong className="text-slate-900">{formatCurrency(ral)}</strong>, il cuneo fiscale assorbe <strong className="text-slate-900">{formatCurrency(totaleTrattenute)}</strong>. La leva principale per aumentare il potere d'acquisto reale è la defiscalizzazione del welfare.</>
            )}
          </p>
        </div>

      </div>

      {/* Actionable Corporate Optimization Opportunities */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center space-x-2 text-slate-900">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
            Opportunità di Ottimizzazione Retributiva con Jet HR
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Fringe Benefit Option */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 transition-all space-y-1.5">
            <div className="flex items-center space-x-2 text-emerald-600">
              <Gift className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-900">Fringe Benefit</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Fino a 1.000 €/anno 100% esenti da IRPEF e INPS (Art. 51 c. 4 TUIR).
            </p>
            <p className="text-[10px] text-slate-900 font-mono font-semibold pt-1">
              Risparmio fiscale dipendente: ~{formatCurrency(taxSavedFringe)}/anno
            </p>
          </div>

          {/* Meal Vouchers Option */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 transition-all space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-600">
              <Utensils className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-900">Buoni Pasto Elettronici</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Fino a 10,00 €/giorno esenti da imposte e contributi (Art. 51 c. 2 lett. b TUIR) — Stima annua su 220 giorni lavorativi: ~2.200 €/anno.
            </p>
            <p className="text-[10px] text-slate-900 font-mono font-semibold pt-1">
              Risparmio fiscale dipendente: ~{formatCurrency(taxSavedMealVoucher)}/anno
            </p>
          </div>

          {/* Pension Fund Option */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 transition-all space-y-1.5">
            <div className="flex items-center space-x-2 text-indigo-600">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-900">Previdenza Integrativa</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Versamenti deducibili dal reddito imponibile fino a <strong className="text-slate-900">€5.164,57</strong> annui (Art. 51 c. 2 lett. a TUIR).
            </p>
            <p className="text-[10px] text-slate-900 font-mono font-semibold pt-1">
              Deduce all'aliquota marginale fiscale di {irpefPctStr}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
