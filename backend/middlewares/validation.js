import { celebrate, Joi } from 'celebrate';
import validator from 'validator';

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The email filed must be a valid email')
      .messages({
        'string.empty': 'The "email" filed must be filled in',
      }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
  }),
});

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The email filed must be a valid email')
      .messages({
        'string.empty': 'The "email" filed must be filled in',
      }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The minimum lenght of the "name" field is 2',
      'string.max': 'The maximum lenght of the "name" field is 30',
      'string.empty': 'The "name" filed must be filled in',
    }),
  }),
});
