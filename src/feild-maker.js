import makeCell from './cell-maker';

/**
 * Создает фрагмент в который заносится размеченное игровое поле.
 * Пытается максимально заполнить игровое поле ячейками исходя из
 * размера экрана на котором запущена игра.
 * Фрагмент добавляется на игровое поле.
 * @param {Node} GAME_LAND ссылка на игровое поле. DOM элемент.
 * @param {Number} ROWS колличество строк.
 * @param {Number} COLS колличество колонок.
 * @returns {Array} текущее поколение, ссылки на DOM
  */

export default (GAME_LAND, ROWS, COLS) => {
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
    GAME_LAND.append(fragment);
    return [...GAME_LAND.children];
};