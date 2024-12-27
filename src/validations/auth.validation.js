import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('donor', 'receiver', 'admin').required(),
  location: Joi.string().required(),
  height: Joi.number().positive().required(),
  weight: Joi.number().positive().required(),
  imageUrl: Joi.string().uri().optional(),
  cnic: Joi.string().length(13).required(),
  isAvailable: Joi.boolean().optional(),
});
