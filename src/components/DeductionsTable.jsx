import React, { useState } from 'react';
import { Table, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/taxCalculator';

export default function DeductionsTable({ results }) {
  const [showDeductionsBreakdown, setShowDeductionsBreakdown] = useState(false);

  const {
    ral,
    inps,
    inpsRate,
    imponibile,
    irpefLorda,
    detrazioneBase,
    bonusComma2,
    detrazioneComma10,
    totaleDetrazioni,
    irpefNetta,
    addizionaleRegionale,
    addizionaleComunale,
    totaleTrattenute,
    nettoAnnuale,
    nettoMensile,
    mensilita,
    regBracketInfo,
    comBracketInfo,
    city
  } = results;

  // Helper for monthly calculation
  const m = (annualValue) => annualValue / mensilita;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-900">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              Prospetto Analitico Trattenute & Detrazioni
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Dettaglio analitico con doppia visualizzazione mensile ({mensilita} mensilità) e annuale
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 self-start sm:self-auto">
          {mensilita} Mensilità
        </span>
      </div>

      {/* Table Component with 4 Columns (Light Theme) */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Voce Fiscale / Previdenziale</th>
              <th className="py-3 px-4">Base / Regola Applicata</th>
              <th className="py-3 px-4 text-right">Importo Mensile (€)</th>
              <th className="py-3 px-4 text-right">Importo Annuo (€)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            
            {/* RAL */}
            <tr className="bg-slate-50/80 font-bold text-slate-900">
              <td className="py-3 px-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                Retribuzione Annua Lorda (RAL)
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">Retribuzione contrattuale pattuita</td>
              <td className="py-3 px-4 text-right font-mono text-slate-900">{formatCurrency(m(ral))}</td>
              <td className="py-3 px-4 text-right font-mono text-slate-900 font-bold">{formatCurrency(ral)}</td>
            </tr>

            {/* Contributi INPS */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="py-3 px-4 text-indigo-900 font-semibold">
                Contributi INPS Lavoratore
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">
                Aliquota ordinaria {formatPercent(inpsRate * 100, 2)} su RAL intera
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600">
                - {formatCurrency(m(inps))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600 font-semibold">
                - {formatCurrency(inps)}
              </td>
            </tr>

            {/* Imponibile IRPEF */}
            <tr className="bg-slate-100/50 font-semibold border-t border-slate-200">
              <td className="py-3 px-4 text-slate-900">
                Imponibile IRPEF Netto
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">
                RAL - Contributi INPS
              </td>
              <td className="py-3 px-4 text-right font-mono text-slate-900">
                {formatCurrency(m(imponibile))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-slate-900 font-bold">
                {formatCurrency(imponibile)}
              </td>
            </tr>

            {/* IRPEF Lorda */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="py-3 px-4">
                IRPEF Lorda Nazionale
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">
                Scaglioni ordinari (23% / 33% / 43%)
              </td>
              <td className="py-3 px-4 text-right font-mono text-slate-700">
                {formatCurrency(m(irpefLorda))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-slate-700">
                {formatCurrency(irpefLorda)}
              </td>
            </tr>

            {/* Detrazioni da lavoro dipendente */}
            <tr className="hover:bg-slate-50/70 transition-colors bg-emerald-50/40">
              <td className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    Detrazioni Lavoro Dipendente (Art. 13 TUIR)
                  </span>
                  <button
                    onClick={() => setShowDeductionsBreakdown(!showDeductionsBreakdown)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 underline flex items-center gap-0.5 ml-2"
                  >
                    {showDeductionsBreakdown ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
                    {showDeductionsBreakdown ? 'nascondi' : 'dettagli'}
                  </button>
                </div>
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">
                Detrazione base + Bonus integrativi (Art. 13)
              </td>
              <td className="py-3 px-4 text-right font-mono text-emerald-700">
                - {formatCurrency(m(totaleDetrazioni))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-emerald-700 font-bold">
                - {formatCurrency(totaleDetrazioni)}
              </td>
            </tr>

            {/* Expandable Detrazioni Details */}
            {showDeductionsBreakdown && (
              <tr className="bg-emerald-50/60 text-[11px] font-normal">
                <td colSpan={4} className="py-2.5 px-6 space-y-1 text-emerald-900 border-l-2 border-emerald-500">
                  <div className="flex justify-between items-center">
                    <span>• Detrazione Base Art. 13 comma 1:</span>
                    <span className="font-mono">Mensile: {formatCurrency(m(detrazioneBase))} | Annuo: {formatCurrency(detrazioneBase)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>• Bonus Integrativo Art. 13 comma 2 (€65 per 25k-35k):</span>
                    <span className="font-mono">Mensile: {formatCurrency(m(bonusComma2))} | Annuo: {formatCurrency(bonusComma2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>• Ulteriore Detrazione Art. 13 comma 10 (fino a 1.000€ per 20k-40k):</span>
                    <span className="font-mono">Mensile: {formatCurrency(m(detrazioneComma10))} | Annuo: {formatCurrency(detrazioneComma10)}</span>
                  </div>
                </td>
              </tr>
            )}

            {/* IRPEF Netta */}
            <tr className="hover:bg-slate-50/70 transition-colors font-semibold">
              <td className="py-3 px-4 text-amber-900">
                IRPEF Netta Nazionale
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">
                Max(0, IRPEF Lorda - Totale Detrazioni)
              </td>
              <td className="py-3 px-4 text-right font-mono text-amber-700">
                - {formatCurrency(m(irpefNetta))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-amber-700 font-bold">
                - {formatCurrency(irpefNetta)}
              </td>
            </tr>

            {/* Addizionale Regionale */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="py-3 px-4">
                Addizionale Regionale ({city})
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">
                {regBracketInfo}
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600">
                - {formatCurrency(m(addizionaleRegionale))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600">
                - {formatCurrency(addizionaleRegionale)}
              </td>
            </tr>

            {/* Addizionale Comunale */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="py-3 px-4">
                Addizionale Comunale ({city})
              </td>
              <td className="py-3 px-4 text-slate-500 font-normal">
                {comBracketInfo}
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600">
                - {formatCurrency(m(addizionaleComunale))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600">
                - {formatCurrency(addizionaleComunale)}
              </td>
            </tr>

            {/* Totale Trattenute Summary */}
            <tr className="bg-rose-50/50 font-bold border-t border-rose-200 text-rose-900">
              <td className="py-3 px-4">
                TOTALE TRATTENUTE (INPS + Fisco)
              </td>
              <td className="py-3 px-4 text-rose-700 font-normal">
                Pressione complessiva sul lordo
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600 font-bold text-sm">
                - {formatCurrency(m(totaleTrattenute))}
              </td>
              <td className="py-3 px-4 text-right font-mono text-rose-600 font-extrabold text-sm">
                - {formatCurrency(totaleTrattenute)}
              </td>
            </tr>

            {/* Netto finale */}
            <tr className="bg-emerald-50 font-extrabold border-t-2 border-emerald-500 text-emerald-950 text-sm">
              <td className="py-3.5 px-4 text-emerald-950">
                NETTO FINALE IN BUSTA PAGA
              </td>
              <td className="py-3.5 px-4 text-emerald-800 font-medium text-xs">
                Importo netto su {mensilita} mensilità
              </td>
              <td className="py-3.5 px-4 text-right font-mono text-emerald-600 font-black text-base">
                {formatCurrency(nettoMensile)}
              </td>
              <td className="py-3.5 px-4 text-right font-mono text-emerald-600 font-black text-base">
                {formatCurrency(nettoAnnuale)}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
