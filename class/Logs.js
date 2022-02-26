import { LOGS } from '../constants/index.js';
import { getTime } from '../utils/index.js';
import { getRandom } from '../utils/index.js';

class Logs {
    constructor(
        chat
    ) {
        this.root = chat;
    }

    start = (player1Name, player2Name) => {
        this.generateLogs('start', player1Name, player2Name);
    }

    hit = (player1Name, player2Name, attack, hp) => {
        this.generateLogs('hit', player1Name, player2Name, attack, hp);
    }

    defence = (player1Name, player2Name) => {
        this.generateLogs('defence', player1Name, player2Name);
    }

    end = (player1Name, player2Name) => {
        this.generateLogs('end', player1Name, player2Name);
    }

    draw = () => {
        this.generateLogs('draw');
    }

    generateLogs = (type, player1, player2, damage, hp) => {
        let text;
        let el;
    
        const currentTime = getTime();
        switch (type) {
            case 'start':
                text = LOGS[type].replace('[time]', currentTime).replace('[player1]', player1).replace('[player2]', player2);
                el = `<p>${text}</p>`;
                break;
            case 'hit':
                text = LOGS[type][getRandom(type.length) - 1].replace('[playerKick]', player1).replace('[playerDefence]', player2);
                el = `<p>${currentTime} ${text} -${damage} ${hp}/100</p>`
                break;
            case 'defence':
                text = LOGS[type][getRandom(type.length) - 1].replace('[playerKick]', player1).replace('[playerDefence]', player2);
                el = `<p>${currentTime} ${text}</p>`;
                break;
            case 'end':
                text = LOGS[type][getRandom(type.length) - 1].replace('[playerWins]', player1).replace('[playerLose]', player2);
                el = `<p>${currentTime} ${text}</p>`;
                break;
            case 'draw':
                text = LOGS[type];
                el = `<p>${currentTime} ${text}</p>`;
                break;
        }
        
        this.root.insertAdjacentHTML('afterbegin', el);
    }
}

export default Logs;