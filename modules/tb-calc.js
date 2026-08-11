export function render(container) {
    container.innerHTML = `
        <style>
            /* ซ่อน Spin Button ลูกศรขึ้น-ลงดั้งเดิมของเบราว์เซอร์ */
            input[type=number]::-webkit-inner-spin-button, 
            input[type=number]::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }
            input[type=number] {
                -moz-appearance: textfield;
            }
        </style>

        <div class="flex flex-col lg:flex-row gap-6 items-start">
            
            <!-- ฝั่งซ้าย: Input Sidebar ทรงแคบ Modern + External Links -->
            <div class="w-full lg:w-72 bg-[#0f172a] text-white rounded-3xl p-5 shadow-xl flex-shrink-0 space-y-6 border border-slate-800">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center">
                            <!-- Clean Lungs Icon -->
                            <svg class="w-5 h-5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 3v10" />
                                <path d="M12 7c-2-2.5-5-3-7-1.5S3 11 4.5 14.5 8.5 18 10.5 15V10" />
                                <path d="M12 7c2-2.5 5-3 7-1.5S21 11 19.5 14.5 15.5 18 13.5 15V10" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-base leading-tight text-white">TB Calc</h3>
                            <p class="text-[10px] text-slate-400">คำนวณขนาดยาวัณโรค</p>
                        </div>
                    </div>
                    <!-- ปุ่ม Reset Input -->
                    <button id="tb-reset-btn" class="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        Reset
                    </button>
                </div>

                <!-- UI ช่องกรอกน้ำหนักตัวแบบ Modern กลมกลืน พร้อมปุ่ม Stepper - / + -->
                <div class="space-y-2">
                    <label class="text-xs text-slate-300 block">น้ำหนักตัว (kg)</label>
                    <div class="relative flex items-center bg-slate-900/90 border border-slate-700 rounded-2xl p-1.5 focus-within:border-teal-500 transition-colors">
                        <!-- ปุ่มลดน้ำหนัก -1 kg -->
                        <button id="btn-dec-weight" class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-normal text-lg transition-colors active:scale-95 flex-shrink-0">
                            -
                        </button>
                        
                        <!-- Input ตัวเลข -->
                        <div class="flex-1 flex items-center justify-center px-2">
                            <input type="number" id="tb-weight" min="0" max="200" step="0.1" placeholder="0" 
                                class="w-full bg-transparent text-center text-3xl font-normal text-teal-400 focus:outline-none tracking-wide">
                            <span class="text-xs text-slate-400 -ml-2 pointer-events-none">kg</span>
                        </div>

                        <!-- ปุ่มเพิ่มน้ำหนัก +1 kg -->
                        <button id="btn-inc-weight" class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-normal text-lg transition-colors active:scale-95 flex-shrink-0">
                            +
                        </button>
                    </div>
                </div>

                <!-- Checkbox eGFR < 30 -->
                <div class="pt-2 border-t border-slate-800">
                    <label class="flex items-center gap-3 p-3 bg-slate-900/50 rounded-2xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-all">
                        <input type="checkbox" id="tb-egfr" class="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-900 bg-slate-800 border-slate-700">
                        <div class="flex flex-col">
                            <span class="text-xs font-medium text-slate-200">eGFR &lt; 30 ml/min</span>
                            <span class="text-[10px] text-amber-400/90">ปรับคำแนะนำการให้ยา</span>
                        </div>
                    </label>
                </div>

                <!-- ส่วน External Tools (เครื่องมืออื่นๆ) -->
                <div class="pt-3 border-t border-slate-800 space-y-2">
                    <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Clinical Tools</span>
                    
                    <a href="https://rx-yrih-ntp-2021-tpt-2023-pmdt-2024-583480923268.us-west1.run.app/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="group flex items-center justify-between p-3 bg-slate-900/80 hover:bg-teal-950/40 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition-all duration-200">
                        <div class="flex flex-col pr-2">
                            <span class="text-xs font-bold text-teal-400 group-hover:text-teal-300 leading-snug">PHARMYARING</span>
                            <span class="text-[10px] text-slate-400 group-hover:text-slate-300">TB Clinical Assistant</span>
                        </div>
                        <div class="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-teal-500/20 text-slate-400 group-hover:text-teal-300 flex items-center justify-center flex-shrink-0 transition-colors">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </div>
                    </a>
                </div>

            </div>

            <!-- ฝั่งขวา: ตารางผลลัพธ์ขนาดยา -->
            <div class="flex-1 w-full bg-white/80 backdrop-blur-sm border border-slate-300 rounded-3xl p-5 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr class="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th class="py-2.5 px-3 w-[32%] align-bottom">ชื่อยา</th>
                                <th class="py-2.5 px-3 w-[18%] text-right align-bottom">ขนาดยา<br>โดยประมาณ</th>
                                <th class="py-2.5 px-3 w-[15%] text-right align-bottom">ขนาดยา<br>ต่ำ</th>
                                <th class="py-2.5 px-3 w-[15%] text-right align-bottom">ขนาดยา<br>สูง</th>
                                <th class="py-2.5 px-3 w-[20%] text-center align-bottom">NOTE</th>
                            </tr>
                        </thead>
                        <tbody id="tb-table-body" class="divide-y divide-slate-100 text-sm">
                            <!-- JS เรนเดอร์ข้อมูล -->
                        </tbody>
                    </table>
                </div>

                <!-- เชิงอรรถท้ายตาราง -->
                <div class="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                    <p class="text-rose-600 font-medium">* Ofloxacin (O) ไม่ค่อยแนะนำให้ใช้ในแนวทางการรักษาปัจจุบัน</p>
                    <p>* หมายเหตุอ้างอิงขนาดเฉลี่ย: I 5 mg/kg | R 10 mg/kg | Z 25 mg/kg | E 15 mg/kg | S 15 mg/kg | L 750 mg/day | O 10 mg/kg</p>
                    <p>* หน่วยคำนวณทั้งหมดเป็น มิลลิกรัม/วัน (mg/day)</p>
                </div>
            </div>

        </div>
    `;

    // รายการยา + ช่วงขนาดยาภาษาอังกฤษ
    const drugs = [
        { code: 'I', name: 'Isoniazid', range: '4-6 mg/kg/day', std: 5, min: 4, max: 6, maxCap: 300, egfrNote: 'ไม่ต้องปรับขนาดยา', isNoChange: true },
        { code: 'R', name: 'Rifampicin', range: '8-12 mg/kg/day', std: 10, min: 8, max: 12, maxCap: 600, egfrNote: 'ไม่ต้องปรับขนาดยา', isNoChange: true },
        { code: 'Z', name: 'Pyrazinamide', range: '20-30 mg/kg/day', std: 25, min: 20, max: 30, maxCap: 2000, egfrNote: '3 ครั้ง/สัปดาห์' },
        { code: 'E', name: 'Ethambutol', range: '15-20 mg/kg/day', std: 15, min: 15, max: 20, maxCap: 1500, egfrNote: '3 ครั้ง/สัปดาห์' },
        { code: 'S', name: 'Streptomycin', range: '12-20 mg/kg/day', std: 15, min: 12, max: 20, maxCap: 1000, egfrNote: '2-3 ครั้ง/สัปดาห์' },
        { code: 'L', name: 'Levofloxacin', range: '750 mg/day', isFixed: true, fixedVal: 750, maxCap: 1000, egfrNote: '3 ครั้ง/สัปดาห์' },
        { code: 'O', name: 'Ofloxacin', range: '7.5-15 mg/kg/day', std: 10, min: 7.5, max: 15, maxCap: 800, isDisc: true, egfrNote: 'ไม่แนะนำให้ใช้ / ปรับโดส' }
    ];

    const weightInput = document.getElementById('tb-weight');
    const egfrCheckbox = document.getElementById('tb-egfr');
    const tableBody = document.getElementById('tb-table-body');
    const resetBtn = document.getElementById('tb-reset-btn');
    const btnInc = document.getElementById('btn-inc-weight');
    const btnDec = document.getElementById('btn-dec-weight');

    function formatNum(num) {
        if (num === null || num === undefined || isNaN(num)) return '-';
        return num.toLocaleString('en-US');
    }

    function calculate() {
        const w = parseFloat(weightInput.value) || 0;
        const isEgfrLow = egfrCheckbox.checked;

        tableBody.innerHTML = drugs.map(d => {
            let stdText = '-';
            let minText = '-';
            let maxText = '-';

            if (w > 0) {
                if (d.isFixed) {
                    stdText = `${formatNum(d.fixedVal)} mg`;
                    minText = `-`;
                    maxText = `${formatNum(d.maxCap)} mg`; // ตัดคำว่า "สูงสุด" ออกเรียบร้อย
                } else {
                    let stdCalc = Math.min(Math.round(w * d.std), d.maxCap);
                    let minCalc = Math.round(w * d.min);
                    let maxCalc = Math.min(Math.round(w * d.max), d.maxCap);

                    stdText = `${formatNum(stdCalc)} mg`;
                    minText = `${formatNum(minCalc)} mg`;
                    maxText = `${formatNum(maxCalc)} mg`;
                }
            }

            let egfrDisplay = '';
            if (isEgfrLow) {
                if (d.isNoChange) {
                    egfrDisplay = `<span class="text-xs text-slate-400 font-normal whitespace-nowrap">ไม่ต้องปรับขนาดยา</span>`;
                } else {
                    egfrDisplay = `<span class="inline-block bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap">${d.egfrNote}</span>`;
                }
            } else {
                egfrDisplay = '';
            }

            return `
                <tr class="hover:bg-slate-50/80 transition-colors">
                    <!-- คอลัมน์ 1: ตัวย่อใหญ่ขนาน 2 บรรทัดย่อย (บน = ช่วงขนาดยา / ล่าง = ชื่อเต็ม) -->
                    <td class="py-2 px-3">
                        <div class="flex items-center gap-3">
                            <div class="text-3xl font-extrabold text-teal-700 leading-none min-w-[24px] text-center">
                                ${d.code}${d.isDisc ? '<span class="text-xs text-rose-500 font-normal -ml-0.5">*</span>' : ''}
                            </div>
                            
                            <div class="flex flex-col justify-center leading-snug">
                                <span class="text-xs text-slate-500 font-normal">${d.range}</span>
                                <span class="text-sm text-slate-800 font-medium">${d.name}</span>
                            </div>
                        </div>
                    </td>

                    <td class="py-2 px-3 text-right font-semibold text-slate-800 text-base align-middle">
                        ${stdText}
                    </td>

                    <td class="py-2 px-3 text-right text-slate-500 font-normal align-middle">
                        ${minText}
                    </td>

                    <td class="py-2 px-3 text-right text-slate-500 font-normal align-middle">
                        ${maxText}
                    </td>

                    <td class="py-2 px-3 text-center align-middle">
                        ${egfrDisplay}
                    </td>
                </tr>
            `;
        }).join('');
    }

    btnInc.addEventListener('click', () => {
        let currentW = parseFloat(weightInput.value) || 0;
        weightInput.value = Math.round(currentW + 1);
        calculate();
    });

    btnDec.addEventListener('click', () => {
        let currentW = parseFloat(weightInput.value) || 0;
        if (currentW > 0) {
            weightInput.value = Math.max(0, Math.round(currentW - 1));
            calculate();
        }
    });

    weightInput.addEventListener('input', calculate);
    egfrCheckbox.addEventListener('change', calculate);

    resetBtn.addEventListener('click', () => {
        weightInput.value = '';
        egfrCheckbox.checked = false;
        calculate();
    });

    calculate();
}
