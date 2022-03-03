import Player from './Player.js';
import Logs from './Logs.js';
import { createElement } from '../utils/index.js';

const $fightButton = document.querySelector('.buttonWrap>.button');
let player1;
let player2;

class Game {
    constructor ({
        root,
        chat
    }) {
        this.root = root;
        this.form = root.querySelector('.control');
        this.logs = new Logs(
            chat,
        )
    }

    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }

    start = async () => {
        const players = await this.getPlayers();

        const p1 = JSON.parse(localStorage.getItem('player1'));
        const p2 = JSON.parse(localStorage.getItem('player2'));

        this.player1 = new Player({
           ...p1,
           player: 1,
           rootSelector: 'arenas'
        });

        this.player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas'
        });

        this.player1.createPlayer();
        this.player2.createPlayer();

        this.logs.start(this.player1.name, this.player2.name);
        this.submitResult();
    }

    submitResult = () => {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const attack = this.playerAttack();
            const fightResult = await this.getFightResult(attack.hit, attack.defence);            
        
            if (attack.hit != fightResult.player2.defence ) {
                this.player2.changeHP(fightResult.player1.value);
                this.player2.renderHP();
                this.logs.hit(this.player1.name, this.player2.name, fightResult.player1.value, this.player2.hp);
            } else if (attack.hit === fightResult.player2.defence ){
                this.logs.defence(this.player1.name, this.player2.name);
            }
            
            if (fightResult.player2.hit != attack.defence) {
                this.player1.changeHP(fightResult.player2.value);
                this.player1.renderHP();
                this.logs.hit(this.player2.name, this.player1.name, fightResult.player2.value, this.player1.hp);
            } else if (fightResult.player2.hit === attack.defence) {
                this.logs.defence(this.player2.name, this.player1.name);
            }
      
            this.showResult();
        })
    }

    getFightResult = async (hit, defence) => {
        const fight = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());

        return fight;
    }

    playerAttack = () => {
        const attack = {};
    
        for (let item of this.form) {
            if (item.checked && item.name === 'hit') {
                attack.hit = item.value;
            }
    
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
    
            item.checked = false;
        }
    
        return attack;
    }

    playerWins = (name) => {
        const $winsTitle = createElement('div', 'loseTitle');
        if (name) {
            $winsTitle.innerText = name + ' wins!';
        } else {
            $winsTitle.innerText = 'draw';
        }
    
        return $winsTitle;
    }

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('button', 'button');
        $button.innerText = 'Restart';
        $reloadWrap.appendChild($button);
    
        return $reloadWrap;
    }

    showResult = () => {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            $fightButton.disabled = true;
    
            const $reloadButton = this.createReloadButton();
            $reloadButton.addEventListener('click', function() {
                window.location.pathname = '../start page/index.html';
            })
            this.root.appendChild($reloadButton);
        }
    
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            this.root.appendChild(this.playerWins(this.player2.name));
            this.logs.end(this.player2.name, this.player1.name);
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            this.root.appendChild(this.playerWins(this.player1.name));
            this.logs.end(this.player1.name, this.player2.name);
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            this.root.appendChild(this.playerWins());
            this.logs.draw();
        }
    }
}

export default Game;