/**
 * Smalldose Calculator Module
 * Complete Vanilla JS with 4 Drug Cards (Ampicillin, Gentamicin, Cloxacillin, Clindamycin)
 * & Recommended Total Fluid Intake Calculator
 * Updated: Gentamicin Ampule strength fully editable at top-right & dynamic conc. calculation
 * Timestamp: 2026-08-19
 */

export function render(container) {
    container.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-5 items-start w-full">
        
        <!-- Left Zone (Input Area + Recommended Fluid Box) -->
        <aside class="w-full lg:w-[22%] bg-slate-900 text-slate-100 p-4 rounded-3xl shadow-xl flex flex-col gap-4 shrink-0">
            
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-teal-500/20 text-teal-300 rounded-xl flex items-center justify-center border border-teal-500/30 shrink-0">
                        <svg class="w-4 h-4 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                    </div>
                    <div>
                        <h2 class="text-base font-bold text-white leading-tight">Smalldose Calc</h2>
                    </div>
                </div>
                <button id="sd-btn-reset" class="bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-teal-200 text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 font-medium shrink-0">
                    <svg class="w-3 h-3 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                    <span>Reset</span>
                </button>
            </div>

            <div class="space-y-3.5">
                
                <div class="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 space-y-2">
                    <span class="text-[11px] font-bold tracking-wider text-teal-300 uppercase flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/><path d="M19 14c0-3.3-2.7-6-6-6h-2c-3.3 0-6 2.7-6 6v7h3v-4h6v4h3v-7Z"/></svg>
                        ข้อมูลครรภ์ (GA)
                    </span>
                    <div>
                        <label class="block text-xs font-semibold text-slate-200 mb-1">GA (อายุครรภ์เมื่อคลอด)</label>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="relative flex items-center">
                                <input type="number" id="sd-ga-wk" placeholder="0" min="0" max="44" class="sd-input w-full bg-white border border-slate-300 rounded-xl h-10 px-3 pr-8 text-right font-bold text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors">
                                <span class="absolute right-2.5 text-xs text-slate-500 font-bold pointer-events-none">wk</span>
                            </div>
                            <div class="relative flex items-center">
                                <input type="number" id="sd-ga-day" placeholder="0" min="0" max="6" class="sd-input w-full bg-white border border-slate-300 rounded-xl h-10 px-3 pr-9 text-right font-bold text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors">
                                <span class="absolute right-2 text-xs text-slate-500 font-bold pointer-events-none">days</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 space-y-3">
                    <span class="text-[11px] font-bold tracking-wider text-teal-300 uppercase flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.5 1.5 1 2 1s1.5-.5 2-1"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 5 6.3"/></svg>
                        ข้อมูลทารก (BABY)
                    </span>
                    
                    <div>
                        <label class="block text-xs font-semibold text-slate-200 mb-1">PNA (อายุหลังคลอด)</label>
                        <div class="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl h-10 px-1.5">
                            <button id="sd-pna-minus" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors shrink-0 active:scale-95 border border-slate-300">
                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                            </button>
                            <div class="flex-1 relative flex items-center min-w-0">
                                <input type="number" id="sd-pna-day" placeholder="0" min="0" max="120" class="sd-input w-full bg-transparent text-right font-bold text-slate-900 text-base focus:outline-none pr-8 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                                <span class="absolute right-0 text-xs text-slate-500 font-bold pointer-events-none">days</span>
                            </div>
                            <button id="sd-pna-plus" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors shrink-0 active:scale-95 border border-slate-300">
                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-200 mb-1">BW (น้ำหนักตัวทารก)</label>
                        <div class="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl h-10 px-1.5">
                            <button id="sd-bw-minus" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors shrink-0 active:scale-95 border border-slate-300">
                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                            </button>
                            <div class="flex-1 relative flex items-center min-w-0">
                                <input type="number" id="sd-bw" placeholder="0" step="0.001" min="0" max="10" class="sd-input w-full bg-transparent text-right font-bold text-slate-900 text-base focus:outline-none pr-5 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                                <span class="absolute right-0 text-xs text-slate-500 font-bold pointer-events-none">kg</span>
                            </div>
                            <button id="sd-bw-plus" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors shrink-0 active:scale-95 border border-slate-300">
                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 text-center space-y-1.5">
                    <span class="text-[11px] uppercase tracking-wider text-teal-400 font-bold block">CALCULATED PMA</span>
                    <div id="sd-pma-display" class="text-2xl font-black text-teal-300 tracking-tight">0 wk</div>
                    <div id="sd-pma-desc" class="text-[11px] text-slate-300 font-normal leading-relaxed text-left pt-1 border-t border-slate-800/80 space-y-0.5">
                    </div>
                </div>

                <!-- Recommended Total Fluid Intake Card (Light Tone - Light Blue Theme) -->
                <div class="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 shadow-sm space-y-2 text-slate-800">
                    <div class="flex items-center justify-between border-b border-sky-200/80 pb-1.5">
                        <a href="https://www.clinicalnutritionjournal.com/article/S0261-5614(18)31167-1/fulltext" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-1 transition-colors">
                            <span>Recommended</span>
                            <svg class="w-3 h-3 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                        <span class="text-[10px] font-semibold bg-sky-200/70 text-sky-800 px-1.5 py-0.5 rounded">ESPGHAN 2018</span>
                    </div>

                    <div class="space-y-1 text-xs">
                        <div class="font-semibold text-slate-700">Total Fluid intake</div>
                        <div id="sd-fluid-min" class="text-slate-900 text-sm font-medium">0.00 ml/<strong class="font-bold">Day</strong></div>
                        <div id="sd-fluid-max" class="text-slate-900 text-sm font-medium">up to 0.00 ml/<strong class="font-bold">Day</strong></div>
                    </div>

                    <div id="sd-fluid-summary" class="text-[11px] text-sky-900 bg-sky-100/80 border border-sky-200/90 rounded-xl p-2 mt-1 space-y-0.5 font-medium leading-relaxed">
                        <div>-</div>
                    </div>
                </div>

                <div class="pt-1">
                    <label class="block text-xs font-bold text-slate-200 mb-2">เลือกแสดงรายยา</label>
                    <div class="grid grid-cols-2 gap-2">
                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-indigo-500/50 hover:border-indigo-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-ampicillin" checked class="w-3.5 h-3.5 rounded accent-indigo-500 cursor-pointer shrink-0">
                            <span class="text-xs font-bold text-indigo-300 truncate">Ampicillin</span>
                        </label>

                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-teal-500/50 hover:border-teal-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-gentamicin" checked class="w-3.5 h-3.5 rounded accent-teal-500 cursor-pointer shrink-0">
                            <span class="text-[11px] font-bold text-teal-300 truncate">Gentamicin</span>
                        </label>

                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-amber-500/50 hover:border-amber-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-cloxacillin" checked class="w-3.5 h-3.5 rounded accent-amber-500 cursor-pointer shrink-0">
                            <span class="text-[11px] font-bold text-amber-300 truncate">Cloxacillin</span>
                        </label>

                        <label class="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-rose-500/50 hover:border-rose-400 cursor-pointer transition-all min-w-0">
                            <input type="checkbox" id="sd-chk-clindamycin" checked class="w-3.5 h-3.5 rounded accent-rose-500 cursor-pointer shrink-0">
                            <span class="text-[10px] font-bold text-rose-300 truncate">Clindamycin</span>
                        </label>
                    </div>
                </div>

            </div>
        </aside>

        <!-- Right Main Content Zone -->
        <main class="w-full lg:w-[78%] flex flex-col gap-5">
            
            <!-- Ampicillin Card -->
            <div id="sd-card-ampicillin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-indigo-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Ampicillin <span class="text-sm font-normal text-slate-600">(Dose: 150 - 200 mg/kg/day)</span></h3>
                    </div>
                    <div id="sd-amp-total" class="bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold px-3 py-1 rounded-xl text-xs self-start sm:self-auto">
                        Total: 0.00 - 0.00 mg/day
                    </div>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Min (mg)</th>
                                <th class="py-2.5 px-3 text-right">Max (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-ampicillin" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
                    </table>
                </div>

                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 space-y-1.5">
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">IV slow push / IM :</span>
                        <span>ถ้าไม่เกิน 500 mg ให้ <strong class="text-slate-900">slow push 3-5 นาที</strong> ถ้าเกิน ให้ <strong class="text-slate-900">slow push 10-15 นาที</strong></span>
                    </div>
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Reconstituted solution :</span>
                        <span class="font-semibold text-slate-800">SWFI</span>
                    </div>
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Compatible Solution :</span>
                        <span class="font-semibold text-slate-800">D5W, LRS , NSS, SWI.</span>
                    </div>
                </div>
            </div>

            <!-- Gentamicin Card -->
            <div id="sd-card-gentamicin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4 relative">
                
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-teal-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Gentamicin</h3>
                    </div>
                    <div class="flex items-center gap-1 bg-white text-slate-700 text-xs px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm self-start sm:self-auto shrink-0">
                        <span>คำนวนจากรูปแบบ Ampule</span>
                        <input type="number" id="sd-genta-stock-mg" value="80" min="1" class="w-12 bg-teal-50 border border-teal-300 rounded px-1 text-center font-bold text-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-500">
                        <span>mg /</span>
                        <input type="number" id="sd-genta-stock-ml" value="2" min="0.1" step="0.1" class="w-10 bg-teal-50 border border-teal-300 rounded px-1 text-center font-bold text-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-500">
                        <span>ml</span>
                    </div>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Dose (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-gentamicin" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
                    </table>
                </div>

                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        
                        <div class="space-y-3 pr-0 md:pr-4 flex flex-col justify-between relative">
                            
                            <div class="flex items-start justify-between gap-2">
                                <div class="grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-1 items-baseline text-xs">
                                    <span class="font-bold text-slate-900">Compatible Solution</span>
                                    <span class="font-bold text-slate-900">:</span>
                                    <span class="font-semibold text-slate-800">D5W, D10W, NSS</span>

                                    <span class="font-bold text-slate-900">Max Conc. 10mg/ml</span>
                                    <span class="font-bold text-slate-900">=</span>
                                    <span>ต้องใช้สารละลาย<strong class="text-slate-900 font-bold">อย่างน้อย</strong> <span id="sd-genta-min-sol" class="font-bold text-slate-900">0.00</span> ml</span>

                                    <span class="font-bold text-slate-900">IV infusion</span>
                                    <span class="font-bold text-slate-900">:</span>
                                    <span><strong class="text-slate-900 font-bold">อย่างน้อย</strong> 30-120 นาที</span>
                                </div>

                                <div class="relative group cursor-pointer inline-flex items-center justify-center shrink-0">
                                    <div class="w-6 h-6 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center text-xs font-bold transition-all shadow hover:scale-105">
                                        ?
                                    </div>
                                    
                                    <div class="absolute bottom-full left-0 mb-2 w-[440px] max-w-[85vw] bg-slate-900 text-slate-100 text-[11px] p-4 rounded-2xl shadow-2xl border border-slate-700 z-[9999] hidden group-hover:block transition-all space-y-3 pointer-events-auto">
                                        <div class="font-normal text-teal-300 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                                            <svg class="w-4 h-4 stroke-teal-400" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 2 2h10a2 2 0 0 2 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>
                                            <span>ขั้นตอนการเตรียมและบริหารยา (ความเข้มข้นสม่ำเสมอ)</span>
                                        </div>
                                        
                                        <ol class="list-decimal list-inside space-y-1.5 font-normal leading-relaxed text-slate-200">
                                            <li>ใช้ Syringe หลัก ดูดสารน้ำ (Diluent) ปริมาตร <span class="text-white font-normal"><span id="sd-step-diluent">0.00</span> ml</span></li>
                                            <li>ใช้ Syringe เล็ก (1 ml) ดูดยา Gentamicin ปริมาตร <span class="text-teal-300 font-normal"><span id="sd-step-drug">0.00</span> ml</span> (<span id="sd-step-drug-mg">0.00</span> mg)</li>
                                            <li>ถ่ายยาจาก Syringe เล็ก เข้าสู่ Syringe หลัก แบบปากต่อปาก</li>
                                            <li class="text-teal-200"><span class="underline text-white font-normal">Draw ผสมยาให้เข้ากัน</span> (ปริมาตรรวม = <span id="sd-step-total">0.00</span> ml)</li>
                                            <li>ต่อ Syringe หลักเข้ากับ Infusion Set แล้วบริหารยาผ่าน Syringe Pump</li>
                                        </ol>

                                        <div class="bg-rose-950/80 border border-rose-600/60 rounded-xl p-2.5 text-rose-200 text-[11px] font-normal leading-relaxed space-y-1">
                                            <div class="flex items-center gap-1 text-rose-400 font-normal">
                                                <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                                                <span>ข้อระวังสำคัญ:</span>
                                            </div>
                                            <div>
                                                ให้ยาปริมาตร <span id="sd-alert-vol" class="text-white font-normal underline">0.00</span> ml ในเวลา 30-120 นาที <span class="text-rose-300 font-normal underline">โดยไม่ต้อง FLUSH สายตามหลัง</span> (ยาส่วนที่เหลือ <span id="sd-alert-remain">0.00</span> ml จะค้างอยู่ในสายพอดี)
                                            </div>
                                        </div>

                                        <div class="text-[10px] text-slate-400 font-normal italic border-t border-slate-800 pt-2 leading-normal">
                                            * เป็นเพียงข้อเสนอแนะ เทคนิควิธีขึ้นกับแต่ละบริบท ความชำนาญ และอุปกรณ์ที่มีของหน่วยบริการ
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white rounded-2xl p-3 border border-slate-200 flex flex-col items-center justify-center shadow-sm">
                                <svg class="w-full h-32" viewBox="0 0 440 160" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="250" y="30" width="140" height="50" rx="2" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
                                    <line x1="390" y1="20" x2="390" y2="90" stroke="#1e293b" stroke-width="2.5"/>
                                    <line x1="390" y1="55" x2="425" y2="55" stroke="#1e293b" stroke-width="2.5"/>
                                    <line x1="425" y1="40" x2="425" y2="70" stroke="#1e293b" stroke-width="2.5"/>
                                    <rect x="372" y="32" width="18" height="46" fill="#475569" stroke="#1e293b"/>
                                    
                                    <pattern id="sd-hatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                                        <line x1="0" y1="0" x2="0" y2="6" stroke="#475569" stroke-width="1.5" />
                                    </pattern>
                                    <rect x="260" y="32" width="35" height="46" fill="url(#sd-hatch)" />
                                    <line x1="295" y1="30" x2="295" y2="80" stroke="#1e293b" stroke-width="1.5"/>

                                    <rect x="295" y="32" width="77" height="46" fill="#f8fafc"/>
                                    <line x1="310" y1="32" x2="310" y2="44" stroke="#94a3b8" stroke-width="1"/>
                                    <line x1="325" y1="32" x2="325" y2="44" stroke="#94a3b8" stroke-width="1"/>
                                    <line x1="340" y1="32" x2="340" y2="44" stroke="#94a3b8" stroke-width="1"/>
                                    <line x1="355" y1="32" x2="355" y2="44" stroke="#94a3b8" stroke-width="1"/>

                                    <path d="M 250 55 L 220 55 L 220 105 L 140 105 L 140 120" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                    <rect x="125" y="120" width="30" height="20" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
                                    <path d="M 140 105 L 60 105 L 60 120" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                    <rect x="45" y="120" width="30" height="20" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>

                                    <path d="M 277 80 L 277 100 M 277 100 L 272 95 M 277 100 L 282 95" stroke="#0284c7" stroke-width="1.5"/>
                                    <text x="277" y="115" font-size="10" font-weight="bold" fill="#0284c7" text-anchor="middle">1. สารน้ำผสมยาแล้ว</text>
                                    <text x="277" y="127" font-size="9" fill="#0284c7" text-anchor="middle">(ความเข้มข้นเท่ากันตลอดสาย)</text>

                                    <path d="M 210 55 L 210 25 M 210 25 L 205 30 M 210 25 L 215 30" stroke="#e11d48" stroke-width="1.5"/>
                                    <text x="210" y="18" font-size="10" font-weight="bold" fill="#e11d48" text-anchor="middle">2. บริหารยาตามปริมาตรคำนวน</text>

                                    <path d="M 100 105 L 100 75 M 100 75 L 95 80 M 100 75 L 105 80" stroke="#e11d48" stroke-width="1.5"/>
                                    <text x="100" y="68" font-size="10" font-weight="bold" fill="#e11d48" text-anchor="middle">3. ไม่ต้อง Flush สายตามหลัง</text>
                                    <text x="100" y="56" font-size="9" fill="#e11d48" text-anchor="middle">(ยาค้างสายพอดี)</text>
                                </svg>
                            </div>
                        </div>

                        <div class="space-y-2.5 pl-0 md:pl-4 pt-3 md:pt-0">
                            <div class="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1 flex items-center justify-between">
                                <span>ตารางปริมาตรการผสม (Dilution Guide)</span>
                                <span id="sd-genta-conc-label" class="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Conc: 40 mg/ml</span>
                            </div>
                            <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                                <table class="w-full text-center text-xs">
                                    <thead>
                                        <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                            <th class="py-1.5 px-2 text-left">ความเข้มข้น</th>
                                            <th class="py-1.5 px-2">ตัวยา (ml)</th>
                                            <th class="py-1.5 px-2">สารน้ำ (ml)</th>
                                            <th class="py-1.5 px-2">รวม (ml)</th>
                                        </tr>
                                    </thead>
                                    <tbody id="sd-tbl-genta-dilution" class="divide-y divide-slate-100 font-medium text-slate-700">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Cloxacillin Card -->
            <div id="sd-card-cloxacillin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Cloxacillin <span class="text-sm font-normal text-slate-600">(Dose: 100 - 200 mg/kg/day)</span></h3>
                    </div>
                    <div id="sd-clox-total" class="bg-amber-50 border border-amber-200 text-amber-800 font-bold px-3 py-1 rounded-xl text-xs self-start sm:self-auto">
                        Total: 0.00 - 0.00 mg/day
                    </div>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Min (mg)</th>
                                <th class="py-2.5 px-3 text-right">Max (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-cloxacillin" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
                    </table>
                </div>

                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 space-y-1.5">
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Direct IV :</span>
                        <span>บริหารยาช้าๆ <strong class="text-slate-900">3-4 นาที</strong> (การให้เร็วเสี่ยงต่อ Phlebitis)</span>
                    </div>
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Reconstituted solution :</span>
                        <span>SWFI (1 g + SWFI 9.6 ml -> <strong class="text-slate-900">100 mg/ml</strong>)</span>
                    </div>
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Compatible Solution :</span>
                        <span class="font-semibold text-slate-800">D5W, LRS, NSS, SWFI</span>
                    </div>
                </div>
            </div>

            <!-- Clindamycin Card -->
            <div id="sd-card-clindamycin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Clindamycin <span class="text-sm font-normal text-slate-600">(Dose: 15 - 20 mg/kg/day)</span></h3>
                    </div>
                    <div id="sd-clinda-total" class="bg-rose-50 border border-rose-200 text-rose-800 font-bold px-3 py-1 rounded-xl text-xs self-start sm:self-auto">
                        Total: 0.00 - 0.00 mg/day
                    </div>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">Min (mg)</th>
                                <th class="py-2.5 px-3 text-right">Max (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-clindamycin" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
                    </table>
                </div>

                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 space-y-1.5">
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">IV infusion :</span>
                        <span>เจือจางก่อนหยด <strong class="text-slate-900">อัตราเร็วไม่เกิน 30 mg/min</strong> (ให้ทาง IV infusion เท่านั้น ห้าม IV push)</span>
                    </div>
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Max Conc. :</span>
                        <span><strong class="text-slate-900">18 mg/ml</strong> (แนะนำเจือจางให้ได้ 6-12 mg/ml เพื่อความปลอดภัย)</span>
                    </div>
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Compatible Solution :</span>
                        <span class="font-semibold text-slate-800">D5W, LRS, NSS</span>
                    </div>
                </div>
            </div>

        </main>
    </div>
    `;

    // Elements
    const gaWkInput = container.querySelector('#sd-ga-wk');
    const gaDayInput = container.querySelector('#sd-ga-day');
    const pnaDayInput = container.querySelector('#sd-pna-day');
    const bwInput = container.querySelector('#sd-bw');

    const pnaMinus = container.querySelector('#sd-pna-minus');
    const pnaPlus = container.querySelector('#sd-pna-plus');
    const bwMinus = container.querySelector('#sd-bw-minus');
    const bwPlus = container.querySelector('#sd-bw-plus');
    const btnReset = container.querySelector('#sd-btn-reset');

    const pmaDisplay = container.querySelector('#sd-pma-display');
    const pmaDesc = container.querySelector('#sd-pma-desc');

    const stockMgInput = container.querySelector('#sd-genta-stock-mg');
    const stockMlInput = container.querySelector('#sd-genta-stock-ml');

    const chkAmp = container.querySelector('#sd-chk-ampicillin');
    const chkGenta = container.querySelector('#sd-chk-gentamicin');
    const chkClox = container.querySelector('#sd-chk-cloxacillin');
    const chkClinda = container.querySelector('#sd-chk-clindamycin');

    const cardAmp = container.querySelector('#sd-card-ampicillin');
    const cardGenta = container.querySelector('#sd-card-gentamicin');
    const cardClox = container.querySelector('#sd-card-cloxacillin');
    const cardClinda = container.querySelector('#sd-card-clindamycin');

    // Fluid Intake Elements
    const fluidMinEl = container.querySelector('#sd-fluid-min');
    const fluidMaxEl = container.querySelector('#sd-fluid-max');
    const fluidSummaryEl = container.querySelector('#sd-fluid-summary');

    // Helper functions for inputs
    function stepValue(input, step) {
        let val = parseFloat(input.value) || 0;
        val += step;
        if (input.min !== '' && val < parseFloat(input.min)) val = parseFloat(input.min);
        if (input.max !== '' && val > parseFloat(input.max)) val = parseFloat(input.max);
        
        if (input.step && input.step.includes('.')) {
            const decimals = input.step.split('.')[1].length;
            input.value = val.toFixed(decimals);
        } else {
            input.value = Math.round(val);
        }
        calculateAll();
    }

    pnaMinus.addEventListener('click', () => stepValue(pnaDayInput, -1));
    pnaPlus.addEventListener('click', () => stepValue(pnaDayInput, 1));
    bwMinus.addEventListener('click', () => stepValue(bwInput, -0.1));
    bwPlus.addEventListener('click', () => stepValue(bwInput, 0.1));

    btnReset.addEventListener('click', () => {
        gaWkInput.value = '';
        gaDayInput.value = '';
        pnaDayInput.value = '';
        bwInput.value = '';
        stockMgInput.value = '80';
        stockMlInput.value = '2';
        chkAmp.checked = true;
        chkGenta.checked = true;
        chkClox.checked = true;
        chkClinda.checked = true;
        calculateAll();
    });

    [gaWkInput, gaDayInput, pnaDayInput, bwInput, stockMgInput, stockMlInput].forEach(inp => {
        inp.addEventListener('input', calculateAll);
    });

    // Toggle card visibilities
    function updateVisibility() {
        cardAmp.style.display = chkAmp.checked ? 'block' : 'none';
        cardGenta.style.display = chkGenta.checked ? 'block' : 'none';
        cardClox.style.display = chkClox.checked ? 'block' : 'none';
        cardClinda.style.display = chkClinda.checked ? 'block' : 'none';
    }

    [chkAmp, chkGenta, chkClox, chkClinda].forEach(chk => {
        chk.addEventListener('change', updateVisibility);
    });

    function calculateFluidIntake(gaWk, pnaDay, bwKg) {
        if (isNaN(gaWk) || isNaN(pnaDay) || gaWk <= 0 || pnaDay <= 0) {
            fluidMinEl.innerHTML = `0.00 ml/<strong class="font-bold">Day</strong>`;
            fluidMaxEl.innerHTML = `up to 0.00 ml/<strong class="font-bold">Day</strong>`;
            fluidSummaryEl.innerHTML = `<div>กรอก GA และ PNA เพื่อคำนวณ</div>`;
            return;
        }

        const isTerm = gaWk >= 38;
        const categoryText = isTerm ? 'Term neonate' : 'Preterm neonate';

        let minMlKg = 0;
        let maxMlKg = 0;
        let weightGroupText = '';

        if (pnaDay >= 1 && pnaDay <= 5) {
            const dayIdx = pnaDay - 1; // 0..4
            if (isTerm) {
                const termMin = [40, 50, 60, 60, 100];
                const termMax = [60, 70, 80, 100, 140];
                minMlKg = termMin[dayIdx];
                maxMlKg = termMax[dayIdx];
            } else {
                // Preterm by weight
                if (bwKg > 1.5) {
                    weightGroupText = '>1500 g';
                    const ptMin = [60, 80, 100, 120, 140];
                    const ptMax = [80, 100, 120, 140, 160];
                    minMlKg = ptMin[dayIdx];
                    maxMlKg = ptMax[dayIdx];
                } else if (bwKg >= 1.0 && bwKg <= 1.5) {
                    weightGroupText = '1000-1500 g';
                    const ptMin = [70, 90, 110, 130, 160];
                    const ptMax = [90, 110, 130, 150, 180];
                    minMlKg = ptMin[dayIdx];
                    maxMlKg = ptMax[dayIdx];
                } else {
                    weightGroupText = '<1000 g';
                    const ptMin = [80, 100, 120, 140, 160];
                    const ptMax = [100, 120, 140, 160, 180];
                    minMlKg = ptMin[dayIdx];
                    maxMlKg = ptMax[dayIdx];
                }
            }
        } else if (pnaDay >= 6 && pnaDay <= 10) {
            // Table 2: Intermediate phase (Phase II)
            if (isTerm) {
                minMlKg = 140;
                maxMlKg = 170;
            } else {
                if (bwKg > 1.5) {
                    weightGroupText = '>1500 g';
                } else {
                    weightGroupText = '<1500 g';
                }
                minMlKg = 140;
                maxMlKg = 160;
            }
        } else {
            // Table 3: Day 11+ (Phase III / Stable growth)
            if (isTerm) {
                minMlKg = 140;
                maxMlKg = 160;
            } else {
                if (bwKg > 1.5) {
                    weightGroupText = '>1500 g';
                } else {
                    weightGroupText = '<1500 g';
                }
                minMlKg = 140;
                maxMlKg = 160;
            }
        }

        if (bwKg > 0) {
            const minTotal = minMlKg * bwKg;
            const maxTotal = maxMlKg * bwKg;
            fluidMinEl.innerHTML = `${minTotal.toFixed(1)} ml/<strong class="font-bold">Day</strong> <span class="text-xs text-slate-500 font-normal">(${minMlKg} ml/kg/d)</span>`;
            fluidMaxEl.innerHTML = `up to ${maxTotal.toFixed(1)} ml/<strong class="font-bold">Day</strong> <span class="text-xs text-slate-500 font-normal">(${maxMlKg} ml/kg/d)</span>`;
        } else {
            fluidMinEl.innerHTML = `${minMlKg} ml/kg/d (<strong class="font-bold">Day</strong>)`;
            fluidMaxEl.innerHTML = `up to ${maxMlKg} ml/kg/d (<strong class="font-bold">Day</strong>)`;
        }

        let summaryStr = `<div><strong class="font-bold text-sky-950">กลุ่ม:</strong> ${categoryText}${weightGroupText ? ' (' + weightGroupText + ')' : ''}</div>`;
        summaryStr += `<div><strong class="font-bold text-sky-950">อายุหลังคลอด:</strong> Day ${pnaDay}</div>`;
        if (bwKg > 0) {
            summaryStr += `<div><strong class="font-bold text-sky-950">BW:</strong> ${bwKg.toFixed(3)} kg</div>`;
        }
        fluidSummaryEl.innerHTML = summaryStr;
    }

    // Calculation Core
    function calculateAll() {
        const gaWk = parseFloat(gaWkInput.value) || 0;
        const gaDay = parseFloat(gaDayInput.value) || 0;
        const pnaDay = parseFloat(pnaDayInput.value) || 0;
        const bwKg = parseFloat(bwInput.value) || 0;

        const stockMg = parseFloat(stockMgInput.value) || 80;
        const stockMl = parseFloat(stockMlInput.value) || 2;
        const stockConc = stockMg / stockMl; // mg/ml

        // Recommended Fluid Intake Calculation
        calculateFluidIntake(gaWk, pnaDay, bwKg);

        // Calculate Total PMA in weeks
        const totalGaDays = (gaWk * 7) + gaDay;
        const totalPmaDays = totalGaDays + pnaDay;
        const pmaWkVal = totalPmaDays / 7;

        if (totalGaDays > 0) {
            const fullWk = Math.floor(pmaWkVal);
            const remDays = Math.round((pmaWkVal - fullWk) * 7);
            pmaDisplay.textContent = `${fullWk}<sup>+${remDays}</sup> wk`;
            pmaDisplay.innerHTML = `${fullWk}<span class="text-lg text-teal-400 font-bold">+${remDays}d</span> wk`;

            pmaDesc.innerHTML = `
                <div>• GA: ${gaWk} wk ${gaDay} d</div>
                <div>• PNA: ${pnaDay} d | BW: ${bwKg ? bwKg + ' kg' : '-'}</div>
            `;
        } else {
            pmaDisplay.textContent = '0 wk';
            pmaDesc.innerHTML = 'กรอก GA และ PNA เพื่อคำนวณ PMA';
        }

        // Render Ampicillin Table
        renderAmpicillin(pmaWkVal, pnaDay, bwKg);

        // Render Gentamicin Table & Dilution
        renderGentamicin(pmaWkVal, pnaDay, bwKg, stockConc, stockMg, stockMl);

        // Render Cloxacillin Table
        renderCloxacillin(pmaWkVal, pnaDay, bwKg);

        // Render Clindamycin Table
        renderClindamycin(pmaWkVal, pnaDay, bwKg);

        updateVisibility();
    }

    // --- Ampicillin Logic ---
    function renderAmpicillin(pmaWk, pnaDay, bw) {
        const tbody = container.querySelector('#sd-tbl-ampicillin');
        const totalEl = container.querySelector('#sd-amp-total');

        const rows = [
            { pma: '<= 34 wk', pna: '0 - 7 days', interval: 'q 12 h (ทุก 12 ชม.)', match: (pma, pna) => pma <= 34 && pna >= 0 && pna <= 7 },
            { pma: '<= 34 wk', pna: '8 - 28 days', interval: 'q 8 h (ทุก 8 ชม.)', match: (pma, pna) => pma <= 34 && pna >= 8 && pna <= 28 },
            { pma: '<= 34 wk', pna: '> 28 days', interval: 'q 6 h (ทุก 6 ชม.)', match: (pma, pna) => pma <= 34 && pna > 28 },
            { pma: '> 34 wk', pna: '0 - 7 days', interval: 'q 8 h (ทุก 8 ชม.)', match: (pma, pmaVal, pna) => pma > 34 && pna >= 0 && pna <= 7 },
            { pma: '> 34 wk', pna: '> 7 days', interval: 'q 6 h (ทุก 6 ชม.)', match: (pma, pna) => pma > 34 && pna > 7 }
        ];

        let matchedRowIndex = -1;
        if (pmaWk > 0 && pnaDay >= 0) {
            matchedRowIndex = rows.findIndex(r => r.match(pmaWk, pnaDay));
        }

        let html = '';
        const minDoseKg = 150;
        const maxDoseKg = 200;

        if (bw > 0) {
            const minTotal = minDoseKg * bw;
            const maxTotal = maxDoseKg * bw;
            totalEl.textContent = `Total: ${minTotal.toFixed(1)} - ${maxTotal.toFixed(1)} mg/day`;
        } else {
            totalEl.textContent = `Total: 0.00 - 0.00 mg/day`;
        }

        rows.forEach((r, idx) => {
            const isMatched = (idx === matchedRowIndex);
            const bgClass = isMatched ? 'bg-indigo-100/80 font-bold text-indigo-950' : '';
            
            let minSingle = '-';
            let maxSingle = '-';

            if (bw > 0) {
                let dosesPerDay = 1;
                if (r.interval.includes('q 12 h')) dosesPerDay = 2;
                else if (r.interval.includes('q 8 h')) dosesPerDay = 3;
                else if (r.interval.includes('q 6 h')) dosesPerDay = 4;

                minSingle = ((minDoseKg * bw) / dosesPerDay).toFixed(1);
                maxSingle = ((maxDoseKg * bw) / dosesPerDay).toFixed(1);
            }

            html += `
                <tr class="${bgClass} transition-colors">
                    <td class="py-2 px-3">${r.pma}</td>
                    <td class="py-2 px-3">${r.pna}</td>
                    <td class="py-2 px-3 text-right font-bold">${minSingle}</td>
                    <td class="py-2 px-3 text-right font-bold">${maxSingle}</td>
                    <td class="py-2 px-3">mg/dose</td>
                    <td class="py-2 px-3">${r.interval}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }

    // --- Gentamicin Logic ---
    function renderGentamicin(pmaWk, pnaDay, bw, stockConc, stockMg, stockMl) {
        const tbody = container.querySelector('#sd-tbl-gentamicin');
        const minSolEl = container.querySelector('#sd-genta-min-sol');
        const concLabel = container.querySelector('#sd-genta-conc-label');
        const dilTbody = container.querySelector('#sd-tbl-genta-dilution');

        // Step Tooltip elements
        const stepDiluent = container.querySelector('#sd-step-diluent');
        const stepDrug = container.querySelector('#sd-step-drug');
        const stepDrugMg = container.querySelector('#sd-step-drug-mg');
        const stepTotal = container.querySelector('#sd-step-total');
        const alertVol = container.querySelector('#sd-alert-vol');
        const alertRemain = container.querySelector('#sd-alert-remain');

        concLabel.textContent = `Conc: ${stockConc.toFixed(1)} mg/ml (${stockMg}mg/${stockMl}ml)`;

        const rows = [
            { pma: '< 30 wk', pna: '0 - 14 days', dosePerKg: 5, interval: 'q 48 h (ทุก 48 ชม.)', match: (pma, pna) => pma < 30 && pna >= 0 && pna <= 14 },
            { pma: '< 30 wk', pna: '> 14 days', dosePerKg: 5, interval: 'q 36 h (ทุก 36 ชม.)', match: (pma, pna) => pma < 30 && pna > 14 },
            { pma: '30 - 34 wk', pna: '0 - 10 days', dosePerKg: 4.5, interval: 'q 36 h (ทุก 36 ชม.)', match: (pma, pna) => pma >= 30 && pma <= 34 && pna >= 0 && pna <= 10 },
            { pma: '30 - 34 wk', pna: '> 10 days', dosePerKg: 4.5, interval: 'q 24 h (ทุก 24 ชม.)', match: (pma, pna) => pma >= 30 && pma <= 34 && pna > 10 },
            { pma: '>= 35 wk', pna: 'All days', dosePerKg: 4, interval: 'q 24 h (ทุก 24 ชม.)', match: (pma, pna) => pma >= 35 }
        ];

        let matchedRowIndex = -1;
        if (pmaWk > 0 && pnaDay >= 0) {
            matchedRowIndex = rows.findIndex(r => r.match(pmaWk, pnaDay));
        }

        let html = '';
        let activeDoseMg = 0;

        rows.forEach((r, idx) => {
            const isMatched = (idx === matchedRowIndex);
            const bgClass = isMatched ? 'bg-teal-100/80 font-bold text-teal-950' : '';
            
            let singleDose = '-';
            if (bw > 0) {
                const dose = r.dosePerKg * bw;
                singleDose = dose.toFixed(2);
                if (isMatched) activeDoseMg = dose;
            }

            html += `
                <tr class="${bgClass} transition-colors">
                    <td class="py-2 px-3">${r.pma}</td>
                    <td class="py-2 px-3">${r.pna}</td>
                    <td class="py-2 px-3 text-right font-bold">${singleDose}</td>
                    <td class="py-2 px-3">mg/dose (${r.dosePerKg} mg/kg)</td>
                    <td class="py-2 px-3">${r.interval}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;

        // Dilution & Steps calculation
        if (activeDoseMg > 0) {
            const minSol = activeDoseMg / 10; // max conc 10mg/ml
            minSolEl.textContent = minSol.toFixed(2);

            const drugVol = activeDoseMg / stockConc;
            
            // Assume dilution target 4 mg/ml or standard steps
            const totalVol = Math.max(minSol, activeDoseMg / 4);
            const diluentVol = Math.max(0, totalVol - drugVol);

            stepDiluent.textContent = diluentVol.toFixed(2);
            stepDrug.textContent = drugVol.toFixed(2);
            stepDrugMg.textContent = activeDoseMg.toFixed(2);
            stepTotal.textContent = totalVol.toFixed(2);

            alertVol.textContent = totalVol.toFixed(2);
            alertRemain.textContent = '5.00'; // Deadspace standard 5 ml
        } else {
            minSolEl.textContent = '0.00';
            stepDiluent.textContent = '0.00';
            stepDrug.textContent = '0.00';
            stepDrugMg.textContent = '0.00';
            stepTotal.textContent = '0.00';
            alertVol.textContent = '0.00';
            alertRemain.textContent = '0.00';
        }

        // Render Dilution Guide Table based on current stock Conc
        const targetConcs = [10, 4, 2];
        let dilHtml = '';
        targetConcs.forEach(c => {
            const drugMl = 1;
            const drugMg = stockConc * drugMl;
            const totalMl = drugMg / c;
            const solMl = Math.max(0, totalMl - drugMl);

            dilHtml += `
                <tr>
                    <td class="py-1.5 px-2 text-left font-bold text-teal-800">${c} mg/ml</td>
                    <td class="py-1.5 px-2 font-semibold">${drugMl.toFixed(1)} ml (${stockConc.toFixed(0)} mg)</td>
                    <td class="py-1.5 px-2 font-semibold text-slate-900">${solMl.toFixed(1)} ml</td>
                    <td class="py-1.5 px-2 font-bold bg-slate-50">${totalMl.toFixed(1)} ml</td>
                </tr>
            `;
        });
        dilTbody.innerHTML = dilHtml;
    }

    // --- Cloxacillin Logic ---
    function renderCloxacillin(pmaWk, pnaDay, bw) {
        const tbody = container.querySelector('#sd-tbl-cloxacillin');
        const totalEl = container.querySelector('#sd-clox-total');

        const rows = [
            { pma: '<= 34 wk', pna: '0 - 7 days', interval: 'q 12 h (ทุก 12 ชม.)', match: (pma, pna) => pma <= 34 && pna >= 0 && pna <= 7 },
            { pma: '<= 34 wk', pna: '8 - 28 days', interval: 'q 8 h (ทุก 8 ชม.)', match: (pma, pna) => pma <= 34 && pna >= 8 && pna <= 28 },
            { pma: '<= 34 wk', pna: '> 28 days', interval: 'q 6 h (ทุก 6 ชม.)', match: (pma, pna) => pma <= 34 && pna > 28 },
            { pma: '> 34 wk', pna: '0 - 7 days', interval: 'q 8 h (ทุก 8 ชม.)', match: (pma, pna) => pma > 34 && pna >= 0 && pna <= 7 },
            { pma: '> 34 wk', pna: '> 7 days', interval: 'q 6 h (ทุก 6 ชม.)', match: (pma, pna) => pma > 34 && pna > 7 }
        ];

        let matchedRowIndex = -1;
        if (pmaWk > 0 && pnaDay >= 0) {
            matchedRowIndex = rows.findIndex(r => r.match(pmaWk, pnaDay));
        }

        let html = '';
        const minDoseKg = 100;
        const maxDoseKg = 200;

        if (bw > 0) {
            const minTotal = minDoseKg * bw;
            const maxTotal = maxDoseKg * bw;
            totalEl.textContent = `Total: ${minTotal.toFixed(1)} - ${maxTotal.toFixed(1)} mg/day`;
        } else {
            totalEl.textContent = `Total: 0.00 - 0.00 mg/day`;
        }

        rows.forEach((r, idx) => {
            const isMatched = (idx === matchedRowIndex);
            const bgClass = isMatched ? 'bg-amber-100/80 font-bold text-amber-950' : '';
            
            let minSingle = '-';
            let maxSingle = '-';

            if (bw > 0) {
                let dosesPerDay = 1;
                if (r.interval.includes('q 12 h')) dosesPerDay = 2;
                else if (r.interval.includes('q 8 h')) dosesPerDay = 3;
                else if (r.interval.includes('q 6 h')) dosesPerDay = 4;

                minSingle = ((minDoseKg * bw) / dosesPerDay).toFixed(1);
                maxSingle = ((maxDoseKg * bw) / dosesPerDay).toFixed(1);
            }

            html += `
                <tr class="${bgClass} transition-colors">
                    <td class="py-2 px-3">${r.pma}</td>
                    <td class="py-2 px-3">${r.pna}</td>
                    <td class="py-2 px-3 text-right font-bold">${minSingle}</td>
                    <td class="py-2 px-3 text-right font-bold">${maxSingle}</td>
                    <td class="py-2 px-3">mg/dose</td>
                    <td class="py-2 px-3">${r.interval}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }

    // --- Clindamycin Logic ---
    function renderClindamycin(pmaWk, pnaDay, bw) {
        const tbody = container.querySelector('#sd-tbl-clindamycin');
        const totalEl = container.querySelector('#sd-clinda-total');

        const rows = [
            { pma: '<= 34 wk', pna: '0 - 7 days', interval: 'q 12 h (ทุก 12 ชม.)', match: (pma, pna) => pma <= 34 && pna >= 0 && pna <= 7 },
            { pma: '<= 34 wk', pna: '8 - 28 days', interval: 'q 8 h (ทุก 8 ชม.)', match: (pma, pna) => pma <= 34 && pna >= 8 && pna <= 28 },
            { pma: '<= 34 wk', pna: '> 28 days', interval: 'q 6 h (ทุก 6 ชม.)', match: (pma, pna) => pma <= 34 && pna > 28 },
            { pma: '> 34 wk', pna: '0 - 7 days', interval: 'q 8 h (ทุก 8 ชม.)', match: (pma, pna) => pma > 34 && pna >= 0 && pna <= 7 },
            { pma: '> 34 wk', pna: '> 7 days', interval: 'q 6 h (ทุก 6 ชม.)', match: (pma, pna) => pma > 34 && pna > 7 }
        ];

        let matchedRowIndex = -1;
        if (pmaWk > 0 && pnaDay >= 0) {
            matchedRowIndex = rows.findIndex(r => r.match(pmaWk, pnaDay));
        }

        let html = '';
        const minDoseKg = 15;
        const maxDoseKg = 20;

        if (bw > 0) {
            const minTotal = minDoseKg * bw;
            const maxTotal = maxDoseKg * bw;
            totalEl.textContent = `Total: ${minTotal.toFixed(1)} - ${maxTotal.toFixed(1)} mg/day`;
        } else {
            totalEl.textContent = `Total: 0.00 - 0.00 mg/day`;
        }

        rows.forEach((r, idx) => {
            const isMatched = (idx === matchedRowIndex);
            const bgClass = isMatched ? 'bg-rose-100/80 font-bold text-rose-950' : '';
            
            let minSingle = '-';
            let maxSingle = '-';

            if (bw > 0) {
                let dosesPerDay = 1;
                if (r.interval.includes('q 12 h')) dosesPerDay = 2;
                else if (r.interval.includes('q 8 h')) dosesPerDay = 3;
                else if (r.interval.includes('q 6 h')) dosesPerDay = 4;

                minSingle = ((minDoseKg * bw) / dosesPerDay).toFixed(1);
                maxSingle = ((maxDoseKg * bw) / dosesPerDay).toFixed(1);
            }

            html += `
                <tr class="${bgClass} transition-colors">
                    <td class="py-2 px-3">${r.pma}</td>
                    <td class="py-2 px-3">${r.pna}</td>
                    <td class="py-2 px-3 text-right font-bold">${minSingle}</td>
                    <td class="py-2 px-3 text-right font-bold">${maxSingle}</td>
                    <td class="py-2 px-3">mg/dose</td>
                    <td class="py-2 px-3">${r.interval}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }

    // Initial trigger
    calculateAll();
}
