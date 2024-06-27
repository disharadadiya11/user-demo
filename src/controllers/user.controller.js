const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user.service");
const { errorResponse } = require("../utils/common.utils");
const userService = new UserService();

//---------------------------------------------- [ register ] -----------------------------------------------
module.exports.register = {
  controller: async (req, res, next) => {
    try {
      let result = await userService.register(req.body, req.file);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  },
};

//---------------------------------------------- [ login ] -----------------------------------------------
module.exports.login = {
  controller: async (req, res, next) => {
    try {
      let result = await userService.login(req.body, req.session);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  },
};

//---------------------------------------------- [ update profile ] -----------------------------------------------
module.exports.updateProfile = {
  controller: async (req, res, next) => {
    try {
      let result = await userService.updateProfile(req.params, req.body);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  },
};

//---------------------------------------------- [ delete profile ] -----------------------------------------------
module.exports.deleteProfile = {
  controller: async (req, res, next) => {
    try {
      let result = await userService.deleteProfile(req.params);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  },
};

//---------------------------------------------- [ get profile ] -----------------------------------------------
module.exports.getProfile = {
  controller: async (req, res, next) => {
    try {
      let result = await userService.getProfile(req.params);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  },
};

//---------------------------------------------- [ get profile ] -----------------------------------------------
module.exports.getAllProfile = {
  controller: async (req, res, next) => {
    try {
      let result = await userService.getAllProfile(req.query);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message)
      );
    }
  },
};
