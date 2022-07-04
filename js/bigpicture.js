import { newPhotos } from './miniature.js';
import { isEscapeKey } from './util.js';

export const body = document.querySelector('body');
const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.big-picture__social .likes-count');
const captionPhoto = bigPicture.querySelector('.big-picture__social .social__caption');
const commentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureKeydown);
}

bigPictureCancel.addEventListener('click', () =>{
  closeBigPicture();
});

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureKeydown);
}

const getListComment =  (comments) =>{
  const fragmentComment = document.createDocumentFragment();
  socialComments.innerHTML = '';
  for (let i = 0; i < comments.length; i++){
    const comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__text').textContent = comments[i].message;
    fragmentComment.appendChild(comment);
  }
  socialComments.appendChild(fragmentComment);
};

pictures.forEach((picture) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture();
    const pictureImg = picture.querySelector('img');
    const pictureLikes = picture.querySelector('.picture__likes');
    const pictureComments = picture.querySelector('.picture__comments');
    bigPictureImg.src = pictureImg.src;
    likesCount.textContent = pictureLikes.textContent;
    commentsCount.textContent = pictureComments.textContent;

    const comments = newPhotos.find((photo) => String(photo.id) === picture.getAttribute('data-id')).comments;
    getListComment(comments);

    const descriptionPhoto = newPhotos.find((photo) => String(photo.id) === picture.getAttribute('data-id')).description;
    captionPhoto.textContent = descriptionPhoto;
  });
});
