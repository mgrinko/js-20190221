const API_URL = 'https://mgrinko.github.io/js-20190221/api/phones';

export const getAllPhones = async () => {
  const response = await fetch(API_URL + '.json');
  const data = await response.json();

  return data;
}

export const getPhoneById = async (phoneId) => {
  const response = await fetch(API_URL + '/' + phoneId + '.json');
  const phone = await response.json();
  return phone;
}