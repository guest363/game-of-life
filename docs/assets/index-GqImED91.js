(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`game-land`),t=50,n=70,r=16,i=22,a=0,o=window.innerHeight-t-n-r,s=window.innerWidth-a-r*2,c=Math.floor(o/i),l=Math.floor(s/i),u=()=>{let e=document.createElement(`div`);return e.classList.add(`cell`),e.onclick=function(){this.classList.toggle(`cell__active`)},e},d=(e,t,n)=>{let r=new DocumentFragment;for(let e=0;e<t;e++){let t=document.createElement(`div`);t.classList.add(`row`),t.classList.add(`row-${e}`);for(let e=0;e<n;e++){let e=u();t.append(e)}r.append(t)}return e.append(r),[...e.children]},f=(e,t)=>{let n=e[0],r=e[1],i=e=>(n+e+c)%c,a=e=>(r+e+l)%l,o=0;for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)e===0&&n===0||t[i(e)].children[a(n)].classList.contains(`cell__active`)&&(o+=1);return o},p=(e,t)=>!e&&t===3||e&&(t===2||t===3),m=e=>{let t=[];return e.forEach((n,r)=>{[...n.children].forEach((n,i)=>{let a=f([r,i],e),o=n.classList.contains(`cell__active`),s={rowIndex:r,cellIndex:i,action:``};p(o,a)?s.action=`add`:s.action=`remove`,t.push(s)})}),t},h=e=>{m(e).forEach(t=>{let{rowIndex:n,cellIndex:r,action:i}=t;e[n].children[r].classList[i](`cell__active`)})},g=[{id:`glider`,name:`Глайдер`,category:`Космические корабли`,description:`Самый известный космический корабль. Движется по диагонали через поле, оставляя за собой след. Был открыт Джоном Конвеем в 1970 году.`,cells:[[0,1],[1,2],[2,0],[2,1],[2,2]]},{id:`lwss`,name:`Лёгкий корабль`,category:`Космические корабли`,description:`Самый маленький ортогональный космический корабль. Движется горизонтально со скоростью c/2. Открыт Конвеем.`,cells:[[0,1],[0,4],[1,0],[2,0],[3,0],[3,4],[4,0],[4,1],[4,2],[4,3]]},{id:`mwss`,name:`Средний корабль`,category:`Космические корабли`,description:`Космический корабль средних размеров (MWSS). Движется горизонтально со скоростью c/2, состоит из 11 клеток.`,cells:[[0,2],[1,0],[1,4],[2,5],[3,0],[3,5],[4,1],[4,2],[4,3],[4,4],[4,5]]},{id:`hwss`,name:`Тяжёлый корабль`,category:`Космические корабли`,description:`Самый большой базовый космический корабль (HWSS). Движется горизонтально, состоит из 13 клеток. Более крупные корабли без поддержки нестабильны.`,cells:[[0,2],[0,3],[1,0],[1,5],[2,6],[3,0],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6]]},{id:`block`,name:`Блок`,category:`Статичные`,description:`Простейшая устойчивая фигура (still life). Состоит из 4 клеток в квадрате 2×2. Никогда не изменяется.`,cells:[[0,0],[0,1],[1,0],[1,1]]},{id:`beehive`,name:`Улей`,category:`Статичные`,description:`Устойчивая фигура из 6 клеток. Одна из самых распространённых фигур в случайных конфигурациях.`,cells:[[0,1],[0,2],[1,0],[1,3],[2,1],[2,2]]},{id:`loaf`,name:`Батон`,category:`Статичные`,description:`Устойчивая фигура из 7 клеток. Напоминает буханку хлеба. Часто возникает как побочный продукт эволюции.`,cells:[[0,1],[0,2],[1,0],[1,3],[2,1],[2,3],[3,2]]},{id:`boat`,name:`Лодка`,category:`Статичные`,description:`Устойчивая фигура из 5 клеток. Самая маленькая асимметричная «тихая жизнь».`,cells:[[0,0],[0,1],[1,0],[1,2],[2,1]]},{id:`tub`,name:`Ванна`,category:`Статичные`,description:`Устойчивая фигура из 4 клеток в форме ромба. Часто возникает в результате столкновений.`,cells:[[0,1],[1,0],[1,2],[2,1]]},{id:`blinker`,name:`Мигалка`,category:`Осцилляторы`,description:`Простейший осциллятор с периодом 2. Состоит из 3 клеток в линию. Меняет ориентацию каждое поколение.`,cells:[[0,0],[0,1],[0,2]]},{id:`toad`,name:`Жаба`,category:`Осцилляторы`,description:`Осциллятор периода 2 из 6 клеток. Был найден в ранних исследованиях игры.`,cells:[[0,1],[0,2],[0,3],[1,0],[1,1],[1,2]]},{id:`beacon`,name:`Маяк`,category:`Осцилляторы`,description:`Осциллятор периода 2, состоящий из двух блоков, расположенных по диагонали. Мигает, как маяк.`,cells:[[0,0],[0,1],[1,0],[2,3],[3,2],[3,3]]},{id:`pulsar`,name:`Пульсар`,category:`Осцилляторы`,description:`Знаменитый осциллятор периода 3 из 48 клеток. Обладает четырёхкратной симметрией. Один из самых узнаваемых паттернов.`,cells:[[0,2],[0,3],[0,4],[0,8],[0,9],[0,10],[2,0],[2,5],[2,7],[2,12],[3,0],[3,5],[3,7],[3,12],[4,0],[4,5],[4,7],[4,12],[5,2],[5,3],[5,4],[5,8],[5,9],[5,10],[7,2],[7,3],[7,4],[7,8],[7,9],[7,10],[8,0],[8,5],[8,7],[8,12],[9,0],[9,5],[9,7],[9,12],[10,0],[10,5],[10,7],[10,12],[12,2],[12,3],[12,4],[12,8],[12,9],[12,10]]},{id:`pentadecathlon`,name:`Пентадекатлон`,category:`Осцилляторы`,description:`Осциллятор периода 15 — один из самых длинных периодов среди малых фигур. Состоит из 12 клеток и был известен ещё до изобретения игры «Жизнь».`,cells:[[0,1],[1,1],[2,0],[2,2],[3,1],[4,1],[5,1],[6,1],[7,0],[7,2],[8,1],[9,1]]},{id:`gosper-gun`,name:`Ружьё Госпера`,category:`Генераторы`,description:`Первый обнаруженный генератор глайдеров. Каждые 30 поколений создаёт новый глайдер. Открыт Биллом Госпером в 1970 году. Доказал, что популяция может расти бесконечно.`,cells:[[0,24],[1,22],[1,24],[2,12],[2,13],[2,20],[2,21],[2,34],[2,35],[3,11],[3,15],[3,20],[3,21],[3,34],[3,35],[4,0],[4,1],[4,10],[4,16],[4,20],[4,21],[5,0],[5,1],[5,10],[5,14],[5,16],[5,17],[5,22],[5,24],[6,10],[6,16],[6,24],[7,11],[7,15],[8,12],[8,13]]},{id:`r-pentomino`,name:`R-пентамино`,category:`Метастабильные`,description:`Всего из 5 клеток порождает хаотичную эволюцию длиной 1103 поколения, прежде чем стабилизироваться. Порождает 6 глайдеров и множество устойчивых фигур. Первый паттерн, показавший, что простые начальные конфигурации могут иметь непредсказуемое поведение.`,cells:[[0,1],[0,2],[1,0],[1,1],[2,1]]},{id:`diehard`,name:`Дайхард`,category:`Метастабильные`,description:`Метастабильный паттерн из 7 клеток. Полностью исчезает ровно через 130 поколений, не оставляя ничего — редкое свойство.`,cells:[[0,6],[1,0],[1,1],[2,1],[2,5],[2,6],[2,7]]},{id:`acorn`,name:`Жёлудь`,category:`Метастабильные`,description:`Всего 7 клеток порождают сложнейшую эволюцию: 5206 поколений, прежде чем стабилизироваться. Итоговая популяция — 633 клетки, включая 13 глайдеров.`,cells:[[0,1],[1,3],[2,0],[2,1],[2,4],[2,5],[2,6]]},{id:`infinite-1`,name:`Бесконечный рост`,category:`Метастабильные`,description:`Один из самых маленьких паттернов (10 клеток), обеспечивающих бесконечный рост популяции. Доказывает, что в игре «Жизнь» возможен неограниченный рост.`,cells:[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,9]]}],_=()=>[...new Set(g.map(e=>e.category))],v=e=>g.filter(t=>t.category===e),y=d(e,c,l),b=3e3,x=setInterval(h,b,y),S=!1,C=null,w=[],T=!0;function E(e){return(51-e)*100}function D(){let e=document.getElementById(`speed`),t=document.getElementById(`speed-value`),n=E(e.value);n>=1e3?t.textContent=`${(n/1e3).toFixed(1)} сек`:t.textContent=`${n} мс`}function O(){let e=document.createElement(`div`);e.classList.add(`info-modal`);let t=document.createElement(`div`);t.classList.add(`info-modal-content`);let n=document.createElement(`button`);return n.classList.add(`modal-close`),n.innerHTML=`&times;`,n.onclick=()=>e.classList.remove(`active`),t.appendChild(n),t.innerHTML+=`
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
    `,e.appendChild(t),e.onclick=t=>{t.target===e&&e.classList.remove(`active`)},document.body.appendChild(e),e}function k(){let e=document.createElement(`div`);e.classList.add(`pattern-modal`);let t=document.createElement(`div`);t.classList.add(`pattern-modal-content`);let n=document.createElement(`button`);n.classList.add(`modal-close`),n.innerHTML=`&times;`,n.onclick=()=>e.classList.remove(`active`);let r=document.createElement(`h2`);r.classList.add(`modal-title`);let i=document.createElement(`h3`);i.classList.add(`modal-category`);let a=document.createElement(`p`);a.classList.add(`modal-description`);let o=document.createElement(`div`);return o.classList.add(`modal-preview`),t.appendChild(n),t.appendChild(r),t.appendChild(i),t.appendChild(a),t.appendChild(o),e.appendChild(t),e.onclick=t=>{t.target===e&&e.classList.remove(`active`)},{modal:e,title:r,category:i,description:a,preview:o}}function A(e,t){e.innerHTML=``;let n=Math.max(...t.cells.map(e=>e[0]))+1,r=Math.max(...t.cells.map(e=>e[1]))+1,i=document.createElement(`div`);i.classList.add(`preview-grid`),i.style.gridTemplateRows=`repeat(${n}, 1fr)`,i.style.gridTemplateColumns=`repeat(${r}, 1fr)`;for(let e=0;e<n;e++)for(let n=0;n<r;n++){let r=document.createElement(`div`);r.classList.add(`preview-cell`),t.cells.some(([t,r])=>t===e&&r===n)&&r.classList.add(`preview-cell-active`),i.appendChild(r)}e.appendChild(i)}function j(e){let t=Math.max(...e.cells.map(e=>e[0]))+1,n=Math.max(...e.cells.map(e=>e[1]))+1,r=document.createElement(`div`);r.classList.add(`mini-preview`),r.style.gridTemplateRows=`repeat(${t}, 1fr)`,r.style.gridTemplateColumns=`repeat(${n}, 1fr)`;for(let i=0;i<t;i++)for(let t=0;t<n;t++){let n=document.createElement(`div`);n.classList.add(`mini-cell`),e.cells.some(([e,n])=>e===i&&n===t)&&n.classList.add(`mini-cell--active`),r.appendChild(n)}return r}function M(){let e=document.createElement(`div`);e.classList.add(`patterns-panel`);let t=document.createElement(`h3`);t.textContent=`Фигуры`,t.classList.add(`panel-title`),e.appendChild(t);let n=document.createElement(`p`);n.classList.add(`panel-hint`),n.textContent=`Перетащите фигуру на поле или нажмите для размещения в центре`,e.appendChild(n);let r=document.createElement(`div`);r.classList.add(`categories-container`),_().forEach(e=>{let t=document.createElement(`div`);t.classList.add(`pattern-category`);let n=document.createElement(`h4`);n.textContent=e,t.appendChild(n);let i=document.createElement(`div`);i.classList.add(`patterns-list`),v(e).forEach(e=>{let t=document.createElement(`div`);t.classList.add(`pattern-btn-wrapper`);let n=document.createElement(`button`);n.classList.add(`pattern-btn`),n.dataset.patternId=e.id,n.setAttribute(`draggable`,`true`);let r=j(e);n.appendChild(r);let a=document.createElement(`span`);a.classList.add(`pattern-btn-text`),a.textContent=e.name;let o=document.createElement(`span`);o.classList.add(`pattern-info-icon`),o.innerHTML=`ℹ`,o.onclick=t=>{t.stopPropagation(),N(e)},n.appendChild(a),n.appendChild(o),t.appendChild(n),i.appendChild(t),n.addEventListener(`dragstart`,t=>{C=e,n.classList.add(`dragging`),t.dataTransfer.effectAllowed=`copy`;let i=r.cloneNode(!0);i.classList.add(`drag-ghost`),document.body.appendChild(i),t.dataTransfer.setDragImage(i,i.offsetWidth/2,i.offsetHeight/2),requestAnimationFrame(()=>i.remove())}),n.addEventListener(`dragend`,()=>{C=null,n.classList.remove(`dragging`),I()})}),t.appendChild(i),r.appendChild(t)}),e.appendChild(r);let i=document.createElement(`button`);return i.classList.add(`clear-btn`),i.textContent=`🗑️ Очистить поле`,e.appendChild(i),e}function N(e){let t=window.patternModal;t.title.textContent=e.name,t.category.textContent=e.category,t.description.textContent=e.description,A(t.preview,e),t.modal.classList.add(`active`)}function P(e){let t=g.find(t=>t.id===e);if(!t)return;let n=Math.max(...t.cells.map(e=>e[0])),r=Math.max(...t.cells.map(e=>e[1])),i=Math.floor(c/2)-Math.floor(n/2),a=Math.floor(l/2)-Math.floor(r/2);t.cells.forEach(([e,t])=>{let n=Math.floor(i+e),r=Math.floor(a+t);n>=0&&n<c&&r>=0&&r<l&&y[n].children[r].classList.add(`cell__active`)})}function F(e,t,n){e.cells.forEach(([e,r])=>{let i=t+e,a=n+r;i>=0&&i<c&&a>=0&&a<l&&y[i].children[a].classList.add(`cell__active`)})}function I(){w.forEach(e=>e.classList.remove(`cell__ghost`)),w=[]}function L(e,t,n){I(),e.cells.forEach(([e,r])=>{let i=t+e,a=n+r;if(i>=0&&i<c&&a>=0&&a<l){let e=y[i].children[a];e.classList.add(`cell__ghost`),w.push(e)}})}function R(e){let t=e.closest(`.row`);if(!t)return null;let n=y.indexOf(t);return n===-1?null:{row:n,col:[...t.children].indexOf(e)}}function z(){y.forEach(e=>{[...e.children].forEach(e=>{e.classList.remove(`cell__active`)})})}e.addEventListener(`dragover`,e=>{if(!C)return;e.preventDefault(),e.dataTransfer.dropEffect=`copy`;let t=e.target.closest(`.cell`);if(!t)return;let n=R(t);n&&L(C,n.row,n.col)}),e.addEventListener(`dragleave`,t=>{e.contains(t.relatedTarget)||I()}),e.addEventListener(`drop`,e=>{if(!C)return;e.preventDefault(),I();let t=e.target.closest(`.cell`);if(!t)return;let n=R(t);n&&(F(C,n.row,n.col),C=null)});var B=M(),V=k();window.patternModal=V,e.parentElement.insertBefore(V.modal,e.nextSibling),e.parentElement.insertBefore(B,V.modal.nextSibling);var H=O();B.addEventListener(`click`,e=>{let t=e.target.closest(`.pattern-btn`);if(t){let e=t.dataset.patternId;z(),P(e)}e.target.classList.contains(`clear-btn`)&&z()});function U(){T=!T,B.classList.toggle(`hidden`,!T)}document.getElementById(`btn-toggle-panel`).addEventListener(`click`,U),document.getElementById(`btn-info`).addEventListener(`click`,()=>{H.classList.add(`active`)});function W(){let e=document.getElementById(`speed`).value;b=E(e),D(),S||(clearInterval(x),x=setInterval(h,b,y))}window.setEvoSpeed=W,document.getElementById(`btn-pause`).addEventListener(`click`,()=>{S=!S;let e=document.getElementById(`btn-pause`);S?(clearInterval(x),e.textContent=`▶️`,e.title=`Продолжить`,e.classList.add(`paused`)):(x=setInterval(h,b,y),e.textContent=`⏸`,e.title=`Пауза`,e.classList.remove(`paused`))}),document.getElementById(`btn-step`).addEventListener(`click`,()=>{h(y)}),D();