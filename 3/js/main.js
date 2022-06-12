function getRandomNumber(minNumber, maxNumber) {
  const min = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const max = Math.floor(Math.max(Math.abs(minNumber),Math.abs(maxNumber)));
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkCommentLength();

const names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const commentForPhoto = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let objectId = 1;
let commentId = 1;

const getCommentForPhoto = function() {
  const id = commentId++;
  return {
    id,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: Array.from({ length: getRandomNumber(1, 2) }, () => getRandomArrayElement(commentForPhoto) ).join(' '),
    name: getRandomArrayElement(names),
  };
};

const createDescriptionPhoto = function() {
  const id = objectId++;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: `Фото ${id}`,
    likes: getRandomNumber(15, 200),
    comments: Array.from({ length: getRandomNumber(1, 3) }, getCommentForPhoto),
  };
};

const listDescriptionPhoto = Array.from({ length: 25 }, createDescriptionPhoto);
listDescriptionPhoto();
