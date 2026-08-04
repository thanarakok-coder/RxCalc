/**
 * RxCalc - Core Application Logic & Router
 */

// รายชื่อโมดูลเครื่องมือคำนวณทั้งหมด
const MODULES_CONFIG = [
    {
        id: 'insulin-calc',
        title: 'Insulin Calculator',
        description: 'คำนวณอินซูลิน (Penfill/Vial), อุปกรณ์เสริม (เข็ม, สำลีแอลกอฮอล์) และวันนัดถัดไป',
        icon: 'fa-solid fa-[#008080] fa-syringe',
        color: 'bg-teal-600',
        scriptPath: './modules/insulin-calc.js'
    },
    {
        id: 'sample-calc',
        title: 'Sample Calculator',
        description: 'ตัวอย่างเครื่องมือคำนวณพื้นฐาน สำหรับทดสอบระบบ',
        icon: 'fa-solid fa-flask',
        color: 'bg-slate-500',
        scriptPath: './modules/sample-calc.js'
    }
];

class RxCalcApp {
    constructor() {
        this.contentContainer = document.getElementById('app-content');
        this.activeModule = null;
        this.init();
    }

    init() {
        // รองรับ Browser Back/Forward buttons ผ่าน Hash (#)
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // โหลดหน้าแรกตาม Hash ปัจจุบัน หรือ default ไปที่ home
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash.replace('#', '') || 'home';
        if (hash === 'home') {
            this.renderHome();
        } else {
            this.loadModule(hash);
        }
    }

    navigateTo(routeId) {
        window.location.hash = `#${routeId}`;
    }

    // หน้าหลัก: แสดง Grid ของ Thumbnail
    renderHome() {
        this.activeModule = null;
        
        let gridHtml = `
            <div class="mb-8 text-center sm:text-left">
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">เครื่องมือคำนวณทางเภสัชกรรม</h1>
                <p class="text-base text-slate-500 mt-2">เลือกเครื่องมือที่ต้องการใช้งานจากรายการด้านล่าง</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        `;

        MODULES_CONFIG.forEach(mod => {
            gridHtml += `
                <div onclick="app.navigateTo('${mod.id}')" 
                     class="group bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-teal-500 transition-all cursor-pointer flex flex-col justify-between">
                    <div>
                        <div class="w-14 h-14 ${mod.color} text-white rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                            <i class="${mod.icon}"></i>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">${mod.title}</h3>
                        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${mod.description}</p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-slate-100 flex items-center text-sm font-bold text-teal-600">
                        <span>เปิดใช้งานเครื่องมือ</span>
                        <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                </div>
            `;
        });

        gridHtml += `</div>`;
        this.contentContainer.innerHTML = gridHtml;
    }

    // โหลดไฟล์ JS โมดูลย่อยแบบ Dynamic
    async loadModule(moduleId) {
        const config = MODULES_CONFIG.find(m => m.id === moduleId);
        if (!config) {
            this.render404();
            return;
        }

        this.contentContainer.innerHTML = `
            <div class="flex items-center justify-center py-16 text-slate-400">
                <i class="fa-solid fa-spinner fa-spin text-3xl mr-3"></i>
                <span class="text-lg font-medium">กำลังโหลดโมดูล...</span>
            </div>
        `;

        try {
            const module = await import(config.scriptPath);
            if (module && typeof module.render === 'function') {
                this.contentContainer.innerHTML = '';
                module.render(this.contentContainer);
            } else {
                throw new Error('Invalid module structure');
            }
        } catch (error) {
            console.error(error);
            this.contentContainer.innerHTML = `
                <div class="p-6 bg-red-50 text-red-700 rounded-xl text-base border-2 border-red-200">
                    ไม่สามารถโหลดโมดูลได้ กรุณาตรวจสอบไฟล์ ${config.scriptPath}
                </div>
            `;
        }
    }

    render404() {
        this.contentContainer.innerHTML = `
            <div class="text-center py-16">
                <h2 class="text-2xl font-bold text-slate-800">ไม่พบหน้าเครื่องมือนี้</h2>
                <button onclick="app.navigateTo('home')" class="mt-4 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 text-base">กลับหน้าหลัก</button>
            </div>
        `;
    }
}

// Global App Instance
const app = new RxCalcApp();
