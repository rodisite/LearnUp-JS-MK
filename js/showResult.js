import { player1, player2 } from "./players.js";
import { createElement } from './createElements.js';
import { createReloadButton } from "./createElements.js";
import { $arenas } from './main.js';
import { generateLogs } from "./generateLogs.js";

const $fightButton = document.querySelector('.buttonWrap>.button');

export function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');
    if (name) {
        $winsTitle.innerText = name + ' wins!';
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

export function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;

        const $reloadButton = createReloadButton();
        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        })
        $arenas.appendChild($reloadButton);
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
}