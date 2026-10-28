
const envelopeScreen = document.getElementById("envelopeScreen");
const letterScreen = document.getElementById("letterScreen");
const envelope = document.querySelector(".envelope");
const openButton = document.getElementById("openButton");
const backButton = document.getElementById("backButton");
const confettiContainer = document.getElementById("confetti");

const colours = [
    "#f6aaca",
    "#d8c4f5",
    "#fbe4a9",
    "#c6b4ec",
    "#f5c8e1",
    "#ffffff"
];

let isOpening = false;
let confettiTimer;

function launchConfetti() {
    // Clear any previous confetti.
    confettiContainer.replaceChildren();

    // Create a fresh confetti burst.
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");

        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor =
            colours[Math.floor(Math.random() * colours.length)];

        piece.style.animationDuration = (2.5 + Math.random() * 3) + "s";
        piece.style.animationDelay = (Math.random() * 1.2) + "s";
        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";

        confettiContainer.appendChild(piece);

        piece.addEventListener("animationend", function () {
            piece.remove();
        });
    }

    clearTimeout(confettiTimer);

    confettiTimer = setTimeout(function () {
        confettiContainer.replaceChildren();
    }, 7500);
}

// Open the envelope and reveal the birthday letter.
openButton.addEventListener("click", function () {
    if (isOpening) return;

    isOpening = true;
    openButton.disabled = true;

    envelope.classList.add("opening");
    launchConfetti();

    // Give the envelope animation time to play.
    setTimeout(function () {
        envelopeScreen.classList.add("hidden");
        letterScreen.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        isOpening = false;
    }, 850);
});

// Return to the original envelope screen.
backButton.addEventListener("click", function () {
    letterScreen.classList.add("hidden");
    envelopeScreen.classList.remove("hidden");

    // Reset the envelope so Divya can open it again.
    envelope.classList.remove("opening");
    openButton.disabled = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
