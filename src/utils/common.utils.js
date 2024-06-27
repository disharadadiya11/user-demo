const bcrypt = require("bcrypt");

//-------------------------------------------------------- [ Response ] -----------------------------------------------------------------
module.exports.successResponse = (statusCode, error, message, result) => {
  return {
    statusCode,
    error,
    message,
    result,
  };
};

module.exports.errorResponse = (statusCode, error, message) => {
  return {
    statusCode,
    error,
    message,
  };
};

//-------------------------------------------------------- [ password ] -----------------------------------------------------------------
module.exports.encryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports.decryptPassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
