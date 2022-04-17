
import {onPhotosRecieved} from './filter.js';
import {alertFailureMesage} from './util.js';

const DATA_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://25.javascript.pages.academy/kekstagram';

const FETCH_RETRY_TIMEOUT = 3000;


function handleResponse (response) {
  if (!response.ok) {
    throw new Error(`Загрузка не удалась. Подождите немного. ${response.status} ${response.statusText}`);
  }
  return response;
}

function toJSON (response) {
  return response.json();
}

function fetchData() {
  fetch(DATA_URL)
    .then(handleResponse)
    .then(toJSON)
    .then(onPhotosRecieved)
    .catch((err) => {
      alertFailureMesage(err);
      setTimeout(fetchData, FETCH_RETRY_TIMEOUT);
    });
}

fetchData();

const sendData = (onSuccess, onFail, body) => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {sendData};
