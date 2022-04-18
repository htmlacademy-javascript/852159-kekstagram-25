// Вспомогательные константы
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const imageScaleValueNode = document.querySelector('.scale__control--value');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview');
const image = imageUploadPreview.querySelector('img');


// Константы
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const SCALE_VALUE_DEFALUT = 100;

let imageScalueValue = SCALE_VALUE_DEFALUT;

// Вспомогательная функция по рескейлингу картинки
const rescaleImage = () => {
  image.style.transform = `scale(${imageScalueValue/100})`;
  imageScaleValueNode.value = `${imageScalueValue}%`;
};

// Вспомогательная функция для понижения скейла
const decreaseScale = () => {
  imageScalueValue -= SCALE_STEP;
  if (imageScalueValue < MIN_SCALE_VALUE) {
    imageScalueValue = MIN_SCALE_VALUE;
  }
  rescaleImage();
};

// Вспомогательная функция для повышения скейла
const increaseScale = () => {
  imageScalueValue += SCALE_STEP;
  if (imageScalueValue > MAX_SCALE_VALUE) {
    imageScalueValue = MAX_SCALE_VALUE;
  }
  rescaleImage();
};

// Вспомогательная функция для сброса значения скейлинга
const resetScale = () => {
  imageScalueValue = SCALE_VALUE_DEFALUT;
  rescaleImage();
};

// Добавляем обработчики нажатия на кнопки
scaleSmallerButton.addEventListener('click', decreaseScale);
scaleBiggerButton.addEventListener('click', increaseScale);

export {resetScale};
