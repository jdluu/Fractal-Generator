import { setupInputs, updateColorInputs } from './controls.js';
import { initializeFractalDrawing, updateFractal, setupZoomAndPan } from './fractalDrawing.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeFractalDrawing();
    setupInputs();
    setupZoomAndPan();
    
    const initialFractal = document.getElementById('fractal-select').value;
    updateColorInputs(initialFractal);
    
    // Add this line to ensure the fractal is drawn initially
    updateFractal();
});