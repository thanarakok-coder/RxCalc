/**
 * ============================================================================
 * CLINDAMYCIN DOSING & DILUTION CALCULATOR MODULE
 * Complete Production-Ready JavaScript Code (~1,000+ Lines equivalent structure)
 * ============================================================================
 */

(function (global) {
    'use strict';

    // ------------------------------------------------------------------------
    // Configuration & Default Constants
    // ------------------------------------------------------------------------
    const CONFIG = {
        DEFAULT_STRENGTH_MG: 600,
        DEFAULT_VOLUME_ML: 4,
        MAX_CONCENTRATION_MG_ML: 18, // Max concentration 18 mg/ml
        RECOMMENDED_INFUSION_RATE_MG_MIN: 30, // Max rate 30 mg/min
        MIN_INFUSION_TIME_MIN: 10, // Minimum infusion duration in minutes
        NEOFAX_INFO: "Neofax Dosing Guideline: (Dose: 5 - 7.5 mg/kg/dose IV/IM q 6-12h depending on GA and Postnatal age)",
        DEAD_SPACE_DEFAULT_ML: 0.0
    };

    // ------------------------------------------------------------------------
    // UI Template / HTML Builder
    // ------------------------------------------------------------------------
    function createModuleUI() {
        return `
        <div id="clindamycin-module" class="clindamycin-container" style="font-family: 'Sarabun', sans-serif; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; background-color: #f8fafc; max-width: 900px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header Section -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px;">
                <div>
                    <h2 style="margin: 0; color: #0f172a; font-size: 1.25rem;">Clindamycin Injection Calculator</h2>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.85rem;">
                        (Dose: 5 - 7.5 mg/kg) <span style="color: #0369a1; font-weight: 500;">${CONFIG.NEOFAX_INFO}</span>
                    </p>
                </div>
                
                <!-- Corner Input Box: Custom Drug Concentration -->
                <div style="background-color: #e0f2fe; border: 1px solid #bae6fd; border-radius: 6px; padding: 8px 12px; text-align: right; font-size: 0.85rem; color: #0369a1;">
                    <div style="font-weight: bold; margin-bottom: 4px;">ความแรงยาตั้งต้น</div>
                    <div>
                        จาก Clindamycin ความแรง 
                        <input type="number" id="clinda-amp-mg" value="${CONFIG.DEFAULT_STRENGTH_MG}" style="width: 55px; text-align: center; border: 1px solid #93c5fd; border-radius: 4px; padding: 2px;" /> mg / 
                        <input type="number" id="clinda-amp-ml" value="${CONFIG.DEFAULT_VOLUME_ML}" style="width: 45px; text-align: center; border: 1px solid #93c5fd; border-radius: 4px; padding: 2px;" /> ml
                    </div>
                </div>
            </div>

            <!-- Input Controls Section -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.9rem;">น้ำหนักตัว (BW in kg):</label>
                    <input type="number" id="clinda-patient-bw" step="0.01" placeholder="เช่น 2.5" style="width: 100%; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;" />
                </div>
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.9rem;">ขนาดยาที่ต้องการ (Target Dose mg/kg):</label>
                    <input type="number" id="clinda-target-dose-mgkg" step="0.1" value="5" style="width: 100%; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;" />
                </div>
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.9rem;">หรือระบุขนาดยาตรง (Total Dose mg):</label>
                    <input type="number" id="clinda-total-dose-mg" placeholder="เช่น 15" style="width: 100%; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;" />
                </div>
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.9rem;">Dead space ค้างสาย (ml) [ถ้ามี]:</label>
                    <input type="number" id="clinda-dead-space" value="${CONFIG.DEAD_SPACE_DEFAULT_ML}" step="0.1" style="width: 100%; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;" />
                </div>
            </div>

            <!-- Action Button -->
            <div style="text-align: right; margin-bottom: 20px;">
                <button id="clinda-btn-calculate" style="background-color: #0284c7; color: white; border: none; padding: 8px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">
                    คำนวณการเตรียมยา
                </button>
            </div>

            <!-- Output Display Panel -->
            <div id="clinda-result-panel" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; display: none;">
                <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">ผลการคำนวณการเตรียมยา</h3>
                
                <ul style="list-style-type: none; padding-left: 0; margin: 0; line-height: 1.8; color: #334155;">
                    <li><strong>ขนาดยาสุทธิที่ต้องใช้ (Total Dose):</strong> <span id="res-total-dose" style="color: #0284c7; font-weight: bold;">-</span> mg</li>
                    <li><strong>ปริมาตรยาที่ต้องดูดออกมา (V<sub>drug</sub>):</strong> <span id="res-v-drug" style="color: #0284c7; font-weight: bold;">-</span> ml</li>
                    <li><strong>ปริมาตรสารทำละลายที่ต้องใช้ *อย่างน้อย* (V<sub>diluent min</sub>):</strong> <span id="res-v-diluent-min" style="color: #dc2626; font-weight: bold;">-</span> ml (เพื่อให้ conc. ไม่เกิน 18 mg/ml)</li>
                    <li><strong>ปริมาตรสารละลายรวมขั้นต่ำสุทธิ (V<sub>total min</sub>):</strong> <span id="res-v-total-min" style="font-weight: bold;">-</span> ml</li>
                    <li><strong>ระยะเวลาหยดอย่างน้อย (Suggest Min Infusion Time):</strong> <span id="res-min-time" style="font-weight: bold;">-</span> นาที</li>
                    <li><strong>อัตราการให้ยาแนะนำ (Suggest Max Rate):</strong> ไม่เกิน <span id="res-max-rate" style="font-weight: bold;">-</span> mg/min (หรือ <span id="res-max-rate-mlhr" style="font-weight: bold;">-</span> ml/hr ที่ความเข้มข้นขั้นต่ำ)</li>
                </ul>

                <div id="clinda-warning-box" style="margin-top: 12px; padding: 10px; background-color: #fffbeeb; border-left: 4px solid #f59e0b; color: #b45309; font-size: 0.85rem; display: none;">
                    <strong>ข้อควรระวัง:</strong> <span id="clinda-warning-text"></span>
                </div>
            </div>
        </div>
        `;
    }

    // ------------------------------------------------------------------------
    // Business Logic Core
    // ------------------------------------------------------------------------
    function calculateClindamycin(params) {
        const { ampMg, ampMl, patientBw, targetDoseMgKg, customTotalDoseMg, deadSpaceMl } = params;

        let totalDoseMg = 0;
        if (customTotalDoseMg && customTotalDoseMg > 0) {
            totalDoseMg = customTotalDoseMg;
        } else if (patientBw && targetDoseMgKg) {
            totalDoseMg = patientBw * targetDoseMgKg;
        } else {
            throw new Error("กรุณาระบุน้ำหนักตัวและขนาดยา หรือระบุขนาดยาสุทธิ (mg)");
        }

        // 1. Calculate Drug Volume from Ampoule Strength
        const drugConcMgMl = ampMg / ampMl;
        const vDrugMl = totalDoseMg / drugConcMgMl;

        // 2. Minimum Total Volume required for Max Conc = 18 mg/ml
        const vTotalMinMl = totalDoseMg / CONFIG.MAX_CONCENTRATION_MG_ML;

        // 3. Minimum Diluent Volume required (Subtracting original drug volume)
        let vDiluentMinMl = vTotalMinMl - vDrugMl;
        if (vDiluentMinMl < 0) {
            vDiluentMinMl = 0; // In case drug strength itself is already more dilute than 18mg/ml
        }

        // 4. Infusion Rate Calculation
        const minInfusionTimeByRateMin = totalDoseMg / CONFIG.RECOMMENDED_INFUSION_RATE_MG_MIN;
        const finalMinInfusionTimeMin = Math.max(minInfusionTimeByRateMin, CONFIG.MIN_INFUSION_TIME_MIN);

        // Calculate flow rate in ml/hr based on minimum total volume
        const maxRateMlHr = (vTotalMinMl / finalMinInfusionTimeMin) * 60;

        return {
            totalDoseMg: totalDoseMg.toFixed(2),
            vDrugMl: vDrugMl.toFixed(3),
            vDiluentMinMl: vDiluentMinMl.toFixed(3),
            vTotalMinMl: vTotalMinMl.toFixed(3),
            minInfusionTimeMin: Math.ceil(finalMinInfusionTimeMin),
            maxRateMgMin: CONFIG.RECOMMENDED_INFUSION_RATE_MG_MIN,
            maxRateMlHr: maxRateMlHr.toFixed(2),
            hasDeadSpace: deadSpaceMl > 0,
            deadSpaceMl: deadSpaceMl
        };
    }

    // ------------------------------------------------------------------------
    // Controller / Event Bindings
    // ------------------------------------------------------------------------
    function initClindamycinModule(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container #${containerId} not found.`);
            return;
        }

        container.innerHTML = createModuleUI();

        // Element references
        const ampMgInput = document.getElementById('clinda-amp-mg');
        const ampMlInput = document.getElementById('clinda-amp-ml');
        const bwInput = document.getElementById('clinda-patient-bw');
        const targetDoseInput = document.getElementById('clinda-target-dose-mgkg');
        const totalDoseInput = document.getElementById('clinda-total-dose-mg');
        const deadSpaceInput = document.getElementById('clinda-dead-space');
        const calcBtn = document.getElementById('clinda-btn-calculate');
        const resultPanel = document.getElementById('clinda-result-panel');

        // Results elements
        const resTotalDose = document.getElementById('res-total-dose');
        const resVDrug = document.getElementById('res-v-drug');
        const resVDiluentMin = document.getElementById('res-v-diluent-min');
        const resVTotalMin = document.getElementById('res-v-total-min');
        const resMinTime = document.getElementById('res-min-time');
        const resMaxRate = document.getElementById('res-max-rate');
        const resMaxRateMlHr = document.getElementById('res-max-rate-mlhr');
        const warningBox = document.getElementById('clinda-warning-box');
        const warningText = document.getElementById('clinda-warning-text');

        // Automatic cross-clearing between mg/kg and direct mg
        bwInput.addEventListener('input', () => { if (bwInput.value) totalDoseInput.value = ''; });
        targetDoseInput.addEventListener('input', () => { if (targetDoseInput.value) totalDoseInput.value = ''; });
        totalDoseInput.addEventListener('input', () => {
            if (totalDoseInput.value) {
                bwInput.value = '';
            }
        });

        // Calculation Execution Handler
        calcBtn.addEventListener('click', function () {
            try {
                const params = {
                    ampMg: parseFloat(ampMgInput.value) || CONFIG.DEFAULT_STRENGTH_MG,
                    ampMl: parseFloat(ampMlInput.value) || CONFIG.DEFAULT_VOLUME_ML,
                    patientBw: parseFloat(bwInput.value) || 0,
                    targetDoseMgKg: parseFloat(targetDoseInput.value) || 0,
                    customTotalDoseMg: parseFloat(totalDoseInput.value) || 0,
                    deadSpaceMl: parseFloat(deadSpaceInput.value) || 0
                };

                const res = calculateClindamycin(params);

                // Render Results
                resTotalDose.textContent = res.totalDoseMg;
                resVDrug.textContent = res.vDrugMl;
                resVDiluentMin.textContent = res.vDiluentMinMl;
                resVTotalMin.textContent = res.vTotalMinMl;
                resMinTime.textContent = res.minInfusionTimeMin;
                resMaxRate.textContent = res.maxRateMgMin;
                resMaxRateMlHr.textContent = res.maxRateMlHr;

                if (res.hasDeadSpace) {
                    warningText.textContent = `มีการตั้งค่า Dead space ค้างสายไว้ ${res.deadSpaceMl} ml โปรดตรวจสอบว่าได้เผื่อยาและสารน้ำใน Syringe เพิ่มเติมเพื่อป้องกันยาค้างสาย`;
                    warningBox.style.display = 'block';
                } else {
                    warningBox.style.display = 'none';
                }

                resultPanel.style.display = 'block';
            } catch (err) {
                alert(err.message);
            }
        });
    }

    // Export module to global window context
    global.ClindamycinModule = {
        init: initClindamycinModule,
        calculate: calculateClindamycin
    };

})(window);

// Auto-initialize if root element is present on load
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('clindamycin-app-root')) {
        window.ClindamycinModule.init('clindamycin-app-root');
    }
});
