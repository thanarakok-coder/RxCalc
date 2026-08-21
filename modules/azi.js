export function render(container) {
    container.innerHTML = `
        <div class="bg-white/90 backdrop-blur-sm border border-slate-300 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            <!-- Header & Drug Settings -->
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                        <i class="fa-solid fa-prescription-bottle-medical text-teal-600"></i>
                        Azithromycin Syrup Calculator
                    </h2>
                    <p class="text-base sm:text-lg text-slate-600 font-semibold mt-1">คำนวณขนาดยาและจำนวนขวดสำหรับการรักษาในเด็ก</p>
                </div>

                <!-- Drug Specification Inputs -->
                <div class="bg-slate-100 border border-slate-300 rounded-2xl p-2.5 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 self-start lg:self-auto shadow-sm flex-wrap">
                    <span class="text-slate-500 whitespace-nowrap">ความแรง:</span>
                    <input type="number" id="azi-strength-mg" placeholder="200" value="200" class="w-14 bg-white border border-slate-300 rounded-lg px-1.5 py-0.5 text-center text-slate-900 font-extrabold focus:outline-none focus:border-teal-500 text-sm">
                    <span>mg /</span>
                    <input type="number" id="azi-strength-ml" placeholder="5" value="5" class="w-12 bg-white border border-slate-300 rounded-lg px-1.5 py-0.5 text-center text-slate-900 font-extrabold focus:outline-none focus:border-teal-500 text-sm">
                    <span>mL</span>
                    <span class="text-slate-300 mx-0.5">|</span>
                    <span class="text-slate-500 whitespace-nowrap">ขวดละ:</span>
                    <input type="number" id="azi-total-vol" placeholder="15" value="15" class="w-12 bg-white border border-slate-300 rounded-lg px-1.5 py-0.5 text-center text-slate-900 font-extrabold focus:outline-none focus:border-teal-500 text-sm">
                    <span>mL</span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <!-- Left Column: Inputs -->
                <div class="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-5 space-y-5 shadow-inner">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span class="text-lg font-extrabold text-teal-400 flex items-center gap-2">
                            <i class="fa-solid fa-pen-to-square"></i> กรอกข้อมูล
                        </span>
                        <button id="btn-reset-azi" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-rotate-left"></i> รีเซ็ต
                        </button>
                    </div>

                    <!-- Weight Input -->
                    <div class="space-y-2">
                        <label class="block text-sm font-extrabold text-slate-200">
                            <i class="fa-solid fa-weight-scale text-teal-400 mr-1.5"></i>น้ำหนักตัวผู้ป่วยเด็ก (BW)
                        </label>
                        <div class="flex items-center justify-between bg-slate-800/80 border border-slate-700 rounded-2xl p-2.5">
                            <button id="btn-weight-minus" class="w-10 h-10 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center justify-center font-bold active:scale-95 transition-all text-base cursor-pointer">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            
                            <div class="flex items-baseline gap-1">
                                <input type="number" id="input-weight" placeholder="0" step="any" min="0" class="w-20 text-center text-3xl font-black text-teal-300 bg-transparent focus:outline-none placeholder:text-slate-600">
                                <span class="text-base font-bold text-slate-400">kg</span>
                            </div>

                            <button id="btn-weight-plus" class="w-10 h-10 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center justify-center font-bold active:scale-95 transition-all text-base cursor-pointer">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Duration Settings -->
                    <div class="space-y-3 pt-2">
                        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">ระยะเวลาการรักษา (จำนวนวัน)</h3>
                        
                        <!-- Phase 1 Days -->
                        <div class="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/80 space-y-2">
                            <div>
                                <div class="text-sm font-extrabold text-teal-300">ช่วงที่ 1 (10 mg/kg)</div>
                                <div class="text-xs text-slate-400">Day 1 Loading dose</div>
                            </div>
                            <div class="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl p-2">
                                <button id="btn-p1-minus" class="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center font-bold active:scale-95 transition-all text-sm cursor-pointer">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <div class="flex items-baseline gap-1">
                                    <input type="number" id="input-phase1-days" placeholder="1" value="1" min="0" class="w-16 text-center bg-transparent font-black text-amber-400 text-2xl focus:outline-none">
                                    <span class="text-sm font-bold text-slate-400">วัน</span>
                                </div>
                                <button id="btn-p1-plus" class="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center font-bold active:scale-95 transition-all text-sm cursor-pointer">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Phase 2 Days -->
                        <div class="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/80 space-y-2">
                            <div>
                                <div class="text-sm font-extrabold text-teal-300">ช่วงที่ 2 (5 mg/kg)</div>
                                <div class="text-xs text-slate-400">Maintenance dose</div>
                            </div>
                            <div class="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl p-2">
                                <button id="btn-p2-minus" class="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center font-bold active:scale-95 transition-all text-sm cursor-pointer">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <div class="flex items-baseline gap-1">
                                    <input type="number" id="input-phase2-days" placeholder="4" value="4" min="0" class="w-16 text-center bg-transparent font-black text-amber-400 text-2xl focus:outline-none">
                                    <span class="text-sm font-bold text-slate-400">วัน</span>
                                </div>
                                <button id="btn-p2-plus" class="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center font-bold active:scale-95 transition-all text-sm cursor-pointer">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right Column: Results -->
                <div class="lg:col-span-8 bg-teal-50/70 border border-teal-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    
                    <div class="space-y-5">
                        <h3 class="text-lg sm:text-xl font-extrabold text-teal-950 border-b border-teal-200 pb-3 flex items-center gap-2">
                            <i class="fa-solid fa-square-poll-vertical text-teal-600"></i>
                            สรุปผลการคำนวณขนาดยา
                        </h3>

                        <!-- Phase 1 Result -->
                        <div class="bg-white rounded-2xl p-5 border border-teal-100 shadow-sm space-y-1">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="text-lg font-extrabold text-slate-800">ช่วงที่ 1 (10 mg/kg)</div>
                                    <div class="text-sm text-slate-500 font-bold" id="res-p1-mg">(0.0 mg/วัน)</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-3xl sm:text-4xl font-black text-teal-700" id="res-p1-ml">0.00 <span class="text-lg font-bold text-slate-600">mL/วัน</span></div>
                                    <div class="mt-1">
                                        <span id="res-p1-days-label" class="text-sm text-teal-900 bg-teal-100 px-3 py-0.5 rounded-full font-extrabold inline-block">1 วัน</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Phase 2 Result -->
                        <div class="bg-white rounded-2xl p-5 border border-teal-100 shadow-sm space-y-1">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="text-lg font-extrabold text-slate-800">ช่วงที่ 2 (5 mg/kg)</div>
                                    <div class="text-sm text-slate-500 font-bold" id="res-p2-mg">(0.0 mg/วัน)</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-3xl sm:text-4xl font-black text-teal-700" id="res-p1-ml-p2">0.00 <span class="text-lg font-bold text-slate-600">mL/วัน</span></div>
                                    <div class="mt-1">
                                        <span id="res-p2-days-label" class="text-sm text-teal-900 bg-teal-100 px-3 py-0.5 rounded-full font-extrabold inline-block">4 วัน</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- สรุปผลลัพธ์ ปรับขยายขนาดตัวเลขใหญ่ขึ้น 200-300% -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <!-- ปริมาณยารวม -->
                        <div class="bg-teal-100/60 rounded-2xl p-5 border border-teal-200 flex flex-col justify-between min-h-[140px]">
                            <div>
                                <div class="text-lg font-extrabold text-teal-950">ปริมาณยารวม</div>
                                <div class="text-xs text-teal-800 font-semibold">ทั้งคอร์สการรักษา</div>
                            </div>
                            <div class="text-right pt-2">
                                <span id="res-total-ml" class="text-5xl sm:text-6xl font-black text-teal-950 tracking-tight">0.00</span>
                                <span class="text-2xl font-bold text-teal-900 ml-1">mL</span>
                            </div>
                        </div>

                        <!-- จำนวนยาที่ต้องใช้ -->
                        <div class="bg-white rounded-2xl p-5 border border-teal-200 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <div class="text-lg font-extrabold text-slate-800">จำนวนยา</div>
                                <div class="text-xs text-slate-500 font-semibold">ที่ต้องใช้</div>
                            </div>
                            <div class="text-right pt-2">
                                <span id="res-total-bottles" class="text-5xl sm:text-6xl font-black text-teal-600 tracking-tight">0</span>
                                <span class="text-2xl font-extrabold text-slate-800 ml-1">ขวด</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal text-right mt-1">* ปัดเศษขึ้นเป็นจำนวนขวดเต็มเสมอ</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;

    // DOM Elements
    const weightInput = container.querySelector('#input-weight');
    const btnMinus = container.querySelector('#btn-weight-minus');
    const btnPlus = container.querySelector('#btn-weight-plus');

    const strMgInput = container.querySelector('#azi-strength-mg');
    const strMlInput = container.querySelector('#azi-strength-ml');
    const totalVolInput = container.querySelector('#azi-total-vol');

    const p1DaysInput = container.querySelector('#input-phase1-days');
    const p1Minus = container.querySelector('#btn-p1-minus');
    const p1Plus = container.querySelector('#btn-p1-plus');

    const p2DaysInput = container.querySelector('#input-phase2-days');
    const p2Minus = container.querySelector('#btn-p2-minus');
    const p2Plus = container.querySelector('#btn-p2-plus');

    const resP1Ml = container.querySelector('#res-p1-ml');
    const resP1Mg = container.querySelector('#res-p1-mg');
    const resP1DaysLabel = container.querySelector('#res-p1-days-label');

    const resP2Ml = container.querySelector('#res-p1-ml-p2');
    const resP2Mg = container.querySelector('#res-p2-mg');
    const resP2DaysLabel = container.querySelector('#res-p2-days-label');

    const resTotalMl = container.querySelector('#res-total-ml');
    const resTotalBottles = container.querySelector('#res-total-bottles');
    const btnReset = container.querySelector('#btn-reset-azi');

    function calculate() {
        const bw = parseFloat(weightInput.value) || 0;
        const strMg = parseFloat(strMgInput.value) || 200;
        const strMl = parseFloat(strMlInput.value) || 5;
        const bottleVol = parseFloat(totalVolInput.value) || 15;

        const p1Days = parseFloat(p1DaysInput.value) || 0;
        const p2Days = parseFloat(p2DaysInput.value) || 0;

        resP1DaysLabel.textContent = `${p1Days} วัน`;
        resP2DaysLabel.textContent = `${p2Days} วัน`;

        if (bw <= 0) {
            resP1Ml.innerHTML = `0.00 <span class="text-lg font-bold text-slate-600">mL/วัน</span>`;
            resP1Mg.textContent = `(0.0 mg/วัน)`;
            resP2Ml.innerHTML = `0.00 <span class="text-lg font-bold text-slate-600">mL/วัน</span>`;
            resP2Mg.textContent = `(0.0 mg/วัน)`;
            resTotalMl.textContent = '0.00';
            resTotalBottles.textContent = '0';
            return;
        }

        // Phase 1 (10 mg/kg/day)
        const p1DoseMg = bw * 10;
        const p1DoseMl = (p1DoseMg * strMl) / strMg;

        // Phase 2 (5 mg/kg/day)
        const p2DoseMg = bw * 5;
        const p2DoseMl = (p2DoseMg * strMl) / strMg;

        // Total ML
        const totalMl = (p1DoseMl * p1Days) + (p2DoseMl * p2Days);

        // Total Bottles (Ceil)
        const bottles = bottleVol > 0 ? Math.ceil(totalMl / bottleVol) : 0;

        // Render Results
        resP1Ml.innerHTML = `${p1DoseMl.toFixed(2)} <span class="text-lg font-bold text-slate-600">mL/วัน</span>`;
        resP1Mg.textContent = `(${p1DoseMg.toFixed(1)} mg/วัน)`;

        resP2Ml.innerHTML = `${p2DoseMl.toFixed(2)} <span class="text-lg font-bold text-slate-600">mL/วัน</span>`;
        resP2Mg.textContent = `(${p2DoseMg.toFixed(1)} mg/วัน)`;

        resTotalMl.textContent = totalMl.toFixed(2);
        resTotalBottles.textContent = bottles;
    }

    // Reset Functionality
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            weightInput.value = '';
            p1DaysInput.value = '1';
            p2DaysInput.value = '4';
            calculate();
        });
    }

    // Weight +/- Events
    btnMinus.addEventListener('click', () => {
        let val = parseFloat(weightInput.value) || 0;
        if (val > 0) {
            weightInput.value = Math.max(0, val - 1);
            calculate();
        }
    });

    btnPlus.addEventListener('click', () => {
        let val = parseFloat(weightInput.value) || 0;
        weightInput.value = val + 1;
        calculate();
    });

    // Phase 1 Days +/- Events
    p1Minus.addEventListener('click', () => {
        let val = parseFloat(p1DaysInput.value) || 0;
        if (val > 0) {
            p1DaysInput.value = val - 1;
            calculate();
        }
    });
    p1Plus.addEventListener('click', () => {
        let val = parseFloat(p1DaysInput.value) || 0;
        p1DaysInput.value = val + 1;
        calculate();
    });

    // Phase 2 Days +/- Events (แก้ไขบั๊กปุ่มบวก)
    p2Minus.addEventListener('click', () => {
        let val = parseFloat(p2DaysInput.value) || 0;
        if (val > 0) {
            p2DaysInput.value = val - 1;
            calculate();
        }
    });
    p2Plus.addEventListener('click', () => {
        let val = parseFloat(p2DaysInput.value) || 0;
        p2DaysInput.value = val + 1; // แก้ไขให้ปรับค่าใส่ p2DaysInput
        calculate();
    });

    [weightInput, strMgInput, strMlInput, totalVolInput, p1DaysInput, p2DaysInput].forEach(input => {
        input.addEventListener('input', calculate);
    });
}
