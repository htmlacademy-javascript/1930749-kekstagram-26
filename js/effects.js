import { imgUploadPreview } from './form.js';
const valueScale = document.querySelector('.scale__control--value');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');

const STEP_SCALE = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const resetStyleImg = () => {
  imgUploadPreview.className = '';
  imgUploadPreview.style = 'none';
};

const addDefaultScaleImg = () => {
  valueScale.value = `${DEFAULT_SCALE}%`;
  imgUploadPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
};

const onButtonSmallerScalesClick = () => {
  let countScale = parseInt(valueScale.value, 10);
  if (countScale > MIN_SCALE) {
    countScale -= STEP_SCALE;
    valueScale.value = `${countScale}%`;
    imgUploadPreview.style.transform = `scale(${countScale/100})`;
  }
};

const onButtonBiggerScalesClick = () => {
  let countScale = parseInt(valueScale.value, 10);
  if (countScale < MAX_SCALE) {
    countScale += STEP_SCALE;
    valueScale.value = `${countScale}%`;
    imgUploadPreview.style.transform = `scale(${countScale / 100})`;
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const onSliderChangeStyle = () => {
  effectValue.value = effectSlider.noUiSlider.get();
  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = `grayscale(${effectValue.value})`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = `sepia(${effectValue.value})`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = `invert(${effectValue.value}%)`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = `blur(${effectValue.value}px)`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = `brightness(${effectValue.value})`;
  }
};

const onEffectChange = (evt) => {
  resetStyleImg();
  addDefaultScaleImg();

  if (evt.target.id === 'effect-none') {
    effectSlider.classList.add('hidden');
  }

  if (evt.target.id !== 'effect-none') {
    effectSlider.classList.remove('hidden');
  }

  if (evt.target.id === 'effect-chrome') {
    imgUploadPreview.classList.add('effects__preview--chrome');
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }

  if (evt.target.id === 'effect-sepia') {
    imgUploadPreview.classList.add('effects__preview--sepia');
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }

  if (evt.target.id === 'effect-marvin') {
    imgUploadPreview.classList.add('effects__preview--marvin');
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }

  if (evt.target.id === 'effect-phobos') {
    imgUploadPreview.classList.add('effects__preview--phobos');
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }

  if (evt.target.id === 'effect-heat') {
    imgUploadPreview.classList.add('effects__preview--heat');
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
};

const addEffectsSlider = () => {
  effectSlider.noUiSlider.on('update', onSliderChangeStyle);
  effectList.addEventListener('change', onEffectChange);
  effectSlider.classList.add('hidden');
};

const removeEffectsSlider = () => effectList.removeEventListener('change', onEffectChange);

export {onButtonSmallerScalesClick , onButtonBiggerScalesClick, resetStyleImg, addDefaultScaleImg , addEffectsSlider, removeEffectsSlider};
