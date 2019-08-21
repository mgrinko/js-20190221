const URL_API = 'https://mgrinko.github.io/js-20190221/api/phones';

export const getAll = async () => {
  try {
    const response = await fetch (URL_API + '.jdson')
    const data = await response.json();

    return data;
  } catch (e) {
    return [];
  }

}

export const getById = (phoneId) => {
  return fetch(URL_API + '/' + phoneId + '.json')
    .then(response => response.json());
}