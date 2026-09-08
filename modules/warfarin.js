import React, { useState, useEffect } from 'react';
import { AlertCircle, RotateCcw, CheckCircle } from 'lucide-react';

export default function WarfarinCalculator() {
  // --- States ---
  const [currentDose, setCurrentDose] = useState(13.0);
  const [inrValue, setInrValue] = useState(3.0);
  const [isHighTarget, setIsHighTarget] = useState(false);
  const [newDose, setNewDose] = useState(13.0);

  // Sync newDose when currentDose changes initially
  useEffect(() => {
    setNewDose(currentDose);
  }, [currentDose]);

  // --- Handlers ---
  const handleDoseChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setCurrentDose(num);
    } else if (val === '') {
      setCurrentDose('');
    }
  };

  const handleInrChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setInrValue(num);
    } else if (val === '') {
      setInrValue('');
    }
  };

  const handleNewDoseChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setNewDose(num);
    } else if (val === '') {
      setNewDose('');
    }
  };

  const resetNewDose = () => {
    setNewDose(currentDose);
  };

  // --- INR Logic & Ranges ---
  // Target 2.0 - 3.0 (Normal Target)
  const normalTargetTable = [
    { label: '< 1.5', min: 0, max: 1.499, suggestion: 'Increase 10-20%', lowRatio: 1.10, highRatio: 1.20 },
    { label: '1.5 - < 2.0', min: 1.5, max: 1.999, suggestion: 'Increase 5-10%', lowRatio: 1.05, highRatio: 1.10 },
    { label: '2.0 - 3.0', min: 2.0, max: 3.0, suggestion: 'Continue same dose', lowRatio: null, highRatio: 1.0 },
    { label: '> 3.0 - < 4.0', min: 3.001, max: 3.999, suggestion: 'Decrease 5-10%', lowRatio: 0.90, highRatio: 0.95 },
    { label: '4.0 - < 5.0', min: 4.0, max: 4.999, suggestion: 'Hold for 1 day then decrease 10% to 20%', lowRatio: 0.80, highRatio: 0.90 },
  ];

  // Target 2.5 - 3.5 (Mechanical Heart Valve)
  const highTargetTable = [
    { label: '< 2.0', min: 0, max: 1.999, suggestion: 'Increase 10-20%', lowRatio: 1.10, highRatio: 1.20 },
    { label: '2.0 - < 2.5', min: 2.0, max: 2.499, suggestion: 'Increase 5-10%', lowRatio: 1.05, highRatio: 1.10 },
    { label: '2.5 - 3.5', min: 2.5, max: 3.5, suggestion: 'Continue same dose', lowRatio: null, highRatio: 1.0 },
    { label: '> 3.5 - < 4.0', min: 3.501, max: 3.999, suggestion: 'Decrease 5-10%', lowRatio: 0.90, highRatio: 0.95 },
    { label: '4.0 - < 4.5', min: 4.0, max: 4.499, suggestion: 'Hold for 1 day then decrease 10% to 20%', lowRatio: 0.80, highRatio: 0.90 },
  ];

  const activeTable = isHighTarget ? highTargetTable : normalTargetTable;

  // Strict boundary check logic to prevent double highlighting
  const isHighlighted = (row) => {
    if (inrValue === '' || inrValue === null) return false;
    const numInr = parseFloat(inrValue);
    return numInr >= row.min && numInr <= row.max;
  };

  // Warning check for New Dose change (> 15% deviation)
  const isDoseAlert = () => {
    if (!currentDose || !newDose) return false;
    const diff = Math.abs(newDose - currentDose) / currentDose;
    return diff > 0.15;
  };

  const getPercentageChange = () => {
    if (!currentDose || !newDose) return 0;
    return (((newDose - currentDose) / currentDose) * 100).toFixed(2);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-slate-100 min-h-screen font-sans">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
        
        {/* Section 1: Dose Warfarin เดิม */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            1. Dose Warfarin เดิม (mg/wk)
          </label>
          <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
            <button
              onClick={() => setCurrentDose((prev) => Math.max(0, (parseFloat(prev) || 0) - 0.5))}
              className="w-12 h-12 aspect-square flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-2xl font-bold transition-colors border border-slate-200 shrink-0"
            >
              -
            </button>
            <input
              type="number"
              step="0.1"
              value={currentDose}
              onChange={(e) => handleDoseChange(e.target.value)}
              className="w-32 h-12 text-center text-2xl font-bold text-slate-800 bg-white border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            />
            <button
              onClick={() => setCurrentDose((prev) => (parseFloat(prev) || 0) + 0.5)}
              className="w-12 h-12 aspect-square flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-2xl font-bold transition-colors border border-slate-200 shrink-0"
            >
              +
            </button>
          </div>
        </div>

        {/* Section 2: INR วันนี้ */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2">
            2. INR วันนี้
          </label>
          <div className="max-w-xs mx-auto mb-3">
            <input
              type="number"
              step="0.1"
              value={inrValue}
              onChange={(e) => handleInrChange(e.target.value)}
              className="w-full h-12 text-center text-2xl font-bold text-slate-800 bg-white border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            />
          </div>

          <label className="flex items-center justify-center gap-2 text-slate-700 text-sm font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isHighTarget}
              onChange={(e) => setIsHighTarget(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
            Target INR 2.5 – 3.5 (Mechanical Heart Valve)
          </label>

          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Range INR ที่ยอมรับได้ ไม่จำเป็นต้องปรับขนาดยา</span>
          </div>
        </div>

        {/* Section 3: ตารางคำนวณ INR */}
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white font-semibold">
                <th className="p-3 text-center w-1/4">INR วันนี้</th>
                <th className="p-3 text-center w-2/4">Suggestion</th>
                <th className="p-3 text-center w-1/8">Low</th>
                <th className="p-3 text-center w-1/8">High</th>
              </tr>
            </thead>
            <tbody>
              {activeTable.map((row, idx) => {
                const active = isHighlighted(row);
                const lowVal = row.lowRatio && currentDose ? (currentDose * row.lowRatio).toFixed(1) : '-';
                const highVal = row.highRatio && currentDose ? (currentDose * row.highRatio).toFixed(1) : '-';

                return (
                  <tr
                    key={idx}
                    className={`border-b border-slate-100 transition-colors ${
                      active ? 'bg-amber-100 text-amber-950 font-bold' : 'bg-white text-slate-700'
                    }`}
                  >
                    <td className="p-3 text-center border-r border-slate-100">{row.label}</td>
                    <td className="p-3 text-left border-r border-slate-100">{row.suggestion}</td>
                    <td className="p-3 text-center border-r border-slate-100 text-teal-700">{lowVal}</td>
                    <td className="p-3 text-center text-teal-700">{highVal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Section 4: การบริหารยาครั้งต่อไป */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="p-1.5 bg-teal-100 text-teal-700 rounded-lg">
                ✏️
              </span>
              การบริหารยาครั้งต่อไป
            </h3>
            <button
              onClick={resetNewDose}
              className="flex items-center gap-1 text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-200 transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div>
            <label className="block text-slate-600 text-sm font-medium mb-2">
              ขนาดยาใหม่ที่ต้องการสั่งใช้ (mg/wk)
            </label>
            <div className="relative flex items-center justify-center">
              <div className="flex items-center justify-center gap-2 max-w-xs w-full">
                <button
                  onClick={() => setNewDose((prev) => Math.max(0, (parseFloat(prev) || 0) - 0.5))}
                  className="w-12 h-12 aspect-square flex items-center justify-center rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-2xl font-bold transition-colors border border-slate-200 shadow-sm shrink-0"
                >
                  -
                </button>
                <input
                  type="number"
                  step="0.1"
                  value={newDose}
                  onChange={(e) => handleNewDoseChange(e.target.value)}
                  className="w-32 h-12 text-center text-2xl font-bold text-slate-800 bg-white border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none shadow-sm"
                />
                <button
                  onClick={() => setNewDose((prev) => (parseFloat(prev) || 0) + 0.5)}
                  className="w-12 h-12 aspect-square flex items-center justify-center rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-2xl font-bold transition-colors border border-slate-200 shadow-sm shrink-0"
                >
                  +
                </button>
              </div>

              {/* Display Percentage Change Tag */}
              {currentDose > 0 && newDose !== currentDose && (
                <div className="absolute right-0 bg-red-100 text-red-600 font-bold text-sm px-2.5 py-1 rounded-full border border-red-200">
                  {getPercentageChange()}%
                </div>
              )}
            </div>
          </div>

          {/* Warning Message */}
          {isDoseAlert() && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm font-medium">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>กรุณาตรวจสอบและยืนยันขนาดยาที่สั่งใช้อีกครั้ง</span>
            </div>
          )}
        </div>

        {/* Section 5: แสดงรูปภาพเม็ดยา (ข้อ 4) */}
        <div>
          <h4 className="font-bold text-slate-800 mb-3">5. รูปแบบเม็ดยา</h4>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[2, 3, 4, 5].map((mg) => (
              <div key={mg} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-500 mb-2">{mg} mg</span>
                
                {/* 
                  ขอบโปร่งใสทุกกรณี (border-transparent & stroke-transparent) 
                  เพื่อให้รูปหักครึ่งเม็ดดูเป็นครึ่งเม็ดแบบเรียลๆ
                */}
                <div className="w-10 h-10 rounded-full bg-slate-200 border border-transparent overflow-hidden flex items-center justify-center relative shadow-inner">
                  {/* ตัวอย่างครึ่งเม็ด (Half Pill SVG Render / Mock) */}
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M 18,2 A 16,16 0 0,1 18,34 Z"
                      fill="#3b82f6"
                      stroke="transparent"
                      strokeWidth="0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
