import { checkStringLength, isEscapeKey } from './util.js';

// Максимально возможная длина комментария
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const ERROR_BAD_COMMENT = 'Слишком длинный комментарий';
const ERROR_HASH_TAG = 'Хэш тэги не валидны';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
const uploadOverlayCancel = uploadForm.querySelector('.img-upload__cancel');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const uploadTextDescription = uploadForm.querySelector('.text__description');
const uploadTexthashtags = uploadForm.querySelector('.text__hashtags');

// Создаем Pristine валидатор
const pristine = new Pristine(uploadForm,  {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Проверяем комментарий
const validateComment = (comment) => checkStringLength(comment, MAX_COMMENT_LENGTH);
// Проверяем хэш теги
const validateHashTags = (textHashtags) => {
  if (!textHashtags.length) {
    // хэштеги не обязательны
    return true;
  }
  const arrayHashtags = textHashtags.toLowerCase().split(' ');
  // воспользуемся регулярными выражениями
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  // Теги которые мы уже проверили
  const checkedTags = [];
  let result = true;
  arrayHashtags.every((item) => {
    // Если мы не встречали еще этого тега
    if (!checkedTags.includes(item)) {
      if (!re.test(item)) {
        // еслитег не удовлетворяет регулярному вырожению
        // сразу остановим цикл every
        result = false;
        return false;
      }
      // запомним проверянный тег
      checkedTags.push(item);
    }
    else {
      // хэштеги уникальны
      result = false;
      return false;
    }
  });
  return result && checkedTags.length <= MAX_HASHTAGS_COUNT;
};

pristine.addValidator(uploadTextDescription, validateComment, ERROR_BAD_COMMENT);
pristine.addValidator(uploadTexthashtags, validateHashTags, ERROR_HASH_TAG);

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  pristine.validate();
  // код на следующее задание.
  // const isValid = pristine.validate();
  // закрываем форму
  // if (isValid) {
  //   closeFormModal();
  //   // осуществляем отправку данных формы
  //   event.target.submit();
  // }
});

// Обработчик нажатия кнопки по форме
const onFormKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeFormModal();
  }
};

// Вспомогательная функция, которая прячет форму
function closeFormModal() {
  document.body.classList.remove('modal-open');
  uploadOverlayForm.classList.add('hidden');
  document.removeEventListener('keydown', onFormKeydown);
}

// Отображаем форму после выбора картинки пользователем
uploadFile.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  uploadOverlayForm.classList.remove('hidden');
  imgUploadPreview.src = URL.createObjectURL(uploadFile.files[0]);
  document.addEventListener('keydown', onFormKeydown);
});

// Прячем форму по нажатию на крестик
uploadOverlayCancel.addEventListener('click', closeFormModal);

// если фокус находится в поле ввода комментария, нажатие на Esc
// не должно приводить к закрытию формы редактирования изображения
uploadTextDescription.addEventListener('focus', () => {
  document.removeEventListener('keydown', onFormKeydown);
});

// Возвращаем обработчик Esc
uploadTextDescription.addEventListener('blur', () => {
  document.addEventListener('keydown', onFormKeydown);
});

// вызываем валидатор при изменение комментария
uploadTextDescription.addEventListener('change', pristine.validate);
// вызываем валидатор при изменение хэш тегов
uploadTexthashtags.addEventListener('change', pristine.validate);

// если фокус находится в поле ввода хэш-тега, нажатие на Esc
// не должно приводить к закрытию формы редактирования изображения.
uploadTexthashtags.addEventListener('focus', () => {
  document.removeEventListener('keydown', onFormKeydown);
});

// Возвращаем обработчик Esc
uploadTexthashtags.addEventListener('blur', () => {
  document.addEventListener('keydown', onFormKeydown);
});
