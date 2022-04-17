import {generatePostsArray} from './generate-posts.js';
import {renderMiniPictures} from './render-miniatures.js';
import {renderFullsize} from './render-fullsize-picture.js';

// // сгенерируем посты
// const generatedPosts = generatePostsArray();

function showGallery(postsArray) {
  // Отрисуем миниатюры постов
  renderMiniPictures(postsArray);
  // Подготовим DOM к отрисовке полноразмерного режима картинок
  renderFullsize(postsArray); 
}

export {showGallery};