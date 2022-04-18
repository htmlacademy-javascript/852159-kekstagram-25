// Вспомогательная функция для удаления уже отрисованных картинок
const clearMiniPictures = () => {
  const picturesNode = document.querySelector('.pictures');
  picturesNode.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

// Функция для отрисовки миниатюр
const renderMiniPictures = (postsArray) => {
  // Сначала очистим область от картинок, отсортированных ранее
  clearMiniPictures();
  // Нода, в которую мы добавим результат
  const picturesNode = document.querySelector('.pictures');
  // Шаблон, по которому будем создавать фотографии
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  // Фрагмент DOM дерева, который мы будем наполнять в соответсвии с шаблоном
  const picturesFragment = document.createDocumentFragment();

  postsArray.forEach((post) => {
    // Создаем новую ноду по темплейту
    const photo = pictureTemplate.cloneNode(true);
    // Заполняем значениями
    photo.querySelector('.picture__img').src = post.url;
    photo.querySelector('.picture__comments').textContent =
      post.comments.length;
    photo.querySelector('.picture__likes').textContent = post.likes;
    photo.id = post.id;
    picturesFragment.appendChild(photo);
  });
  // Добавляем результат в DOM
  picturesNode.appendChild(picturesFragment);
};

export { renderMiniPictures };
