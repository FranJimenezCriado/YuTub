import joi from 'joi';

import videoSchema from './videoSchema.js';

import joiErrorMessages from '../joiErrorMessages.js';

const newVideoSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(10)
        .max(500)
        .required()
        .messages(joiErrorMessages),
    file: videoSchema.required(),
});

export default newVideoSchema;
