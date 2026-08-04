/**
 * Insulin Calculator Module (Elderly-Friendly UI with Product Images)
 */

let alcMode = 'all';

const thaiMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

// Base URL สำหรับดึงรูปภาพจาก Repo rx-calculator
const IMG_BASE_URL = 'https://raw.githubusercontent.com/thanarakok-coder/rx-calculator/main/';

export function render(container) {
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-6">
            <!-- Title Header -->
            <div class="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-4">
                <div class="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-md">
                    <i class="fa-solid fa-syringe"></i>
                </div>
                <div>
                    <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Insulin Calculator</h2>
                    <p class="text-base text-slate-500 font-medium mt-1">คำนวณปริมาณยาฉีดอินซูลิน อุปกรณ์เสริม และวันนัดถัดไป</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Input Panel -->
                <div class="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-6">
                    <h3 class="text-xl font-black text-slate-800 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <i class="fa-solid fa-pen-to-square text-teal-600"></i>
                        <span>กรอกข้อมูล</span>
                    </h3>

                    <!-- Morning Dose -->
                    <div>
                        <label class="block text-lg font-bold text-slate-800 mb-1">มื้อเช้า (Units)</label>
                        <input type="number" id="ins-morning" class="w-full text-2xl font-black px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none bg-slate-50 text-slate-900" placeholder="0" min="0">
                    </div>

                    <!-- Evening Dose -->
                    <div>
                        <label class="block text-lg font-bold text-slate-800 mb-1">มื้อเย็น / ก่อนนอน (Units)</label>
                        <input type="number" id="ins-evening" class="w-full text-2xl font-black px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none bg-slate-50 text-slate-900" placeholder="0" min="0">
                    </div>

                    <!-- Follow-up Days -->
                    <div>
                        <label class="block text-lg font-bold text-slate-800 mb-1">จำนวนวันนัด (วัน)</label>
                        <input type="number" id="ins-fu-days" class="w-full text-2xl font-black px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none bg-slate-50 text-slate-900" placeholder="เช่น 30, 60, 90" min="0">
                    </div>

                    <!-- Start Date -->
                    <div>
                        <label class="block text-lg font-bold text-slate-800 mb-1">วันเริ่มรับยา</label>
                        <input type="date" id="ins-start-date" value="${today}" class="w-full text-xl font-bold px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none bg-slate-50 text-slate-900">
                    </div>

                    <!-- Alcohol Mode Selector -->
                    <div class="pt-2">
                        <label class="block text-base font-bold text-slate-800 mb-2">เลือกขนาดถุงสำลีแอลกอฮอล์</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button type="button" id="btn-alc-all" class="py-2.5 px-2 rounded-xl border-2 font-bold text-sm bg-teal-600 text-white border-teal-600 shadow-sm transition-all">ทั้งหมด</button>
                            <button type="button" id="btn-alc-8" class="py-2.5 px-2 rounded-xl border-2 font-bold text-sm bg-white text-slate-700 border-slate-300 hover:bg-slate-50 transition-all">8 ก้อน</button>
                            <button type="button" id="btn-alc-10" class="py-2.5 px-2 rounded-xl border-2 font-bold text-sm bg-white text-slate-700 border-slate-300 hover:bg-slate-50 transition-all">10 ก้อน</button>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="pt-4 flex gap-3 border-t border-slate-100">
                        <button type="button" id="btn-reset" class="w-1/3 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-100 text-lg transition-colors">ล้างค่า</button>
                        <button type="button" id="btn-calc-action" class="w-2/3 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 shadow-md text-lg transition-colors">คำนวณ</button>
                    </div>
                </div>

                <!-- Output Display Panel -->
                <div class="lg:col-span-7 space-y-6">
                    <!-- Date & Weekend Warning Box -->
                    <div class="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
                        <h3 class="text-xl font-black text-slate-800 flex items-center gap-2">
                            <i class="fa-solid fa-calendar-days text-teal-600"></i>
                            <span>วันนัดถัดไป</span>
                        </h3>
                        <div class="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                            <div class="text-2xl sm:text-3xl font-black text-teal-700" id="res-fu-date">-</div>
                            <div class="text-lg font-bold text-slate-600 mt-1" id="res-fu-day">-</div>
                        </div>

                        <!-- Warning Alert Box -->
                        <div id="weekend-warning" class="hidden p-4 bg-amber-50 border-2 border-amber-400 text-amber-900 rounded-xl font-bold text-lg flex items-center gap-3">
                            <i class="fa-solid fa-triangle-exclamation text-3xl text-amber-600 shrink-0"></i>
                            <span id="warning-text">ตรงกับวันหยุด กรุณาเลื่อนวันนัด!</span>
                        </div>
                    </div>

                    <!-- Penfill & Accessories -->
                    <div class="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-4">
                        <div class="flex items-center justify-between border-b pb-3 border-slate-100">
                            <h3 class="text-xl font-black text-teal-800 flex items-center gap-2">
                                <i class="fa-solid fa-pen-ruler text-teal-600"></i>
                                <span>Penfill (300 U/หลอด)</span>
                            </h3>
                            <img src="${IMG_BASE_URL}cartridge.jpg" alt="Cartridge" class="h-12 w-12 object-cover rounded-lg border border-slate-200 shadow-sm">
                        </div>

                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div class="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                                <div class="text-xs font-bold text-slate-500 uppercase">คำนวณได้ (หลอด)</div>
                                <div class="text-2xl font-black text-slate-800 mt-1" id="res-cartridge-calc">0.00</div>
                            </div>
                            <div class="bg-teal-600 text-white p-4 rounded-xl shadow-md">
                                <div class="text-xs font-bold text-teal-100 uppercase">จ่ายจริง (หลอด)</div>
                                <div class="text-4xl font-black mt-1" id="res-cartridge-net">0</div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <!-- Pen Needle -->
                            <div class="p-3 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <img src="${IMG_BASE_URL}needle-pen.jpg" alt="Pen Needle" class="w-12 h-12 object-cover rounded-lg border border-slate-200">
                                    <span class="font-bold text-slate-800 text-base">เข็ม Pen Needle</span>
                                </div>
                                <span class="text-3xl font-black text-teal-700" id="res-pen-needle">0</span>
                            </div>

                            <!-- Alcohol 8 -->
                            <div id="box-penfill-alc8" class="p-3 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <img src="${IMG_BASE_URL}alc-8.jpg" alt="Alcohol 8" class="w-12 h-12 object-cover rounded-lg border border-slate-200">
                                    <span class="font-bold text-slate-800 text-base">สำลี 8 ก้อน</span>
                                </div>
                                <span class="text-3xl font-black text-teal-700" id="res-penfill-alc8">0</span>
                            </div>

                            <!-- Alcohol 10 -->
                            <div id="box-penfill-alc10" class="p-3 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-between sm:col-span-2">
                                <div class="flex items-center gap-3">
                                    <img src="${IMG_BASE_URL}alc-10.jpg" alt="Alcohol 10" class="w-12 h-12 object-cover rounded-lg border border-slate-200">
                                    <span class="font-bold text-slate-800 text-base">สำลี 10 ก้อน</span>
                                </div>
                                <span class="text-3xl font-black text-teal-700" id="res-penfill-alc10">0</span>
                            </div>
                        </div>
                    </div>

                    <!-- Vial & Accessories -->
                    <div class="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-4">
                        <div class="flex items-center justify-between border-b pb-3 border-slate-100">
                            <h3 class="text-xl font-black text-blue-800 flex items-center gap-2">
                                <i class="fa-solid fa-vial text-blue-600"></i>
                                <span>Vial (1000 U/ขวด)</span>
                            </h3>
                            <img src="${IMG_BASE_URL}vial.jpg" alt="Vial" class="h-12 w-12 object-cover rounded-lg border border-slate-200 shadow-sm">
                        </div>

                        <div id="vial-lowdose-warning" class="hidden p-3 bg-blue-50 border-2 border-blue-200 text-blue-900 rounded-xl text-base font-bold">
                            <i class="fa-solid fa-info-circle text-blue-600 mr-1"></i> ยาต่อวัน $\le 25$ units: คิดอายุขวดยา maximum 40 วัน/ขวด
                        </div>

                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div class="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                                <div class="text-xs font-bold text-slate-500 uppercase">คำนวณได้ (ขวด)</div>
                                <div class="text-2xl font-black text-slate-800 mt-1" id="res-vial-calc">0.00</div>
                            </div>
                            <div class="bg-blue-600 text-white p-4 rounded-xl shadow-md">
                                <div class="text-xs font-bold text-blue-100 uppercase">จ่ายจริง (ขวด)</div>
                                <div class="text-4xl font-black mt-1" id="res-vial-net">0</div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <!-- Syringe -->
                            <div class="p-3 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <img src="${IMG_BASE_URL}syringe.jpg" alt="Syringe" class="w-12 h-12 object-cover rounded-lg border border-slate-200">
                                    <span class="font-bold text-slate-800 text-base">Syringe</span>
                                </div>
                                <span class="text-3xl font-black text-blue-700" id="res-syringe">0</span>
                            </div>

                            <!-- Alcohol 8 -->
                            <div id="box-vial-alc8" class="p-3 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <img src="${IMG_BASE_URL}alc-8.jpg" alt="Alcohol 8" class="w-12 h-12 object-cover rounded-lg border border-slate-200">
                                    <span class="font-bold text-slate-800 text-base">สำลี 8 ก้อน</span>
                                </div>
                                <span class="text-3xl font-black text-blue-700" id="res-vial-alc8">0</span>
                            </div>

                            <!-- Alcohol 10 -->
                            <div id="box-vial-alc10" class="p-3 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-between sm:col-span-2">
                                <div class="flex items-center gap-3">
                                    <img src="${IMG_BASE_URL}alc-10.jpg" alt="Alcohol 10" class="w-12 h-12 object-cover rounded-lg border border-slate-200">
                                    <span class="font-bold text-slate-800 text-base">สำลี 10 ก้อน</span>
                                </div>
                                <span class="text-3xl font-black text-blue-700" id="res-vial-alc10">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Elements Binding
    const morningInput = container.querySelector('#ins-morning');
    const eveningInput = container.querySelector('#ins-evening');
    const fuDaysInput = container.querySelector('#ins-fu-days');
    const startDateInput = container.querySelector('#ins-start-date');

    const btnBtnCalc = container.querySelector('#btn-calc-action');
    const btnReset = container.querySelector('#btn-reset');

    const btnAlcAll = container.querySelector('#btn-alc-all');
    const btnAlc8 = container.querySelector('#btn-alc-8');
    const btnAlc10 = container.querySelector('#btn-alc-10');

    // 1. Feature เคาะ Enter เพื่อลงไปช่องถัดไป[cite: 2]
    morningInput.addEventListener('keydown', (e) => handleEnterKey(e, eveningInput));
    eveningInput.addEventListener('keydown', (e) => handleEnterKey(e, fuDaysInput));
    fuDaysInput.addEventListener('keydown', (e) => handleEnterKey(e, startDateInput));
    startDateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateInsulin(container);
        }
    });

    // 2. Realtime Calculation Event Listeners[cite: 2]
    [morningInput, eveningInput, fuDaysInput, startDateInput].forEach(elem => {
        elem.addEventListener('input', () => calculateInsulin(container));
    });

    btnBtnCalc.addEventListener('click', () => calculateInsulin(container));
    btnReset.addEventListener('click', () => resetInsulinForm(container));

    // 3. Alcohol Mode Switcher Events[cite: 2]
    btnAlcAll.addEventListener('click', () => setAlcMode('all', container));
    btnAlc8.addEventListener('click', () => setAlcMode('8', container));
    btnAlc10.addEventListener('click', () => setAlcMode('10', container));

    // Auto Focus ช่องแรก
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

    const defaultClass = "py-2.5 px-2 rounded-xl border-2 font-bold text-sm bg-white text-slate-700 border-slate-300 hover:bg-slate-50 transition-all";
    const activeClass = "py-2.5 px-2 rounded-xl border-2 font-bold text-sm bg-teal-600 text-white border-teal-600 shadow-sm transition-all";

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
    const today = new Date().toISOString().split('T')[0];
    container.querySelector('#ins-start-date').value = today;
    setAlcMode('all', container);
    calculateInsulin(container);
    container.querySelector('#ins-morning').focus();
}

function calculateInsulin(container) {
    const morningDose = parseFloat(container.querySelector('#ins-morning').value) || 0;
    const eveningDose = parseFloat(container.querySelector('#ins-evening').value) || 0;
    const fuDays = parseInt(container.querySelector('#ins-fu-days').value) || 0;
    const startDateVal = container.querySelector('#ins-start-date').value;

    const dailyDose = morningDose + eveningDose;
    const totalUnitsA = dailyDose * fuDays;

    let fuDateStr = '-';
    let dayOfWeekStr = '-';
    const warningBox = container.querySelector('#weekend-warning');
    const warningText = container.querySelector('#warning-text');

    if (startDateVal && fuDays > 0) {
        const startDate = new Date(startDateVal);
        const fuDate = new Date(startDate);
        fuDate.setDate(startDate.getDate() + fuDays);

        const dayIndex = fuDate.getDay();
        const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayNamesThai = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];

        dayOfWeekStr = `${dayNamesShort[dayIndex]} (${dayNamesThai[dayIndex]})`;

        const day = fuDate.getDate();
        const monthText = thaiMonths[fuDate.getMonth()];
        const monthNum = String(fuDate.getMonth() + 1).padStart(2, '0');
        const yearBE = fuDate.getFullYear() + 543;
        const yearBEShort = String(yearBE).slice(-2);
        const dayPadded = String(day).padStart(2, '0');

        fuDateStr = `${day} ${monthText} ${yearBE} (${dayPadded}/${monthNum}/${yearBEShort})`;

        if (dayIndex === 0 || dayIndex === 6) {
            warningBox.classList.remove('hidden');
            warningText.innerText = `ตรงกับวันหยุด (${dayNamesThai[dayIndex]}) กรุณาเลื่อนวันนัด!`;
        } else {
            warningBox.classList.add('hidden');
        }
    } else {
        warningBox.classList.add('hidden');
    }

    const cartridgeCalc = fuDays > 0 ? totalUnitsA / 300 : 0;
    const cartridgeNet = Math.ceil(cartridgeCalc);

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

    const penNeedleCount = fuDays > 0 ? Math.ceil(fuDays / 2) : 0;
    const syringeCount = fuDays > 0 ? fuDays : 0;

    let alc8Bags = fuDays > 0 ? Math.ceil(fuDays / 4) : 0;
    let alc10Bags = fuDays > 0 ? Math.ceil(fuDays / 5) : 0;

    if (fuDays > 0 && (morningDose === 0 || eveningDose === 0)) {
        alc8Bags = Math.ceil(alc8Bags / 2);
        alc10Bags = Math.ceil(alc10Bags / 2);
    }

    container.querySelector('#res-fu-date').innerText = fuDateStr;
    container.querySelector('#res-fu-day').innerText = dayOfWeekStr;

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
