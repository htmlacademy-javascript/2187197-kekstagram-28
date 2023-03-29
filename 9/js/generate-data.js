import { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator } from './util.js';
import { PHOTO_COUNT, LIKES_COUNT, DESCRIPTIONS, AVATAR_COUNT, COMMENT_COUNT, COMMENT_MESSAGES, COMMENT_NAMES } from './origin-data.js';

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);

const generateCommentId = createRandomIdFromRangeGenerator(COMMENT_COUNT.MIN * PHOTO_COUNT, COMMENT_COUNT.MAX * PHOTO_COUNT);

const createMessage = () => Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENT_MESSAGES)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.MIN, AVATAR_COUNT.MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(COMMENT_NAMES)
});

const createPhoto = () => {
  const indexPhoto = generatePhotoId();
  return {
    id: indexPhoto,
    url: `photos/${indexPhoto}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
    comments: Array.from({length: getRandomInteger(COMMENT_COUNT.MIN, COMMENT_COUNT.MAX)}, createComment)
  };
};

const getPhotoArray = () =>
  Array.from({ length: PHOTO_COUNT }, createPhoto);

export { getPhotoArray };
