const staff_roles = ['admin', 'staff'];

const checkStaffRole = (staffRole) => {
  for (let role of staff_roles) {
    if (role === staffRole) {
      return true;
    }
  }
  return false;
};

module.exports = { checkStaffRole };
