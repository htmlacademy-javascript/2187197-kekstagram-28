import { isEscapeKey } from './util.js';
import { TAG_COUNT_MAX } from './origin-data.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageOverlay = document.querySelector('.img-upload__overlay');
const uploadButton = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
}, true);

const onImageUpload = () => {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

const onImageCancel = () => {
  resetScale();
  resetEffects();
  uploadForm.reset();
  pristine.reset();

  uploadImageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onImageCancel();
  }
}

function onFormPreventBubble (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

commentField.addEventListener('keydown', onFormPreventBubble);
hashtagField.addEventListener('keydown', onFormPreventBubble);

const isValidTag = (tag) => TAG_PATTERN.test(tag);
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};
const isValidTagNumber = (tags) => tags.length <= TAG_COUNT_MAX;

const tagsArray = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const validateTagsPattern = (value) => tagsArray(value).every(isValidTag);
const validateTagsNumber = (value) => isValidTagNumber(tagsArray(value));
const validateUniqueTags = (value) => hasUniqueTags(tagsArray(value));

pristine.addValidator(hashtagField, validateTagsPattern, 'Тег начинается с #. Внутри только латинские буквы, кириллица и числа.');
pristine.addValidator(hashtagField, validateUniqueTags, 'Ваши теги повторяются. Проверьте уникальность каждого.');
pristine.addValidator(hashtagField, validateTagsNumber, 'Ограничение поля - до 5 комментариев. Исправьте количество тегов.');

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadButton.addEventListener('change', onImageUpload);
cancelButton.addEventListener('click', onImageCancel);
uploadForm.addEventListener('submit', onFormSubmit);
