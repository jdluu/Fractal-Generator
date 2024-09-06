import { setupInputs, updateColorInputs } from "./controls.js";
import {
	initializeFractalDrawing,
	updateFractal,
	setupZoomAndPan,
} from "./fractalDrawing.js";

document.addEventListener("DOMContentLoaded", () => {
	initializeFractalDrawing();
	setupInputs();
	setupZoomAndPan();

	const initialFractal = document.getElementById("fractal-select").value;
	updateColorInputs(initialFractal);

	// Initialize the fractal with centered view
	initializeFractal();
});

function initializeFractal() {
	const canvas = document.getElementById("fractal-container");
	const wrapper = document.getElementById("fractal-wrapper");
	const ctx = canvas.getContext("2d");

	// Set canvas size to match wrapper size
	canvas.width = wrapper.clientWidth;
	canvas.height = wrapper.clientHeight;

	// Calculate the center of the canvas
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;

	// Set the initial view to be centered
	const initialScale = 1; // Adjust this value as needed
	const initialOffsetX = 0;
	const initialOffsetY = 0;

	// Store these values for use in your rendering function
	canvas.dataset.offsetX = initialOffsetX;
	canvas.dataset.offsetY = initialOffsetY;
	canvas.dataset.scale = initialScale;

	// Update the fractal with centered view
	updateFractal();
}

// Call initializeFractal when switching fractals or resetting view
document
	.getElementById("fractal-select")
	.addEventListener("change", initializeFractal);
document
	.getElementById("reset-view")
	.addEventListener("click", initializeFractal);

// Add window resize event listener to keep the fractal centered
window.addEventListener("resize", () => {
	initializeFractal();
});
