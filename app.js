import { render as renderInsulin } from './modules/insulin-calc.js';
import { render as renderTB } from './modules/tb-calc.js';
import { render as renderDAPT } from './modules/dapt-calc.js';

const app = document.getElementById('app');
const btnInsulin = document.getElementById('nav-insulin');
const btnTB = document.getElementById('nav-tb');
const btnDAPT = document.getElementById('nav-dapt');

const navButtons = [
    { btn: btnInsulin, render: renderInsulin },
    { btn: btnTB, render: renderTB },
    { btn: btnDAPT, render: renderDAPT }
];

function setActiveNav(activeBtn) {
    navButtons.forEach(({ btn }) => {
        if (btn === activeBtn) {
            btn.className = "nav-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-teal-500 text-slate-900 shadow";
        } else {
            btn.className = "nav-btn px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-300 hover:text-white hover:bg-slate-800";
        }
    });
}

// Event Listeners สลับหน้า
btnInsulin.addEventListener('click', () => {
    setActiveNav(btnInsulin);
    renderInsulin(app);
});

btnTB.addEventListener('click', () => {
    setActiveNav(btnTB);
    renderTB(app);
});

btnDAPT.addEventListener('click', () => {
    setActiveNav(btnDAPT);
    renderDAPT(app);
});

// Default Page: โหลดหน้า Insulin เมื่อเปิดเว็บ
renderInsulin(app);
