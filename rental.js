const fs = require('fs');
const chalk = require('fs');
const { checkBookExist } = require('./books');
const { checkStaffRole } = require('./utils');

/*==============  Helper Methods  ===================*/
const loadRentals = () => {
  try {
    const dataBuffer = fs.readFileSync('rental.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveRentals = (data) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('rental.json', dataJSON);
};

/*==============  Controller  ===================*/
const rentBook = (title, author) => {
  const rentals = loadRentals();
  // => edge case => ensure the book exist
  const bookStatus = checkBookExist(title, author);

  if (!bookStatus) {
    console.log(chalk.red.inverse('Book does not exist'));
    return;
  }
  // => edge case => check if book is rented
  const existingRental = rentals.find(
    (rental) => rental.title === title && rental.author === author
  );
  // => add book rental to rentals list
  if (existingRental) {
    console.log(chalk.red.inverse('Book is currently rented.'));
    return;
  }
  rentals.push({ title, author });
  saveRentals(rentals);
  console.log(chalk.green.inverse('Rental Confirmed!'));
};

const returnBook = (title, author) => {
  const rentals = loadRentals();

  const bookStatus = checkBookExist(title, author);
  // edge case => check if book exist
  if (!bookStatus) {
    console.log(chalk.red.inverse('Book does not exist'));
    return;
  }
  // edge case => check for a rental
  const remRentals = rentals.filter(
    (rental) => rental.title === title && rental.author === author
  );

  if (remRentals.length === rentals.length) {
    console.log(chalk.red.inverse('You can only return a rented book.'));
    return;
  }

  saveRentals(remRentals);
  console.log(chalk.green.inverse('Book returned!'));
};

const getAllRentedBooks = (role) => {
  const rentals = loadRentals();
  // edge case => check permission
  if (!checkStaffRole(role)) {
    console.log(chalk.red.inverse('You do not have permission'));
    return;
  }
  // edge case => if empty
  if (!rentals) {
    console.log(chalk.yellow.inverse('No books rented...'));
    return;
  }

  console.log(chalk.white.inverse('List of rented books:\n'));
  rentals.forEach((rental) =>
    console.log(chalk.magenta.inverse(`\t${rental.title} - ${rental.author}`))
  );
};

module.exports = { rentBook, rentBook, getAllRentedBooks };
