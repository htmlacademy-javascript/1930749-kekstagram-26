import { listDescriptionPhoto } from './data.js';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');
const fragmentPicture = document.createDocumentFragment();

const MAX_PHOTO = 25;
const newPhoto = listDescriptionPhoto(MAX_PHOTO);

newPhoto.forEach(({ url, likes, comments }) => {
  const photoElement = templatePicture.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  fragmentPicture.appendChild(photoElement);
});

pictures.appendChild(fragmentPicture);
