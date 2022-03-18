const yargs = require('yargs');
const staff = require('./staff');
const books = require('./books');
const rental = require('./rental');

// 1. Create command to add staff members
yargs.command({
  command: 'add-staff',
  describe: 'Add a staff member',
  builder: {
    name: {
      describe: 'Staff name',
      demandOption: true,
      type: 'string',
    },
    role: {
      describe: 'Staff Role',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    staff.addStaff(argv.name.toLowerCase(), argv.role.toLowerCase());
  },
});

// 2. Create command to remove staff members\
yargs.command({
  command: 'remove-staff',
  describe: 'Remove a staff member',
  builder: {
    name: {
      name: 'string',
      demandOption: true,
      describe: 'Staff name',
    },
  },
  handler(argv) {
    staff.removeStaff(argv.name.toLowerCase());
  },
});

// 3. Get all staff members
yargs.command({
  command: 'all-staffs',
  describe: 'List all staff members',
  builder: {
    role: {
      describe: 'Staff role',
      type: 'string',
      demandOption: true,
    },
  },
  handler(argv) {
    staff.getAllStaffs(argv.role.toLowerCase());
  },
});

// 4. Add book command
yargs.command({
  command: 'add-book',
  describe: 'Add a book to library collection',
  builder: {
    title: {
      describe: 'Book title',
      demandOption: true,
      type: 'string',
    },
    author: {
      describe: 'Book author',
      demandOption: true,
      type: 'string',
    },
    role: {
      describe: 'Person who added the book',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    books.addBook(
      argv.title.toLowerCase(),
      argv.author.toLowerCase(),
      argv.role.toLowerCase()
    );
  },
});

// 5. Remove | delete book
yargs.command({
  command: 'remove-book',
  describe: 'Remove a book from library collection',
  builder: {
    title: {
      describe: 'Book title',
      demandOption: true,
      type: 'string',
    },
    author: {
      describe: 'Book author',
      demandOption: true,
      type: 'string',
    },
    role: {
      describe: 'Person who removed the book',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    books.removeBook(
      argv.title.toLowerCase(),
      argv.author.toLowerCase(),
      argv.role.toLowerCase()
    );
  },
});

// 6. Get all books
yargs.command({
  command: 'all-books',
  describe: 'List of all books',
  handler(argv) {
    books.getAllBooks(argv.role.toLowerCase());
  },
});
// 7. Rent a book
yargs.command({
  command: 'rent-book',
  describe: 'Rent a book from the library',
  builder: {
    title: {
      describe: 'Book title',
      demandOption: true,
      type: 'string',
    },
    author: {
      describe: 'Book author',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    rental.rentBook(argv.title.toLowerCase(), argv.author.toLowerCase());
  },
});

// 8. Return borrowed books
yargs.command({
  command: 'return-book',
  describe: 'Return a rented book from the library',
  builder: {
    title: {
      describe: 'Book title',
      demandOption: true,
      type: 'string',
    },
    author: {
      describe: 'Book author',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    rental.returnBook(argv.title.toLowerCase(), argv.author.toLowerCase());
  },
});

// 9. Get all borrowed books
yargs.command({
  command: 'rented-books',
  describe: 'List of all borrowed books',
  builder: {
    role: {
      describe: 'Identity of person requesting for all rented books',
      type: 'string',
      demandOption: true,
    },
  },
  handler(argv) {
    rental.getAllRentedBooks(argv.role.toLowerCase());
  },
});

yargs.parse();
