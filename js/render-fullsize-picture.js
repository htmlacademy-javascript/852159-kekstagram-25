import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsLoaderNode = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentsCountNode = bigPicture.querySelector('.social__comment-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const MAX_COMMENTS_SHOWED = 5;
let commentsArray = [];

// Обработчик нажатия клавиши Esc
const onKeyDown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeFullSize();
  }
};

// Вспомогательная функция для выхода из полноразмерного режима
function closeFullSize() {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onKeyDown);
}

function resetComments(comments) {
  // удаляем ранее выведенные комментарии
  bigPicture.querySelector('.social__comments').textContent = ' ';
  bigPicture.querySelector('.comments-count').textContent = comments.length.toString();
  // копируем массив с комментарием, чтобы менять его при отображении
  commentsArray = [...comments];
  // Показываем кнопку "Загрузить комментарии"ж
  commentsLoaderNode.classList.remove('hidden');
}

function renderComment(commentObject) {
  const comment = document.createElement('li');
  const img = document.createElement('img');
  const socialText = document.createElement('p');

  comment.classList.add('social__comment');
  img.classList.add('social__picture');
  img.src = commentObject.avatar;
  img.alt = commentObject.name;
  img.width = 35;
  img.height = 35;

  socialText.classList.add('social__text');
  socialText.textContent = `${commentObject.message}`;

  comment.appendChild(img);
  comment.appendChild(socialText);

  commentsBlock.appendChild(comment);
}

// Вспомогательная функция для вывода комментариев к посту
function renderComments() {
  // Вычисляем сколько комментариев показать
  const commentsToShowCount = Math.min(MAX_COMMENTS_SHOWED, commentsArray.length);
  // Выбираем комментарии для отображения
  const commentsToShow = commentsArray.slice(0, commentsToShowCount);
  // Отрисовываем комментарии
  commentsToShow.forEach(renderComment);
  // Удаляем уже отрисованные комментарии
  commentsArray = commentsArray.slice(commentsToShowCount);

  // исправляем текст количества комментариев
  commentsCountNode.firstChild.textContent = `${commentsBlock.children.length} из `;
  if (!commentsArray.length) {
    commentsLoaderNode.classList.add('hidden');
  }
}

// Функция для включения полноразмерного режима для поста с заданным src
function fullSizePicture(id, posts) {
  // получаем первый же пост с заданным src
  const post = posts.find((element) => element.id === id);
  resetComments(post.comments);
  // заполняем элементы поста в элемент DOM bigPicture
  bigPicture.querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;
  bigPicture.querySelector('.social__caption').textContent = post.description;

  // заполняем комментарии
  renderComments();
  // добавляем класс modal-open, чтобы контейнер с фотографиями позади
  // не прокручивался
  document.querySelector('body').classList.add('modal-open');
  // отображаем картинку
  bigPicture.classList.remove('hidden');
  // закроем окно по нажатию Esc
  document.addEventListener('keydown', onKeyDown);
}

// Функция для отрисовки картинок
// в полноразмерном режиме
function renderFullsize(posts) {
  // Эту константу мы не можем вынести из функции, т.к. этот элемент DOM
  // генерируется после загрузки модуля
  const pictures = document.querySelectorAll('.picture');

  // добавляем обработчики ивентов
  pictures.forEach((picture) => {
    picture.addEventListener('click', () => {
      fullSizePicture(picture.id, posts);
    });
  });
  bigPictureClose.addEventListener('click', () => closeFullSize());

  commentsLoaderNode.addEventListener('click', renderComments);
}

export {renderFullsize};
