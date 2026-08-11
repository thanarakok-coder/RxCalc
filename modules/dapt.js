document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('dapt-start-date');
    const p1DaysInput = document.getElementById('dapt-p1-days');
    const p2DaysInput = document.getElementById('dapt-p2-days');
    
    if (startDateInput) {
        // ตั้งค่า Default เป็นวันนี้
        const todayStr = new Date().toISOString().split('T')[0];
        startDateInput.value = todayStr;

        // ผูก Event
        startDateInput.addEventListener('change', calculateDAPT);
        p1DaysInput.addEventListener('input', calculateDAPT);
        p2DaysInput.addEventListener('input', calculateDAPT);

        // คำนวณครั้งแรก
        calculateDAPT();
    }
});

function formatDate(dateObj) {
    if (!dateObj || isNaN(dateObj)) return '-';
    const d = dateObj.getDate().toString().padStart(2, '0');
    const m = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const y = dateObj.getFullYear() + 543; // ปี พ.ศ.
    return `${d}/${m}/${y}`;
}

function calculateDAPT() {
    const startDateInput = document.getElementById('dapt-start-date');
    const p1DaysInput = document.getElementById('dapt-p1-days');
    const p2DaysInput = document.getElementById('dapt-p2-days');

    const p1Label = document.getElementById('p1-days-label');
    const p2Label = document.getElementById('p2-days-label');

    const p1Res = document.getElementById('dapt-p1-res');
    const p2Res = document.getElementById('dapt-p2-res');
    const p3Res = document.getElementById('dapt-p3-res');
    const copyTextarea = document.getElementById('dapt-copy-text');

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

    const start = new Date(startDateInput.value);
    
    // Phase 1
    const p1End = new Date(start);
    p1End.setDate(p1End.getDate() + p1Days - 1);

    // Phase 2
    const p2Start = new Date(p1End);
    p2Start.setDate(p2Start.getDate() + 1);
    const p2End = new Date(p2Start);
    p2End.setDate(p2End.getDate() + p2Days - 1);

    // Phase 3
    const p3Start = new Date(p2End);
    p3Start.setDate(p3Start.getDate() + 1);

    // แสดงผล
    p1Res.innerHTML = `เริ่ม <b>${formatDate(start)}</b> ถึง <b>${formatDate(p1End)}</b>`;
    p2Res.innerHTML = `เริ่ม <b>${formatDate(p2Start)}</b> ถึง <b>${formatDate(p2End)}</b>`;
    p3Res.innerHTML = `เริ่มตั้งแต่วันที่ <b>${formatDate(p3Start)}</b> เป็นต้นไป`;

    // ข้อความ คัดลอก
    copyTextarea.value = `[แผนรับยา DAPT]
P1 (ASA+Clopidogrel ${p1Days}วัน): ${formatDate(start)} - ${formatDate(p1End)}
P2 (Clopidogrel ${p2Days}วัน): ${formatDate(p2Start)} - ${formatDate(p2End)}
P3 (ASA เดี่ยว): ตั้งแต่ ${formatDate(p3Start)} เป็นต้นไป`;
}

function resetDAPTForm() {
    const startDateInput = document.getElementById('dapt-start-date');
    const p1DaysInput = document.getElementById('dapt-p1-days');
    const p2DaysInput = document.getElementById('dapt-p2-days');

    startDateInput.value = new Date().toISOString().split('T')[0];
    p1DaysInput.value = 21;
    p2DaysInput.value = 90;
    calculateDAPT();
}

function copyDAPTText() {
    const copyTextarea = document.getElementById('dapt-copy-text');
    const copyBtn = document.getElementById('btn-copy-dapt');
    if (!copyTextarea.value) return;

    navigator.clipboard.writeText(copyTextarea.value).then(() => {
        const origContent = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>สำเร็จ!</span>';
        copyBtn.classList.replace('bg-indigo-600', 'bg-emerald-600');
        setTimeout(() => {
            copyBtn.innerHTML = origContent;
            copyBtn.classList.replace('bg-emerald-600', 'bg-indigo-600');
        }, 1500);
    });
}
