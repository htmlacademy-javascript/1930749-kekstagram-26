function getRandomNumber(minNumber, maxNumber) {
  const min = Math.min(minNumber, maxNumber);
  const max = Math.max(minNumber, maxNumber);
  return Math.floor(Math.random()*(max - min + 1) + min);
}

getRandomNumber();

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkCommentLength();
