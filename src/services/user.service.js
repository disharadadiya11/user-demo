const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user.model");
const {
  successResponse,
  errorResponse,
  encryptPassword,
  decryptPassword,
} = require("../utils/common.utils");
const { CONSTANT } = require("../helper/constant");
const JwtService = require("../common/jwt.service");
const jwtService = new JwtService();

module.exports = class UserService {
  constructor() {
    this.userModel = User;
  }

  //---------------------------------------------- [ register ] -----------------------------------------------
  async register(body, file) {
    if (file) {
      body.image = `http://localhost:9090/${file.path.replace(/\\/g, "/")}`;
    }
    body.created_at = new Date();
    body.password = await encryptPassword(body.password);
    let user = await this.userModel.findOne({ email: body.email });
    if (user) {
      return errorResponse(
        StatusCodes.BAD_REQUEST,
        true,
        CONSTANT.EMAIL_ALREADY_INUSE
      );
    }
    user = await this.userModel.create(body);
    user.created_by = user._id;
    await user.save();
    user.password = undefined;
    return successResponse(
      StatusCodes.OK,
      false,
      CONSTANT.REGISTER_SUCCESS,
      user
    );
  }

  //------------------------------------------------ [ login ] ------------------------------------------------
  async login(body) {
    let user = await this.userModel
      .findOne({ email: body.email })
      .select("+password");
    if (!user) {
      return errorResponse(
        StatusCodes.BAD_REQUEST,
        true,
        CONSTANT.PLEASE_REGISTER
      );
    }
    if (!(await decryptPassword(body.password, user.password))) {
      return errorResponse(
        StatusCodes.BAD_REQUEST,
        true,
        CONSTANT.WRONG_CREDENTIALS
      );
    }
    let token = await jwtService.generateToken({
      userId: user._id,
      role: user.role,
    });
    user = {
      ...user._doc,
      token,
      password: undefined,
    };
    return successResponse(StatusCodes.OK, false, CONSTANT.LOGIN_SUCCESS, user);
  }

  //--------------------------------------------- [ update profile ] ------------------------------------------
  async updateProfile(params, body) {
    let user = await this.userModel.findById(params.id);
    if (!user) {
      return errorResponse(StatusCodes.BAD_REQUEST, true, CONSTANT.NOT_FOUND);
    }
    body.updated_at = new Date();
    body.updated_by = user._id;
    user = await this.userModel.findOneAndUpdate(user._id, body, { new: true });
    return successResponse(
      StatusCodes.OK,
      false,
      CONSTANT.UPDATE_SUCCESS,
      user
    );
  }

  //--------------------------------------------- [ delete profile ] ------------------------------------------
  async deleteProfile(params) {
    let user = await this.userModel.findById(params.id);
    if (!user) {
      return errorResponse(StatusCodes.BAD_REQUEST, true, CONSTANT.NOT_FOUND);
    }
    user = await this.userModel.findByIdAndDelete(user.id);
    return successResponse(StatusCodes.OK, false, CONSTANT.DELETE_SUCCESS);
  }

  //--------------------------------------------- [ get profile ] --------------------------------------------
  async getProfile(params) {
    let user = await this.userModel.findById(params.id);
    if (!user) {
      return errorResponse(StatusCodes.BAD_REQUEST, true, CONSTANT.NOT_FOUND);
    }
    return successResponse(StatusCodes.OK, false, CONSTANT.FOUND_SUCCESS, user);
  }

  //--------------------------------------------- [ get all profile ] --------------------------------------------
  async getAllProfile(query) {
    let page = query?.page ? parseInt(query?.page) : 1;
    let limit = query?.limit ? parseInt(query?.limit) : 5;
    let skip = (page - 1) * limit;
    const pipeline = [];

    if (query.search && query.search !== "") {
      pipeline.push({
        $match: {
          name: {
            $regex: new RegExp(query.search, "i"),
          },
        },
      });
    }
    // Filter functionality (example filters)
    if (query.minAge) {
      pipeline.push({
        $match: {
          age: { $gte: parseInt(query.minAge) },
        },
      });
    }
    if (query.maxAge) {
      pipeline.push({
        $match: {
          age: { $lte: parseInt(query.maxAge) },
        },
      });
    }
    pipeline.push(
      {
        $skip: skip,
      },
      {
        $limit: limit,
      }
    );
    let user = await this.userModel.aggregate(pipeline);
    return successResponse(StatusCodes.OK, false, CONSTANT.FOUND_SUCCESS, {
      data: user,
      totalCount: user.length,
    });
  }
};
