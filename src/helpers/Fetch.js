export const dataRequest = (url, callback) => {
  fetch(url)
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((data) => callback(data))

    .catch((error) => {
      console.log(error);
    });
};
