async function loadGameData() {
    const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
    const data = await response.json();
    return data;
}

const updateGameTitle = (titleElement, gameTitle) => {
    titleElement.textContent = gameTitle;
}

const updateGameImage = (gameImageElement, game) => {
    gameImageElement.src = game.image;
    gameImageElement.alt = game.id;
}

const updateGameDescription = (gameDescriptionElement, description) => {
    gameDescriptionElement.textContent = description;
}

const updateGamePrice = (singlePriceElement, price) => {
    singlePriceElement.textContent = `$${price.toFixed(2)}`;
}

const updateGameGenre = (genreElement, gameGenre) => {
    genreElement.textContent = gameGenre;
}

if (document.title === "Playbox Games") {
    const allPriceElements = document.querySelectorAll('.gamePrice');
    const imageElements = document.querySelectorAll('.gameImage');

    loadGameData().then(data => {
        allPriceElements.forEach((singlePriceElement) => {
            const gameId = singlePriceElement.getAttribute('data-game-id');
            const game = data.find(game => game.id === gameId);
            updateGamePrice(singlePriceElement, game.price);
        });

        imageElements.forEach((gameImageElement) => {
            const gameId = gameImageElement.getAttribute('data-game-id');
            const game = data.find(game => game.id === gameId);
            updateGameImage(gameImageElement, game);
        });
    }).catch((error) => {
        console.log(error);
    });

} else if (document.title === "Product Page") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const titleElement = document.querySelector('.gameName');
    const gameImageElement = document.querySelector('.gameImage');
    const gameDescriptionElement = document.querySelector('.gameDescription');
    const singlePriceElement = document.querySelector('.gamePrice');
    const genreElement = document.querySelector('.gameGenre');

    loadGameData().then(data => {
        const game = data.find(game => game.id === id);
        updateGameTitle(titleElement, game.title);
        updateGameImage(gameImageElement, game);
        updateGameDescription(gameDescriptionElement, game.description);
        updateGamePrice(singlePriceElement, game.price);
        updateGameGenre(genreElement, game.genre);
    }).catch((error) => {
        console.log(error);
    });
}