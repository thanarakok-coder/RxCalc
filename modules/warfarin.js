export function render(container) {
    container.innerHTML = `
        <div class="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-3xl p-6 shadow-sm space-y-6">
            
            <!-- Title Header -->
            <div class="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div class="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                    <i class="fa-solid fa-pills"></i>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-slate-800">Warfarin Dose Calculator</h2>
                    <p class="text-xs text-slate-500">คำนวณขนาดยา วาร์ฟาริน ประจำสัปดาห์และการปรับเปลี่ยนขนาดตามระดับ INR</p>
                </div>
            </div>

            <!-- Input Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <!-- Target & Current INR -->
                <div class="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <i class="fa-solid fa-vial-circle-check text-teal-600"></i>
                        ข้อมูลระดับ INR
                    </h3>
                    
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">Target INR Range</label>
                        <select id="wf-target-inr" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500">
                            <option value="2-3">2.0 - 3.0 (General Target)</option>
                            <option value="2.5-3.5">2.5 - 3.5 (Mechanical Heart Valve)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">Current INR Value</label>
                        <input type="number" id="wf-current-inr" step="0.1" placeholder="เช่น 1.8" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500">
                    </div>
                </div>

                <!-- Weekly Schedule Matrix -->
                <div class="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <i class="fa-solid fa-calendar-days text-teal-600"></i>
                        ขนาดยาปัจจุบัน (mg/วัน)
                    </h3>
                    
                    <div class="grid grid-cols-7 gap-1 text-center">
                        <div><span class="text-[10px] text-slate-500 font-semibold">จ</span><input type="number" id="wf-m" class="wf-day-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center mt-1" value="3"></div>
                        <div><span class="text-[10px] text-slate-500 font-semibold">อ</span><input type="number" id="wf-tu" class="wf-day-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center mt-1" value="3"></div>
                        <div><span class="text-[10px] text-slate-500 font-semibold">พ</span><input type="number" id="wf-w" class="wf-day-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center mt-1" value="3"></div>
                        <div><span class="text-[10px] text-slate-500 font-semibold">พฤ</span><input type="number" id="wf-th" class="wf-day-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center mt-1" value="3"></div>
                        <div><span class="text-[10px] text-slate-500 font-semibold">ศ</span><input type="number" id="wf-f" class="wf-day-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center mt-1" value="3"></div>
                        <div><span class="text-[10px] text-slate-500 font-semibold">ส</span><input type="number" id="wf-sa" class="wf-day-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center mt-1" value="3"></div>
                        <div><span class="text-[10px] text-slate-500 font-semibold">อา</span><input type="number" id="wf-su" class="wf-day-input w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center mt-1" value="3"></div>
                    </div>

                    <div class="flex justify-between items-center pt-2 text-xs text-slate-700">
                        <span>Total Weekly Dose:</span>
                        <span id="wf-weekly-total" class="font-bold text-teal-700 text-sm">21.0 mg/wk</span>
                    </div>
                </div>

            </div>

            <!-- Action Button -->
            <button id="wf-btn-calc" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer">
                <i class="fa-solid fa-calculator"></i>
                <span>คำนวณการปรับขนาดยา</span>
            </button>

            <!-- Result Panel -->
            <div id="wf-result-panel" class="hidden bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                <h4 class="text-xs uppercase tracking-wider text-teal-400 font-bold border-b border-slate-800 pb-2">ผลการประเมินและการปรับขนาดยา</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-slate-800 p-3.5 rounded-xl border border-slate-700 space-y-1">
                        <span class="text-[11px] text-slate-400">สถานะ INR</span>
                        <div id="wf-inr-status" class="text-sm font-semibold text-amber-400">-</div>
                    </div>
                    
                    <div class="bg-slate-800 p-3.5 rounded-xl border border-slate-700 space-y-1">
                        <span class="text-[11px] text-slate-400">คำแนะนำการปรับ Weekly Dose</span>
                        <div id="wf-dose-adj" class="text-sm font-semibold text-teal-300">-</div>
                    </div>
                </div>

                <div class="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
                    <div class="font-medium text-slate-200 mb-1"><i class="fa-solid fa-circle-info text-teal-400 mr-1.5"></i>ข้อควรระวัง / นัดหมาย:</div>
                    <p id="wf-note" class="leading-relaxed text-slate-400">-</p>
                </div>
            </div>

        </div>
    `;

    // Internal Logic
    const dayInputs = container.querySelectorAll('.wf-day-input');
    const weeklyTotalEl = container.querySelector('#wf-weekly-total');
    const btnCalc = container.querySelector('#wf-btn-calc');
    const resultPanel = container.querySelector('#wf-result-panel');
    const inrStatusEl = container.querySelector('#wf-inr-status');
    const doseAdjEl = container.querySelector('#wf-dose-adj');
    const noteEl = container.querySelector('#wf-note');

    function calculateWeeklyTotal() {
        let sum = 0;
        dayInputs.forEach(input => {
            sum += parseFloat(input.value) || 0;
        });
        weeklyTotalEl.textContent = `${sum.toFixed(1)} mg/wk`;
        return sum;
    }

    dayInputs.forEach(input => {
        input.addEventListener('input', calculateWeeklyTotal);
    });

    btnCalc.addEventListener('click', () => {
        const targetINR = container.querySelector('#wf-target-inr').value;
        const currentINR = parseFloat(container.querySelector('#wf-current-inr').value);
        const currentWeeklyDose = calculateWeeklyTotal();

        if (isNaN(currentINR) || currentINR <= 0) {
            alert('กรุณากรอกค่า Current INR ให้ถูกต้อง');
            return;
        }

        resultPanel.classList.remove('hidden');

        // Logic ประเมิน INR (อิง Target 2.0 - 3.0)
        if (targetINR === '2-3') {
            if (currentINR < 1.5) {
                inrStatusEl.textContent = 'INR Low (< 1.5)';
                inrStatusEl.className = 'text-sm font-semibold text-rose-400';
                doseAdjEl.textContent = `เพิ่ม Weekly dose ขึ้น 10% - 20% (เป้าหมายใหม่ ~${(currentWeeklyDose * 1.15).toFixed(1)} mg/wk)`;
                noteEl.textContent = 'พิจารณา Extra dose 1 ครั้งวันนี้ และนัดเจาะ INR ซ้ำภายใน 1 - 2 สัปดาห์';
            } else if (currentINR >= 1.5 && currentINR < 2.0) {
                inrStatusEl.textContent = 'INR Subtherapeutic (1.5 - 1.9)';
                inrStatusEl.className = 'text-sm font-semibold text-amber-400';
                doseAdjEl.textContent = `เพิ่ม Weekly dose ขึ้น 5% - 10% (เป้าหมายใหม่ ~${(currentWeeklyDose * 1.1).toFixed(1)} mg/wk)`;
                noteEl.textContent = 'นัดเจาะ INR ซ้ำภายใน 2 - 4 สัปดาห์';
            } else if (currentINR >= 2.0 && currentINR <= 3.0) {
                inrStatusEl.textContent = 'INR In Target (2.0 - 3.0)';
                inrStatusEl.className = 'text-sm font-semibold text-emerald-400';
                doseAdjEl.textContent = `คงขนาดยาเดิม (${currentWeeklyDose.toFixed(1)} mg/wk)`;
                noteEl.textContent = 'ขนาดยาเหมาะสม นัดเจาะ INR ซ้ำในอีก 4 - 12 สัปดาห์';
            } else if (currentINR > 3.0 && currentINR <= 3.5) {
                inrStatusEl.textContent = 'INR Slightly High (3.1 - 3.5)';
                inrStatusEl.className = 'text-sm font-semibold text-amber-400';
                doseAdjEl.textContent = `ลด Weekly dose ลง 5% - 10% (เป้าหมายใหม่ ~${(currentWeeklyDose * 0.9).toFixed(1)} mg/wk)`;
                noteEl.textContent = 'นัดเจาะ INR ซ้ำภายใน 2 - 4 สัปดาห์';
            } else if (currentINR > 3.5 && currentINR <= 4.5) {
                inrStatusEl.textContent = 'INR High (3.6 - 4.5)';
                inrStatusEl.className = 'text-sm font-semibold text-rose-400';
                doseAdjEl.textContent = `งดยา 1 วัน แล้วลด Weekly dose ลง 10% - 15%`;
                noteEl.textContent = 'นัดเจาะ INR ซ้ำภายใน 1 - 2 สัปดาห์';
            } else {
                inrStatusEl.textContent = 'INR Very High (> 4.5)';
                inrStatusEl.className = 'text-sm font-semibold text-rose-500 font-bold';
                doseAdjEl.textContent = `งดยา 1 - 2 วัน และลด Weekly dose ลง 15% - 20%`;
                noteEl.textContent = 'ประเมินภาวะเลือดออก (Bleeding Sign) หากไม่มีเลือดออกรุนแรง ให้งดยาและติดตาม INR ใกล้ชิด';
            }
        } else {
            // Target 2.5 - 3.5
            if (currentINR < 2.5) {
                inrStatusEl.textContent = 'INR Below Target (< 2.5)';
                inrStatusEl.className = 'text-sm font-semibold text-amber-400';
                doseAdjEl.textContent = `เพิ่ม Weekly dose ขึ้น 5% - 15%`;
                noteEl.textContent = 'นัดเจาะ INR ซ้ำภายใน 2 - 4 สัปดาห์';
            } else if (currentINR >= 2.5 && currentINR <= 3.5) {
                inrStatusEl.textContent = 'INR In Target (2.5 - 3.5)';
                inrStatusEl.className = 'text-sm font-semibold text-emerald-400';
                doseAdjEl.textContent = `คงขนาดยาเดิม (${currentWeeklyDose.toFixed(1)} mg/wk)`;
                noteEl.textContent = 'ขนาดยาเหมาะสม นัดเจาะ INR ซ้ำในอีก 4 - 8 สัปดาห์';
            } else {
                inrStatusEl.textContent = 'INR Above Target (> 3.5)';
                inrStatusEl.className = 'text-sm font-semibold text-rose-400';
                doseAdjEl.textContent = `งดยา 1 วัน แล้วลด Weekly dose ลง 10% - 15%`;
                noteEl.textContent = 'นัดเจาะ INR ซ้ำภายใน 1 - 2 สัปดาห์';
            }
        }
    });
}
