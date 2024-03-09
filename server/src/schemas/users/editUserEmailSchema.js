import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const editUserEmailSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
    newEmail: joi.string().email().required().messages(joiErrorMessages),
});

export default editUserEmailSchema;
