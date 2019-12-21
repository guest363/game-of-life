/**
 * Создает Клетку, которая является div'ом c событием 
 * onclick меняющем класс `cell__active` 
  */
export default () => {
    let cell = document.createElement('div');
    cell.classList.add(`cell`);
    cell.onclick = function () {
        this.classList.toggle(`cell__active`);
    };
    return cell;
};;