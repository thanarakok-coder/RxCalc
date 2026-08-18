import React from 'react';
import { Info } from 'lucide-react';

export default function DoseCalculatorModal({
  drugName = "Gentamicin (40mg/ml)",
  infusionOrder = 13.60,
  targetConc = 2.0,
  deadSpace = 5.0,
  maxConcLimit = 10.0,
  minInfusionTime = "30-120 นาที",
  compatibleSolutions = "D5W, D10W, NSS"
}) {
  // 1. Calculation Logic
  const drugConcMgMl = 40; // mg/ml
  
  // ปริมาตรยาจริงที่ต้องใช้ตาม Order (ml)
  const drugVol = infusionOrder / drugConcMgMl; // 13.6 / 40 = 0.34 -> ในที่นี้ถ้าอิงรูป 0.59 (เผื่อค้างสาย)
  
  // ปริมาตรรวมที่ต้องเตรียมใน Syringe หลัก (ml) = (Order / TargetConc) + DeadSpace
  // หรือปรับตาม Formula ของระบบท่าน
  const totalVol = (infusionOrder / targetConc) + deadSpace; 
  
  // ปริมาตรยาคำนวณรวมค้างสาย
  const totalDrugMg = infusionOrder * (totalVol / (infusionOrder / targetConc));
  const drugVolCalc = totalDrugMg / drugConcMgMl; 
  const diluentVolCalc = totalVol - drugVolCalc;

  // สำหรับ Render ตัวเลข (ทศนิยม 2 ตำแหน่ง)
  const formatNum = (num) => (isNaN(num) ? "0.00" : Number(num).toFixed(2));

  const displayDrugVol = formatNum(drugVolCalc);
  const displayDiluentVol = formatNum(diluentVolCalc);
  const displayTotalVol = formatNum(totalVol);
  const displayTotalMg = formatNum(totalDrugMg);
  const displayAdminVol = formatNum(totalVol - deadSpace);
  const minDiluentRequired = formatNum(infusionOrder / maxConcLimit);

  return (
    <div className="p-6 bg-slate-100 min-h-screen flex flex-col gap-6 items-center justify-center font-sans">
      
      {/* MAIN CONTAINER / CARD */}
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        
        {/* HEADER SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* LEFT: INFO & LIMITS */}
          <div className="flex flex-col gap-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Compatible Solution :</span>
              <span className="font-medium text-slate-800">{compatibleSolutions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Max Conc. {maxConcLimit}mg/ml =</span>
              <span className="font-medium text-slate-800">ต้องใช้สารละลาย<b>อย่างน้อย {minDiluentRequired} ml</b></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">IV infusion :</span>
              <span className="font-medium text-slate-800"><b>อย่างน้อย</b> {minInfusionTime}</span>
            </div>
          </div>

          {/* RIGHT: INPUT/CALC READOUTS */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 mb-1">Order IV Infusion</span>
              <span className="text-base font-bold text-slate-800">{formatNum(infusionOrder)} <span className="text-xs font-normal text-slate-500">mg</span></span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 mb-1">Target conc.</span>
              <span className="text-base font-bold text-slate-800">{targetConc} <span className="text-xs font-normal text-slate-500">mg/ml</span></span>
            </div>
            <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 mb-1">ปริมาตรเผื่อค้างสาย</span>
              <span className="text-base font-bold text-slate-800">{deadSpace} <span className="text-xs font-normal text-slate-500">ml</span></span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: SVG DIAGRAM & SUMMARY TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* SVG SYRINGE DIAGRAM (Dynamic & Soft Font) */}
          <div className="md:col-span-5 border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-auto max-h-48 overflow-visible">
              <defs>
                {/* Pattern for Diluent / Liquid */}
                <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="2" />
                </pattern>
              </defs>

              {/* Syringe Main Body */}
              <rect x="110" y="50" width="140" height="60" fill="none" stroke="#334155" strokeWidth="3" rx="2" />
              
              {/* Syringe Plunger Head */}
              <rect x="235" y="52" width="15" height="56" fill="#334155" />
              <rect x="250" y="75" width="50" height="10" fill="#334155" />
              <rect x="300" y="60" width="6" height="40" fill="#334155" />

              {/* Syringe Tip */}
              <rect x="95" y="72" width="15" height="16" fill="none" stroke="#334155" strokeWidth="3" />

              {/* Tubing */}
              <path d="M 95 80 L 30 80 Q 20 80 20 100 T 20 120 L 40 120" fill="none" stroke="#334155" strokeWidth="3" />
              <rect x="40" y="113" width="12" height="14" fill="#94a3b8" stroke="#334155" strokeWidth="2" />

              {/* Liquid Parts */}
              {/* Diluent Fill Area [B] */}
              <rect x="112" y="52" width="50" height="56" fill="url(#diagonalHatch)" />
              
              {/* Syringe Graduation Marks */}
              <line x1="140" y1="50" x2="140" y2="62" stroke="#475569" strokeWidth="2" />
              <line x1="165" y1="50" x2="165" y2="62" stroke="#475569" strokeWidth="2" />
              <line x1="190" y1="50" x2="190" y2="62" stroke="#475569" strokeWidth="2" />
              <line x1="215" y1="50" x2="215" y2="62" stroke="#475569" strokeWidth="2" />

              {/* Top Text Label */}
              <text x="180" y="38" textAnchor="middle" fill="#1e293b" fontSize="15" fontWeight="normal">Syringe</text>
              <text x="50" y="65" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="normal">Infusion Set</text>

              {/* Bottom Arrows & Dynamic Values */}
              {/* Arrow 1: Drug [A] */}
              <path d="M 125 130 L 125 115" stroke="#1e293b" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="125" y="145" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="normal">
                ยา [A]
              </text>
              <text x="125" y="162" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="normal">
                {displayDrugVol} ml
              </text>

              {/* Arrow 2: Diluent [B] */}
              <path d="M 175 130 L 175 115" stroke="#1e293b" strokeWidth="1.5" />
              <text x="185" y="145" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="normal">
                สารน้ำ [B]
              </text>
              <text x="185" y="162" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="normal">
                {displayDiluentVol} ml
              </text>
            </svg>
          </div>

          {/* RIGHT: DYNAMIC SUMMARY BOX */}
          <div className="md:col-span-7 bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-slate-800">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-emerald-950">ปริมาตรรวมใน Syringe หลัก:</span>
              <span className="font-bold text-emerald-950 text-base">
                {displayTotalVol} ml <span className="font-normal text-emerald-800 text-sm">(มียารวม {displayTotalMg} mg)</span>
              </span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span>ใช้ยา {drugName} <span className="font-semibold text-teal-700">[A]</span>:</span>
              <span className="font-bold text-teal-600 text-base">{displayDrugVol} ml</span>
            </div>

            <div className="flex justify-between items-center">
              <span>ใช้สารละลาย (Diluent) <span className="font-semibold text-slate-700">[B]</span>:</span>
              <span className="font-bold text-slate-700 text-base">{displayDiluentVol} ml</span>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------------------------------- */}
      {/* 3. POPOVER DIALOG (WIDER WIDTH & NO UNWANTED WRAPS) */}
      {/* ---------------------------------------------------------------------------------- */}
      
      <div className="w-full max-w-[540px] bg-[#0b1329] text-slate-100 rounded-2xl p-6 shadow-xl border border-slate-800 relative">
        
        {/* POPOVER HEADER */}
        <div className="flex items-center gap-2 text-emerald-400 font-medium text-base mb-4 pb-3 border-b border-slate-800/80">
          <span className="text-lg font-mono">[:=</span>
          <span>ขั้นตอนการเตรียมและบริหารยา (ความเข้มข้นสม่ำเสมอ)</span>
        </div>

        {/* INSTRUCTIONS LIST */}
        <ol className="space-y-3 text-sm text-slate-200 mb-5 leading-relaxed">
          <li className="flex gap-2">
            <span>1.</span>
            <span>ใช้ Syringe หลัก ดูดสารน้ำ (Diluent) ปริมาตร <b className="text-white">{displayDiluentVol} ml</b></span>
          </li>
          <li className="flex gap-2">
            <span>2.</span>
            <span>ใช้ Syringe เล็ก (1 ml) ดูดยา Gentamicin ปริมาตร <b className="text-emerald-400">{displayDrugVol} ml</b> ({displayTotalMg} mg)</span>
          </li>
          <li className="flex gap-2">
            <span>3.</span>
            <span>ถ่ายยาจาก Syringe เล็ก เข้าสู่ Syringe หลัก แบบปากต่อปาก</span>
          </li>
          <li className="flex gap-2">
            <span>4.</span>
            <span><b className="underline underline-offset-2 decoration-emerald-400">Draw ผสมยาให้เข้ากัน</b> (ปริมาตรรวม = {displayTotalVol} ml)</span>
          </li>
          <li className="flex gap-2">
            <span>5.</span>
            <span>ต่อ Syringe หลักเข้ากับ Infusion Set แล้วบริหารยาผ่าน Syringe Pump</span>
          </li>
        </ol>

        {/* 4. WARNING BOX (RED/DARK ROSES) */}
        <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 mb-4 text-rose-200 text-sm">
          <div className="flex items-center gap-2 text-rose-400 font-bold mb-1.5">
            <Info className="w-4 h-4" />
            <span>ข้อระวังสำคัญ:</span>
          </div>
          <div className="leading-relaxed">
            ให้ยาปริมาตร <span className="font-bold underline text-white">{displayAdminVol} ml</span> ในเวลา {minInfusionTime} <span className="font-bold underline text-white">โดยไม่ต้อง FLUSH สายตามหลัง</span>
            <div className="mt-1 text-rose-300 font-normal">
              (ยาส่วนที่เหลือ {formatNum(deadSpace)} ml จะค้างอยู่ในสายพอดี)
            </div>
          </div>
        </div>

        {/* POPOVER FOOTER NOTE (NO WRAPPING ISSUES) */}
        <p className="text-xs text-slate-400 font-normal italic leading-normal">
          * เป็นเพียงข้อเสนอแนะ เทคนิควิธีขึ้นกับแต่ละบริบท ความชำนาญ และอุปกรณ์ที่มีของหน่วยบริการ
        </p>
      </div>

    </div>
  );
}
