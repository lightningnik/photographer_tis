// Данные фотографий (src, категория, alt)
const photos = [
    { src: 'photos/portrait/portrait1.jpg', category: 'portrait', alt: 'Портрет 1' },
    { src: 'photos/portrait/portrait2.jpg', category: 'portrait', alt: 'Портрет 2' },
    { src: 'photos/portrait/portrait3.jpg', category: 'portrait', alt: 'Портрет 3' },
    { src: 'photos/reportage/reportage1.jpg', category: 'reportage', alt: 'Репортаж 1' },
    { src: 'photos/lovestory/lovestory1.jpg', category: 'love-story', alt: 'Love story 1' },
    { src: 'photos/lovestory/lovestory2.jpg', category: 'love-story', alt: 'Love story 2' },
    { src: 'photos/lovestory/lovestory3.jpg', category: 'love-story', alt: 'Love story 3' },
    { src: 'photos/lovestory/lovestory4.jpg', category: 'love-story', alt: 'Love story 4' },
    { src: 'photos/lovestory/lovestory5.jpg', category: 'love-story', alt: 'Love story 5' },
    { src: 'photos/interior/interior1.jpg', category: 'interior', alt: 'Интерьер 1' },
    { src: 'photos/interior/interior2.jpg', category: 'interior', alt: 'Интерьер 2' },
    { src: 'photos/interior/interior3.jpg', category: 'interior', alt: 'Интерьер 3' },
    { src: 'photos/interior/interior4.jpg', category: 'interior', alt: 'Интерьер 4' },
    { src: 'photos/interior/interior5.jpg', category: 'interior', alt: 'Интерьер 5' },
];

const categories = [
    { id: 'portrait', name: 'Портрет' },
    { id: 'reportage', name: 'Репортаж' },
    { id: 'love-story', name: 'Love story' },
    { id: 'interior', name: 'Интерьер / Предметка' }
];

// Элементы
const categoriesGrid = document.getElementById('categories-grid');
const galleryModal = document.getElementById('gallery-modal');
const galleryGrid = document.getElementById('gallery-grid');
const galleryModalTitle = document.getElementById('gallery-modal-title');
const galleryModalClose = document.querySelector('.gallery-modal-close');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentCategoryPhotos = [];
let currentLightboxIndex = 0;

// Получить превью для карточки категории
function getPreviewPhoto(categoryId) {
    const firstPhoto = photos.find(p => p.category === categoryId);
    return firstPhoto ? firstPhoto.src : '';
}

// Создать карточки категорий
function renderCategoryCards() {
    categoriesGrid.innerHTML = '';
    categories.forEach(cat => {
        const preview = getPreviewPhoto(cat.id);
        if (!preview) return;
        const card = document.createElement('div');
        card.className = 'category-card';
        card.dataset.category = cat.id;
        card.innerHTML = `
            <img src="${preview}" alt="${cat.name}" class="category-image" loading="lazy">
            <div class="category-title">${cat.name}</div>
        `;
        card.addEventListener('click', () => openCategoryGallery(cat.id, cat.name));
        categoriesGrid.appendChild(card);
    });
}

// Открыть модальное окно с сеткой фотографий категории
function openCategoryGallery(categoryId, categoryName) {
    const filtered = photos.filter(p => p.category === categoryId);
    if (filtered.length === 0) return;
    currentCategoryPhotos = filtered;
    galleryModalTitle.textContent = categoryName;
    galleryGrid.innerHTML = '';
    filtered.forEach((photo, idx) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy">`;
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightboxFromGallery(idx);
        });
        galleryGrid.appendChild(item);
    });
    galleryModal.classList.add('show');
}

// Открыть лайтбокс из галереи (по индексу)
function openLightboxFromGallery(index) {
    if (!currentCategoryPhotos.length) return;
    currentLightboxIndex = index;
    lightboxImg.src = currentCategoryPhotos[currentLightboxIndex].src;
    lightbox.classList.add('show');
    // Закрываем модальное окно галереи (опционально)
    // galleryModal.classList.remove('show');
}

// Навигация в лайтбоксе
function prevLightbox() {
    if (!currentCategoryPhotos.length) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentCategoryPhotos.length) % currentCategoryPhotos.length;
    lightboxImg.src = currentCategoryPhotos[currentLightboxIndex].src;
}

function nextLightbox() {
    if (!currentCategoryPhotos.length) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentCategoryPhotos.length;
    lightboxImg.src = currentCategoryPhotos[currentLightboxIndex].src;
}

function closeLightbox() {
    lightbox.classList.remove('show');
}

function closeGalleryModal() {
    galleryModal.classList.remove('show');
}

// Закрытие по клику вне содержимого
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGalleryModal();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Клавиши
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('show')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
    } else if (galleryModal.classList.contains('show')) {
        if (e.key === 'Escape') closeGalleryModal();
    }
});

// Кнопки закрытия и навигации
galleryModalClose.addEventListener('click', closeGalleryModal);
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevLightbox);
lightboxNext.addEventListener('click', nextLightbox);

// Форма
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Сообщение отправлено. Я свяжусь с вами.');
});

// Инициализация
renderCategoryCards();