//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs
  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа
  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}

getRandomPositiveInteger (1, 10);

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
const checkStringLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;

checkStringLength('Проверка', 24);

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

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

const MESSAGES = [ 'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

function generateCommentMessage() {
  let result = getRandomArrayElement(MESSAGES);
  if (getRandomPositiveInteger(0, 1))
  {
    result += ` ${  getRandomArrayElement(MESSAGES)}`;
  }
  return result;
}

function genereateComment(id) {
  const author = getRandomArrayElement(AUTHORS);
  return {
    id: id,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: generateCommentMessage(),
    name: author,
  };
}

function generateComments() {
  const size = getRandomPositiveInteger(0, 5);
  const result = [];
  for(let i =0; i<size; ++i) {
    result.push(genereateComment(i));
  }
  return result;
}

//Функция формирования объекта описания фото и комментария из массива
const createPhotoDescription = (_, id) => ({

  id: id+1,
  url: `photos/${String(id)}.jpg`,
  description: `Моя любимая фотография номер ${id} из 25`,
  likes: getRandomPositiveInteger(15, 200), //количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  comments: generateComments()
});

const GeneratePhotosArray = () =>  Array.from({length: 25,}, createPhotoDescription);

GeneratePhotosArray();
