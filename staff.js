const chalk = require('chalk');

/*==============  Helper Methods  ===================*/
const loadStaffs = () => {};

const saveStaffs = () => {};

/*==============  Controllers  ===================*/
const addStaff = (name, role) => {};

const removeStaff = (name) => {};

const getAllStaffs = () => {};

// TODO: Edge Case => removing A single Admin in application. Send Error and maybe force to set a new admin before removing the old admin

module.exports = { addStaff, removeStaff, getAllStaffs };
