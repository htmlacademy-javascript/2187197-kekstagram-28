import { isEscapeKey } from './util.js';
import { onDocumentKeyDown } from './form.js';

const checkTypeAlert = () => document.querySelector('.success, .error');

const removeAlert = (item) => {
  item.remove();
  document.removeEventListener('click', removeWithCheck);
  document.removeEventListener('keydown', onAlertKeyDown);
  document.addEventListener('keydown', onDocumentKeyDown);
};

function removeWithCheck(evt) {
  const alertShown = checkTypeAlert();

  if (evt.target === alertShown) {
    removeAlert(alertShown);
  }
}

function onAlertKeyDown (evt) {
  if (isEscapeKey(evt)) {
    const alertShown = checkTypeAlert();

    evt.preventDefault();

    removeAlert(alertShown);
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

  alertCloseButton.addEventListener('click', () => removeAlert(alertShown));
  document.addEventListener('click', removeWithCheck);
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('keydown', onAlertKeyDown);
};

export { showAlert };
