const getRandomNumber = (minNumber, maxNumber) => {
  const min = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const max = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkTextLength = (text, maxLength) => text.length <= maxLength;

export { getRandomNumber, getRandomArrayElement, isEscapeKey, checkTextLength };
