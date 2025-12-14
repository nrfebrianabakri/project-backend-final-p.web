import Joi from "joi";

export const createLoanSchema = Joi.object({
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
});

export const updateLoanSchema = Joi.object({
  userId: Joi.number(),
  bookId: Joi.number(),
});
