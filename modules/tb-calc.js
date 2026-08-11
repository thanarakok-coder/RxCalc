/**
 * TB Drug Dose Calculator Module (TB-calc)
 * Architecture: ES Module for RxCalc
 * Features: Weight-based dosing, eGFR < 30 alert, Non-bold clean UI
 * Timestamp: 2026-08-11
 */

export function render(container) {
    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');
            
            #tb-calc-module {
                font-family: 'Sarabun', 'Inter', sans-serif;
                font-weight: 400;
            }
            #tb-calc-module input[type="number"]::-webkit-inner-spin-button,
            #tb-calc-module input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            #tb-calc-module input[type="number"] {
                -moz-appearance: textfield;
            }
        </style>

        <div id="tb-calc-module" class="max-w-5xl mx-auto p-3 space-y-4 text-slate-700">
            
            <!-- Header & Input Bar -->
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100 text-lg">
                        🫁
                    </div>
                    <div>
                        <h1 class="text-lg text-slate-800">TB-calc</h1>
                        <p class="text-xs text-slate-400">คำนวณขนาดยาวัณโรคตามน้ำหนักตัว</p>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <!-- Weight Input (1 ช่องถ้วน) -->
                    <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                        <label for="tb-weight" class="text-sm text-slate-600">น้ำหนักตัว:</label>
                        <input type="number" id="tb-weight" step="any" min="0" placeholder="0" class="w-24 text-right text-base bg-white border border-slate-300 rounded-lg px-2 py-1 text-teal-700 focus:outline-none focus:border-teal-500">
                        <span class="text-sm text-slate-500">kg</span>
                    </div>

                    <!-- Renal Checkbox -->
                    <label class="flex items-center gap-2 cursor-pointer select-none bg-amber-50/60 px-3 py-2 rounded-xl border border-amber-200/60 hover:bg-amber-50 transition-all">
                        <input type="checkbox" id="chk-egfr" class="w-4 h-4 accent-amber-600 rounded cursor-pointer">
                        <span class="text-xs text-amber-900">eGFR &lt; 30 ml/min</span>
                    </label>
                </div>
            </div>

            <!-- Global Alert for eGFR < 30 -->
            <div id="egfr-alert" class="hidden p-3 bg-amber-50 border border-amber-300 text-amber-800 rounded-xl text-xs flex items-center gap-2">
                <span class="text-base">⚠️</span>
                <span>คำเตือน: ผู้ป่วยมี eGFR &lt; 30 ml/min แนะนำให้ปรับความถี่การให้ยา [Z], [E], [S], [L], [O] เป็น <strong>3 วัน/สัปดาห์</strong> (ยกเว้น [I] และ [R] ให้ตามขนาดปกติวันละครั้ง)</span>
            </div>

            <!-- Cards Grid for Drugs -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" id="drug-cards-container">
                
                <!-- 1. Isoniazid [I] -->
                <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
                    <div class="flex items-start justify-between border-b border-slate-100 pb-2">
                        <div>
                            <span class="text-3xl text-teal-600 leading-none block">[I]</span>
                            <span class="text-xs text-slate-400 block pt-1">Isoniazid</span>
                        </div>
                        <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">5 mg/kg</span>
                    </div>
                    <div class="space-y-1">
                        <div class="flex justify-between items-baseline text-sm">
                            <span class="text-slate-500">ขนาดแนะนำ:</span>
                            <span class="text-teal-700 text-base" id="res-i-avg">-</span>
                        </div>
                        <div class="flex justify-between items-baseline text-xs text-slate-400">
                            <span>ช่วงขนาดยา (4-6):</span>
                            <span id="res-i-range">-</span>
                        </div>
                    </div>
                </div>

                <!-- 2. Rifampicin [R] -->
                <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
                    <div class="flex items-start justify-between border-b border-slate-100 pb-2">
                        <div>
                            <span class="text-3xl text-teal-600 leading-none block">[R]</span>
                            <span class="text-xs text-slate-400 block pt-1">Rifampicin</span>
                        </div>
                        <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">10 mg/kg</span>
                    </div>
                    <div class="space-y-1">
                        <div class="flex justify-between items-baseline text-sm">
                            <span class="text-slate-500">ขนาดแนะนำ:</span>
                            <span class="text-teal-700 text-base" id="res-r-avg">-</span>
                        </div>
                        <div class="flex justify-between items-baseline text-xs text-slate-400">
                            <span>ช่วงขนาดยา (8-12):</span>
                            <span id="res-r-range">-</span>
                        </div>
                    </div>
                </div>

                <!-- 3. Pyrazinamide [Z] -->
                <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between relative overflow-hidden" id="card-z">
                    <div class="flex items-start justify-between border-b border-slate-100 pb-2">
                        <div>
                            <span class="text-3xl text-sky-600 leading-none block">[Z]</span>
                            <span class="text-xs text-slate-400 block pt-1">Pyrazinamide</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full block">25 mg/kg</span>
                            <span id="tag-z-schedule" class="text-[10px] text-amber-600 hidden mt-1 block">3 วัน/สัปดาห์</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="flex justify-between items-baseline text-sm">
                            <span class="text-slate-500">ขนาดแนะนำ:</span>
                            <span class="text-sky-700 text-base" id="res-z-avg">-</span>
                        </div>
                        <div class="flex justify-between items-baseline text-xs text-slate-400">
                            <span>ช่วงขนาดยา (20-30):</span>
                            <span id="res-z-range">-</span>
                        </div>
                    </div>
                </div>

                <!-- 4. Ethambutol [E] -->
                <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between" id="card-e">
                    <div class="flex items-start justify-between border-b border-slate-100 pb-2">
                        <div>
                            <span class="text-3xl text-sky-600 leading-none block">[E]</span>
                            <span class="text-xs text-slate-400 block pt-1">Ethambutol</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full block">15 mg/kg</span>
                            <span id="tag-e-schedule" class="text-[10px] text-amber-600 hidden mt-1 block">3 วัน/สัปดาห์</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="flex justify-between items-baseline text-sm">
                            <span class="text-slate-500">ขนาดแนะนำ:</span>
                            <span class="text-sky-700 text-base" id="res-e-avg">-</span>
                        </div>
                        <div class="flex justify-between items-baseline text-xs text-slate-400">
                            <span>ช่วงขนาดยา (15-20):</span>
                            <span id="res-e-range">-</span>
                        </div>
                    </div>
                </div>

                <!-- 5. Streptomycin [S] -->
                <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between" id="card-s">
                    <div class="flex items-start justify-between border-b border-slate-100 pb-2">
                        <div>
                            <span class="text-3xl text-sky-600 leading-none block">[S]</span>
                            <span class="text-xs text-slate-400 block pt-1">Streptomycin</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full block">15 mg/kg</span>
                            <span id="tag-s-schedule" class="text-[10px] text-amber-600 hidden mt-1 block">3 วัน/สัปดาห์</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="flex justify-between items-baseline text-sm">
                            <span class="text-slate-500">ขนาดแนะนำ:</span>
                            <span class="text-sky-700 text-base" id="res-s-avg">-</span>
                        </div>
                        <div class="flex justify-between items-baseline text-xs text-slate-400">
                            <span>ช่วงขนาดยา (12-20):</span>
                            <span id="res-s-range">-</span>
                        </div>
                    </div>
                </div>

                <!-- 6. Levofloxacin [L] -->
                <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between" id="card-l">
                    <div class="flex items-start justify-between border-b border-slate-100 pb-2">
                        <div>
                            <span class="text-3xl text-indigo-600 leading-none block">[L]</span>
                            <span class="text-xs text-slate-400 block pt-1">Levofloxacin</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full block">750 mg/day</span>
                            <span id="tag-l-schedule" class="text-[10px] text-amber-600 hidden mt-1 block">3 วัน/สัปดาห์</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="flex justify-between items-baseline text-sm">
                            <span class="text-slate-500">ขนาดยามาตรฐาน:</span>
                            <span class="text-indigo-700 text-base" id="res-l-avg">750 mg/day</span>
                        </div>
                        <div class="flex justify-between items-baseline text-xs text-slate-400">
                            <span>ช่วงขนาดยา (15-20):</span>
                            <span id="res-l-range">-</span>
                        </div>
                        <div class="text-[10px] text-slate-400 text-right pt-0.5">
                            *สูงสุดไม่เกิน 1,000 mg/day
                        </div>
                    </div>
                </div>

                <!-- 7. Ofloxacin [O] (ไม่ค่อยแนะนำแล้ว) -->
                <div class="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between" id="card-o">
                    <div class="flex items-start justify-between border-b border-slate-200 pb-2">
                        <div>
                            <span class="text-3xl text-slate-500 leading-none block">[O]</span>
                            <span class="text-xs text-slate-400 block pt-1">Ofloxacin</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full block">ไม่ค่อยแนะนำแล้ว</span>
                            <span id="tag-o-schedule" class="text-[10px] text-amber-600 hidden mt-1 block">3 วัน/สัปดาห์</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="flex justify-between items-baseline text-sm">
                            <span class="text-slate-500">ขนาดแนะนำ:</span>
                            <span class="text-slate-700 text-base" id="res-o-avg">-</span>
                        </div>
                        <div class="flex justify-between items-baseline text-xs text-slate-400">
                            <span>ช่วงขนาดยา (7.5-15):</span>
                            <span id="res-o-range">-</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Footer Reference Note -->
            <div class="text-[11px] text-slate-400 bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                <div>* หมายเหตุอ้างอิงขนาดยาเฉลี่ย: [I] 5 mg/kg | [R] 10 mg/kg | [Z] 25 mg/kg | [E] 15 mg/kg | [S] 15 mg/kg | [L] 750 mg/day | [O] 10 mg/kg</div>
                <div>* หน่วยคำนวณทั้งหมดเป็น มิลลิกรัม/วัน (mg/day)</div>
            </div>

        </div>
    `;

    // Binding Events
    const weightInput = container.querySelector('#tb-weight');
    const chkEgfr = container.querySelector('#chk-egfr');

    weightInput.addEventListener('input', () => calculateTbDose(container));
    chkEgfr.addEventListener('change', () => calculateTbDose(container));

    weightInput.focus();
}

// Utility formatting: แสดงเลขกลมๆ หากไม่มีทศนิยม
function formatNumber(val) {
    if (isNaN(val) || val <= 0) return '-';
    const rounded = Math.round(val * 100) / 100;
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2);
}

function calculateTbDose(container) {
    const weight = parseFloat(container.querySelector('#tb-weight').value) || 0;
    const isLowEgfr = container.querySelector('#chk-egfr').checked;

    const egfrAlert = container.querySelector('#egfr-alert');
    if (isLowEgfr) {
        egfrAlert.classList.remove('hidden');
    } else {
        egfrAlert.classList.add('hidden');
    }

    // Toggle Schedule Tag for Renal-adjusted drugs [Z, E, S, L, O]
    ['z', 'e', 's', 'l', 'o'].forEach(drug => {
        const tag = container.querySelector(`#tag-${drug}-schedule`);
        if (tag) {
            if (isLowEgfr) {
                tag.classList.remove('hidden');
            } else {
                tag.classList.add('hidden');
            }
        }
    });

    if (weight <= 0) {
        // Clear Values
        ['i', 'r', 'z', 'e', 's', 'l', 'o'].forEach(d => {
            container.querySelector(`#res-${d}-avg`).innerText = d === 'l' ? '750 mg/day' : '-';
            container.querySelector(`#res-${d}-range`).innerText = '-';
        });
        return;
    }

    // 1. [I] Isoniazid: Avg x5, Range x4 - x6
    renderDrugResult(container, 'i', weight * 5, weight * 4, weight * 6);

    // 2. [R] Rifampicin: Avg x10, Range x8 - x12
    renderDrugResult(container, 'r', weight * 10, weight * 8, weight * 12);

    // 3. [Z] Pyrazinamide: Avg x25, Range x20 - x30
    renderDrugResult(container, 'z', weight * 25, weight * 20, weight * 30);

    // 4. [E] Ethambutol: Avg x15, Range x15 - x20
    renderDrugResult(container, 'e', weight * 15, weight * 15, weight * 20);

    // 5. [S] Streptomycin: Avg x15, Range x12 - x20
    renderDrugResult(container, 's', weight * 15, weight * 12, weight * 20);

    // 6. [L] Levofloxacin: Fixed 750, Range x15 - x20 (Max 1000)
    let lMin = weight * 15;
    let lMax = Math.min(weight * 20, 1000);
    container.querySelector('#res-l-avg').innerText = '750 mg/day';
    container.querySelector('#res-l-range').innerText = `${formatNumber(lMin)} - ${formatNumber(lMax)} mg/day`;

    // 7. [O] Ofloxacin: Avg x10, Range x7.5 - x15
    renderDrugResult(container, 'o', weight * 10, weight * 7.5, weight * 15);
}

function renderDrugResult(container, drugCode, avg, min, max) {
    const avgElem = container.querySelector(`#res-${drugCode}-avg`);
    const rangeElem = container.querySelector(`#res-${drugCode}-range`);

    if (avgElem) avgElem.innerText = `${formatNumber(avg)} mg/day`;
    if (rangeElem) rangeElem.innerText = `${formatNumber(min)} - ${formatNumber(max)} mg/day`;
}
