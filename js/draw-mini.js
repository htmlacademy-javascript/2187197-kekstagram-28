const thumbnailBlock = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailFragment = document.createDocumentFragment();

const createThumbnail = ({ url, likes, description, comments }) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailElement;
};

export const renderThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    thumbnailFragment.appendChild(thumbnailElement);
  });

  thumbnailBlock.appendChild(thumbnailFragment);
};
