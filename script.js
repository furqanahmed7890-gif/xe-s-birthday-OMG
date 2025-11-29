// Elements
const startBtn = document.getElementById("start-btn");
const screenMain = document.getElementById("screen-main");
const typewriterEl = document.getElementById("typewriter-text");
const musicBtn = document.getElementById("music-toggle");
const musicStatus = document.querySelector(".music-status");
const bgMusic = document.getElementById("bg-music");
const wordChips = document.querySelectorAll(".word-chip");
const wordDetail = document.getElementById("word-detail");
const tapLayer = document.getElementById("tap-layer");

let isMusicPlaying = false;

/* Smooth scroll to main + start typewriter */
if (startBtn && screenMain) {
    startBtn.addEventListener("click", () => {
        screenMain.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(startTypewriter, 600);
    });
}

/* Typewriter */
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

/* Music control */
if (musicBtn && musicStatus && bgMusic) {
    musicBtn.addEventListener("click", async () => {
        try {
            if (!isMusicPlaying) {
                await bgMusic.play();
                isMusicPlaying = true;
                musicBtn.textContent = "Pause Music ⏸️";
                musicBtn.classList.remove("paused");
                musicStatus.classList.add("playing");
            } else {
                bgMusic.pause();
                isMusicPlaying = false;
                musicBtn.textContent = "Play Music 🎵";
                musicBtn.classList.add("paused");
                musicStatus.classList.remove("playing");
            }
        } catch (err) {
            console.error("Music play error:", err);
        }
    });

    musicBtn.classList.add("paused");
}

/* Interactive words */
wordChips.forEach(chip => {
    chip.addEventListener("click", () => {
        wordChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const text = chip.getAttribute("data-text") || "";
        wordDetail.textContent = text || "Tap a word above to see what it means to me.";
    });
});

/* Tap sparkles (background only) */
document.addEventListener("click", (e) => {
    const target = e.target;
    // Ignore taps on buttons and main cards so we don't distract
    if (
        target.closest("button") ||
        target.closest(".hero-card") ||
        target.closest(".main-card") ||
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
