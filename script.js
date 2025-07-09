document.addEventListener('DOMContentLoaded', () => {
    // --- Получаем все элементы ---
    const lockscreenScene = document.getElementById('lockscreen-scene');
    const chatScene = document.getElementById('chat-scene');
    const universeScene = document.getElementById('universe-scene');

    // Звуковые эффекты
    const unlockSound = document.getElementById('unlock-sound');
    const notificationSound = document.getElementById('notification-sound');
    const magicSound = document.getElementById('magic-sound');
    const clickSound = document.getElementById('click-sound'); // Универсальный звук клика

    // Элементы чата
    const chatContainer = document.getElementById('chat-container');
    const chatReplyContainer = document.getElementById('chat-reply-container');
    const chatReplyBtn = document.getElementById('chat-reply-btn');

    // Элементы вселенной
    const universeWrapper = document.querySelector('#universe-scene #universe-wrapper');
    const bigBangFlash = document.querySelector('#universe-scene #big-bang-flash');
    const starsContainer = document.querySelector('#universe-scene #stars-container');
    const celestialObjects = document.querySelectorAll('#universe-scene .celestial-object');
    const finalStar = document.getElementById('final-star');
    const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    // --- СЦЕНАРИИ И ДАННЫЕ ---
    const chatScript = [
        { type: 'her', text: 'С Днем Рождения, мое солнышко! ❤️', time: '08:30' },
        { type: 'her', text: 'Надеюсь, ты отлично выспалась и готова к самому лучшему дню!', time: '08:31', needs_reply: true },
        { type: 'my', text: 'Ааа, привет! Спасибо огромное! 🥰 Только проснулась', time: '08:32' },
        { type: 'her', text: 'У меня для тебя есть небольшой подарок. Но чтобы его получить, нужно будет совершить небольшое путешествие... Готова?', time: '08:32', needs_reply: true },
        { type: 'my', text: 'Ух ты! Готова, интригуешь)', time: '08:33' },
        { type: 'her', text: 'Я прошлой ночью видел удивительный сон о тебе. Хочу тебе его показать.', time: '08:33' },
        { type: 'her', text: 'Просто закрой глаза... и нажми на эту ссылку 👇', time: '08:34', link: true }
    ];
    const contentData = {
        'object-smile': { title: 'Звезда твоей улыбки', text: 'Твоя улыбка способна осветить самый темный уголок космоса. Она сияет ярче любой звезды.', image: 'img/her-photo-1.jpg' },
        'object-calm': { title: 'Ледяная планета спокойствия', text: 'Рядом с тобой я нахожу умиротворение. Ты как эта тихая, красивая планета, где нет бурь и тревог.', image: 'img/her-photo-2.jpg' },
        'object-humor': { title: 'Газовый гигант юмора', text: 'Твои шутки создают вокруг себя мощную гравитацию, которая притягивает хорошее настроение. С тобой всегда весело!', image: 'img/her-photo-3.jpg' },
        'object-romance': { title: 'Туманность Сердца', text: 'Это самое красивое, что я нашел в твоей вселенной. Облако нежности, тепла и романтики, которое ты создаешь вокруг.', image: 'img/her-photo-4.jpg' },
        'object-support': { title: 'Двойная звезда поддержки', text: 'Как эти две звезды, вращающиеся вместе, ты всегда рядом, чтобы поддержать. Я чувствую, что мы — команда.', image: 'img/her-photo-5.jpg' },
        'final-star': { title: 'Сердце Вселенной', text: 'Это был мой сон. Но он - лишь отражение того, какая ты на самом деле. Удивительная.', image: 'img/our-photo.jpg' }
    };

    const smileQuotes = [
        "Помню, как ты улыбнулась в тот день на лавочке... Кажется, тогда я и влюбился.",
        "Твоя улыбка способна разогнать любые тучи.",
        "Когда ты улыбаешься, весь мир становится теплее.",
        "Ради этой улыбки я готов на всё."
    ];

    // --- ОБЩАЯ ЛОГИКА ---
    function switchScene(hideScene, showScene) {
        hideScene.style.opacity = '0';
        if (hideScene.id === 'universe-scene') {
            universeWrapper.classList.remove('visible');
        }

        setTimeout(() => {
            hideScene.classList.remove('visible');
            showScene.classList.add('visible');

            if (showScene.id === 'chat-scene') startChatScene();
            if (showScene.id === 'universe-scene') startUniverseScene();
            // if (showScene.id === 'sketch-scene') startSketchScene(); // Задел на будущее
        }, 500);
    }

    // --- АКТ I: ЭКРАН БЛОКИРОВКИ ---
    lockscreenScene.addEventListener('click', () => {
        unlockSound.play();
        switchScene(lockscreenScene, chatScene);
    });

    // --- АКТ II: ЧАТ ---
    let currentMessageIndex = 0;
    function startChatScene() { playNextMessage(); }

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
        createBackgroundElements();
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
        starsContainer.innerHTML = '';
        const starsCount = 200;
        const cometsCount = 7;
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('static-star'); star.style.position = 'absolute';
            star.style.width = `${Math.random() * 2 + 0.5}px`; star.style.height = star.style.width;
            star.style.borderRadius = '50%'; star.style.background = '#fff';
            star.style.top = `${Math.random() * 100}%`; star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            starsContainer.appendChild(star);
        }
        for (let i = 0; i < cometsCount; i++) {
            const comet = document.createElement('div');
            comet.classList.add('comet');
            comet.style.top = `${Math.random() * 100}vh`; comet.style.left = `${Math.random() * 100}vw`;
            comet.style.animationDelay = `${Math.random() * 10}s`;
            comet.style.animationDuration = `${5 + Math.random() * 5}s`;
            starsContainer.appendChild(comet);
        }
    }
    bigBangFlash.addEventListener('animationend', () => { bigBangFlash.style.display = 'none'; });
    const openModal = (id) => {
        const data = contentData[id];
        if (data) {
            modalImage.src = data.image; modalTitle.textContent = data.title;
            modalText.textContent = data.text; modalContainer.style.display = 'flex';
        }
    };
    const closeModal = () => {
        modalContainer.style.display = 'none';
        if (modalTitle.textContent === contentData['final-star'].title) {
            alert("Здесь будет переход к финальной сцене!");
            // switchScene(universeScene, sketchScene);
        }
    };
    modalCloseBtn.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => { if (e.target === modalContainer) closeModal(); });

    const visitedObjects = new Set();
    celestialObjects.forEach(obj => {
        if (obj.id === 'final-star') return;
        obj.addEventListener('click', () => {
            if (obj.classList.contains('visited')) return;

            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }

            obj.classList.add('visited');
            visitedObjects.add(obj.id);
            openModal(obj.id);
            if (visitedObjects.size === celestialObjects.length - 1) {
                setTimeout(() => {
                    finalStar.classList.add('visible');
                    if (clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.play();
                    }
                }, 1500);
            }
        });
    });

    finalStar.addEventListener('click', () => {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        openModal('final-star');
    });

    // --- Инициализация ---
    lockscreenScene.classList.add('visible');
});