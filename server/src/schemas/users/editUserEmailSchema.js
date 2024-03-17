import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const editUserEmailSchema = joi.object({
    newEmail: joi.string().email().required().messages(joiErrorMessages),
    actualPass: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
        )
        .required()
        .messages(joiErrorMessages),
});

export default editUserEmailSchema;
