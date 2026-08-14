/**
 * Smalldose Calculator Module
 * Refactored for customized layout based on section [A] requirements.
 */

export function render(container) {
    container.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-5 items-start w-full">
        
        <!-- [A] Sidebar Input (บีบขนาดลงเหลือ ~22% เพื่อเพิ่มพื้นที่ Output) -->
        <aside class="w-full lg:w-[22%] bg-slate-900 text-slate-100 p-4 rounded-3xl shadow-xl flex flex-col gap-4 shrink-0">
            
            <!-- Header Header Section -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center font-bold text-sm border border-teal-500/30">
                        <i class="fa-solid fa-pills"></i>
                    </div>
                    <div>
                        <h2 class="text-base font-bold text-white leading-tight">Smalldose Calc</h2>
                    </div>
                </div>
                <button id="sd-btn-reset" class="bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 font-medium">
                    <i class="fa-solid fa-rotate-right text-[10px]"></i>
                    <span>Reset</span>
                </button>
            </div>

            <!-- Inputs Section -->
            <div class="space-y-3.5">
                
                <!-- [A.4] กรอบที่ 1: ข้อมูลครรภ์ (ฝั่งแม่) -->
                <div class="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-3 space-y-2">
                    <span class="text-[11px] font-semibold tracking-wider text-teal-400 uppercase flex items-center gap-1.5">
                        <i class="fa-solid fa-person-pregnant text-xs"></i> ข้อมูลครรภ์ (GA)
                    </span>
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1">GA (อายุครรภ์เมื่อคลอด)</label>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="relative flex items-center">
                                <input type="number" id="sd-ga-wk" value="32" min="20" max="44" class="w-full bg-slate-950 border border-slate-700 rounded-xl py-1.5 pl-3 pr-8 text-right font-bold text-white text-sm focus:outline-none focus:border-teal-500">
                                <span class="absolute right-2.5 text-xs text-slate-400 font-medium pointer-events-none">wk</span>
                            </div>
                            <div class="relative flex items-center">
                                <input type="number" id="sd-ga-day" value="1" min="0" max="6" class="w-full bg-slate-950 border border-slate-700 rounded-xl py-1.5 pl-3 pr-10 text-right font-bold text-white text-sm focus:outline-none focus:border-teal-500">
                                <span class="absolute right-2 text-xs text-slate-400 font-medium pointer-events-none">days</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- [A.4] กรอบที่ 2: ข้อมูลทารก (ฝั่งลูก) -->
                <div class="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-3 space-y-3">
                    <span class="text-[11px] font-semibold tracking-wider text-teal-400 uppercase flex items-center gap-1.5">
                        <i class="fa-solid fa-baby text-xs"></i> ข้อมูลทารก (Baby)
                    </span>
                    
                    <!-- PNA -->
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1">PNA (อายุหลังคลอด)</label>
                        <div class="relative flex items-center">
                            <input type="number" id="sd-pna-day" value="5" min="0" max="120" class="w-full bg-slate-950 border border-slate-700 rounded-xl py-1.5 pl-3 pr-12 text-right font-bold text-white text-sm focus:outline-none focus:border-teal-500">
                            <span class="absolute right-3 text-xs text-slate-400 font-medium pointer-events-none">days</span>
                        </div>
                    </div>

                    <!-- [A.5 & A.6] BW (น้ำหนักตัวทารก) + ปุ่มอ้วนกลม -->
                    <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1">BW (น้ำหนักตัวทารก)</label>
                        <div class="flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-xl p-1.5">
                            <button id="sd-bw-minus" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-teal-400 flex items-center justify-center font-bold text-base transition-colors shrink-0 active:scale-95">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <div class="flex-1 relative flex items-center min-w-0">
                                <input type="number" id="sd-bw" value="4.600" step="0.001" min="0.3" max="10" class="w-full bg-transparent text-right font-black text-teal-400 text-lg focus:outline-none pr-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                                <span class="absolute right-0 text-xs text-slate-400 font-medium pointer-events-none">kg</span>
                            </div>
                            <button id="sd-bw-plus" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-teal-400 flex items-center justify-center font-bold text-base transition-colors shrink-0 active:scale-95">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- [A.7] สรุป PMA (ย้ายมาไว้ต่อท้ายน้ำหนักทารกภายใน Sidebar) -->
                <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center space-y-1">
                    <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">สรุปอายุครรภ์ปรับแต่ง (CALCULATED PMA)</span>
                    <div id="sd-pma-display" class="text-2xl font-black text-teal-400 tracking-tight">33 wk</div>
                    <p id="sd-pma-desc" class="text-[11px] text-slate-400 font-light leading-snug">
                        PMA = GA (32w 1d) + PNA (5d) &rarr; วันรวม = 1+5 = 6 วัน (เศษ &lt; 4 วัน) &rarr; PMA = 33 สัปดาห์
                    </p>
                </div>

                <!-- [A.8 & A.9] เลือกแสดงรายยา -->
                <div class="pt-1">
                    <label class="block text-xs font-semibold text-slate-300 mb-2">เลือกแสดงรายยา</label>
                    <div class="grid grid-cols-2 gap-2">
                        <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                            <input type="checkbox" id="sd-chk-ampicillin" checked class="w-4 h-4 rounded accent-teal-500 cursor-pointer">
                            <span class="text-sm font-bold text-slate-200">Ampicillin</span>
                        </label>
                        <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                            <input type="checkbox" id="sd-chk-gentamicin" checked class="w-4 h-4 rounded accent-teal-500 cursor-pointer">
                            <span class="text-sm font-bold text-slate-200">Gentamicin</span>
                        </label>
                        <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                            <input type="checkbox" id="sd-chk-cloxacillin" class="w-4 h-4 rounded accent-teal-500 cursor-pointer">
                            <span class="text-sm font-bold text-slate-200">Cloxacillin</span>
                        </label>
                        <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                            <input type="checkbox" id="sd-chk-clindamycin" class="w-4 h-4 rounded accent-teal-500 cursor-pointer">
                            <span class="text-sm font-bold text-slate-200">Clindamycin</span>
                        </label>
                    </div>
                </div>

            </div>
        </aside>

        <!-- [A.1] Output Display (เพิ่มขยายพื้นที่ฝั่งขวา ~78%) -->
        <main class="w-full lg:w-[78%] flex flex-col gap-5">
            
            <!-- Card Ampicillin -->
            <div id="sd-card-ampicillin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Ampicillin <span class="text-sm font-normal text-slate-600">(Dose: 150 - 200 mg/kg/day)</span></h3>
                    </div>
                    <div id="sd-amp-total" class="bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold px-3 py-1 rounded-xl text-xs self-start sm:self-auto">
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
                        <span class="w-3 h-3 rounded-full bg-teal-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Gentamicin</h3>
                    </div>
                    <div id="sd-genta-vol" class="bg-teal-50 border border-teal-200 text-teal-800 font-semibold px-3 py-1 rounded-xl text-xs self-start sm:self-auto">
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
                    <span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
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
                    <span class="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
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

    // [A.6] ซ่อมแซมปุ่ม + และ -
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

        // อัปเดตการแสดงผล PMA
        const pmaDisplay = container.querySelector('#sd-pma-display');
        const pmaDesc = container.querySelector('#sd-pma-desc');
        pmaDisplay.innerText = `${pma} wk`;
        pmaDesc.innerText = `PMA = GA (${gaWk}w ${gaDay}d) + PNA (${pnaDay}d) → วันรวม = ${gaDay}+${pnaDay} = ${totalDays} วัน (${remDays >= 4 ? `เศษ ≥ 4 วัน ปัดขึ้น +1w` : `เศษ < 4 วัน`}) → PMA = ${pma} สัปดาห์`;

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
        const minVol = ((bw * 4.5) / 10).toFixed(2); // Example ratio calculation
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
            const activeClass = isMatch ? "bg-emerald-100/90 font-bold text-emerald-900 border-l-4 border-emerald-600" : "";
            
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
