import Joi from 'joi';

export function validateNoteInput(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    text: Joi.string().max(300).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}