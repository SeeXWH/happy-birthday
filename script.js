document.addEventListener('DOMContentLoaded', () => {
    // --- Получаем все элементы ---
    const lockscreenScene = document.getElementById('lockscreen-scene');
    const chatScene = document.getElementById('chat-scene');
    const universeScene = document.getElementById('universe-scene');

    const unlockSound = document.getElementById('unlock-sound');
    const notificationSound = document.getElementById('notification-sound');
    const magicSound = document.getElementById('magic-sound');
    const clickSound = document.getElementById('click-sound');

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
    const quoteContainer = document.querySelector('#planet-smile-scene .quote-container');
    const quoteText = document.querySelector('#planet-smile-scene .quote-text');
    const smileSceneBackBtn = document.getElementById('smile-scene-back-btn');

    // --- СЦЕНАРИИ И ДАННЫЕ ---
    const chatScript = [{ type: 'her', text: 'С Днем Рождения, мое солнышко! ❤️', time: '08:30' }, { type: 'her', text: 'Надеюсь, ты отлично выспалась и готова к самому лучшему дню!', time: '08:31', needs_reply: true }, { type: 'my', text: 'Ааа, привет! Спасибо огромное! 🥰 Только проснулась', time: '08:32' }, { type: 'her', text: 'У меня для тебя есть небольшой подарок. Но чтобы его получить, нужно будет совершить небольшое путешествие... Готова?', time: '08:32', needs_reply: true }, { type: 'my', text: 'Ух ты! Готова, интригуешь)', time: '08:33' }, { type: 'her', text: 'Я прошлой ночью видел удивительный сон о тебе. Хочу тебе его показать.', time: '08:33' }, { type: 'her', text: 'Просто закрой глаза... и нажми на эту ссылку 👇', time: '08:34', link: true }];
    const contentData = { 'object-smile': { title: 'Звезда твоей улыбки', text: 'Твоя улыбка способна осветить самый темный уголок космоса. Она сияет ярче любой звезды.' }, 'object-calm': { title: 'Ледяная планета спокойствия', text: 'Рядом с тобой я нахожу умиротворение. Ты как эта тихая, красивая планета, где нет бурь и тревог.' }, 'object-humor': { title: 'Газовый гигант юмора', text: 'Твои шутки создают вокруг себя мощную гравитацию, которая притягивает хорошее настроение. С тобой всегда весело!' }, 'object-romance': { title: 'Туманность Сердца', text: 'Это самое красивое, что я нашел в твоей вселенной. Облако нежности, тепла и романтики, которое ты создаешь вокруг.' }, 'object-support': { title: 'Двойная звезда поддержки', text: 'Как эти две звезды, вращающиеся вместе, ты всегда рядом, чтобы поддержать. Я чувствую, что мы — команда.' }, 'final-star': { title: 'Сердце Вселенной', text: 'Это был мой сон. Но он - лишь отражение того, какая ты на самом деле. Удивительная, многогранная и бесконечно любимая. С Днем Рождения!' } };
    const smileQuotes = ["Твоя улыбка — это самое яркое событие моего дня.", "Когда ты улыбаешься, я готов забыть обо всём на свете.", "В твоей улыбке больше тепла, чем в тысяче солнц.", "Пожалуйста, улыбайся чаще. Это делает мир лучше.", "Кажется, я влюбился в твою улыбку ещё до того, как влюбился в тебя.", "Улыбка — это твой поцелуй, который виден издалека.", "Даже если день был ужасным, твоя улыбка всё исправит.", "Помню твою улыбку, когда ты пыталась соврать, что не ела последнюю печеньку.", "Эта хитрая улыбка, когда ты придумала очередную шутку...", "Улыбаешься так, будто знаешь главный секрет Вселенной. И, возможно, так и есть.", "Твоя улыбка после фразы 'Ой, я случайно' бесценна.", "В твоей улыбке я вижу не просто радость, а целую историю.", "Спасибо, что делишься со мной своей улыбкой. Это самый дорогой подарок.", "Я понял, что дома, когда впервые увидел твою искреннюю улыбку.", "Каждая твоя улыбка — это маленькая победа над серостью мира."];

    // ИЗМЕНЕНИЕ: Новый SVG код птицы
    const svgBirdHTML = `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24.000000 24.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none">
                <path d="M52 168 c-7 -7 -12 -28 -12 -48 0 -24 -6 -39 -20 -48 -11 -7 -20 -16 -20 -20 0 -11 111 2 137 16 12 7 37 12 57 12 19 0 37 4 40 9 9 13 -36 29 -70 24 -27 -4 -36 0 -59 31 -30 39 -35 42 -53 24z"/>
                <path d="M132 168 c-8 -8 -9 -15 -1 -25 17 -20 29 -15 29 12 0 27 -9 32 -28 13z"/>
            </g>
        </svg>
    `;

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
    async function transitionToPlanet(planetElement) { if (!planetElement) return; currentPlanetObject = planetElement; const planetId = planetElement.id; let targetScene; if (planetId === 'object-smile') { targetScene = planetSmileScene; } else { alert(`Интерактив для "${contentData[planetId].title}" еще в разработке!`); currentPlanetObject = null; return; } universeScene.classList.add('fading-out'); planetElement.classList.add('zooming'); await delay(1000); transitionTitle.textContent = contentData[planetId].title; transitionOverlay.classList.add('visible'); await delay(2000); universeScene.classList.remove('visible'); targetScene.classList.add('visible'); transitionOverlay.classList.remove('visible'); planetElement.classList.remove('zooming'); universeScene.classList.remove('fading-out'); if (planetId === 'object-smile') startSmilePlanetLogic(); }
    async function transitionBackFromPlanet() { const planetId = currentPlanetObject.id; let currentPlanetScene; if (planetId === 'object-smile') currentPlanetScene = planetSmileScene; transitionTitle.textContent = "Возвращаемся во вселенную..."; transitionText.textContent = ""; transitionOverlay.classList.add('visible'); await delay(1500); currentPlanetScene.classList.remove('visible'); universeScene.classList.add('visible'); if (!currentPlanetObject.classList.contains('visited')) { currentPlanetObject.classList.add('visited'); visitedObjects.add(planetId); if (visitedObjects.size === celestialObjects.length - 1) { setTimeout(() => finalStar.classList.add('visible'), 1500); } } transitionOverlay.classList.remove('visible'); if (planetId === 'object-smile') resetSmilePlanet(); currentPlanetObject = null; }

    // --- ЛОГИКА ПЛАНЕТЫ УЛЫБКИ ---
    let firstClickOnHeart = true;
    let birdIntervalId = null;
    function spawnBirds() { const flockSize = Math.floor(Math.random() * 4) + 1; const flightPath = `fly-path-${Math.floor(Math.random() * 3) + 1}`; const baseDuration = Math.random() * 5 + 12; const startTop = Math.random() * 30 + 10; for (let i = 0; i < flockSize; i++) { const bird = document.createElement('div'); bird.className = 'bird'; bird.innerHTML = svgBirdHTML; bird.style.top = `${startTop + (Math.random() * 6 - 3)}%`; bird.style.transform = `scale(${Math.random() * 0.4 + 0.8})`; bird.style.animationName = flightPath; bird.style.animationDuration = `${baseDuration + (Math.random() * 2 - 1)}s`; bird.style.animationDelay = `${i * 0.2}s`; birdContainer.appendChild(bird); bird.addEventListener('animationend', () => bird.remove()); } birdIntervalId = setTimeout(spawnBirds, Math.random() * 6000 + 4000); }
    function startSmilePlanetLogic() { firstClickOnHeart = true; spawnBirds(); glowingHeart.onclick = () => { glowingHeart.classList.add('flash'); glowingHeart.onanimationend = () => glowingHeart.classList.remove('flash'); quoteText.classList.add('fading-out'); setTimeout(() => { const randomIndex = Math.floor(Math.random() * smileQuotes.length); quoteText.textContent = smileQuotes[randomIndex]; quoteText.classList.remove('fading-out'); }, 300); if (firstClickOnHeart) { quoteContainer.classList.add('visible'); setTimeout(() => { smileSceneBackBtn.classList.add('visible'); }, 500); firstClickOnHeart = false; } }; }
    function resetSmilePlanet() { quoteContainer.classList.remove('visible'); smileSceneBackBtn.classList.remove('visible'); quoteText.textContent = ""; firstClickOnHeart = true; clearTimeout(birdIntervalId); birdContainer.innerHTML = ''; }
    smileSceneBackBtn.addEventListener('click', transitionBackFromPlanet);

    // --- ОБРАБОТЧИКИ КЛИКОВ НА ОБЪЕКТЫ ВСЕЛЕННОЙ ---
    celestialObjects.forEach(obj => { if (obj.id === 'final-star') return; obj.addEventListener('click', () => { if (obj.classList.contains('visited') || currentPlanetObject) return; if (clickSound) { clickSound.currentTime = 0; clickSound.play(); } transitionToPlanet(obj); }); });
    finalStar.addEventListener('click', () => { if (clickSound) { clickSound.currentTime = 0; clickSound.play(); } const finalData = contentData['final-star']; transitionTitle.textContent = finalData.title; transitionText.textContent = finalData.text; transitionOverlay.classList.add('visible'); transitionOverlay.onclick = () => { transitionOverlay.classList.remove('visible'); transitionText.textContent = ""; transitionOverlay.onclick = null; }; });

    // --- ИНИЦИАЛИЗАЦИЯ ---
    lockscreenScene.classList.add('visible');
});