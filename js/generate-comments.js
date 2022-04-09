import {getRandomPositiveInteger, getRandomArrayElement, createIdGenerator} from './util.js';

// Имена авторов комментариев
const AUTHORS = [ 'Алиса',
  'Варвара',
  'Виктория',
  'Адам',
  'Иван',
  'Кирилл',
  'Роман',
  'Мирослава',
  'Максим',
  'Ксения',
  'Мария',
  'Александр',
  'Арина',
  'Юлия',
  'Данила',
  'Михаил',
  'Елизавета',
  'Марк',
  'Артём',
  'Денис',
  'Мирон',
  'Пётр',
  'Вероника',
  'Константин',
  'Алексей',
  'Светлана',
  'Ольга',
  'Кира',
  'Ярослав',
  'Вячеслав'];

// Массив предопределенных комментариев.
const MESSAGES = [ 'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

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
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: generateCommentMessage(),
    name: author,
  };
}

export {generateComment};
