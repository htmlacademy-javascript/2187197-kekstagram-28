import { isEscapeKey } from './util.js';
import { COMMENT_COUNT_SHOWN } from './origin-data.js';

const thumbnailsContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
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

let commentsShown = 0;
let commentsTotal = [];

const loadComments = () => {
  commentsShown += COMMENT_COUNT_SHOWN;

  if (commentsShown >= commentsTotal.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = commentsTotal.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const comment = commentsTotal[i];
    const commentClone = renderCommentClone(comment);
    fragment.append(commentClone);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentCount.innerHTML = `${commentsShown} из ${commentsTotal.length} комментариев`;
};

const renderCommentBlock = (picture) => {
  commentsTotal = picture.comments;
  loadComments();
};

const onCommentLoadMore = (evt) => {
  evt.preventDefault();

  loadComments();
};

const drawBigPicture = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  drawBigPicture(picture);
  document.addEventListener('keydown', onDocumentKeyDown);
};

const cancelBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsContainer.innerHTML = '';
  commentsShown = 0;
  commentsLoader.removeEventListener('click', onCommentLoadMore);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    cancelBigPicture();
  }
}

const openModal = (pictures) => {
  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );

    showBigPicture(picture);
    renderCommentBlock(picture);

    if (!commentsLoader.classList.contains('hidden')) {
      commentsLoader.addEventListener('click', onCommentLoadMore);
    }
  });

};

const closeModal = () => {
  closeButton.addEventListener('click', () => {
    cancelBigPicture();

  });
};

const renderBigPicture = (pictures) => {
  openModal(pictures);
  closeModal(pictures);
};

export { renderBigPicture };
