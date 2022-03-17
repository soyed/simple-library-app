const fs = require('fs');
const chalk = require('chalk');
const { checkStaffRole } = require('./utils');
const { count } = require('console');

/*==============  Helper Methods  ===================*/
const loadBooks = () => {
  try {
    const dataBuffer = fs.readFileSync('books.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveBooks = (data) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('books.json', dataJSON);
};

/*==============  Controllers ===================*/
const addBook = (title, author, role) => {
  const books = loadBooks();

  // Edge Case => check role permission
  if (!checkStaffRole(role)) {
    console.log(chalk.red.inverse('You do not have permission.'));
    return;
  }

  // Edge Case => check for duplicate book title and author
  const duplicateBook = books.find(
    (book) => book.title === title && book.author === author
  );

  if (duplicateBook) {
    console.log(chalk.red.inverse('Duplicate book'));
    return;
  } else {
    books.push({ title, author });
    saveBooks(books);
    console.log(chalk.green.inverse('Book Added!'));
  }
};

const removeBook = (title, author, role) => {
  const books = loadBooks();
  // edge case => check staff role
  if (!checkStaffRole(role)) {
    console.log(chalk.red.inverse('You do not have permission.'));
    return;
  }
  debugger;
  const remBooks = books.filter(
    (book) => book.title !== title && book.author !== author
  );
  // edge case => if no book is found
  if (remBooks.length === books.length) {
    console.log(chalk.red.inverse('No book found'));
    return;
  }

  saveBooks(remBooks);
  console.log(chalk.green.inverse('Book removed!'));
};

const getAllBooks = (role) => {
  // Load books
  const books = loadBooks();
  // Edge case => check permission
  if (!checkStaffRole(role)) {
    console.log(chalk.red.inverse('You do not have permission.'));
    return;
  }
  // Edge Case => empty list of books
  if (!books.length) {
    console.log(chalk.yellow.inverse('No books found!'));
    return;
  }

  console.log(chalk.white.inverse('List of Books:\n'));
  books.forEach((book) =>
    console.log(chalk.magenta.inverse(`\t${book.title} - ${book.author}`))
  );
};

module.exports = { addBook, removeBook, getAllBooks };
