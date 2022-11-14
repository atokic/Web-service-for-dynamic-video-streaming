const { readdir } = require('fs');
const path = require('path');

const getFilesPathInDir = dirPath =>
  new Promise((res, rej) => {
    readdir(dirPath, (err, files) => {
      if (err) rej(err);
      res(files.map(file => path.resolve(dirPath, file)));
    });
  });

module.exports = {
  getFilesPathInDir
};
