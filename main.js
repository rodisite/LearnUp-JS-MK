const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'scorpionchik',
    hp: 100,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['ak-47', 'pm', 'tt'],
    attack: function() {
        console.log(player1.name + ' Fight...');
    }
}

const player2 = {
    player: 2,
    name: 'subzerochik',
    hp: 100,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ak-47', 'pm', 'tt'],
    attack: function() {
        console.log(player2.name + ' Fight...');
    }
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
// $arenas.appendChild(createReloadButton());
// const $reloadButton = document.querySelector('.reloadWrap>.button');

function random(a) {
    return Math.ceil(Math.random() * a);
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function changeHP(n) {
    this.hp -= n;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');
    if (name) {
        $winsTitle.innerText = name + ' wins!';
    } else {
        $winsTitle.innerText = 'draw';
    }

    $arenas.appendChild(createReloadButton());
    const $reloadButton = document.querySelector('.reloadWrap>.button');
    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    })

    return $winsTitle;
}

$randomButton.addEventListener('click', function() {
    player1.changeHP(random(20));
    player2.changeHP(random(20));
    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
})

// $reloadButton.addEventListener('click', function() {
//     window.location.reload();
// })



$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));