import { isEscapeKey } from './util.js';

const removeAlert = () => {
  let alertShown = document.querySelector('.success');
  if (!alertShown) {
    alertShown = document.querySelector('.error');
  }
  alertShown.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    removeAlert();
  }
}

const createAlert = (type) => {
  const alertTemplate = document.querySelector(`#${type}`);
  const alertContainer = alertTemplate.content.cloneNode(true);
  document.body.append(alertContainer);
};

const showAlert = (type) => {
  createAlert(type);

  const alertShown = document.querySelector(`.${type}`);
  const alertCloseButton = document.querySelector(`.${type}__button`);

  alertShown.addEventListener('click', removeAlert);
  alertCloseButton.addEventListener('click', removeAlert);
  document.addEventListener('keydown', onDocumentKeyDown);
};

export { showAlert };
