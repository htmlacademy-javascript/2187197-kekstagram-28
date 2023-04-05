const PHOTOS_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const activeButtonTag = 'img-filters__button--active';
let currentFilter = Filter.DEFAULT;
let photos = [];


const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const applyFilters = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...photos].slice().sort(sortRandomly).slice(0, PHOTOS_COUNT);
    case Filter.DISCUSSED:
      return [...photos].slice().sort(sortByComments);
    default:
      return [...photos];
  }
};

const setOnFilterClick = (cb) => {
  filtersContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const activeFilterButton = evt.target;
    if (activeFilterButton.id === currentFilter) {
      return;
    }

    filtersContainer
      .querySelector(`.${activeButtonTag}`)
      .classList.remove(`${activeButtonTag}`);
    activeFilterButton.classList.add(`${activeButtonTag}`);
    currentFilter = activeFilterButton.id;
    cb(applyFilters());
  });
};

const renderFilters = (loadedPhotos, cb) => {
  filtersContainer.classList.remove('img-filters--inactive');
  photos = [...loadedPhotos];
  setOnFilterClick(cb);
};

export { renderFilters };
