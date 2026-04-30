export const GAME_LAND = document.getElementById('game-land');

const HEADER_HEIGHT = 56;
const FOOTER_HEIGHT = 80;
const PADDING = 20;
const CELL_SIZE = 22;

const availableHeight = window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT - PADDING;
const availableWidth = window.innerWidth * 0.75;

export const ROWS = Math.floor(availableHeight / CELL_SIZE);
export const COLS = Math.floor(availableWidth / CELL_SIZE);
