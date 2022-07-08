import { body } from './bigpicture.js';
import { isEscapeKey } from './util.js';
import { scalingDown, scalingUp, resetStyleImg , addDefaultScaleImg , addEffectsSlider, removeEffectsSlider} from './effects.js';
import { imgUploadForm, textHashtags, textDescription, validateFormUpload ,pristine} from './validation.js';

const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');
const buttonSmallerScale = imgUploadForm.querySelector('.scale__control--smaller');
const buttonBiggerScale = imgUploadForm.querySelector('.scale__control--bigger');

const onImgUploadKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUpload();
  }
};

function closeImgUpload() {
  imgUploadForm.reset();
  pristine.reset();
  resetStyleImg();
  body.classList.remove('modal-open');
  removeEffectsSlider();
  imgUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onImgUploadKeydown);
  buttonSmallerScale.removeEventListener('click', scalingDown);
  buttonBiggerScale.removeEventListener('click', scalingUp);
  imgUploadForm.removeEventListener('submit', validateFormUpload);
}

function openImgUpload() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  addDefaultScaleImg();
  addEffectsSlider();

  document.addEventListener('keydown', onImgUploadKeydown);
  buttonSmallerScale.addEventListener('click', scalingDown);
  buttonBiggerScale.addEventListener('click', scalingUp);
  imgUploadForm.addEventListener('submit', validateFormUpload);
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
