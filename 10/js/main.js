import { renderPictures }  from './miniature.js';
import './bigpicture.js';
import './effects.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './form.js';

const MAX_SHOW_PHOTO = 25;

getData((picture) => renderPictures(picture.slice(0, MAX_SHOW_PHOTO)), showAlert);
