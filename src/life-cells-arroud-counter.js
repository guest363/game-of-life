
import { ROWS, COLS } from './constants';
/**
 * Подсчитывает колличество живых клеток по соседству с выбранной.
 * При этом игровое поле считается замкнутым.
 * @param {Array} selfPosition [x, y] собственные координаты клетки.
 * @param {Array} pastGen колличество строк.
 * @returns {Number} число живых соседних клеток
  */

export default (selfPosition, pastGen) => {
    const row = selfPosition[0];
    const col = selfPosition[1];
    const getRowNeiborIndex = i => (row + i + ROWS) % ROWS;
    const getColNeiborIndex = j => (col + j + COLS) % COLS;
    let lifeCells = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0);
            else {
                const correntRow = pastGen[getRowNeiborIndex(i)];
                const currentCell = correntRow.children[getColNeiborIndex(j)];
                if (currentCell.classList.contains('cell__active')) {
                    lifeCells = lifeCells + 1;
                }
            }
        }
    }
    return lifeCells;
};