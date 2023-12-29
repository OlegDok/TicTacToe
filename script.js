document.addEventListener('DOMContentLoaded', function () {
    Initi();
});

let fields = Array(9).fill(null);
let currentPlayer = 'cross';

function Initi() {
    renderTicTacToe();
}

function restartGame() {
    fields.fill(null);
    renderTicTacToe();
}

function renderTicTacToe() {
    clearContent();

    let table = createTable();

    for (let i = 0; i < 3; i++) {
        let row = createTableRow();

        for (let j = 0; j < 3; j++) {
            let cell = createTableCell(i, j);

            if (fields[i * 3 + j] instanceof Element) {
                cell.appendChild(fields[i * 3 + j].cloneNode(true));
            } else {
                cell.textContent = fields[i * 3 + j];
            }

            cell.addEventListener('click', () => handleCellClick(i, j));
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    document.getElementById('content').appendChild(table);
}

function clearContent() {
    document.getElementById('content').innerHTML = '';
}

function createTable() {
    return document.createElement('table');
}

function createTableRow() {
    return document.createElement('tr');
}

function createTableCell(i, j) {
    let cell = document.createElement('td');
    cell.classList.add('cell');
    cell.id = `cell-${i}-${j}`;
    return cell;
}

function handleCellClick(i, j) {
    if (fields[i * 3 + j] === null) {
        fields[i * 3 + j] = currentPlayer;

        let cell = document.getElementById(`cell-${i}-${j}`);
        let svgElement = currentPlayer === 'cross' ? generateAnimatedCrossSVG() : generateAnimatedCircleSVG();

        cell.innerHTML = '';
        cell.appendChild(svgElement.cloneNode(true));

        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
    } else {
        console.log('Feld bereits belegt!');
    }
}


function generateAnimatedCrossSVG() {
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    let line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", "10");
    line1.setAttribute("y1", "10");
    line1.setAttribute("x2", "60");
    line1.setAttribute("y2", "60");
    line1.setAttribute("stroke", "#00B0EF");
    line1.setAttribute("stroke-width", "5");
    line1.setAttribute("stroke-dasharray", "70");
    line1.setAttribute("stroke-dashoffset", "70");
    line1.setAttribute("class", "animated-cross-line");

    let line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", "60");
    line2.setAttribute("y1", "10");
    line2.setAttribute("x2", "10");
    line2.setAttribute("y2", "60");
    line2.setAttribute("stroke", "#00B0EF");
    line2.setAttribute("stroke-width", "5");
    line2.setAttribute("stroke-dasharray", "70");
    line2.setAttribute("stroke-dashoffset", "70");
    line2.setAttribute("class", "animated-cross-line");

    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg;
}


function generateAnimatedCircleSVG() {
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    let circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "35");
    circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#efd300c0");
    circle.setAttribute("stroke-width", "5");

    let animate = document.createElementNS(svgNS, "animate");
    animate.setAttribute("attributeName", "stroke-dasharray");
    animate.setAttribute("from", "0");
    animate.setAttribute("to", "188");
    animate.setAttribute("dur", "0.8s");
    animate.setAttribute("fill", "freeze");

    circle.appendChild(animate);
    svg.appendChild(circle);

    return svg;
}