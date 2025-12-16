let images = document.querySelectorAll(".img");
let resetBtn = document.getElementById("reset");
let verifyBtn = document.getElementById("verify");
let heading = document.getElementById("h");
let result = document.getElementById("para");

let clicked = [];

// Initial state
resetBtn.style.display = "none";
verifyBtn.style.display = "none";
result.innerText = "";

// Image sources (5 unique + 1 duplicate)
let imgArr = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg"
];

// Pick a random image to duplicate
let duplicate = imgArr[Math.floor(Math.random() * imgArr.length)];
imgArr.push(duplicate);

// Shuffle images
imgArr.sort(() => Math.random() - 0.5);

// Assign images
images.forEach((img, i) => {
  img.src = imgArr[i];
  img.setAttribute("data-id", imgArr[i]);
});

// Click handler
images.forEach(img => {
  img.addEventListener("click", () => {
    if (clicked.includes(img) || clicked.length === 2) return;

    img.classList.add("selected");
    clicked.push(img);

    resetBtn.style.display = "inline";

    if (clicked.length === 2) {
      verifyBtn.style.display = "inline";
    }
  });
});

// Reset button
resetBtn.addEventListener("click", () => {
  clicked = [];
  result.innerText = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  images.forEach(img => img.classList.remove("selected"));

  heading.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify button
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  let img1 = clicked[0].getAttribute("data-id");
  let img2 = clicked[1].getAttribute("data-id");

  if (img1 === img2) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});



