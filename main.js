function createDivs(squares=16) {
    for (let x=0; x < squares; x ++) {
        let row = document.createElement('div')
        row.classList.add('row');
        grid.appendChild(row);
        for (let y=0; y < squares; y ++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
    }
    const cells = document.getElementsByClassName('cell');
    for (let cell=0; cell < cells.length; cell++) {
        cells[cell].addEventListener("mouseenter", changeColor);
    }
}

function changeColor(e) {
    this.classList.add('black');
}

function clearGrid() {
    const cells = document.getElementsByClassName('cell');
    for (let cell=0; cell < cells.length; cell ++) {
        cells[cell].classList.remove('black');
    }
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

const grid = document.getElementById('grid');
const clearButton = document.getElementById('clear');
const resizeButton = document.getElementById('resize');
clearButton.addEventListener('click', clearGrid);
resizeButton.addEventListener('click', resizeGrid);
createDivs();