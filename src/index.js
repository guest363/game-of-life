import './index.less';
import { GAME_LAND, ROWS, COLS } from './constants';
import makeFeild from './feild-maker';
import evolution from './evolution';
import PATTERNS, { getCategories, getPatternsByCategory } from './patterns';

const OLD_GEN = makeFeild(GAME_LAND, ROWS, COLS);
let evo_speed = 2500;
let timer = setInterval(evolution, evo_speed, OLD_GEN);

// Создаем модальное окно для описания паттернов
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

// Функция отображения превью паттерна
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

// Создаем панель с паттернами
function createPatternsPanel() {
    const panel = document.createElement('div');
    panel.classList.add('patterns-panel');
    
    const title = document.createElement('h3');
    title.textContent = 'Фигуры';
    title.classList.add('panel-title');
    panel.appendChild(title);
    
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
        });
        
        categoryDiv.appendChild(patternsList);
        panel.appendChild(categoryDiv);
    });
    
    // Кнопка очистки поля
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clear-btn');
    clearBtn.textContent = 'Очистить поле';
    panel.appendChild(clearBtn);
    
    return panel;
}

// Показываем информацию о паттерне
function showPatternInfo(pattern) {
    const modalElements = window.patternModal;
    modalElements.title.textContent = pattern.name;
    modalElements.category.textContent = pattern.category;
    modalElements.description.textContent = pattern.description;
    showPatternPreview(modalElements.preview, pattern);
    modalElements.modal.classList.add('active');
}

// Функция размещения паттерна на поле
function placePattern(patternId) {
    const pattern = PATTERNS.find(p => p.id === patternId);
    if (!pattern) return;
    
    // Центрируем паттерн на поле
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

// Очистка поля
function clearField() {
    OLD_GEN.forEach(row => {
        [...row.children].forEach(cell => {
            cell.classList.remove('cell__active');
        });
    });
}

// Инициализация панели паттернов и модального окна
const patternsPanel = createPatternsPanel();
const patternModal = createPatternModal();
window.patternModal = patternModal;

GAME_LAND.parentElement.insertBefore(patternModal.modal, GAME_LAND.nextSibling);
GAME_LAND.parentElement.insertBefore(patternsPanel, patternModal.modal.nextSibling);

// Обработчики событий для кнопок паттернов
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

function setEvoSpeed() {
    const speed = document.getElementById("speed").value;
    clearInterval(timer);
    timer = setInterval(evolution, speed * 100, OLD_GEN);
};
window.setEvoSpeed = setEvoSpeed;
