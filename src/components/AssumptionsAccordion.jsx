import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, FileCheck } from 'lucide-react';

export default function AssumptionsAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm transition-all">
      {/* Accordion Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-900">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              Assunzioni Metodologiche & Trasparenza TUIR
              <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                TUIR Compliant
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Trasparenza sui parametri normativi e le condizioni di calcolo applicate nel prototipo
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-500">
          <span className="text-xs font-semibold hidden sm:inline">
            {isOpen ? 'Comprimi' : 'Espandi'}
          </span>
          <div className="p-1 rounded-md bg-slate-100 text-slate-700">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Accordion Content Body */}
      {isOpen && (
        <div className="p-5 pt-0 border-t border-slate-100 space-y-4 text-xs text-slate-600 bg-slate-50/50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            
            {/* Assumption 1 */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">Tipologia di Contratto</strong>
                <span>Lavoratore dipendente del settore privato con contratto a tempo indeterminato, full-time per 365 giorni annui.</span>
              </div>
            </div>

            {/* Assumption 2 */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">Contributi INPS Lavoratore</strong>
                <span>Aliquota previdenziale ordinaria a carico lavoratore fissata al 9,19% sulla Retribuzione Annua Lorda (RAL).</span>
              </div>
            </div>

            {/* Assumption 3 */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">Scaglioni IRPEF & Art. 13 TUIR</strong>
                <span>Scaglioni 2026 (23% fino a 28k€, 33% 28k-50k€, 43% oltre 50k€). Detrazioni per lavoro dipendente con bonus comma 2 ed eventuale ulteriore detrazione comma 10.</span>
              </div>
            </div>

            {/* Assumption 4 */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">Addizionali Locali (Milano / Roma)</strong>
                <span>Addizionale Regionale Lombardia (scaglioni progressivi 1,23% - 1,73%) o Lazio (1,73% - 3,33%). Addizionale Comunale Milano (0,80% con esenzione fino a 14k€) o Roma (0,90% flat).</span>
              </div>
            </div>

            {/* Assumption 5 */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200 col-span-1 md:col-span-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">Esclusioni dal Prototipo</strong>
                <span>Nessun carico di famiglia applicato (figli o coniuge a carico), nessuna detrazione per spese mediche/mutui/ristrutturazioni personali, nessun conguaglio o trattamento integrativo d'ulteriore livello eccedente la normativa base del TUIR.</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
