/**
 * Smalldose Calculator Module (Preterm Neonatal Antibiotics)
 * Calculates Antibiotic Dosing based on PMA (Postmenstrual Age) & PNA (Postnatal Age)
 * Responsive 12-Column Grid Layout matching RxCalc System Standard
 * Timestamp: 2026-08-14
 */

// Antibiotic Reference Tables
const AMPICILLIN_TABLE = [
    { pmaMin: 0,  pmaMax: 29, pnaMin: 0,  pnaMax: 28,  intervalHrs: 12, textPma: "< 29 wk", textPna: "0 - 28 days" },
    { pmaMin: 0,  pmaMax: 29, pnaMin: 29, pnaMax: 999, intervalHrs: 8,  textPma: "< 29 wk", textPna: "≥ 29 days" },
    { pmaMin: 30, pmaMax: 36, pnaMin: 0,  pnaMax: 14,  intervalHrs: 12, textPma: "30 - 36 wk", textPna: "0 - 14 days" },
    { pmaMin: 30, pmaMax: 36, pnaMin: 15, pnaMax: 999, intervalHrs: 8,  textPma: "30 - 36 wk", textPna: "≥ 15 days" },
    { pmaMin: 37, pmaMax: 44, pnaMin: 0,  pnaMax: 7,   intervalHrs: 12, textPma: "37 - 44 wk", textPna: "0 - 7 days" },
    { pmaMin: 37, pmaMax: 44, pnaMin: 8,  pnaMax: 999, intervalHrs: 8,  textPma: "37 - 44 wk", textPna: "≥ 8 days" },
    { pmaMin: 45, pmaMax: 999, pnaMin: 0, pnaMax: 999, intervalHrs: 6,  textPma: "≥ 45 wk", textPna: "All days" }
];

const GENTAMICIN_TABLE = [
    { pmaMin: 0,  pmaMax: 29, pnaMin: 0,  pnaMax: 7,   multiplier: 5.0, intervalHrs: 48, textPma: "< 29 wk", textPna: "0 - 7 days" },
    { pmaMin: 0,  pmaMax: 29, pnaMin: 8,  pnaMax: 28,  multiplier: 4.0, intervalHrs: 36, textPma: "< 29 wk", textPna: "8 - 28 days" },
    { pmaMin: 0,  pmaMax: 29, pnaMin: 29, pnaMax: 999, multiplier: 4.0, intervalHrs: 24, textPma: "< 29 wk", textPna: "≥ 29 days" },
    { pmaMin: 30, pmaMax: 34, pnaMin: 0,  pnaMax: 7,   multiplier: 4.5, intervalHrs: 36, textPma: "30 - 34 wk", textPna: "0 - 7 days" },
    { pmaMin: 30, pmaMax: 34, pnaMin: 8,  pnaMax: 999, multiplier: 4.0, intervalHrs: 24, textPma: "30 - 34 wk", textPna: "≥ 8 days" },
    { pmaMin: 35, pmaMax: 999, pnaMin: 0, pnaMax: 999, multiplier: 4.0, intervalHrs: 24, textPma: "≥ 35 wk", textPna: "All days" }
];

export function render(container) {
    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Sarabun:wght@400;500;600;700;800&display=swap');
            
            #smalldose-calc-module {
                font-family: 'Sarabun', 'Inter', sans-serif;
            }
            #smalldose-calc-module input[type="number"]::-webkit-inner-spin-button,
            #smalldose-calc-module input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            #smalldose-calc-module input[type="number"] {
                -moz-appearance: textfield;
            }
        </style>

        <div id="smalldose-calc-module" class="max-w-7xl mx-auto p-2 sm:p-4">
            
            <!-- Main Grid: 12 Columns -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                
                <!-- ================= LEFT COLUMN: INPUT PANEL (4/12) ================= -->
                <div class="lg:col-span-4 flex flex-col gap-4 justify-between">
                    
                    <!-- Solid Dark Slate Panel -->
                    <div class="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-800 flex-1 flex flex-col justify-between space-y-5">
                        <div>
                            <!-- Header & Reset -->
                            <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-11 h-11 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20 shrink-0">
                                        <svg class="w-6 h-6 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    </div>
                                    <div class="truncate">
                                        <h2 class="text-xl font-extrabold text-white leading-tight truncate">Smalldose Calc</h2>
                                        <p class="text-sm text-slate-400 truncate">ขนาดยาเด็กคลอดก่อนกำหนด</p>
                                    </div>
                                </div>

                                <button type="button" id="btn-reset-atb" class="px-3.5 py-1.5 bg-slate-800 hover:bg-rose-600/90 text-rose-300 hover:text-white border border-slate-700 hover:border-rose-500 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0">
                                    <svg class="w-4 h-4 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                                    <span>รีเซ็ต</span>
                                </button>
                            </div>

                            <!-- Input Form -->
                            <div class="space-y-4">
                                <!-- GA (Gestational Age) -->
                                <div>
                                    <label class="block text-sm font-bold text-slate-300 mb-1.5">GA (อายุครรภ์เมื่อคลอด)</label>
                                    <div class="grid grid-cols-2 gap-2">
                                        <div class="flex items-center gap-2">
                                            <input type="number" id="atb-ga-wk" class="w-full text-xl font-black px-3 py-2 bg-slate-950 text-indigo-300 border border-slate-700 rounded-xl focus:border-indigo-400 focus:outline-none text-right shadow-inner" placeholder="0" min="0" value="28">
                                            <span class="text-xs font-bold text-slate-400 shrink-0">wk</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <input type="number" id="atb-ga-day" class="w-full text-xl font-black px-3 py-2 bg-slate-950 text-indigo-300 border border-slate-700 rounded-xl focus:border-indigo-400 focus:outline-none text-right shadow-inner" placeholder="0" min="0" max="6" value="0">
                                            <span class="text-xs font-bold text-slate-400 shrink-0">day</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- PNA (Postnatal Age) -->
                                <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                                    <label class="text-base font-bold text-slate-200 whitespace-nowrap">PNA (อายุหลังคลอด)</label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" id="atb-pna-day" class="w-28 text-xl font-black px-3 py-2 bg-slate-950 text-indigo-300 border border-slate-700 rounded-xl focus:border-indigo-400 focus:outline-none text-right shadow-inner" placeholder="0" min="0" value="3">
                                        <span class="text-xs font-bold text-slate-400 w-8 shrink-0">days</span>
                                    </div>
                                </div>

                                <!-- Body Weight (BW) with Stepper Buttons -->
                                <div class="pt-2 border-t border-slate-800">
                                    <label class="block text-sm font-bold text-slate-300 mb-1.5">BW (น้ำหนักตัว)</label>
                                    <div class="flex items-center gap-2">
                                        <button type="button" id="btn-bw-minus" class="w-10 h-11 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl font-bold text-lg border border-slate-700 transition-all">-</button>
                                        <input type="number" step="0.0001" id="atb-bw" class="flex-1 text-2xl font-black px-3 py-2 bg-slate-950 text-indigo-300 border border-slate-700 rounded-xl focus:border-indigo-400 focus:outline-none text-right shadow-inner" placeholder="0.0000" value="1.0000">
                                        <button type="button" id="btn-bw-plus" class="w-10 h-11 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl font-bold text-lg border border-slate-700 transition-all">+</button>
                                        <span class="text-xs font-bold text-slate-400 w-6 shrink-0">kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Drug Selection Toggles -->
                        <div class="pt-4 border-t border-slate-800">
                            <label class="block text-xs font-bold text-slate-400 mb-2">เลือกแสดงรายยา (Drug Toggles)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all">
                                    <input type="checkbox" id="toggle-ampi" checked class="w-4 h-4 accent-indigo-500 rounded cursor-pointer">
                                    <span class="text-xs font-bold text-indigo-300">Ampicillin</span>
                                </label>
                                <label class="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all">
                                    <input type="checkbox" id="toggle-genta" checked class="w-4 h-4 accent-indigo-500 rounded cursor-pointer">
                                    <span class="text-xs font-bold text-sky-300">Gentamicin</span>
                                </label>
                                <label class="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all">
                                    <input type="checkbox" id="toggle-cloxa" checked class="w-4 h-4 accent-indigo-500 rounded cursor-pointer">
                                    <span class="text-xs font-bold text-amber-300">Cloxacillin</span>
                                </label>
                                <label class="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all">
                                    <input type="checkbox" id="toggle-clinda" checked class="w-4 h-4 accent-indigo-500 rounded cursor-pointer">
                                    <span class="text-xs font-bold text-emerald-300">Clindamycin</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Computed PMA Summary Card -->
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1.5">
                        <span class="text-xs font-extrabold text-slate-400 tracking-wider uppercase">สรุปอายุครรภ์ปรับแต่ง (Calculated PMA)</span>
                        <div class="text-3xl font-black text-indigo-900" id="display-pma-wk">0 wk</div>
                        <div class="text-xs text-slate-500 font-medium leading-relaxed px-1" id="pma-calc-explain">-</div>
                    </div>

                </div>

                <!-- ================= RIGHT COLUMN: CARDS FOR 4 DRUGS (8/12) ================= -->
                <div class="lg:col-span-8 space-y-4">
                    
                    <!-- 1. AMPICILLIN CARD -->
                    <div id="card-ampi" class="bg-indigo-50/50 border border-indigo-200/80 p-4 sm:p-5 rounded-2xl shadow-xs space-y-3 transition-all">
                        <div class="flex items-center justify-between border-b border-indigo-200 pb-2.5">
                            <h3 class="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
                                <span class="w-3 h-3 rounded-full bg-indigo-600"></span>
                                <span>Ampicillin (Dose: 150 - 200 mg/kg/day)</span>
                            </h3>
                            <div class="text-xs font-bold text-indigo-900 bg-indigo-100 px-3 py-1 rounded-lg">
                                Total: <span id="ampi-min-daily">0</span> - <span id="ampi-max-daily">0</span> mg/day
                            </div>
                        </div>

                        <!-- Responsive Table -->
                        <div class="overflow-x-auto rounded-xl border border-indigo-100 bg-white">
                            <table class="w-full text-xs text-left">
                                <thead class="bg-indigo-100/70 text-indigo-950 font-bold border-b border-indigo-200">
                                    <tr>
                                        <th class="p-2.5 text-center">PMA</th>
                                        <th class="p-2.5 text-center">PNA</th>
                                        <th class="p-2.5 text-right">Min (mg)</th>
                                        <th class="p-2.5 text-right">Max (mg)</th>
                                        <th class="p-2.5 text-center">Unit</th>
                                        <th class="p-2.5 text-center">Interval</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody-ampi" class="divide-y divide-slate-100 font-medium">
                                    <!-- Dynamic Rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 2. GENTAMICIN CARD -->
                    <div id="card-genta" class="bg-sky-50/50 border border-sky-200/80 p-4 sm:p-5 rounded-2xl shadow-xs space-y-3 transition-all">
                        <div class="flex items-center justify-between border-b border-sky-200 pb-2.5">
                            <h3 class="text-lg font-extrabold text-sky-950 flex items-center gap-2">
                                <span class="w-3 h-3 rounded-full bg-sky-600"></span>
                                <span>Gentamicin</span>
                            </h3>
                            <div class="text-xs font-bold text-sky-900 bg-sky-100 px-3 py-1 rounded-lg">
                                Min Sol Vol (10mg/ml): <span id="genta-calc-sol" class="font-extrabold text-sky-700">0.00 ml</span>
                            </div>
                        </div>

                        <!-- Responsive Table -->
                        <div class="overflow-x-auto rounded-xl border border-sky-100 bg-white">
                            <table class="w-full text-xs text-left">
                                <thead class="bg-sky-100/70 text-sky-950 font-bold border-b border-sky-200">
                                    <tr>
                                        <th class="p-2.5 text-center">PMA</th>
                                        <th class="p-2.5 text-center">PNA</th>
                                        <th class="p-2.5 text-right">Dose (mg)</th>
                                        <th class="p-2.5 text-center">Unit</th>
                                        <th class="p-2.5 text-center">Interval</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody-genta" class="divide-y divide-slate-100 font-medium">
                                    <!-- Dynamic Rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 3. CLOXACILLIN CARD (Placeholder for next step) -->
                    <div id="card-cloxa" class="bg-amber-50/50 border border-amber-200/80 p-4 sm:p-5 rounded-2xl shadow-xs space-y-3 transition-all">
                        <div class="flex items-center justify-between border-b border-amber-200 pb-2.5">
                            <h3 class="text-lg font-extrabold text-amber-950 flex items-center gap-2">
                                <span class="w-3 h-3 rounded-full bg-amber-600"></span>
                                <span>Cloxacillin</span>
                            </h3>
                            <span class="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">Pending Table Data</span>
                        </div>
                        <div class="bg-white p-6 rounded-xl border border-amber-100 text-center text-amber-800 text-sm font-semibold">
                            กำลังเตรียมข้อมูลตารางคำนวณ Cloxacillin...
                        </div>
                    </div>

                    <!-- 4. CLINDA CARD (Placeholder for next step) -->
                    <div id="card-clinda" class="bg-emerald-50/50 border border-emerald-200/80 p-4 sm:p-5 rounded-2xl shadow-xs space-y-3 transition-all">
                        <div class="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                            <h3 class="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
                                <span class="w-3 h-3 rounded-full bg-emerald-600"></span>
                                <span>Clindamycin</span>
                            </h3>
                            <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">Pending Table Data</span>
                        </div>
                        <div class="bg-white p-6 rounded-xl border border-emerald-100 text-center text-emerald-800 text-sm font-semibold">
                            กำลังเตรียมข้อมูลตารางคำนวณ Clindamycin...
                        </div>
                    </div>

                </div>

            </div>

        </div>
    `;

    // Bind Event Listeners
    bindEvents(container);

    // Initial Calculation
    calculateAll(container);
}

function bindEvents(container) {
    const inputs = ['atb-ga-wk', 'atb-ga-day', 'atb-pna-day', 'atb-bw'];
    
    // Keyboard Navigation & Inputs
    inputs.forEach((id, index) => {
        const el = container.querySelector(`#${id}`);
        if (el) {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const nextId = inputs[(index + 1) % inputs.length];
                    const nextEl = container.querySelector(`#${nextId}`);
                    if (nextEl) {
                        nextEl.focus();
                        nextEl.select();
                    }
                }
            });
            el.addEventListener('input', () => calculateAll(container));
            el.addEventListener('change', () => calculateAll(container));
        }
    });

    // BW Stepper Buttons
    container.querySelector('#btn-bw-minus')?.addEventListener('click', () => adjustBW(container, -0.1));
    container.querySelector('#btn-bw-plus')?.addEventListener('click', () => adjustBW(container, 0.1));

    // Reset Button
    container.querySelector('#btn-reset-atb')?.addEventListener('click', () => resetForm(container));

    // Toggle Checkboxes
    ['toggle-ampi', 'toggle-genta', 'toggle-cloxa', 'toggle-clinda'].forEach(id => {
        container.querySelector(`#${id}`)?.addEventListener('change', () => toggleDrugCards(container));
    });
}

function adjustBW(container, step) {
    const bwInput = container.querySelector('#atb-bw');
    if (!bwInput) return;
    let val = parseFloat(bwInput.value) || 0;
    val = Math.max(0, val + step);
    bwInput.value = val.toFixed(4);
    calculateAll(container);
}

function resetForm(container) {
    container.querySelector('#atb-ga-wk').value = 28;
    container.querySelector('#atb-ga-day').value = 0;
    container.querySelector('#atb-pna-day').value = 3;
    container.querySelector('#atb-bw').value = (1.0000).toFixed(4);

    ['toggle-ampi', 'toggle-genta', 'toggle-cloxa', 'toggle-clinda'].forEach(id => {
        const chk = container.querySelector(`#${id}`);
        if (chk) chk.checked = true;
    });

    toggleDrugCards(container);
    calculateAll(container);
    container.querySelector('#atb-ga-wk').focus();
}

function toggleDrugCards(container) {
    const ampiOn = container.querySelector('#toggle-ampi').checked;
    const gentaOn = container.querySelector('#toggle-genta').checked;
    const cloxaOn = container.querySelector('#toggle-cloxa').checked;
    const clindaOn = container.querySelector('#toggle-clinda').checked;

    container.querySelector('#card-ampi')?.classList.toggle('hidden', !ampiOn);
    container.querySelector('#card-genta')?.classList.toggle('hidden', !gentaOn);
    container.querySelector('#card-cloxa')?.classList.toggle('hidden', !cloxaOn);
    container.querySelector('#card-clinda')?.classList.toggle('hidden', !clindaOn);
}

function calculatePMA(gaWk, gaDay, pnaDay) {
    const totalDays = gaDay + pnaDay;
    const addWk = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    
    let roundedWk = 0;
    if (remDays >= 4) {
        roundedWk = 1;
    }

    const calculatedPMA = gaWk + addWk + roundedWk;
    return {
        pma: calculatedPMA,
        totalDays: totalDays,
        addWk: addWk,
        remDays: remDays,
        roundedWk: roundedWk
    };
}

function calculateAll(container) {
    const gaWk = parseInt(container.querySelector('#atb-ga-wk').value) || 0;
    const gaDay = parseInt(container.querySelector('#atb-ga-day').value) || 0;
    const pnaDay = parseInt(container.querySelector('#atb-pna-day').value) || 0;
    const bw = parseFloat(container.querySelector('#atb-bw').value) || 0;

    const pmaResult = calculatePMA(gaWk, gaDay, pnaDay);
    const pma = pmaResult.pma;

    // Render PMA Info
    container.querySelector('#pma-calc-explain').innerHTML = 
        `PMA = GA (${gaWk}w ${gaDay}d) + PNA (${pnaDay}d) ➔ วันรวม = ${gaDay}+${pnaDay} = ${pmaResult.totalDays} วัน (${pmaResult.addWk}w เศษ ${pmaResult.remDays}d) ` +
        `➔ [${pmaResult.remDays >= 4 ? 'เศษ ≥ 4 วัน ปัดขึ้น +1w' : 'เศษ < 4 วัน ปัดทิ้ง'}] ➔ <strong>PMA = ${pma} สัปดาห์</strong>`;

    container.querySelector('#display-pma-wk').innerText = `${pma} wk`;

    // Ampicillin Calculation
    const ampiMinTotal = bw * 150;
    const ampiMaxTotal = bw * 200;
    container.querySelector('#ampi-min-daily').innerText = ampiMinTotal.toFixed(2);
    container.querySelector('#ampi-max-daily').innerText = ampiMaxTotal.toFixed(2);

    renderAmpicillinTable(container, pma, pnaDay, ampiMinTotal, ampiMaxTotal);
    renderGentamicinTable(container, pma, pnaDay, bw);
}

function renderAmpicillinTable(container, pma, pna, minDaily, maxDaily) {
    const tbody = container.querySelector('#tbody-ampi');
    if (!tbody) return;
    tbody.innerHTML = '';

    AMPICILLIN_TABLE.forEach((row) => {
        const isPmaMatch = pma >= row.pmaMin && pma <= row.pmaMax;
        const isPnaMatch = pna >= row.pnaMin && pna <= row.pnaMax;
        const isMatch = isPmaMatch && isPnaMatch;

        const dosesPerDay = 24 / row.intervalHrs;
        const doseMin = minDaily / dosesPerDay;
        const doseMax = maxDaily / dosesPerDay;

        const tr = document.createElement('tr');
        tr.className = isMatch 
            ? 'bg-indigo-100 font-extrabold text-indigo-950 border-y border-indigo-300' 
            : 'hover:bg-slate-50 text-slate-700';

        tr.innerHTML = `
            <td class="p-2.5 text-center">${row.textPma}</td>
            <td class="p-2.5 text-center">${row.textPna}</td>
            <td class="p-2.5 text-right font-mono font-bold">${doseMin.toFixed(2)}</td>
            <td class="p-2.5 text-right font-mono font-bold">${doseMax.toFixed(2)}</td>
            <td class="p-2.5 text-center">mg</td>
            <td class="p-2.5 text-center font-bold">q ${row.intervalHrs} hr(s)</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderGentamicinTable(container, pma, pna, bw) {
    const tbody = container.querySelector('#tbody-genta');
    if (!tbody) return;
    tbody.innerHTML = '';

    let matchedDose = 0;

    GENTAMICIN_TABLE.forEach((row) => {
        const isPmaMatch = pma >= row.pmaMin && pma <= row.pmaMax;
        const isPnaMatch = pna >= row.pnaMin && pna <= row.pnaMax;
        const isMatch = isPmaMatch && isPnaMatch;

        const dose = bw * row.multiplier;
        if (isMatch) matchedDose = dose;

        const tr = document.createElement('tr');
        tr.className = isMatch 
            ? 'bg-sky-100 font-extrabold text-sky-950 border-y border-sky-300' 
            : 'hover:bg-slate-50 text-slate-700';

        tr.innerHTML = `
            <td class="p-2.5 text-center">${row.textPma}</td>
            <td class="p-2.5 text-center">${row.textPna}</td>
            <td class="p-2.5 text-right font-mono font-bold text-sky-900">${dose.toFixed(2)}</td>
            <td class="p-2.5 text-center">mg</td>
            <td class="p-2.5 text-center font-bold">q ${row.intervalHrs} hr(s)</td>
        `;
        tbody.appendChild(tr);
    });

    const minSolVol = matchedDose / 10;
    const solEl = container.querySelector('#genta-calc-sol');
    if (solEl) solEl.innerText = `${minSolVol.toFixed(2)} ml`;
}
