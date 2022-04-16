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

export {getRandomPositiveInteger, checkStringLength,
  createRandomIdFromRangeGenerator, getRandomArrayElement, createIdGenerator,
  isEscapeKey};
