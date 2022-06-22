function getRandomNumber(minNumber, maxNumber) {
  const min = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const max = Math.floor(Math.max(Math.abs(minNumber),Math.abs(maxNumber)));
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

//function checkCommentLength(comment, maxLength) {
//  return comment.length <= maxLength;
//}

//getRandomArrayElement();
//checkCommentLength();

export { getRandomNumber, getRandomArrayElement };
