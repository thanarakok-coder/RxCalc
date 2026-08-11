/**
 * RxCalc Main Application Router
 * Architecture: ES Modules SPA Navigation
 * Timestamp: 2026-08-11
 */

// 1. นำเข้า (Import) render function จากแต่ละโมดูลย่อย
import { render as renderInsulinCalc } from './modules/insulin-calc.js';
import { render as renderTbCalc } from './modules/tb-calc.js';

// เก็บสถานะโมดูลที่เปิดอยู่ปัจจุบัน (Default: 'insulin')
let currentModule = 'insulin';

document.addEventListener('DOMContentLoaded', () => {
    // 2. สร้างโครงสร้าง Navbar/Header สำหรับสลับหน้า และ Main Content Container
    const body = document.body;
    
    body.innerHTML = `
        <div class="min-h-screen bg-slate-100 flex flex-col font-sans">
            
            <!-- Top Navigation Bar -->
            <header class="bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
                    
                    <!-- App Logo / Title -->
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-teal-500 text-slate-900 font-black rounded-lg flex items-center justify-center text-lg">
                            Rx
                        </div>
                        <div>
                            <h1 class="text-base font-bold leading-tight">RxCalc</h1>
                            <p class="text-[10px] text-slate-400">Pharmacy Tools</p>
                        </div>
                    </div>

                    <!-- Navigation Tabs -->
                    <nav class="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                        <button type="button" id="nav-insulin" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
                            💉 Insulin Calc
                        </button>
                        <button type="button" id="nav-tb" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
                            🫁 TB Calc
                        </button>
                    </nav>

                </div>
            </header>

            <!-- Main Content Container (จุดที่เอาโค้ดแต่ละโมดูลมาแปะ) -->
            <main id="app-container" class="flex-1 p-2 sm:p-4">
            </main>

        </div>
    `;

    // 3. ผูก Event Click ให้กับปุ่มเมนู
    const btnInsulin = document.getElementById('nav-insulin');
    const btnTb = document.getElementById('nav-tb');

    btnInsulin.addEventListener('click', () => switchModule('insulin'));
    btnTb.addEventListener('click', () => switchModule('tb'));

    // 4. โหลดหน้าเริ่มต้น (Default: Insulin Calc)
    switchModule(currentModule);
});

/**
 * ฟังก์ชันสลับหน้าและ Render โมดูลที่เลือก
 */
function switchModule(moduleName) {
    currentModule = moduleName;
    const container = document.getElementById('app-container');
    const btnInsulin = document.getElementById('nav-insulin');
    const btnTb = document.getElementById('nav-tb');

    // Class สไตล์สำหรับปุ่มที่เลือก (Active) และไม่ได้เลือก (Inactive)
    const activeClass = "bg-teal-500 text-slate-950 font-bold shadow-sm";
    const inactiveClass = "text-slate-300 hover:text-white hover:bg-slate-700/50 font-normal";

    // ล้างพื้นที่แสดงผลเดิม
    container.innerHTML = '';

    // สลับคลาสปุ่มกด และสั่ง Render โค้ดตามโมดูลที่เลือก
    if (moduleName === 'insulin') {
        btnInsulin.className = `px-3 py-1.5 rounded-lg text-xs transition-all ${activeClass}`;
        btnTb.className = `px-3 py-1.5 rounded-lg text-xs transition-all ${inactiveClass}`;
        
        // เรียกใช้ฟังก์ชัน render ของ insulin-calc.js
        renderInsulinCalc(container);

    } else if (moduleName === 'tb') {
        btnInsulin.className = `px-3 py-1.5 rounded-lg text-xs transition-all ${inactiveClass}`;
        btnTb.className = `px-3 py-1.5 rounded-lg text-xs transition-all ${activeClass}`;
        
        // เรียกใช้ฟังก์ชัน render ของ tb-calc.js
        renderTbCalc(container);
    }
}
