import { listDescriptionPhoto } from './data.js';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');
const fragmentPicture = document.createDocumentFragment();

const MAX_PHOTO = 25;
const newPhotos = listDescriptionPhoto(MAX_PHOTO);

newPhotos.forEach(({id, url, likes, comments }) => {
  const photoElement = templatePicture.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.setAttribute('data-id', id);
  fragmentPicture.appendChild(photoElement);
});

pictures.appendChild(fragmentPicture);

export { newPhotos };
