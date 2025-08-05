// Typewriter Effect
const words = ["Tirtha", "a Student", "a Programmer", "a Developer"];
const typingSpeed = 100, deletingSpeed = 50;
const waitAfterTyping = 1500, waitAfterDeleting = 500;
const typedName = document.getElementById("mainText");
const cursor = document.querySelector(".cursor");

let wordIdx = 0, charIdx = 0, isDeleting = false;

function typewriterLoop() {
  const word = words[wordIdx];
  cursor.classList.remove("blink");
  if (!isDeleting) {
    typedName.innerText = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      setTimeout(() => {
        isDeleting = true;
        typewriterLoop();
      }, waitAfterTyping);
    } else {
      setTimeout(typewriterLoop, typingSpeed);
    }
  } else {
    typedName.innerText = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      wordIdx = (wordIdx + 1) % words.length;
      isDeleting = false;
      setTimeout(typewriterLoop, waitAfterDeleting);
    } else {
      setTimeout(typewriterLoop, deletingSpeed);
    }
  }
  if (!isDeleting && charIdx === word.length) {
    cursor.classList.add("blink");
  }
}

function startTypewriter() {
  typedName.innerText = "";
  charIdx = 0;
  wordIdx = 0;
  isDeleting = false;
  setTimeout(typewriterLoop, 100);
}
