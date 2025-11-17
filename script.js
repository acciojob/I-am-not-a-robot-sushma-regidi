window.addEventListener("DOMContentLoaded", () => {
  const h = document.getElementById("h");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const resultPara = document.getElementById("para");
  const imageContainer = document.getElementById("images");

  // Initial message
  h.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  let clickedTiles = [];

  // -----------------------------
  // 1️⃣ Generate 5 unique images + 1 duplicate
  // -----------------------------
  let imgSources = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg"
  ];

  // Pick one random image to duplicate
  const duplicateImage = imgSources[Math.floor(Math.random() * imgSources.length)];
  let allImages = [...imgSources, duplicateImage];

  // Shuffle images randomly
  allImages.sort(() => Math.random() - 0.5);

  // Inject images into DOM
  allImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "tile";
    img.dataset.index = index;
    img.style.cursor = "pointer";
    imageContainer.appendChild(img);
  });

  // -----------------------------
  // 2️⃣ Add click event to images
  // -----------------------------
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach(tile => {
    tile.addEventListener("click", () => {
      // Do NOT allow more than 2 selections
      if (clickedTiles.length === 2) return;

      tile.classList.add("selected");
      clickedTiles.push(tile);

      // Show Reset button after ANY click
      resetBtn.style.display = "inline-block";

      // Show Verify button ONLY after 2 images selected
      if (clickedTiles.length === 2) {
        verifyBtn.style.display = "inline-block";
      }
    });
  });

  // -----------------------------
  // 3️⃣ Reset button functionality
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
  // 4️⃣ Verify button functionality
  // -----------------------------
  verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";

    const [imgA, imgB] = clickedTiles;

    if (imgA.src === imgB.src) {
      resultPara.textContent = "You are a human. Congratulations!";
    } else {
      resultPara.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });
});

