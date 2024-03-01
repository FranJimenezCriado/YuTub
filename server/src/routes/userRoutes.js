import express from 'express';

import {
    newUserController,
    loginUserController,
    getOwnUserController,
    getPublicUserController,
    editUserController,
    editUserAvatarController,
} from '../controllers/users/index.js';

import { authUserController } from '../middlewares/index.js';

const router = express.Router();

router.post('/users/register', newUserController);

router.post('/users/login', loginUserController);

router.get('/users', authUserController, getOwnUserController);

router.get('/users/:userId', getPublicUserController);

router.put('/users', authUserController, editUserController);

router.put('/users/avatar', authUserController, editUserAvatarController);

export default router;
