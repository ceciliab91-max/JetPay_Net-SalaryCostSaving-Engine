/**
 * Jet HR Net Salary & Tax Calculation Engine (TUIR Compliant)
 */

export function calculateNetSalary({ ral, city = 'Milano', mensilita = 13 }) {
  const numericRal = Math.max(10000, Math.min(120000, Number(ral) || 32000));
  const numMensilita = Number(mensilita) === 14 ? 14 : 13;

  // a) Contributi INPS dipendente (9.19% standard)
  const inpsRate = 0.0919;
  const inps = numericRal * inpsRate;

  // b) Imponibile IRPEF Netto
  const imponibile = Math.max(0, numericRal - inps);

  // c) IRPEF Lorda Nazionale (Scaglioni ordinari)
  let irpefLorda = 0;
  if (imponibile <= 28000) {
    irpefLorda = imponibile * 0.23;
  } else if (imponibile <= 50000) {
    irpefLorda = 28000 * 0.23 + (imponibile - 28000) * 0.33;
  } else {
    irpefLorda = 28000 * 0.23 + (50000 - 28000) * 0.33 + (imponibile - 50000) * 0.43;
  }

  // d) Detrazioni da Lavoro Dipendente (Art. 13 TUIR)
  let detrazioneBase = 0;
  if (imponibile <= 15000) {
    detrazioneBase = 1955;
  } else if (imponibile <= 28000) {
    detrazioneBase = 1910 + 1190 * ((28000 - imponibile) / 13000);
  } else if (imponibile <= 50000) {
    detrazioneBase = 1910 * ((50000 - imponibile) / 22000);
  } else {
    detrazioneBase = 0;
  }

  // Bonus integrativo art. 13 comma 2 (+65€ se 25.000 <= imponibile <= 35.000)
  const bonusComma2 = (imponibile >= 25000 && imponibile <= 35000) ? 65 : 0;

  // Ulteriore detrazione art. 13 comma 10
  let detrazioneComma10 = 0;
  if (imponibile >= 20000 && imponibile <= 32000) {
    detrazioneComma10 = 1000;
  } else if (imponibile > 32000 && imponibile <= 40000) {
    detrazioneComma10 = 1000 * ((40000 - imponibile) / 8000);
  }

  const totaleDetrazioni = detrazioneBase + bonusComma2 + detrazioneComma10;

  // e) IRPEF Netta Nazionale
  const irpefNetta = Math.max(0, irpefLorda - totaleDetrazioni);

  // f) Addizionale Regionale
  let addizionaleRegionale = 0;
  let regBracketInfo = '';
  if (city === 'Roma') {
    // Lazio
    if (imponibile <= 15000) {
      addizionaleRegionale = imponibile * 0.0173;
    } else {
      addizionaleRegionale = 15000 * 0.0173 + (imponibile - 15000) * 0.0333;
    }
    regBracketInfo = 'Regione Lazio (1.73% fino a 15k, 3.33% oltre 15k)';
  } else {
    // Milano (Lombardia)
    if (imponibile <= 15000) {
      addizionaleRegionale = imponibile * 0.0123;
    } else if (imponibile <= 28000) {
      addizionaleRegionale = 15000 * 0.0123 + (imponibile - 15000) * 0.0158;
    } else if (imponibile <= 50000) {
      addizionaleRegionale = 15000 * 0.0123 + 13000 * 0.0158 + (imponibile - 28000) * 0.0172;
    } else {
      addizionaleRegionale = 15000 * 0.0123 + 13000 * 0.0158 + 22000 * 0.0172 + (imponibile - 50000) * 0.0173;
    }
    regBracketInfo = 'Regione Lombardia (da 1.23% a 1.73% a scaglioni)';
  }

  // g) Addizionale Comunale
  let addizionaleComunale = 0;
  let comBracketInfo = '';
  if (city === 'Roma') {
    addizionaleComunale = imponibile * 0.009; // 0.90% intero imponibile
    comBracketInfo = 'Comune di Roma (0.90% flat)';
  } else {
    // Milano: 0.80% (esenzione per imponibile <= 14.000€)
    if (imponibile <= 14000) {
      addizionaleComunale = 0;
      comBracketInfo = 'Comune di Milano (0.80% - Esente <= 14k€)';
    } else {
      addizionaleComunale = imponibile * 0.008;
      comBracketInfo = 'Comune di Milano (0.80%)';
    }
  }

  // h) Totale trattenute
  const totaleAddizionali = addizionaleRegionale + addizionaleComunale;
  const totaleFisco = irpefNetta + totaleAddizionali;
  const totaleTrattenute = inps + totaleFisco;

  // i) Output Economici
  const nettoAnnuale = numericRal - totaleTrattenute;
  const nettoMensile = nettoAnnuale / numMensilita;
  const cuneoPercentuale = (totaleTrattenute / numericRal) * 100;

  // Breakdown Percentages (per visual bar)
  const pctNetto = (nettoAnnuale / numericRal) * 100;
  const pctInps = (inps / numericRal) * 100;
  const pctFisco = (totaleFisco / numericRal) * 100;

  // Aliquota Marginale Irpef + Addizionale Locali
  let aliquotaMarginaleIrpef = 0.23;
  if (imponibile > 50000) aliquotaMarginaleIrpef = 0.43;
  else if (imponibile > 28000) aliquotaMarginaleIrpef = 0.33;

  let addizionaleMarginaleReg = city === 'Roma' ? (imponibile > 15000 ? 0.0333 : 0.0173) : (imponibile > 50000 ? 0.0173 : imponibile > 28000 ? 0.0172 : imponibile > 15000 ? 0.0158 : 0.0123);
  let addizionaleMarginaleCom = city === 'Roma' ? 0.009 : (imponibile > 14000 ? 0.008 : 0);

  const addizionaliMarginaliTotali = addizionaleMarginaleReg + addizionaleMarginaleCom;
  const aliquotaMarginaleTotale = aliquotaMarginaleIrpef + addizionaliMarginaliTotali;

  // Costo Azienda Stimato (Bonus Feature per Jet HR Cost-Saving Engine)
  // INPS Azienda ~ 29.8% + TFR 6.91%
  const inpsAzienda = numericRal * 0.298;
  const tfrAzienda = numericRal * 0.0691;
  const costoAziendaTotale = numericRal + inpsAzienda + tfrAzienda;

  return {
    ral: numericRal,
    city,
    mensilita: numMensilita,
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
    totaleAddizionali,
    totaleFisco,
    totaleTrattenute,
    nettoAnnuale,
    nettoMensile,
    cuneoPercentuale,
    pctNetto,
    pctInps,
    pctFisco,
    regBracketInfo,
    comBracketInfo,
    aliquotaMarginaleIrpef,
    addizionaliMarginaliTotali,
    aliquotaMarginaleTotale,
    costoAziendaTotale,
    inpsAzienda,
    tfrAzienda
  };
}

/**
 * Format currency numbers to Italian Euro format (e.g. 32.000,00 €)
 */
export function formatCurrency(amount, decimals = 2) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount || 0);
}

/**
 * Format percentages (e.g. 34,5%)
 */
export function formatPercent(value, decimals = 1) {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value || 0) + '%';
}
