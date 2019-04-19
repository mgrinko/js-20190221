
const API_URL = 'https://mgrinko.github.io/js-20190221/api';



export const getAllPhones = () => {
  return fetch(API_URL + '/phones.json')
          .then(response => response.json())
}

export const getPhoneById = (phoneId) => {
  return fetch(API_URL + '/phones/' + phoneId + '.json')
          .then(response => response.json())
}


