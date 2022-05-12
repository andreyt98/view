export const dataRequest = (url, callback) => {
  fetch(url)
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((data) => callback(data))
    .catch(() => {
      document.querySelector('.slider-container').style.color='white'
      document.querySelector('.slider-container').innerHTML = "ERROR ON DATABASE"
    });
};
