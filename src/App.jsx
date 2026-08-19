import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CalculatorInputs from './components/CalculatorInputs';
import HeroResultsCard from './components/HeroResultsCard';
import TaxBreakdownBar from './components/TaxBreakdownBar';
import DeductionsTable from './components/DeductionsTable';
import EmployerCostSavingWidget from './components/EmployerCostSavingWidget';
import AiFiscalInsights from './components/AiFiscalInsights';
import AssumptionsAccordion from './components/AssumptionsAccordion';
import { calculateNetSalary } from './utils/taxCalculator';

export default function App() {
  const [ral, setRal] = useState(32000);
  const [city, setCity] = useState('Milano');
  const [mensilita, setMensilita] = useState(13);

  // Reactive Calculation Engine
  const results = useMemo(() => {
    return calculateNetSalary({ ral, city, mensilita });
  }, [ral, city, mensilita]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 flex flex-col font-sans selection:bg-black selection:text-white">
      
      {/* 1. Header with Quick Presets */}
      <Header
        ral={ral}
        onSelectPreset={(presetRal) => setRal(presetRal)}
      />

      {/* Main Page Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 1 & 2. Parametri di Calcolo & Card Risultati Principali */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 flex flex-col">
            <CalculatorInputs
              ral={ral}
              onChangeRal={setRal}
              city={city}
              onChangeCity={setCity}
              mensilita={mensilita}
              onChangeMensilita={setMensilita}
            />
          </div>
          <div className="lg:col-span-6 flex flex-col">
            <HeroResultsCard results={results} />
          </div>
        </div>

        {/* 3. Barra di Ripartizione Visiva */}
        <TaxBreakdownBar results={results} />

        {/* 4. Prospetto Analitico Trattenute & Detrazioni (Doppia Colonna Mese / Anno) */}
        <DeductionsTable results={results} />

        {/* 5. Vista Datore di Lavoro — Costo Azienda & Simulazione Welfare Jet HR */}
        <EmployerCostSavingWidget results={results} />

        {/* 6. AI Cost-Saving & Fiscal Insights */}
        <AiFiscalInsights results={results} />

        {/* 7. Assunzioni Metodologiche & Trasparenza TUIR */}
        <AssumptionsAccordion />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Jet HR — Interactive Prototype for Product Builder Task</p>
          <div className="flex items-center space-x-4 text-slate-500">
            <span>TUIR Compliant Engine</span>
            <span>•</span>
            <span>Milano / Roma Surtaxes</span>
            <span>•</span>
            <span className="text-black font-semibold">Cost-Saving Team</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
