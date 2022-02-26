import { HIT, ATTACK } from '../constants/index.js';
import Player from './Player.js';
import Logs from './Logs.js';
import { getRandom } from '../utils/index.js';
import { createElement } from '../utils/index.js';

const $fightButton = document.querySelector('.buttonWrap>.button');

class Game {
    constructor ({
        root,
        chat
    }) {
        this.root = root;
        this.form = root.querySelector('.control');

        this.player1 = new Player({
            player: 1,
            name: 'scorpionchik',
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
        });

        this.player2 = new Player({
            player: 2,
            name: 'subzerochik',
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        });

        this.logs = new Logs(
            chat,
        )
    }

    start = () => {
        this.player1.createPlayer();
        this.player2.createPlayer();

        this.logs.start(this.player1.name, this.player2.name);
        this.submitResult();
    }

    submitResult = () => {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const enemy = this.enemyAttack();
            const attack = this.playerAttack();
        
            if (attack.hit != enemy.defence ) {
                this.player2.changeHP(attack.value);
                this.player2.renderHP();
                this.logs.hit(this.player1.name, this.player2.name, attack.value, this.player2.hp);
            } else if (attack.hit === enemy.defence ){
                this.logs.defence(this.player1.name, this.player2.name);
            }
        
            if (enemy.hit != attack.defence) {
                this.player1.changeHP(enemy.value);
                this.player1.renderHP();
                this.logs.hit(this.player2.name, this.player1.name, enemy.value, this.player1.hp);
            } else if (enemy.hit === attack.defence) {
                this.logs.defence(this.player2.name, this.player1.name);
            }
      
            this.showResult();
        })
    }

    enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
        
        return {
            value: getRandom(HIT[hit]),
            hit,
            defence
        }
    }
    
    playerAttack = () => {
        const attack = {};
    
        for (let item of this.form) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
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

    showResult = () => {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            $fightButton.disabled = true;
    
            const $reloadButton = this.createReloadButton();
            $reloadButton.addEventListener('click', function() {
                window.location.reload();
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

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('button', 'button');
        $button.innerText = 'Restart';
        $reloadWrap.appendChild($button);
    
        return $reloadWrap;
    }
}

export default Game;