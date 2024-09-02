importScripts('./fractalAlgorithms.js');

self.onmessage = function(e) {
    console.log('Worker received message:', e.data);
    const { fractalType, r, g, b, iterations, width, height, zoomLevel, centerX, centerY } = e.data;
    const imageData = new ImageData(width, height);

    switch (fractalType) {
        case 'mandelbrot':
            drawMandelbrot(imageData, width, height, r, g, b, iterations, zoomLevel, centerX, centerY);
            break;
        case 'julia':
            drawJulia(imageData, width, height, r, g, b, iterations, zoomLevel, centerX, centerY);
            break;
        case 'sierpinski':
            drawSierpinski(imageData, width, height, r, g, b);
            break;
        case 'barnsley':
            drawBarnsleyFern(imageData, width, height, r, g, b, iterations);
            break;
    }

    self.postMessage(imageData, [imageData.data.buffer]);
};