/**
 * Insulin Calculator Module (Fixed Font Weight & Clean Typography)
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
        <!-- Style ซ่อน Spinner Number Input -->
        <style>
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            input[type="number"] {
                -moz-appearance: textfield;
            }
        </style>

        <div class="max-w-7xl mx-auto space-y-4">
            
            <!-- Main Grid: Left ~35% (lg:col-span-4), Right ~65% (lg:col-span-8) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                
                <!-- ================= LEFT SECTOR: INPUT PANEL ================= -->
                <div style="background-color: #080F3A;" class="lg:col-span-4 text-white p-4 sm:p-5 rounded-3xl shadow-xl border border-slate-800 space-y-4 relative">
                    
                    <!-- Header + Reset Button -->
                    <div class="flex items-center justify-between border-b border-slate-700/80 pb-2.5">
                        <div class="flex items-center gap-2">
                            <div class="w-9 h-9 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center text-lg border border-teal-500/30 shrink-0">
                                <i class="fa-solid fa-syringe"></i>
                            </div>
                            <div>
                                <h2 class="text-lg font-bold text-white leading-tight">Insulin Calc</h2>
                                <p class="text-[10px] text-slate-400 font-normal">คำนวณปริมาณยาและอุปกรณ์</p>
                            </div>
                        </div>

                        <!-- Reset Button -->
                        <button type="button" id="btn-reset" class="px-3 py-1 bg-rose-500/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/40 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-rotate-left"></i>
                            <span>Reset</span>
                        </button>
                    </div>

                    <!-- Input Form -->
                    <div class="space-y-3.5">
                        <!-- เช้า -->
                        <div class="flex items-center justify-end gap-3">
                            <label class="text-2xl sm:text-3xl font-bold text-slate-100 text-right">เช้า</label>
                            <div class="flex items-center gap-2">
                                <input type="number" id="ins-morning" class="w-36 text-2xl font-semibold px-3 py-1.5 bg-slate-900/90 text-white border-2 border-slate-700 rounded-xl focus:border-teal-400 focus:outline-none placeholder-slate-600 text-right shadow-inner" placeholder="0" min="0">
                                <span class="text-xs font-semibold text-slate-400 w-10 text-center shrink-0">units</span>
                            </div>
                        </div>

                        <!-- เย็น -->
                        <div class="flex items-center justify-end gap-3">
                            <label class="text-2xl sm:text-3xl font-bold text-slate-100 text-right">เย็น</label>
                            <div class="flex items-center gap-2">
                                <input type="number" id="ins-evening" class="w-36 text-2xl font-semibold px-3 py-1.5 bg-slate-900/90 text-white border-2 border-slate-700 rounded-xl focus:border-teal-400 focus:outline-none placeholder-slate-600 text-right shadow-inner" placeholder="0" min="0">
                                <span class="text-xs font-semibold text-slate-400 w-10 text-center shrink-0">units</span>
                            </div>
                        </div>

                        <!-- จำนวนนัด -->
                        <div class="flex items-center justify-end gap-3">
                            <label class="text-2xl sm:text-3xl font-bold text-slate-100 text-right">จำนวนนัด</label>
                            <div class="flex items-center gap-2">
                                <input type="number" id="ins-fu-days" class="w-36 text-2xl font-semibold px-3 py-1.5 bg-slate-900/90 text-white border-2 border-slate-700 rounded-xl focus:border-teal-400 focus:outline-none placeholder-slate-600 text-right shadow-inner" placeholder="0" min="0">
                                <span class="text-xs font-semibold text-slate-400 w-10 text-center shrink-0">วัน</span>
                            </div>
                        </div>

                        <!-- Checkbox OD + วันเริ่มรับยา -->
                        <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                            <!-- OD Checkbox -->
                            <label class="flex items-center gap-2 cursor-pointer select-none bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-teal-500 transition-all">
                                <input type="checkbox" id="chk-od" class="w-4 h-4 accent-teal-500 rounded cursor-pointer">
                                <span class="text-xs font-bold text-teal-300">OD (วันละครั้ง)</span>
                            </label>

                            <!-- Custom Date Trigger -->
                            <div class="relative inline-block">
                                <button type="button" id="btn-date-trigger" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-semibold border border-slate-700 rounded-xl hover:border-teal-400 transition-all cursor-pointer">
                                    <span id="txt-display-date" class="font-bold text-teal-300">DD/MM/YYYY</span>
                                    <i class="fa-solid fa-calendar-days text-teal-400 text-base"></i>
                                </button>
                                <input type="date" id="ins-start-date" value="${todayISO}" class="opacity-0 absolute inset-0 w-full h-full cursor-pointer pointer-events-auto">
                            </div>
                        </div>

                        <!-- Alcohol Mode Selector -->
                        <div class="pt-0.5">
                            <label class="block text-xs font-semibold text-slate-300 mb-1">ขนาดถุงสำลีแอลกอฮอล์</label>
                            <div class="grid grid-cols-3 gap-1.5">
                                <button type="button" id="btn-alc-all" class="py-1.5 px-1 rounded-xl border-2 font-semibold text-xs bg-teal-500 text-white border-teal-500 shadow-sm transition-all">ทั้งหมด</button>
                                <button type="button" id="btn-alc-8" class="py-1.5 px-1 rounded-xl border-2 font-semibold text-xs bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 transition-all">8 ก้อน</button>
                                <button type="button" id="btn-alc-10" class="py-1.5 px-1 rounded-xl border-2 font-semibold text-xs bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 transition-all">10 ก้อน</button>
                            </div>
                        </div>
                    </div>

                </div>


                <!-- ================= RIGHT SECTOR: OUTPUT PANEL ================= -->
                <div class="lg:col-span-8 space-y-3">
                    
                    <!-- Top Warning Alert -->
                    <div id="vial-lowdose-warning" class="hidden p-2.5 bg-amber-50 border-2 border-amber-400 text-amber-900 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
                        <i class="fa-solid fa-triangle-exclamation text-amber-600 text-lg shrink-0"></i>
                        <span>ยา 1 vial อาจเสื่อมสภาพก่อนใช้ยาหมด(40วัน)</span>
                    </div>

                    <!-- 2 Columns Output Grid: Penfill vs Vial -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        
                        <!-- COLUMN 1: PENFILL (ฟ้าอ่อน) -->
                        <div class="bg-sky-50 border-2 border-sky-200 p-3.5 rounded-3xl shadow-sm space-y-2">
                            <!-- Title -->
                            <div class="border-b border-sky-200/80 pb-1.5">
                                <h3 class="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                                    <i class="fa-solid fa-pen-ruler text-sky-600"></i>
                                    <span>Penfill (300 U)</span>
                                </h3>
                            </div>

                            <!-- Item List -->
                            <div class="space-y-1.5">
                                <!-- Penfill Drug -->
                                <div class="bg-white p-2 px-3 rounded-2xl border border-sky-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}cartridge.jpg" alt="Cartridge" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-sky-950 text-2xl sm:text-3xl tracking-tight">Penfill</span>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-4xl sm:text-5xl font-bold text-sky-700"><span id="res-cartridge-net">0</span> <span class="text-xs font-semibold text-slate-500">หลอด</span></div>
                                        <div class="text-[11px] font-semibold text-slate-400 -mt-1">คำนวณ: <span id="res-cartridge-calc">0.00</span></div>
                                    </div>
                                </div>

                                <!-- Needle Pen -->
                                <div class="bg-white p-2 px-3 rounded-2xl border border-sky-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}needle-pen.jpg" alt="Needle Pen" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-sky-950 text-2xl sm:text-3xl tracking-tight">Needle Pen</span>
                                    </div>
                                    <div class="text-4xl sm:text-5xl font-bold text-sky-700"><span id="res-pen-needle">0</span> <span class="text-xs font-semibold text-slate-500">ชิ้น</span></div>
                                </div>

                                <!-- Alcohol 8 -->
                                <div id="box-penfill-alc8" class="bg-white p-2 px-3 rounded-2xl border border-sky-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-8.jpg" alt="Alcohol 8" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-sky-950 text-2xl sm:text-3xl tracking-tight">สำลี 8 ก้อน</span>
                                    </div>
                                    <div class="text-4xl sm:text-5xl font-bold text-sky-700"><span id="res-penfill-alc8">0</span> <span class="text-xs font-semibold text-slate-500">ถุง</span></div>
                                </div>

                                <!-- Alcohol 10 -->
                                <div id="box-penfill-alc10" class="bg-white p-2 px-3 rounded-2xl border border-sky-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-10.jpg" alt="Alcohol 10" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-sky-950 text-2xl sm:text-3xl tracking-tight">สำลี 10 ก้อน</span>
                                    </div>
                                    <div class="text-4xl sm:text-5xl font-bold text-sky-700"><span id="res-penfill-alc10">0</span> <span class="text-xs font-semibold text-slate-500">ถุง</span></div>
                                </div>
                            </div>
                        </div>

                        <!-- COLUMN 2: VIAL (ส้มอ่อน) -->
                        <div class="bg-orange-50 border-2 border-orange-200 p-3.5 rounded-3xl shadow-sm space-y-2">
                            <!-- Title -->
                            <div class="border-b border-orange-200/80 pb-1.5">
                                <h3 class="text-xs font-bold text-orange-800 flex items-center gap-1.5">
                                    <i class="fa-solid fa-vial text-orange-600"></i>
                                    <span>Vial (1000 U)</span>
                                </h3>
                            </div>

                            <!-- Item List -->
                            <div class="space-y-1.5">
                                <!-- Vial Drug -->
                                <div class="bg-white p-2 px-3 rounded-2xl border border-orange-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}vial.jpg" alt="Vial" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-orange-950 text-2xl sm:text-3xl tracking-tight">ยา Vial</span>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-4xl sm:text-5xl font-bold text-orange-700"><span id="res-vial-net">0</span> <span class="text-xs font-semibold text-slate-500">ขวด</span></div>
                                        <div class="text-[11px] font-semibold text-slate-400 -mt-1">คำนวณ: <span id="res-vial-calc">0.00</span></div>
                                    </div>
                                </div>

                                <!-- Syringe -->
                                <div class="bg-white p-2 px-3 rounded-2xl border border-orange-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}syringe.jpg" alt="Syringe" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-orange-950 text-2xl sm:text-3xl tracking-tight">Syringe</span>
                                    </div>
                                    <div class="text-4xl sm:text-5xl font-bold text-orange-700"><span id="res-syringe">0</span> <span class="text-xs font-semibold text-slate-500">ชิ้น</span></div>
                                </div>

                                <!-- Alcohol 8 -->
                                <div id="box-vial-alc8" class="bg-white p-2 px-3 rounded-2xl border border-orange-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-8.jpg" alt="Alcohol 8" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-orange-950 text-2xl sm:text-3xl tracking-tight">สำลี 8 ก้อน</span>
                                    </div>
                                    <div class="text-4xl sm:text-5xl font-bold text-orange-700"><span id="res-vial-alc8">0</span> <span class="text-xs font-semibold text-slate-500">ถุง</span></div>
                                </div>

                                <!-- Alcohol 10 -->
                                <div id="box-vial-alc10" class="bg-white p-2 px-3 rounded-2xl border border-orange-200 shadow-xs flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="${IMG_BASE_URL}alc-10.jpg" alt="Alcohol 10" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 shadow-xs shrink-0">
                                        <span class="font-bold text-orange-950 text-2xl sm:text-3xl tracking-tight">สำลี 10 ก้อน</span>
                                    </div>
                                    <div class="text-4xl sm:text-5xl font-bold text-orange-700"><span id="res-vial-alc10">0</span> <span class="text-xs font-semibold text-slate-500">ถุง</span></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <!-- ================= BOTTOM SECTOR: NEXT APPOINTMENT ================= -->
            <div class="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3 text-center">
                <div class="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <div class="flex items-center gap-2 text-slate-800 font-bold text-lg">
                        <i class="fa-solid fa-calendar-check text-teal-600 text-2xl"></i>
                        <span>วันนัดถัดไป:</span>
                    </div>

                    <div class="text-xl sm:text-3xl font-bold text-teal-800 tracking-tight" id="res-fu-line">
                        -
                    </div>
                </div>

                <!-- Weekend Warning Alert Box -->
                <div id="weekend-warning" class="hidden p-3 bg-rose-50 border-2 border-rose-300 text-rose-800 rounded-2xl font-bold text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-xs">
                    <i class="fa-solid fa-triangle-exclamation text-rose-600 text-2xl sm:text-3xl shrink-0"></i>
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

    const defaultClass = "py-1.5 px-1 rounded-xl border-2 font-semibold text-xs bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 transition-all";
    const activeClass = "py-1.5 px-1 rounded-xl border-2 font-semibold text-xs bg-teal-500 text-white border-teal-500 shadow-sm transition-all";

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

    // 3. เงื่อนไขพิเศษ Vial (เช้า+เย็น รวมกัน <= 25 units)
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
