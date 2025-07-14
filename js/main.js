document.addEventListener('DOMContentLoaded', () => {
    // --- Получаем все элементы ---
    const introScene = document.getElementById('intro-scene');
    const lockscreenScene = document.getElementById('lockscreen-scene');
    const chatScene = document.getElementById('chat-scene');
    const universeScene = document.getElementById('universe-scene');

    // Элементы для реального времени
    const lockscreenTime = document.querySelector('.lockscreen-time');
    const lockscreenDate = document.querySelector('.lockscreen-date');

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

    // Элементы сцен
    const planetSmileScene = document.getElementById('planet-smile-scene');
    const planetCalmScene = document.getElementById('planet-calm-scene');
    const planetFutureScene = document.getElementById('planet-future-scene');

    // --- СЦЕНАРИИ И ДАННЫЕ ---
    const chatScript = [{ type: 'her', text: 'С Днем Рождения, любимая❤️', time: '08:30', needs_reply: true },
    { type: 'my', text: 'Спасибо большое котик❤️❤️❤️', time: '08:32' },
    { type: 'her', text: 'У меня для тебя есть сюрприз)', time: '08:32', needs_reply: true },
    { type: 'my', text: 'Ух ты😏🥺', time: '08:33' },
    { type: 'her', text: 'Я прошлой ночью видел удивительный сон и хочу тебе его показать🙏🙏🙏', time: '08:33' },
    { type: 'her', text: 'Просто доверься и нажми на эту ссылку 👇', time: '08:34', link: true }];

    const contentData = {
        'object-smile': { title: 'Звезда твоей улыбки', text: 'Твоя улыбка способна осветить самый темный уголок космоса. Она сияет ярче любой звезды.' },
        'object-calm': { title: 'Ледяная планета спокойствия', text: 'Рядом с тобой я нахожу умиротворение. Ты как эта тихая, красивая планета, где нет бурь и тревог.' },
        'object-future': { title: 'Звезда-путеводитель', text: 'Это твое будущее. Прекрасное и безмятежное как гладь воды на озере.' },
        'object-romance': { title: 'Туманность Сердца', text: 'Это самое красивое, что я нашел в твоей вселенной. Облако нежности, тепла и романтики, которое ты создаешь вокруг.' },
        'object-support': { title: 'Двойная звезда поддержки', text: 'Как эти две звезды, вращающиеся вместе, ты всегда рядом, чтобы поддержать. Я чувствую, что мы — команда.' },
        'final-star': { title: 'Сердце Вселенной', text: 'Это был мой сон. Но он - лишь отражение того, какая ты на самом деле. Удивительная, многогранная и бесконечно любимая. С Днем Рождения!' }
    };

    // --- ОБНОВЛЕНИЕ ВРЕМЕНИ И ДАТЫ ---
    function updateLockscreenTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        lockscreenTime.textContent = `${hours}:${minutes}`;

        const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        let formattedDate = now.toLocaleDateString('ru-RU', dateOptions);
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        lockscreenDate.textContent = formattedDate;
    }
    updateLockscreenTime();
    setInterval(updateLockscreenTime, 1000);

    // --- ОБЩАЯ ЛОГИКА ---
    function switchScene(hideScene, showScene) {
        hideScene.style.opacity = '0';
        if (hideScene.id === 'universe-scene') {
            universeWrapper.classList.remove('visible');
        }
        setTimeout(() => {
            hideScene.classList.remove('visible');
            showScene.classList.add('visible');
        }, 500);
    }

    introScene.addEventListener('click', () => {
        switchScene(introScene, lockscreenScene);
    });


    lockscreenScene.addEventListener('click', () => {
        // Звук разблокировки убран
        switchScene(lockscreenScene, chatScene);
        startChatScene(); // Запускаем чат после перехода
    });

    // --- АКТ II: ЧАТ ---
    let currentMessageIndex = 0;
    function startChatScene() {
        playNextMessage();
    }

    function playNextMessage() {
        if (currentMessageIndex >= chatScript.length) return;
        const messageData = chatScript[currentMessageIndex];
        appendMessage(messageData);
        if (messageData.needs_reply) {
            setTimeout(() => chatReplyContainer.classList.add('visible'), 500);
            return;
        }
        if (messageData.type === 'my' || messageData.link) return;
        currentMessageIndex++;
        setTimeout(playNextMessage, 1500);
    }

    chatReplyBtn.addEventListener('click', () => {
        chatReplyContainer.classList.remove('visible');
        currentMessageIndex++;
        playNextMessage();
        setTimeout(() => {
            currentMessageIndex++;
            playNextMessage();
        }, 1000);
    });

    function appendMessage(messageData) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', messageData.type === 'my' ? 'my-message' : 'her-message');
        const textP = document.createElement('p');
        textP.classList.add('message-text');
        textP.innerHTML = messageData.text;
        messageElement.appendChild(textP);
        if (messageData.link) {
            const linkBtn = document.createElement('a');
            linkBtn.classList.add('chat-link-btn');
            linkBtn.textContent = "Погрузиться в сон...";
            messageElement.appendChild(linkBtn);
            linkBtn.addEventListener('click', () => {
                magicSound.play();
                switchScene(chatScene, universeScene);
                startUniverseScene(); // Запускаем вселенную после перехода
            });
        }
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('message-time');
        timeSpan.textContent = messageData.time;
        messageElement.appendChild(timeSpan);
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        if (messageData.type === 'her') {
            notificationSound.play();
        }
    }

    // --- АКТ III: ВСЕЛЕННАЯ ---
    function startUniverseScene() {
        universeWrapper.classList.add('visible');
        if (!starsContainer.hasChildNodes()) {
            createBackgroundElements();
        }
        bigBangFlash.style.display = 'block';
        bigBangFlash.classList.add('explode');
        setTimeout(() => {
            celestialObjects.forEach((obj, index) => {
                if (obj.id !== 'final-star') {
                    setTimeout(() => { obj.classList.add('visible'); }, index * 250 + 500);
                }
            });
        }, 300);
    }

    function createBackgroundElements() {
        const starsCount = 200, cometsCount = 7;
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('static-star');
            star.style.position = 'absolute';
            star.style.width = `${Math.random() * 2 + 0.5}px`;
            star.style.height = star.style.width;
            star.style.borderRadius = '50%';
            star.style.background = '#fff';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            starsContainer.appendChild(star);
        }
        for (let i = 0; i < cometsCount; i++) {
            const comet = document.createElement('div');
            comet.classList.add('comet');
            comet.style.top = `${Math.random() * 100}vh`;
            comet.style.left = `${Math.random() * 100}vw`;
            comet.style.animationDelay = `${Math.random() * 10}s`;
            comet.style.animationDuration = `${5 + Math.random() * 5}s`;
            starsContainer.appendChild(comet);
        }
    }

    bigBangFlash.addEventListener('animationend', () => {
        bigBangFlash.style.display = 'none';
        bigBangFlash.classList.remove('explode');
    });

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
        } else if (planetId === 'object-future') {
            targetScene = planetFutureScene;
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
            startSmilePlanetLogic(transitionBackFromPlanet);
        } else if (planetId === 'object-calm') {
            startCalmPlanetLogic(transitionBackFromPlanet);
        } else if (planetId === 'object-future') {
            startFuturePlanetLogic(transitionBackFromPlanet);
        }
    }

    async function transitionBackFromPlanet() {
        const planetId = currentPlanetObject.id;
        let currentPlanetScene;

        if (planetId === 'object-smile') {
            currentPlanetScene = planetSmileScene;
        } else if (planetId === 'object-calm') {
            currentPlanetScene = planetCalmScene;
        } else if (planetId === 'object-future') {
            currentPlanetScene = planetFutureScene;
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
            // Проверяем, все ли планеты (кроме final-star и тех, что без интерактива) посещены
            const totalPlanets = Array.from(celestialObjects).filter(obj => obj.id !== 'final-star' && contentData[obj.id]).length;
            if (visitedObjects.size === totalPlanets) {
                setTimeout(() => finalStar.classList.add('visible'), 1500);
            }
        }
        transitionOverlay.classList.remove('visible');

        if (planetId === 'object-smile') {
            resetSmilePlanet();
        } else if (planetId === 'object-calm') {
            resetCalmPlanet();
        } else if (planetId === 'object-future') {
            resetFuturePlanet();
        }
        currentPlanetObject = null;
    }

    // --- ОБРАБОТЧИКИ КЛИКОВ НА ОБЪЕКТЫ ВСЕЛЕННОЙ ---
    celestialObjects.forEach(obj => {
        if (obj.id === 'final-star') return;
        obj.addEventListener('click', () => {
            if (obj.classList.contains('visited') || currentPlanetObject) return;
            if (clickSound) { clickSound.currentTime = 0; clickSound.play(); }
            transitionToPlanet(obj);
        });
    });

    finalStar.addEventListener('click', () => {
        if (clickSound) { clickSound.currentTime = 0; clickSound.play(); }
        const finalData = contentData['final-star'];
        transitionTitle.textContent = finalData.title;
        transitionText.textContent = finalData.text;
        transitionOverlay.classList.add('visible');
        transitionOverlay.onclick = () => {
            transitionOverlay.classList.remove('visible');
            transitionText.textContent = "";
            transitionOverlay.onclick = null;
        };
    });
});