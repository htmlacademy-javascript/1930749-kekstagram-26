async function getData (onSuccess, onError) {
  try {
    const response = await fetch('https://26.javascript.pages.academy/kekstagram/data');
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    onSuccess(data);
  }
  catch(err){
    onError(err.message);
  }}


async function sendData (onSuccess, onFail, body) {
  try {
    const response = await fetch('https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    onSuccess();
  }
  catch(err) {
    onFail(err.message);
  }
}

export {getData, sendData};
