//

// --- MATRIX RAIN BACKGROUND ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Hacker characters
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789cod@#ing$%^&*()steｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
const fontSize = 16;
let columns = Math.floor(width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    // Translucent black background creates the fading trail effect
    ctx.fillStyle = 'rgba(0, 5, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0f0'; // Classic Matrix Green
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly after it crosses the screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
});


// --- TEXT GLITCH DECRYPTION EFFECT ---
function runGlitchText(element, finalString) {
    const chars = '01#$*!<>-_\\/[]{}—=+^?';
    let i = 0;
    element.innerText = '';

    if (element.glitchInterval) clearInterval(element.glitchInterval);

    element.glitchInterval = setInterval(() => {
        if (i >= finalString.length) {
            clearInterval(element.glitchInterval);
            element.innerText = finalString;
        } else {
            element.innerText = finalString.substring(0, i) + chars[Math.floor(Math.random() * chars.length)];
            i++;
        }
    }, 40);
}


// --- FORM SWITCHING LOGIC ---
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const toSignupBtn = document.getElementById('to-signup');
const toLoginBtn = document.getElementById('to-login');
const loginTitle = document.getElementById('login-title');
const signupTitle = document.getElementById('signup-title');

let isSwitching = false;

function switchForm(hideEl, showEl, titleEl, titleText, direction) {
    if (isSwitching) return;
    isSwitching = true;

    // Slide out the old form in the correct direction
    hideEl.classList.remove('slide-in-right', 'slide-in-left');
    hideEl.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');

    // Add a satisfying delay before the new form slides in
    setTimeout(() => {
        hideEl.classList.add('hidden');
        hideEl.classList.remove('slide-out-left', 'slide-out-right');

        // Show new form with a smooth slide-in
        showEl.classList.remove('hidden', 'slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right');
        showEl.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');

        runGlitchText(titleEl, titleText);

        setTimeout(() => {
            isSwitching = false;
        }, 450);
    }, 250); // The delay gap between out and in
}

toSignupBtn.addEventListener('click', () => {
    switchForm(loginSection, signupSection, signupTitle, '> NEW ENTITY DETECTED. GENERATING PROFILE...', 'right');
});

toLoginBtn.addEventListener('click', () => {
    switchForm(signupSection, loginSection, loginTitle, '> ACCESS RESTRICTED. IDENTIFY YOURSELF.', 'left');
});

// Run initial glitch effect on load
runGlitchText(loginTitle, '> ACCESS RESTRICTED. IDENTIFY YOURSELF.');


// --- INPUT FOCUS (BLINKING CURSOR) LOGIC ---
const inputs = document.querySelectorAll('.terminal-input');
inputs.forEach(input => {
    const group = input.parentElement;
    const cursor = document.createElement('span');
    cursor.className = 'blinking-cursor';

    input.addEventListener('focus', () => {
        group.classList.add('focused');
        group.appendChild(cursor);
    });

    input.addEventListener('blur', () => {
        group.classList.remove('focused');
        if (group.contains(cursor)) {
            group.removeChild(cursor);
        }
    });
});


// --- FORM SUBMISSION (FAKE LOADING & TOAST) ---
const forms = document.querySelectorAll('form');
const toast = document.getElementById('toast');

function showToast(msg) {
    toast.innerHTML = `<span class="toast-prefix">[ SUCCESS ]</span> ${msg}`;
    toast.classList.remove('hidden');

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.terminal-btn');
        const originalText = btn.innerText;

        // Simulating terminal execution
        btn.innerText = '[ EXECUTING... ]';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;

            // Show toast based on which form was submitted
            const successMsg = form.id === 'login-form'
                ? 'SYSTEM BREACHED. WELCOME.'
                : 'ENTITY REGISTERED. WELCOME.';

            showToast(successMsg);
        }, 1500);
    });
});
