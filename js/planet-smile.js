// Данные для планеты улыбки
const smileQuotes = ["Твоя улыбка — это самое яркое событие моего дня.", "Когда ты улыбаешься, я готов забыть обо всём на свете.", "В твоей улыбке больше тепла, чем в тысяче солнц.", "Пожалуйста, улыбайся чаще. Это делает мир лучше.", "Кажется, я влюбился в твою улыбку ещё до того, как влюбился в тебя.", "Улыбка — это твой поцелуй, который виден издалека.", "Даже если день был ужасным, твоя улыбка всё исправит.", "Помню твою улыбку, когда ты пыталась соврать, что не ела последнюю печеньку.", "Эта хитрая улыбка, когда ты придумала очередную шутку...", "Улыбаешься так, будто знаешь главный секрет Вселенной. И, возможно, так и есть.", "Твоя улыбка после фразы 'Ой, я случайно' бесценна.", "В твоей улыбке я вижу не просто радость, а целую историю.", "Спасибо, что делишься со мной своей улыбкой. Это самый дорогой подарок.", "Я понял, что дома, когда впервые увидел твою искреннюю улыбку.", "Каждая твоя улыбка — это маленькая победа над серостью мира."];
const svgBirdHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.000000 24.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M52 168 c-7 -7 -12 -28 -12 -48 0 -24 -6 -39 -20 -48 -11 -7 -20 -16 -20 -20 0 -11 111 2 137 16 12 7 37 12 57 12 19 0 37 4 40 9 9 13 -36 29 -70 24 -27 -4 -36 0 -59 31 -30 39 -35 42 -53 24z"/><path d="M132 168 c-8 -8 -9 -15 -1 -25 17 -20 29 -15 29 12 0 27 -9 32 -28 13z"/></g></svg>`;

// --- ЛОГИКА ПЛАНЕТЫ УЛЫБКИ ---
let firstClickOnSmile = true;
let birdIntervalId = null;

function spawnBirds() {
    const birdContainer = document.getElementById('bird-container');
    const flockSize = Math.floor(Math.random() * 4) + 1;
    const flightPath = `fly-path-${Math.floor(Math.random() * 3) + 1}`;
    const baseDuration = Math.random() * 5 + 12;
    const startTop = Math.random() * 30 + 10;
    for (let i = 0; i < flockSize; i++) {
        const bird = document.createElement('div');
        bird.className = 'bird';
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
    spawnBirds();
    const glowingHeart = document.querySelector('#planet-smile-scene .glowing-heart');
    const quoteContainerSmile = document.querySelector('#planet-smile-scene .quote-container');
    const quoteTextSmile = document.querySelector('#planet-smile-scene .quote-text');
    const smileSceneBackBtn = document.getElementById('smile-scene-back-btn');

    glowingHeart.onclick = () => {
        glowingHeart.classList.add('flash');
        glowingHeart.onanimationend = () => glowingHeart.classList.remove('flash');
        quoteTextSmile.classList.add('fading-out');
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * smileQuotes.length);
            quoteTextSmile.textContent = smileQuotes[randomIndex];
            quoteTextSmile.classList.remove('fading-out');
        }, 300);
        if (firstClickOnSmile) {
            quoteContainerSmile.classList.add('visible');
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

    quoteContainerSmile.classList.remove('visible');
    smileSceneBackBtn.classList.remove('visible');
    quoteTextSmile.textContent = "";
    firstClickOnSmile = true;
    clearTimeout(birdIntervalId);
    birdContainer.innerHTML = '';
}