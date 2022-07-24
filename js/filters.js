import { debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');

const MAX_SHOWN_RANDOM_PHOTO = 10;
const RERENDER_DELAY = 500;

const shufflePhotos = (pictures) => pictures.slice().sort(() => Math.random() - 0.5).slice(0, MAX_SHOWN_RANDOM_PHOTO);

const getMostCommentedPhotos = (pictures) => pictures.slice().sort((picA, picB) => picB.comments.length - picA.comments.length);

const removePrevPhoto = () => {
  const allPhoto = document.querySelectorAll('.picture');
  allPhoto.forEach((photo) => photo.remove());
};

const clickButtonFilter = (evt) => {
  imgFiltersButton.forEach((button) => { button.classList.remove('img-filters__button--active'); });
  evt.target.classList.add('img-filters__button--active');
};

const addFilters = (pictures, renderPictures) => {
  imgFilters.classList.remove('img-filters--inactive');

  let newphotos;

  imgFiltersForm.addEventListener('click', clickButtonFilter);
  imgFiltersForm.addEventListener('click', debounce((evt) => {
    removePrevPhoto();

    if (evt.target.id === 'filter-default') {
      renderPictures(pictures);
    }
    if (evt.target.id === 'filter-random') {
      newphotos = shufflePhotos(pictures);
      renderPictures(newphotos);
    }
    if (evt.target.id === 'filter-discussed') {
      newphotos = getMostCommentedPhotos(pictures);
      renderPictures(newphotos);
    }
  }), RERENDER_DELAY);
};

export { addFilters };
