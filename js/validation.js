import { checkTextLength } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text__element',
  errorTextParent: 'text__element',
  errorTextClass: 'text__element--error',
});

function rowIsEmpty (hashtag) {
  return hashtag.trim() === '';
}

function getHashtagsArray (hashtag) {
  return hashtag.trim().split(' ');
}

function validateHashTag (hashtag) {
  return rowIsEmpty(hashtag) || getHashtagsArray(hashtag).every((textHashtag) => RE.test(textHashtag));
}
pristine.addValidator(textHashtags, validateHashTag, 'Хэш-тег не может содержать спецсимволы, символы пунктуации. Хэш-теги должны быть разделены пробелами');

function checkHashSign(hashtag) {
  return rowIsEmpty(hashtag) || getHashtagsArray(hashtag).every((textHashtag) => textHashtag.startsWith('#'));
}
pristine.addValidator(textHashtags, checkHashSign, 'Хэш-тег должен начинаться с символа # (решётка).');

function checkHashLength(hashtag) {
  return getHashtagsArray(hashtag).every((textHashtag) => textHashtag.length <= MAX_LENGTH_HASHTAG);
}
pristine.addValidator(textHashtags, checkHashLength, `Максимальная длина одного хэш-тега ${MAX_LENGTH_HASHTAG} символов.`);

function checkMaxHashtags(hashtag) {
  return getHashtagsArray(hashtag).length <= MAX_HASHTAGS;
}
pristine.addValidator(textHashtags, checkMaxHashtags, `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов.`);

function checkRepeatHashtags (hashtag) {
  const match = {};
  const getLowerHashtags = getHashtagsArray(hashtag.toLowerCase());
  return !getLowerHashtags.some((hash) => {
    if (match[hash]) {
      return true;
    }
    match[hash] = true;
    return false;
  });
}

pristine.addValidator(textHashtags, checkRepeatHashtags, 'Такой хэштег уже существует.');

function checkCommentLength(comment) {
  return checkTextLength(comment, MAX_LENGTH_COMMENT);
}

pristine.addValidator(textDescription, checkCommentLength, `Длина комментария не может составлять больше ${MAX_LENGTH_COMMENT} символов`);

export { imgUploadForm , textHashtags, textDescription, pristine};
