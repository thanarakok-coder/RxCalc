/**
 * RxCalc - Core Application Logic & Router
 */

// รายชื่อโมดูลเครื่องมือคำนวณทั้งหมด (สามารถเพิ่มได้สูงสุด 10+ ตัวที่นี่)
const MODULES_CONFIG = [
    {
        id: 'sample-calc',
        title: 'Sample Calculator',
        description: 'ตัวอย่างเครื่องมือคำนวณพื้นฐาน สำหรับทดสอบระบบ',
        icon: 'fa-solid fa-flask',
        color: 'bg-teal-500',
        scriptPath: './modules/sample-calc.js'
    }
    // อนาคตเพิ่มเครื่องมือที่ 2, 3, 4 ได้ที่นี่
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
                <h1 class="text-2xl font-bold text-slate-900">เครื่องมือคำนวณทางเภสัชกรรม</h1>
                <p class="text-sm text-slate-500 mt-1">เลือกเครื่องมือที่ต้องการใช้งานจากรายการด้านล่าง</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        `;

        MODULES_CONFIG.forEach(mod => {
            gridHtml += `
                <div onclick="app.navigateTo('${mod.id}')" 
                     class="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-teal-500 transition-all cursor-pointer flex flex-col justify-between">
                    <div>
                        <div class="w-12 h-12 ${mod.color} text-white rounded-lg flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                            <i class="${mod.icon}"></i>
                        </div>
                        <h3 class="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">${mod.title}</h3>
                        <p class="text-xs text-slate-500 mt-2 line-clamp-2">${mod.description}</p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-medium text-teal-600">
                        <span>เปิดใช้งาน</span>
                        <i class="fa-solid fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
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
            <div class="flex items-center justify-center py-12 text-slate-400">
                <i class="fa-solid fa-spinner fa-spin text-2xl mr-2"></i>
                <span>กำลังโหลดโมดูล...</span>
            </div>
        `;

        try {
            // ใช้ Dynamic Import เพื่อดึงไฟล์สคริปต์เมื่อจำเป็น
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
                <div class="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                    ไม่สามารถโหลดโมดูลได้ กรุณาตรวจสอบไฟล์ ${config.scriptPath}
                </div>
            `;
        }
    }

    render404() {
        this.contentContainer.innerHTML = `
            <div class="text-center py-12">
                <h2 class="text-xl font-bold text-slate-800">ไม่พบหน้าเครื่องมือนี้</h2>
                <button onclick="app.navigateTo('home')" class="mt-4 px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700">กลับหน้าหลัก</button>
            </div>
        `;
    }
}

// Global App Instance
const app = new RxCalcApp();
