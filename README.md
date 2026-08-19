# JetPay — Net Salary & Cost-Saving Engine

> **Product Builder Technical Task @ Jet HR**  
> Prototipo interattivo per la simulazione e la proiezione della retribuzione netta (annuale e mensile) a partire dalla RAL, con motore fiscale conforme al TUIR e modulo di ottimizzazione Welfare/B2B.

---

## Obiettivo del Progetto

Costruire un prototipo reattivo, intuitivo e fedele alle normative fiscali vigenti che permetta a dipendenti e People Manager di:

1. Simulare istantaneamente lo stipendio netto mensile e annuale partendo dalla Retribuzione Annua Lorda (RAL).
2. Esplorare l'alberatura completa delle trattenute previdenziali e fiscali (INPS, IRPEF, Addizionali Regionali e Comunali, Detrazioni).
3. Comprendere l'impatto dell'aliquota marginale e le opportunità di efficientamento retributivo tramite Welfare Aziendale e Fringe Benefit.

---

## Logica Fiscale & Algoritmo di Calcolo

Il motore di calcolo implementa la normativa italiana per i redditi da lavoro dipendente:

### 1. Contributi Previdenziali INPS (Lavoratore)

* Aliquota ordinaria standard: **9,19%** applicata sull'intera RAL.
* Base Imponibile Fiscale: $\text{Imponibile IRPEF} = \text{RAL} - \text{Contributi INPS}$.

### 2. IRPEF Lorda Nazionale (Scaglioni vigenti)

* **Fino a 28.000 €:** 23%
* **Tra 28.000 € e 50.000 €:** 33% (sulla quota eccedente 28.000 €)
* **Oltre 50.000 €:** 43% (sulla quota eccedente 50.000 €)

### 3. Detrazioni da Lavoro Dipendente (Art. 13 TUIR)

* $\text{Imponibile} \le 15.000\text{ €}$: **1.955 €** (con detrazione minima garantita di 690 €).
* $15.000\text{ €} < \text{Imponibile} \le 28.000\text{ €}$: $1.910 + 1.190 \times \left(\frac{28.000 - \text{Imponibile}}{13.000}\right)$
* $28.000\text{ €} < \text{Imponibile} \le 50.000\text{ €}$: $1.910 \times \left(\frac{50.000 - \text{Imponibile}}{22.000}\right)$
* $\text{Imponibile} > 50.000\text{ €}$: **0 €**
* **Integrazioni TUIR:**
  * *Bonus integrativo c. 2:* +65 € per imponibili compresi tra 25.000 € e 35.000 €.
  * *Ulteriore detrazione c. 10:* 1.000 € decrescenti per la fascia tra 20.000 € e 40.000 €.

### 4. Addizionali Locali (Milano / Roma)

* **Lombardia (Milano):** Aliquote progressive regionali da 1,23% a 1,73%. Addizionale Comunale Milano: **0,80%** (con no-tax area fino a 14.000 €).
* **Lazio (Roma):** Aliquota regionale 1,73% (fino a 15k) e 3,33% (eccedenza). Addizionale Comunale Roma: **0,90%** flat.

---

## Stack Tecnologico & Architettura

* **Framework:** React (Single Page Application, component-driven)
* **Styling:** Tailwind CSS (Minimalist Light Design System allineato all'UI di Jet HR)
* **Icons:** Lucide React
* **State Management:** React Native Hooks (`useState`, `useMemo` per ricalcolo reattivo in O(1))

---

## Funzionalità Chiave di Prodotto

* **Input Sincronizzato & Preset Rapidi:** Slider fluido abbinato a input numerico e bottoni rapidi per testare scaglioni chiave (25k, 35k, 45k, 60k).
* **Ripartizione Visiva del Lordo:** Barra segmentata per evidenziare a colpo d'occhio la quota che finisce in tasca al lavoratore vs Previdenza vs Fisco.
* **Prospetto Analitico Trasparente:** Tabella a doppia colonna (Mensile / Annuale) che dettaglia ogni singola trattenuta e detrazione.
* **Vista B2B & Welfare Simulator:** Stima del costo azienda complessivo (RAL + INPS Datore + TFR) e simulazione del risparmio fiscale tramite Fringe Benefit (1.000 € esenti art. 51 c. 4 TUIR) e Buoni Pasto Elettronici (10 €/giorno esenti art. 51 c. 2 lett. b TUIR).
* **AI Cost-Saving & Fiscal Insights:** Modulo informativo contestuale che spiega l'aliquota marginale nominale e le leve di de-fiscalizzazione.

---

## Assunzioni Metodologiche Adottate

1. **Tipologia Contrattuale:** Lavoratore dipendente full-time a tempo indeterminato nel settore privato (365 giorni lavorativi di detrazione piena).
2. **Carichi di Famiglia:** Nessun familiare o figlio a carico (assunzione coerente con la delega Assegno Unico INPS e le specifiche standard del task).
3. **Mensilità:** Selezionabili tra 13 e 14 mensilità su base annuale.
