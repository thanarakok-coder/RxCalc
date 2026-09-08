export function render(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-800">
            
            <!-- ฝั่งซ้าย: Input & Decision Table (40% -> lg:col-span-5) -->
            <div class="lg:col-span-5 space-y-5">
                
                <!-- กล่อง Input 1 -->
                <div class="bg-white/90 backdrop-blur-sm border border-slate-300 rounded-3xl p-5 shadow-sm space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
                            <i class="fa-solid fa-calculator text-teal-600"></i>
                            ประเมินการปรับขนาดยา (Input 1)
                        </h3>
                        <button id="wf-btn-reset-1" class="text-xs text-slate-500 hover:text-rose-600 underline flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-rotate-left"></i> Reset
                        </button>
                    </div>

                    <!-- Dose เดิม -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">1. Dose Warfarin เดิม (mg/wk)</label>
                        <div class="flex items-center gap-1">
                            <button id="wf-dose1-dec" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-slate-700 flex items-center justify-center transition-all cursor-pointer">-</button>
                            <input type="number" id="wf-dose-old" step="0.1" placeholder="0" class="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-center font-bold text-slate-800 text-sm focus:outline-none focus:border-teal-500">
                            <button id="wf-dose1-inc" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-slate-700 flex items-center justify-center transition-all cursor-pointer">+</button>
                        </div>
                    </div>

                    <!-- INR วันนี้ -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">2. INR วันนี้</label>
                        <input type="number" id="wf-inr-today" step="0.01" placeholder="0" class="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-center font-bold text-slate-800 text-sm focus:outline-none focus:border-teal-500">
                    </div>

                    <!-- Checkbox Target -->
                    <div class="pt-1 flex items-center gap-2">
                        <input type="checkbox" id="wf-target-high" class="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer">
                        <label for="wf-target-high" class="text-xs font-bold text-slate-700 cursor-pointer select-none">
                            Target INR 2.5 – 3.5 (Mechanical Heart Valve)
                        </label>
                    </div>

                    <!-- Alert พิเศษ: Range INR ยอมรับได้ -->
                    <div id="wf-acceptable-alert" class="hidden bg-emerald-50 border border-emerald-300 text-emerald-800 p-2.5 rounded-xl text-xs font-semibold text-center animate-fade-in">
                        <i class="fa-solid fa-circle-check text-emerald-600 mr-1.5"></i>
                        Range INR ที่ยอมรับได้ ไม่จำเป็นต้องปรับขนาดยา
                    </div>

                    <!-- ตารางช่วยตัดสินใจ -->
                    <div class="overflow-x-auto border border-slate-300 rounded-2xl bg-white shadow-xs">
                        <table class="w-full text-[11px] text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-800 text-white font-semibold text-center border-b border-slate-700">
                                    <th id="wf-th-inr" class="p-2 border-r border-slate-700 w-1/4">INR วันนี้</th>
                                    <th class="p-2 border-r border-slate-700">Suggestion</th>
                                    <th class="p-2 border-r border-slate-700 w-16">Low</th>
                                    <th class="p-2 w-16">High</th>
                                </tr>
                            </thead>
                            <tbody id="wf-table-body" class="divide-y divide-slate-200 font-medium">
                                <!-- Render via JS -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Note ใต้ตาราง -->
                    <p class="text-[10px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <strong class="text-rose-600">Note:</strong> case VHD, Metallic valve ไม่แนะนำ/หลีกเลี่ยงการให้ Vit. K กรณี INR prolong หรือ Minor bleeding เสี่ยง Thrombotic แนะนำ Hold ยาแล้ว F/U อย่างเดียว กรณี INR labile มาก ๆ ให้ Refer กลับสงขลา
                    </p>
                </div>

                <!-- กล่อง Input 2 -->
                <div class="bg-white/90 backdrop-blur-sm border border-slate-300 rounded-3xl p-5 shadow-sm space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
                            <i class="fa-solid fa-pen-to-square text-teal-600"></i>
                            การบริหารยาครั้งต่อไป (Input 2)
                        </h3>
                        <button id="wf-btn-reset-2" class="text-xs text-slate-500 hover:text-rose-600 underline flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-rotate-left"></i> Reset
                        </button>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">ขนาดยาใหม่ที่ต้องการสั่งใช้ (mg/wk)</label>
                        <div class="flex items-center gap-2">
                            <button id="wf-dose2-dec" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-slate-700 transition-all cursor-pointer">-</button>
                            <input type="number" id="wf-dose-new" step="0.5" placeholder="0" class="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-center font-bold text-slate-800 text-sm focus:outline-none focus:border-teal-500">
                            <button id="wf-dose2-inc" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-slate-700 transition-all cursor-pointer">+</button>
                            <span id="wf-pct-display" class="text-xs font-bold px-2.5 py-2 bg-slate-100 border border-slate-200 rounded-xl min-w-[75px] text-center text-slate-600"></span>
                        </div>
                    </div>

                    <!-- เตือนเมื่อขนาดยาไม่ตรงตาม Suggestion -->
                    <div id="wf-warning-alert" class="hidden bg-rose-50 border border-rose-300 text-rose-700 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
                        <i class="fa-solid fa-triangle-exclamation text-rose-600 text-sm"></i>
                        <span>กรุณาตรวจสอบและยืนยันขนาดยาที่สั่งใช้อีกครั้ง</span>
                    </div>
                </div>

            </div>

            <!-- ฝั่งขวา: Schedule & Tablet Pattern Recommendation (60% -> lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-5">
                <div class="bg-white/90 backdrop-blur-sm border border-slate-300 rounded-3xl p-5 shadow-sm space-y-5">
                    
                    <div class="border-b border-slate-200 pb-3">
                        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2 mb-2">
                            <i class="fa-solid fa-tablets text-teal-600"></i>
                            ทางเลือกรูปแบบการรับประทานยาประจำสัปดาห์
                        </h3>
                        
                        <!-- Checkbox เลือกเม็ดยาที่มี -->
                        <div class="flex flex-wrap items-center gap-3 pt-1">
                            <span class="text-xs font-semibold text-slate-600">ขนาดยาที่มีใช้:</span>
                            
                            <label class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-orange-200 bg-orange-50 text-orange-800 text-xs font-bold cursor-pointer select-none">
                                <input type="checkbox" id="wf-has-2" checked class="w-3.5 h-3.5 text-orange-500 rounded border-slate-300 focus:ring-orange-400">
                                <span class="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span> 2 mg (สีส้ม)
                            </label>

                            <label class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-sky-200 bg-sky-50 text-sky-800 text-xs font-bold cursor-pointer select-none">
                                <input type="checkbox" id="wf-has-3" checked class="w-3.5 h-3.5 text-sky-500 rounded border-slate-300 focus:ring-sky-400">
                                <span class="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span> 3 mg (สีฟ้า)
                            </label>

                            <label class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-pink-200 bg-pink-50 text-pink-800 text-xs font-bold cursor-pointer select-none">
                                <input type="checkbox" id="wf-has-5" checked class="w-3.5 h-3.5 text-pink-500 rounded border-slate-300 focus:ring-pink-400">
                                <span class="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block"></span> 5 mg (สีชมพู)
                            </label>
                        </div>
                    </div>

                    <!-- แสดงผลตารางแนะนำรูปแบบการกินยา -->
                    <div id="wf-schedules-container" class="space-y-4">
                        <div class="text-center py-10 text-slate-400 text-xs font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            กรอกขนาดยาใหม่ในช่อง Input 2 เพื่อประมวลผลตารางตารางกินยาประจำสัปดาห์
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `;

    // Elements & State Variables
    const doseOldInput = container.querySelector('#wf-dose-old');
    const inrTodayInput = container.querySelector('#wf-inr-today');
    const targetHighCb = container.querySelector('#wf-target-high');
    const tableBody = container.querySelector('#wf-table-body');
    const acceptableAlert = container.querySelector('#wf-acceptable-alert');
    
    const doseNewInput = container.querySelector('#wf-dose-new');
    const pctDisplay = container.querySelector('#wf-pct-display');
    const warningAlert = container.querySelector('#wf-warning-alert');

    const cbHas2 = container.querySelector('#wf-has-2');
    const cbHas3 = container.querySelector('#wf-has-3');
    const cbHas5 = container.querySelector('#wf-has-5');
    const schedulesContainer = container.querySelector('#wf-schedules-container');

    // Key Rules Config
    const RULES_NORMAL = [
        { minINR: 0, maxINR: 1.5, inrLabel: '< 1.5', sug: 'Increase 10-20%', lowMult: 1.1, highMult: 1.2, pctLow: 10, pctHigh: 20 },
        { minINR: 1.5, maxINR: 2.0, inrLabel: '1.5 - <2', sug: 'Increase 5-10%', lowMult: 1.05, highMult: 1.1, pctLow: 5, pctHigh: 10 },
        { minINR: 2.0, maxINR: 3.0, inrLabel: '2.0-3.0', sug: 'Continue same dose', lowMult: 1.0, highMult: 1.0, pctLow: 0, pctHigh: 0 },
        { minINR: 3.0, maxINR: 4.0, inrLabel: '> 3 - < 4', sug: 'Decrease 5-10%', lowMult: 0.9, highMult: 0.95, pctLow: -10, pctHigh: -5 },
        { minINR: 4.0, maxINR: 5.0, inrLabel: '4 - < 5', sug: 'Hold for 1 day then decrease 10% to..', lowMult: 0.9, highMult: 0.95, pctLow: -10, pctHigh: -5 },
        { minINR: 5.0, maxINR: 99, inrLabel: '5 - 8.9+ no bleeding', sug: 'Omit 1-2 doses, Vit K1 1 mg PO then dec 10-20% to..', lowMult: 0.8, highMult: 0.9, pctLow: -20, pctHigh: -10 }
    ];

    const RULES_HIGH = [
        { minINR: 0, maxINR: 2.0, inrLabel: '< 2', sug: 'Increase 10-20%', lowMult: 1.1, highMult: 1.2, pctLow: 10, pctHigh: 20 },
        { minINR: 2.0, maxINR: 2.5, inrLabel: '2 - <2.5', sug: 'Increase 5-10%', lowMult: 1.05, highMult: 1.1, pctLow: 5, pctHigh: 10 },
        { minINR: 2.5, maxINR: 3.5, inrLabel: '2.5 - 3.5', sug: 'Continue same dose', lowMult: 1.0, highMult: 1.0, pctLow: 0, pctHigh: 0 },
        { minINR: 3.5, maxINR: 4.0, inrLabel: '>3.5 - 4', sug: 'Decrease 5-10%', lowMult: 0.9, highMult: 0.95, pctLow: -10, pctHigh: -5 },
        { minINR: 4.0, maxINR: 4.5, inrLabel: '>4 - 4.5', sug: 'Hold for 1 day then decrease 10% to..', lowMult: 0.9, highMult: 0.95, pctLow: -10, pctHigh: -5 },
        { minINR: 4.5, maxINR: 99, inrLabel: '> 4.5', sug: 'Omit 1-2 doses, Vit K1 1 mg PO then dec 10-20% to..', lowMult: 0.8, highMult: 0.9, pctLow: -20, pctHigh: -10 }
    ];

    // Helper Functions
    function parseNum(val) {
        const n = parseFloat(val);
        return isNaN(n) ? null : n;
    }

    // 1. Render Table & Check Limits
    function updateInput1Logic() {
        const doseOld = parseNum(doseOldInput.value);
        const inrToday = parseNum(inrTodayInput.value);
        const isHighTarget = targetHighCb.checked;
        const rules = isHighTarget ? RULES_HIGH : RULES_NORMAL;

        // Render Table Rows
        tableBody.innerHTML = '';
        let matchedRule = null;

        rules.forEach(rule => {
            let isMatched = false;
            if (inrToday !== null && inrToday > 0) {
                if (rule.maxINR === 99) {
                    if (inrToday >= rule.minINR) isMatched = true;
                } else if (rule.minINR === 0) {
                    if (inrToday < rule.maxINR) isMatched = true;
                } else {
                    if (inrToday >= rule.minINR && inrToday <= rule.maxINR) isMatched = true;
                }
            }

            if (isMatched) matchedRule = rule;

            let lowValText = '-';
            let highValText = '-';

            if (doseOld !== null && doseOld > 0) {
                if (rule.sug === 'Continue same dose') {
                    highValText = doseOld.toFixed(1);
                } else {
                    lowValText = (doseOld * rule.lowMult).toFixed(1);
                    highValText = (doseOld * rule.highMult).toFixed(1);
                }
            }

            const tr = document.createElement('tr');
            tr.className = isMatched 
                ? 'bg-amber-100/90 text-amber-950 font-bold border-l-4 border-amber-500 transition-all' 
                : 'hover:bg-slate-50 transition-all';

            tr.innerHTML = `
                <td class="p-2 border-r border-slate-200 text-center font-bold">${rule.inrLabel}</td>
                <td class="p-2 border-r border-slate-200 leading-tight">${rule.sug}</td>
                <td class="p-2 border-r border-slate-200 text-center text-teal-700 font-bold">${lowValText}</td>
                <td class="p-2 text-center text-teal-700 font-bold">${highValText}</td>
            `;
            tableBody.appendChild(tr);
        });

        // Acceptable Alert Check
        if (inrToday !== null && inrToday > 0) {
            const isAcceptable = isHighTarget 
                ? (inrToday >= 2.3 && inrToday <= 3.7) 
                : (inrToday >= 1.8 && inrToday <= 3.2);
            
            if (isAcceptable) acceptableAlert.classList.remove('hidden');
            else acceptableAlert.classList.add('hidden');
        } else {
            acceptableAlert.classList.add('hidden');
        }

        updateInput2Logic(matchedRule);
    }

    // 2. Compute Input 2 & Verification
    function updateInput2Logic(currentMatchedRule) {
        const doseOld = parseNum(doseOldInput.value);
        const doseNew = parseNum(doseNewInput.value);

        if (doseOld === null || doseOld <= 0 || doseNew === null || doseNew <= 0) {
            pctDisplay.textContent = '- %';
            pctDisplay.className = 'text-xs font-bold px-2.5 py-2 bg-slate-100 border border-slate-200 rounded-xl min-w-[75px] text-center text-slate-600';
            warningAlert.classList.add('hidden');
            generateSchedulePatterns(null);
            return;
        }

        const pct = ((doseNew - doseOld) / doseOld) * 100;
        let pctStr = '';

        if (Math.abs(pct) < 0.001) {
            pctStr = '- %';
            pctDisplay.className = 'text-xs font-bold px-2.5 py-2 bg-slate-100 border border-slate-200 rounded-xl min-w-[75px] text-center text-slate-600';
        } else {
            const sign = pct > 0 ? '+' : '';
            pctStr = `< ${sign}${pct.toFixed(2)}% >`;
            pctDisplay.className = pct > 0 
                ? 'text-xs font-bold px-2.5 py-2 bg-emerald-100 border border-emerald-300 rounded-xl min-w-[75px] text-center text-emerald-800' 
                : 'text-xs font-bold px-2.5 py-2 bg-rose-100 border border-rose-300 rounded-xl min-w-[75px] text-center text-rose-800';
        }
        pctDisplay.textContent = pctStr;

        // Verify against rule limits
        let isDoseValid = true;
        if (currentMatchedRule) {
            const lowDose = currentMatchedRule.sug === 'Continue same dose' ? doseOld : doseOld * currentMatchedRule.lowMult;
            const highDose = currentMatchedRule.sug === 'Continue same dose' ? doseOld : doseOld * currentMatchedRule.highMult;

            // Check if doseNew is in range (with rounding tolerance)
            const roundDoseNew = Math.round(doseNew * 10) / 10;
            const roundLow = Math.round(lowDose * 10) / 10;
            const roundHigh = Math.round(highDose * 10) / 10;

            const isDoseInRange = (roundDoseNew >= Math.min(roundLow, roundHigh) - 0.05) && 
                                  (roundDoseNew <= Math.max(roundLow, roundHigh) + 0.05);

            // Check % range
            const minPct = Math.min(currentMatchedRule.pctLow, currentMatchedRule.pctHigh);
            const maxPct = Math.max(currentMatchedRule.pctLow, currentMatchedRule.pctHigh);
            const isPctInRange = (pct >= minPct - 0.5) && (pct <= maxPct + 0.5);

            if (!isDoseInRange && !isPctInRange) {
                isDoseValid = false;
            }
        }

        if (!isDoseValid) {
            warningAlert.classList.remove('hidden');
        } else {
            warningAlert.classList.add('hidden');
        }

        generateSchedulePatterns(doseNew);
    }

    // 3. Tablet Render Helper (Circle SVG/HTML)
    function renderTabletUI(mg) {
        if (mg === 0) return `<span class="text-slate-300 font-bold">-</span>`;
        
        let colorBg = '';
        let label = '';
        let isHalf = false;

        if (mg === 2) { colorBg = 'bg-orange-500'; label = '2'; }
        else if (mg === 1) { colorBg = 'bg-orange-500'; label = '1'; isHalf = true; }
        else if (mg === 3) { colorBg = 'bg-sky-500'; label = '3'; }
        else if (mg === 1.5) { colorBg = 'bg-sky-500'; label = '1.5'; isHalf = true; }
        else if (mg === 5) { colorBg = 'bg-pink-500'; label = '5'; }
        else if (mg === 2.5) { colorBg = 'bg-pink-500'; label = '2.5'; isHalf = true; }

        if (isHalf) {
            return `
                <div class="flex flex-col items-center justify-center gap-0.5">
                    <div class="w-7 h-7 rounded-full ${colorBg} text-white text-[10px] font-bold flex items-center justify-center shadow-xs relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-1/2 h-full bg-black/25"></div>
                        <span class="z-10">${label}</span>
                    </div>
                    <span class="text-[9px] text-slate-500 font-semibold">ครึ่งเม็ด</span>
                </div>
            `;
        }

        return `
            <div class="flex flex-col items-center justify-center gap-0.5">
                <div class="w-7 h-7 rounded-full ${colorBg} text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    <span>${label}</span>
                </div>
                <span class="text-[9px] text-slate-600 font-semibold">${label}mg</span>
            </div>
        `;
    }

    function renderDayCell(dailyDoseCombo) {
        if (!dailyDoseCombo || dailyDoseCombo.length === 0) {
            return `<div class="p-2 text-center text-slate-300">-</div>`;
        }
        return `
            <div class="p-1.5 flex flex-wrap items-center justify-center gap-1 min-h-[52px] bg-white rounded-xl border border-slate-100 shadow-2xs">
                ${dailyDoseCombo.map(mg => renderTabletUI(mg)).join('')}
            </div>
        `;
    }

    // 4. Pattern Generator Engine
    function generateSchedulePatterns(targetWeeklyDose) {
        if (!targetWeeklyDose || targetWeeklyDose <= 0) {
            schedulesContainer.innerHTML = `
                <div class="text-center py-10 text-slate-400 text-xs font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    กรอกขนาดยาใหม่ในช่อง Input 2 เพื่อประมวลผลตารางตารางกินยาประจำสัปดาห์
                </div>`;
            return;
        }

        const availMgs = [];
        if (cbHas2.checked) { availMgs.push(2); availMgs.push(1); }
        if (cbHas3.checked) { availMgs.push(3); availMgs.push(1.5); }
        if (cbHas5.checked) { availMgs.push(5); availMgs.push(2.5); }

        if (availMgs.length === 0) {
            schedulesContainer.innerHTML = `
                <div class="text-center py-8 text-rose-500 text-xs font-semibold bg-rose-50 rounded-2xl border border-rose-200">
                    กรุณาเลือกขนาดยาอย่างน้อย 1 ขนาดเพื่อคำนวณตาราง
                </div>`;
            return;
        }

        // Possible daily doses from available mg (max 2 pills per day rule)
        // Allow combinations like: 0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 7.5, 10...
        const dailyCombos = []; // { total: number, items: number[] }
        
        // Single dose / half
        availMgs.forEach(m => dailyCombos.push({ total: m, items: [m] }));
        
        // Combination of 2 doses (max 2 pills)
        for (let i = 0; i < availMgs.length; i++) {
            for (let j = i; j < availMgs.length; j++) {
                const sum = availMgs[i] + availMgs[j];
                if (sum <= 10) {
                    dailyCombos.push({ total: sum, items: [availMgs[i], availMgs[j]] });
                }
            }
        }
        
        // Add 0 mg option
        dailyCombos.push({ total: 0, items: [] });

        // Filter duplicates
        const uniqueCombosMap = new Map();
        dailyCombos.forEach(c => {
            const key = c.total.toFixed(1) + '_' + [...c.items].sort().join('-');
            if (!uniqueCombosMap.has(key)) {
                uniqueCombosMap.set(key, c);
            }
        });
        const validDailyOptions = Array.from(uniqueCombosMap.values());

        // Find 7-day schedules that sum to targetWeeklyDose
        const validSchedules = [];

        // Generate combinations using two daily dose levels (e.g., High day & Low day) to ensure symmetry
        for (let a = 0; a < validDailyOptions.length; a++) {
            for (let b = a; b < validDailyOptions.length; b++) {
                const doseA = validDailyOptions[a];
                const doseB = validDailyOptions[b];

                // Try count of doseA days from 7 down to 0
                for (let countA = 7; countA >= 0; countA--) {
                    const countB = 7 - countA;
                    const totalDose = (countA * doseA.total) + (countB * doseB.total);

                    if (Math.abs(totalDose - targetWeeklyDose) < 0.05) {
                        // Distribute days evenly starting from Monday
                        const days = new Array(7);
                        if (countA === 7) {
                            days.fill(doseA);
                        } else if (countB === 7) {
                            days.fill(doseB);
                        } else {
                            // Pattern distribution (e.g., weekend adjustment or alternating)
                            if (countB === 2) {
                                // Mon-Fri = A, Sat-Sun = B
                                days[0]=doseA; days[1]=doseA; days[2]=doseA; days[3]=doseA; days[4]=doseA; days[5]=doseB; days[6]=doseB;
                            } else if (countA === 2) {
                                days[0]=doseB; days[1]=doseB; days[2]=doseB; days[3]=doseB; days[4]=doseB; days[5]=doseA; days[6]=doseA;
                            } else {
                                // General distribution
                                let addedA = 0;
                                for (let d = 0; d < 7; d++) {
                                    if (addedA < countA) {
                                        days[d] = doseA;
                                        addedA++;
                                    } else {
                                        days[d] = doseB;
                                    }
                                }
                            }
                        }

                        // Calculate Penalty Score for Ranking
                        // 1. Single strength used across week (highest priority)
                        const allUsedStrengths = new Set();
                        days.forEach(d => d.items.forEach(it => {
                            const baseMg = (it === 1) ? 2 : (it === 1.5) ? 3 : (it === 2.5) ? 5 : it;
                            allUsedStrengths.add(baseMg);
                        }));
                        const strengthCountPenalty = allUsedStrengths.size * 100;

                        // 2. Halving penalty (prefer whole pills)
                        let halfPillCount = 0;
                        days.forEach(d => d.items.forEach(it => {
                            if ([1, 1.5, 2.5].includes(it)) halfPillCount++;
                        }));
                        const halfPenalty = halfPillCount * 10;

                        // 3. Max pill count per day penalty
                        let totalPillCount = 0;
                        days.forEach(d => totalPillCount += d.items.length);

                        const totalScore = strengthCountPenalty + halfPenalty + totalPillCount;

                        // Deduplicate schedule pattern
                        const schedSignature = days.map(d => d.total).join('-');
                        if (!validSchedules.some(s => s.signature === schedSignature)) {
                            validSchedules.push({
                                days,
                                score: totalScore,
                                signature: schedSignature,
                                usedStrengthCount: allUsedStrengths.size,
                                halfPillCount
                            });
                        }
                    }
                }
            }
        }

        // Sort schedules by priority score
        validSchedules.sort((a, b) => a.score - b.score);

        // Take top 5
        const topSchedules = validSchedules.slice(0, 5);

        if (topSchedules.length === 0) {
            schedulesContainer.innerHTML = `
                <div class="text-center py-8 text-amber-700 text-xs font-semibold bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <p><i class="fa-solid fa-circle-exclamation text-amber-600 mr-1"></i> ไม่สามารถจัดรูปแบบเม็ดยาให้พอดีกับ ${targetWeeklyDose.toFixed(1)} mg/wk ได้</p>
                    <p class="text-[11px] font-normal text-amber-600">ลองเปิดเลือกขนาดยาเพิ่ม หรือปรับเพิ่ม/ลด ขนาดยาครั้งละ 0.5 - 1 mg/wk</p>
                </div>`;
            return;
        }

        // Render Top Schedules
        schedulesContainer.innerHTML = topSchedules.map((sched, idx) => `
            <div class="bg-slate-50 border border-slate-300 rounded-2xl p-4 space-y-2 shadow-2xs hover:border-teal-500 transition-all">
                <div class="flex items-center justify-between text-xs border-b border-slate-200 pb-2">
                    <span class="font-bold text-teal-800 flex items-center gap-1.5">
                        <span class="w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">${idx + 1}</span>
                        รูปแบบที่ ${idx + 1}
                    </span>
                    <span class="text-[11px] text-slate-500">
                        ${sched.usedStrengthCount === 1 ? '✨ ใช้ยาขนาดเดียว' : 'ผสมขนาดยา'} 
                        ${sched.halfPillCount === 0 ? '• ไม่ต้องหักเม็ด' : `• หักครึ่งเม็ด ${sched.halfPillCount} วัน`}
                    </span>
                </div>

                <!-- Table Grid 8x2 -->
                <div class="overflow-x-auto">
                    <table class="w-full text-center text-xs border-collapse">
                        <thead>
                            <tr class="text-[11px] font-bold text-slate-600 border-b border-slate-200">
                                <th class="py-1 px-2 text-left w-20">Dose/wk</th>
                                <th class="py-1">จ</th>
                                <th class="py-1">อ</th>
                                <th class="py-1">พ</th>
                                <th class="py-1">พฤ</th>
                                <th class="py-1">ศ</th>
                                <th class="py-1">ส</th>
                                <th class="py-1">อา</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="py-2 px-2 text-left font-black text-slate-800 text-sm">
                                    ${targetWeeklyDose.toFixed(1)}
                                </td>
                                ${sched.days.map(d => `<td class="py-1 px-0.5">${renderDayCell(d.items)}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `).join('');
    }

    // Event Listeners & Step Logic
    
    // Key Enter Navigation
    doseOldInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            inrTodayInput.focus();
        }
    });

    inrTodayInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            doseNewInput.focus();
        }
    });

    // Plus/Minus Buttons Dose 1
    container.querySelector('#wf-dose1-dec').addEventListener('click', () => {
        let val = parseNum(doseOldInput.value) || 0;
        val = Math.max(0, val - 0.5);
        doseOldInput.value = val === 0 ? '' : val.toFixed(1);
        updateInput1Logic();
    });

    container.querySelector('#wf-dose1-inc').addEventListener('click', () => {
        let val = parseNum(doseOldInput.value) || 0;
        val += 0.5;
        doseOldInput.value = val.toFixed(1);
        updateInput1Logic();
    });

    // Plus/Minus Buttons Dose 2
    container.querySelector('#wf-dose2-dec').addEventListener('click', () => {
        let val = parseNum(doseNewInput.value) || 0;
        val = Math.max(0, val - 1.0);
        doseNewInput.value = val === 0 ? '' : val.toFixed(1);
        updateInput1Logic();
    });

    container.querySelector('#wf-dose2-inc').addEventListener('click', () => {
        let val = parseNum(doseNewInput.value) || 0;
        val += 1.0;
        doseNewInput.value = val.toFixed(1);
        updateInput1Logic();
    });

    // Reset Buttons
    container.querySelector('#wf-btn-reset-1').addEventListener('click', () => {
        doseOldInput.value = '';
        inrTodayInput.value = '';
        targetHighCb.checked = false;
        updateInput1Logic();
    });

    container.querySelector('#wf-btn-reset-2').addEventListener('click', () => {
        doseNewInput.value = '';
        updateInput1Logic();
    });

    // Change Events
    doseOldInput.addEventListener('input', updateInput1Logic);
    inrTodayInput.addEventListener('input', updateInput1Logic);
    targetHighCb.addEventListener('change', updateInput1Logic);
    doseNewInput.addEventListener('input', updateInput1Logic);

    cbHas2.addEventListener('change', updateInput1Logic);
    cbHas3.addEventListener('change', updateInput1Logic);
    cbHas5.addEventListener('change', updateInput1Logic);

    // Initial Trigger
    updateInput1Logic();
}
