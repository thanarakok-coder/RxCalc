export function render(container) {
    container.innerHTML = `
        <div class="bg-white/90 backdrop-blur-sm border border-slate-300 rounded-3xl p-5 sm:p-7 shadow-lg space-y-6">
            
            <!-- Header & Drug Settings (มุมบนขวา) -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 class="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <i class="fa-solid fa-prescription-bottle-medical text-teal-600"></i>
                        Azithromycin Syrup Calculator
                    </h2>
                    <p class="text-xs text-slate-500 font-normal mt-1">คำนวณขนาดยาและจำนวนขวดสำหรับการรักษาในเด็ก</p>
                </div>

                <!-- Drug Specification Inputs (มุมขวาบน) -->
                <div class="bg-slate-100/80 border border-slate-300/80 rounded-2xl p-2.5 flex items-center gap-2 text-xs font-medium text-slate-700 self-start md:self-auto shadow-sm">
                    <span class="text-slate-500 whitespace-nowrap">ความแรง:</span>
                    <input type="number" id="azi-strength-mg" placeholder="200" value="200" class="w-14 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center text-slate-800 font-semibold focus:outline-none focus:border-teal-500">
                    <span>mg /</span>
                    <input type="number" id="azi-strength-ml" placeholder="5" value="5" class="w-12 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center text-slate-800 font-semibold focus:outline-none focus:border-teal-500">
                    <span>ml</span>
                    <span class="text-slate-300 mx-0.5">|</span>
                    <span class="text-slate-500 whitespace-nowrap">ขวดละ:</span>
                    <input type="number" id="azi-total-vol" placeholder="15" value="15" class="w-12 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center text-slate-800 font-semibold focus:outline-none focus:border-teal-500">
                    <span>ml</span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <!-- Left Column: Inputs -->
                <div class="lg:col-span-5 space-y-5">
                    
                    <!-- Weight Input with +/- Buttons -->
                    <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                        <label class="block text-sm font-bold text-slate-800">
                            น้ำหนักตัวผู้ป่วยเด็ก (BW)
                        </label>
                        <div class="flex items-center justify-between bg-white border border-slate-300 rounded-2xl p-1.5 shadow-sm">
                            <button id="btn-weight-minus" class="w-11 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center font-bold text-lg active:scale-95 transition-all">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            
                            <div class="flex items-center gap-2">
                                <input type="number" id="input-weight" placeholder="0" step="any" min="0" class="w-24 text-center text-2xl font-bold text-slate-800 focus:outline-none placeholder:text-slate-300 placeholder:font-normal">
                                <span class="text-sm font-semibold text-slate-500 pr-2">kg</span>
                            </div>

                            <button id="btn-weight-plus" class="w-11 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center font-bold text-lg active:scale-95 transition-all">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Duration Settings -->
                    <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">ระยะเวลาการรักษา (จำนวนวัน)</h3>
                        
                        <!-- Phase 1 Days -->
                        <div class="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
                            <div>
                                <div class="text-xs font-bold text-teal-800">ช่วงที่ 1 (10 mg/kg)</div>
                                <div class="text-[11px] text-slate-500">Day 1 Loading dose</div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <input type="number" id="input-phase1-days" placeholder="1" value="1" min="0" class="w-14 text-center bg-slate-50 border border-slate-300 rounded-lg py-1 px-2 font-bold text-slate-800 focus:outline-none focus:border-teal-500">
                                <span class="text-xs font-medium text-slate-600">วัน</span>
                            </div>
                        </div>

                        <!-- Phase 2 Days -->
                        <div class="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
                            <div>
                                <div class="text-xs font-bold text-teal-800">ช่วงที่ 2 (5 mg/kg)</div>
                                <div class="text-[11px] text-slate-500">Maintenance dose</div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <input type="number" id="input-phase2-days" placeholder="4" value="4" min="0" class="w-14 text-center bg-slate-50 border border-slate-300 rounded-lg py-1 px-2 font-bold text-slate-800 focus:outline-none focus:border-teal-500">
                                <span class="text-xs font-medium text-slate-600">วัน</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right Column: Results -->
                <div class="lg:col-span-7 bg-teal-50/60 border border-teal-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
                    
                    <div class="space-y-4">
                        <h3 class="text-base font-bold text-teal-900 border-b border-teal-200/60 pb-2 flex items-center gap-2">
                            <i class="fa-solid fa-square-poll-vertical text-teal-600"></i>
                            สรุปผลการคำนวณขนาดยา
                        </h3>

                        <!-- Phase 1 Result -->
                        <div class="bg-white/90 rounded-2xl p-4 border border-teal-100 shadow-sm space-y-1">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-bold text-slate-600">ช่วงที่ 1 (10 mg/kg)</span>
                                <span id="res-p1-days-label" class="text-xs text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-full font-semibold">1 วัน</span>
                            </div>
                            <div class="flex items-baseline justify-between pt-1">
                                <div class="text-2xl font-extrabold text-teal-700" id="res-p1-ml">0 <span class="text-sm font-normal text-slate-500">ml/วัน</span></div>
                                <div class="text-xs text-slate-500 font-medium" id="res-p1-mg">(0 mg/วัน)</div>
                            </div>
                        </div>

                        <!-- Phase 2 Result -->
                        <div class="bg-white/90 rounded-2xl p-4 border border-teal-100 shadow-sm space-y-1">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-bold text-slate-600">ช่วงที่ 2 (5 mg/kg)</span>
                                <span id="res-p2-days-label" class="text-xs text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-full font-semibold">4 วัน</span>
                            </div>
                            <div class="flex items-baseline justify-between pt-1">
                                <div class="text-2xl font-extrabold text-teal-700" id="res-p1-ml-p2">0 <span class="text-sm font-normal text-slate-500">ml/วัน</span></div>
                                <div class="text-xs text-slate-500 font-medium" id="res-p2-mg">(0 mg/วัน)</div>
                            </div>
                        </div>

                        <!-- Total Volume -->
                        <div class="bg-teal-100/40 rounded-2xl p-4 border border-teal-200 flex justify-between items-center">
                            <span class="text-xs font-bold text-teal-900">ปริมาณยารวมทั้งคอร์สการรักษา</span>
                            <div class="text-right">
                                <span id="res-total-ml" class="text-2xl font-black text-teal-900">0</span>
                                <span class="text-xs font-bold text-teal-800 ml-1">ml</span>
                            </div>
                        </div>
                    </div>

                    <!-- Total Bottle Calculation & Visual Illustration -->
                    <div class="bg-white rounded-2xl p-4 border border-teal-200 shadow-sm flex items-center justify-between gap-4">
                        <div class="space-y-1">
                            <div class="text-xs font-bold text-slate-500 uppercase tracking-wide">จำนวนยาที่ต้องจ่าย</div>
                            <div class="flex items-baseline gap-1.5">
                                <span id="res-total-bottles" class="text-3xl font-black text-teal-600">0</span>
                                <span class="text-base font-bold text-slate-700">ขวด</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal">* ปัดเศษขึ้นเป็นจำนวนขวดเต็มเสมอ</p>
                        </div>

                        <!-- Bottle Illustration -->
                        <div id="bottle-icon-container" class="flex items-center gap-1.5 bg-teal-50 px-3 py-2 rounded-xl border border-teal-100 min-h-[50px]">
                            <i class="fa-solid fa-prescription-bottle text-2xl text-slate-300"></i>
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
    const p2DaysInput = container.querySelector('#input-phase2-days');

    const resP1Ml = container.querySelector('#res-p1-ml');
    const resP1Mg = container.querySelector('#res-p1-mg');
    const resP1DaysLabel = container.querySelector('#res-p1-days-label');

    const resP2Ml = container.querySelector('#res-p1-ml-p2');
    const resP2Mg = container.querySelector('#res-p2-mg');
    const resP2DaysLabel = container.querySelector('#res-p2-days-label');

    const resTotalMl = container.querySelector('#res-total-ml');
    const resTotalBottles = container.querySelector('#res-total-bottles');
    const bottleIconContainer = container.querySelector('#bottle-icon-container');

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
            resP1Ml.innerHTML = `0 <span class="text-sm font-normal text-slate-500">ml/วัน</span>`;
            resP1Mg.textContent = `(0 mg/วัน)`;
            resP2Ml.innerHTML = `0 <span class="text-sm font-normal text-slate-500">ml/วัน</span>`;
            resP2Mg.textContent = `(0 mg/วัน)`;
            resTotalMl.textContent = '0';
            resTotalBottles.textContent = '0';
            bottleIconContainer.innerHTML = `<i class="fa-solid fa-prescription-bottle text-2xl text-slate-300"></i>`;
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
        resP1Ml.innerHTML = `${p1DoseMl.toFixed(2)} <span class="text-sm font-normal text-slate-500">ml/วัน</span>`;
        resP1Mg.textContent = `(${p1DoseMg.toFixed(1)} mg/วัน)`;

        resP2Ml.innerHTML = `${p2DoseMl.toFixed(2)} <span class="text-sm font-normal text-slate-500">ml/วัน</span>`;
        resP2Mg.textContent = `(${p2DoseMg.toFixed(1)} mg/วัน)`;

        resTotalMl.textContent = totalMl.toFixed(2);
        resTotalBottles.textContent = bottles;

        // Render Bottle Icons
        if (bottles > 0) {
            let iconsHtml = '';
            const maxIcons = Math.min(bottles, 6);
            for (let i = 0; i < maxIcons; i++) {
                iconsHtml += `<i class="fa-solid fa-prescription-bottle text-2xl text-teal-600 animate-fade-in"></i>`;
            }
            if (bottles > 6) {
                iconsHtml += `<span class="text-xs font-bold text-teal-700 ml-1">+${bottles - 6}</span>`;
            }
            bottleIconContainer.innerHTML = iconsHtml;
        } else {
            bottleIconContainer.innerHTML = `<i class="fa-solid fa-prescription-bottle text-2xl text-slate-300"></i>`;
        }
    }

    // Event Listeners
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

    [weightInput, strMgInput, strMlInput, totalVolInput, p1DaysInput, p2DaysInput].forEach(input => {
        input.addEventListener('input', calculate);
    });
}
