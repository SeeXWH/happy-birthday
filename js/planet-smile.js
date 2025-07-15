const smileQuotes = [
    "Твоя улыбка светиться радостью и искренностью",
    "Когда ты улыбаешься, мир замирает",
    "В твоей улыбке больше тепла, чем в тысяче солнц",
    "Пожалуйста, улыбайся и смейся чаще",
    "Даже если день был ужасным, твоя улыбка всё исправит",
    "Даже в самый хмурый день твоя улыбка прогоняет тучи",
    "Твой смех способен растопить лед в сердцах людей",
    "Спасибо, что делишься со мной своей улыбкой",
    "Твоя улыбка — как тёплое объятие для души",
    "Каждая твоя улыбка — это маленькая победа над серостью мира",
    "Люблю тебя❤️"
];
const svgBirdHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.000000 24.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M52 168 c-7 -7 -12 -28 -12 -48 0 -24 -6 -39 -20 -48 -11 -7 -20 -16 -20 -20 0 -11 111 2 137 16 12 7 37 12 57 12 19 0 37 4 40 9 9 13 -36 29 -70 24 -27 -4 -36 0 -59 31 -30 39 -35 42 -53 24z"/><path d="M132 168 c-8 -8 -9 -15 -1 -25 17 -20 29 -15 29 12 0 27 -9 32 -28 13z"/></g></svg>`;

// --- ЛОГИКА ПЛАНЕТЫ УЛЫБКИ ---
let firstClickOnSmile = true;
let birdIntervalId = null;
// Переменная для хранения индекса последней показанной цитаты
let lastSmileQuoteIndex = -1;

function spawnBirds() {
    // Предполагается, что в вашем HTML есть элемент с id="bird-container"
    const birdContainer = document.getElementById('bird-container');
    if (!birdContainer) return; // Защита от отсутствия элемента

    const flockSize = Math.floor(Math.random() * 4) + 1;
    // Предполагается, что в вашем CSS есть анимации с именами fly-path-1, fly-path-2, fly-path-3
    const flightPath = `fly-path-${Math.floor(Math.random() * 3) + 1}`;
    const baseDuration = Math.random() * 5 + 12;
    const startTop = Math.random() * 30 + 10;

    for (let i = 0; i < flockSize; i++) {
        const bird = document.createElement('div');
        bird.className = 'bird'; // Предполагается, что в CSS есть стили для класса .bird
        bird.innerHTML = svgBirdHTML;
        bird.style.top = `${startTop + (Math.random() * 6 - 3)}%`;
        bird.style.transform = `scale(${Math.random() * 0.4 + 0.8})`;
        bird.style.animationName = flightPath;
        bird.style.animationDuration = `${baseDuration + (Math.random() * 2 - 1)}s`;
        bird.style.animationDelay = `${i * 0.2}s`;
        birdContainer.appendChild(bird);
        bird.addEventListener('animationend', () => bird.remove());
    }
    birdIntervalId = setTimeout(spawnBirds, Math.random() * 6000 + 4000);
}

function startSmilePlanetLogic(goBackFunction) {
    firstClickOnSmile = true;
    // Сбрасываем индекс, чтобы при новом запуске не было повтора с самого последнего раза
    lastSmileQuoteIndex = -1;
    spawnBirds();

    // Предполагается, что эти элементы существуют в вашем HTML внутри сцены #planet-smile-scene
    const glowingHeart = document.querySelector('#planet-smile-scene .glowing-heart');
    const quoteContainerSmile = document.querySelector('#planet-smile-scene .quote-container');
    const quoteTextSmile = document.querySelector('#planet-smile-scene .quote-text');
    const smileSceneBackBtn = document.getElementById('smile-scene-back-btn');
    const smilePrompt = document.getElementById('smile-prompt');

    // Проверка на наличие элементов, чтобы избежать ошибок
    if (!glowingHeart || !quoteContainerSmile || !quoteTextSmile || !smileSceneBackBtn || !smilePrompt) {
        console.error("Один или несколько элементов для сцены 'Планета Улыбки' не найдены!");
        return;
    }

    glowingHeart.onclick = () => {
        glowingHeart.classList.add('flash'); // Предполагается наличие CSS класса .flash
        glowingHeart.onanimationend = () => glowingHeart.classList.remove('flash');

        quoteTextSmile.classList.add('fading-out'); // Предполагается наличие CSS класса .fading-out

        setTimeout(() => {
            let randomIndex;
            // Цикл гарантирует, что новый индекс не будет совпадать с предыдущим.
            // Проверка (smileQuotes.length > 1) предотвращает бесконечный цикл, если в массиве всего одна фраза.
            do {
                randomIndex = Math.floor(Math.random() * smileQuotes.length);
            } while (smileQuotes.length > 1 && randomIndex === lastSmileQuoteIndex);

            // Обновляем индекс последней показанной цитаты
            lastSmileQuoteIndex = randomIndex;
            quoteTextSmile.textContent = smileQuotes[randomIndex];
            quoteTextSmile.classList.remove('fading-out');
        }, 300);

        if (firstClickOnSmile) {
            smilePrompt.classList.add('hidden'); // Предполагается наличие CSS класса .hidden
            quoteContainerSmile.classList.add('visible'); // Предполагается наличие CSS класса .visible
            setTimeout(() => {
                smileSceneBackBtn.classList.add('visible');
            }, 500);
            firstClickOnSmile = false;
        }
    };
    smileSceneBackBtn.addEventListener('click', goBackFunction);
}

function resetSmilePlanet() {
    const quoteContainerSmile = document.querySelector('#planet-smile-scene .quote-container');
    const smileSceneBackBtn = document.getElementById('smile-scene-back-btn');
    const quoteTextSmile = document.querySelector('#planet-smile-scene .quote-text');
    const birdContainer = document.getElementById('bird-container');
    const smilePrompt = document.getElementById('smile-prompt');

    if (!quoteContainerSmile || !smileSceneBackBtn || !quoteTextSmile || !birdContainer || !smilePrompt) {
        return; // Если элементы не найдены, ничего не делать
    }

    quoteContainerSmile.classList.remove('visible');
    smileSceneBackBtn.classList.remove('visible');
    quoteTextSmile.textContent = "";
    firstClickOnSmile = true;

    // Останавливаем создание новых птиц
    clearTimeout(birdIntervalId);
    // Удаляем всех существующих птиц
    birdContainer.innerHTML = '';

    // Сбрасываем индекс последней цитаты при сбросе сцены
    lastSmileQuoteIndex = -1;

    // Показываем подсказку снова при сбросе сцены
    smilePrompt.classList.remove('hidden');
}