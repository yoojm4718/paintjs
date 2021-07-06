const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = Array.from(document.getElementsByClassName("jsColor"));
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function removeSelected() {
  colors.forEach((color) => {
    if (color.classList.contains("selected")) {
      color.classList.remove("selected");
    }
  });
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  removeSelected();
  event.target.classList.add("selected");
}

function handleColorMouseEnter(event) {
  event.target.classList.remove("unhovered");
  event.target.classList.add("hovered");
}

function handleColorMouseLeave(event) {
  event.target.classList.remove("hovered");
  event.target.classList.add("unhovered");
}

function handleCanvasClick() {
  if (filling == true) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
    stopPainting();
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

colors.forEach((color) => {
  color.addEventListener("click", handleColorClick);
  color.addEventListener("mouseenter", handleColorMouseEnter);
  color.addEventListener("mouseleave", handleColorMouseLeave);
});

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
