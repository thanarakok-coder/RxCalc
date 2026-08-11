export function render(container) {
    container.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-6 items-start">
            
            <!-- [B1] ฝั่งซ้าย: Input Sidebar ขนาดแคบ ทรงเดียวกับ Insulin Calc -->
            <div class="w-full lg:w-72 bg-[#0f172a] text-white rounded-3xl p-5 shadow-xl flex-shrink-0 space-y-6 border border-slate-800">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center">
                            <!-- [B2] Fixed Lungs Icon -->
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

                <!-- Input น้ำหนักตัว (Simple but BIG, ไม่เอาตัวหนาตามสั่ง) -->
                <div class="space-y-2">
                    <label class="text-xs text-slate-300 block">น้ำหนักตัว (kg)</label>
                    <div class="relative flex items-center">
                        <input type="number" id="tb-weight" min="0" max="200" step="0.1" placeholder="0" 
                            class="w-full bg-slate-900/90 border border-slate-700 rounded-2xl px-4 py-3 text-3xl font-normal text-teal-400 text-right focus:outline-none focus:border-teal-500 transition-colors tracking-wide">
                        <span class="absolute right-4 text-xs text-slate-400 pointer-events-none">kg</span>
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
            </div>

            <!-- [B5] ฝั่งขวา: ตารางผลลัพธ์ขนาดยา (5 คอลัมน์) -->
            <div class="flex-1 w-full bg-white/80 backdrop-blur-sm border border-slate-300 rounded-3xl p-5 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr class="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th class="py-3 px-3 w-1/5">ชื่อยา</th>
                                <th class="py-3 px-3 w-1/5 text-right">ขนาดยาโดยประมาณ</th>
                                <th class="py-3 px-3 w-1/5 text-right">ขนาดยาขนาดต่ำ</th>
                                <th class="py-3 px-3 w-1/5 text-right">ขนาดยาขนาดสูง</th>
                                <th class="py-3 px-3 w-1/5 text-center">คำแนะนำพิเศษ</th>
                            </tr>
                        </thead>
                        <tbody id="tb-table-body" class="divide-y divide-slate-100 text-sm">
                            <!-- JS จะเรนเดอร์แถวยาตรงนี้ -->
                        </tbody>
                    </table>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                    <p>* หมายเหตุอ้างอิงขนาดเฉลี่ย: I 5 mg/kg | R 10 mg/kg | Z 25 mg/kg | E 15 mg/kg | S 15 mg/kg | L 750 mg/day | O 10 mg/kg</p>
                    <p>* หน่วยคำนวณทั้งหมดเป็น มิลลิกรัม/วัน (mg/day)</p>
                </div>
            </div>

        </div>
    `;

    // รายการยา [B4] เอา [ ] ออกเรียบร้อยแล้ว
    const drugs = [
        { code: 'I', name: 'Isoniazid', std: 5, min: 4, max: 6, maxCap: 300, egfrNote: 'ไม่ต้องปรับขนาดยา' },
        { code: 'R', name: 'Rifampicin', std: 10, min: 8, max: 12, maxCap: 600, egfrNote: 'ไม่ต้องปรับขนาดยา' },
        { code: 'Z', name: 'Pyrazinamide', std: 25, min: 20, max: 30, maxCap: 2000, egfrNote: '25-35 mg/kg (3 ครั้ง/สัปดาห์)' },
        { code: 'E', name: 'Ethambutol', std: 15, min: 15, max: 20, maxCap: 1500, egfrNote: '15-25 mg/kg (3 ครั้ง/สัปดาห์)' },
        { code: 'S', name: 'Streptomycin', std: 15, min: 12, max: 20, maxCap: 1000, egfrNote: '12-15 mg/kg (2-3 ครั้ง/สัปดาห์)' },
        { code: 'L', name: 'Levofloxacin', isFixed: true, fixedVal: 750, maxCap: 1000, egfrNote: '750 mg (3 ครั้ง/สัปดาห์)' },
        { code: 'O', name: 'Ofloxacin', std: 10, min: 7.5, max: 15, maxCap: 800, isDisc: true, egfrNote: 'ไม่แนะนำให้ใช้ / ปรับโดส' }
    ];

    const weightInput = document.getElementById('tb-weight');
    const egfrCheckbox = document.getElementById('tb-egfr');
    const tableBody = document.getElementById('tb-table-body');
    const resetBtn = document.getElementById('tb-reset-btn');

    function calculate() {
        const w = parseFloat(weightInput.value) || 0;
        const isEgfrLow = egfrCheckbox.checked;

        tableBody.innerHTML = drugs.map(d => {
            let stdText = '-';
            let minText = '-';
            let maxText = '-';

            if (w > 0) {
                if (d.isFixed) {
                    stdText = `${d.fixedVal} mg`;
                    minText = `-`;
                    maxText = `สูงสุด ${d.maxCap} mg`;
                } else {
                    let stdCalc = Math.min(Math.round(w * d.std), d.maxCap);
                    let minCalc = Math.round(w * d.min);
                    let maxCalc = Math.min(Math.round(w * d.max), d.maxCap);

                    stdText = `${stdCalc} mg`;
                    minText = `${minCalc} mg`;
                    maxText = `${maxCalc} mg`;
                }
            }

            // คำแนะนำกรณี eGFR < 30
            let egfrDisplay = '-';
            if (isEgfrLow) {
                egfrDisplay = `<span class="inline-block bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium">${d.egfrNote}</span>`;
            } else {
                egfrDisplay = `<span class="text-slate-400 text-xs">ปกติ</span>`;
            }

            return `
                <tr class="hover:bg-slate-50/80 transition-colors">
                    <!-- Col 1: ชื่อยา (ตัวย่อใหญ่เด่น [ไม่มีวงเล็บ] + ชื่อเต็มสีอ่อนด้านล่าง) -->
                    <td class="py-3 px-3">
                        <div class="flex items-baseline gap-1.5">
                            <span class="text-2xl font-bold text-teal-700 leading-none">${d.code}</span>
                            ${d.isDisc ? '<span class="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-normal">ไม่ค่อยแนะนำ</span>' : ''}
                        </div>
                        <div class="text-xs text-slate-400 font-normal leading-tight mt-0.5">${d.name}</div>
                    </td>

                    <!-- Col 2: ขนาดยาโดยประมาณ -->
                    <td class="py-3 px-3 text-right font-semibold text-slate-800 text-base">
                        ${stdText}
                    </td>

                    <!-- Col 3: ขนาดยาขนาดต่ำ -->
                    <td class="py-3 px-3 text-right text-slate-500 font-normal">
                        ${minText}
                    </td>

                    <!-- Col 4: ขนาดยาขนาดสูง -->
                    <td class="py-3 px-3 text-right text-slate-500 font-normal">
                        ${maxText}
                    </td>

                    <!-- Col 5: คำแนะนำพิเศษ (eGFR) -->
                    <td class="py-3 px-3 text-center">
                        ${egfrDisplay}
                    </td>
                </tr>
            `;
        }).join('');
    }

    weightInput.addEventListener('input', calculate);
    egfrCheckbox.addEventListener('change', calculate);

    resetBtn.addEventListener('click', () => {
        weightInput.value = '';
        egfrCheckbox.checked = false;
        calculate();
    });

    // แสดงผลตั้งต้น
    calculate();
}
