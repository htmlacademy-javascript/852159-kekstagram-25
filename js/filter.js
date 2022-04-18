import {showGallery} from './gallery.js';
import {debounce, shuffleArray} from './util.js';

const FILTER_DELAY = 500;
const RANDOM_PHOTOS_LIMIT = 10;

const filtersNode = document.querySelector('.img-filters');

const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

// Всопомогательная функция для сравнения двух фотографий по количеству комментариев
const compareCommentsCount = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

//Вспомогательная функция для очистки активной кнопки и выбора новой
const setActive = (activeButton) => {
  const className = 'img-filters__button--active';
  defaultButton.classList.remove(className);
  randomButton.classList.remove(className);
  discussedButton.classList.remove(className);
  activeButton.classList.add(className);
};

// функция обработчик события о получении фотографий с сервера
const onPhotosRecieved = (photosArray) => {
  // Регистрируем обработчики событий по нажатию на кнопки
  // По умолчанию рисуем картинки в порядке 'как есть'
  filtersNode.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', debounce(() => {
    showGallery(photosArray);
    setActive(defaultButton);
    defaultButton.classList.add('img-filters__button--active');
  }, FILTER_DELAY));
  // В случайном порядке перетасуем фотографии и ограничим число вывода
  randomButton.addEventListener('click', debounce(() => {
    showGallery(shuffleArray(photosArray.slice()).slice(0, RANDOM_PHOTOS_LIMIT));
    setActive(randomButton);
  }, FILTER_DELAY));
  // Сортируем фотографии по числу комментариев.
  discussedButton.addEventListener('click', debounce(() => {
    showGallery(photosArray.slice().sort(compareCommentsCount));
    setActive(discussedButton);
  }, FILTER_DELAY));
  // отображаем картинки как есть.
  showGallery(photosArray);
};

export {onPhotosRecieved};
