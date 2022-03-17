//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0) {
    min = Math.abs(min);
  }
  if(max < 0) {
    max = Math.abs(max);
  }
  if (max === min) {
    return max;
  }
  if (max < min ) {
    const T = max;
    max = min;
    min = T;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt ();

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
const getLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;
getLength('Проверка', 24);
