const getData = (onSuccess,onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((picture) => onSuccess(picture))
    .catch((err) => {
      onError(err.message);
    });
};

const sendData = (onSuccess, onFail, onFinally, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      onFinally();
    });
};

export {getData, sendData};
