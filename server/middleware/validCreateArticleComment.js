/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
// article comment validation
export const validCreateArticleComment = (req, res, next) => {
  const schema = {

    comment: Joi.string().required(),

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
