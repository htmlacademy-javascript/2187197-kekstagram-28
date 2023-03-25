import { isEscapeKey } from './util.js';

const thumbnailsContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsContainer = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment-template').content;

const renderCommentClone = ({ avatar, name, message }) => {
  const commentClone = commentTemplate.cloneNode(true);

  const commentImg = commentClone.querySelector('.social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentClone.querySelector('.social__text').textContent = message;

  return commentClone;
};

const renderCommentBlock = (pictures) => {
  commentsContainer.innerHTML = '';
  pictures.comments.forEach((comment) => {
    const commentClone = renderCommentClone(comment);
    commentsContainer.appendChild(commentClone);
  });
};

const drawBigPicture = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  drawBigPicture(picture);
};

const cancelBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsContainer.innerHTML = '';
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    cancelBigPicture();
  }
};

const openModal = (pictures) => {
  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );

    showBigPicture(picture);
    renderCommentBlock(picture);

    document.addEventListener('keydown', onDocumentKeyDown);
  });
};

const closeModal = () => {
  closeButton.addEventListener('click', () => {
    cancelBigPicture();
    document.removeEventListener('keydown', onDocumentKeyDown);
  });
};

const renderBigPicture = (pictures) => {
  openModal(pictures);
  closeModal(pictures);
};

export { renderBigPicture };
