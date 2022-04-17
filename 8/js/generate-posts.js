import {getRandomPositiveInteger, createRandomIdFromRangeGenerator} from './util.js';
import {generateComment} from './generate-comments.js';

// Число генерируемых объектов
const POST_PHOTOS_COUNT = 25;

const LIKES_MIN_NUMBER = 15;
const LIKES_MAX_NUMBER = 200;

const COMMENTS_MIN_NUMBER = 1;
const COMMENTS_MAX_NUMBER = 15;

const generatePhotoId = createRandomIdFromRangeGenerator(1, POST_PHOTOS_COUNT);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, POST_PHOTOS_COUNT);

//Функция формирования объекта описания фото и комментария из массива
const createPost = () => {
  const id = generatePhotoId();
  return {
    id: id.toString(),
    url: `photos/${generatePhotoUrl()}.jpg`,
    description: `Моя любимая фотография номер ${id} из 25`,
    likes: getRandomPositiveInteger(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER), //Количество лайков, поставленных фотографии. Случайное число от 15 до 200.
    //Генерирует массив комментариев
    comments: Array.from({length: getRandomPositiveInteger(COMMENTS_MIN_NUMBER, COMMENTS_MAX_NUMBER)}, generateComment)
  };
};

const generatePostsArray = () =>  Array.from({length: POST_PHOTOS_COUNT}, createPost);

export {generatePostsArray};
