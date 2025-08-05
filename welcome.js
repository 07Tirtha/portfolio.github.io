// Welcome Screen Animation
const helloText = document.getElementById("helloText");
const welcomeScreen = document.getElementById("welcome");
const mainContent = document.getElementById("main");
const followerContainer = document.getElementById("followerContainer");

const greetings = [
  "•Hello", "•Hola", "•Bonjour", "•Ciao", "•Здравствуйте",
  "•안녕하세요", "•你好", "•こんにちは", "•नमस्ते", "•নমস্কার"
];
const greetDelays = [275, 200, 200, 150, 150, 150, 150, 200, 200, 275];

let greetIndex = 0;
function cycleGreetings() {
  if (greetIndex < greetings.length) {
    helloText.innerText = greetings[greetIndex];
    setTimeout(cycleGreetings, greetDelays[greetIndex]);
    greetIndex++;
  } else {
    welcomeScreen.classList.add("hidden");
    setTimeout(() => {
      mainContent.style.display = "block";
      canvas.classList.add("visible");
      followerContainer.classList.add("visible");
      document.getElementById("tabBar").classList.add("visible");
      mainContent.classList.add("visible");
      animateStars();
      setTimeout(() => startTypewriter(), 1000);
    }, 300);
  }
}
setTimeout(cycleGreetings, greetDelays[0]);
