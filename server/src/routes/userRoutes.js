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
} from '../controllers/users/index.js';

import { authUserController } from '../middlewares/index.js';

const router = express.Router();

router.post('/users/register', newUserController);

router.post('/users/login', loginUserController);

router.get('/users', authUserController, getOwnUserController);

router.get('/users/:userId', getPublicUserController);

router.put('/users/password', editUserPassController);

router.put('/users/avatar', authUserController, editUserAvatarController);

router.post('/users/password/recover', sendRecoverPassController);

router.put('/users/validate/:registrationCode', validateUserController);

export default router;
