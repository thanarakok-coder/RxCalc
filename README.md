# RxCalc
Routine Calculator for Nice Pharmacist ;)
[System Architecture & Design Specification]

1. Tech Stack: 
   - Vanilla HTML5, CSS3, and JavaScript (ES6+)
   - No Frontend Frameworks (No React, Vue, or Angular)
   - Host & Deployment: Static Hosting (GitHub Pages / Vercel)

2. Application Architecture:
   - Pattern: Single-Page Application (SPA) / Modular Monolith Architecture
   - Rendering: Pure Client-Side Rendering (CSR)
   - File Structure:
     ├── index.html       # Single Entry point, Main UI layout, and Navigation Shell
     ├── style.css        # Global CSS, Responsive UI/UX, Component styling
     ├── app.js           # Core App Controller, Navigation Router, Dynamic Script Loader
     └── modules/         # Independent Modular Calculation Engines
         ├── M1 (e.g., Insulin / Dosage Calc)
         ├── M2 (e.g., Neonatal Antibiotics / Ampicillin & Gentamicin)
         ├── M3 ...
         ├── M4 ...
         ├── M5 (e.g., Azithromycin Dosing)
         └── M6 (e.g., Warfarin Dosing & Adjustment)

3. Design & Execution Logic:
   - Dynamic UI Loading: Index.html acts as a shell. Clicking a menu dynamically loads or switches the corresponding JS module view.
   - Zero Backend: All calculations, algorithms, and logic execute completely on the browser side (Client-side execution).
   - Responsive & Mobile-First Design: Clean UI optimized for rapid clinical usage on both mobile and desktop screens.
