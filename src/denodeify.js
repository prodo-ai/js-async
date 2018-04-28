// @flow

// @flow-ignore-line
export const denodeify = func => (...args) =>
  // @flow-ignore-line
  new Promise((resolve, reject) => {
    func(...args, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
