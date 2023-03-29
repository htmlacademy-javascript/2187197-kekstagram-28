const thumbnailBlock = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailFragment = document.createDocumentFragment();

const createThumbnail = ({ url, likes, description, comments, id }) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.dataset.thumbnailId = id;

  return thumbnailElement;
};

const renderThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    thumbnailFragment.appendChild(thumbnailElement);
  });

  thumbnailBlock.appendChild(thumbnailFragment);
};

export { renderThumbnails };
