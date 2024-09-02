export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export const fractalInfo = {
    mandelbrot: {
        title: "Mandelbrot Set",
        description: "The Mandelbrot set is a famous fractal that represents the set of complex numbers for which the function f(z) = z^2 + c does not diverge when iterated from z = 0. To explore, use the zoom buttons or click and drag to pan around the fractal."
    },
    julia: {
        title: "Julia Set",
        description: "Julia sets are fractals that are produced by iterating complex functions. They are closely related to the Mandelbrot set. Experiment with different colors and iteration counts to see how the fractal changes."
    },
    sierpinski: {
        title: "Sierpiński Triangle",
        description: "The Sierpiński triangle is a self-similar fractal that occurs at different levels of iterations. It is a 2D iteration of the Cantor set."
    },
    barnsley: {
        title: "Barnsley Fern",
        description: "The Barnsley fern is a fractal that resembles a fern leaf. It is generated using an iterative process that applies a series of transformations."
    }
};