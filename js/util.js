// Если выставить в true, сообщения об ошибке будут выводиться простым алертом
const SIMPLE_ALERT = false;

// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция возвращающая генератор уникальных случайных целых чисел в диаапозоне min, max.
function createRandomIdFromRangeGenerator (min, max) {
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
}

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
const checkStringLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;

// Функция для получения случайного элемента из массива. Принимает на вход массив, из которого следует выбрать элемент.
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// Функция возвращающая генератор уникальных идентефикаторов.
function createIdGenerator() {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const isEscapeKey = (event) => event.key === 'Escape';

// Функция для отображения сообщения об ошибке запроса загрузки данных с сервера. пункт 4.2 текущего тз
// Идея дизайна взята https://us.niemvuilaptrinh.com/article/27-example-of-alert-javascript-for-website
function alertFailureMesage(message) {
  if (SIMPLE_ALERT) {
    return alert(message);
  }
  document.createElement('div');

  const alertNode = document.createElement('div');
  alertNode.style.opacity = 1;
  alertNode.style.position = 'fixed';
  alertNode.style.height = '100%';
  alertNode.style.width = '100%';
  alertNode.style.backgroundColor = "rgba(94, 110, 141, 0.9)";
  alertNode.style.left = 0;
  alertNode.style.top = 0;
  alertNode.style.zIndex = 100;

  const container = document.createElement('div');

  container.style.position = "relative";
  container.style.width = "90%";
  container.style.maxWidth = "400px";
  container.style.margin = "4em auto";
  container.style.background = "#FFF";
  container.style.color = "#000";
  container.style.borderRadius = ".25em .25em .4em .4em";
  container.style.textAlign = "center";
  container.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
  
  const messageContainer = document.createElement('p');
  messageContainer.style.padding = "3em 1em";
  messageContainer.textContent = message;

  const close = document.createElement('a');
  close.textContent = "X";
  close.addEventListener('click', (event) => {
    alertNode.remove();
    event.preventDefault();
  });

  close.href = "#0";

  close.style.display = "inline-block";
  close.style.textIndent = "100%";
  close.style.position = "absolute";
  close.style.color = "#000";
  close.style.whiteSpace = "nowrap";

  close.style.top = "8px";
  close.style.right = "8px";
  close.style.width = "30px";
  close.style.height = "30px";

  container.appendChild(messageContainer);
  container.appendChild(close);

  alertNode.appendChild(container);
  alertNode.appendChild(container);
  document.body.appendChild(alertNode);
}

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

function debounce (callback, timeoutDelay = 500) {
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
}

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomPositiveInteger, checkStringLength,
  createRandomIdFromRangeGenerator, getRandomArrayElement, createIdGenerator,
  isEscapeKey, alertFailureMesage, showSuccessMessage, showErrorMessage, debounce, throttle};
