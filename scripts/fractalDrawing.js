import { fractalInfo } from "./utils.js";

let canvas, ctx, worker;
let zoomLevel = 1;
let centerX = 1.7;
let centerY = 1.7;

export function initializeFractalDrawing() {
	canvas = document.getElementById("fractal-container");
	ctx = canvas.getContext("2d");

	worker = new Worker("./scripts/fractalWorker.js");
	worker.onmessage = function (e) {
		ctx.putImageData(e.data, 0, 0);
	};

	// Set initial canvas size
	setCanvasSize();

	// Add a resize event listener to adjust canvas size when the window is resized
	window.addEventListener("resize", () => {
		setCanvasSize();
		updateFractal();
	});
}

function setCanvasSize() {
	const rect = canvas.getBoundingClientRect();
	canvas.width = rect.width;
	canvas.height = rect.height;
}

function clearCanvas() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function updateFractal() {
	clearCanvas();
	const fractalType = document.getElementById("fractal-select").value;
	const r = parseInt(document.getElementById("red-input").value);
	const g = parseInt(document.getElementById("green-input").value);
	const b = parseInt(document.getElementById("blue-input").value);
	const iterations = parseInt(
		document.getElementById("iterations-input").value
	);

	console.log("Updating fractal:", {
		fractalType,
		r,
		g,
		b,
		iterations,
		width: canvas.width,
		height: canvas.height,
		zoomLevel,
		centerX,
		centerY,
	});

	worker.postMessage({
		fractalType,
		r,
		g,
		b,
		iterations,
		width: canvas.width,
		height: canvas.height,
		zoomLevel,
		centerX,
		centerY,
	});

	updateFractalInfo();
}

function updateFractalInfo() {
	const fractalType = document.getElementById("fractal-select").value;
	const info = fractalInfo[fractalType];
	document.getElementById(
		"fractal-description"
	).innerHTML = `<h3>${info.title}</h3><p>${info.description}</p>`;
}

export function setupZoomAndPan() {
	document.getElementById("zoom-in").addEventListener("click", zoomIn);
	document.getElementById("zoom-out").addEventListener("click", zoomOut);
	document.getElementById("reset-view").addEventListener("click", resetView);

	canvas.addEventListener("mousedown", startDrag);
	canvas.addEventListener("mousemove", drag);
	canvas.addEventListener("mouseup", endDrag);
	canvas.addEventListener("mouseleave", endDrag);
}

function zoomIn() {
	zoomLevel *= 1.2;
	updateFractal();
}

function zoomOut() {
	zoomLevel /= 1.2;
	updateFractal();
}

function resetView() {
	zoomLevel = 1;
	centerX = 1.7;
	centerY = 1.7;
	updateFractal();
}

let isDragging = false;
let lastX, lastY;

function startDrag(e) {
	isDragging = true;
	lastX = e.clientX;
	lastY = e.clientY;
}

function drag(e) {
	if (!isDragging) return;
	const dx = e.clientX - lastX;
	const dy = e.clientY - lastY;
	centerX -= dx / (canvas.width / 4) / zoomLevel;
	centerY -= dy / (canvas.height / 4) / zoomLevel;
	lastX = e.clientX;
	lastY = e.clientY;
	updateFractal();
}

function endDrag() {
	isDragging = false;
}
