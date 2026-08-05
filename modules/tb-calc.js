/**
 * TB Dosing Calculator Module (TB-calc)
 */

export function render(container) {
    container.innerHTML = `
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

        <div class="max-w-6xl mx-auto space-y-4">
            
            <!-- Header Card -->
            <div class="bg-[#0f172a] text-white p-4 sm:p-5 rounded-3xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center text-2xl border border-amber-500/30 shrink-0">
                        <i class="fa-solid fa-pills"></i>
                    </div>
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-white leading-tight">TB Dosing Calculator</h2>
                        <p class="text-xs text-slate-400 font-normal">คำนวณขนาดยาวัณโรคตามน้ำหนักตัว (TB-calc)</p>
                    </div>
                </div>

                <!-- Checkbox eGFR < 30 -->
                <label class="flex items-center gap-3 bg-slate-800/90 hover:bg-slate-800 px-4 py-2.5 rounded-2xl border border-amber-500/50 hover:border-amber-400 cursor-pointer transition-all select-none">
                    <input type="checkbox" id="chk-egfr" class="w-5 h-5 accent-amber-500 rounded cursor-pointer">
                    <span class="text-sm font-semibold text-amber-300">eGFR &lt; 30 ml/min</span>
                </label>
            </div>

            <!-- Main Layout: Input (Left) + Table Output (Right) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                
                <!-- Input Body Weight (3 Cols) -->
                <div class="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <label class="block text-center font-bold text-slate-800 text-base">น้ำหนักตัว (BW)</label>
                    
                    <div class="relative">
                        <input type="number" id="tb-bw" step="0.01" min="0" placeholder="0" autofocus
                            class="w-full text-center text-4xl font-bold py-3 px-2 bg-slate-50 text-slate-900 border-2 border-amber-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-inner">
                    </div>
                    <p class="text-center text-xs font-semibold text-slate-400">หน่วย: กิโลกรัม (kg)</p>

                    <!-- Warning Alert when eGFR < 30 -->
                    <div id="egfr-warning-box" class="hidden p-3 bg-amber-50 border border-amber-400 text-amber-900 rounded-2xl text-xs text-center space-y-1 shadow-xs">
                        <div class="flex items-center justify-center gap-1.5 text-amber-700 font-semibold">
                            <i class="fa-solid fa-triangle-exclamation text-base"></i>
                            <span>คำเตือน eGFR &lt; 30</span>
                        </div>
                        <p class="text-[11px] leading-tight text-amber-800 font-normal">ปรับขนาดยา Z, E, S, L, O ให้เพียง <b>3 วัน/สัปดาห์</b></p>
                    </div>
                </div>

                <!-- Calculation Output Table (9 Cols) -->
                <div class="lg:col-span-9 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-[#0f172a] text-white text-xs sm:text-sm font-semibold border-b border-slate-800">
                                    <th class="p-3 text-center w-28">ตัวยา (Med)</th>
                                    <th class="p-3 text-center">ขนาดเฉลี่ย (Approx. dose)</th>
                                    <th class="p-3 text-center">ช่วงขนาดยา (Min - Max)</th>
                                    <th class="p-3 text-center bg-amber-600 text-white w-36">eGFR &lt; 30</th>
                                </tr>
                            </thead>
                            <tbody id="tb-dose-tbody" class="divide-y divide-slate-100 font-normal text-slate-700 text-sm">
                                <!-- JS Render Rows -->
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <!-- Footer Note -->
            <div class="p-3 bg-slate-100 border border-slate-200 rounded-2xl text-[11px] font-normal text-slate-500 text-center">
                * Note อ้างอิงตัวคูณขนาดยา (mg/kg/day): 
                <span class="text-slate-700 font-medium">I (5)</span> | 
                <span class="text-slate-700 font-medium">R (10)</span> | 
                <span class="text-slate-700 font-medium">Z (25)</span> | 
                <span class="text-slate-700 font-medium">E (15)</span> | 
                <span class="text-slate-700 font-medium">S (15)</span> | 
                <span class="text-slate-700 font-medium">L (750 mg/day, Max 1000)</span> | 
                <span class="text-slate-700 font-medium">O (10) **ไม่ค่อยแนะนำ</span>
            </div>

        </div>
    `;

    const bwInput = container.querySelector('#tb-bw');
    const chkEgfr = container.querySelector('#chk-egfr');
    const warningBox = container.querySelector('#egfr-warning-box');

    const updateCalc = () => {
        const bw = parseFloat(bwInput.value) || 0;
        const isLowEgfr = chkEgfr.checked;

        if (isLowEgfr) {
            warningBox.classList.remove('hidden');
        } else {
            warningBox.classList.add('hidden');
        }

        renderTableRows(container, bw, isLowEgfr);
    };

    bwInput.addEventListener('input', updateCalc);
    chkEgfr.addEventListener('change', updateCalc);

    updateCalc();
}

const tbDrugs = [
    { code: 'I', name: 'Isoniazid', avgMult: 5, minMult: 4, maxMult: 6, egfrAdjust: false, note: '' },
    { code: 'R', name: 'Rifampicin', avgMult: 10, minMult: 8, maxMult: 12, egfrAdjust: false, note: '' },
    { code: 'Z', name: 'Pyrazinamide', avgMult: 25, minMult: 20, maxMult: 30, egfrAdjust: true, note: '' },
    { code: 'E', name: 'Ethambutol', avgMult: 15, minMult: 15, maxMult: 20, egfrAdjust: true, note: '' },
    { code: 'S', name: 'Streptomycin', avgMult: 15, minMult: 12, maxMult: 20, egfrAdjust: true, note: '' },
    { code: 'L', name: 'Levofloxacin', fixedAvg: 750, minMult: 15, maxMult: 20, maxCap: 1000, egfrAdjust: true, note: '' },
    { code: 'O', name: 'Ofloxacin', avgMult: 10, minMult: 7.5, maxMult: 15, egfrAdjust: true, note: 'ไม่ค่อยแนะนำแล้ว' }
];

function formatNumber(num) {
    if (!num || isNaN(num) || num === 0) return '0';
    const formatted = Math.round(num * 100) / 100;
    return formatted.toLocaleString('en-US');
}

function renderTableRows(container, bw, isLowEgfr) {
    const tbody = container.querySelector('#tb-dose-tbody');
    let html = '';

    tbDrugs.forEach(drug => {
        let avgDoseStr = '-';
        let minMaxStr = '-';

        if (bw > 0) {
            let avgVal = drug.fixedAvg ? drug.fixedAvg : (bw * drug.avgMult);
            avgDoseStr = `${formatNumber(avgVal)} <span class="text-xs font-semibold text-slate-500">mg/day</span>`;

            let minVal = bw * drug.minMult;
            let maxVal = bw * drug.maxMult;

            if (drug.maxCap && maxVal > drug.maxCap) {
                maxVal = drug.maxCap;
            }

            minMaxStr = `${formatNumber(minVal)} - ${formatNumber(maxVal)} <span class="text-xs font-semibold text-slate-500">mg/day</span>`;
        }

        let egfrDisplay = '-';
        let egfrStyle = 'text-slate-300';

        if (drug.egfrAdjust && isLowEgfr) {
            egfrDisplay = '3 days / week';
            egfrStyle = 'bg-amber-100 text-amber-900 font-semibold';
        }

        html += `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="p-2.5 text-center border-r border-slate-100">
                    <div class="inline-flex items-center justify-center w-8 h-8 bg-slate-800 text-white font-bold text-base rounded-lg">
                        [${drug.code}]
                    </div>
                    <div class="text-[11px] font-semibold text-slate-600 mt-0.5">${drug.name}</div>
                    ${drug.note ? `<div class="text-[9px] font-semibold text-rose-500 leading-none">${drug.note}</div>` : ''}
                </td>
                <td class="p-2.5 text-center text-amber-600 font-bold text-lg border-r border-slate-100">
                    ${avgDoseStr}
                </td>
                <td class="p-2.5 text-center text-slate-700 font-semibold border-r border-slate-100">
                    ${minMaxStr}
                </td>
                <td class="p-2.5 text-center ${egfrStyle}">
                    ${egfrDisplay}
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}
