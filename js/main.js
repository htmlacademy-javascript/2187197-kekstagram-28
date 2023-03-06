const PHOTO_COUNT = 25;

const LIKES_COUNT = {
  MIN: 15,
  MAX: 200
};

const DESCRIPTIONS = [
  'Heart For The Future',
  'Morning Obsession',
  'Voodoo Moves',
  'Time For My Good Times',
  'A Moment Of A Man',
  'Hurt By My Blues'
];

const AVATAR_COUNT = {
  MIN: 1,
  MAX: 6
};

const COMMENT_COUNT = {
  MIN: 1,
  MAX: 5
};

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
  'Iosif Duskin',
  'Vikenti Rusky',
  'Grigor Duboff',
  'Stas Chernoff',
  'Maks Lopatin',
  'Larisa Romanoff',
  'Kira Petroff',
  'Ludmila Galkin',
  'Akilina Ivanoff',
  'Tatiana Falin',
  'Evgenia Angeloff',
  'Igor Minsky'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);

const generateCommentId = createRandomIdFromRangeGenerator(COMMENT_COUNT.MIN * PHOTO_COUNT, COMMENT_COUNT.MAX * PHOTO_COUNT);

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENT_MESSAGES)).join(' ');

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

getPhotoArray();
