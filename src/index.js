import './index.less';
import { GAME_LAND, ROWS, COLS } from './constants';
import makeFeild from './feild-maker';
import evolution from './evolution';
import PATTERNS, { getCategories, getPatternsByCategory } from './patterns';

const OLD_GEN = makeFeild(GAME_LAND, ROWS, COLS);
let evo_speed = 3000;
let timer = setInterval(evolution, evo_speed, OLD_GEN);
let isPaused = false;

let draggedPattern = null;
let ghostCells = [];
let panelVisible = true;

function speedFromSlider(val) {
    return (51 - val) * 100;
}

function updateSpeedDisplay() {
    const slider = document.getElementById('speed');
    const display = document.getElementById('speed-value');
    const ms = speedFromSlider(slider.value);
    if (ms >= 1000) {
        display.textContent = `${(ms / 1000).toFixed(1)} сек`;
    } else {
        display.textContent = `${ms} мс`;
    }
}

function createInfoModal() {
    const modal = document.createElement('div');
    modal.classList.add('info-modal');

    const content = document.createElement('div');
    content.classList.add('info-modal-content');

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => modal.classList.remove('active');

    content.appendChild(closeBtn);

    content.innerHTML += `
        <h2 class="info-title">Игра «Жизнь» Джона Конвея</h2>

        <div class="info-section">
            <h3>🧬 Что это такое?</h3>
            <p>
                «Жизнь» — это <strong>клеточный автомат</strong>, придуманный британским математиком
                <strong>Джоном Хортоном Конвеем</strong> в 1970 году. Это не игра в традиционном смысле —
                у неё нет игроков и победителей. Вы лишь задаёте начальную конфигурацию живых клеток,
                а затем наблюдаете, как они эволюционируют по простейшим правилам.
            </p>
            <p>
                Конвей искал простейший набор правил, который порождал бы <strong>непредсказуемое</strong>
                и <strong>сложное</strong> поведение. Ему это удалось — игра «Жизнь» стала одним из самых
                знаменитых примеров <strong>эмерджентности</strong>: из трёх простых правил рождаются
                структуры невероятной сложности.
            </p>
        </div>

        <div class="info-section">
            <h3>📜 Правила</h3>
            <div class="rules-grid">
                <div class="rule-card">
                    <div class="rule-icon">💀</div>
                    <div class="rule-text">
                        <strong>Одиночество:</strong> живая клетка с менее чем 2 соседями умирает
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-icon">✅</div>
                    <div class="rule-text">
                        <strong>Выживание:</strong> живая клетка с 2 или 3 соседями продолжает жить
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-icon">💀</div>
                    <div class="rule-text">
                        <strong>Перенаселение:</strong> живая клетка с более чем 3 соседями умирает
                    </div>
                </div>
                <div class="rule-card">
                    <div class="rule-icon">🌱</div>
                    <div class="rule-text">
                        <strong>Рождение:</strong> мёртвая клетка с ровно 3 соседями оживает
                    </div>
                </div>
            </div>
            <p class="rules-note">
                Соседями считаются все 8 клеток вокруг (по горизонтали, вертикали и диагонали).
                Все изменения происходят одновременно — это называется «синхронное обновление».
            </p>
        </div>

        <div class="info-section">
            <h3>🔬 Почему это важно?</h3>
            <p>
                Игра «Жизнь» — это не просто забава. Она доказала несколько фундаментальных идей:
            </p>
            <ul class="info-list">
                <li>
                    <strong>Эмерджентность</strong> — сложное поведение возникает из простых правил.
                    Никто не «программирует» глайдеры или пульсары — они появляются сами.
                </li>
                <li>
                    <strong>Тьюринг-полнота</strong> — в 2000-х было доказано, что в игре «Жизнь» можно
                    построить полноценный компьютер. Она вычислительно эквивалентна любому языку программирования.
                </li>
                <li>
                    <strong>Самоорганизация</strong> — из хаоса случайной начальной конфигурации
                    неизбежно возникает порядок: устойчивые фигуры, осцилляторы, космические корабли.
                </li>
                <li>
                    <strong>Модель жизни</strong> — клеточные автоматы используются для моделирования
                    биологических процессов, распространения эпидемий, роста кристаллов и городского планирования.
                </li>
            </ul>
        </div>

        <div class="info-section">
            <h3>🎮 Как играть</h3>
            <ul class="info-list">
                <li><strong>Клик по клетке</strong> — включить/выключить клетку вручную</li>
                <li><strong>Панель фигур</strong> — нажмите 🧩 в заголовке, чтобы открыть библиотеку фигур</li>
                <li><strong>Перетаскивание</strong> — захватите фигуру и перетащите на поле для точного размещения</li>
                <li><strong>Клик по фигуре</strong> — разместить в центре поля</li>
                <li><strong>ℹ️ на фигуре</strong> — узнать описание и историю паттерна</li>
                <li><strong>⏸ Пауза</strong> — остановить эволюцию для ручного редактирования</li>
                <li><strong>⏭ Шаг</strong> — выполнить ровно одно поколение</li>
            </ul>
        </div>

        <div class="info-section info-section--footer">
            <p>
                Джон Конвей (1937–2020) — выдающийся математик, известный работами в теории групп,
                теории чисел и комбинаторной теории игр. Игра «Жизнь» принесла ему всемирную славу
                после публикации в журнале Scientific American в октябре 1970 года.
            </p>
        </div>
    `;

    modal.appendChild(content);

    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };

    document.body.appendChild(modal);
    return modal;
}

function createPatternModal() {
    const modal = document.createElement('div');
    modal.classList.add('pattern-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('pattern-modal-content');

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => modal.classList.remove('active');

    const title = document.createElement('h2');
    title.classList.add('modal-title');

    const category = document.createElement('h3');
    category.classList.add('modal-category');

    const description = document.createElement('p');
    description.classList.add('modal-description');

    const visualPreview = document.createElement('div');
    visualPreview.classList.add('modal-preview');

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(category);
    modalContent.appendChild(description);
    modalContent.appendChild(visualPreview);
    modal.appendChild(modalContent);

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };

    return { modal, title, category, description, preview: visualPreview };
}

function showPatternPreview(container, pattern) {
    container.innerHTML = '';

    const rows = Math.max(...pattern.cells.map(c => c[0])) + 1;
    const cols = Math.max(...pattern.cells.map(c => c[1])) + 1;

    const previewGrid = document.createElement('div');
    previewGrid.classList.add('preview-grid');
    previewGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    previewGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('preview-cell');

            const isActive = pattern.cells.some(([pr, pc]) => pr === r && pc === c);
            if (isActive) {
                cell.classList.add('preview-cell-active');
            }

            previewGrid.appendChild(cell);
        }
    }

    container.appendChild(previewGrid);
}

function createMiniPreview(pattern) {
    const rows = Math.max(...pattern.cells.map(c => c[0])) + 1;
    const cols = Math.max(...pattern.cells.map(c => c[1])) + 1;

    const container = document.createElement('div');
    container.classList.add('mini-preview');
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('mini-cell');
            if (pattern.cells.some(([pr, pc]) => pr === r && pc === c)) {
                cell.classList.add('mini-cell--active');
            }
            container.appendChild(cell);
        }
    }
    return container;
}

function createPatternsPanel() {
    const panel = document.createElement('div');
    panel.classList.add('patterns-panel');

    const title = document.createElement('h3');
    title.textContent = 'Фигуры';
    title.classList.add('panel-title');
    panel.appendChild(title);

    const hint = document.createElement('p');
    hint.classList.add('panel-hint');
    hint.textContent = 'Перетащите фигуру на поле или нажмите для размещения в центре';
    panel.appendChild(hint);

    const categoriesContainer = document.createElement('div');
    categoriesContainer.classList.add('categories-container');

    const categories = getCategories();

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('pattern-category');

        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        const patternsList = document.createElement('div');
        patternsList.classList.add('patterns-list');

        const patterns = getPatternsByCategory(category);
        patterns.forEach(pattern => {
            const btnWrapper = document.createElement('div');
            btnWrapper.classList.add('pattern-btn-wrapper');

            const btn = document.createElement('button');
            btn.classList.add('pattern-btn');
            btn.dataset.patternId = pattern.id;
            btn.setAttribute('draggable', 'true');

            const preview = createMiniPreview(pattern);
            btn.appendChild(preview);

            const btnText = document.createElement('span');
            btnText.classList.add('pattern-btn-text');
            btnText.textContent = pattern.name;

            const infoIcon = document.createElement('span');
            infoIcon.classList.add('pattern-info-icon');
            infoIcon.innerHTML = 'ℹ';
            infoIcon.onclick = (e) => {
                e.stopPropagation();
                showPatternInfo(pattern);
            };

            btn.appendChild(btnText);
            btn.appendChild(infoIcon);
            btnWrapper.appendChild(btn);
            patternsList.appendChild(btnWrapper);

            btn.addEventListener('dragstart', (e) => {
                draggedPattern = pattern;
                btn.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'copy';
                const ghost = preview.cloneNode(true);
                ghost.classList.add('drag-ghost');
                document.body.appendChild(ghost);
                e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, ghost.offsetHeight / 2);
                requestAnimationFrame(() => ghost.remove());
            });

            btn.addEventListener('dragend', () => {
                draggedPattern = null;
                btn.classList.remove('dragging');
                clearGhostCells();
            });
        });

        categoryDiv.appendChild(patternsList);
        categoriesContainer.appendChild(categoryDiv);
    });

    panel.appendChild(categoriesContainer);

    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clear-btn');
    clearBtn.textContent = '🗑️ Очистить поле';
    panel.appendChild(clearBtn);

    return panel;
}

function showPatternInfo(pattern) {
    const modalElements = window.patternModal;
    modalElements.title.textContent = pattern.name;
    modalElements.category.textContent = pattern.category;
    modalElements.description.textContent = pattern.description;
    showPatternPreview(modalElements.preview, pattern);
    modalElements.modal.classList.add('active');
}

function placePattern(patternId) {
    const pattern = PATTERNS.find(p => p.id === patternId);
    if (!pattern) return;

    const maxRow = Math.max(...pattern.cells.map(c => c[0]));
    const maxCol = Math.max(...pattern.cells.map(c => c[1]));
    const centerRow = Math.floor(ROWS / 2) - Math.floor(maxRow / 2);
    const centerCol = Math.floor(COLS / 2) - Math.floor(maxCol / 2);

    pattern.cells.forEach(([rowOffset, colOffset]) => {
        const row = Math.floor(centerRow + rowOffset);
        const col = Math.floor(centerCol + colOffset);

        if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            const cell = OLD_GEN[row].children[col];
            cell.classList.add('cell__active');
        }
    });
}

function placePatternAt(pattern, anchorRow, anchorCol) {
    pattern.cells.forEach(([rowOffset, colOffset]) => {
        const row = anchorRow + rowOffset;
        const col = anchorCol + colOffset;
        if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            const cell = OLD_GEN[row].children[col];
            cell.classList.add('cell__active');
        }
    });
}

function clearGhostCells() {
    ghostCells.forEach(el => el.classList.remove('cell__ghost'));
    ghostCells = [];
}

function showGhostAt(pattern, anchorRow, anchorCol) {
    clearGhostCells();
    pattern.cells.forEach(([rowOffset, colOffset]) => {
        const row = anchorRow + rowOffset;
        const col = anchorCol + colOffset;
        if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            const cell = OLD_GEN[row].children[col];
            cell.classList.add('cell__ghost');
            ghostCells.push(cell);
        }
    });
}

function getCellCoords(cellEl) {
    const rowEl = cellEl.closest('.row');
    if (!rowEl) return null;
    const rowIndex = OLD_GEN.indexOf(rowEl);
    if (rowIndex === -1) return null;
    const colIndex = [...rowEl.children].indexOf(cellEl);
    return { row: rowIndex, col: colIndex };
}

function clearField() {
    OLD_GEN.forEach(row => {
        [...row.children].forEach(cell => {
            cell.classList.remove('cell__active');
        });
    });
}

GAME_LAND.addEventListener('dragover', (e) => {
    if (!draggedPattern) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    const cellEl = e.target.closest('.cell');
    if (!cellEl) return;
    const coords = getCellCoords(cellEl);
    if (!coords) return;
    showGhostAt(draggedPattern, coords.row, coords.col);
});

GAME_LAND.addEventListener('dragleave', (e) => {
    if (!GAME_LAND.contains(e.relatedTarget)) {
        clearGhostCells();
    }
});

GAME_LAND.addEventListener('drop', (e) => {
    if (!draggedPattern) return;
    e.preventDefault();
    clearGhostCells();

    const cellEl = e.target.closest('.cell');
    if (!cellEl) return;
    const coords = getCellCoords(cellEl);
    if (!coords) return;
    placePatternAt(draggedPattern, coords.row, coords.col);
    draggedPattern = null;
});

const patternsPanel = createPatternsPanel();
const patternModal = createPatternModal();
window.patternModal = patternModal;

GAME_LAND.parentElement.insertBefore(patternModal.modal, GAME_LAND.nextSibling);
GAME_LAND.parentElement.insertBefore(patternsPanel, patternModal.modal.nextSibling);

const infoModal = createInfoModal();

patternsPanel.addEventListener('click', (e) => {
    const patternBtn = e.target.closest('.pattern-btn');
    if (patternBtn) {
        const patternId = patternBtn.dataset.patternId;
        clearField();
        placePattern(patternId);
    }
    if (e.target.classList.contains('clear-btn')) {
        clearField();
    }
});

function togglePanel() {
    panelVisible = !panelVisible;
    patternsPanel.classList.toggle('hidden', !panelVisible);
}

document.getElementById('btn-toggle-panel').addEventListener('click', togglePanel);

document.getElementById('btn-info').addEventListener('click', () => {
    infoModal.classList.add('active');
});

function setEvoSpeed() {
    const speed = document.getElementById("speed").value;
    evo_speed = speedFromSlider(speed);
    updateSpeedDisplay();
    if (!isPaused) {
        clearInterval(timer);
        timer = setInterval(evolution, evo_speed, OLD_GEN);
    }
}
window.setEvoSpeed = setEvoSpeed;

document.getElementById('btn-pause').addEventListener('click', () => {
    isPaused = !isPaused;
    const btn = document.getElementById('btn-pause');
    if (isPaused) {
        clearInterval(timer);
        btn.textContent = '▶️';
        btn.title = 'Продолжить';
        btn.classList.add('paused');
    } else {
        timer = setInterval(evolution, evo_speed, OLD_GEN);
        btn.textContent = '⏸';
        btn.title = 'Пауза';
        btn.classList.remove('paused');
    }
});

document.getElementById('btn-step').addEventListener('click', () => {
    evolution(OLD_GEN);
});

updateSpeedDisplay();
