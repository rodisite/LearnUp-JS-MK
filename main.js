<<<<<<< Updated upstream
=======
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'scorpionchik',
    hp: 100,
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

function changeHP(player) {
    $playerLife = document.querySelector('.player' + player.player + ' .life');
    $randomHP = Math.ceil(Math.random() * 20);
    player.hp -= $randomHP;

    if (player.hp <= 0) {
        player.hp = 0;

        if (player.player == 2) {
            $arenas.appendChild(playerWin(player1.name));
        } else {
            $arenas.appendChild(playerWin(player2.name));
        }

        $randomButton.disabled = true;
    }
    
    $playerLife.style.width = player.hp + '%';
    // console.log(player.hp);
}

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' win!';
    return $winTitle;
}

$randomButton.addEventListener('click', function() {
    // console.log('check!');
    changeHP(player1);
    changeHP(player2);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
>>>>>>> Stashed changes
