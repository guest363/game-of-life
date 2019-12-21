import lifeCellsArroundCounter from './life-cells-arroud-counter';
import isBornOrDie from './game-ruls';
/**
 * Просчитывает новое поколение
 * @param {Array} OLD_GEN старое состояние мира.
 * @returns {Array} клетки которые изменили свое состояние. В формате {
                rowIndex: rowIndex,
                cellIndex: cellIndex,
                action: 'add' or 'remove'
            }
  */

export default OLD_GEN => {
    let newGeneration = [];
    OLD_GEN.forEach((row, rowIndex) => {
        [...row.children].forEach((cell, cellIndex) => {
            const cellArround = lifeCellsArroundCounter([rowIndex, cellIndex], OLD_GEN);
            const selfLife = cell.classList.contains('cell__active');
            const cellToChange = {
                rowIndex: rowIndex,
                cellIndex: cellIndex,
                action: ''
            };
            isBornOrDie(selfLife, cellArround) ?
                cellToChange.action = 'add' : cellToChange.action = 'remove';
            newGeneration.push(cellToChange);
        });
    })
    return newGeneration;
};