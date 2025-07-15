// --- ЛОГИКА ПЛАНЕТЫ ПОДДЕРЖКИ (РИТМ ГАРМОНИИ) V3 ---

const supportQuotes = [
    "Просто знать, что ты рядом — уже всё. Это самая большая поддержка в мире.",
    "Твоя поддержка — как этот ритм. Ровная, спокойная и бесконечная.",
    "Спасибо за твою тихую, уверенную гармонию, которая делает всё лучше.",
    "Тебе не нужно ничего говорить. Твоё присутствие говорит громче всех слов.",
    "Рядом с тобой я чувствую, что всё возможно. Это и есть настоящая магия.",
    "Когда ты рядом, даже тишина становится уютной и полной смысла."
];

// ДОБАВЛЕНО: Массив красивых цветов для линий
const lineColors = [
    '#ff79c6', // Розовый
    '#8be9fd', // Голубой
    '#50fa7b', // Зеленый
    '#f1fa8c', // Желтый
    '#bd93f9', // Фиолетовый
    '#ffb86c'  // Оранжевый
];

let currentQuoteIndex = -1;
let isPulsing = false;

// Функция для обновления цитаты
function updateQuoteText() {
    const quoteText = document.querySelector('#planet-support-scene .quote-text');
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * supportQuotes.length);
    } while (newIndex === currentQuoteIndex && supportQuotes.length > 1);
    currentQuoteIndex = newIndex;

    quoteText.textContent = supportQuotes[currentQuoteIndex];
}

// Функция для рисования динамических линий
function drawConnectionLines() {
    const svgContainer = document.getElementById('connection-svg-container');
    if (!svgContainer) return;

    svgContainer.innerHTML = '';

    const lineCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < lineCount; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'dynamic-line');

        // ИЗМЕНЕНО: Логика выбора цвета
        const randomColor = lineColors[Math.floor(Math.random() * lineColors.length)];
        path.style.stroke = randomColor;
        path.style.filter = `drop-shadow(0 0 8px ${randomColor})`;

        // Координаты (без изменений)
        const startX = 18;
        const startY = 50;
        const endX = 82;
        const endY = 50;
        const controlX = 50 + (Math.random() - 0.5) * 30;
        const controlY = 50 + (Math.random() - 0.5) * 60;

        const pathData = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
        path.setAttribute('d', pathData);

        svgContainer.appendChild(path);
    }
}


function startSupportPlanetLogic(goBackFunction) {
    const scene = document.getElementById('planet-support-scene');
    const starsContainer = document.getElementById('support-stars-container');
    const quoteContainer = document.querySelector('#planet-support-scene .quote-container');
    const backBtn = document.getElementById('support-scene-back-btn');
    const pulseSound = document.getElementById('pulse-sound');

    resetSupportPlanet();

    const handleTick = () => {
        drawConnectionLines();
        updateQuoteText();
    };

    scene.onclick = () => {
        if (isPulsing) return;
        isPulsing = true;

        // ДОБАВЛЕНО: При первом клике меняем небо
        scene.classList.add('dawn-sky');

        starsContainer.classList.add('pulsing');

        if (pulseSound) {
            pulseSound.loop = true;
            pulseSound.play();
        }

        handleTick();

        // ИЗМЕНЕНО: Привязываем смену линий и текста к каждому "тику" анимации
        starsContainer.addEventListener('animationiteration', handleTick);

        setTimeout(() => {
            quoteContainer.classList.add('visible');
            backBtn.classList.add('visible');
        }, 500);
    };

    backBtn.addEventListener('click', () => {
        // Убираем обработчик, чтобы он не работал в фоне
        starsContainer.removeEventListener('animationiteration', handleTick);
        goBackFunction();
    });
}

function resetSupportPlanet() {
    const scene = document.getElementById('planet-support-scene');
    const starsContainer = document.getElementById('support-stars-container');
    const svgContainer = document.getElementById('connection-svg-container');
    const quoteContainer = document.querySelector('#planet-support-scene .quote-container');
    const backBtn = document.getElementById('support-scene-back-btn');
    const pulseSound = document.getElementById('pulse-sound');

    isPulsing = false;
    currentQuoteIndex = -1;

    // ДОБАВЛЕНО: Сбрасываем класс неба
    scene.classList.remove('dawn-sky');

    if (starsContainer) starsContainer.classList.remove('pulsing');
    if (svgContainer) svgContainer.innerHTML = '';

    quoteContainer.classList.remove('visible');
    backBtn.classList.remove('visible');

    if (pulseSound) {
        pulseSound.pause();
        pulseSound.currentTime = 0;
        pulseSound.loop = false;
    }
}