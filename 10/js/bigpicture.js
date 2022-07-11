import { isEscapeKey } from './util.js';

export const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.big-picture__social .likes-count');
const captionPhoto = bigPicture.querySelector('.big-picture__social .social__caption');
const commentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const visibleComments = bigPicture.querySelector('.comments-visible');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');

const MAX_SHOWN_COMMENTS = 5;

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
  commentsLoaderButton.removeEventListener('click', onLoaderButtonClick);
}

bigPictureCancel.addEventListener('click', () => closeBigPicture());

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureKeydown);
  commentsLoaderButton.addEventListener('click', onLoaderButtonClick);
}

const setListComment = (comments) => {
  const fragmentComment = document.createDocumentFragment();
  socialComments.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__picture').alt = comments[i].name;
    comment.querySelector('.social__text').textContent = comments[i].message;

    if (i >= MAX_SHOWN_COMMENTS) {
      comment.classList.add('hidden');
      commentsLoaderButton.classList.remove('hidden');
    }
    else {
      commentsLoaderButton.classList.add('hidden');
    }
    fragmentComment.appendChild(comment);
  }
  socialComments.appendChild(fragmentComment);
  visibleComments.textContent = `${getVisibleCommentsCount()}`;
};

function onLoaderButtonClick() {
  let opened = 0;
  for (let i = 0; i < socialComments.children.length; i++){
    const comment = socialComments.children[i];
    if (comment.classList.contains('hidden')) {
      opened++;
      comment.classList.remove('hidden');
    }
    if (opened === MAX_SHOWN_COMMENTS) {
      break;
    }
  }
  commentsLoaderButton.classList.add('hidden');

  for (let i = 0; i < socialComments.children.length; i++) {
    const comment = socialComments.children[i];

    if (comment.classList.contains('hidden')) {
      commentsLoaderButton.classList.remove('hidden');
    }
  }
  visibleComments.textContent = `${getVisibleCommentsCount()}`;
}

function getVisibleCommentsCount() {
  const hiddenComments = socialComments.querySelectorAll('.hidden');
  const visibleCommentCount = socialComments.children.length - hiddenComments.length;

  return visibleCommentCount;
}

function createBigPicture ( url, likes, comments, description) {
  openBigPicture();
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  captionPhoto.textContent = description;
  setListComment(comments);
}

export { createBigPicture };
