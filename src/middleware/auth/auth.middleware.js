const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../../utils/common.utils");
const { CONSTANT } = require("../../helper/constant");
const JwtService = require("../../common/jwt.service");
const { User } = require("../../models/user.model");
const jwtService = new JwtService();

module.exports.authMiddleware = async (req, res, next) => {
  try {
    let token = await req?.headers?.authorization?.split(" ")[1];
    if (!token)
      return res.send(
        errorResponse(StatusCodes.BAD_REQUEST, true, CONSTANT.TOKEN_EMPTY)
      );

    let { userId, role } = await jwtService.verifyToken(token);
    req.user = await User.findOne({ _id: userId, role: role });
    if (!req.user) {
      return res.send(
        errorResponse(StatusCodes.BAD_REQUEST, true, CONSTANT.PLEASE_REGISTER)
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

//------------------------------------------- [ check role ] ---------------------------------------------------
module.exports.checkUserRoleMiddleware = (allowRoles) => {
  return (req, res, next) => {
    try {
      if (req.user && req.user.role && allowRoles.includes(req.user.role)) {
        next();
      } else {
        return res.send(
          errorResponse(StatusCodes.BAD_REQUEST, true, CONSTANT.NOT_ALLOW)
        );
      }
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  };
};
