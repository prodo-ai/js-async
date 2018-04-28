// @flow

// @flow-ignore-line
export const fromCallback = func => (...args) =>
  // @flow-ignore-line
  new Promise(resolve => {
    func(...args, value => {
      resolve(value);
    });
  });
