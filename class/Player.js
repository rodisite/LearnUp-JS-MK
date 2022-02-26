import { createElement } from '../utils/index.js';

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = 100;
        this.img = props.img;
        this.selector = `player${this.player}`;
        this.rootSelector = 'arenas';
    }   
    
    changeHP = (damage) => {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector);
    
        const $progressbar = createElement('div', 'progressbar');
        $player.appendChild($progressbar);
    
        const $life = createElement('div', 'life');
        $progressbar.appendChild($life);
        $life.style.width = this.hp + '%';
    
        const $name = createElement('div', 'name');
        $progressbar.appendChild($name);
        $name.innerText = this.name;
    
        const $character = createElement('div', 'character');
        $player.appendChild($character);
    
        const $img = createElement('img');
        $character.appendChild($img);
        $img.src = this.img;
    
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
        
        return $player;
    }
}

export default Player;