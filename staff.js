const fs = require('fs');
const chalk = require('chalk');
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

const checkAdminCount = (staffs) => {
  return staffs.filter((staff) => staff.role === 'admin').length;
};

const adminExist = (staffs, name) => {
  const adminCount = checkAdminCount(staffs);

  for (let staff of staffs) {
    if (staff.name === name && staff.role === 'admin' && adminCount > 1) {
      return true;
    }
  }
  return false;
};

/*==============  Controllers  ===================*/
const addStaff = (name, role) => {
  const staffs = loadStaffs();

  // => edge case: Check if staff member exist
  const duplicateStaff = staffs.find((staff) => staff.name === name);
  if (duplicateStaff) {
    console.log(chalk.red.inverse(`Duplicate! Staff member exist!`));
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

// TODO: Edge Case => removing A single Admin in. Send Error and maybe force to set a new admin before removing the old admin
const removeStaff = (name) => {
  const staffs = loadStaffs();

  const remStaffs = staffs.filter((staff) => staff.name != name);

  if (remStaffs.length === staffs.length) {
    console.log(chalk.red.inverse('Invalid! No staff found!'));
    return;
  }

  // => check that there exist an admin before removing
  if (!adminExist(staffs, name)) {
    console.log(
      chalk.red.inverse(
        'Error! Add another admin before deleting current admin'
      )
    );
    return;
  }
  saveStaffs(remStaffs);
  console.log(chalk.green.inverse('Staff Removed'));
};

const getAllStaffs = (role) => {
  const staffs = loadStaffs();

  // => edge role permission
  if (!checkStaffRole(role)) {
    console.log(chalk.red.inverse('You do not have access!'));
    return;
  }

  if (!staffs.length) {
    console.log(chalk.yellow.inverse('There are no staffs'));
    return;
  }

  console.log(chalk.white.inverse('Staff List:\n'));

  staffs.forEach((staff) =>
    console.log(`\t${chalk.magenta.inverse(`${staff.name} - ${staff.role}`)}`)
  );
};

module.exports = { addStaff, removeStaff, getAllStaffs };
