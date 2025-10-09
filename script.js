//your code here
<script>
  const imageContainer = document.getElementById("image-container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const para = document.getElementById("para");

  // 5 unique images
  const images = [
    "https://via.placeholder.com/150/ff0000",
    "https://via.placeholder.com/150/00ff00",
    "https://via.placeholder.com/150/0000ff",
    "https://via.placeholder.com/150/ffff00",
    "https://via.placeholder.com/150/00ffff"
  ];

  let clickedImages = [];

  // Function to load images and assign .img1, .img2, etc.
  function loadImages() {
    imageContainer.innerHTML = "";
    para.textContent = "";
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    clickedImages = [];

    // Pick random image to duplicate
    const duplicateIndex = Math.floor(Math.random() * images.length);
    const duplicateImage = images[duplicateIndex];

    // Create image set with duplicate
    const imageSet = [...images, duplicateImage];

    // Shuffle them randomly
    imageSet.sort(() => Math.random() - 0.5);

    // Render with class names
    imageSet.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.dataset.src = src;
      img.classList.add(`img${index + 1}`); // 👈 assign .img1, .img2, etc.
      img.addEventListener("click", () => selectImage(img));
      imageContainer.appendChild(img);
    });
  }

  // Handle image selection
  function selectImage(img) {
    if (clickedImages.includes(img)) return;
    img.classList.add("selected");
    clickedImages.push(img);
    resetBtn.style.display = "inline-block";

    if (clickedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    } else {
      verifyBtn.style.display = "none";
    }

    if (clickedImages.length > 2) {
      clickedImages.forEach(i => i.classList.remove("selected"));
      clickedImages = [];
      verifyBtn.style.display = "none";
    }
  }

  // Reset
  resetBtn.addEventListener("click", loadImages);

  // Verify
  verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";
    const [img1, img2] = clickedImages;
    if (img1.dataset.src === img2.dataset.src) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  // Load on startup
  loadImages();
</script>
