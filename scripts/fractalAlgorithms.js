function drawMandelbrot(imageData, width, height, r, g, b, maxIterations, zoomLevel, centerX, centerY) {
    const data = imageData.data;
    const scale = 4 / (Math.min(width, height) * zoomLevel);
    const offsetX = width / 2 - centerX * width / 4;
    const offsetY = height / 2 - centerY * height / 4;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const x0 = (x - offsetX) * scale - 2 / zoomLevel;
            const y0 = (y - offsetY) * scale - 2 / zoomLevel;
            
            let x1 = 0, y1 = 0, i = 0;
            while (x1 * x1 + y1 * y1 <= 4 && i < maxIterations) {
                const xtemp = x1 * x1 - y1 * y1 + x0;
                y1 = 2 * x1 * y1 + y0;
                x1 = xtemp;
                i++;
            }

            const pixelIndex = (y * width + x) * 4;
            if (i === maxIterations) {
                data[pixelIndex] = data[pixelIndex + 1] = data[pixelIndex + 2] = 0;
            } else {
                const colorIntensity = i / maxIterations;
                data[pixelIndex] = r * colorIntensity;
                data[pixelIndex + 1] = g * colorIntensity;
                data[pixelIndex + 2] = b * colorIntensity;
            }
            data[pixelIndex + 3] = 255;
        }
    }
}

function drawJulia(imageData, width, height, r, g, b, maxIterations, zoomLevel, centerX, centerY) {
    const data = imageData.data;
    const scale = 4 / (Math.min(width, height) * zoomLevel);
    const offsetX = width / 2 - centerX * width / 4;
    const offsetY = height / 2 - centerY * height / 4;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const x0 = (x - offsetX) * scale - 2 / zoomLevel;
            const y0 = (y - offsetY) * scale - 2 / zoomLevel;
            
            let x1 = x0, y1 = y0, i = 0;
            while (x1 * x1 + y1 * y1 <= 4 && i < maxIterations) {
                const xtemp = x1 * x1 - y1 * y1 - 0.7;
                y1 = 2 * x1 * y1 + 0.27015;
                x1 = xtemp;
                i++;
            }

            const pixelIndex = (y * width + x) * 4;
            if (i === maxIterations) {
                data[pixelIndex] = data[pixelIndex + 1] = data[pixelIndex + 2] = 0;
            } else {
                const colorIntensity = i / maxIterations;
                data[pixelIndex] = r * colorIntensity;
                data[pixelIndex + 1] = g * colorIntensity;
                data[pixelIndex + 2] = b * colorIntensity;
            }
            data[pixelIndex + 3] = 255;
        }
    }
}

function drawSierpinski(imageData, width, height, r, g, b) {
    const data = imageData.data;
    const points = [
        { x: width / 2, y: 0 },
        { x: 0, y: height },
        { x: width, y: height }
    ];

    for (let i = 0; i < width * height / 4; i++) {
        let point = { x: Math.random() * width, y: Math.random() * height };
        for (let j = 0; j < 5; j++) {
            const randomPoint = points[Math.floor(Math.random() * 3)];
            point.x = (point.x + randomPoint.x) / 2;
            point.y = (point.y + randomPoint.y) / 2;
            if (j === 4) {
                const pixelIndex = (Math.floor(point.y) * width + Math.floor(point.x)) * 4;
                data[pixelIndex] = r;
                data[pixelIndex + 1] = g;
                data[pixelIndex + 2] = b;
                data[pixelIndex + 3] = 255;
            }
        }
    }
}

function drawBarnsleyFern(imageData, width, height, r, g, b, iterations) {
    const data = imageData.data;
    let x = 0, y = 0;

    for (let i = 0; i < iterations; i++) {
        const random = Math.random();
        let nextX, nextY;

        if (random < 0.01) {
            nextX = 0;
            nextY = 0.16 * y;
        } else if (random < 0.86) {
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (random < 0.93) {
            nextX = 0.2 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }

        x = nextX;
        y = nextY;

        const pixelX = Math.floor((x + 2.182) * (width / 4.8));
        const pixelY = Math.floor(height - (y * (height / 11)));

        if (pixelX >= 0 && pixelX < width && pixelY >= 0 && pixelY < height) {
            const pixelIndex = (pixelY * width + pixelX) * 4;
            data[pixelIndex] = r;
            data[pixelIndex + 1] = g;
            data[pixelIndex + 2] = b;
            data[pixelIndex + 3] = 255;
        }
    }
}