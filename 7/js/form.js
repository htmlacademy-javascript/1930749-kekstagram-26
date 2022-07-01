import { body } from './bigpicture.js';
import { isEscapeKey } from './util.js';

export const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');
export const textHashtags = imgUploadForm.querySelector('.text__hashtags');
export const textDescription = imgUploadForm.querySelector('.text__description');

const onImgUploadKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUpload();
  }
};

function closeImgUpload() {
  imgUploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  body.classList.remove('modal-open');

  document.removeEventListener('keydown',  onImgUploadKeydown);
}

function openImgUpload() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown',  onImgUploadKeydown);
}

uploadFileInput.addEventListener('change', () => {
  openImgUpload();
});

uploadCancel.addEventListener('click', () => {
  closeImgUpload();
});

textHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

textDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
