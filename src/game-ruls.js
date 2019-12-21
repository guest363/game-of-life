/**
 * Правила игры.
 * 1 -  в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
 * 2 - если у живой клетки есть две или три живые соседки, то эта клетка продолжает ж 
 * в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)
 * @param {Boolean} selfState жива ли сама клетка
 * @param {Number} arroundLifeCellsNumber колличество живых клеток по близости.
 * @returns {Boolean} оживет ли клетка или умрет
  */

export default (selfState, arroundLifeCellsNumber) => {
    const newBorn = !selfState && arroundLifeCellsNumber === 3;
    const survive = selfState && (arroundLifeCellsNumber === 2 || arroundLifeCellsNumber === 3)
    return newBorn || survive;
};