import './index.less';
const LAND = document.getElementById('game-land');
const ROWS = 16;
const COLS = 16;
let evo_speed = 2500;

const makeCell = () => {
    let cell = document.createElement('div');
    cell.classList.add(`cell`);
    cell.onclick = function () {
        this.classList.toggle(`cell__active`);
    };
    return cell;
};
const cellToggler = cell => {
    cell.click();
}

const makeFeild = () => {
    const fragment = new DocumentFragment();
    for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
        let row = document.createElement('div');
        row.classList.add(`row`);
        row.classList.add(`row-${rowIndex}`);
        for (let cellIndex = 0; cellIndex < COLS; cellIndex++) {
            const cell = makeCell();
            row.append(cell);
        }
        fragment.append(row);
    }
    LAND.append(fragment);
};
makeFeild();

const cellLifeCounter = (position, PAST_ROWS) => {
    const row = position[0];
    const col = position[1];
    const getRowNeiborIndex = i => (row + i + ROWS) % ROWS;
    const getColNeiborIndex = j => (col + j + COLS) % COLS;
    let lifeCells = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0);
            else {
                const correntRow = PAST_ROWS[getRowNeiborIndex(i)];
                const currentCell = correntRow.children[getColNeiborIndex(j)];
                if (currentCell.classList.contains('cell__active')) {
                    lifeCells = lifeCells + 1;
                }
            }
        }
    }
    return lifeCells;
};

const isBornOrSurvive = (selfState, arroundCells) => {
    const newBorn = !selfState && arroundCells === 3;
    const survive = selfState && (arroundCells === 2 || arroundCells === 3)
    return newBorn || survive;
};
const startEvo = () => {
    let fragment = new DocumentFragment();
    let newGen = [...LAND.cloneNode(true).children];
    const PAST_ROWS = [...LAND.children];
    newGen.forEach((row, rowIndex) => {
        [...row.children].map((cell, cellIndex) => {
            const cellArround = cellLifeCounter([rowIndex, cellIndex], PAST_ROWS);
            const selfLife = cell.classList.contains('cell__active');
            isBornOrSurvive(selfLife, cellArround) ?
                cell.classList.add('cell__active') : cell.classList.remove('cell__active');
            cell.onclick = function () {
                this.classList.toggle(`cell__active`);
            };
            return cell;
        });
        fragment.append(row);
    })

    LAND.innerHTML = '';
    LAND.append(fragment);
    fragment = '';
    newGen = '';
};
let timer = setInterval(startEvo, evo_speed);
function setEvoSpeed() {
    const speed = document.getElementById("speed").value;
    clearInterval(timer);
    timer = setInterval(startEvo, speed * 100);
};
window.setEvoSpeed = setEvoSpeed;
/*  */