export const GAME_LAND = document.getElementById('game-land');

const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 70;
const PADDING = 16;
const CELL_SIZE = 22;
const PANEL_WIDTH = 0;

const availableHeight = window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT - PADDING;
const availableWidth = window.innerWidth - PANEL_WIDTH - PADDING * 2;

export const ROWS = Math.floor(availableHeight / CELL_SIZE);
export const COLS = Math.floor(availableWidth / CELL_SIZE);
