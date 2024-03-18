import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const videoSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('video/mp4', 'video/x-matroska', 'video/x-flv')
            .required()
            .messages(joiErrorMessages),
        size: joi
            .number()
            .max(50000000000)
            .required()
            .messages(joiErrorMessages),
    })
    .unknown(true);

export default videoSchema;
