export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export function createPlayer(player_object) {
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

export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);

    return $reloadWrap;
}