import './index.less';
import { GAME_LAND, ROWS, COLS } from './constants';
import makeFeild from './feild-maker';
import evolution from './evolution';
const OLD_GEN = makeFeild(GAME_LAND, ROWS, COLS);
let evo_speed = 2500;

let timer = setInterval(evolution, evo_speed, OLD_GEN);

function setEvoSpeed() {
    const speed = document.getElementById("speed").value;
    clearInterval(timer);
    timer = setInterval(evolution, speed * 100, OLD_GEN);
};
window.setEvoSpeed = setEvoSpeed;
/*  */