/**
 * autumnaki's Warfarin Module - UI & Calculation Logic
 * Timestamp: 2026-09-08
 */

// ------------------------------------------------------------------
// 0. Render Module Header
// ------------------------------------------------------------------
function renderModuleHeader() {
  return `
    <div class="text-xl font-bold text-teal-800 flex items-center gap-2 mb-3">
      <span>autumnaki's Warfarin</span>
      <span class="text-2xl">🐋</span>
    </div>
  `;
}

// ------------------------------------------------------------------
// 5. Logic ตาราง INR (แก้ไข Boundary ไม่ให้ซ้ำซ้อน)
// ------------------------------------------------------------------
function getInrTableRows(prevDose, currentINR) {
  const rules = [
    { label: '< 1.5', sug: 'Increase 10-20%', lowFactor: 1.10, highFactor: 1.20, check: (inr) => inr < 1.5 },
    { label: '1.5 - < 2.0', sug: 'Increase 5-10%', lowFactor: 1.05, highFactor: 1.10, check: (inr) => inr >= 1.5 && inr < 2.0 },
    { label: '2.0 - 3.0', sug: 'Continue same dose', lowFactor: 1.00, highFactor: 1.00, check: (inr) => inr >= 2.0 && inr <= 3.0 },
    { label: '> 3.0 - < 4.0', sug: 'Decrease 5-10%', lowFactor: 0.90, highFactor: 0.95, check: (inr) => inr > 3.0 && inr < 4.0 },
    { label: '4.0 - < 5.0', sug: 'Hold 1 day then dec 10% to..', lowFactor: 0.90, highFactor: 0.90, check: (inr) => inr >= 4.0 && inr < 5.0 },
    { label: '5 - 8.9+ no bleeding', sug: 'Omit 1-2 doses, Vit K1 1 mg PO then dec 10-20%', lowFactor: 0.80, highFactor: 0.90, check: (inr) => inr >= 5.0 }
  ];

  return rules.map(rule => {
    const isActive = rule.check(currentINR);
    const lowVal = rule.lowFactor === 1.0 ? '-' : (prevDose * rule.lowFactor).toFixed(1);
    const highVal = (prevDose * rule.highFactor).toFixed(1);

    return `
      <tr class="${isActive ? 'bg-amber-100 font-bold text-amber-900' : 'hover:bg-gray-50'} border-b">
        <td class="p-3 text-center">${rule.label}</td>
        <td class="p-3">${rule.sug}</td>
        <td class="p-3 text-center text-teal-700">${lowVal}</td>
        <td class="p-3 text-center text-teal-700">${highVal}</td>
      </tr>
    `;
  }).join('');
}

// ------------------------------------------------------------------
// 7. Smart Suggestion Logic (ยุบ 2mg + 3mg => 5mg เม็ดเดียว)
// ------------------------------------------------------------------
function optimizePills(dailyDose) {
  // ถ้าต้องกิน 2mg + 3mg = 5mg ให้เป็น 5mg เม็ดเดียว (สีชมพู/แดง/ขนาดยาที่ต้องการ)
  if (dailyDose === 5) {
    return [{ mg: 5, colorClass: 'bg-red-500', isHalf: false }];
  }
  if (dailyDose === 4) {
    return [
      { mg: 2, colorClass: 'bg-orange-500', isHalf: false },
      { mg: 2, colorClass: 'bg-orange-500', isHalf: false }
    ];
  }
  if (dailyDose === 2.5) {
    // 6.1, 6.2, 6.3: 2.5 mg = ครึ่งเม็ด สีชมพูโปร่ง/ครึ่งวง
    return [{ mg: 2.5, colorClass: 'pill-half-pink', isHalf: true }];
  }
  if (dailyDose === 3) {
    return [{ mg: 3, colorClass: 'bg-sky-500', isHalf: false }];
  }
  if (dailyDose === 2) {
    return [{ mg: 2, colorClass: 'bg-orange-500', isHalf: false }];
  }
  
  // Default Fallback
  return [{ mg: dailyDose, colorClass: 'bg-orange-500', isHalf: false }];
}

// ------------------------------------------------------------------
// 6.1 - 6.3 & 8. Render Schedule Area (ปรับแต่งเม็ดยาและ Column)
// ------------------------------------------------------------------
function renderSchedule(weeklyDose) {
  const days = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'];
  const dailyDose = weeklyDose / 7;

  const daysHtml = days.map(day => {
    const pills = optimizePills(dailyDose);

    // 6.2 ตัวเลขขนาดยาในเม็ดยา ไม่ต้องใส่ ขอเป็นรูปโล้นๆ
    const pillGraphics = pills.map(p => {
      if (p.isHalf) {
        // 6.1 กรณีหักครึ่งเม็ด พื้นหลังไล่สีขาว
        return `<div class="w-8 h-8 rounded-full border border-pink-500" style="background: linear-gradient(90deg, #ec4899 50%, #ffffff 50%);"></div>`;
      }
      return `<div class="w-8 h-8 rounded-full ${p.colorClass}"></div>`;
    }).join('');

    return `
      <div class="flex flex-col items-center bg-slate-50 p-2 rounded-xl">
        <span class="text-xs font-bold text-gray-500 mb-1">${day}</span>
        <div class="flex flex-col gap-1 items-center my-1 min-h-[40px] justify-center">
          ${pillGraphics}
        </div>
        <!-- 6.3 label ข้างล่างเป็น ปริมาณยารวม/วัน (เช่น 2.5 mg, 4 mg, 5 mg) -->
        <span class="text-xs font-bold text-gray-700 mt-1">${parseFloat(dailyDose.toFixed(2))} mg</span>
      </div>
    `;
  }).join('');

  return `
    <div class="border border-teal-400 rounded-2xl p-4 bg-white shadow-sm mt-4">
      <div class="flex justify-between items-center mb-3">
        <span class="font-bold text-teal-800 text-sm flex items-center gap-2">
          <span class="w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
          รูปแบบที่ 3
        </span>
        <span class="text-xs text-gray-500 font-medium">ผสมขนาดยา • ไม่ต้องหักเม็ด</span>
      </div>

      <div class="flex items-center gap-2">
        <!-- 8. คอลัมน์แรก Dose/wk ลดความกว้างลง 10% + จัดตัวเลขให้อยู่กึ่งกลาง -->
        <div class="w-[15%] text-center font-extrabold text-xl text-gray-800 border-r pr-2 flex items-center justify-center">
          ${weeklyDose.toFixed(1)}
        </div>
        <!-- ตารางวัน 7 วัน -->
        <div class="w-[85%] grid grid-cols-7 gap-1">
          ${daysHtml}
        </div>
      </div>
    </div>
  `;
}

// ------------------------------------------------------------------
// 1, 2, 3, 4, 9. Main Controller & Event Handlers
// ------------------------------------------------------------------
function updateCalculatorUI() {
  const prevDose = parseFloat(document.getElementById('prevDoseInput')?.value) || 0;
  const currentINR = parseFloat(document.getElementById('currentINRInput')?.value) || 0;
  const newDose = parseFloat(document.getElementById('newDoseInput')?.value) || 0;

  // 1 & 2. ลบคำว่า (Input 1) / (Input 2) และ Render Reset Button ม่วงอ่อน
  // 3. ปรับขนาดอักษรที่กรอกใหญ่ขึ้น 50% (text-2xl) + เพิ่มความสูงบรรทัด (h-12)
  // 4. คำนวณ % ใหม่ เอาเครื่องหมาย < > ออก
  const percentDiff = prevDose > 0 ? (((newDose - prevDose) / prevDose) * 100).toFixed(2) : '0.00';
  const percentText = `${percentDiff >= 0 ? '+' : ''}${percentDiff}%`;

  const percentBadgeEl = document.getElementById('percentBadge');
  if (percentBadgeEl) {
    percentBadgeEl.innerText = percentText;
  }

  // Update INR Table Body
  const tableBodyEl = document.getElementById('inrTableBody');
  if (tableBodyEl) {
    tableBodyEl.innerHTML = getInrTableRows(prevDose, currentINR);
  }

  // Update Schedule UI
  const scheduleEl = document.getElementById('scheduleContainer');
  if (scheduleEl) {
    scheduleEl.innerHTML = renderSchedule(newDose);
  }
}

// Reset Handlers (ปุ่ม Reset สีม่วง)
function onResetInput1() {
  document.getElementById('prevDoseInput').value = 32;
  document.getElementById('currentINRInput').value = 1.6;
  updateCalculatorUI();
}

function onResetInput2() {
  document.getElementById('newDoseInput').value = 34;
  updateCalculatorUI();
}
