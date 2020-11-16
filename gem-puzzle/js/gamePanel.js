const gamePanel = `<div class="wrapper-win">
        <div class="save">Saved!</div>
        <div class="leaders">
            <div class="leaders__point">
                <span>Records on moves</span>
            </div>
            <ol class="leaders__ol">
                
            </ol>
        </div>
        <div class="win">Ура! Вы решили головоломку за 
            <span class="win__times"></span> секунд и 
            <span class="win__moves"></span> ходов!
            <button class="win__close">x</button>
        </div>
    </div>
    <div class="wrapper-menu">
        <div class="menu">
            <button class="menu__save">Save the game</button>
            <button class="menu__load">Load the last game</button>
            <button class="menu__leaders">Leaders</button>
            <button class="menu__finish">Finish the game!</button>
        </div>
    </div>
    <div class="score-wrapper">
        <div class="score">
            <button class="menu-button">menu</button>
            <time class="score__time">time <span>00</span>:<span>00</span></time>
            <button class="score__reload">RELOAD</button>
            <div class="score__move">moves <span>0</span></div>
            <div class="score__select-wrapper">
                <span>size</span>
                <select name="3x3" id="0" class="score__select">
                    <option value="3">3x3</option>
                    <option value="4">4x4</option>
                    <option value="5">5x5</option>
                    <option value="6">6x6</option>
                    <option value="7">7x7</option>
                    <option value="8">8x8</option>
                </select>
            </div>
        </div>
    </div>
    <div class="container"></div>`;

export default gamePanel;
