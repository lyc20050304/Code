const imgApi = "https://source.unsplash.com/random?topic=nature";
const img = new Image();
let imgSize = "";

let startTime, endTime;

const info = document.getElementById("info");
const mbSpeed = document.getElementById("mbs");
const kbSpeed = document.getElementById("kbs");
const bitSpeed = document.getElementById("bits");

const numTests = 6;
let testCompleted = 0;
let totalMbSpeed = 0;
let totalKbSpeed = 0;
let totalBitSpeed = 0;

function calculateSpeed() {
  const timeDuration = (endTime - startTime) / 1000;

  const loadedBits = imgSize * 8;
  const speedInBits = loadedBits / timeDuration;
  const speedInKbs = speedInBits / 1024;
  const speedInMbs = speedInKbs / 1024;

  totalBitSpeed += speedInBits;
  totalKbSpeed += speedInKbs;
  totalMbSpeed += speedInMbs;

  testCompleted++;
  if (testCompleted == numTests) {
    const averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
    const averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
    const averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

    info.innerHTML = "Test Completed!";
    mbSpeed.innerHTML += `${averageSpeedInMbps}`;
    kbSpeed.innerHTML += `${averageSpeedInKbps}`;
    bitSpeed.innerHTML += `${averageSpeedInBps}`;
  } else {
    startTime = new Date().getTime();

    img.setAttribute("src", imgApi);
  }
}

async function init() {
  info.innerHTML = "Testing...";

  startTime = new Date().getTime();

  img.setAttribute("src", imgApi);
}

window.addEventListener("load", () => {
  for (let i = 0; i < numTests; i++) {
    init();
  }
});

img.addEventListener("load", async () => {
  endTime = new Date().getTime();

  await fetch(imgApi).then((response) => {
    imgSize = response.headers.get("content-length");
    calculateSpeed();
  });
});
