import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])"))
    .required()
    .messages({
      "string.min": "Password minimal 8 karakter",
      "string.pattern.base":
        "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
