function createDivs(squares=16) {
    for (let x=0; x < squares; x ++) {
        let row = document.createElement('div')
        row.classList.add('row');
        grid.appendChild(row);
        for (let y=0; y < squares; y ++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundColor = cellColor;
            row.appendChild(cell);
        }
    }
    const cells = document.getElementsByClassName('cell');
    for (let cell=0; cell < cells.length; cell++) {
        cells[cell].addEventListener("mouseenter", changeColor);
    }
}

function changeColor(e) {
    let selectedColor = getSelectedColor();
    if (selectedColor === "black") {
        this.style.backgroundColor="black";
    } else if (selectedColor === "random") {
        this.style.backgroundColor = getRandomColor();
    } else if (selectedColor === "darken") {
        this.style.backgroundColor = getDarkerColor(this.style.backgroundColor);
    }
}

function getSelectedColor() {
    const colorOptions=document.getElementsByName('color');
    for (let x=0; x < colorOptions.length; x ++) {
        if (colorOptions[x].checked) return colorOptions[x].value;
    }
}

function getRandomColor() {
    const colorR = (Math.floor(Math.random()*256));
    const colorG = (Math.floor(Math.random()*256));
    const colorB = (Math.floor(Math.random()*256));
    return `RGB(${colorR} ${colorG} ${colorB})`;
}

function getDarkerColor(originalColor) {
    // Extracts the digits from the RGB color and returns a string RGB value with each number reduced by 25 (until it hits 0)
    let colorValues = originalColor.match(/(\d+)/g);
    for (let x = 0; x < colorValues.length; x ++) {
        let intValue = parseInt(colorValues[x]);
        if (intValue - 25 < 0) {
            colorValues[x] = 0;
        } else colorValues[x] = intValue - 25;
    }
    let darkerColor = "RGB(";
    for (let y = 0; y < colorValues.length; y ++) {
        if (y === colorValues.length - 1) {
            darkerColor += colorValues[y] + ")";
        } else {
            darkerColor += colorValues[y] + " ";
        }
    }
    return darkerColor;
}

function clearGrid() {
    const cells = document.getElementsByClassName('cell');
    for (let cell=0; cell < cells.length; cell ++) cells[cell].style.backgroundColor = cellColor;
}

function removeDivs() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function resizeGrid() {
    let squares;
    while (isNaN(squares)) {
        squares = prompt("Number of squares per side for new grid?\nMust be between 1 and 100");
    }
    // Prevents the grid being cleared if the prompt was cancelled
    if (squares > 0) {
        removeDivs();
        createDivs(squares);
    }
}

const cellColor = "#999";
const grid = document.getElementById('grid');
const clearButton = document.getElementById('clear');
const resizeButton = document.getElementById('resize');
clearButton.addEventListener('click', clearGrid);
resizeButton.addEventListener('click', resizeGrid);
createDivs();