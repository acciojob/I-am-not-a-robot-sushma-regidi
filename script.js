window.addEventListener("DOMContentLoaded", () => {
  // Set heading text immediately (Cypress checks instantly)
  const h = document.getElementById("h");
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const resultPara = document.getElementById("para");
  const imagesDiv = document.getElementById("images");

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  let clickedTiles = [];

  // -------------------------------------------
  // Cypress expects SIX images with classes:
  // .img1, .img2, .img3, .img4, .img5, .img6
  // -------------------------------------------

  let sources = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg"
  ];

  // Pick a duplicated random image
  const duplicate = sources[Math.floor(Math.random() * sources.length)];
  let fullSet = [...sources, duplicate];

  // Shuffle the image sources
  fullSet.sort(() => Math.random() - 0.5);

  // Create 6 images with FIXED CLASSES Cypress expects
  fullSet.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;

    // IMPORTANT: Cypress test expects classes: img1, img2, img3...
    img.className = `img${idx + 1}`;

    img.dataset.src = src;
    img.style.cursor = "pointer";

    imagesDiv.appendChild(img);
  });

  const tiles = document.querySelectorAll("img");

  // -----------------------------
  // Click Event on Images
  // -----------------------------
  tiles.forEach(tile => {
    tile.addEventListener("click", () => {
      if (clickedTiles.length === 2) return;

      tile.classList.add("selected");
      clickedTiles.push(tile);

      resetBtn.style.display = "inline-block";

      if (clickedTiles.length === 2) {
        verifyBtn.style.display = "inline-block";
      }
    });
  });

  // -----------------------------
  // Reset Button
  // -----------------------------
  resetBtn.addEventListener("click", () => {
    clickedTiles.forEach(t => t.classList.remove("selected"));
    clickedTiles = [];
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
    resultPara.textContent = "";

    h.textContent =
      "Please click on the identical tiles to verify that you are not a robot.";
  });

  // -----------------------------
  // Verify Button
  // -----------------------------
  verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";

    const [a, b] = clickedTiles;

    if (a.dataset.src === b.dataset.src) {
      resultPara.textContent = "You are a human. Congratulations!";
    } else {
      resultPara.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });
});


