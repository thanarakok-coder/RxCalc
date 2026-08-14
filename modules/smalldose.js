/**
 * Smalldose Calculator Module
 * Refactored Zone A layout with pure Inline SVGs and improved UI visibility.
 */

export function render(container) {
    container.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-5 items-start w-full">
        
        <!-- Zone A: Sidebar Input (กว้าง ~22%) -->
        <aside class="w-full lg:w-[22%] bg-slate-900 text-slate-100 p-4 rounded-3xl shadow-xl flex flex-col gap-4 shrink-0">
            
            <!-- Header Section -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-teal-500/20 text-teal-300 rounded-xl flex items-center justify-center border border-teal-500/30 shrink-0">
                        <!-- Pill SVG -->
                        <svg class="w-4 h-4 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                    </div>
                    <div>
                        <h2 class="text-base font-bold text-white leading-tight">Smalldose Calc</h2>
                    </div>
                </div>
                <!-- 3. ปุ่ม Reset -->
                <button id="sd-btn-reset" class="bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-teal-200 text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 font-medium shrink-0">
                    <!-- Refresh SVG -->
                    <svg class="w-3 h-3 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                    <span>Reset</span>
                </button>
            </div>

            <!-- Inputs Section -->
            <div class="space-y-3.5">
                
                <!-- กรอบที่ 1: ข้อมูลครรภ์ (ฝั่งแม่) -->
                <div class="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 space-y-2">
                    <span class="text-[11px] font-bold tracking-wider text-teal-300 uppercase flex items-center gap-1.5">
                        <!-- Pregnant Icon SVG -->
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/><path d="M19 14c0-3.3-2.7-6-6-6h-2c-3.3 0-6 2.7-6 6v7h3v-4h6v4h3v-7Z"/></svg>
                        ข้อมูลครรภ์ (GA)
                    </span>
                    <div>
                        <label class="block text-xs font-semibold text-slate-200 mb-1">GA (อายุครรภ์เมื่อคลอด)</label>
                        <div class="grid grid-cols-2 gap-2">
                            <!-- 3. Input สีขาว ขนาดเท่ากัน -->
                            <div class="relative flex items-center">
                                <input type="number" id="sd-ga-wk" value="32" min="20" max="44" class="w-full bg-white border border-slate-300 rounded-xl h-10 px-3 pr-8 text-right font-bold text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400">
                                <span class="absolute right-2.5 text-xs text-slate-500 font-bold pointer-events-none">wk</span>
                            </div>
                            <div class="relative flex items-center">
                                <input type="number" id="sd-ga-day" value="1" min="0" max="6" class="w-full bg-white border border-slate-300 rounded-xl h-10 px-3 pr-9 text-right font-bold text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400">
                                <span class="absolute right-2 text-xs text-slate-500 font-bold pointer-events-none">days</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- กรอบที่ 2: ข้อมูลทารก (ฝั่งลูก) -->
                <div class="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 space-y-3">
                    <span class="text-[11px] font-bold tracking-wider text-teal-300 uppercase flex items-center gap-1.5">
                        <!-- Baby SVG -->
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.5 1.5 1 2 1s1.5-.5 2-1"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 5 6.3"/></svg>
                        ข้อมูลทารก (BABY)
                    </span>
                    
                    <!-- PNA Input -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-200 mb-1">PNA (อายุหลังคลอด)</label>
                        <div class="relative flex items-center">
                            <input type="number" id="sd-pna-day" value="5" min="0" max="120" class="w-full bg-white border border-slate-300 rounded-xl h-10 px-3 pr-12 text-right font-bold text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400">
                            <span class="absolute right-3 text-xs text-slate-500 font-bold pointer-events-none">days</span>
                        </div>
                    </div>

                    <!-- BW Input -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-200 mb-1">BW (น้ำหนักตัวทารก)</label>
                        <div class="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl h-10 px-1.5">
                            <button id="sd-bw-minus" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors shrink-0 active:scale-95 border border-slate-300">
                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                            </button>
                            <div class="flex-1 relative flex items-center min-w-0">
                                <input type="number" id="sd-bw" value="4.600" step="0.001" min="0.3" max="10" class="w-full bg-transparent text-right font-black text-teal-700 text-base focus:outline-none pr-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                                <span class="absolute right-0 text-xs text-slate-500 font-bold pointer-events-none">kg</span>
                            </div>
                            <button id="sd-bw-plus" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors shrink-0 active:scale-95 border border-slate-300">
                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 4 & 5. สรุป PMA + จัดบรรทัดใหม่ไม่เกยกัน -->
                <div class="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 text-center space-y-1.5">
                    <span class="text-[11px] uppercase tracking-wider text-teal-400 font-bold block">CALCULATED PMA</span>
                    <div id="sd-pma-display" class="text-2xl font-black text-teal-300 tracking-tight">33 wk</div>
                    <div id="sd-pma-desc" class="text-[11px] text-slate-300 font-normal leading-relaxed text-left pt-1 border-t border-slate-800/80 space-y-0.5">
                        <!-- JS Dynamic Text -->
                    </div>
                </div>

                <!-- 6. เลือกแสดงรายยา (โทนสีแยก 4 ยา) -->
                <div class="pt-1">
                    <label class="block text-xs font-bold text-slate-200 mb-2">เลือกแสดงรายยา</label>
                    <div class="grid grid-cols-2 gap-2">
                        
                        <!-- Ampicillin (โทนน้ำเงิน/Blue-Indigo) -->
                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-indigo-500/50 hover:border-indigo-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-ampicillin" checked class="w-3.5 h-3.5 rounded accent-indigo-500 cursor-pointer shrink-0">
                            <span class="text-xs font-bold text-indigo-300 truncate">Ampicillin</span>
                        </label>

                        <!-- Gentamicin (โทนเขียว/Teal-Emerald) -->
                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-teal-500/50 hover:border-teal-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-gentamicin" checked class="w-3.5 h-3.5 rounded accent-teal-500 cursor-pointer shrink-0">
                            <span class="text-[11px] font-bold text-teal-300 truncate">Gentamicin</span>
                        </label>

                        <!-- Cloxacillin (โทนเหลือง/Amber) -->
                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-amber-500/50 hover:border-amber-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-cloxacillin" class="w-3.5 h-3.5 rounded accent-amber-500 cursor-pointer shrink-0">
                            <span class="text-[11px] font-bold text-amber-300 truncate">Cloxacillin</span>
                        </label>

                        <!-- Clindamycin (โทนแดง/Rose-Red) -->
                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-rose-500/50 hover:border-rose-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-clindamycin" class="w-3.5 h-3.5 rounded accent-rose-500 cursor-pointer shrink-0">
                            <span class="text-[10px] font-bold text-rose-300 truncate">Clindamycin</span>
                        </label>

                    </div>
                </div>

            </div>
        </aside>

        <!-- Zone B: Output Display (กว้าง ~78%) -->
        <main class="w-full lg:w-[78%] flex flex-col gap-5">
            
            <!-- Card Ampicillin -->
            <div id="sd-card-ampicillin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-indigo-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Ampicillin <span class="text-sm font-normal text-slate-600">(Dose: 150 - 200 mg/kg/day)</span></h3>
                    </div>
                    <div id="sd-amp-total" class="bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold px-3 py-1 rounded-xl text-xs self-start sm:self-auto">
                        Total: 690.00 - 920.00 mg/day
                    </div>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Min (mg)</th>
                                <th class="py-2.5 px-3 text-right">Max (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-ampicillin" class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <!-- JS Generated Rows -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Card Gentamicin -->
            <div id="sd-card-gentamicin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-teal-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Gentamicin</h3>
                    </div>
                    <div id="sd-genta-vol" class="bg-teal-50 border border-teal-200 text-teal-800 font-bold px-3 py-1 rounded-xl text-xs self-start sm:self-auto">
                        Min Sol Vol (10mg/ml): 2.07 ml
                    </div>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Dose (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-gentamicin" class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <!-- JS Generated Rows -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Card Cloxacillin -->
            <div id="sd-card-cloxacillin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4 hidden">
                <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block"></span>
                    <h3 class="text-xl font-bold text-slate-800">Cloxacillin</h3>
                </div>
                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Dose (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-cloxacillin" class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <!-- JS Generated Rows -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Card Clindamycin -->
            <div id="sd-card-clindamycin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4 hidden">
                <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-rose-600 inline-block"></span>
                    <h3 class="text-xl font-bold text-slate-800">Clindamycin</h3>
                </div>
                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Dose (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-clindamycin" class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <!-- JS Generated Rows -->
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    </div>
    `;

    // Initialize Functionality & Event Listeners
    initSmalldoseEvents(container);
}

function initSmalldoseEvents(container) {
    const gaWkInput = container.querySelector('#sd-ga-wk');
    const gaDayInput = container.querySelector('#sd-ga-day');
    const pnaDayInput = container.querySelector('#sd-pna-day');
    const bwInput = container.querySelector('#sd-bw');

    const bwMinusBtn = container.querySelector('#sd-bw-minus');
    const bwPlusBtn = container.querySelector('#sd-bw-plus');
    const resetBtn = container.querySelector('#sd-btn-reset');

    const chkAmp = container.querySelector('#sd-chk-ampicillin');
    const chkGenta = container.querySelector('#sd-chk-gentamicin');
    const chkClox = container.querySelector('#sd-chk-cloxacillin');
    const chkClinda = container.querySelector('#sd-chk-clindamycin');

    const cardAmp = container.querySelector('#sd-card-ampicillin');
    const cardGenta = container.querySelector('#sd-card-gentamicin');
    const cardClox = container.querySelector('#sd-card-cloxacillin');
    const cardClinda = container.querySelector('#sd-card-clindamycin');

    // Button +/- Weight
    bwMinusBtn.addEventListener('click', () => {
        let val = parseFloat(bwInput.value) || 0;
        if (val > 0.1) {
            bwInput.value = (val - 0.1).toFixed(3);
            calculateAll();
        }
    });

    bwPlusBtn.addEventListener('click', () => {
        let val = parseFloat(bwInput.value) || 0;
        bwInput.value = (val + 0.1).toFixed(3);
        calculateAll();
    });

    // Reset Button
    resetBtn.addEventListener('click', () => {
        gaWkInput.value = 32;
        gaDayInput.value = 1;
        pnaDayInput.value = 5;
        bwInput.value = "4.600";
        chkAmp.checked = true;
        chkGenta.checked = true;
        chkClox.checked = false;
        chkClinda.checked = false;
        
        cardAmp.classList.remove('hidden');
        cardGenta.classList.remove('hidden');
        cardClox.classList.add('hidden');
        cardClinda.classList.add('hidden');

        calculateAll();
    });

    // Event Input Listeners
    [gaWkInput, gaDayInput, pnaDayInput, bwInput].forEach(elem => {
        elem.addEventListener('input', calculateAll);
    });

    // Toggle Drug Visibility
    chkAmp.addEventListener('change', () => cardAmp.classList.toggle('hidden', !chkAmp.checked));
    chkGenta.addEventListener('change', () => cardGenta.classList.toggle('hidden', !chkGenta.checked));
    chkClox.addEventListener('change', () => cardClox.classList.toggle('hidden', !chkClox.checked));
    chkClinda.addEventListener('change', () => cardClinda.classList.toggle('hidden', !chkClinda.checked));

    function calculateAll() {
        const gaWk = parseInt(gaWkInput.value) || 0;
        const gaDay = parseInt(gaDayInput.value) || 0;
        const pnaDay = parseInt(pnaDayInput.value) || 0;
        const bw = parseFloat(bwInput.value) || 0;

        // คำนวณ PMA
        const totalDays = gaDay + pnaDay;
        const extraWk = Math.floor(totalDays / 7);
        const remDays = totalDays % 7;
        const roundedWk = remDays >= 4 ? 1 : 0;
        const pma = gaWk + extraWk + roundedWk;

        // อัปเดตการแสดงผล PMA และจัดบรรทัดใหม่ไม่ให้ซ้อนกัน
        const pmaDisplay = container.querySelector('#sd-pma-display');
        const pmaDesc = container.querySelector('#sd-pma-desc');
        pmaDisplay.innerText = `${pma} wk`;
        
        pmaDesc.innerHTML = `
            <div>• PMA = GA (${gaWk}w ${gaDay}d) + PNA (${pnaDay}d)</div>
            <div>• วันรวม = ${gaDay}+${pnaDay} = ${totalDays} วัน</div>
            <div>• ${remDays >= 4 ? `เศษ ${remDays} วัน (≥4 วัน) ปัดขึ้น +1w` : `เศษ ${remDays} วัน (<4 วัน) ไม่ปัดขึ้น`}</div>
            <div class="font-bold text-teal-300 pt-0.5">&rarr; สรุป PMA = ${pma} สัปดาห์</div>
        `;

        // Render Tables
        renderAmpicillin(pma, pnaDay, bw);
        renderGentamicin(pma, pnaDay, bw);
        renderCloxacillin(pma, pnaDay, bw);
        renderClindamycin(pma, pnaDay, bw);
    }

    function renderAmpicillin(pma, pna, bw) {
        const minTotal = (150 * bw).toFixed(2);
        const maxTotal = (200 * bw).toFixed(2);
        container.querySelector('#sd-amp-total').innerText = `Total: ${minTotal} - ${maxTotal} mg/day`;

        const rows = [
            { pmaCond: pma < 29, pnaCond: pna <= 28, pmaText: "< 29 wk", pnaText: "0 - 28 days", div: 2, freq: "q 12 hr(s)" },
            { pmaCond: pma < 29, pnaCond: pna > 28, pmaText: "< 29 wk", pnaText: "≥ 29 days", div: 3, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna <= 14, pmaText: "30 - 36 wk", pnaText: "0 - 14 days", div: 2, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna > 14, pmaText: "30 - 36 wk", pnaText: "≥ 15 days", div: 3, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna <= 7, pmaText: "37 - 44 wk", pnaText: "0 - 7 days", div: 2, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna > 7, pmaText: "37 - 44 wk", pnaText: "≥ 8 days", div: 3, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 45, pnaCond: true, pmaText: "≥ 45 wk", pnaText: "All days", div: 4, freq: "q 6 hr(s)" },
        ];

        let html = "";
        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const minDose = (minTotal / r.div).toFixed(2);
            const maxDose = (maxTotal / r.div).toFixed(2);
            const activeClass = isMatch ? "bg-indigo-100/90 font-bold text-indigo-900 border-l-4 border-indigo-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${minDose}</td>
                <td class="py-2 px-3 text-right">${maxDose}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-ampicillin').innerHTML = html;
    }

    function renderGentamicin(pma, pna, bw) {
        const minVol = ((bw * 4.5) / 10).toFixed(2);
        container.querySelector('#sd-genta-vol').innerText = `Min Sol Vol (10mg/ml): ${minVol} ml`;

        const rows = [
            { pmaCond: pma < 29, pnaCond: pna <= 7, pmaText: "< 29 wk", pnaText: "0 - 7 days", dose: 5.0, freq: "q 48 hr(s)" },
            { pmaCond: pma < 29, pnaCond: pna >= 8 && pna <= 28, pmaText: "< 29 wk", pnaText: "8 - 28 days", dose: 4.0, freq: "q 36 hr(s)" },
            { pmaCond: pma < 29, pnaCond: pna > 28, pmaText: "< 29 wk", pnaText: "≥ 29 days", dose: 4.0, freq: "q 24 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 34, pnaCond: pna <= 7, pmaText: "30 - 34 wk", pnaText: "0 - 7 days", dose: 4.5, freq: "q 36 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 34, pnaCond: pna > 7, pmaText: "30 - 34 wk", pnaText: "≥ 8 days", dose: 4.0, freq: "q 24 hr(s)" },
            { pmaCond: pma >= 35, pnaCond: true, pmaText: "≥ 35 wk", pnaText: "All days", dose: 4.0, freq: "q 24 hr(s)" },
        ];

        let html = "";
        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const doseMg = (bw * r.dose).toFixed(2);
            const activeClass = isMatch ? "bg-teal-100/90 font-bold text-teal-900 border-l-4 border-teal-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${doseMg}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-gentamicin').innerHTML = html;
    }

    function renderCloxacillin(pma, pna, bw) {
        const rows = [
            { pmaCond: pma <= 29, pnaCond: pna <= 28, pmaText: "≤ 29 wk", pnaText: "0 - 28 days", dose: 25, freq: "q 12 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna > 28, pmaText: "≤ 29 wk", pnaText: "> 28 days", dose: 25, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna <= 14, pmaText: "30 - 36 wk", pnaText: "0 - 14 days", dose: 25, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna > 14, pmaText: "30 - 36 wk", pnaText: "> 14 days", dose: 25, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna <= 7, pmaText: "37 - 44 wk", pnaText: "0 - 7 days", dose: 25, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna > 7, pmaText: "37 - 44 wk", pnaText: "> 7 days", dose: 25, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 45, pnaCond: true, pmaText: "≥ 45 wk", pnaText: "All days", dose: 25, freq: "q 6 hr(s)" },
        ];

        let html = "";
        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const doseMg = (bw * r.dose).toFixed(2);
            const activeClass = isMatch ? "bg-amber-100/90 font-bold text-amber-900 border-l-4 border-amber-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${doseMg}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-cloxacillin').innerHTML = html;
    }

    function renderClindamycin(pma, pna, bw) {
        const rows = [
            { pmaCond: pma <= 29, pnaCond: pna <= 28, pmaText: "≤ 29 wk", pnaText: "0 - 28 days", dose: 5, freq: "q 12 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna > 28, pmaText: "≤ 29 wk", pnaText: "> 28 days", dose: 5, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna <= 14, pmaText: "30 - 36 wk", pnaText: "0 - 14 days", dose: 5, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna > 14, pmaText: "30 - 36 wk", pnaText: "> 14 days", dose: 5, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna <= 7, pmaText: "37 - 44 wk", pnaText: "0 - 7 days", dose: 5, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna > 7, pmaText: "37 - 44 wk", pnaText: "> 7 days", dose: 5, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 45, pnaCond: true, pmaText: "≥ 45 wk", pnaText: "All days", dose: 5, freq: "q 6 hr(s)" },
        ];

        let html = "";
        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const doseMg = (bw * r.dose).toFixed(2);
            const activeClass = isMatch ? "bg-rose-100/90 font-bold text-rose-900 border-l-4 border-rose-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${doseMg}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-clindamycin').innerHTML = html;
    }

    // Run Initial Calculation
    calculateAll();
}
