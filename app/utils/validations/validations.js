const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    username: Joi.string().required().label("User Name"),
    user_role: Joi.string().required(),
    phone_no: Joi.string().required(),
    address: Joi.string().required(),
    nrc: Joi.string().required(),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    borrowed_books: Joi.array(),
  });
  return schema.validate(body);
};

module.exports = { signUpBodyValidation };
