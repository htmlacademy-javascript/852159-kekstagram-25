//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0) {
    return null;
  }
  if(max < 0) {
    return null;
  }
  if (max === min) {
    return max;
  }
  if (max < min ) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt (1, 10);

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
const checkStringLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;
checkStringLength('Проверка', 24);
