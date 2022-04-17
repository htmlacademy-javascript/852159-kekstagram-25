import {showGallery} from './gallery.js';
import {debounce, shuffleArray} from './util.js';

const FILTER_DELAY = 500;
const RANDOM_PHOTOS_LIMIT = 10;

const filters = document.querySelector('.img-filters');

const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

filters.classList.remove('img-filters--inactive');

// Всопомогательная функция для сравнения двух фотографий по количеству комментариев
function compareCommentsCount(photo1, photo2) {
  return photo2.comments.length - photo1.comments.length;
}

const clearActive = () => {
  defaultButton.classList.remove('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');
}

// функция обработчик события о получении фотографий с сервера
const onPhotosRecieved = (photosArray) => {
  // Регистрируем обработчики событий по нажатию на кнопки
  // По умолчанию рисуем картинки в порядке 'как есть'
  defaultButton.addEventListener('click', debounce(() => {
    showGallery(photosArray);
    clearActive();
    defaultButton.classList.add('img-filters__button--active');
  }, FILTER_DELAY));
  // В случайном порядке перетасуем фотографии и ограничим число вывода
  randomButton.addEventListener('click', debounce(() => {
    showGallery(shuffleArray(photosArray.slice()).slice(0, RANDOM_PHOTOS_LIMIT));
  }, FILTER_DELAY));
  // Сортируем фотографии по числу комментариев.
  discussedButton.addEventListener('click', debounce(() => showGallery(photosArray.slice().sort(compareCommentsCount)), FILTER_DELAY));
  // отображаем картинки как есть.
  showGallery(photosArray);
};

export {onPhotosRecieved};
