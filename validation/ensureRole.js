//maps each role to a role ID for the purpose of comparison of hierarchy
// advisor(2) > board(1) > member(0)
function getRoleId(role) {
  switch (role) {
    case "member":
      roleid = 0;
      break;
    case "board":
      roleid = 1;
      break;
    case "advisor":
      roleid = 2;
      break;
    default:
      roleid = 0;
  }
  return roleid;
}

module.exports = function ensureRole(userRole, requiredRole) {
  //compare and return if the user role id is >= to the required role
  return getRoleId(userRole) >= getRoleId(requiredRole) ? true : false;
};
