const express = require("express");
const { validateSchema } = require("../middleware/joiValidation.middleware");
const {
  userRegisterSchema,
  userloginSchema,
  userUpdateSchema,
} = require("../validation/user.validation");
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfile,
} = require("../controllers/user.controller");
const MulterService = require("../common/multer.service");
const {
  checkUserRoleMiddleware,
} = require("../middleware/auth/auth.middleware");
const multerService = new MulterService();
const router = express.Router();

router.post(
  "/register",
  multerService.singleFileUpload("image"),
  validateSchema(userRegisterSchema, "body"),
  register.controller
);

router.post(
  "/login",
  validateSchema(userloginSchema, "body"),
  login.controller
);

router.put(
  "/update/:id",
  multerService.singleFileUpload("image"),
  validateSchema(userUpdateSchema, "body"),
  updateProfile.controller
);

router.delete("/delete/:id", deleteProfile.controller);

router.get("/get/:id", getProfile.controller);

router.get(
  "/getall",
  checkUserRoleMiddleware(["admin", "user"]),
  getAllProfile.controller
);

module.exports = router;
