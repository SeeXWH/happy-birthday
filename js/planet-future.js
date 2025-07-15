// --- ЛОГИКА ПЛАНЕТЫ БУДУЩЕГО (ЗВЕЗДА-ПУТЕВОДИТЕЛЬ) ---

const futurePredictions = [
    "Ты движешься в правильном направлении, и даже небольшие шаги ведут к большим победам",
    "Не существует неправильного пути – каждая дорога учит чему-то важному и делает тебя сильнее",
    "У тебя есть всё, чтобы добиться успеха – ты умна, трудолюбива и невероятно талантлива!",
    "Каждая трудность – это ступенька к твоему успеху. Ты уже столько преодолела, и я верю, что впереди только больше",
    "Ты заслуживаешь всего самого лучшего, и мир обязательно ответит тебе взаимностью",
    "Каждый чертёж, каждый проект – это кирпичик в фундаменте твоей успешной карьеры",
    "Ты заслуживаешь счастья, и оно уже на пути к тебе",
    "Даже маленькие победы ведут к большим свершениям – ты на верном пути",
    "После черной полосы всегда идет белая. И белых полос всегда больше",
    "Что нас не убивает, делает нас сильнее"
];

let isPredicting = false;

// ДОБАВЛЕНО: Функция для создания звезд на фоне
function createFutureStars(container) {
    if (!container) return;
    const starsCount = 100;
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('future-star');
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        // Звезды только в верхней части (небе)
        star.style.top = `${Math.random() * 60}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

function startFuturePlanetLogic(goBackFunction) {
    const planetFutureScene = document.getElementById('planet-future-scene');
    const starsContainer = document.getElementById('future-stars-container');
    const sphere = document.querySelector('#planet-future-scene .prediction-sphere');
    const textElement = document.getElementById('prediction-text');
    const backBtn = document.getElementById('future-scene-back-btn');
    const predictionSound = document.getElementById('prediction-sound');
    const promptElement = document.getElementById('prediction-prompt');
    let firstPredictionMade = false;

    // Сбрасываем состояние и создаем звезды
    resetFuturePlanet();
    createFutureStars(starsContainer);

    sphere.onclick = () => {
        if (isPredicting) return;

        isPredicting = true;

        // ИЗМЕНЕНО: Скрываем подсказку каждый раз, когда начинается предсказание
        promptElement.classList.add('hidden');
        textElement.classList.remove('visible');

        if (predictionSound) {
            predictionSound.currentTime = 0;
            predictionSound.play().catch(error => console.error("Ошибка воспроизведения звука:", error));
        }

        // ДОБАВЛЕНО: Добавляем класс к сцене для анимации звезд
        planetFutureScene.classList.add('is-predicting');
        sphere.classList.add('is-predicting');

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * futurePredictions.length);
            const randomPrediction = futurePredictions[randomIndex];

            textElement.textContent = randomPrediction;
            textElement.classList.add('visible');

            // ДОБАВЛЕНО: Убираем класс со сцены, чтобы звезды успокоились
            planetFutureScene.classList.remove('is-predicting');
            sphere.classList.remove('is-predicting');

            isPredicting = false;

            // ИЗМЕНЕНО: Показываем подсказку обратно, когда предсказание закончилось
            promptElement.classList.remove('hidden');

            if (!firstPredictionMade) {
                setTimeout(() => {
                    backBtn.classList.add('visible');
                    firstPredictionMade = true;
                }, 500);
            }

        }, 2500);
    };

    backBtn.addEventListener('click', goBackFunction);
}

function resetFuturePlanet() {
    const starsContainer = document.getElementById('future-stars-container');
    const textElement = document.getElementById('prediction-text');
    const backBtn = document.getElementById('future-scene-back-btn');
    const promptElement = document.getElementById('prediction-prompt');

    isPredicting = false;

    if (starsContainer) {
        starsContainer.innerHTML = ''; // Очищаем старые звезды
    }

    textElement.textContent = "";
    textElement.classList.remove('visible');
    backBtn.classList.remove('visible');
    promptElement.classList.remove('hidden');
}