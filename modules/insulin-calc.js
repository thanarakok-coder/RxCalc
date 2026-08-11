/**
 * Insulin Calculator Module
 * Fit-in Screen Layout with Sarabun Font (Thai with heads)
 * Theme: Soft Medical / Clean & Calm Light Theme
 * Timestamp: 2026-08-11
 */

let alcMode = 'all';

const thaiMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

// GitHub Raw Image CDN Base URL
const IMG_BASE_URL = 'https://raw.githubusercontent.com/thanarakok-coder/rx-calculator/main/';

export function render(container) {
    const todayISO = new Date().toISOString().split('T')[0];

    container.innerHTML = `
        <!-- Load Google Fonts (Sarabun & Inter) & Global Style Overlay -->
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Sarabun:wght@400;500;600;700;800&display=swap');
            
            #insulin-calc-module {
                font-family: 'Sarabun', 'Inter', sans-serif;
            }
            #insulin-calc-module input[type="number"]::-webkit-inner-spin-button,
            #insulin-calc-module input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            #insulin-calc-module input[type="number"] {
                -moz-appearance: textfield;
            }
        </style>

        <div id="insulin-calc-module" class="max-w-7xl mx-auto space-y-1.5 p-1 pt-0">
            
            <!-- Main Grid: lg:col-span-3 (25%) / lg:col-span-9 (75%) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch">
                
                <!-- ================= LEFT SECTOR: INPUT PANEL (Soft Dark Teal Gradient) ================= -->
                <div class="lg:col-span-3 bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-teal-800/50 space-y-2.5 relative flex flex-col justify-between">
                    <div>
                        <!-- Header + Reset Button -->
                        <div class="flex items-center justify-between border-b border-teal-700/50 pb-2 mb-2.5">
                            <div class="flex items-center gap-1.5 min-w-0">
                                <div class="w-7 h-7 bg-teal-400/20 text-teal-300 rounded-lg flex items-center justify-center border border-teal-400/30 shrink-0">
                                    <!-- SVG Syringe Icon -->
                                    <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>
                                </div>
                                <div class="truncate">
                                    <h2 class="text-sm font-bold text-white leading-tight truncate">Insulin Calc</h2>
                                    <p class="text-[9px] text-teal-200/70 truncate">คำนวณปริมาณยา</p>
                                </div>
                            </div>

                            <!-- Reset Button -->
                            <button type="button" id="btn-reset" class="px-2 py-0.5 bg-rose-500/20 text-rose-200 hover:bg-rose-500 hover:text-white border border-rose-400/40 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer shrink-0">
                                <svg class="w-3 h-3 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                                <span>Reset</span>
                            </button>
                        </div>

                        <!-- Input Form -->
                        <div class="space-y-2">
                            <!-- เช้า -->
                            <div class="flex items-center justify-end gap-1.5">
                                <label class="text-base font-extrabold text-teal-100 whitespace-nowrap text-right">เช้า</label>
                                <input type="number" id="ins-morning" class="w-20 text-lg font-bold px-2 py-0.5 bg-slate-900/80 text-teal-200 border-2 border-teal-600/60 rounded-lg focus:border-teal-300 focus:outline-none placeholder-teal-800 text-right shadow-inner shrink-0" placeholder="0" min="0">
                                <span class="text-[11px] font-semibold text-teal-300/80 w-6 text-left shrink-0">units</span>
                            </div>

                            <!-- เย็น -->
                            <div class="flex items-center justify-end gap-1.5">
                                <label class="text-base font-extrabold text-teal-100 whitespace-nowrap text-right">เย็น</label>
                                <input type="number" id="ins-evening" class="w-20 text-lg font-bold px-2 py-0.5 bg-slate-900/80 text-teal-200 border-2 border-teal-600/60 rounded-lg focus:border-teal-300 focus:outline-none placeholder-teal-800 text-right shadow-inner shrink-0" placeholder="0" min="0">
                                <span class="text-[11px] font-semibold text-teal-300/80 w-6 text-left shrink-0">units</span>
                            </div>

                            <!-- จำนวนนัด -->
                            <div class="flex items-center justify-end gap-1.5">
                                <label class="text-sm font-extrabold text-teal-100 whitespace-nowrap text-right">จำนวนนัด</label>
                                <input type="number" id="ins-fu-days" class="w-20 text-lg font-bold px-2 py-0.5 bg-slate-900/80 text-teal-200 border-2 border-teal-600/60 rounded-lg focus:border-teal-300 focus:outline-none placeholder-teal-800 text-right shadow-inner shrink-0" placeholder="0" min="0">
                                <span class="text-[11px] font-semibold text-teal-300/80 w-6 text-left shrink-0">วัน</span>
                            </div>

                            <!-- Checkbox OD + วันเริ่มรับยา -->
                            <div class="pt-1 border-t border-teal-800/60 flex items-center justify-between gap-1">
                                <!-- OD Checkbox -->
                                <label class="flex items-center gap-1 cursor-pointer select-none bg-teal-950/80 px-1.5 py-0.5 rounded-md border border-teal-700/80 hover:border-teal-400 transition-all">
                                    <input type="checkbox" id="chk-od" class="w-3 h-3 accent-teal-400 rounded cursor-pointer">
                                    <span class="text-[10px] font-bold text-teal-200 whitespace-nowrap">OD (วันละครั้ง)</span>
                                </label>

                                <!-- Custom Date Trigger -->
                                <div class="relative inline-block">
                                    <button type="button" id="btn-date-trigger" class="flex items-center gap-1 px-1.5 py-0.5 bg-teal-950/80 text-white text-[10px] font-bold border border-teal-700/80 rounded-md hover:border-teal-300 transition-all cursor-pointer">
                                        <span id="txt-display-date" class="font-bold text-teal-300">DD/MM/YYYY</span>
                                        <svg class="w-3 h-3 stroke-current text-teal-300 shrink-0" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                                    </button>
                                    <input type="date" id="ins-start-date" value="${todayISO}" class="opacity-0 absolute inset-0 w-full h-full cursor-pointer pointer-events-auto">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Alcohol Mode Selector -->
                    <div class="pt-1.5">
                        <label class="block text-[11px] font-bold text-teal-200/90 mb-1">ขนาดแผงสำลีแอลกอฮอล์</label>
                        <div class="grid grid-cols-3 gap-0.5">
                            <button type="button" id="btn-alc-all" class="py-0.5 px-0.5 rounded-md border font-bold text-[10px] bg-emerald-500 text-white border-emerald-400 shadow-sm transition-all text-center">ทั้งหมด</button>
                            <button type="button" id="btn-alc-8" class="py-0.5 px-0.5 rounded-md border font-bold text-[10px] bg-teal-950 text-teal-200 border-teal-800 hover:bg-teal-900 transition-all text-center">8 ก้อน</button>
                            <button type="button" id="btn-alc-10" class="py-0.5 px-0.5 rounded-md border font-bold text-[10px] bg-teal-950 text-teal-200 border-teal-800 hover:bg-teal-900 transition-all text-center">10 ก้อน</button>
                        </div>
                    </div>

                </div>


                <!-- ================= RIGHT SECTOR: OUTPUT PANEL ================= -->
                <div class="lg:col-span-9 flex flex-col justify-between space-y-2">
                    
                    <!-- Top Warning Alert -->
                    <div id="vial-lowdose-warning" class="hidden p-1.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm shrink-0">
                        <svg class="w-4 h-4 stroke-current text-amber-600 shrink-0" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                        <span>ยา 1 vial อาจเสื่อมสภาพก่อนใช้ยาหมด (40 วัน)</span>
                    </div>

                    <!-- 2 Columns Output Grid: Penfill vs Vial -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 h-full items-stretch">
                        
                        <!-- COLUMN 1: PENFILL (Soft Sky Blue Theme) -->
                        <div class="bg-gradient-to-b from-sky-50 to-emerald-50/40 border border-sky-200/80 p-3 rounded-2xl shadow-sm flex flex-col justify-between space-y-2 h-full">
                            <!-- Title -->
                            <div class="border-b border-sky-200/80 pb-1.5 shrink-0">
                                <h3 class="text-sm font-extrabold text-sky-900 flex items-center gap-1.5">
                                    <svg class="w-4 h-4 stroke-current text-sky-600" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                    <span>Penfill (300 U)</span>
                                </h3>
                            </div>

                            <!-- Item List -->
                            <div class="flex-1 flex flex-col justify-around gap-2">
                                <!-- Penfill Drug -->
                                <div class="bg-white/90 p-2.5 px-4 rounded-xl border border-sky-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}cartridge.jpg" alt="Cartridge" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-sky-950 text-xl whitespace-nowrap">Penfill</span>
                                    </div>
                                    <div class="text-right shrink-0">
                                        <div class="flex items-baseline justify-end gap-1">
                                            <span id="res-cartridge-net" class="text-4xl font-black text-sky-700 leading-none">0</span>
                                            <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">หลอด</span>
                                        </div>
                                        <div class="text-[10px] font-semibold text-slate-400">คำนวณ: <span id="res-cartridge-calc">0.00</span></div>
                                    </div>
                                </div>

                                <!-- Needle Pen -->
                                <div class="bg-white/90 p-2.5 px-4 rounded-xl border border-sky-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}needle-pen.jpg" alt="Needle Pen" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-sky-950 text-xl whitespace-nowrap">Needle Pen</span>
                                    </div>
                                    <div class="flex items-baseline gap-1 shrink-0">
                                        <span id="res-pen-needle" class="text-4xl font-black text-sky-700 leading-none">0</span>
                                        <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">ชิ้น</span>
                                    </div>
                                </div>

                                <!-- Alcohol 8 (หน่วย: แผง) -->
                                <div id="box-penfill-alc8" class="bg-white/90 p-2.5 px-4 rounded-xl border border-sky-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-8.jpg" alt="Alcohol 8" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-sky-950 text-xl whitespace-nowrap">สำลี 8 ก้อน</span>
                                    </div>
                                    <div class="flex items-baseline gap-1 shrink-0">
                                        <span id="res-penfill-alc8" class="text-4xl font-black text-sky-700 leading-none">0</span>
                                        <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">แผง</span>
                                    </div>
                                </div>

                                <!-- Alcohol 10 (หน่วย: แผง) -->
                                <div id="box-penfill-alc10" class="bg-white/90 p-2.5 px-4 rounded-xl border border-sky-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-10.jpg" alt="Alcohol 10" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-sky-950 text-xl whitespace-nowrap">สำลี 10 ก้อน</span>
                                    </div>
                                    <div class="flex items-baseline gap-1 shrink-0">
                                        <span id="res-penfill-alc10" class="text-4xl font-black text-sky-700 leading-none">0</span>
                                        <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">แผง</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- COLUMN 2: VIAL (Soft Warm Sand / Amber Theme) -->
                        <div class="bg-gradient-to-b from-amber-50/70 to-emerald-50/30 border border-amber-200/70 p-3 rounded-2xl shadow-sm flex flex-col justify-between space-y-2 h-full">
                            <!-- Title -->
                            <div class="border-b border-amber-200/80 pb-1.5 shrink-0">
                                <h3 class="text-sm font-extrabold text-amber-900 flex items-center gap-1.5">
                                    <svg class="w-4 h-4 stroke-current text-amber-600" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2"/><path d="M8.5 2h7"/><path d="M14 6.5v4a6.5 6.5 0 0 1 2 4.5 3 3 0 0 1-3 3H11a3 3 0 0 1-3-3 6.5 6.5 0 0 1 2-4.5v-4"/></svg>
                                    <span>Vial (1000 U)</span>
                                </h3>
                            </div>

                            <!-- Item List -->
                            <div class="flex-1 flex flex-col justify-around gap-2">
                                <!-- Vial Drug -->
                                <div class="bg-white/90 p-2.5 px-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}vial.jpg" alt="Vial" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-amber-950 text-xl whitespace-nowrap">ยา Vial</span>
                                    </div>
                                    <div class="text-right shrink-0">
                                        <div class="flex items-baseline justify-end gap-1">
                                            <span id="res-vial-net" class="text-4xl font-black text-amber-700 leading-none">0</span>
                                            <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">ขวด</span>
                                        </div>
                                        <div class="text-[10px] font-semibold text-slate-400">คำนวณ: <span id="res-vial-calc">0.00</span></div>
                                    </div>
                                </div>

                                <!-- Syringe -->
                                <div class="bg-white/90 p-2.5 px-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}syringe.jpg" alt="Syringe" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-amber-950 text-xl whitespace-nowrap">Syringe</span>
                                    </div>
                                    <div class="flex items-baseline gap-1 shrink-0">
                                        <span id="res-syringe" class="text-4xl font-black text-amber-700 leading-none">0</span>
                                        <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">ชิ้น</span>
                                    </div>
                                </div>

                                <!-- Alcohol 8 (หน่วย: แผง) -->
                                <div id="box-vial-alc8" class="bg-white/90 p-2.5 px-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-8.jpg" alt="Alcohol 8" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-amber-950 text-xl whitespace-nowrap">สำลี 8 ก้อน</span>
                                    </div>
                                    <div class="flex items-baseline gap-1 shrink-0">
                                        <span id="res-vial-alc8" class="text-4xl font-black text-amber-700 leading-none">0</span>
                                        <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">แผง</span>
                                    </div>
                                </div>

                                <!-- Alcohol 10 (หน่วย: แผง) -->
                                <div id="box-vial-alc10" class="bg-white/90 p-2.5 px-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between min-h-[72px]">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-10.jpg" alt="Alcohol 10" class="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0">
                                        <span class="font-extrabold text-amber-950 text-xl whitespace-nowrap">สำลี 10 ก้อน</span>
                                    </div>
                                    <div class="flex items-baseline gap-1 shrink-0">
                                        <span id="res-vial-alc10" class="text-4xl font-black text-amber-700 leading-none">0</span>
                                        <span class="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">แผง</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <!-- ================= BOTTOM SECTOR: NEXT APPOINTMENT ================= -->
            <div class="bg-white/90 p-1.5 px-3 rounded-xl border border-teal-100 shadow-sm space-y-1 text-center">
                <div class="flex flex-wrap items-center justify-center gap-1.5">
                    <div class="flex items-center gap-1 text-slate-700 font-extrabold text-sm">
                        <svg class="w-4 h-4 stroke-current text-teal-600 shrink-0" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                        <span>วันนัดถัดไป:</span>
                    </div>

                    <div class="text-base sm:text-lg font-extrabold text-teal-900 tracking-tight" id="res-fu-line">
                        -
                    </div>
                </div>

                <!-- Weekend Warning Alert Box -->
                <div id="weekend-warning" class="hidden p-1 bg-rose-50 border border-rose-300 text-rose-800 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-xs">
                    <svg class="w-3.5 h-3.5 stroke-current text-rose-600 shrink-0" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    <span id="warning-text">ตรงกับวันหยุด กรุณาเลื่อนวันนัด!</span>
                </div>
            </div>

        </div>
    `;

    // Elements Binding
    const morningInput = container.querySelector('#ins-morning');
    const eveningInput = container.querySelector('#ins-evening');
    const fuDaysInput = container.querySelector('#ins-fu-days');
    const startDateInput = container.querySelector('#ins-start-date');
    const txtDisplayDate = container.querySelector('#txt-display-date');
    const chkOd = container.querySelector('#chk-od');

    const btnReset = container.querySelector('#btn-reset');

    const btnAlcAll = container.querySelector('#btn-alc-all');
    const btnAlc8 = container.querySelector('#btn-alc-8');
    const btnAlc10 = container.querySelector('#btn-alc-10');

    // Sync Custom Date Display
    const updateDisplayDate = (val) => {
        if (!val) return;
        const [yyyy, mm, dd] = val.split('-');
        txtDisplayDate.innerText = `${dd}/${mm}/${yyyy}`;
    };
    updateDisplayDate(startDateInput.value);

    // 1. Enter-Key Navigation
    morningInput.addEventListener('keydown', (e) => handleEnterKey(e, eveningInput));
    eveningInput.addEventListener('keydown', (e) => handleEnterKey(e, fuDaysInput));
    fuDaysInput.addEventListener('keydown', (e) => handleEnterKey(e, startDateInput));

    // 2. Event Listeners
    [morningInput, eveningInput, fuDaysInput, chkOd].forEach(elem => {
        elem.addEventListener('input', () => calculateInsulin(container));
        elem.addEventListener('change', () => calculateInsulin(container));
    });

    startDateInput.addEventListener('change', (e) => {
        updateDisplayDate(e.target.value);
        calculateInsulin(container);
    });

    // Reset Event
    btnReset.addEventListener('click', () => resetInsulinForm(container));

    // Alcohol Mode Switcher
    btnAlcAll.addEventListener('click', () => setAlcMode('all', container));
    btnAlc8.addEventListener('click', () => setAlcMode('8', container));
    btnAlc10.addEventListener('click', () => setAlcMode('10', container));

    // Auto Focus
    morningInput.focus();
    calculateInsulin(container);
}

function handleEnterKey(event, nextElement) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (nextElement) {
            nextElement.focus();
            if (nextElement.type === 'number' || nextElement.type === 'text') {
                nextElement.select();
            }
        }
    }
}

function setAlcMode(mode, container) {
    alcMode = mode;

    const btnAll = container.querySelector('#btn-alc-all');
    const btn8 = container.querySelector('#btn-alc-8');
    const btn10 = container.querySelector('#btn-alc-10');

    const defaultClass = "py-0.5 px-0.5 rounded-md border font-bold text-[10px] bg-teal-950 text-teal-200 border-teal-800 hover:bg-teal-900 transition-all text-center";
    const activeClass = "py-0.5 px-0.5 rounded-md border font-bold text-[10px] bg-emerald-500 text-white border-emerald-400 shadow-sm transition-all text-center";

    btnAll.className = mode === 'all' ? activeClass : defaultClass;
    btn8.className = mode === '8' ? activeClass : defaultClass;
    btn10.className = mode === '10' ? activeClass : defaultClass;

    updateAlcVisibility(container);
}

function updateAlcVisibility(container) {
    const penfillAlc8 = container.querySelector('#box-penfill-alc8');
    const penfillAlc10 = container.querySelector('#box-penfill-alc10');
    const vialAlc8 = container.querySelector('#box-vial-alc8');
    const vialAlc10 = container.querySelector('#box-vial-alc10');

    if (alcMode === 'all') {
        penfillAlc8.classList.remove('hidden');
        penfillAlc10.classList.remove('hidden');
        vialAlc8.classList.remove('hidden');
        vialAlc10.classList.remove('hidden');
    } else if (alcMode === '8') {
        penfillAlc8.classList.remove('hidden');
        penfillAlc10.classList.add('hidden');
        vialAlc8.classList.remove('hidden');
        vialAlc10.classList.add('hidden');
    } else if (alcMode === '10') {
        penfillAlc8.classList.add('hidden');
        penfillAlc10.classList.remove('hidden');
        vialAlc8.classList.add('hidden');
        vialAlc10.classList.remove('hidden');
    }
}

function resetInsulinForm(container) {
    container.querySelector('#ins-morning').value = '';
    container.querySelector('#ins-evening').value = '';
    container.querySelector('#ins-fu-days').value = '';
    container.querySelector('#chk-od').checked = false;
    
    const todayISO = new Date().toISOString().split('T')[0];
    const startDateInput = container.querySelector('#ins-start-date');
    startDateInput.value = todayISO;
    
    const [yyyy, mm, dd] = todayISO.split('-');
    container.querySelector('#txt-display-date').innerText = `${dd}/${mm}/${yyyy}`;

    setAlcMode('all', container);
    calculateInsulin(container);
    container.querySelector('#ins-morning').focus();
}

function calculateInsulin(container) {
    const morningDose = parseFloat(container.querySelector('#ins-morning').value) || 0;
    const eveningDose = parseFloat(container.querySelector('#ins-evening').value) || 0;
    const fuDays = parseInt(container.querySelector('#ins-fu-days').value) || 0;
    const startDateVal = container.querySelector('#ins-start-date').value;
    const isOD = container.querySelector('#chk-od').checked;

    const dailyDose = morningDose + eveningDose;
    const totalUnitsA = dailyDose * fuDays;

    // 1. คำนวณวันนัด
    let fuLineStr = '-';
    const warningBox = container.querySelector('#weekend-warning');
    const warningText = container.querySelector('#warning-text');

    if (startDateVal && fuDays > 0) {
        const startDate = new Date(startDateVal);
        const fuDate = new Date(startDate);
        fuDate.setDate(startDate.getDate() + fuDays);

        const dayIndex = fuDate.getDay();
        const dayNamesThai = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];

        const day = fuDate.getDate();
        const monthText = thaiMonths[fuDate.getMonth()];
        const monthNum = String(fuDate.getMonth() + 1).padStart(2, '0');
        
        const yearBE = fuDate.getFullYear() + 543;
        const yearCEShort = String(fuDate.getFullYear()).slice(-2);
        const dayPadded = String(day).padStart(2, '0');

        fuLineStr = `(${dayNamesThai[dayIndex]}) ${day} ${monthText} ${yearBE} (${dayPadded}/${monthNum}/${yearCEShort})`;

        if (dayIndex === 0 || dayIndex === 6) {
            warningBox.classList.remove('hidden');
            warningText.innerText = `ตรงกับวันหยุด (${dayNamesThai[dayIndex]}) กรุณาเลื่อนวันนัด!`;
        } else {
            warningBox.classList.add('hidden');
        }
    } else {
        warningBox.classList.add('hidden');
    }

    // 2. คำนวณ Penfill
    const cartridgeCalc = fuDays > 0 ? totalUnitsA / 300 : 0;
    const cartridgeNet = Math.ceil(cartridgeCalc);

    // 3. เงื่อนไขพิเศษ Vial
    const vialWarningBox = container.querySelector('#vial-lowdose-warning');
    let vialCalc = 0;
    let vialNet = 0;

    if (dailyDose > 0 && dailyDose <= 25) {
        vialWarningBox.classList.remove('hidden');
        vialCalc = fuDays > 0 ? fuDays / 40 : 0;
        vialNet = Math.ceil(vialCalc);
    } else {
        vialWarningBox.classList.add('hidden');
        vialCalc = fuDays > 0 ? totalUnitsA / 1000 : 0;
        vialNet = Math.ceil(vialCalc);
    }

    // 4. เข็ม & Syringe
    const penNeedleCount = fuDays > 0 ? Math.ceil(fuDays / 2) : 0;
    const syringeCount = fuDays > 0 ? fuDays : 0;

    // 5. สำลีแอลกอฮอล์
    let alc8Raw = fuDays > 0 ? fuDays / 4 : 0;
    let alc10Raw = fuDays > 0 ? fuDays / 5 : 0;

    if (isOD) {
        alc8Raw = alc8Raw / 2;
        alc10Raw = alc10Raw / 2;
    }

    const alc8Bags = Math.ceil(alc8Raw);
    const alc10Bags = Math.ceil(alc10Raw);

    // Render Output Values
    container.querySelector('#res-fu-line').innerText = fuLineStr;

    container.querySelector('#res-cartridge-calc').innerText = cartridgeCalc.toFixed(2);
    container.querySelector('#res-cartridge-net').innerText = cartridgeNet;
    container.querySelector('#res-pen-needle').innerText = penNeedleCount;

    container.querySelector('#res-vial-calc').innerText = vialCalc.toFixed(2);
    container.querySelector('#res-vial-net').innerText = vialNet;
    container.querySelector('#res-syringe').innerText = syringeCount;

    container.querySelector('#res-penfill-alc8').innerText = alc8Bags;
    container.querySelector('#res-penfill-alc10').innerText = alc10Bags;
    container.querySelector('#res-vial-alc8').innerText = alc8Bags;
    container.querySelector('#res-vial-alc10').innerText = alc10Bags;

    updateAlcVisibility(container);
}
