// --- ЛОГИКА ПЛАНЕТЫ ПОДДЕРЖКИ (РИТМ ГАРМОНИИ) V6 ---

const supportQuotes = [
    "Просто знать, что ты рядом — уже всё. Это самая большая поддержка в мире.",
    "Твоя поддержка — как этот ритм. Ровная, спокойная и бесконечная.",
    "Спасибо за твою тихую, уверенную гармонию, которая делает всё лучше.",
    "Тебе не нужно ничего говорить. Твоё присутствие говорит громче всех слов.",
    "Рядом с тобой я чувствую, что всё возможно. Это и есть настоящая магия.",
    "Когда ты рядом, даже тишина становится уютной и полной смысла."
];
const lineColors = [
    '#ff79c6', '#8be9fd', '#50fa7b', '#f1fa8c', '#bd93f9', '#ffb86c',
    '#ff5555', '#a2d2ff', '#f8f8f2', '#4dffff'
];

let isPulsing = false;
let availableQuotes = []; // Массив для хранения уникальных цитат в текущем цикле

// Функция для сброса и перемешивания доступных цитат
function resetAndShuffleQuotes() {
    availableQuotes = [...supportQuotes]; // Копируем все цитаты
    // Перемешиваем массив (алгоритм Фишера-Йетса)
    for (let i = availableQuotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableQuotes[i], availableQuotes[j]] = [availableQuotes[j], availableQuotes[i]];
    }
}

// Функция для создания фоновых звезд
function createBackgroundStars() {
    const container = document.getElementById('support-bg-stars');
    if (!container) return;
    container.innerHTML = '';
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'bg-star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 20 + 15}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(star);
    }
}

// Функция для обновления цитаты (ИЗМЕНЕНА)
function updateQuoteText() {
    const quoteText = document.querySelector('#planet-support-scene .quote-text');

    // Если доступные цитаты закончились, начинаем новый цикл
    if (availableQuotes.length === 0) {
        resetAndShuffleQuotes();
    }

    // Берём последнюю цитату из перемешанного массива и удаляем её
    const selectedQuote = availableQuotes.pop();

    quoteText.textContent = selectedQuote;
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

        const randomColor = lineColors[Math.floor(Math.random() * lineColors.length)];
        path.style.stroke = randomColor;
        path.style.filter = `drop-shadow(0 0 8px ${randomColor})`;

        const startX = 18; const startY = 50;
        const endX = 82; const endY = 50;
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
    const promptText = document.getElementById('support-prompt-text');
    const supportTitle = document.getElementById('support-title');

    resetSupportPlanet();
    createBackgroundStars();

    const handleTick = () => {
        drawConnectionLines();
        updateQuoteText();
    };

    scene.onclick = () => {
        if (isPulsing) return;
        isPulsing = true;

        promptText.classList.add('hidden');

        // Запускаем анимацию заголовка
        supportTitle.classList.add('animate');

        scene.classList.add('dawn-sky');
        starsContainer.classList.add('pulsing');

        if (pulseSound) {
            const playPromise = pulseSound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.error("Не удалось воспроизвести звук:", error));
            }
            pulseSound.loop = true;
        }

        handleTick();

        starsContainer.addEventListener('animationiteration', handleTick);

        setTimeout(() => {
            quoteContainer.classList.add('visible');
            backBtn.classList.add('visible');
        }, 500);
    };

    backBtn.addEventListener('click', () => {
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
    const promptText = document.getElementById('support-prompt-text');
    const supportTitle = document.getElementById('support-title');
    const bgStarsContainer = document.getElementById('support-bg-stars');

    isPulsing = false;

    // Сбрасываем и перемешиваем цитаты при каждом сбросе сцены
    resetAndShuffleQuotes();

    scene.classList.remove('dawn-sky');
    if (promptText) promptText.classList.remove('hidden');
    if (supportTitle) supportTitle.classList.remove('animate');
    if (bgStarsContainer) bgStarsContainer.innerHTML = '';

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