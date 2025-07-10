document.addEventListener('DOMContentLoaded', () => {
    // --- Получаем все элементы ---
    const lockscreenScene = document.getElementById('lockscreen-scene');
    const chatScene = document.getElementById('chat-scene');
    const universeScene = document.getElementById('universe-scene');

    const unlockSound = document.getElementById('unlock-sound');
    const notificationSound = document.getElementById('notification-sound');
    const magicSound = document.getElementById('magic-sound');
    const clickSound = document.getElementById('click-sound');
    const crystalSound = document.getElementById('crystal-sound');

    const chatContainer = document.getElementById('chat-container');
    const chatReplyContainer = document.getElementById('chat-reply-container');
    const chatReplyBtn = document.getElementById('chat-reply-btn');

    const universeWrapper = document.querySelector('#universe-scene #universe-wrapper');
    const bigBangFlash = document.querySelector('#universe-scene #big-bang-flash');
    const starsContainer = document.querySelector('#universe-scene #stars-container');
    const celestialObjects = document.querySelectorAll('#universe-scene .celestial-object');
    const finalStar = document.getElementById('final-star');

    const transitionOverlay = document.getElementById('transition-overlay');
    const transitionTitle = document.getElementById('transition-title');
    const transitionText = document.getElementById('transition-text');

    // Элементы сцены улыбки
    const planetSmileScene = document.getElementById('planet-smile-scene');
    const birdContainer = document.getElementById('bird-container');
    const glowingHeart = document.querySelector('#planet-smile-scene .glowing-heart');
    const quoteContainerSmile = document.querySelector('#planet-smile-scene .quote-container');
    const quoteTextSmile = document.querySelector('#planet-smile-scene .quote-text');
    const smileSceneBackBtn = document.getElementById('smile-scene-back-btn');

    // Элементы сцены спокойствия
    const planetCalmScene = document.getElementById('planet-calm-scene');
    const calmSceneBackBtn = document.getElementById('calm-scene-back-btn');
    const snowContainer = document.getElementById('snow-container');
    const penguinContainer = document.getElementById('penguin-container');

    // --- СЦЕНАРИИ И ДАННЫЕ ---
    const chatScript = [{ type: 'her', text: 'С Днем Рождения, мое солнышко! ❤️', time: '08:30' }, { type: 'her', text: 'Надеюсь, ты отлично выспалась и готова к самому лучшему дню!', time: '08:31', needs_reply: true }, { type: 'my', text: 'Ааа, привет! Спасибо огромное! 🥰 Только проснулась', time: '08:32' }, { type: 'her', text: 'У меня для тебя есть небольшой подарок. Но чтобы его получить, нужно будет совершить небольшое путешествие... Готова?', time: '08:32', needs_reply: true }, { type: 'my', text: 'Ух ты! Готова, интригуешь)', time: '08:33' }, { type: 'her', text: 'Я прошлой ночью видел удивительный сон о тебе. Хочу тебе его показать.', time: '08:33' }, { type: 'her', text: 'Просто закрой глаза... и нажми на эту ссылку 👇', time: '08:34', link: true }];
    const contentData = { 'object-smile': { title: 'Звезда твоей улыбки', text: 'Твоя улыбка способна осветить самый темный уголок космоса. Она сияет ярче любой звезды.' }, 'object-calm': { title: 'Ледяная планета спокойствия', text: 'Рядом с тобой я нахожу умиротворение. Ты как эта тихая, красивая планета, где нет бурь и тревог.' }, 'object-humor': { title: 'Газовый гигант юмора', text: 'Твои шутки создают вокруг себя мощную гравитацию, которая притягивает хорошее настроение. С тобой всегда весело!' }, 'object-romance': { title: 'Туманность Сердца', text: 'Это самое красивое, что я нашел в твоей вселенной. Облако нежности, тепла и романтики, которое ты создаешь вокруг.' }, 'object-support': { title: 'Двойная звезда поддержки', text: 'Как эти две звезды, вращающиеся вместе, ты всегда рядом, чтобы поддержать. Я чувствую, что мы — команда.' }, 'final-star': { title: 'Сердце Вселенной', text: 'Это был мой сон. Но он - лишь отражение того, какая ты на самом деле. Удивительная, многогранная и бесконечно любимая. С Днем Рождения!' } };
    const smileQuotes = ["Твоя улыбка — это самое яркое событие моего дня.", "Когда ты улыбаешься, я готов забыть обо всём на свете.", "В твоей улыбке больше тепла, чем в тысяче солнц.", "Пожалуйста, улыбайся чаще. Это делает мир лучше.", "Кажется, я влюбился в твою улыбку ещё до того, как влюбился в тебя.", "Улыбка — это твой поцелуй, который виден издалека.", "Даже если день был ужасным, твоя улыбка всё исправит.", "Помню твою улыбку, когда ты пыталась соврать, что не ела последнюю печеньку.", "Эта хитрая улыбка, когда ты придумала очередную шутку...", "Улыбаешься так, будто знаешь главный секрет Вселенной. И, возможно, так и есть.", "Твоя улыбка после фразы 'Ой, я случайно' бесценна.", "В твоей улыбке я вижу не просто радость, а целую историю.", "Спасибо, что делишься со мной своей улыбкой. Это самый дорогой подарок.", "Я понял, что дома, когда впервые увидел твою искреннюю улыбку.", "Каждая твоя улыбка — это маленькая победа над серостью мира."];
    const calmQuotes = ["Рядом с тобой даже самый громкий шторм в моей душе затихает.", "Твоё спокойствие — как тихая гавань, в которую всегда хочется вернуться.", "Ты умеешь находить правильные слова, которые приносят ясность и покой.", "Когда я с тобой, все тревоги мира кажутся такими незначительными.", "Ты мой личный островок безмятежности в этом сумасшедшем мире.", "С тобой я научился дышать глубже и видеть красоту в тишине.", "Твое присутствие — лучше любой медитации."];

    const svgBirdHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.000000 24.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M52 168 c-7 -7 -12 -28 -12 -48 0 -24 -6 -39 -20 -48 -11 -7 -20 -16 -20 -20 0 -11 111 2 137 16 12 7 37 12 57 12 19 0 37 4 40 9 9 13 -36 29 -70 24 -27 -4 -36 0 -59 31 -30 39 -35 42 -53 24z"/><path d="M132 168 c-8 -8 -9 -15 -1 -25 17 -20 29 -15 29 12 0 27 -9 32 -28 13z"/></g></svg>`;
    const svgPenguinHTML = `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve"><g><path d="M243.542,447.214c0,0-60.014-1.512-68.732-0.883c-8.718,0.63-12.238,12.58,1.048,14.536 c13.295,1.966,15.48,12.03,2.507,14.431c-12.981,2.394-11.575,15.951,2.796,12.151c16.004-4.236,18.834,3.765,11.863,8.71 c-9.784,6.927-2.892,20.668,6.857,14.117c9.758-6.552,44.84-29.893,55.724-37.634C264.167,466.545,264.001,447.196,243.542,447.214 z"/><path d="M419.403,398.46c-15.069-7.53-25.425-18.834-42.372-42.385c-15.41-21.402-25.421-59.315-42.376-129.95 c-14.632-60.992-46.841-113.571-46.141-131.83c1.886-48.962-25.473-92.151-67.797-94.16c-59.332-2.83-64.032,39.537-86.64,45.198 c-22.599,5.644-53.671,28.251-53.671,39.546s20.04-9.094,42.376-5.652c10.422,1.608,21.76,6.185,32.007,14.676 c10.422-2.568,18.424-11.645,11.313-24.093c-7.539-13.173,16.476-46.613,42.84-37.196c30.618,10.937,30.609,44.726,9.888,63.569 c-18.772,17.06-35.256,19.944-47.32,17.357c15.846,26.05,17.724,69.632-8.36,139.184 C106.009,405.073,234.16,427.27,267.531,429.428c7.11,0.463,9.653-4.953,6.979-13.033c-6.7-20.258-18.144-59.49-16.126-85.74 c45.198,107.352,136.24,98.267,159.132,87.583C431.641,411.642,439.617,408.568,419.403,398.46z"/><path d="M205.997,63.224c0-4.874-3.95-8.823-8.824-8.823c-4.883,0-8.832,3.948-8.832,8.823s3.948,8.823,8.832,8.823 C202.048,72.046,205.997,68.098,205.997,63.224z"/></g></svg>`;

    // --- ОБЩАЯ ЛОГИКА ---
    function switchScene(hideScene, showScene) { hideScene.style.opacity = '0'; if (hideScene.id === 'universe-scene') { universeWrapper.classList.remove('visible'); } setTimeout(() => { hideScene.classList.remove('visible'); showScene.classList.add('visible'); if (showScene.id === 'chat-scene') startChatScene(); if (showScene.id === 'universe-scene') startUniverseScene(); }, 500); }
    lockscreenScene.addEventListener('click', () => { unlockSound.play(); switchScene(lockscreenScene, chatScene); });

    // --- АКТ II: ЧАТ ---
    let currentMessageIndex = 0;
    function startChatScene() { playNextMessage(); }
    function playNextMessage() { if (currentMessageIndex >= chatScript.length) return; const messageData = chatScript[currentMessageIndex]; appendMessage(messageData); if (messageData.needs_reply) { setTimeout(() => chatReplyContainer.classList.add('visible'), 500); return; } if (messageData.type === 'my' || messageData.link) return; currentMessageIndex++; setTimeout(playNextMessage, 1500); }
    chatReplyBtn.addEventListener('click', () => { chatReplyContainer.classList.remove('visible'); currentMessageIndex++; playNextMessage(); setTimeout(() => { currentMessageIndex++; playNextMessage(); }, 1000); });
    function appendMessage(messageData) { const messageElement = document.createElement('div'); messageElement.classList.add('chat-message', messageData.type === 'my' ? 'my-message' : 'her-message'); const textP = document.createElement('p'); textP.classList.add('message-text'); textP.innerHTML = messageData.text; messageElement.appendChild(textP); if (messageData.link) { const linkBtn = document.createElement('a'); linkBtn.classList.add('chat-link-btn'); linkBtn.textContent = "Погрузиться в сон..."; messageElement.appendChild(linkBtn); linkBtn.addEventListener('click', () => { magicSound.play(); switchScene(chatScene, universeScene); }); } const timeSpan = document.createElement('span'); timeSpan.classList.add('message-time'); timeSpan.textContent = messageData.time; messageElement.appendChild(timeSpan); chatContainer.appendChild(messageElement); chatContainer.scrollTop = chatContainer.scrollHeight; if (messageData.type === 'her') { notificationSound.play(); } }

    // --- АКТ III: ВСЕЛЕННАЯ ---
    function startUniverseScene() { universeWrapper.classList.add('visible'); if (!starsContainer.hasChildNodes()) { createBackgroundElements(); } bigBangFlash.style.display = 'block'; bigBangFlash.classList.add('explode'); setTimeout(() => { celestialObjects.forEach((obj, index) => { if (obj.id !== 'final-star') { setTimeout(() => { obj.classList.add('visible'); }, index * 250 + 500); } }); }, 300); }
    function createBackgroundElements() { const starsCount = 200, cometsCount = 7; for (let i = 0; i < starsCount; i++) { const star = document.createElement('div'); star.classList.add('static-star'); star.style.position = 'absolute'; star.style.width = `${Math.random() * 2 + 0.5}px`; star.style.height = star.style.width; star.style.borderRadius = '50%'; star.style.background = '#fff'; star.style.top = `${Math.random() * 100}%`; star.style.left = `${Math.random() * 100}%`; star.style.animationDelay = `${Math.random() * 4}s`; starsContainer.appendChild(star); } for (let i = 0; i < cometsCount; i++) { const comet = document.createElement('div'); comet.classList.add('comet'); comet.style.top = `${Math.random() * 100}vh`; comet.style.left = `${Math.random() * 100}vw`; comet.style.animationDelay = `${Math.random() * 10}s`; comet.style.animationDuration = `${5 + Math.random() * 5}s`; starsContainer.appendChild(comet); } }
    bigBangFlash.addEventListener('animationend', () => { bigBangFlash.style.display = 'none'; bigBangFlash.classList.remove('explode'); });

    // --- ЛОГИКА ПЕРЕХОДОВ И ПЛАНЕТ ---
    let currentPlanetObject = null;
    const visitedObjects = new Set();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function transitionToPlanet(planetElement) {
        if (!planetElement) return;
        currentPlanetObject = planetElement;
        const planetId = planetElement.id;
        let targetScene;

        if (planetId === 'object-smile') {
            targetScene = planetSmileScene;
        } else if (planetId === 'object-calm') {
            targetScene = planetCalmScene;
        } else {
            alert(`Интерактив для "${contentData[planetId].title}" еще в разработке!`);
            currentPlanetObject = null;
            return;
        }

        universeScene.classList.add('fading-out');
        planetElement.classList.add('zooming');
        await delay(1000);

        transitionTitle.textContent = contentData[planetId].title;
        transitionText.textContent = contentData[planetId].text;
        transitionOverlay.classList.add('visible');
        await delay(2500);

        universeScene.classList.remove('visible');
        targetScene.classList.add('visible');
        transitionOverlay.classList.remove('visible');
        planetElement.classList.remove('zooming');
        universeScene.classList.remove('fading-out');

        if (planetId === 'object-smile') {
            startSmilePlanetLogic();
        } else if (planetId === 'object-calm') {
            startCalmPlanetLogic();
        }
    }

    async function transitionBackFromPlanet() {
        const planetId = currentPlanetObject.id;
        let currentPlanetScene;

        if (planetId === 'object-smile') {
            currentPlanetScene = planetSmileScene;
        } else if (planetId === 'object-calm') {
            currentPlanetScene = planetCalmScene;
        }

        transitionTitle.textContent = "Возвращаемся во вселенную...";
        transitionText.textContent = "";
        transitionOverlay.classList.add('visible');
        await delay(1500);

        currentPlanetScene.classList.remove('visible');
        universeScene.classList.add('visible');

        if (!currentPlanetObject.classList.contains('visited')) {
            currentPlanetObject.classList.add('visited');
            visitedObjects.add(planetId);
            if (visitedObjects.size === celestialObjects.length - 1) {
                setTimeout(() => finalStar.classList.add('visible'), 1500);
            }
        }
        transitionOverlay.classList.remove('visible');

        if (planetId === 'object-smile') {
            resetSmilePlanet();
        } else if (planetId === 'object-calm') {
            resetCalmPlanet();
        }
        currentPlanetObject = null;
    }

    // --- ЛОГИКА ПЛАНЕТЫ УЛЫБКИ ---
    let firstClickOnSmile = true;
    let birdIntervalId = null;
    function spawnBirds() { const flockSize = Math.floor(Math.random() * 4) + 1; const flightPath = `fly-path-${Math.floor(Math.random() * 3) + 1}`; const baseDuration = Math.random() * 5 + 12; const startTop = Math.random() * 30 + 10; for (let i = 0; i < flockSize; i++) { const bird = document.createElement('div'); bird.className = 'bird'; bird.innerHTML = svgBirdHTML; bird.style.top = `${startTop + (Math.random() * 6 - 3)}%`; bird.style.transform = `scale(${Math.random() * 0.4 + 0.8})`; bird.style.animationName = flightPath; bird.style.animationDuration = `${baseDuration + (Math.random() * 2 - 1)}s`; bird.style.animationDelay = `${i * 0.2}s`; birdContainer.appendChild(bird); bird.addEventListener('animationend', () => bird.remove()); } birdIntervalId = setTimeout(spawnBirds, Math.random() * 6000 + 4000); }
    function startSmilePlanetLogic() { firstClickOnSmile = true; spawnBirds(); glowingHeart.onclick = () => { glowingHeart.classList.add('flash'); glowingHeart.onanimationend = () => glowingHeart.classList.remove('flash'); quoteTextSmile.classList.add('fading-out'); setTimeout(() => { const randomIndex = Math.floor(Math.random() * smileQuotes.length); quoteTextSmile.textContent = smileQuotes[randomIndex]; quoteTextSmile.classList.remove('fading-out'); }, 300); if (firstClickOnSmile) { quoteContainerSmile.classList.add('visible'); setTimeout(() => { smileSceneBackBtn.classList.add('visible'); }, 500); firstClickOnSmile = false; } }; }
    function resetSmilePlanet() { quoteContainerSmile.classList.remove('visible'); smileSceneBackBtn.classList.remove('visible'); quoteTextSmile.textContent = ""; firstClickOnSmile = true; clearTimeout(birdIntervalId); birdContainer.innerHTML = ''; }
    smileSceneBackBtn.addEventListener('click', transitionBackFromPlanet);

    // --- ЛОГИКА ПЛАНЕТЫ СПОКОЙСТВИЯ ---
    let firstClickOnCalm = true;
    let snowIntervalId = null;
    let penguinIntervalId = null;

    function createSnowfall() {
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

    function startCalmPlanetLogic() {
        firstClickOnCalm = true;
        createSnowfall();
        spawnPenguins();

        const crystals = document.querySelectorAll('#planet-calm-scene .crystal-interactive');
        const quoteContainerCalm = document.querySelector('#planet-calm-scene .quote-container');
        const quoteTextCalm = document.querySelector('#planet-calm-scene .quote-text');

        crystals.forEach(crystal => {
            crystal.onclick = () => {
                if (crystal.classList.contains('is-glowing')) return;

                if (crystalSound) {
                    crystalSound.currentTime = 0;
                    crystalSound.play();
                }

                crystal.classList.add('is-glowing');
                crystal.classList.add('flash');
                crystal.onanimationend = () => crystal.classList.remove('flash');

                quoteTextCalm.classList.add('fading-out');
                setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * calmQuotes.length);
                    quoteTextCalm.textContent = calmQuotes[randomIndex];
                    quoteTextCalm.classList.remove('fading-out');
                }, 300);

                if (firstClickOnCalm) {
                    quoteContainerCalm.classList.add('visible');
                    setTimeout(() => {
                        calmSceneBackBtn.classList.add('visible');
                    }, 500);
                    firstClickOnCalm = false;
                }
            };
        });
    }

    function resetCalmPlanet() {
        clearInterval(snowIntervalId);
        clearTimeout(penguinIntervalId);
        snowContainer.innerHTML = '';
        penguinContainer.innerHTML = '';

        const quoteContainerCalm = document.querySelector('#planet-calm-scene .quote-container');
        const quoteTextCalm = document.querySelector('#planet-calm-scene .quote-text');
        quoteContainerCalm.classList.remove('visible');
        calmSceneBackBtn.classList.remove('visible');
        quoteTextCalm.textContent = "";
        firstClickOnCalm = true;

        const crystals = document.querySelectorAll('#planet-calm-scene .crystal-interactive');
        crystals.forEach(crystal => crystal.classList.remove('is-glowing'));
    }
    calmSceneBackBtn.addEventListener('click', transitionBackFromPlanet);


    // --- ОБРАБОТЧИКИ КЛИКОВ НА ОБЪЕКТЫ ВСЕЛЕННОЙ ---
    celestialObjects.forEach(obj => { if (obj.id === 'final-star') return; obj.addEventListener('click', () => { if (obj.classList.contains('visited') || currentPlanetObject) return; if (clickSound) { clickSound.currentTime = 0; clickSound.play(); } transitionToPlanet(obj); }); });
    finalStar.addEventListener('click', () => { if (clickSound) { clickSound.currentTime = 0; clickSound.play(); } const finalData = contentData['final-star']; transitionTitle.textContent = finalData.title; transitionText.textContent = finalData.text; transitionOverlay.classList.add('visible'); transitionOverlay.onclick = () => { transitionOverlay.classList.remove('visible'); transitionText.textContent = ""; transitionOverlay.onclick = null; }; });

    // --- ИНИЦИАЛИЗАЦИЯ ---
    lockscreenScene.classList.add('visible');
});