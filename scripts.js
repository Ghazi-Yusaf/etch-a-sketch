let grid = document.getElementById('grid');
let isTransparent = false;
let gridSize;
let color;

createGrid();

function createGrid(gridSize = 16, color = 'black') {
    grid.style.gridTemplateRows = `repeat(${gridSize}, auto)`;
    grid.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let gridSquare = document.createElement('div');
            gridSquare.setAttribute('id', `gridSquare(${i},${j})`);
            gridSquare.setAttribute('class', 'gridSquare');
            setMouseOverEvent(gridSquare, color);
            grid.appendChild(gridSquare);
        }
    }
}

function clearGrid() {
    grid.innerHTML = "";
}

function newGrid() {
    gridSize = +prompt("Enter a number n between 1-100 (inclusive) to reset the grid to an n*n square", "16");

    while (gridSize === NaN || gridSize < 0 || gridSize > 100) {
        gridSize = +prompt("Please enter a value between 1-100 (inclusive)");
    }

    if (gridSize === 0) {
        return;
    }

    clearGrid();
    createGrid(gridSize, color);
}

function resetGrid() {
    clearGrid();
    createGrid(gridSize, color);
}

function setMouseOverEvent(gridSquare, color) {
    gridSquare.addEventListener('mouseenter', e => {
        let alpha;
        if (isTransparent) {
            if (!gridSquare.hasAttribute('style')) {
                alpha = 0.1;
            }
            else {
                alpha = parseFloat(gridSquare.style.backgroundColor.split(',')[3]) + 0.1;
            }
        }
        else {
            alpha = 1;
        }

        switch (color) {
            case 'black':
                gridSquare.style.backgroundColor = getBlack(alpha);
                break;
            case 'rainbow':
                gridSquare.style.backgroundColor = getRandomColor(alpha);
                break;
        }
    })
}

function changeColorMode() {
    let rainbowButton = document.getElementById('rainbow-button');
    clearGrid();

    if (rainbowButton.innerText === 'Rainbow Mode!!') {
        rainbowButton.innerText = 'Black and White';
        color = 'rainbow';
        createGrid(gridSize, color);
    }
    else {
        rainbowButton.innerText = 'Rainbow Mode!!';
        color = 'black';
        createGrid(gridSize, color);
    }
}

function changeOpacityMode() {
    let opacityButton = document.getElementById('fade-button');
    clearGrid();

    if (opacityButton.innerText === 'Fade in Mode!') {
        opacityButton.innerText = 'Opaque Mode';
        isTransparent = true;
        createGrid(gridSize, color);
    }
    else {
        opacityButton.innerText = 'Fade in Mode!';
        isTransparent = false;
        createGrid(gridSize, color);
    }
}

function getRandomColor(alpha) {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 
                 ${Math.floor(Math.random() * 256)}, ${alpha})`;
}

function getBlack(alpha) {
    return `rgba(0, 0, 0, ${alpha})`;
}