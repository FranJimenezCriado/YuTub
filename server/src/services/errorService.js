export const cannotVoteOwnVideoError = () => {
    throw {
        httpStatus: 403, // Forbidden
        code: 'CANNOT_VOTE_OWN_VIDEO',
        message: `You can't vote your own video`,
    };
};

export const deleteFileError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'FILE_DELETED_FAILED',
        message: 'Error deleting the file',
    };
};

export const emailAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'Email already registered',
    };
};

export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid credentials',
    };
};

export const invalidTokenError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_TOKEN',
        message: 'Invalid token',
    };
};

export const missingFieldsError = () => {
    throw {
        httpStatus: 400, // Bad Request
        code: 'MISSING_FIELDS',
        message: 'Missing fields',
    };
};

export const notAuthenticatedError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'NOT_AUTHENTICATED',
        message: `You must send a token at header 'Authorization'`,
    };
};

export const notFoundError = (resource) => {
    throw {
        httpStatus: 404, // Not Found
        code: 'RESOURCE_NOT_FOUND',
        message: `The required resource '${resource}' doesn't exist`,
    };
};

export const notValidVoteError = () => {
    throw {
        httpStatus: 400, // Bad Request
        code: 'NOT_VALID_VOTE',
        message: 'Not a valid vote',
    };
};

export const videoLimitReachedError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'VIDEO_LIMIT_REACHED',
        message: 'You can only upload one video',
    };
};

export const recoveryCodeError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_RECOVERY_CODE',
        message: 'Recovery code incorrect',
    };
};

export const saveFileError = () => {
    throw {
        httpStatus: 500, // Internal Server Error
        code: 'FILE_SAVE_FAILED',
        message: 'Error saving the file',
    };
};

export const sendEmailError = () => {
    throw {
        httpStatus: 500, // Internal server error
        code: 'SEND_EMAIL_FAILED',
        message: 'Error al enviar email',
    };
};

export const userAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'USER_ALREADY_REGISTERED',
        message: 'Username already registered',
    };
};

export const unauthorizedUserError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'UNAUTHORIZED',
        message: 'Unauthorized to do this',
    };
};

export const voteAlreadyExistsError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'VOTE_ALREADY_EXISTS',
        message: 'You already voted this video',
    };
};
