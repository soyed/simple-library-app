const { notStrictEqual } = require('assert');
const yargs = require('yargs');
const staff = require('./staff');

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
    console.log(argv);
    staff.addStaff(argv.name, argv.role);
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
    staff.removeStaff(argv.name);
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
    staff.getAllStaffs(argv.role);
  },
});

// 4. Add book command
yargs.command({
  command: 'add-book',
  describe: 'Add a book to library collection',
  builder: {
    name: {},
    author: {},
    addedBy: {},
  },
  handler(argv) {
    console.log(argv);
  },
});

// 5. Remove | delete book
yargs.command({
  command: 'remove-book',
  describe: 'Remove a book from library collection',
  builder: {
    name: {},
    removedBy: {},
  },
  handler(argv) {},
});

// 6. Get all books
yargs.command({
  command: 'books',
  describe: 'List of all books',
  handler(argv) {
    console.log(argv);
  },
});
// 7. Rent a book
yargs.command({
  command: 'rent-book',
  describe: 'Rent a book from the library',
  builder: {
    name: {},
    bookName: {},
    author: {},
  },
  handler(argv) {
    console.log(argv);
  },
});

// 8. Return borrowed books
yargs.command({
  command: 'return-book',
  describe: 'Return a rented book from the library',
  builder: {
    name: {},
    bookName: {},
  },
  handler(argv) {
    console.log(argv);
  },
});

// 9. Get all borrowed books
yargs.command({
  command: 'rented-books',
  describe: 'List of all borrowed books',
  builder: {
    staff: {},
  },
  handler(argv) {
    console.log(argv);
  },
});

yargs.parse();
