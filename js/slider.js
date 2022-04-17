//Описание переменных для реализации слайдера
const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const sliderBlock = document.querySelector('.effect-level');

// Часто используемые в параметрах эффектов значения
const DEFAULT_RANGE = {min: 0, max: 1};
const DEFAULT_START = 1;
const DEFUALT_STEP = 0.1;
const DEFAULT_SCALE = '';

// Вспомогательная функция для заполнения объекта эффекта
const describeEffect = (filter, range=DEFAULT_RANGE, start=DEFAULT_START,
  step=DEFUALT_STEP, scale=DEFAULT_SCALE) => ({
  filter: filter,
  range: range,
  start: start,
  step: step,
  scale: scale,
});

//Создание объекта дяннах с парамтерами эффектов
const effects = {
  none: describeEffect('none'),
  chrome: describeEffect('grayscale'),
  sepia: describeEffect('sepia'),
  marvin: describeEffect('invert', {min: 0, max: 100}, 100, 1, '%'),
  phobos: describeEffect('blur', {min:0, max:3}, 3, 0.1, 'px'),
  heat: describeEffect('brightness', {min:1, max:3}, 3, 0.1),
};

// Создаем слайдер
noUiSlider.create(sliderElement, {
  range: DEFAULT_RANGE,
  start: 0,
  step: DEFUALT_STEP,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toString();
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
  }
});

// Вспомогательная функция для изменения эффекта
const changeEffect = (effect) => {
  sliderElement.noUiSlider.updateOptions(effect);
  if (effect.filter === 'none') {
    // Если эффекты не нужны, прячем слайдер
    image.style.filter = 'none';
    sliderBlock.classList.add('hidden');
  } else {
    sliderBlock.classList.remove('hidden');
    sliderElement.noUiSlider.on('update', () => {
      // получаем текущее значение слайдера
      valueElement.value = sliderElement.noUiSlider.get();
      // выставляем фильтр эффекта
      image.style.filter = `${effect.filter}(${valueElement.value}${effect.scale})`;
    });
  }
};

const resetSlider = () => {
  // по умолчанию эффект none
  changeEffect(effects['none']);
}

resetSlider();

effectsList.addEventListener('click', (event) => {
  if (event.target.matches('.effects__radio')) {
    changeEffect(effects[event.target.value]);
  }
});

export {resetSlider};
