import getNewGeneration from './getNewGeneration';
/**
 * Запускает один цикл эволюции мира.
 * Новое состояние мира записывется на игровое поле.
 * @param {Array} OLD_GEN старое состояние мира
  */

export default OLD_GEN => {
    const newGeneration = getNewGeneration(OLD_GEN);
    newGeneration.forEach(cell => {
        const { rowIndex, cellIndex, action } = cell;
        OLD_GEN[rowIndex].children[cellIndex].classList[action]('cell__active');
    });
};