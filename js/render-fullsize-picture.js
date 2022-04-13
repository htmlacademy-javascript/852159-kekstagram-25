import {isEscapeKey} from './util.js';

// Обработчик нажатия клавиши Esc
const onKeyDown = (event) => {
  if (isEscapeKey()) {
    event.preventDefault();
    closeFullSize();
  }
};

// Вспомогательная функция для выхода из полноразмерного режима
function closeFullSize() {
  const bigPicture = document.querySelector('.big-picture');

  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onKeyDown);
}

// Вспомогательная функция для вывода комментариев к посту
function renderComments(commentsObject) {
  const bigPicture = document.querySelector('.big-picture');

  const commentsBlock = bigPicture.querySelector('.social__comments');
  // удаляем ранее добавленные комментарии (если таковы были)
  commentsBlock.textContent = ' ';
  for (const commentObject of commentsObject) {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `<img
        class="social__picture"
        src="${commentObject.avatar}"
        alt="${commentObject.userName}"
        width="35" height="35">
        <p class="social__text">${commentObject.message}</p>`;
    commentsBlock.appendChild(comment);
  }
}

// Функция для включения полноразмерного режима для поста с заданным src
function fullSizePicture(id, posts) {
  const bigPicture = document.querySelector('.big-picture');

  // получаем первый же пост с заданным src
  const post = posts.find((element) => element.id === id);
  // заполняем элементы поста в элемент DOM bigPicture
  bigPicture.querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;
  bigPicture.querySelector('.social__caption').textContent = post.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  // заполняем комментарии
  renderComments(post.comments);
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
  const bigPicture = document.querySelector('.big-picture');
  const pictures = document.querySelectorAll('.picture');
  const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  // добавляем обработчики ивентов
  pictures.forEach((picture) => {
    picture.addEventListener('click', () => {
      fullSizePicture(picture.querySelector('img').getAttribute('src'), posts);
    });
  });
  bigPictureClose.addEventListener('click', () => closeFullSize());
}

export {renderFullsize};
