export function render(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- Left Column: Input + Copy Box -->
            <div class="lg:col-span-5 space-y-4">
                <!-- Input Box -->
                <div class="bg-white rounded-3xl shadow-xl border-4 border-slate-800 overflow-hidden">
                    <div class="bg-slate-900 text-white p-3.5 text-center flex justify-between items-center">
                        <span class="text-xl font-black text-indigo-400">กรอกข้อมูล</span>
                        <button id="dapt-reset-btn" class="text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-200 border border-slate-600 font-bold flex items-center gap-1">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                            รีเซ็ต
                        </button>
                    </div>

                    <div class="p-4 space-y-4 bg-slate-950 text-white">
                        <!-- วันที่เริ่มยา -->
                        <div>
                            <label class="block text-base font-black text-indigo-300 mb-1.5">วันที่เริ่มรับยา (Start Date)</label>
                            <input type="date" id="dapt-start-date" 
                                class="w-full text-center text-lg font-black bg-white text-indigo-900 rounded-xl p-2.5 border-4 border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-inner cursor-pointer">
                            <span class="block text-xs font-semibold text-slate-400 mt-1.5 text-center">* เลือกวันที่จากปฏิทิน</span>
                        </div>

                        <!-- ปรับระยะเวลา Phase 1 & Phase 2 -->
                        <div class="pt-3 border-t border-slate-800 space-y-2">
                            <span class="text-xs font-extrabold text-amber-400 uppercase tracking-wider block">ปรับระยะเวลาแต่ละ Phase</span>
                            
                            <div class="flex items-center justify-between gap-2">
                                <label class="text-xs font-bold text-slate-300">Phase 1 ( ASA + Clopidogrel ):</label>
                                <div class="flex items-center space-x-1">
                                    <input type="number" id="dapt-p1-days" value="21" min="1" step="1" 
                                        class="w-16 text-center text-base font-black bg-slate-800 text-amber-300 rounded-lg p-1 border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300">
                                    <span class="text-xs font-bold text-slate-400">วัน</span>
                                </div>
                            </div>

                            <div class="flex items-center justify-between gap-2">
                                <label class="text-xs font-bold text-slate-300">Phase 2 ( Clopidogrel เดี่ยว ):</label>
                                <div class="flex items-center space-x-1">
                                    <input type="number" id="dapt-p2-days" value="90" min="1" step="1" 
                                        class="w-16 text-center text-base font-black bg-slate-800 text-amber-300 rounded-lg p-1 border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300">
                                    <span class="text-xs font-bold text-slate-400">วัน</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Generate Text Output Box -->
                <div class="bg-slate-900 text-white rounded-3xl shadow-xl border-4 border-slate-800 p-4 space-y-2">
                    <div class="flex justify-between items-center border-b border-slate-700 pb-2">
                        <span class="font-black text-amber-400 text-sm flex items-center space-x-1.5">
                            <span>ข้อความคัดลอก (Pop-up Note)</span>
                        </span>
                        <button id="btn-copy-dapt" 
                            class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-3 py-1.5 rounded-lg transition shadow-md flex items-center space-x-1.5">
                            <span>คัดลอก</span>
                        </button>
                    </div>
                    <textarea id="dapt-copy-text" readonly rows="4" 
                        class="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border-2 border-slate-700 focus:outline-none resize-none leading-relaxed tracking-normal"></textarea>
                </div>
            </div>

            <!-- Right Column: Result Display Panel -->
            <div class="lg:col-span-7 bg-white rounded-3xl shadow-xl border-4 border-slate-800 p-5 md:p-6 space-y-4">
                <div class="border-b-4 border-slate-800 pb-2.5">
                    <h2 class="text-2xl md:text-3xl font-black text-slate-800 flex items-center space-x-3">
                        <span>แผนการรับยา DAPT (3 Phases)</span>
                    </h2>
                </div>

                <div class="space-y-3.5">
                    <!-- Phase 1 -->
                    <div class="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                        <div class="flex items-center justify-between border-b border-indigo-200 pb-1.5">
                            <span class="bg-indigo-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg">Phase 1</span>
                            <div class="text-right">
                                <span class="text-lg md:text-2xl font-black text-indigo-950">ASA + Clopidogrel</span>
                                <span id="p1-days-label" class="text-xs md:text-sm font-extrabold text-slate-500 ml-1">(21 วัน)</span>
                            </div>
                        </div>
                        <div id="dapt-p1-res" class="text-slate-700 text-sm font-medium"></div>
                    </div>

                    <!-- Phase 2 -->
                    <div class="bg-sky-50/70 border-2 border-sky-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                        <div class="flex items-center justify-between border-b border-sky-200 pb-1.5">
                            <span class="bg-sky-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg">Phase 2</span>
                            <div class="text-right">
                                <span class="text-lg md:text-2xl font-black text-sky-950">Clopidogrel เดี่ยว</span>
                                <span id="p2-days-label" class="text-xs md:text-sm font-extrabold text-slate-500 ml-1">(90 วัน)</span>
                            </div>
                        </div>
                        <div id="dapt-p2-res" class="text-slate-700 text-sm font-medium"></div>
                    </div>

                    <!-- Phase 3 -->
                    <div class="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                        <div class="flex items-center justify-between border-b border-emerald-200 pb-1.5">
                            <span class="bg-emerald-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg">Phase 3</span>
                            <div class="text-right">
                                <span class="text-lg md:text-2xl font-black text-emerald-950">ASA เดี่ยว</span>
                                <span class="text-xs md:text-sm font-extrabold text-slate-500 ml-1">(ตลอดชีวิต)</span>
                            </div>
                        </div>
                        <div id="dapt-p3-res" class="text-slate-700 text-sm font-medium"></div>
                    </div>
                </div>
            </div>

        </div>
    `;

    // DOM Elements
    const startDateInput = document.getElementById('dapt-start-date');
    const p1DaysInput = document.getElementById('dapt-p1-days');
    const p2DaysInput = document.getElementById('dapt-p2-days');
    
    const p1Label = document.getElementById('p1-days-label');
    const p2Label = document.getElementById('p2-days-label');
    
    const p1Res = document.getElementById('dapt-p1-res');
    const p2Res = document.getElementById('dapt-p2-res');
    const p3Res = document.getElementById('dapt-p3-res');
    
    const copyTextarea = document.getElementById('dapt-copy-text');
    const copyBtn = document.getElementById('btn-copy-dapt');
    const resetBtn = document.getElementById('dapt-reset-btn');

    // ตั้งค่า Default วันที่วันนี้
    const todayStr = new Date().toISOString().split('T')[0];
    startDateInput.value = todayStr;

    function formatDate(dateObj) {
        if (!dateObj || isNaN(dateObj)) return '-';
        const d = dateObj.getDate().toString().padStart(2, '0');
        const m = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const y = dateObj.getFullYear() + 543; // ปี พ.ศ.
        return `${d}/${m}/${y}`;
    }

    function calculateDAPT() {
        if (!startDateInput.value) {
            p1Res.innerHTML = 'กรุณาเลือกวันที่เริ่มรับยา';
            p2Res.innerHTML = '-';
            p3Res.innerHTML = '-';
            copyTextarea.value = '';
            return;
        }

        const p1Days = parseInt(p1DaysInput.value) || 21;
        const p2Days = parseInt(p2DaysInput.value) || 90;

        p1Label.textContent = `(${p1Days} วัน)`;
        p2Label.textContent = `(${p2Days} วัน)`;

        // คำนวณวันที่
        const start = new Date(startDateInput.value);
        
        // Phase 1 End = Start + p1Days - 1
        const p1End = new Date(start);
        p1End.setDate(p1End.getDate() + p1Days - 1);

        // Phase 2 Start = p1End + 1 day
        const p2Start = new Date(p1End);
        p2Start.setDate(p2Start.getDate() + 1);

        // Phase 2 End = p2Start + p2Days - 1
        const p2End = new Date(p2Start);
        p2End.setDate(p2End.getDate() + p2Days - 1);

        // Phase 3 Start = p2End + 1 day
        const p3Start = new Date(p2End);
        p3Start.setDate(p3Start.getDate() + 1);

        // Render Results
        p1Res.innerHTML = `เริ่ม <b>${formatDate(start)}</b> ถึง <b>${formatDate(p1End)}</b>`;
        p2Res.innerHTML = `เริ่ม <b>${formatDate(p2Start)}</b> ถึง <b>${formatDate(p2End)}</b>`;
        p3Res.innerHTML = `เริ่มตั้งแต่วันที่ <b>${formatDate(p3Start)}</b> เป็นต้นไป`;

        // Text for Copy
        copyTextarea.value = `[แผนรับยา DAPT]
P1 (ASA+Clopidogrel ${p1Days}วัน): ${formatDate(start)} - ${formatDate(p1End)}
P2 (Clopidogrel ${p2Days}วัน): ${formatDate(p2Start)} - ${formatDate(p2End)}
P3 (ASA เดี่ยว): ตั้งแต่ ${formatDate(p3Start)} เป็นต้นไป`;
    }

    // Events Listener
    startDateInput.addEventListener('change', calculateDAPT);
    p1DaysInput.addEventListener('input', calculateDAPT);
    p2DaysInput.addEventListener('input', calculateDAPT);

    resetBtn.addEventListener('click', () => {
        startDateInput.value = todayStr;
        p1DaysInput.value = 21;
        p2DaysInput.value = 90;
        calculateDAPT();
    });

    copyBtn.addEventListener('click', () => {
        if (!copyTextarea.value) return;
        navigator.clipboard.writeText(copyTextarea.value).then(() => {
            const origText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span>สำเร็จ!</span>';
            copyBtn.classList.replace('bg-indigo-600', 'bg-emerald-600');
            setTimeout(() => {
                copyBtn.innerHTML = origText;
                copyBtn.classList.replace('bg-emerald-600', 'bg-indigo-600');
            }, 1500);
        });
    });

    calculateDAPT();
}
