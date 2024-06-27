const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common.utils");

module.exports.validateSchema = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property]);
      if (error) {
        return res.send(
          errorResponse(StatusCodes.BAD_REQUEST, true, error.details[0].message)
        );
      }
      next();
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  };
};
