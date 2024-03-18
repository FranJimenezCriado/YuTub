import express from 'express';

import {
    newUserController,
    loginUserController,
    getOwnUserController,
    getPublicUserController,
    editUserAvatarController,
    editUserPassController,
    sendRecoverPassController,
    validateUserController,
    editUserEmailController,
    editUserNameController,
} from '../controllers/users/index.js';

import {
    authUserController,
    userExistsController,
} from '../middlewares/index.js';

const router = express.Router();

router.post('/users/register', newUserController);

router.put('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

router.get('/users/:userId', userExistsController, getPublicUserController);

router.get(
    '/users',
    authUserController,
    userExistsController,
    getOwnUserController,
);

router.put(
    '/users/username',
    authUserController,
    userExistsController,
    editUserNameController,
);

router.put(
    '/users/email',
    authUserController,
    userExistsController,
    editUserEmailController,
);

router.put(
    '/users/avatar',
    authUserController,
    userExistsController,
    editUserAvatarController,
);

router.post('/users/password/recover', sendRecoverPassController);

router.put('/users/password', editUserPassController);

export default router;
