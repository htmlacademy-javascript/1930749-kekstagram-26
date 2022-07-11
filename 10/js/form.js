import { body } from './bigpicture.js';
import { isEscapeKey} from './util.js';
import { showMessage } from './messages.js';
import { onButtonSmallerScalesClick, onButtonBiggerScalesClick, resetStyleImg , addDefaultScaleImg , addEffectsSlider, removeEffectsSlider} from './effects.js';
import { imgUploadForm, textHashtags, textDescription, pristine} from './validation.js';
import { sendData } from './api.js';

const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');
const buttonSmallerScale = imgUploadForm.querySelector('.scale__control--smaller');
const buttonBiggerScale = imgUploadForm.querySelector('.scale__control--bigger');
const buttonImgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

const onImgUploadKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUpload();
  }
};

function closeImgUpload() {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  imgUploadForm.reset();
  pristine.reset();
  resetStyleImg();
  removeEffectsSlider();

  document.removeEventListener('keydown', onImgUploadKeydown);
  buttonSmallerScale.removeEventListener('click', onButtonSmallerScalesClick);
  buttonBiggerScale.removeEventListener('click', onButtonBiggerScalesClick);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
}

function openImgUpload() {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  addDefaultScaleImg();
  addEffectsSlider();

  document.addEventListener('keydown', onImgUploadKeydown);
  buttonSmallerScale.addEventListener('click', onButtonSmallerScalesClick);
  buttonBiggerScale.addEventListener('click', onButtonBiggerScalesClick);
  imgUploadForm.addEventListener('submit', onFormSubmit);
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

const blockSubmitButton = () => {
  buttonImgUploadSubmit.disabled = true;
  buttonImgUploadSubmit.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  buttonImgUploadSubmit.disabled = false;
  buttonImgUploadSubmit.textContent = 'Опубликовать';
};

function onFormSubmit (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        showMessage('success');
      },
      () => {
        showMessage('error');
      },
      () => {
        closeImgUpload();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
}
