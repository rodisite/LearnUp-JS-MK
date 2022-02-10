// Task #0
const player1 = {
    name: 'scorpionchik',
    hp: 48,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['ak-47', 'pm', 'tt'],
    attack: function() {
        console.log(player1.name + ' Fight...');
    }
}

const player2 = {
    name: 'subzerochik',
    hp: 21,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ak-47', 'pm', 'tt'],
    attack: function() {
        console.log(player2.name + ' Fight...');
    }
}

// Task #1
// function createPlayer(player_class, player_name, player_hp) {
//     const $player = document.createElement('div');
//     $player.classList.add(player_class);

//     // progressbar
//     const $progressbar = document.createElement('div');
//     $progressbar.classList.add('progressbar');
//     $player.appendChild($progressbar);

//     const $life = document.createElement('div');
//     $life.classList.add('life');
//     $progressbar.appendChild($life);
//     $life.style.width = '100%';
//     $life.innerText = player_hp;

//     const $name = document.createElement('div');
//     $name.classList.add('name');
//     $progressbar.appendChild($name);
//     $name.innerText = player_name;

//     // character
//     const $character = document.createElement('div');
//     $character.classList.add('character');
//     $player.appendChild($character);

//     const $img = document.createElement('img');
//     $character.appendChild($img);
//     $img.src = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif';

//     // 
//     const $arenas = document.getElementsByClassName('arenas')[0];
//     $arenas.appendChild($player);
// }

// Task #3
function createPlayer(player_class, player_object) {
    const $player = document.createElement('div');
    $player.classList.add(player_class);

    // progressbar
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player.appendChild($progressbar);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $progressbar.appendChild($life);
    $life.style.width = '100%';
    $life.innerText = player_object['hp'];

    const $name = document.createElement('div');
    $name.classList.add('name');
    $progressbar.appendChild($name);
    $name.innerText = player_object['name'];

    // character
    const $character = document.createElement('div');
    $character.classList.add('character');
    $player.appendChild($character);

    const $img = document.createElement('img');
    $character.appendChild($img);
    $img.src = player_object['img'];

    // 
    const $arenas = document.getElementsByClassName('arenas')[0];
    $arenas.appendChild($player);
}

// Task #2
createPlayer('player1', player1);
createPlayer('player2', player2);