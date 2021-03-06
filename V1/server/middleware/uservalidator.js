/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
// user signup validation
export const validsignUp = (req, res, next) => {
  const schema = {
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().trim().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    gender: Joi.string().valid('male', 'female').required(),
    jobRole: Joi.string().trim().required(),
    department: Joi.string().trim().alphanum().required(),
    address: Joi.string().trim().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return res.status(400).send(
      {
        status: 400,
        error: result.error.details[0].message,
      },
    );
  }
  next();
};

// user sighin validation
export const validsignin = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return res.status(400).send(
      {
        status: 400,
        error: result.error.details[0].message,
      },
    );
  }
  next();
};
