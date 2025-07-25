// Данные для планеты спокойствия
const calmQuotes = [
    "Рядом с тобой даже самая яростная буря в душе затихает",
    "Ты как лес после ливня. Всегда хочется вернуться в твои объятия",
    "Ты умеешь находить правильные слова, которые приносят покой и умиротворение",
    "Когда я с тобой, все тревоги мира кажутся незначительными",
    "Ты островок безмятежности в этом сложном и жестоком мире",
    "Твое присутствие — лучше любой медитации",
    "Обожаю твой вайб"
];
const svgPenguinHTML = `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve"><g><path d="M243.542,447.214c0,0-60.014-1.512-68.732-0.883c-8.718,0.63-12.238,12.58,1.048,14.536 c13.295,1.966,15.48,12.03,2.507,14.431c-12.981,2.394-11.575,15.951,2.796,12.151c16.004-4.236,18.834,3.765,11.863,8.71 c-9.784,6.927-2.892,20.668,6.857,14.117c9.758-6.552,44.84-29.893,55.724-37.634C264.167,466.545,264.001,447.196,243.542,447.214 z"/><path d="M419.403,398.46c-15.069-7.53-25.425-18.834-42.372-42.385c-15.41-21.402-25.421-59.315-42.376-129.95 c-14.632-60.992-46.841-113.571-46.141-131.83c1.886-48.962-25.473-92.151-67.797-94.16c-59.332-2.83-64.032,39.537-86.64,45.198 c-22.599,5.644-53.671,28.251-53.671,39.546s20.04-9.094,42.376-5.652c10.422,1.608,21.76,6.185,32.007,14.676 c10.422-2.568,18.424-11.645,11.313-24.093c-7.539-13.173,16.476-46.613,42.84-37.196c30.618,10.937,30.609,44.726,9.888,63.569 c-18.772,17.06-35.256,19.944-47.32,17.357c15.846,26.05,17.724,69.632-8.36,139.184 C106.009,405.073,234.16,427.27,267.531,429.428c7.11,0.463,9.653-4.953,6.979-13.033c-6.7-20.258-18.144-59.49-16.126-85.74 c45.198,107.352,136.24,98.267,159.132,87.583C431.641,411.642,439.617,408.568,419.403,398.46z"/><path d="M205.997,63.224c0-4.874-3.95-8.823-8.824-8.823c-4.883,0-8.832,3.948-8.832,8.823s3.948,8.823,8.832,8.823 C202.048,72.046,205.997,68.098,205.997,63.224z"/></g></svg>`;

// --- ЛОГИКА ПЛАНЕТЫ СПОКОЙСТВИЯ ---
let firstClickOnCalm = true;
let snowIntervalId = null;
let penguinIntervalId = null;

function createSnowfall() {
    const snowContainer = document.getElementById('snow-container');
    snowIntervalId = setInterval(() => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        const size = Math.random() * 4 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        const duration = Math.random() * 5 + 8;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowContainer.appendChild(snowflake);
        setTimeout(() => { snowflake.remove(); }, (duration + 5) * 1000);
    }, 200);
}

function spawnPenguins() {
    const penguinContainer = document.getElementById('penguin-container');
    const penguin = document.createElement('div');
    penguin.className = 'penguin';
    penguin.innerHTML = svgPenguinHTML;

    const direction = Math.random() > 0.5 ? 'walk-path-1' : 'walk-path-2';

    if (direction === 'walk-path-1') {
        penguin.classList.add('flipped');
    }

    penguin.style.animationName = `waddle, ${direction}`;

    const duration = Math.random() * 10 + 15;
    const waddleSpeed = Math.random() * 0.4 + 0.8;
    penguin.style.animationDuration = `${waddleSpeed}s, ${duration}s`;
    penguin.style.animationTimingFunction = 'ease-in-out, linear';
    penguin.style.animationIterationCount = 'infinite, 1';

    const path = Math.random();
    if (path < 0.5) {
        penguin.style.bottom = '26vh';
    } else {
        penguin.style.bottom = '18vh';
    }

    penguinContainer.appendChild(penguin);

    penguin.addEventListener('animationend', () => penguin.remove());

    penguinIntervalId = setTimeout(spawnPenguins, Math.random() * 8000 + 6000);
}

function startCalmPlanetLogic(goBackFunction) {
    firstClickOnCalm = true;
    // --- ИЗМЕНЕНИЕ 1: Создаем копию массива с цитатами, которую можно изменять ---
    let availableQuotes = [...calmQuotes];

    createSnowfall();
    spawnPenguins();

    const crystals = document.querySelectorAll('#planet-calm-scene .crystal-interactive');
    const quoteContainerCalm = document.querySelector('#planet-calm-scene .quote-container');
    const quoteTextCalm = document.querySelector('#planet-calm-scene .quote-text');
    const calmSceneBackBtn = document.getElementById('calm-scene-back-btn');
    const calmPrompt = document.getElementById('calm-prompt');

    crystals.forEach(crystal => {
        crystal.onclick = () => {
            if (crystal.classList.contains('is-glowing')) return;

            const crystalSound = document.getElementById('crystal-sound');
            if (crystalSound) {
                crystalSound.currentTime = 0;
                crystalSound.play();
            }

            crystal.classList.add('is-glowing');
            crystal.classList.add('flash');
            crystal.onanimationend = () => crystal.classList.remove('flash');

            quoteTextCalm.classList.add('fading-out');
            setTimeout(() => {
                // --- ИЗМЕНЕНИЕ 2: Новая логика выбора уникальной цитаты ---

                // Если все цитаты были показаны, заполняем массив снова, чтобы можно было начать сначала.
                if (availableQuotes.length === 0) {
                    availableQuotes = [...calmQuotes];
                }

                // Выбираем случайный индекс из ОСТАВШИХСЯ цитат
                const randomIndex = Math.floor(Math.random() * availableQuotes.length);

                // Используем splice, чтобы получить цитату и СРАЗУ ЖЕ удалить ее из временного массива.
                const chosenQuote = availableQuotes.splice(randomIndex, 1)[0];

                // Отображаем выбранную уникальную цитату
                quoteTextCalm.textContent = chosenQuote;

                // --- КОНЕЦ ИЗМЕНЕНИЙ ---

                quoteTextCalm.classList.remove('fading-out');
            }, 300);

            if (firstClickOnCalm) {
                calmPrompt.classList.add('hidden');
                quoteContainerCalm.classList.add('visible');
                firstClickOnCalm = false;
            }

            const activatedCrystals = document.querySelectorAll('#planet-calm-scene .crystal-interactive.is-glowing');
            if (activatedCrystals.length === crystals.length) {
                setTimeout(() => {
                    calmSceneBackBtn.classList.add('visible');
                }, 500);
            }
        };
    });
    calmSceneBackBtn.addEventListener('click', goBackFunction);
}

function resetCalmPlanet() {
    const snowContainer = document.getElementById('snow-container');
    const penguinContainer = document.getElementById('penguin-container');
    const quoteContainerCalm = document.querySelector('#planet-calm-scene .quote-container');
    const calmSceneBackBtn = document.getElementById('calm-scene-back-btn');
    const quoteTextCalm = document.querySelector('#planet-calm-scene .quote-text');
    const calmPrompt = document.getElementById('calm-prompt');

    clearInterval(snowIntervalId);
    clearTimeout(penguinIntervalId);
    snowContainer.innerHTML = '';
    penguinContainer.innerHTML = '';

    quoteContainerCalm.classList.remove('visible');
    calmSceneBackBtn.classList.remove('visible');
    quoteTextCalm.textContent = "";
    calmPrompt.classList.remove('hidden');
    firstClickOnCalm = true;

    const crystals = document.querySelectorAll('#planet-calm-scene .crystal-interactive');
    crystals.forEach(crystal => crystal.classList.remove('is-glowing'));
}