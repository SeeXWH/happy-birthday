// --- ЛОГИКА ПЛАНЕТЫ БУДУЩЕГО (ЗВЕЗДА-ПУТЕВОДИТЕЛЬ) ---

const futurePredictions = [
    "Вижу тихий вечер, большой плед и любимый сериал. Нам больше ничего не нужно.",
    "Впереди — шум аэропорта и билеты в новую страну. Наше лучшее приключение еще не началось.",
    "Предсказываю жаркий спор о том, кто будет выбирать фильм. Победит любовь (и твой выбор).",
    "Вижу нас через несколько лет: мы так же смеёмся, так же держимся за руки, и наша вселенная стала только больше.",
    "Звёзды шепчут о незапланированной поездке за город, которая станет одним из лучших воспоминаний.",
    "Грядет день, полный лени и вкусной еды. И это будет прекрасно.",
    "Я вижу момент, когда ты посмотришь на меня с той самой улыбкой, и я снова влюблюсь, как в первый раз.",
    "Предсказание гласит: в будущем будет много пиццы. Очень много пиццы.",
    "Скоро ты откроешь для себя новую мечту, и я буду рядом, чтобы помочь её исполнить.",
    "Вижу, как мы вместе преодолеваем небольшую трудность и становимся еще ближе друг к другу."
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