import PhonesPage from './components/PhonesPage.js';

new PhonesPage(document.querySelector('[data-component="PhonesPage"]'));


if (false) {
  const WAITING = 'waiting';
const SUCCEEDED = 'succeeded';
const FAILED = 'failed';

const promise = {
  result: null,
  status: WAITING,
  successCallback: [],
  errorCallbacks: [],

  then(callback) {
    if (this.status === WAITING) {
      this.successCallback.push(callback);
    } else {
      callback(this.result);
    }
  },

  resolve(data) {
    if (this.status !== WAITING) return;

    this.status = SUCCEEDED;
    this.result = data;

    for (let callback of this.successCallback) {
      callback(data)
    }
  },

  catch(callback) {
    this.errorCallbacks.push(callback);
  },
  reject(data) {
    if (this.status !== WAITING) {
      return;
    }

    this.status = FAILED;
    this.result = data;

    for (let callback of this.errorCallbacks) {
      callback(data)
    }
  },
};

setTimeout(() => {
  promise.then((data) => {
    console.log('Success 3 ' + data);
  });
}, 2000);

promise.then((data) => {
  console.log('Success 1 ' + data);
});
promise.then((data) => {
  console.log('Success 2 ' + data);
});

promise.resolve('sfjd')
promise.reject(999);
}


