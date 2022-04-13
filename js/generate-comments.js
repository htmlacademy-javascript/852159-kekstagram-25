import {getRandomPositiveInteger, getRandomArrayElement, createIdGenerator} from './util.js';
import {AUTHORS, MESSAGES} from './data.js';

const MAX_AVATAR_NUMBER = 6;
const MIN_AVATAR_NUMBER = 1;

const generateCommentId = createIdGenerator();

// Функия для генерации случайного сообщения в объекте комментария.
function generateCommentMessage() {
  let result = getRandomArrayElement(MESSAGES);
  if (getRandomPositiveInteger(0, 1))
  {
    result += ` ${  getRandomArrayElement(MESSAGES)}`;
  }
  return result;
}

// Функция генерирует случайный комментарий к фотографии.
function generateComment() {
  const author = getRandomArrayElement(AUTHORS);
  return {
    id: generateCommentId().toString(),
    avatar: `img/avatar-${getRandomPositiveInteger(MIN_AVATAR_NUMBER,
      MAX_AVATAR_NUMBER)}.svg`,
    message: generateCommentMessage(),
    name: author,
  };
}

export {generateComment};
