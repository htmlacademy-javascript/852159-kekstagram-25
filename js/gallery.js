import {generatePostsArray} from './generate-posts.js';
import {renderMiniPictures} from './render-miniatures.js';
import {renderFullsize} from './render-fullsize-picture.js';

// сгенерируем посты
const generatedPosts = generatePostsArray();
// Отрисуем миниатюры постов
renderMiniPictures(generatedPosts);
// Подготовим DOM к отрисовке полноразмерного режима картинок
renderFullsize(generatedPosts);
