/**
 * Smalldose Calculator Module
 * Complete Vanilla JS with 4 Drug Cards (Ampicillin, Gentamicin, Cloxacillin, Clindamycin)
 * & Recommended Total Fluid Intake Calculator (ESPGHAN/ESPEN/ESPR/CSPEN Guidelines)
 * Timestamp: 2026-08-20
 */

export function render(container) {
    container.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-5 items-start w-full">
        
        <!-- Sidebar -->
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

        <!-- Main Section -->
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

                                    <rect x="242" y="50" width="8" height="10" fill="#cbd5e1" stroke="#1e293b"/>

                                    <path d="M 242 55 C 180 55, 180 110, 110 110 L 30 110" fill="none" stroke="#1e293b" stroke-width="2"/>
                                    <rect x="18" y="105" width="12" height="10" rx="1" fill="#94a3b8" stroke="#1e293b"/>
                                    <line x1="18" y1="110" x2="5" y2="110" stroke="#1e293b" stroke-width="2"/>

                                    <text x="320" y="20" font-size="13" font-weight="normal" fill="#1e293b" text-anchor="middle">Syringe</text>
                                    <text x="130" y="70" font-size="12" font-weight="normal" fill="#1e293b" text-anchor="middle">Infusion Set.</text>

                                    <path d="M 277 125 L 277 88" stroke="#1e293b" stroke-width="1" marker-end="url(#sd-arrow)"/>
                                    <text x="277" y="138" font-size="11" font-weight="normal" fill="#0f766e" text-anchor="middle">ยาให้ผู้ป่วย</text>
                                    <text x="277" y="152" font-size="11" font-weight="normal" fill="#0f766e" text-anchor="middle">A ml</text>

                                    <path d="M 335 125 L 335 88" stroke="#1e293b" stroke-width="1" marker-end="url(#sd-arrow)"/>
                                    <text x="335" y="138" font-size="11" font-weight="normal" fill="#334155" text-anchor="middle">เผื่อค้างสาย</text>
                                    <text x="335" y="152" font-size="11" font-weight="normal" fill="#334155" text-anchor="middle">B ml</text>

                                    <defs>
                                        <marker id="sd-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b"/>
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        <div class="pt-3 md:pt-0 pl-0 md:pl-4 space-y-2.5">
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-800 mb-1">Order IV Infusion</label>
                                    <div class="relative flex items-center">
                                        <input type="number" id="sd-genta-input-a" step="0.1" placeholder="0" class="w-full bg-white border border-slate-300 rounded-lg h-8 px-2 pr-7 text-right font-bold text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500">
                                        <span class="absolute right-1.5 text-[10px] text-slate-500 font-bold pointer-events-none">mg</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-800 mb-1">Target conc.</label>
                                    <div class="relative flex items-center">
                                        <input type="number" id="sd-genta-input-b" value="2" step="0.1" placeholder="2" class="w-full bg-white border border-slate-300 rounded-lg h-8 px-2 pr-10 text-right font-bold text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500">
                                        <span class="absolute right-1.5 text-[10px] text-slate-500 font-bold pointer-events-none">mg/ml</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-800 mb-1">ปริมาตรเผื่อค้างสาย</label>
                                    <div class="relative flex items-center">
                                        <input type="number" id="sd-genta-input-c" value="5" step="0.5" placeholder="5" class="w-full bg-white border border-slate-300 rounded-lg h-8 px-2 pr-7 text-right font-bold text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500">
                                        <span class="absolute right-1.5 text-[10px] text-slate-500 font-bold pointer-events-none">ml</span>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-teal-50/60 border border-teal-200/80 rounded-xl p-3 space-y-1.5 text-teal-950 font-medium">
                                <div class="flex items-center justify-between flex-wrap gap-1">
                                    <span>ปริมาตรรวมใน Syringe หลัก:</span>
                                    <span class="font-bold"><span id="sd-genta-calc-total-vol">0.00</span> ml (มียารวม <span id="sd-genta-calc-total-mg">0.00</span> mg)</span>
                                </div>
                                <div class="flex items-center justify-between flex-wrap gap-1">
                                    <span>ใช้ยา Gentamicin (<span id="sd-genta-stock-conc-label">40</span>mg/ml):</span>
                                    <span class="font-bold text-teal-700"><span id="sd-genta-calc-drug-vol">0.00</span> ml</span>
                                </div>
                                <div class="flex items-center justify-between flex-wrap gap-1">
                                    <span>ใช้สารละลาย (Diluent):</span>
                                    <span class="font-bold text-slate-700"><span id="sd-genta-calc-diluent-vol">0.00</span> ml</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Cloxacillin Card -->
            <div id="sd-card-cloxacillin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4 relative">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Cloxacillin</h3>
                    </div>
                    
                    <div class="flex items-center gap-1.5 bg-white text-slate-700 text-xs px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm">
                        <span>คำนวนจากรูปแบบ Vial</span>
                        <input type="number" id="sd-clox-vial-strength" value="1000" min="1" class="w-16 bg-slate-50 border border-slate-300 rounded px-1 text-center font-bold text-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-500">
                        <span class="font-medium">mg/vial</span>
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
                        <tbody id="sd-tbl-cloxacillin" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
                    </table>
                </div>

                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-4">
                    <div class="flex flex-wrap items-center gap-2 text-xs">
                        <span class="font-bold text-slate-900">Compatible Solution :</span>
                        <span class="font-semibold text-slate-800">D5W, D10W, NSS</span>
                        <span class="text-slate-400">|</span>
                        <span class="font-bold text-slate-900">ความเข้มข้นที่กำหนด :</span>
                        <span class="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">10 mg/ml ถึง 40 mg/ml</span>
                        <span class="text-slate-400">|</span>
                        <div class="flex items-center gap-1.5 bg-white text-slate-700 text-xs px-2.5 py-0.5 rounded-lg border border-amber-200 shadow-sm">
                            <span>ละลายผงยาด้วย</span>
                            <a href="https://pdf.hres.ca/dpd_pm/00019026.PDF" target="_blank" rel="noopener noreferrer" class="font-bold text-indigo-600 hover:text-indigo-800 underline inline-flex items-center gap-0.5" title="เปิดเอกสารอ้างอิง SWFI (PDF)">
                                SWFI
                                <svg class="w-3 h-3 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                            <input type="number" id="sd-clox-swfi-vol" value="5" min="0.1" step="0.5" class="w-12 bg-amber-50 border border-amber-300 rounded text-center font-bold text-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500">
                            <span>ml</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 pt-1">
                        
                        <div class="space-y-2 pr-0 md:pr-3">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block"></span>
                                <h4 class="font-bold text-slate-900 text-sm">แบบ A : IV SLOW push</h4>
                            </div>
                            <div class="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-slate-700">
                                <div><strong class="text-slate-900">Duration :</strong> 10 min</div>
                                <div><strong class="text-slate-900">Max Conc. :</strong> 100 mg/ml</div>
                                <div class="pt-1 text-slate-800">
                                    ใช้สารละลาย<strong class="text-slate-900 font-bold">อย่างน้อย</strong> = 
                                    <span id="sd-clox-slow-min" class="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">0.00</span> 
                                    <strong class="text-slate-900 font-bold">ml</strong>
                                </div>
                            </div>
                        </div>

                        <div class="pt-3 md:pt-0 pl-0 md:pl-4 space-y-2">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block"></span>
                                    <h4 class="font-bold text-slate-900 text-sm">แบบ B : IV infusion</h4>
                                </div>

                                <div class="relative group cursor-pointer inline-flex items-center justify-center shrink-0">
                                    <div class="w-6 h-6 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center text-xs font-bold transition-all shadow hover:scale-105">
                                        ?
                                    </div>
                                    
                                    <div class="absolute bottom-full right-0 mb-2 w-[420px] max-w-[85vw] bg-slate-900 text-slate-100 text-[11px] p-4 rounded-2xl shadow-2xl border border-slate-700 z-[9999] hidden group-hover:block transition-all space-y-3 pointer-events-auto">
                                        <div class="font-normal text-amber-300 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                                            <svg class="w-4 h-4 stroke-amber-400" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 2 2h10a2 2 0 0 2 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>
                                            <span>วิธีเตรียม IV infusion</span>
                                        </div>
                                        
                                        <ol class="list-decimal list-inside space-y-1.5 font-normal leading-relaxed text-slate-200">
                                            <li>ละลายผงยา Cloxacillin (<span id="sd-clox-vial-label">1,000</span> mg) ด้วย SWFI ปริมาตร <span id="sd-clox-swfi-label" class="font-bold text-white">5</span> ml</li>
                                            <li>
                                                ดูดสารละลายยามาใช้ = 
                                                <span class="font-bold text-amber-300 underline">
                                                    <span id="sd-clox-draw-vol">0.00</span> ml
                                                </span> 
                                                <div class="text-slate-400 text-[10px] pl-3 font-normal">(คำนวณจาก: [<span id="sd-clox-swfi-label2">5</span> ml × <span id="sd-clox-dose-label">0.00</span> mg] / <span id="sd-clox-vial-label2">1,000</span> mg)</div>
                                            </li>
                                            <li>
                                                ใช้ Syringe ดูด NSS มา ปริมาตรระหว่าง : 
                                                <strong class="text-white font-bold"><span id="sd-clox-nss-min">0.00</span> ml</strong> - 
                                                <strong class="text-white font-bold"><span id="sd-clox-nss-max">0.00</span> ml</strong>
                                            </li>
                                            <li>นำยาในข้อ 2. เติมไปใน Syringe ข้อ 3. แบบปลาย Syringe ชนกัน (จุ่มกันไปเลย)</li>
                                            <li>ต่อ Syringe (ข้อ 4.) เข้ากับ Extension พร้อมกับ push เติมยาไปในสายเลย <span class="text-slate-400">(กะปริมาตร ได้ประมาณ 2 cc)</span></li>
                                            <li>บริหารยาด้วยเครื่อง Syringe pump <span class="text-amber-200 font-normal">(ตั้งเวลาที่จะใช้ 15 - 60 นาที + ระบุสารน้ำที่ใช้)</span> เครื่องคำนวณอัตราให้เอง</li>
                                            <li class="text-amber-300 font-normal">
                                                เติม NSS อีกประมาณ <strong class="text-white underline">2 cc</strong> เพื่อ flush ยาที่อาจตกค้างอยู่ในสาย Extension pump
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-slate-700">
                                <div><strong class="text-slate-900">Duration :</strong> 15 - 60 min</div>
                                <div><strong class="text-slate-900">Conc. range :</strong> 10 mg/ml - 40 mg/ml</div>
                                <div class="pt-1 space-y-1 text-slate-800">
                                    <div>
                                        ใช้สารละลาย<strong class="text-slate-900 font-bold">อย่างน้อย</strong> = 
                                        <span id="sd-clox-infusion-min" class="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">0.00</span> 
                                        <strong class="text-slate-900 font-bold">ml</strong>
                                    </div>
                                    <div>
                                        ใช้สารละลาย<strong class="text-slate-900 font-bold">ไม่เกิน</strong> = 
                                        <span id="sd-clox-infusion-max" class="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">0.00</span> 
                                        <strong class="text-slate-900 font-bold">ml</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Clindamycin Card -->
            <div id="sd-card-clindamycin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4 relative">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-rose-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Clindamycin <span class="text-sm font-normal text-slate-600">(Dose: 5 - 7 mg/kg)</span></h3>
                    </div>
                    
                    <div class="flex items-center gap-1 bg-white text-slate-700 text-xs px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm self-start sm:self-auto shrink-0">
                        <span>จาก Clindamycin ความแรง</span>
                        <input type="number" id="sd-clinda-stock-mg" value="600" min="1" class="w-12 bg-rose-50 border border-rose-300 rounded px-1 text-center font-bold text-rose-700 focus:outline-none focus:ring-1 focus:ring-rose-500">
                        <span>mg /</span>
                        <input type="number" id="sd-clinda-stock-ml" value="4" min="0.1" step="0.1" class="w-10 bg-rose-50 border border-rose-300 rounded px-1 text-center font-bold text-rose-700 focus:outline-none focus:ring-1 focus:ring-rose-500">
                        <span>ml</span>
                    </div>
                </div>

                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Compat. sol. :</span>
                        <span class="font-semibold text-slate-800">D5W, D10W, NSS</span>
                        <span class="text-slate-300">|</span>
                        <span class="font-bold text-slate-900">Max Conc. :</span>
                        <span class="font-semibold text-slate-800">18 mg/ml</span>
                        <span class="text-slate-300">|</span>
                        <span class="font-bold text-slate-900">Max IV rate :</span>
                        <span class="font-semibold text-slate-800">30 mg/min</span>
                    </div>
                    <span class="inline-block bg-slate-200/80 text-slate-700 text-[11px] px-2.5 py-0.5 rounded font-bold border border-slate-300">
                        ข้อมูลจาก Neofax
                    </span>
                </div>

                <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                                <th class="py-2.5 px-3">PMA</th>
                                <th class="py-2.5 px-3">PNA</th>
                                <th class="py-2.5 px-3 text-right">5mg/kg (mg)</th>
                                <th class="py-2.5 px-3 text-right">7mg/kg (mg)</th>
                                <th class="py-2.5 px-3">Unit</th>
                                <th class="py-2.5 px-3">Interval</th>
                            </tr>
                        </thead>
                        <tbody id="sd-tbl-clindamycin" class="divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
                    </table>
                </div>

                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 space-y-3">

                    <div id="sd-clinda-calc-box" class="bg-white border border-slate-200 rounded-xl p-3 space-y-2.5">
                        <div class="font-bold text-slate-800 flex items-center justify-between">
                            <span>คำนวณ Order & แนะนำ IV Rate (Safety Check)</span>
                        </div>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[11px] font-bold text-slate-700 mb-1">Order ขนาดยา</label>
                                <div class="relative flex items-center">
                                    <input type="number" id="sd-clinda-order-dose" step="0.01" placeholder="0" class="w-full bg-slate-50 border border-slate-300 rounded-lg h-8 px-2 pr-8 text-right font-bold text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500">
                                    <span class="absolute right-2 text-[10px] text-slate-500 font-bold pointer-events-none">mg</span>
                                </div>
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-700 mb-1">
                                    ปริมาตรสารน้ำที่ใช้ผสมเติมเพิ่ม (Diluent) <strong class="underline text-slate-900">อย่างน้อย</strong>
                                </label>
                                <div class="relative flex items-center">
                                    <input type="number" id="sd-clinda-order-vol" step="0.01" placeholder="0" class="w-full bg-slate-50 border border-slate-300 rounded-lg h-8 px-2 pr-7 text-right font-bold text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500">
                                    <span class="absolute right-2 text-[10px] text-slate-500 font-bold pointer-events-none">ml</span>
                                </div>
                            </div>
                        </div>

                        <div class="pt-2 space-y-1.5 border-t border-slate-100 text-xs">
                            <div class="flex items-center justify-between flex-wrap gap-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <span>เนื้อยาที่ดูดมา (<span id="sd-clinda-drug-vol-desc">0.00</span> ml) + สารน้ำที่เติม (<span id="sd-clinda-diluent-vol-desc">0.00</span> ml):</span>
                                <span class="font-bold text-slate-900">ปริมาตรรวม = <span id="sd-clinda-total-vol">0.00</span> ml</span>
                            </div>

                            <div class="flex items-center justify-between flex-wrap gap-1">
                                <span>ความเข้มข้นที่ได้ (Conc.) :</span>
                                <span id="sd-clinda-calc-conc-display" class="font-bold text-slate-800">
                                    <span id="sd-clinda-calc-conc">0.00</span> mg/ml 
                                    <span class="text-[10px] font-normal text-slate-500">(Max ≤ 18 mg/ml)</span>
                                </span>
                            </div>

                            <div class="flex items-center justify-between flex-wrap gap-1">
                                <span>เสนอให้ IV Rate สูงสุดไม่เกิน :</span>
                                <span id="sd-clinda-calc-rate-display" class="font-bold text-rose-700">
                                    <span id="sd-clinda-calc-rate-min">0.00</span> ml/min 
                                    (<span id="sd-clinda-calc-rate-hr">0.00</span> ml/hr)
                                </span>
                            </div>

                            <div id="sd-clinda-alert-msg" class="hidden text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2 mt-1">
                            </div>
                        </div>
                    </div>

                    <div class="space-y-1 pt-0.5">
                        <div class="font-bold text-slate-800">
                            **บาง <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/050441s090lbl.pdf" target="_blank" rel="noopener noreferrer" class="text-rose-600 hover:text-rose-800 underline inline-flex items-center gap-0.5 font-semibold" title="เปิดเอกสารอ้างอิง FDA (PDF)">ref.</a> อาจแนะนำขนาดยาต่างออกไป
                        </div>
                        
                        <ul class="list-disc list-inside space-y-1 pl-1 text-slate-700">
                            <li id="sd-clinda-ref-line1">
                                <span>Postmenstrual Age น้อยกว่าหรือเท่ากับ 32 Weeks : 5 mg/kg IV every 8 hours</span>
                                <span> = </span>
                                <span id="sd-clinda-ref-val1" class="text-slate-900"><strong id="sd-clinda-ref-dose1">0.00</strong> mg q 8 hr(s).</span>
                            </li>
                            <li id="sd-clinda-ref-line2">
                                <span>Postmenstrual Age มากกว่า 32 Weeks ถึง 40 Weeks : 7 mg/kg IV every 8 hours</span>
                                <span> = </span>
                                <span id="sd-clinda-ref-val2" class="text-slate-900"><strong id="sd-clinda-ref-dose2">0.00</strong> mg q 8 hr(s).</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <!-- Fluid Intake Card -->
            <div id="sd-card-fluid" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div class="flex items-center gap-2">
                        <span class="w-3.5 h-3.5 rounded-full bg-cyan-600 inline-block"></span>
                        <h3 class="text-xl font-bold text-slate-800">Fluid Intake (ปริมาณสารน้ำที่แนะนำ)</h3>
                    </div>
                    <a href="https://www.clinicalnutritionjournal.com/article/S0261-5614(18)31167-1/fulltext" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-cyan-700 hover:text-cyan-900 underline inline-flex items-center gap-1">
                        <span>ESPGHAN/ESPEN/ESPR/CSPEN Guidelines</span>
                        <svg class="w-3 h-3 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <!-- ฝั่งซ้าย: ปริมาณสารน้ำทดแทน (แคบลงเป็น 5 คอลัมน์) -->
                    <div class="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-center shadow-sm">
                        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Recommended Fluid intake</div>
                        <div id="sd-fluid-range-display" class="text-2xl sm:text-3xl font-black text-cyan-700 tracking-tight">
                            0.00 - 0.00 ml/<span class="text-sm font-bold text-slate-600">Day</span>
                        </div>
                        <div id="sd-fluid-mlkg-display" class="text-xs font-semibold text-slate-600">
                            (0 - 0 ml/kg/day)
                        </div>
                    </div>

                    <!-- ฝั่งขวา: คำอธิบาย (กว้างขึ้นเป็น 7 คอลัมน์) -->
                    <div class="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-center space-y-2 shadow-sm">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider">รายละเอียดเกณฑ์การคำนวณ</div>
                        <div id="sd-fluid-summary-display" class="text-sm text-slate-800 font-semibold space-y-1">
                            -
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>
    `;

    initSmalldoseEvents(container);
}

function initSmalldoseEvents(container) {
    const gaWkInput = container.querySelector('#sd-ga-wk');
    const gaDayInput = container.querySelector('#sd-ga-day');
    const pnaDayInput = container.querySelector('#sd-pna-day');
    const bwInput = container.querySelector('#sd-bw');

    const inputs = [gaWkInput, gaDayInput, pnaDayInput, bwInput];

    const pnaMinusBtn = container.querySelector('#sd-pna-minus');
    const pnaPlusBtn = container.querySelector('#sd-pna-plus');
    const bwMinusBtn = container.querySelector('#sd-bw-minus');
    const bwPlusBtn = container.querySelector('#sd-bw-plus');
    const resetBtn = container.querySelector('#sd-btn-reset');

    const chkAmp = container.querySelector('#sd-chk-ampicillin');
    const chkGenta = container.querySelector('#sd-chk-gentamicin');
    const chkClox = container.querySelector('#sd-chk-cloxacillin');
    const chkClinda = container.querySelector('#sd-chk-clindamycin');

    const cardAmp = container.querySelector('#sd-card-ampicillin');
    const cardGenta = container.querySelector('#sd-card-gentamicin');
    const cardClox = container.querySelector('#sd-card-cloxacillin');
    const cardClinda = container.querySelector('#sd-card-clindamycin');

    const gentaStockMgInput = container.querySelector('#sd-genta-stock-mg');
    const gentaStockMlInput = container.querySelector('#sd-genta-stock-ml');
    const gentaInputA = container.querySelector('#sd-genta-input-a');
    const gentaInputB = container.querySelector('#sd-genta-input-b');
    const gentaInputC = container.querySelector('#sd-genta-input-c');
    let isUserModifiedA = false;

    const cloxVialStrengthInput = container.querySelector('#sd-clox-vial-strength');
    const cloxSwfiVolInput = container.querySelector('#sd-clox-swfi-vol');

    const clindaStockMgInput = container.querySelector('#sd-clinda-stock-mg');
    const clindaStockMlInput = container.querySelector('#sd-clinda-stock-ml');
    const clindaOrderDoseInput = container.querySelector('#sd-clinda-order-dose');
    const clindaOrderVolInput = container.querySelector('#sd-clinda-order-vol');
    let isUserModifiedClindaDose = false;
    let isUserModifiedClindaVol = false;

    gentaStockMgInput.addEventListener('input', calculateAll);
    gentaStockMlInput.addEventListener('input', calculateAll);

    gentaInputA.addEventListener('input', () => {
        isUserModifiedA = true;
        calculateAll();
    });
    gentaInputB.addEventListener('input', calculateAll);
    gentaInputC.addEventListener('input', calculateAll);

    cloxVialStrengthInput.addEventListener('input', calculateAll);
    cloxSwfiVolInput.addEventListener('input', calculateAll);

    clindaStockMgInput.addEventListener('input', calculateAll);
    clindaStockMlInput.addEventListener('input', calculateAll);

    clindaOrderDoseInput.addEventListener('input', () => {
        isUserModifiedClindaDose = true;
        calculateAll();
    });
    clindaOrderVolInput.addEventListener('input', () => {
        isUserModifiedClindaVol = true;
        calculateAll();
    });

    function formatNum(val, decimals = 2) {
        const num = parseFloat(val);
        if (isNaN(num)) return "0.00";
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                    nextInput.select();
                } else {
                    input.blur();
                }
            }
        });
    });

    pnaMinusBtn.addEventListener('click', () => {
        let val = parseInt(pnaDayInput.value) || 0;
        if (val > 1) {
            pnaDayInput.value = val - 1;
        } else {
            pnaDayInput.value = "";
        }
        calculateAll();
    });

    pnaPlusBtn.addEventListener('click', () => {
        let val = parseInt(pnaDayInput.value) || 0;
        pnaDayInput.value = val + 1;
        calculateAll();
    });

    bwMinusBtn.addEventListener('click', () => {
        let val = parseFloat(bwInput.value) || 0;
        if (val > 0.1) {
            bwInput.value = (val - 0.1).toFixed(3);
        } else {
            bwInput.value = "";
        }
        calculateAll();
    });

    bwPlusBtn.addEventListener('click', () => {
        let val = parseFloat(bwInput.value) || 0;
        bwInput.value = (val + 0.1).toFixed(3);
        calculateAll();
    });

    resetBtn.addEventListener('click', () => {
        inputs.forEach(input => input.value = "");
        chkAmp.checked = false;
        chkGenta.checked = false;
        chkClox.checked = false;
        chkClinda.checked = false;

        gentaStockMgInput.value = "80";
        gentaStockMlInput.value = "2";
        gentaInputB.value = "2";
        gentaInputC.value = "5";
        isUserModifiedA = false;

        cloxVialStrengthInput.value = "1000";
        cloxSwfiVolInput.value = "5";

        clindaStockMgInput.value = "600";
        clindaStockMlInput.value = "4";
        isUserModifiedClindaDose = false;
        isUserModifiedClindaVol = false;
        clindaOrderDoseInput.value = "";
        clindaOrderVolInput.value = "";
        
        cardAmp.classList.add('hidden');
        cardGenta.classList.add('hidden');
        cardClox.classList.add('hidden');
        cardClinda.classList.add('hidden');

        calculateAll();
    });

    inputs.forEach(elem => {
        elem.addEventListener('input', () => {
            calculateAll();
        });
    });

    chkAmp.addEventListener('change', () => cardAmp.classList.toggle('hidden', !chkAmp.checked));
    chkGenta.addEventListener('change', () => cardGenta.classList.toggle('hidden', !chkGenta.checked));
    chkClox.addEventListener('change', () => cardClox.classList.toggle('hidden', !chkClox.checked));
    chkClinda.addEventListener('change', () => cardClinda.classList.toggle('hidden', !chkClinda.checked));

    function calculateAll() {
        const gaWk = parseInt(gaWkInput.value) || 0;
        const gaDay = parseInt(gaDayInput.value) || 0;
        const pnaDay = parseInt(pnaDayInput.value) || 0;
        const bw = parseFloat(bwInput.value) || 0;

        const totalDays = gaDay + pnaDay;
        const extraWk = Math.floor(totalDays / 7);
        const remDays = totalDays % 7;
        const roundedWk = remDays >= 4 ? 1 : 0;
        const pma = gaWk + extraWk + roundedWk;

        const pmaDisplay = container.querySelector('#sd-pma-display');
        const pmaDesc = container.querySelector('#sd-pma-desc');
        pmaDisplay.innerText = `${pma} wk`;
        
        pmaDesc.innerHTML = `
            <div>• PMA = GA (${gaWk}w ${gaDay}d) + PNA (${pnaDay}d)</div>
            <div>• วันรวม = ${gaDay}+${pnaDay} = ${totalDays} วัน</div>
            <div>• ${remDays >= 4 ? `เศษ ${remDays} วัน (≥4 วัน) ปัดขึ้น +1w` : `เศษ ${remDays} วัน (<4 วัน) ไม่ปัดขึ้น`}</div>
            <div>→ สรุป PMA = ${pma} สัปดาห์</div>
        `;

        renderFluidIntake(gaWk, pnaDay, bw);
        renderAmpicillin(pma, pnaDay, bw);
        renderGentamicin(pma, pnaDay, bw);
        renderCloxacillin(pma, pnaDay, bw);
        renderClindamycin(pma, pnaDay, bw);
    }

    /**
     * Fix Logic สารน้ำตามตารางใหม่
     * - Term neonate: GA >= 38 wk
     * - ตั้งแต่ PNA Day 6 ขึ้นไป แบ่งเป็น 3 กลุ่ม:
     *   1) Term neonate
     *   2) Preterm neonate > 1500 g
     *   3) Preterm neonate < 1500 g
     */
    function renderFluidIntake(gaWk, pnaDay, bw) {
        const rangeDisplay = container.querySelector('#sd-fluid-range-display');
        const mlkgDisplay = container.querySelector('#sd-fluid-mlkg-display');
        const summaryDisplay = container.querySelector('#sd-fluid-summary-display');

        if (!gaWk || !pnaDay || !bw) {
            rangeDisplay.innerHTML = `0.00 - 0.00 ml/<span class="text-sm font-bold text-slate-600">Day</span>`;
            mlkgDisplay.innerText = `(0 - 0 ml/kg/day)`;
            summaryDisplay.innerText = `-`;
            return;
        }

        const isTerm = gaWk >= 38; // Declare: Term neonate นับที่ GA >= 38 wk
        const bwGrams = bw * 1000;
        let minMlKg = 0;
        let maxMlKg = 0;
        let categoryText = "";

        if (isTerm) {
            categoryText = "Term neonate";
            if (pnaDay === 1) { minMlKg = 40; maxMlKg = 60; }
            else if (pnaDay === 2) { minMlKg = 50; maxMlKg = 70; }
            else if (pnaDay === 3) { minMlKg = 60; maxMlKg = 80; }
            else if (pnaDay === 4) { minMlKg = 60; maxMlKg = 100; }
            else if (pnaDay === 5) { minMlKg = 100; maxMlKg = 140; }
            else if (pnaDay >= 6 && pnaDay <= 10) { minMlKg = 140; maxMlKg = 170; }
            else { minMlKg = 140; maxMlKg = 160; } // Day 11+
        } else {
            // Preterm neonate
            if (pnaDay >= 6) {
                // ตั้งแต่อายุทารกวันที่ 6 ขึ้นไป แบ่ง 2 กลุ่มย่อยสำหรับ Preterm
                if (bwGrams > 1500) {
                    categoryText = "Preterm neonate > 1500 g";
                    minMlKg = 140; maxMlKg = 160;
                } else {
                    categoryText = "Preterm neonate < 1500 g";
                    minMlKg = 140; maxMlKg = 160;
                }
            } else {
                // PNA Day 1 - 5 แบ่งตามช่วงน้ำหนักตัวเดิม
                if (bwGrams > 1500) {
                    categoryText = "Preterm neonate > 1500 g";
                    if (pnaDay === 1) { minMlKg = 60; maxMlKg = 80; }
                    else if (pnaDay === 2) { minMlKg = 80; maxMlKg = 100; }
                    else if (pnaDay === 3) { minMlKg = 100; maxMlKg = 120; }
                    else if (pnaDay === 4) { minMlKg = 120; maxMlKg = 140; }
                    else if (pnaDay === 5) { minMlKg = 140; maxMlKg = 160; }
                } else if (bwGrams >= 1000 && bwGrams <= 1500) {
                    categoryText = "Preterm neonate 1000 - 1500 g";
                    if (pnaDay === 1) { minMlKg = 70; maxMlKg = 90; }
                    else if (pnaDay === 2) { minMlKg = 90; maxMlKg = 110; }
                    else if (pnaDay === 3) { minMlKg = 110; maxMlKg = 130; }
                    else if (pnaDay === 4) { minMlKg = 130; maxMlKg = 150; }
                    else if (pnaDay === 5) { minMlKg = 160; maxMlKg = 180; }
                } else {
                    // bwGrams < 1000 g
                    categoryText = "Preterm neonate < 1000 g";
                    if (pnaDay === 1) { minMlKg = 80; maxMlKg = 100; }
                    else if (pnaDay === 2) { minMlKg = 100; maxMlKg = 120; }
                    else if (pnaDay === 3) { minMlKg = 120; maxMlKg = 140; }
                    else if (pnaDay === 4) { minMlKg = 140; maxMlKg = 160; }
                    else if (pnaDay === 5) { minMlKg = 160; maxMlKg = 180; }
                }
            }
        }

        const minMl = minMlKg * bw;
        const maxMl = maxMlKg * bw;

        rangeDisplay.innerHTML = `${formatNum(minMl)} - ${formatNum(maxMl)} ml/<span class="text-sm font-bold text-slate-600">Day</span>`;
        mlkgDisplay.innerText = `(${minMlKg} - ${maxMlKg} ml/kg/day)`;
        
        // แยกบรรทัด 1 หัวข้อ 1 บรรทัด + ระบุ Term neonate นับที่ GA >= 38 wk
        summaryDisplay.innerHTML = `
            <div>• กลุ่มทารก: ${categoryText} <span class="text-xs font-normal text-slate-500">(Term neonate นับที่ GA ≥ 38 wk)</span></div>
            <div>• PNA Day ${pnaDay}</div>
            <div>• BW: ${formatNum(bw, 3)} kg</div>
        `;
    }

    function renderAmpicillin(pma, pna, bw) {
        const minTotalNum = 150 * bw;
        const maxTotalNum = 200 * bw;
        container.querySelector('#sd-amp-total').innerText = `Total: ${formatNum(minTotalNum)} - ${formatNum(maxTotalNum)} mg/day`;

        const rows = [
            { pmaCond: pma <= 29, pnaCond: pna <= 28, pmaText: "≤ 29 wk", pnaText: "0 - 28 days", div: 2, freq: "q 12 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna >= 29, pmaText: "≤ 29 wk", pnaText: "≥ 29 days", div: 3, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna <= 14, pmaText: "30 - 36 wk", pnaText: "0 - 14 days", div: 2, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna >= 15, pmaText: "30 - 36 wk", pnaText: "≥ 8 days", div: 3, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna <= 7, pmaText: "37 - 44 wk", pnaText: "0 - 7 days", div: 2, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna >= 8, pmaText: "37 - 44 wk", pnaText: "≥ 8 days", div: 3, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 45, pnaCond: true, pmaText: "≥ 45 wk", pnaText: "All days", div: 4, freq: "q 6 hr(s)" },
        ];

        let html = "";
        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const minDose = minTotalNum / r.div;
            const maxDose = maxTotalNum / r.div;
            const activeClass = isMatch ? "bg-indigo-100/90 font-bold text-indigo-900 border-l-4 border-indigo-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${formatNum(minDose)}</td>
                <td class="py-2 px-3 text-right">${formatNum(maxDose)}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-ampicillin').innerHTML = html;
    }

    function renderGentamicin(pma, pna, bw) {
        const rows = [
            { pmaCond: pma <= 29, pnaCond: pna <= 7, pmaText: "≤ 29 wk", pnaText: "0 - 7 days", dose: 5.0, freq: "q 48 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna >= 8 && pna <= 28, pmaText: "≤ 29 wk", pnaText: "8 - 28 days", dose: 4.0, freq: "q 36 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna >= 29, pmaText: "≤ 29 wk", pnaText: "≥ 29 days", dose: 4.0, freq: "q 24 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 34, pnaCond: pna <= 7, pmaText: "30 - 34 wk", pnaText: "0 - 7 days", dose: 4.5, freq: "q 36 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 34, pnaCond: pna >= 8, pmaText: "30 - 34 wk", pnaText: "≥ 8 days", dose: 4.0, freq: "q 24 hr(s)" },
            { pmaCond: pma >= 35, pnaCond: true, pmaText: "≥ 35 wk", pnaText: "All days", dose: 4.0, freq: "q 24 hr(s)" },
        ];

        let html = "";
        let calculatedDoseMg = 0;

        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const doseMg = bw * r.dose;
            if (isMatch) {
                calculatedDoseMg = doseMg;
            }
            const activeClass = isMatch ? "bg-teal-100/90 font-bold text-teal-900 border-l-4 border-teal-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${formatNum(doseMg)}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-gentamicin').innerHTML = html;

        const stockMg = parseFloat(gentaStockMgInput.value) || 80;
        const stockMl = parseFloat(gentaStockMlInput.value) || 2;
        const stockConc = stockMl > 0 ? (stockMg / stockMl) : 0;

        container.querySelector('#sd-genta-stock-conc-label').innerText = formatNum(stockConc, 0);

        const minSolVol = calculatedDoseMg / 10;
        container.querySelector('#sd-genta-min-sol').innerText = formatNum(minSolVol);

        if (!isUserModifiedA) {
            gentaInputA.value = calculatedDoseMg > 0 ? calculatedDoseMg.toFixed(2) : "";
        }

        const inputA = parseFloat(gentaInputA.value) || 0; 
        const inputB = parseFloat(gentaInputB.value) || 0; 
        const inputC = parseFloat(gentaInputC.value) || 0; 

        const patientInfuseVol = inputB > 0 ? (inputA / inputB) : 0;
        const totalPrepVol = patientInfuseVol + inputC;
        const totalMgInSyringe = totalPrepVol * inputB;
        
        const drugVol = stockConc > 0 ? (totalMgInSyringe / stockConc) : 0;
        const diluentVol = totalPrepVol - drugVol;

        container.querySelector('#sd-genta-calc-total-vol').innerText = formatNum(totalPrepVol);
        container.querySelector('#sd-genta-calc-total-mg').innerText = formatNum(totalMgInSyringe);
        container.querySelector('#sd-genta-calc-drug-vol').innerText = formatNum(drugVol > 0 ? drugVol : 0);
        container.querySelector('#sd-genta-calc-diluent-vol').innerText = formatNum(diluentVol > 0 ? diluentVol : 0);

        container.querySelector('#sd-step-diluent').innerText = formatNum(diluentVol > 0 ? diluentVol : 0);
        container.querySelector('#sd-step-drug').innerText = formatNum(drugVol > 0 ? drugVol : 0);
        container.querySelector('#sd-step-drug-mg').innerText = formatNum(totalMgInSyringe);
        container.querySelector('#sd-step-total').innerText = formatNum(totalPrepVol);
        container.querySelector('#sd-alert-vol').innerText = formatNum(patientInfuseVol);
        container.querySelector('#sd-alert-remain').innerText = formatNum(inputC);
    }

    function renderCloxacillin(pma, pna, bw) {
        const rows = [
            { pmaCond: pma <= 29, pnaCond: pna <= 28, pmaText: "≤ 29 wk", pnaText: "0 - 28 days", dose: 25, freq: "q 12 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna >= 29, pmaText: "≤ 29 wk", pnaText: "≥ 29 days", dose: 25, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna <= 14, pmaText: "30 - 36 wk", pnaText: "0 - 14 days", dose: 25, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna >= 15, pmaText: "30 - 36 wk", pnaText: "≥ 8 days", dose: 25, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna <= 7, pmaText: "37 - 44 wk", pnaText: "0 - 7 days", dose: 25, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna >= 8, pmaText: "37 - 44 wk", pnaText: "≥ 8 days", dose: 25, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 45, pnaCond: true, pmaText: "≥ 45 wk", pnaText: "All days", dose: 25, freq: "q 6 hr(s)" },
        ];

        let html = "";
        let matchedDoseMg = 0;

        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const doseMg = bw * r.dose;
            if (isMatch) {
                matchedDoseMg = doseMg;
            }
            const activeClass = isMatch ? "bg-amber-100/90 font-bold text-amber-900 border-l-4 border-amber-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${formatNum(doseMg)}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-cloxacillin').innerHTML = html;

        const vialMg = parseFloat(cloxVialStrengthInput.value) || 1000;
        const swfiVol = parseFloat(cloxSwfiVolInput.value) || 5;

        const slowPushMinVol = matchedDoseMg / 100;
        
        const infusionMinVol = matchedDoseMg / 40;
        const infusionMaxVol = matchedDoseMg / 10;

        const drawVol = vialMg > 0 ? (swfiVol * matchedDoseMg) / vialMg : 0;

        container.querySelector('#sd-clox-slow-min').innerText = formatNum(slowPushMinVol);
        container.querySelector('#sd-clox-infusion-min').innerText = formatNum(infusionMinVol);
        container.querySelector('#sd-clox-infusion-max').innerText = formatNum(infusionMaxVol);

        container.querySelector('#sd-clox-vial-label').innerText = formatNum(vialMg, 0);
        container.querySelector('#sd-clox-vial-label2').innerText = formatNum(vialMg, 0);
        container.querySelector('#sd-clox-swfi-label').innerText = formatNum(swfiVol, 1);
        container.querySelector('#sd-clox-swfi-label2').innerText = formatNum(swfiVol, 1);
        container.querySelector('#sd-clox-dose-label').innerText = formatNum(matchedDoseMg);
        container.querySelector('#sd-clox-draw-vol').innerText = formatNum(drawVol);

        container.querySelector('#sd-clox-nss-min').innerText = formatNum(infusionMinVol);
        container.querySelector('#sd-clox-nss-max').innerText = formatNum(infusionMaxVol);
    }

    function renderClindamycin(pma, pna, bw) {
        const rows = [
            { pmaCond: pma <= 29, pnaCond: pna <= 28, pmaText: "≤ 29 wk", pnaText: "0 - 28 days", doseMin: 5, doseMax: 7, freq: "q 12 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna >= 29, pmaText: "≤ 29 wk", pnaText: "≥ 29 days", doseMin: 5, doseMax: 7, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna <= 14, pmaText: "30 - 36 wk", pnaText: "0 - 14 days", doseMin: 5, doseMax: 7, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna >= 15, pmaText: "30 - 36 wk", pnaText: "≥ 8 days", doseMin: 5, doseMax: 7, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna <= 7, pmaText: "37 - 44 wk", pnaText: "0 - 7 days", doseMin: 5, doseMax: 7, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna >= 8, pmaText: "37 - 44 wk", pnaText: "≥ 8 days", div: 3, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 45, pnaCond: true, pmaText: "≥ 45 wk", pnaText: "All days", div: 4, freq: "q 6 hr(s)" },
        ];

        let html = "";
        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const doseMinVal = bw * r.doseMin;
            const doseMaxVal = bw * r.doseMax;
            const activeClass = isMatch ? "bg-rose-100/90 font-bold text-rose-900 border-l-4 border-rose-600" : "";
            
            html += `<tr class="${activeClass}">
                <td class="py-2 px-3">${r.pmaText}</td>
                <td class="py-2 px-3">${r.pnaText}</td>
                <td class="py-2 px-3 text-right">${formatNum(doseMinVal)}</td>
                <td class="py-2 px-3 text-right">${formatNum(doseMaxVal)}</td>
                <td class="py-2 px-3">mg</td>
                <td class="py-2 px-3">${r.freq}</td>
            </tr>`;
        });
        container.querySelector('#sd-tbl-clindamycin').innerHTML = html;

        const stockMg = parseFloat(clindaStockMgInput.value) || 600;
        const stockMl = parseFloat(clindaStockMlInput.value) || 4;
        const stockConc = stockMg / stockMl;

        const defaultDoseMg = bw * 5;

        const defaultTotalVolNeeded = defaultDoseMg > 0 ? (defaultDoseMg / 18) : 0;
        const defaultDrugVol = stockConc > 0 ? (defaultDoseMg / stockConc) : 0;
        const defaultDiluentVol = defaultTotalVolNeeded > defaultDrugVol ? (defaultTotalVolNeeded - defaultDrugVol) : 0;

        if (!isUserModifiedClindaDose) {
            clindaOrderDoseInput.value = defaultDoseMg > 0 ? defaultDoseMg.toFixed(2) : "";
        }
        
        const currentDose = parseFloat(clindaOrderDoseInput.value) || 0;
        const curTotalVolNeeded = currentDose > 0 ? (currentDose / 18) : 0;
        const curDrugVol = stockConc > 0 ? (currentDose / stockConc) : 0;
        const curDiluentVolCalculated = curTotalVolNeeded > curDrugVol ? (curTotalVolNeeded - curDrugVol) : 0;

        if (!isUserModifiedClindaVol) {
            clindaOrderVolInput.value = curDiluentVolCalculated > 0 ? curDiluentVolCalculated.toFixed(2) : "";
        }

        const currentDiluentVol = parseFloat(clindaOrderVolInput.value) || 0;
        const currentDrugVol = stockConc > 0 ? (currentDose / stockConc) : 0;
        const totalVol = currentDrugVol + currentDiluentVol;
        const currentConc = totalVol > 0 ? (currentDose / totalVol) : 0;
        
        const rateMlMin = currentDose > 0 ? (30 * totalVol) / currentDose : 0;
        const rateMlHr = rateMlMin * 60;

        container.querySelector('#sd-clinda-drug-vol-desc').innerText = formatNum(currentDrugVol);
        container.querySelector('#sd-clinda-diluent-vol-desc').innerText = formatNum(currentDiluentVol);
        container.querySelector('#sd-clinda-total-vol').innerText = formatNum(totalVol);

        const concElem = container.querySelector('#sd-clinda-calc-conc');
        const concDisplay = container.querySelector('#sd-clinda-calc-conc-display');
        const rateMinElem = container.querySelector('#sd-clinda-calc-rate-min');
        const rateHrElem = container.querySelector('#sd-clinda-calc-rate-hr');
        const rateDisplay = container.querySelector('#sd-clinda-calc-rate-display');
        const alertMsg = container.querySelector('#sd-clinda-alert-msg');
        const calcBox = container.querySelector('#sd-clinda-calc-box');

        concElem.innerText = formatNum(currentConc);
        rateMinElem.innerText = formatNum(rateMlMin);
        rateHrElem.innerText = formatNum(rateMlHr);

        let hasError = false;
        let errorMessages = [];

        if (Math.round(currentConc * 100) / 100 > 18) {
            hasError = true;
            errorMessages.push(`• ความเข้มข้นรวมสูงเกินเกณฑ์กำหนด (${formatNum(currentConc)} mg/ml > 18 mg/ml)`);
        }

        if (hasError) {
            concDisplay.className = "font-bold text-rose-600 underline";
            rateDisplay.className = "font-bold text-rose-600 underline";
            calcBox.className = "bg-rose-50/60 border-2 border-rose-500 rounded-xl p-3 space-y-2.5 transition-colors";
            alertMsg.innerHTML = errorMessages.join('<br>');
            alertMsg.classList.remove('hidden');
        } else {
            concDisplay.className = "font-bold text-slate-800";
            rateDisplay.className = "font-bold text-rose-700";
            calcBox.className = "bg-white border border-slate-200 rounded-xl p-3 space-y-2.5 transition-colors";
            alertMsg.classList.add('hidden');
            alertMsg.innerHTML = "";
        }

        const refDose1 = bw * 5;
        const refDose2 = bw * 7;

        container.querySelector('#sd-clinda-ref-dose1').innerText = formatNum(refDose1);
        container.querySelector('#sd-clinda-ref-dose2').innerText = formatNum(refDose2);

        const line1 = container.querySelector('#sd-clinda-ref-line1');
        const line2 = container.querySelector('#sd-clinda-ref-line2');
        const val1 = container.querySelector('#sd-clinda-ref-val1');
        const val2 = container.querySelector('#sd-clinda-ref-val2');

        const isMatchPma1 = pma > 0 && pma <= 32;
        const isMatchPma2 = pma > 32 && pma <= 40;

        line1.className = isMatchPma1 ? "font-bold text-rose-950 bg-rose-100/70 p-1 rounded-lg border-l-2 border-rose-500" : "font-normal text-slate-700";
        line2.className = isMatchPma2 ? "font-bold text-rose-950 bg-rose-100/70 p-1 rounded-lg border-l-2 border-rose-500" : "font-normal text-slate-700";

        val1.className = isMatchPma1 ? "font-black text-rose-700 underline" : "text-slate-900";
        val2.className = isMatchPma2 ? "font-black text-rose-700 underline" : "text-slate-900";
    }

    calculateAll();
}
