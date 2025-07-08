document.addEventListener('DOMContentLoaded', () => {
    // --- Получаем все нужные элементы со страницы ---
    const universeWrapper = document.getElementById('universe-wrapper');
    const bigBangFlash = document.getElementById('big-bang-flash');
    const introScreen = document.getElementById('intro-screen');
    const universeMap = document.getElementById('universe-map');
    const finalStar = document.getElementById('final-star');
    const starsContainer = document.getElementById('stars-container');
    const startBtn = document.getElementById('start-journey-btn');
    const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const celestialObjects = document.querySelectorAll('.celestial-object');

    // --- Данные для модальных окон ---
    const contentData = {
        'object-smile': { title: 'Звезда твоей улыбки', text: 'Твоя улыбка способна осветить самый темный уголок космоса. Она сияет ярче любой звезды.', image: 'img/her-photo-1.jpg' },
        'object-calm': { title: 'Ледяная планета спокойствия', text: 'Рядом с тобой я нахожу умиротворение. Ты как эта тихая, красивая планета, где нет бурь и тревог.', image: 'img/her-photo-2.jpg' },
        'object-humor': { title: 'Газовый гигант юмора', text: 'Твои шутки создают вокруг себя мощную гравитацию, которая притягивает хорошее настроение. С тобой всегда весело!', image: 'img/her-photo-3.jpg' },
        'object-romance': { title: 'Туманность Сердца', text: 'Это самое красивое, что я нашел в твоей вселенной. Облако нежности, тепла и романтики, которое ты создаешь вокруг.', image: 'img/her-photo-4.jpg' },
        'object-support': { title: 'Двойная звезда поддержки', text: 'Как эти две звезды, вращающиеся вместе, ты всегда рядом, чтобы поддержать. Я чувствую, что мы — команда.', image: 'img/her-photo-5.jpg' },
        'final-star': { title: 'Сердце Вселенной', text: 'С Днём Рождения, моя хорошая! Спасибо, что позволила мне увидеть твой удивительный мир. Пусть он всегда будет полон света. Твой, [Твое Имя]', image: 'img/our-photo.jpg' }
    };

    // --- Функция для создания звезд и комет ---
    function createBackgroundElements() {
        const starsCount = 200;
        const cometsCount = 7;
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
    
    // --- Логика "Большого взрыва" ---
    startBtn.addEventListener('click', () => {
        introScreen.style.opacity = '0';
        setTimeout(() => introScreen.classList.remove('visible'), 1000);
        
        bigBangFlash.classList.add('explode');
        
        setTimeout(() => {
            universeWrapper.classList.add('visible');
            createBackgroundElements();
            universeMap.classList.add('visible');
            celestialObjects.forEach((obj, index) => {
                if (obj.id !== 'final-star') {
                    setTimeout(() => { obj.classList.add('visible'); }, index * 250);
                }
            });
        }, 300);
    });  

    

    // Убираем вспышку после анимации
    bigBangFlash.addEventListener('animationend', () => {
        bigBangFlash.style.display = 'none';
    });

    // --- Логика модального окна ---
    const openModal = (id) => {
        const data = contentData[id];
        if (data) {
            modalImage.src = data.image;
            modalTitle.textContent = data.title;
            modalText.textContent = data.text;
            modalContainer.style.display = 'flex';
        }
    };
    const closeModal = () => { modalContainer.style.display = 'none'; };
    modalCloseBtn.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => { if (e.target === modalContainer) closeModal(); });

    // --- Основная логика кликов ---
    const visitedObjects = new Set();
    celestialObjects.forEach(obj => {
        if (obj.id === 'final-star') return;
        obj.addEventListener('click', () => {
            if (obj.classList.contains('visited')) return;
            openModal(obj.id);
            obj.classList.add('visited');
            visitedObjects.add(obj.id);
            if (visitedObjects.size === celestialObjects.length - 1) {
                setTimeout(() => { finalStar.classList.add('visible'); }, 1500);
            }
        });
    });
    finalStar.addEventListener('click', () => { openModal('final-star'); });
});