/**
 * Sample Calculator Module
 */
export function render(container) {
    container.innerHTML = `
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
                <div class="w-10 h-10 bg-teal-500 text-white rounded-lg flex items-center justify-center text-lg">
                    <i class="fa-solid fa-flask"></i>
                </div>
                <div>
                    <h2 class="text-lg font-bold text-slate-800">Sample Calculator</h2>
                    <p class="text-xs text-slate-500">โมดูลตัวอย่างสำหรับการคำนวณ</p>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">ป้อนค่าตัวเลข (A)</label>
                    <input type="number" id="input-a" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" placeholder="0">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1">ป้อนค่าตัวเลข (B)</label>
                    <input type="number" id="input-b" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" placeholder="0">
                </div>
                <button id="btn-calc" class="w-full py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors">
                    คำนวณผลลัพธ์
                </button>
                <div id="result-box" class="hidden p-4 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 text-sm font-semibold text-center">
                    <!-- ผลลัพธ์จะแสดงที่นี่ -->
                </div>
            </div>
        </div>
    `;

    // Event Listeners สำหรับโมดูลนี้
    const inputA = container.querySelector('#input-a');
    const inputB = container.querySelector('#input-b');
    const btnCalc = container.querySelector('#btn-calc');
    const resultBox = container.querySelector('#result-box');

    btnCalc.addEventListener('click', () => {
        const valA = parseFloat(inputA.value) || 0;
        const valB = parseFloat(inputB.value) || 0;
        const sum = valA + valB;

        resultBox.textContent = `ผลรวม: ${sum}`;
        resultBox.classList.remove('hidden');
    });
}
