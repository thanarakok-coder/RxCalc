/**
 * Smalldose Calculator Module
 * Updated: Fixed Syntax Error (Nested Backticks in SVG), UI Alignments, Popover Tooltip
 * Timestamp: 2026-08-18
 */

export function render(container) {
    container.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-5 items-start w-full">
        
        <!-- Zone A: Sidebar Input -->
        <aside class="w-full lg:w-[22%] bg-slate-900 text-slate-100 p-4 rounded-3xl shadow-xl flex flex-col gap-4 shrink-0">
            
            <!-- Header Section -->
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

            <!-- Inputs Section -->
            <div class="space-y-3.5">
                
                <!-- กรอบที่ 1: ข้อมูลครรภ์ (GA) -->
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

                <!-- กรอบที่ 2: ข้อมูลทารก (BABY) -->
                <div class="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 space-y-3">
                    <span class="text-[11px] font-bold tracking-wider text-teal-300 uppercase flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.5 1.5 1 2 1s1.5-.5 2-1"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 5 6.3"/></svg>
                        ข้อมูลทารก (BABY)
                    </span>
                    
                    <!-- PNA Input -->
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

                    <!-- BW Input -->
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

                <!-- สรุป PMA -->
                <div class="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 text-center space-y-1.5">
                    <span class="text-[11px] uppercase tracking-wider text-teal-400 font-bold block">CALCULATED PMA</span>
                    <div id="sd-pma-display" class="text-2xl font-black text-teal-300 tracking-tight">0 wk</div>
                    <div id="sd-pma-desc" class="text-[11px] text-slate-300 font-normal leading-relaxed text-left pt-1 border-t border-slate-800/80 space-y-0.5">
                        <!-- JS Dynamic Text -->
                    </div>
                </div>

                <!-- เลือกแสดงรายยา -->
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

        <!-- Zone B: Output Display -->
        <main class="w-full lg:w-[78%] flex flex-col gap-5">
            
            <!-- Card Ampicillin -->
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

            <!-- Card Gentamicin -->
            <div id="sd-card-gentamicin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-teal-600 inline-block"></span>
                    <h3 class="text-xl font-bold text-slate-800">Gentamicin</h3>
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

                <!-- Gentamicin Detail Section -->
                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        
                        <!-- ฝั่งซ้าย -->
                        <div class="space-y-3 pr-0 md:pr-4 flex flex-col justify-between">
                            <div class="grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-1.5 items-baseline text-xs">
                                <span class="font-bold text-slate-900">Compatible Solution</span>
                                <span class="font-bold text-slate-900">:</span>
                                <span class="font-semibold text-slate-800">D5W, D10W, NSS</span>

                                <span class="font-bold text-slate-900">Max Conc. 10mg/ml</span>
                                <span class="font-bold text-slate-900">=</span>
                                <span>ต้องใช้สารละลาย<strong class="text-slate-900 font-black">อย่างน้อย</strong> <span id="sd-genta-min-sol" class="font-bold text-slate-900">0.00</span> ml</span>

                                <span class="font-bold text-slate-900">IV infusion</span>
                                <span class="font-bold text-slate-900">:</span>
                                <span><strong class="text-slate-900 font-black">อย่างน้อย</strong> 30-120 นาที</span>
                            </div>

                            <!-- รูป SVG แก้ไขจุด Backtick แล้ว -->
                            <div class="bg-slate-900 rounded-2xl p-3 border border-slate-800 text-white flex flex-col items-center justify-center gap-1.5 shadow-inner">
                                <svg class="w-full h-16 stroke-teal-400 fill-none" viewBox="0 0 280 60">
                                    <rect x="10" y="18" width="80" height="24" rx="3" stroke="#94a3b8" stroke-width="2" fill="#1e293b"/>
                                    <rect x="2" y="24" width="8" height="12" fill="#64748b"/>
                                    <line x1="10" y1="30" x2="-10" y2="30" stroke="#94a3b8" stroke-width="2"/>
                                    <rect x="30" y="20" width="60" height="20" fill="#0d9488" fill-opacity="0.6"/>
                                    <line x1="30" y1="18" x2="30" y2="24" stroke="#e2e8f0" stroke-width="1.5"/>
                                    <line x1="50" y1="18" x2="50" y2="24" stroke="#e2e8f0" stroke-width="1.5"/>
                                    <line x1="70" y1="18" x2="70" y2="24" stroke="#e2e8f0" stroke-width="1.5"/>
                                    <path d="M90 26 L105 26 L105 34 L90 34 Z" fill="#94a3b8"/>
                                    <path d="M105 30 C 130 30, 130 45, 160 45 C 190 45, 190 15, 220 15 L 260 15" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2" stroke-linecap="round"/>
                                    <text x="50" y="34" font-size="9" fill="#ffffff" font-weight="bold" text-anchor="middle">Syringe</text>
                                    <text x="180" y="32" font-size="8" fill="#38bdf8" font-weight="bold" text-anchor="middle">Infusion Set Line</text>
                                </svg>
                                <span class="text-[10px] text-slate-400 font-medium">ภาพจำลอง Syringe ต่อกับ Extension Infusion Set</span>
                            </div>
                        </div>

                        <!-- ฝั่งขวา -->
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

                            <div class="bg-teal-50/60 border border-teal-200/80 rounded-xl p-2.5 space-y-1 text-teal-950 font-medium">
                                <div class="flex items-center justify-between flex-wrap gap-1">
                                    <span>ปริมาตรรวมใน Syringe หลัก:</span>
                                    <span class="font-bold"><span id="sd-genta-calc-total-vol">0.00</span> ml (มียารวม <span id="sd-genta-calc-total-mg">0.00</span> mg)</span>
                                </div>
                                <div class="flex items-center justify-between flex-wrap gap-1">
                                    <span>ใช้ยา Gentamicin (40mg/ml):</span>
                                    <span class="font-bold text-teal-700"><span id="sd-genta-calc-drug-vol">0.00</span> ml</span>
                                </div>
                                <div class="flex items-center justify-between flex-wrap gap-1">
                                    <span>ใช้สารละลาย (Diluent):</span>
                                    <span class="font-bold text-slate-700"><span id="sd-genta-calc-diluent-vol">0.00</span> ml</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="border-t border-slate-200 pt-3 space-y-2">
                        <div class="flex items-center gap-2">
                            <div class="relative group cursor-pointer inline-flex items-center justify-center">
                                <div class="w-5 h-5 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center text-xs font-bold transition-colors shadow">
                                    ?
                                </div>
                                
                                <div class="absolute bottom-full left-0 mb-2 hidden group-hover:block w-80 bg-slate-900 text-slate-100 text-[11px] p-3.5 rounded-2xl shadow-2xl border border-slate-700 z-50 pointer-events-none space-y-2">
                                    <div class="font-bold text-teal-300 border-b border-slate-800 pb-1 flex items-center gap-1.5">
                                        <svg class="w-3.5 h-3.5 stroke-teal-400" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 2 2h10a2 2 0 0 2 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>
                                        ขั้นตอนการเตรียมยา (ความเข้มข้นสม่ำเสมอ)
                                    </div>
                                    <ol class="list-decimal list-inside space-y-1.5 font-normal leading-relaxed text-slate-200">
                                        <li>ใช้ Syringe หลัก ดูดสารน้ำ (Diluent) ปริมาตร <strong class="text-white"><span id="sd-step-diluent">0.00</span> ml</strong></li>
                                        <li>ใช้ Syringe เล็ก (1 ml) ดูดยา Gentamicin ปริมาตร <strong class="text-teal-300"><span id="sd-step-drug">0.00</span> ml</strong> (<span id="sd-step-drug-mg">0.00</span> mg)</li>
                                        <li>ถ่ายยาจาก Syringe เล็ก เข้าสู่ Syringe หลัก แบบปากต่อปาก</li>
                                        <li class="text-teal-200"><strong class="font-black underline text-white">Draw ผสมยาให้เข้ากัน</strong> (ปริมาตรรวม = <span id="sd-step-total">0.00</span> ml)</li>
                                        <li>ต่อ Syringe หลักเข้ากับ Infusion Set แล้วบริหารยาผ่าน Syringe Pump</li>
                                    </ol>
                                    <div class="absolute -bottom-1.5 left-2 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-slate-700"></div>
                                </div>
                            </div>

                            <span class="font-bold text-slate-900 text-xs">ขั้นตอนการเตรียมและบริหารยา (ความเข้มข้นสม่ำเสมอ - ไม่ต้อง Flush)</span>
                        </div>

                        <div class="text-[11px] text-slate-500 font-semibold italic pl-7 leading-normal">
                            * เป็นเพียงข้อเสนอแนะ เทคนิควิธีขึ้นกับแต่ละบริบท ความชำนาญ และอุปกรณ์ที่มีของหน่วยบริการ
                        </div>

                        <div class="bg-rose-50 border-l-4 border-rose-500 p-2.5 rounded-r-xl text-rose-900 text-xs font-bold space-y-1 mt-2">
                            <div class="flex items-center gap-1.5 text-rose-700">
                                <svg class="w-4 h-4 stroke-current shrink-0" fill="none" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                                <span>ข้อระวังสำคัญในการบริหารยา:</span>
                            </div>
                            <div class="pl-5 text-[11px] font-semibold leading-normal">
                                ให้ยาในปริมาตร <span id="sd-alert-vol" class="text-rose-700 underline font-black">0.00</span> ml ในกรอบเวลา 30-120 นาที <strong class="text-rose-700 font-black underline uppercase">โดยไม่ต้อง FLUSH สายตามหลัง</strong> (ยาส่วนที่เหลือ <span id="sd-alert-remain">0.00</span> ml จะค้างอยู่ในสายพอดี)
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <!-- Card Cloxacillin -->
            <div id="sd-card-cloxacillin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block"></span>
                    <h3 class="text-xl font-bold text-slate-800">Cloxacillin</h3>
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
            </div>

            <!-- Card Clindamycin -->
            <div id="sd-card-clindamycin" class="bg-slate-100/90 backdrop-blur-md rounded-3xl p-5 border border-slate-300 shadow-sm transition-all space-y-4">
                <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-rose-600 inline-block"></span>
                    <h3 class="text-xl font-bold text-slate-800">Clindamycin <span class="text-sm font-normal text-slate-600">(Dose: 5 - 7 mg/kg)</span></h3>
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
                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 space-y-1">
                    <div class="flex flex-wrap items-baseline gap-1.5">
                        <span class="font-bold text-slate-900 shrink-0">Compatible Solution :</span>
                        <span class="font-semibold text-slate-800">D5W, D10W, NSS</span>
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

    const gentaInputA = container.querySelector('#sd-genta-input-a');
    const gentaInputB = container.querySelector('#sd-genta-input-b');
    const gentaInputC = container.querySelector('#sd-genta-input-c');
    let isUserModifiedA = false;

    gentaInputA.addEventListener('input', () => {
        isUserModifiedA = true;
        calculateAll();
    });
    gentaInputB.addEventListener('input', calculateAll);
    gentaInputC.addEventListener('input', calculateAll);

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
        chkAmp.checked = true;
        chkGenta.checked = true;
        chkClox.checked = true;
        chkClinda.checked = true;

        gentaInputB.value = "2";
        gentaInputC.value = "5";
        isUserModifiedA = false;
        
        cardAmp.classList.remove('hidden');
        cardGenta.classList.remove('hidden');
        cardClox.classList.remove('hidden');
        cardClinda.classList.remove('hidden');

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

        renderAmpicillin(pma, pnaDay, bw);
        renderGentamicin(pma, pnaDay, bw);
        renderCloxacillin(pma, pnaDay, bw);
        renderClindamycin(pma, pnaDay, bw);
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
        const drugVol = totalMgInSyringe / 40;
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
        rows.forEach(r => {
            const isMatch = r.pmaCond && r.pnaCond;
            const doseMg = bw * r.dose;
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
    }

    function renderClindamycin(pma, pna, bw) {
        const rows = [
            { pmaCond: pma <= 29, pnaCond: pna <= 28, pmaText: "≤ 29 wk", pnaText: "0 - 28 days", doseMin: 5, doseMax: 7, freq: "q 12 hr(s)" },
            { pmaCond: pma <= 29, pnaCond: pna >= 29, pmaText: "≤ 29 wk", pnaText: "≥ 29 days", doseMin: 5, doseMax: 7, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna <= 14, pmaText: "30 - 36 wk", pnaText: "0 - 14 days", doseMin: 5, doseMax: 7, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 30 && pma <= 36, pnaCond: pna >= 15, pmaText: "30 - 36 wk", pnaText: "≥ 8 days", doseMin: 5, doseMax: 7, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna <= 7, pmaText: "37 - 44 wk", pnaText: "0 - 7 days", doseMin: 5, doseMax: 7, freq: "q 12 hr(s)" },
            { pmaCond: pma >= 37 && pma <= 44, pnaCond: pna >= 8, pmaText: "37 - 44 wk", pnaText: "≥ 8 days", doseMin: 5, doseMax: 7, freq: "q 8 hr(s)" },
            { pmaCond: pma >= 45, pnaCond: true, pmaText: "≥ 45 wk", pnaText: "All days", doseMin: 5, doseMax: 7, freq: "q 6 hr(s)" },
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
    }

    calculateAll();
}
