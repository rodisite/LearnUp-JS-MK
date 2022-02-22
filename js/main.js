import { generateLogs} from './generateLogs.js';
import { createPlayer } from './createElements.js';
import { player1, player2 } from './players.js';
import { enemyAttack, playerAttack } from './attack.js';
import { showResult } from './showResult.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = playerAttack();

    if (attack.hit != enemy.defence ) {
        player2.changeHP(attack.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, attack.value);
    } else if (attack.hit === enemy.defence ){
        generateLogs('defence', player1, player2);
    }

    if (enemy.hit != attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else if (enemy.hit === attack.defence) {
        generateLogs('defence', player2, player1);
    }

    showResult();
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);