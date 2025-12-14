import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().allow(null, ""),
  categoryId: Joi.number().required(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  description: Joi.string().allow(null, ""),
  categoryId: Joi.number(),
});
