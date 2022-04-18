// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция возвращающая генератор уникальных случайных целых чисел в диаапозоне min, max.
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
const checkStringLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;

// Функция для получения случайного элемента из массива. Принимает на вход массив, из которого следует выбрать элемент.
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// Функция возвращающая генератор уникальных идентефикаторов.
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const isEscapeKey = (event) => event.key === 'Escape';

// Функция для отображения сообщения об ошибке запроса загрузки данных с сервера. пункт 4.2 текущего тз
// Идея дизайна взята https://us.niemvuilaptrinh.com/article/27-example-of-alert-javascript-for-website
const alertFailureMesage = (message) => {
  document.createElement('div');

  const alertNode = document.createElement('div');
  alertNode.style = {
    opacity: 1,
    position: 'fixed',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(94, 110, 141, 0.9)',
    left: 0,
    top: 0,
    zIndex: 100
  };

  const container = document.createElement('div');
  container.style = {
    position: 'relative',
    width: '90%',
    maxWidth: '400px',
    margin: '4em auto',
    background: '#FFF',
    color: '#000',
    borderRadius: '.25em .25em .4em .4em',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
  };

  const messageContainer = document.createElement('p');
  messageContainer.style.padding = '3em 1em';
  messageContainer.textContent = message;

  const close = document.createElement('a');
  close.textContent = 'X';
  close.addEventListener('click', (event) => {
    alertNode.remove();
    event.preventDefault();
  });

  close.href = '#0';

  close.style = {
    display: 'inline-block',
    textIndent: '100%',
    position: 'absolute',
    color: '#000',
    whiteSpace: 'nowrap',
    top: '8px',
    right: '8px',
    width: '30px',
    height: '30px'
  };

  container.appendChild(messageContainer);
  container.appendChild(close);

  alertNode.appendChild(container);
  document.body.appendChild(alertNode);
};

// Функция для отрисовки сообщения об успехе загрузки фотографии
const showSuccessMessage = () => {
  // Шаблон, по которому будем создавать сообщение
  const successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  // Фрагмент DOM дерева, который мы будем наполнять в соответсвии с шаблоном
  const successFragment = document.createDocumentFragment();

  // Создаем новую ноду по темплейту
  const success = successTemplate.cloneNode(true);
  // Ставим обработчик клика по кнопке
  success.querySelector('.success__button').addEventListener('click', () => {
    // удаляем сообщение
    document.querySelector('.success').remove();
  });
  successFragment.appendChild(success);
  // Добавляем результат в DOM
  document.body.appendChild(successFragment);
};

// Функция для отрисовки сообщения об ошибке загрузки фотографии
const showErrorMessage = () => {
  // Шаблон, по которому будем создавать сообщение
  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  // Фрагмент DOM дерева, который мы будем наполнять в соответсвии с шаблоном
  const errorFragment = document.createDocumentFragment();

  // Создаем новую ноду по темплейту
  const error = errorTemplate.cloneNode(true);
  // Ставим обработчик клика по кнопке
  error.querySelector('.error__button').addEventListener('click', () => {
    // удаляем сообщение
    document.querySelector('.error').remove();
  });
  errorFragment.appendChild(error);
  // Добавляем результат в DOM
  document.body.appendChild(errorFragment);
};

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const shuffleArray = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};


export {getRandomPositiveInteger, checkStringLength,
  createRandomIdFromRangeGenerator, getRandomArrayElement, createIdGenerator,
  isEscapeKey, alertFailureMesage, showSuccessMessage, showErrorMessage,
  debounce, shuffleArray};
