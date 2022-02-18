const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.buttonWrap>.button');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'scorpionchik',
    hp: 100,
    elHP,
    renderHP,
    changeHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['ak-47', 'pm', 'tt'],
    attack
}

const player2 = {
    player: 2,
    name: 'subzerochik',
    hp: 100,
    elHP,
    renderHP,
    changeHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ak-47', 'pm', 'tt'],
    attack
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function attack() {
    console.log(this.name + ' Fight...');
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(player_object) {
    const $player = createElement('div', 'player'+player_object.player)

    // progressbar
    const $progressbar = createElement('div', 'progressbar');
    $player.appendChild($progressbar);

    const $life = createElement('div', 'life');
    $progressbar.appendChild($life);
    $life.style.width = '100%';
    // $life.innerText = player_object['hp'];

    const $name = createElement('div', 'name');
    $progressbar.appendChild($name);
    $name.innerText = player_object['name'];

    // character
    const $character = createElement('div', 'character');
    $player.appendChild($character);

    const $img = createElement('img');
    $character.appendChild($img);
    $img.src = player_object['img'];

    // 
    return $player;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);

    return $reloadWrap;
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');
    if (name) {
        $winsTitle.innerText = name + ' wins!';
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

// $randomButton.addEventListener('click', function() {
//     player1.changeHP(getRandom(20));
//     player2.changeHP(getRandom(20));
//     player1.renderHP();
//     player2.renderHP();

//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;

//         const $reloadButton = createReloadButton();

//         $reloadButton.addEventListener('click', function() {
//             window.location.reload();
//         })
        
//         $arenas.appendChild($reloadButton);
//     }

//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWins(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWins(player1.name));
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWins());
//     }
// })

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        // item.checked = false;
    }

    if (attack.hit != enemy.defence ) {
        player1.changeHP(attack.value);
        player1.renderHP();
    }

    if (enemy.hit != attack.defence) {
        player2.changeHP(enemy.value);
        player2.renderHP();
    }

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
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
})