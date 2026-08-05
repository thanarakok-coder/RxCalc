/**
 * Main Application Router (RxCalc)
 */

import * as InsulinCalc from './modules/insulin-calc.js';
import * as TbCalc from './modules/tb-calc.js';

// List of available tools
const tools = [
    {
        id: 'insulin-calc',
        title: 'Insulin Calculator',
        description: 'คำนวณอินซูลิน (Penfill/Vial), อุปกรณ์เสริม (เข็ม, สำลีแอลกอฮอล์) และวันนัดถัดไป',
        icon: 'fa-syringe',
        color: 'bg-teal-500',
        render: InsulinCalc.render
    },
    {
        id: 'tb-calc',
        title: 'TB Dosing Calculator',
        description: 'คำนวณขนาดยาวัณโรคตามน้ำหนักตัว (I, R, Z, E, S, L, O) พร้อมการปรับ eGFR < 30',
        icon: 'fa-pills',
        color: 'bg-amber-500',
        render: TbCalc.render
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');

    // Route Handler
    function router() {
        const hash = window.location.hash.replace('#', '');

        if (!hash) {
            renderHome(appContainer);
            return;
        }

        const selectedTool = tools.find(tool => tool.id === hash);
        if (selectedTool) {
            appContainer.innerHTML = '';
            selectedTool.render(appContainer);
        } else {
            renderHome(appContainer);
        }
    }

    // Render Home Page
    function renderHome(container) {
        let cardsHTML = tools.map(tool => `
            <div class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 transition-all cursor-pointer flex flex-col justify-between group"
                 onclick="window.location.hash='${tool.id}'">
                <div>
                    <div class="w-12 h-12 ${tool.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                        <i class="fa-solid ${tool.icon}"></i>
                    </div>
                    <h3 class="text-xl font-black text-slate-800 mb-1">${tool.title}</h3>
                    <p class="text-xs text-slate-500 font-bold leading-relaxed mb-4">${tool.description}</p>
                </div>
                <div class="text-teal-600 font-extrabold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>เปิดใช้งานเครื่องมือ</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-black text-slate-900">เครื่องมือคำนวณทางเภสัชกรรม</h1>
                    <p class="text-xs sm:text-sm text-slate-500 font-bold">เลือกเครื่องมือที่ต้องการใช้งานจากรายการด้านล่าง</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${cardsHTML}
                </div>
            </div>
        `;
    }

    // Listen to hash changes
    window.addEventListener('hashchange', router);
    
    // Initial Route
    router();
});
