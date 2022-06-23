import { getRandomNumber, getRandomArrayElement } from './util.js';

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

const commentsForPhoto = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 3;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const MIN_MESSAGE = 1;
const MAX_MESSAGE = 2;

let objectId = 1;
let commentId = 1;

const getCommentsForPhoto = function() {
  const id = commentId++;
  return {
    id,
    avatar: `img/avatar-${getRandomNumber(MIN_AVATAR, MAX_AVATAR)}.svg`,
    message: Array.from({ length: getRandomNumber(MIN_MESSAGE, MAX_MESSAGE) }, () => getRandomArrayElement(commentsForPhoto) ).join(' '),
    name: getRandomArrayElement(names),
  };
};

const createDescriptionPhoto = function() {
  const id = objectId++;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: `Фото ${id}`,
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomNumber(MIN_COMMENTS, MAX_COMMENTS) }, getCommentsForPhoto),
  };
};

const listDescriptionPhoto = (count) => Array.from({ length: count }, createDescriptionPhoto);

export { listDescriptionPhoto };
