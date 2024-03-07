const joiErrorMessages = {
    'any.required': 'Field "{#key}" is required',
    'string.base': 'Value of "{#key}" must be a string',
    'string.empty': 'Field "{#key}" must not be empty',
    'number.base': 'Value of "{#key}" must be a number',
    'number.max': `File shouldn't be more than 5 MB`,
    'object.base': 'Value of "{#key}" must be an object',
    'any.only': 'Only jpeg or png images allowed',
    'string.email': 'Must give a valid email for "{#key}"',
    'string.pattern.base':
        'The password must has one capital letter, one lowercase letter, one number and a simbol for "{#key}"',
    'string.min': 'Field "{#key}" must have atleast {#limit} characters',
    'string.max': 'Field "{#key}" must not exceed {#limit} characters',
    'object.unknown': 'Not allowed to add extra fields on this object',
};

export default joiErrorMessages;
