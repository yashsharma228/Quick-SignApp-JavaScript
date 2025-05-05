let text = document.getElementById("textColor");
let background = document.getElementById("bgColor");
let canvas = document.getElementById("mycanvas");
let clear = document.getElementById("clear");
let save = document.getElementById("save");
let retrieve = document.getElementById("retrieve");
let font = document.getElementById("font");
let ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set initial background color (optional, if you want a default)
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Change stroke and fill color when text color input changes
text.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

// Change canvas background color
background.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Start drawing
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

// Draw while moving
canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
});

// Stop drawing
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Change line width based on font input
font.addEventListener("change", (e) => {
  ctx.lineWidth = parseInt(e.target.value, 10); // Ensure value is numeric
});

clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", () => {
  localStorage.setItem("canvasData", canvas.toDataURL());
  alert("Canvas saved to local storage!");
  let link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.toDataURL();
  link.click();
});

retrieve.addEventListener("click", () => {
  let data = localStorage.getItem("canvasData");
  if (data) {
    let img = new Image();
    img.src = data;
    ctx.drawImage(img, 0, 0);
  }
});
