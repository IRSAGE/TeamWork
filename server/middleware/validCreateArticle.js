/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
// article validation
export const validcreateArticle = (req, res, next) => {
  const schema = {
    title: Joi.string().required(),
    article: Joi.string().required(),
    category: Joi.string().required(),
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
