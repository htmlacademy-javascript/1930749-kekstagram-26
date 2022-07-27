import { isEscapeKey } from './util.js';
import { addKeydownListenerForm, removeKeydownListenerForm } from './form.js';

function showMessage (name) {
  const templateMessage = document.querySelector(`#${name}`).content;
  const sectionMessage = templateMessage.querySelector(`.${name}`);
  const message = sectionMessage.cloneNode(true);
  message.style.zIndex = '10';

  document.body.append(message);
  removeKeydownListenerForm();

  const innerMessage = message.querySelector(`.${name}__inner`);
  const buttonMessage = message.querySelector(`.${name}__button`);

  buttonMessage.addEventListener('click', onButtonMessageClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onMessageClick);

  function onButtonMessageClick () {
    removeMessage();
  }

  function removeMessage () {
    message.remove();
    document.removeEventListener('keydown', onMessageKeydown);
    document.removeEventListener('click', onMessageClick);
    if (name === 'error') {
      addKeydownListenerForm();
    }
  }

  function onMessageKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onMessageClick (evt) {
    const click = evt.composedPath().includes(innerMessage);
    if (!click) {
      removeMessage();
    }
  }
}

export { showMessage };
