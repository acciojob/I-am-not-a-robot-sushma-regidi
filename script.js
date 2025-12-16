// Heading text (REQUIRED by Cypress)
const heading = document.getElementById("h");
heading.innerText =
  "Please click on the identical tiles to verify that you are not a robot.";

// Buttons and result
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const result = document.getElementById("para");

resetBtn.style.display = "none";
verifyBtn.style.display = "none";
result.innerText = "";

// Select images by REQUIRED class names
const img1 = document.querySelectorAll(".img1");
const img2 = document.querySelectorAll(".img2");
const img3 = document.querySelectorAll(".img3");
const img4 = document.querySelectorAll(".img4");
const img5 = document.querySelectorAll(".img5");

// Put all images into one array
let images = [...img1, ...img2, ...img3, ...img4, ...img5];

// Shuffle images
images.sort(() => Math.random() - 0.5);

// Click tracking
let clicked = [];

// Image click logic
images.forEach(img => {
  img.addEventListener("click", () => {
    if (clicked.includes(img) || clicked.length === 2) return;

    clicked.push(img);
    resetBtn.style.display = "inline";

    if (clicked.length === 2) {
      verifyBtn.style.display = "inline";
    }
  });
});

// Reset button logic
resetBtn.addEventListener("click", () => {
  clicked = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  result.innerText = "";

  heading.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify button logic
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (clicked[0].className === clicked[1].className) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});




