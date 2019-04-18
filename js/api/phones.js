const API_URL = 'https://mgrinko.github.io/js-20190221/api';

export const getAll = async () => {
  const response = await fetch(API_URL + '/phones.json');
  const data = await response.json();

  return data;
};

export const getById = (phoneId) => {
  return fetch(API_URL + '/phones/' + phoneId + '.json')
    .then(response => response.json());
};
