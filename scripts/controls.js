import { debounce } from './utils.js';
import { updateFractal } from './fractalDrawing.js';

export const fractalDefaults = {
    mandelbrot: { r: 66, g: 30, b: 150 },
    julia: { r: 70, g: 200, b: 150 },
    sierpinski: { r: 0, g: 255, b: 0 },
    barnsley: { r: 0, g: 180, b: 0 }
};

export function setupInputs() {
    const controlsForm = document.getElementById('controls');
    controlsForm.addEventListener('input', handleInputChange);
    setupFractalSelect();
}

function handleInputChange(event) {
    const target = event.target;
    if (target.type === 'range' || target.type === 'number') {
        updateInputValue(target);
        debounce(updateFractal, 100)();
    }
}

function updateInputValue(input) {
    const isRange = input.type === 'range';
    const pairedInput = isRange 
        ? document.getElementById(`${input.id}-input`)
        : document.getElementById(input.id.replace('-input', ''));

    let value = parseInt(input.value);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(255, value));

    input.value = value;
    if (pairedInput) pairedInput.value = value;

    if (input.id === 'iterations' || input.id === 'iterations-input') {
        const warningElement = document.querySelector('.warning');
        warningElement.style.display = value > 500 ? 'block' : 'none';
    }
}

function setupFractalSelect() {
    const fractalSelect = document.getElementById('fractal-select');
    fractalSelect.addEventListener('change', (e) => {
        updateColorInputs(e.target.value);
        updateFractal();
    });
}

export function updateColorInputs(fractalType) {
    const defaults = fractalDefaults[fractalType];
    ['red', 'green', 'blue'].forEach(color => {
        const slider = document.getElementById(color);
        const input = document.getElementById(`${color}-input`);
        slider.value = defaults[color[0]];
        input.value = defaults[color[0]];
    });

    const iterationsSlider = document.getElementById('iterations');
    const iterationsInput = document.getElementById('iterations-input');
    iterationsSlider.value = 100;
    iterationsInput.value = 100;

    updateFractal();
}