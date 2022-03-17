const fs = require('fs');
const chalk = require('chalk');

/*==============  Helper Methods  ===================*/
const loadBooks = () => {
  try {
    const dataBuffer = fs.readFileSync('library.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    console.log(e);
  }
};

const saveBooks = (data) => {
  const dataJSON = JSON.stringify(data);

  fs.writeFileSync('library.json', dataJSON);
};

/*==============  Controllers ===================*/

const addBook = (title, author, role) => {};

const removeBook = (title, author, role) => {};

const getAllBooks = () => {};

module.exports = { addBook, removeBook, getAllBooks };
