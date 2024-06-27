const Joi = require("joi");

module.exports.userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": `name cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `email cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `password cannot be an empty field`,
    "any.required": `"password" is a required field`,
  }),
  mobile: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required()
    .messages({
      "string.empty": `mobile cannot be an empty field`,
      "any.required": `"mobile" is a required field`,
    }),
  age: Joi.number().required().min(0).max(100).messages({
    "string.empty": `age cannot be an empty field`,
    "any.required": `"age" is a required field`,
  }),
  address: Joi.array().items(
    Joi.object({
      addressLine: Joi.string().max(50).required(),
      state: Joi.string().max(15).required(),
      country: Joi.string().max(20).required(),
      zipCode: Joi.string().max(7).required(),
    })
  ),
  image: Joi.string().optional(),
  role: Joi.string().optional(),
});

module.exports.userloginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": `email cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `password cannot be an empty field`,
    "any.required": `"password" is a required field`,
  }),
});

module.exports.userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages({
    "string.empty": `name cannot be an empty field`,
  }),
  email: Joi.string().email().optional().messages({
    "string.empty": `email cannot be an empty field`,
  }),
  password: Joi.string().optional().messages({
    "string.empty": `password cannot be an empty field`,
  }),
  mobile: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .optional()
    .messages({
      "string.empty": `mobile cannot be an empty field`,
    }),
  age: Joi.number().optional().min(0).max(100).messages({
    "string.empty": `age cannot be an empty field`,
  }),
  address: Joi.array().items(
    Joi.object({
      addressLine: Joi.string().max(50).optional(),
      state: Joi.string().max(15).optional(),
      country: Joi.string().max(20).optional(),
      zipCode: Joi.string().max(7).optional(),
    })
  ),
  image: Joi.string().optional(),
  role: Joi.string().optional(),
});
