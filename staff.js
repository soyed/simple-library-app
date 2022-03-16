const fs = require('fs');
const chalk = require('chalk');
// const chalk = require('chalk');
const { checkStaffRole } = require('./utils');

/*==============  Helper Methods  ===================*/
const loadStaffs = () => {
  try {
    const dataBuffer = fs.readFileSync('staff.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveStaffs = (data) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('staff.json', dataJSON);
};

/*==============  Controllers  ===================*/
const addStaff = (name, role) => {
  const staffs = loadStaffs();

  // => edge case: Check if staff member exist
  const duplicateStaff = staffs.find((staff) => staff.name === name);
  if (duplicateStaff) {
    console.log(
      chalk.red.inverse(
        `Duplicate\n\t${chalk.white.inverse(
          `A staff member with the name ${name} exist!`
        )}}`
      )
    );
    return;
  }
  // else => Check for valid staff role
  if (!checkStaffRole(role)) {
    console.log(chalk.red.inverse('Invalid staff role'));
  } else {
    staffs.push({ name, role });
    saveStaffs(staffs);
    console.log(chalk.green.inverse('New staff member added!'));
  }
};

const removeStaff = (name) => {};

const getAllStaffs = () => {};

// TODO: Edge Case => removing A single Admin in application. Send Error and maybe force to set a new admin before removing the old admin

module.exports = { addStaff, removeStaff, getAllStaffs };
