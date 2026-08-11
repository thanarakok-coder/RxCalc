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

        <section id="page-tb" class="space-y-6">
            <div class="flex flex-col lg:flex-row gap-6 items-start">
                
                <!-- ฝั่งซ้าย: Input Sidebar สไตล์ M3 + Neo-Brutalism -->
                <div class="w-full lg:w-80 bg-slate-950 text-white rounded-3xl p-5 shadow-xl flex-shrink-0 space-y-6 border-4 border-slate-800">
                    
                    <!-- Header Sidebar -->
                    <div class="flex items-center justify-between pb-4 border-b border-slate-800">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-teal-500/20 text-teal-400 rounded-2xl border-2 border-teal-500/40 flex items-center justify-center flex-shrink-0">
                                <!-- Clean Lungs Icon -->
                                <svg class="w-6 h-6 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 3v10" />
                                    <path d="M12 7c-2-2.5-5-3-7-1.5S3 11 4.5 14.5 8.5 18 10.5 15V10" />
                                    <path d="M12 7c2-2.5 5-3 7-1.5S21 11 19.5 14.5 15.5 18 13.5 15V10" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-black text-lg leading-tight text-white">TB Calc</h3>
                                <p class="text-xs font-semibold text-slate-400">คำนวณขนาดยาวัณโรค</p>
                            </div>
                        </div>

                        <!-- ปุ่ม Reset Input -->
                        <button id="tb-reset-btn" class="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all border-2 border-slate-700 flex items-center gap-1.5 active:scale-95">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                            <span>Reset</span>
                        </button>
                    </div>

                    <!-- UI ช่องกรอกน้ำหนักตัว พร้อมปุ่ม Stepper - / + -->
                    <div class="space-y-2">
                        <label class="text-sm font-black text-teal-300 block">น้ำหนักตัว (kg)</label>
                        <div class="relative flex items-center bg-slate-900 border-4 border-teal-500/60 rounded-2xl p-2 focus-within:border-teal-400 shadow-inner transition-colors">
                            <!-- ปุ่มลดน้ำหนัก -1 kg -->
                            <button id="btn-dec-weight" class="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-teal-600 text-white flex items-center justify-center font-black text-2xl transition-all active:scale-90 flex-shrink-0 border-2 border-slate-700">
                                -
                            </button>
                            
                            <!-- Input ตัวเลข -->
                            <div class="flex-1 flex items-center justify-center px-1">
                                <input type="number" id="tb-weight" min="0" max="200" step="0.1" placeholder="0" 
                                    class="w-full bg-transparent text-center text-3xl font-black text-teal-300 focus:outline-none tracking-wide">
                                <span class="text-xs font-bold text-slate-400 -ml-2 pointer-events-none">kg</span>
                            </div>

                            <!-- ปุ่มเพิ่มน้ำหนัก +1 kg -->
                            <button id="btn-inc-weight" class="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-teal-600 text-white flex items-center justify-center font-black text-2xl transition-all active:scale-90 flex-shrink-0 border-2 border-slate-700">
                                +
                            </button>
                        </div>
                    </div>

                    <!-- Checkbox eGFR < 30 -->
                    <div class="pt-2 border-t border-slate-800">
                        <label class="flex items-center gap-3 p-3.5 bg-slate-900/90 rounded-2xl border-2 border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all group">
                            <input type="checkbox" id="tb-egfr" class="w-5 h-5 rounded-md text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900 bg-slate-800 border-2 border-slate-600 cursor-pointer">
                            <div class="flex flex-col">
                                <span class="text-xs font-black text-slate-200 group-hover:text-amber-300 transition-colors">eGFR &lt; 30 ml/min</span>
                                <span class="text-[11px] font-bold text-amber-400/90">ปรับคำแนะนำการให้ยา</span>
                            </div>
                        </label>
                    </div>

                    <!-- ส่วน External Tools (เครื่องมืออื่นๆ) -->
                    <div class="pt-3 border-t border-slate-800 space-y-2.5">
                        <span class="text-[11px] font-black text-slate-400 uppercase tracking-wider block">Clinical Tools</span>
                        
                        <a href="https://rx-yrih-ntp-2021-tpt-2023-pmdt-2024-583480923268.us-west1.run.app/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="group flex items-center justify-between p-3.5 bg-slate-900 hover:bg-teal-950/60 rounded-2xl border-2 border-slate-800 hover:border-teal-400 transition-all duration-200 shadow-md">
                            <div class="flex flex-col pr-2">
                                <span class="text-xs font-black text-teal-400 group-hover:text-teal-300 leading-snug">PHARMYARING</span>
                                <span class="text-[10px] font-bold text-slate-400 group-hover:text-slate-200">TB Clinical Assistant</span>
                            </div>
                            <div class="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-teal-500/30 text-slate-300 group-hover:text-teal-300 flex items-center justify-center flex-shrink-0 transition-colors border border-slate-700">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </div>
                        </a>
                    </div>

                </div>

                <!-- ฝั่งขวา: ตารางผลลัพธ์ขนาดยา สไตล์ M3 Cards Container -->
                <div class="flex-1 w-full bg-white rounded-3xl border-4 border-slate-800 p-5 md:p-6 shadow-xl overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse min-w-[620px]">
                            <thead>
                                <tr class="border-b-4 border-slate-800 text-slate-700 text-xs font-black uppercase tracking-wider">
                                    <th class="py-3 px-3 w-[34%] align-bottom">ชื่อยา</th>
                                    <th class="py-3 px-3 w-[18%] text-right align-bottom text-teal-800">ขนาดยา<br>โดยประมาณ</th>
                                    <th class="py-3 px-3 w-[14%] text-right align-bottom">ขนาดยา<br>ต่ำ</th>
                                    <th class="py-3 px-3 w-[14%] text-right align-bottom">ขนาดยา<br>สูง</th>
                                    <th class="py-3 px-3 w-[20%] text-center align-bottom">NOTE</th>
                                </tr>
                            </thead>
                            <tbody id="tb-table-body" class="divide-y-2 divide-slate-100 text-sm">
                                <!-- JS เรนเดอร์ข้อมูล -->
                            </tbody>
                        </table>
                    </div>

                    <!-- เชิงอรรถท้ายตาราง -->
                    <div class="mt-5 pt-4 border-t-2 border-slate-200 text-xs text-slate-600 font-semibold space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <p class="text-rose-600 font-bold">* Ofloxacin (O) ไม่ค่อยแนะนำให้ใช้ในแนวทางการรักษาปัจจุบัน</p>
                        <p>* หมายเหตุอ้างอิงขนาดเฉลี่ย: I 5 mg/kg | R 10 mg/kg | Z 25 mg/kg | E 15 mg/kg | S 15 mg/kg | L 750 mg/day | O 10 mg/kg</p>
                        <p>* หน่วยคำนวณทั้งหมดเป็น มิลลิกรัม/วัน (mg/day)</p>
                    </div>
                </div>

            </div>
        </section>
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

    const weightInput = container.querySelector('#tb-weight');
    const egfrCheckbox = container.querySelector('#tb-egfr');
    const tableBody = container.querySelector('#tb-table-body');
    const resetBtn = container.querySelector('#tb-reset-btn');
    const btnInc = container.querySelector('#btn-inc-weight');
    const btnDec = container.querySelector('#btn-dec-weight');

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
                    maxText = `${formatNum(d.maxCap)} mg`;
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
                    egfrDisplay = `<span class="text-xs text-slate-500 font-bold whitespace-nowrap">ไม่ต้องปรับขนาดยา</span>`;
                } else {
                    egfrDisplay = `<span class="inline-block bg-amber-100 border border-amber-300 text-amber-900 text-xs px-2.5 py-1 rounded-xl font-black whitespace-nowrap shadow-sm">${d.egfrNote}</span>`;
                }
            } else {
                egfrDisplay = '';
            }

            return `
                <tr class="hover:bg-teal-50/50 transition-colors">
                    <!-- คอลัมน์ 1: ตัวย่อใหญ่ขนาน 2 บรรทัดย่อย -->
                    <td class="py-3 px-3">
                        <div class="flex items-center gap-3">
                            <div class="text-3xl font-black text-teal-700 leading-none min-w-[28px] text-center">
                                ${d.code}${d.isDisc ? '<span class="text-xs text-rose-500 font-bold -ml-0.5">*</span>' : ''}
                            </div>
                            
                            <div class="flex flex-col justify-center leading-snug">
                                <span class="text-xs text-slate-500 font-semibold">${d.range}</span>
                                <span class="text-sm text-slate-900 font-bold">${d.name}</span>
                            </div>
                        </div>
                    </td>

                    <td class="py-3 px-3 text-right font-black text-teal-800 text-lg align-middle">
                        ${stdText}
                    </td>

                    <td class="py-3 px-3 text-right text-slate-600 font-bold align-middle">
                        ${minText}
                    </td>

                    <td class="py-3 px-3 text-right text-slate-600 font-bold align-middle">
                        ${maxText}
                    </td>

                    <td class="py-3 px-3 text-center align-middle">
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
