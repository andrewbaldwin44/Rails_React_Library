const token = document.querySelector('meta[name="csrf-token"]').content;
const postRequestHeaders = {
  method: 'POST',
  headers: {
    'X-CSRF-Token': token,
    'Content-Type': 'application/json'
  }
}

export function postDatabase(url, data) {
  fetch(url, {
    ...postRequestHeaders,
    body: JSON.stringify(data)
  })
    .catch(error => console.log(error));
}

export function getData(url) {
  return fetch (url)
          .then(response => response.json());
}
