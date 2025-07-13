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
let firstPredictionMade = false;

function startFuturePlanetLogic(goBackFunction) {
    const sphere = document.querySelector('#planet-future-scene .prediction-sphere');
    const textElement = document.getElementById('prediction-text');
    const backBtn = document.getElementById('future-scene-back-btn');
    const predictionSound = document.getElementById('prediction-sound');
    const promptElement = document.getElementById('prediction-prompt');

    resetFuturePlanet();

    sphere.onclick = () => {
        if (isPredicting) return;

        isPredicting = true;

        if (!firstPredictionMade) {
            promptElement.classList.add('hidden');
        }

        textElement.classList.remove('visible');

        if (predictionSound) {
            predictionSound.currentTime = 0;
            predictionSound.play().catch(error => console.error("Ошибка воспроизведения звука:", error));
        }

        sphere.classList.add('is-predicting');

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * futurePredictions.length);
            const randomPrediction = futurePredictions[randomIndex];

            textElement.textContent = randomPrediction;
            textElement.classList.add('visible');

            sphere.classList.remove('is-predicting');

            isPredicting = false;

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
    const textElement = document.getElementById('prediction-text');
    const backBtn = document.getElementById('future-scene-back-btn');
    const promptElement = document.getElementById('prediction-prompt');

    isPredicting = false;
    firstPredictionMade = false;

    textElement.textContent = "";
    textElement.classList.remove('visible');
    backBtn.classList.remove('visible');
    promptElement.classList.remove('hidden');
} 