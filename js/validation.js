import { imgUploadForm , textHashtags , textDescription } from './form.js';
import { checkTextLength } from './util.js';
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text--error',
});

const getHashtagsArray = (hashtag) => hashtag.trim().split(' ');

const validateHashTag = (hashtag) => getHashtagsArray(hashtag).every((textHashtag) => RE.test(textHashtag));
pristine.addValidator(textHashtags, validateHashTag, 'Хэш-тег должен состоять из букв и чисел.');

const checkHashSign = (hashtag) => getHashtagsArray(hashtag).every((textHashtag) => textHashtag[0] === '#');
pristine.addValidator(textHashtags, checkHashSign, 'Хэш-тег должен начинаться с символа # (решётка).');

const checkHashLength = (hashtag) => getHashtagsArray(hashtag).every((textHashtag) => textHashtag.length <= MAX_LENGTH_HASHTAG);
pristine.addValidator(textHashtags, checkHashLength, `Максимальная длина одного хэш-тега ${MAX_LENGTH_HASHTAG} символов.`);

const checkMaxHashtags = (hashtag) => getHashtagsArray(hashtag).length <= MAX_HASHTAGS;
pristine.addValidator(textHashtags, checkMaxHashtags, `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов.`);

const checkRepeatHashtags = (hashtag) => {
  const match = {};
  const getLowerHashtags = getHashtagsArray(hashtag.toLowerCase());
  return !getLowerHashtags.some((hash) => {
    if (match[hash]) {
      return true;
    }
    match[hash] = true;
    return false;
  });
};
pristine.addValidator(textHashtags, checkRepeatHashtags, 'Такой хэштег уже существует.');

const checkCommentLength = (comment) => checkTextLength(comment, MAX_LENGTH_COMMENT);
pristine.addValidator(textDescription, checkCommentLength, `Длина комментария не может составлять больше ${MAX_LENGTH_COMMENT} символов`);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
