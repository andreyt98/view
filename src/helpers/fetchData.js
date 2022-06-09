export const fetchData = (url, callback) => {
  fetch(url)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then((data) => callback(data))

    .catch((error) => {
      return error;
    });
};
