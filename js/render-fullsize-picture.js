import {isEscapeKey} from './util.js';

const bigPictureNode = document.querySelector('.big-picture');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');
const commentsBlock = bigPictureNode.querySelector('.social__comments');
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
const bigPictureNodeClose = bigPictureNode.querySelector('.big-picture__cancel');

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
// Объявлена функцией, что не соответствует критерию о единообразии
// объявлений функций, потому как в данном случае, эта функция используется
// в onKeyDown, и она же использует onKeyDown. Попытка развязать эту
// зависимость приводит к сильному дублоированию кода.
function closeFullSize() {
  document.querySelector('body').classList.remove('modal-open');
  bigPictureNode.classList.add('hidden');
  document.removeEventListener('keydown', onKeyDown);
}

const resetComments = (comments) => {
  // удаляем ранее выведенные комментарии
  bigPictureNode.querySelector('.social__comments').textContent = ' ';
  bigPictureNode.querySelector('.comments-count').textContent = comments.length.toString();
  // копируем массив с комментарием, чтобы менять его при отображении
  commentsArray = [...comments];
  // Показываем кнопку "Загрузить комментарии"ж
  commentsLoaderNode.classList.remove('hidden');
};

const renderComment = (commentObject) => {
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
};

// Вспомогательная функция для вывода комментариев к посту
const renderComments = () => {
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
};

// Функция для включения полноразмерного режима для поста с заданным src
const fullSizePicture = (id, posts) => {
  // получаем первый же пост с заданным src
  const post = posts.find((element) => element.id.toString() === id);
  resetComments(post.comments);
  // заполняем элементы поста в элемент DOM bigPictureNode
  bigPictureNode.querySelector('img').src = post.url;
  bigPictureNode.querySelector('.likes-count').textContent = post.likes;
  bigPictureNode.querySelector('.comments-count').textContent = post.comments.length;
  bigPictureNode.querySelector('.social__caption').textContent = post.description;

  // заполняем комментарии
  renderComments();
  // добавляем класс modal-open, чтобы контейнер с фотографиями позади
  // не прокручивался
  document.querySelector('body').classList.add('modal-open');
  // отображаем картинку
  bigPictureNode.classList.remove('hidden');
  // закроем окно по нажатию Esc
  document.addEventListener('keydown', onKeyDown);
};

// Функция для отрисовки картинок
// в полноразмерном режиме
const renderFullsize = (posts) => {
  // Эту константу мы не можем вынести из функции, т.к. этот элемент DOM
  // генерируется после загрузки модуля
  const pictures = document.querySelectorAll('.picture');

  // добавляем обработчики ивентов
  pictures.forEach((picture) => {
    picture.addEventListener('click', () => {
      fullSizePicture(picture.id, posts);
    });
  });
  bigPictureNodeClose.addEventListener('click', () => closeFullSize());

  commentsLoaderNode.addEventListener('click', renderComments);
};

export {renderFullsize};
