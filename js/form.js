import { body } from './bigpicture.js';
import { isEscapeKey} from './util.js';
import { showMessage } from './messages.js';
import { onButtonSmallerScalesClick, onButtonBiggerScalesClick, resetStyleImg , addDefaultScaleImg , addEffectsSlider, removeEffectsSlider} from './effects.js';
import { imgUploadForm, textHashtags, textDescription, pristine} from './validation.js';
import { sendData } from './api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');
const buttonSmallerScale = imgUploadForm.querySelector('.scale__control--smaller');
const buttonBiggerScale = imgUploadForm.querySelector('.scale__control--bigger');
const buttonImgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

const onImgUploadKeydown = (evt) => {
  if (isEscapeKey(evt) && !checkInputFocus()) {
    evt.preventDefault();
    closeImgUpload();
  }
};

function checkInputFocus() {
  return document.activeElement === textHashtags || document.activeElement === textDescription;
}

function addKeydownListenerForm() {
  document.addEventListener('keydown', onImgUploadKeydown);
}

function removeKeydownListenerForm() {
  document.removeEventListener('keydown', onImgUploadKeydown);
}

function closeImgUpload() {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');

  imgUploadForm.reset();
  pristine.reset();

  resetStyleImg();
  removeEffectsSlider();
  removeKeydownListenerForm();

  buttonSmallerScale.removeEventListener('click', onButtonSmallerScalesClick);
  buttonBiggerScale.removeEventListener('click', onButtonBiggerScalesClick);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  uploadCancel.removeEventListener('click', closeImgUpload);
}

function openImgUpload() {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');

  addDefaultScaleImg();
  addEffectsSlider();
  addKeydownListenerForm();

  buttonSmallerScale.addEventListener('click', onButtonSmallerScalesClick);
  buttonBiggerScale.addEventListener('click', onButtonBiggerScalesClick);
  imgUploadForm.addEventListener('submit', onFormSubmit);
  uploadCancel.addEventListener('click', closeImgUpload);
}

function onUploadFileInputChange() {
  const file = uploadFileInput.files[0];
  const filename = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => filename.endsWith(type));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
}

uploadFileInput.addEventListener('change', () => {
  openImgUpload();
  onUploadFileInputChange();
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
        unblockSubmitButton();
        closeImgUpload();
      },
      () => {
        showMessage('error');
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
}

export { addKeydownListenerForm, removeKeydownListenerForm , imgUploadPreview};
