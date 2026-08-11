export function render(container) {
    container.innerHTML = `
        <section id="page-dapt" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <!-- Left Column: Input + Copy Box -->
                <div class="lg:col-span-5 space-y-4">
                    <!-- Input Box -->
                    <div class="bg-white rounded-3xl shadow-xl border-4 border-slate-800 overflow-hidden">
                        <div class="bg-slate-900 text-white p-3.5 text-center flex justify-between items-center">
                            <span class="text-xl font-black text-indigo-400">กรอกข้อมูล <i class="fa-solid fa-calendar-check text-emerald-400"></i></span>
                            <button id="btn-reset-dapt" class="text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-200 border border-slate-600 font-bold">
                                <i class="fa-solid fa-arrow-rotate-right"></i> รีเซ็ต
                            </button>
                        </div>

                        <div class="p-4 space-y-4 bg-slate-950 text-white">
                            <!-- วันที่เริ่มยา -->
                            <div>
                                <label class="block text-base font-black text-indigo-300 mb-1.5">วันที่เริ่มรับยา (Start Date)</label>
                                <input type="date" id="dapt-start-date" 
                                    class="w-full text-center text-lg font-black bg-white text-indigo-900 rounded-xl p-2.5 border-4 border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-inner cursor-pointer">
                                <span class="block text-xs font-semibold text-slate-400 mt-1.5 text-center">* สามารถกดเลือกวันที่จากปฏิทินได้เลย</span>
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
                                <i class="fa-regular fa-copy"></i>
                                <span>ข้อความคัดลอก (Pop-up Note)</span>
                            </span>
                            <button id="btn-copy-dapt" 
                                class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-3 py-1.5 rounded-lg transition shadow-md flex items-center space-x-1.5">
                                <i class="fa-regular fa-clipboard"></i>
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
                            <i class="fa-solid fa-capsules text-indigo-600"></i>
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
                            <div id="dapt-p1-res" class="text-slate-700 font-bold text-sm"></div>
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
                            <div id="dapt-p2-res" class="text-slate-700 font-bold text-sm"></div>
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
                            <div id="dapt-p3-res" class="text-slate-700 font-bold text-sm"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    `;

    // --- JavaScript Logic ---
    const startDateInput = container.querySelector('#dapt-start-date');
    const p1DaysInput = container.querySelector('#dapt-p1-days');
    const p2DaysInput = container.querySelector('#dapt-p2-days');
    const copyTextarea = container.querySelector('#dapt-copy-text');

    const p1Label = container.querySelector('#p1-days-label');
    const p2Label = container.querySelector('#p2-days-label');
    const p1Res = container.querySelector('#dapt-p1-res');
    const p2Res = container.querySelector('#dapt-p2-res');
    const p3Res = container.querySelector('#dapt-p3-res');

    const btnReset = container.querySelector('#btn-reset-dapt');
    const btnCopy = container.querySelector('#btn-copy-dapt');

    // ตั้งค่าเริ่มต้นเป็นวันปัจจุบัน
    startDateInput.valueAsDate = new Date();

    function formatDateTH(date) {
        if (!date || isNaN(date)) return '-';
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function calculateDAPT() {
        const startDate = startDateInput.valueAsDate;
        const p1Days = parseInt(p1DaysInput.value) || 0;
        const p2Days = parseInt(p2DaysInput.value) || 0;

        p1Label.textContent = `(${p1Days} วัน)`;
        p2Label.textContent = `(${p2Days} วัน)`;

        if (!startDate) {
            p1Res.textContent = 'กรุณาเลือกวันที่เริ่มรับยา';
            p2Res.textContent = 'กรุณาเลือกวันที่เริ่มรับยา';
            p3Res.textContent = 'กรุณาเลือกวันที่เริ่มรับยา';
            copyTextarea.value = '';
            return;
        }

        // Phase 1 End Date = Start Date + p1Days - 1
        const p1EndDate = new Date(startDate);
        p1EndDate.setDate(p1EndDate.getDate() + p1Days - 1);

        // Phase 2 Start Date = p1EndDate + 1 day
        const p2StartDate = new Date(p1EndDate);
        p2StartDate.setDate(p2StartDate.getDate() + 1);

        // Phase 2 End Date = p2StartDate + p2Days - 1
        const p2EndDate = new Date(p2StartDate);
        p2EndDate.setDate(p2EndDate.getDate() + p2Days - 1);

        // Phase 3 Start Date = p2EndDate + 1 day
        const p3StartDate = new Date(p2EndDate);
        p3StartDate.setDate(p3StartDate.getDate() + 1);

        p1Res.textContent = `${formatDateTH(startDate)} ถึง ${formatDateTH(p1EndDate)}`;
        p2Res.textContent = `${formatDateTH(p2StartDate)} ถึง ${formatDateTH(p2EndDate)}`;
        p3Res.textContent = `เริ่มตั้งแต่ ${formatDateTH(p3StartDate)} เป็นต้นไป`;

        copyTextarea.value = `[แผนการรับยา DAPT]
- Phase 1 (ASA + Clopidogrel): ${formatDateTH(startDate)} - ${formatDateTH(p1EndDate)} (${p1Days} วัน)
- Phase 2 (Clopidogrel เดี่ยว): ${formatDateTH(p2StartDate)} - ${formatDateTH(p2EndDate)} (${p2Days} วัน)
- Phase 3 (ASA เดี่ยว): ตั้งแต่ ${formatDateTH(p3StartDate)} เป็นต้นไป`;
    }

    startDateInput.addEventListener('change', calculateDAPT);
    p1DaysInput.addEventListener('input', calculateDAPT);
    p2DaysInput.addEventListener('input', calculateDAPT);

    btnReset.addEventListener('click', () => {
        startDateInput.valueAsDate = new Date();
        p1DaysInput.value = 21;
        p2DaysInput.value = 90;
        calculateDAPT();
    });

    btnCopy.addEventListener('click', () => {
        if (!copyTextarea.value) return;
        navigator.clipboard.writeText(copyTextarea.value);
        alert('คัดลอกข้อความเรียบร้อยแล้ว!');
    });

    // คำนวณครั้งแรกทันที
    calculateDAPT();
}
