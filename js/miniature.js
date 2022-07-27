import { createBigPicture } from './bigpicture.js';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');

function renderPictures (photos) {
  const fragmentPicture = document.createDocumentFragment();

  photos.forEach(({ url, likes, comments, description }) => {
    const photoElement = templatePicture.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoElement.addEventListener('click', () => {
      createBigPicture( url, likes, comments, description);
    });

    fragmentPicture.appendChild(photoElement);
  });

  pictures.appendChild(fragmentPicture);
}

export { renderPictures };
