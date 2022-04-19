import {renderMiniPictures} from './render-miniatures.js';
import {renderFullsize} from './render-fullsize-picture.js';

const showGallery = (postsArray) => {
  // Отрисуем миниатюры постов
  renderMiniPictures(postsArray);
  // Подготовим DOM к отрисовке полноразмерного режима картинок
  renderFullsize(postsArray);
};

export {showGallery};
