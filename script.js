// Elements
const unfoldBtn = document.getElementById("unfold-btn");
const letterFold = document.getElementById("letter-fold");
const sectionLetter = document.getElementById("section-letter");

const typewriterEl = document.getElementById("typewriter-text");
const musicBtn = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");

const lanterns = document.querySelectorAll(".lantern");
const lanternDetail = document.getElementById("lantern-detail");

const teaCup = document.getElementById("tea-cup");
const teaMessage = document.getElementById("tea-message");

const tapLayer = document.getElementById("tap-layer");

let isMusicPlaying = false;

/* ========== UNFOLD LETTER (Interaction #1) ========== */
if (unfoldBtn && letterFold && sectionLetter) {
    unfoldBtn.addEventListener("click", () => {
        // Scroll to letter section
        sectionLetter.scrollIntoView({ behavior: "smooth", block: "start" });

        // Open the folded letter a moment later
        setTimeout(() => {
            letterFold.classList.add("open");
            startTypewriter();
        }, 500);
    });
}

/* ========== TYPEWRITER ========== */
function startTypewriter() {
    if (!typewriterEl) return;

    const fullText = typewriterEl.getAttribute("data-full-text") || "";
    typewriterEl.textContent = "";
    let index = 0;

    function typeNext() {
        if (index <= fullText.length) {
            typewriterEl.textContent = fullText.slice(0, index);
            index++;
            const ch = fullText[index - 1];
            const delay = (ch === "." || ch === "!" || ch === "?") ? 90 : 40;
            setTimeout(typeNext, delay);
        }
    }

    typeNext();
}

/* ========== MUSIC CONTROL ========== */
if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", async () => {
        try {
            if (!isMusicPlaying) {
                await bgMusic.play();
                isMusicPlaying = true;
                musicBtn.textContent = "Pause music ⏸️";
                musicBtn.classList.remove("paused");
            } else {
                bgMusic.pause();
                isMusicPlaying = false;
                musicBtn.textContent = "Play music 🎐";
                musicBtn.classList.add("paused");
            }
        } catch (err) {
            console.error("Music play error:", err);
        }
    });

    musicBtn.classList.add("paused");
}

/* ========== LANTERN WISHES (Interaction #2) ========== */
lanterns.forEach(btn => {
    btn.addEventListener("click", () => {
        lanterns.forEach(l => l.classList.remove("flipped"));
        btn.classList.add("flipped");

        const wish = btn.getAttribute("data-back") || "";
        lanternDetail.textContent = wish || "Tap any lantern for a wish.";
    });
});

/* ========== TEA FORTUNE (Interaction #3) ========== */
const teaBlessings = [
    "May your days steep slowly in peace, not rushed, not wasted.",
    "May God place gentle answers into the questions you carry.",
    "May new friendships and old ones both feel like home this year.",
    "May every closed door lead you somewhere softer, kinder, brighter.",
    "May you feel seen, known, and deeply loved — not just today, but always."
];
let teaIndex = 0;

if (teaCup && teaMessage) {
    teaCup.addEventListener("click", () => {
        teaIndex = (teaIndex + 1) % teaBlessings.length;
        teaMessage.textContent = teaBlessings[teaIndex];
    });
}

/* ========== TAP RIPPLE (extra interaction) ========== */
document.addEventListener("click", (e) => {
    const target = e.target;

    // Ignore buttons and main interactive elements so effect stays background-y
    if (
        target.closest("button") ||
        target.closest(".intro-card") ||
        target.closest(".letter-layout") ||
        target.closest(".section-lanterns") ||
        target.closest(".section-tea")
    ) {
        return;
    }

    const rect = tapLayer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("div");
    ripple.className = "tap-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    tapLayer.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 700);
});
