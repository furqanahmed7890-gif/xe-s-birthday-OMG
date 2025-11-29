// Elements
const startBtn = document.getElementById("start-btn");
const screenMain = document.getElementById("screen-main");
const typewriterEl = document.getElementById("typewriter-text");
const musicBtn = document.getElementById("music-toggle");
const musicDot = document.querySelector(".music-dot");
const bgMusic = document.getElementById("bg-music");
const chips = document.querySelectorAll(".chip");
const chipDetail = document.getElementById("chip-detail");
const tapLayer = document.getElementById("tap-layer");

let isMusicPlaying = false;

/* Smooth scroll to main + start typewriter */
if (startBtn) {
    startBtn.addEventListener("click", () => {
        screenMain.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(startTypewriter, 500);
    });
}

/* Typewriter effect */
function startTypewriter() {
    if (!typewriterEl) return;
    const fullText = typewriterEl.getAttribute("data-full-text");
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

/* Music control */
if (musicBtn) {
    musicBtn.addEventListener("click", async () => {
        try {
            if (!isMusicPlaying) {
                await bgMusic.play();
                isMusicPlaying = true;
                musicBtn.textContent = "Pause Music ⏸️";
                musicBtn.classList.remove("paused");
                musicDot.classList.add("playing");
            } else {
                bgMusic.pause();
                isMusicPlaying = false;
                musicBtn.textContent = "Play Music 🎵";
                musicBtn.classList.add("paused");
                musicDot.classList.remove("playing");
            }
        } catch (err) {
            console.error("Music play error:", err);
        }
    });

    // initial state
    musicBtn.classList.add("paused");
}

/* Chips (words about her) */
chips.forEach(chip => {
    chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const text = chip.getAttribute("data-text");
        chipDetail.textContent = text;
    });
});

/* Tap sparkle - safe for mobile */
document.addEventListener("click", (e) => {
    const target = e.target;
    // Ignore taps on buttons / controls / chips
    if (
        target.closest("button") ||
        target.closest(".card") ||
        target.closest(".screen-words")
    ) {
        return;
    }

    const rect = tapLayer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const spark = document.createElement("div");
    spark.className = "tap-spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    tapLayer.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 600);
});
