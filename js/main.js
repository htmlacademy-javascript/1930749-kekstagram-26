import { renderPictures }  from './miniature.js';
import './bigpicture.js';
import './effects.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './form.js';
import { addFilters } from './filters.js';


const MAX_SHOW_PHOTO = 25;

getData((pictures) => {
  renderPictures(pictures.slice(0,MAX_SHOW_PHOTO));
  addFilters(pictures.slice(0,MAX_SHOW_PHOTO),renderPictures);
}, showAlert);
