// --- ЛОГИКА ПЛАНЕТЫ "ТУМАННОСТЬ СЕРДЦА" (v15, БОЛЬШЕ ЗВЕЗД) ---

const romanceCoresData = [
    { pos: [50, 90], quality: 'Искренность', phrase: 'Основа, на которой держится всё.', activated: false },
    { pos: [20, 65], quality: 'Забота', phrase: 'Твоя способность согревать одним лишь присутствием.', activated: false },
    { pos: [20, 40], quality: 'Мечтательность', phrase: 'Умение видеть волшебство в обычных вещах.', activated: false },
    { pos: [50, 50], quality: 'Чувство юмора', phrase: 'Смех, который спасает даже самый плохой день.', activated: false },
    { pos: [80, 40], quality: 'Мудрость', phrase: 'Твои слова, которые всегда находят путь к сердцу.', activated: false },
    { pos: [80, 65], quality: 'Эмпатия', phrase: 'Способность чувствовать мою радость и боль как свои.', activated: false },
    { pos: [50, 90], quality: 'Сила', phrase: 'Твоя внутренняя сила, которая меня восхищает.', activated: false }
];

const svgHeartHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="rgba(255, 110, 199, 0.15)"/></svg>`;

let isSwiping = false, lastPosition = null, totalSwipeDistance = 0, hintTimeout, hintForCoresShown = false;
const MAX_SWIPE_DISTANCE = 5000;
const delay = ms => new Promise(res => setTimeout(res, ms));

function createHeartStars() {
    const container = document.getElementById('romance-hearts-background');
    if (container.childElementCount > 0) return;

    const placedStars = [];
    // ИЗМЕНЕНИЕ ЗДЕСЬ
    const count = 30; // Увеличиваем количество звезд
    const maxTries = 50;

    for (let i = 0; i < count; i++) {
        let currentTry = 0;
        let hasOverlap;
        let newStar;

        do {
            hasOverlap = false;
            const size = Math.random() * 25 + 15;
            const x = Math.random() * (window.innerWidth - size);
            const y = Math.random() * (window.innerHeight - size);

            newStar = { x, y, size };

            for (const placed of placedStars) {
                const distance = Math.sqrt(Math.pow(newStar.x - placed.x, 2) + Math.pow(newStar.y - placed.y, 2));
                const minDistance = (newStar.size / 2) + (placed.size / 2) + 10;
                if (distance < minDistance) {
                    hasOverlap = true;
                    break;
                }
            }
            currentTry++;
        } while (hasOverlap && currentTry < maxTries);

        if (!hasOverlap) {
            placedStars.push(newStar);
            const starEl = document.createElement('div');
            starEl.className = 'heart-star';
            starEl.style.width = `${newStar.size}px`;
            starEl.style.height = `${newStar.size}px`;
            starEl.style.top = `${newStar.y}px`;
            starEl.style.left = `${newStar.x}px`;
            starEl.style.transform = `rotate(${Math.random() * 360}deg)`;
            starEl.style.animationDelay = `${Math.random() * 10}s`;
            starEl.style.animationDuration = `${Math.random() * 6 + 8}s`;
            starEl.innerHTML = svgHeartHTML;
            container.appendChild(starEl);
        }
    }
}


function startRomancePlanetLogic(goBackFunction) {
    const scene = document.getElementById('planet-romance-scene');
    const nebulaContainer = document.getElementById('romance-nebula-container');
    const svgContainer = document.getElementById('romance-svg-container');
    const textContainer = document.getElementById('romance-text-container');
    const qualityText = document.getElementById('romance-quality-text');
    const phraseText = document.getElementById('romance-phrase-text');
    const backBtn = document.getElementById('romance-scene-back-btn');
    const riftSound = document.getElementById('rift-sound');
    const crystalSound = document.getElementById('crystal-sound');
    const promptText = document.getElementById('romance-prompt-text');

    function showHint(text, duration = 4000) { clearTimeout(hintTimeout); promptText.textContent = text; promptText.classList.add('visible'); if (duration > 0) { hintTimeout = setTimeout(() => promptText.classList.remove('visible'), duration); } }

    function updateAppearance() {
        const progress = Math.min(totalSwipeDistance / MAX_SWIPE_DISTANCE, 1);
        nebulaContainer.style.opacity = 1 - (progress * 0.8);
        nebulaContainer.style.filter = `blur(${40 - progress * 30}px) brightness(${1 + progress * 0.5})`;
        document.querySelectorAll('.romance-core-svg').forEach(coreEl => {
            if (!coreEl.classList.contains('activated')) coreEl.style.opacity = progress;
            if (progress > 0.5 && !coreEl.classList.contains('activated')) coreEl.classList.add('visible');
            else coreEl.classList.remove('visible');
        });
        if (progress > 0.5 && !hintForCoresShown) { showHint('Ты видишь огоньки? Коснись их, чтобы раскрыть их тайну.'); hintForCoresShown = true; }
    }

    createHeartStars();

    svgContainer.innerHTML = '';
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    romanceCoresData.slice(0, -1).forEach((coreData, index) => {
        const coreEl = document.createElementNS(svgNS, 'circle');
        coreEl.setAttribute('id', `core-${index}`);
        coreEl.setAttribute('class', 'romance-core-svg');
        coreEl.setAttribute('cx', coreData.pos[0]);
        coreEl.setAttribute('cy', coreData.pos[1]);
        coreEl.addEventListener('click', () => activateCore(index));
        svg.appendChild(coreEl);
    });
    svgContainer.appendChild(svg);

    updateAppearance();
    showHint('Проведи по экрану, чтобы развеять туман');

    const handlePointerDown = e => { isSwiping = true; scene.classList.add('is-swiping'); lastPosition = { x: e.clientX, y: e.clientY }; };
    const handlePointerUp = () => { isSwiping = false; scene.classList.remove('is-swiping'); lastPosition = null; };
    const handlePointerMove = e => {
        if (!isSwiping || !lastPosition) return;
        const currentPosition = { x: e.clientX, y: e.clientY };
        totalSwipeDistance += Math.sqrt(Math.pow(currentPosition.x - lastPosition.x, 2) + Math.pow(currentPosition.y - lastPosition.y, 2));
        lastPosition = currentPosition;
        updateAppearance();
        const particle = document.createElement('div');
        particle.className = 'rift-particle';
        particle.style.left = `${currentPosition.x}px`;
        particle.style.top = `${currentPosition.y}px`;
        scene.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove());
        if (riftSound) { riftSound.currentTime = 0; riftSound.volume = 0.5; riftSound.play().catch(() => { }); }
    };
    scene.addEventListener('pointerdown', handlePointerDown);
    scene.addEventListener('pointerup', handlePointerUp);
    scene.addEventListener('pointerleave', handlePointerUp);
    scene.addEventListener('pointermove', handlePointerMove);

    function activateCore(index) {
        const coreData = romanceCoresData[index];
        const coreEl = document.getElementById(`core-${index}`);
        if (!coreData || coreData.activated || !coreEl.classList.contains('visible')) return;

        if (crystalSound) { crystalSound.currentTime = 0; crystalSound.play(); }
        coreData.activated = true;
        coreEl.classList.remove('visible');
        coreEl.classList.add('activated');

        qualityText.textContent = coreData.quality;
        phraseText.textContent = coreData.phrase;
        textContainer.classList.add('visible');

        const allActivated = romanceCoresData.slice(0, -1).every(c => c.activated);
        if (allActivated) {
            showHint('', 0);
            animateHeartLinesSequentially(svg);
        }
    }

    async function animateHeartLinesSequentially(svgEl) {
        textContainer.classList.remove('visible');

        for (let i = 1; i < romanceCoresData.length; i++) {
            const startPoint = romanceCoresData[i - 1];
            const endPoint = romanceCoresData[i];

            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('class', 'heart-path');
            path.setAttribute('d', `M ${startPoint.pos[0]} ${startPoint.pos[1]} L ${endPoint.pos[0]} ${endPoint.pos[1]}`);
            svgEl.insertBefore(path, svgEl.firstChild);

            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.transition = 'stroke-dashoffset 0.5s ease-out';
            requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });

            await delay(500);
        }

        await delay(500);
        qualityText.textContent = 'Ты состоишь из света';
        phraseText.textContent = 'Спасибо, что освещаешь мой мир. С Днем Рождения!';
        textContainer.classList.add('visible');
        backBtn.classList.add('visible');
    }

    backBtn.addEventListener('click', goBackFunction);
}

function resetRomancePlanet() {
    const scene = document.getElementById('planet-romance-scene');
    const svgContainer = document.getElementById('romance-svg-container');
    const nebulaContainer = document.getElementById('romance-nebula-container');
    const textContainer = document.getElementById('romance-text-container');
    const backBtn = document.getElementById('romance-scene-back-btn');
    const promptText = document.getElementById('romance-prompt-text');
    const heartsContainer = document.getElementById('romance-hearts-background');

    totalSwipeDistance = 0; isSwiping = false; lastPosition = null; hintForCoresShown = false;
    clearTimeout(hintTimeout);
    romanceCoresData.forEach(core => { core.activated = false; });
    nebulaContainer.style.opacity = '';
    nebulaContainer.style.filter = '';
    svgContainer.innerHTML = '';
    heartsContainer.innerHTML = '';
    textContainer.classList.remove('visible');
    backBtn.classList.remove('visible');
    promptText.classList.remove('visible');
    promptText.textContent = '';
    scene.classList.remove('is-swiping');
}