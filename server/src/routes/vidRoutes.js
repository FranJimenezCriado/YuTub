import express from 'express';

import {
    authUserController,
    userExistsController,
    authUserOptionalController,
    videoExistsController,
    canEditController,
} from '../middlewares/index.js';

import {
    newVideoController,
    listVideosController,
    getVideoController,
    deleteVideoController,
    voteVideoController,
    editVideoController,
} from '../controllers/videos/index.js';

const router = express.Router();

router.post(
    '/videos',
    authUserController,
    userExistsController,
    newVideoController,
);

router.post(
    '/videos/:videoId/edit',
    authUserController,
    userExistsController,
    videoExistsController,
    canEditController,
    editVideoController,
);

router.get('/videos', authUserOptionalController, listVideosController);

router.get(
    '/videos/:videoId',
    authUserOptionalController,
    videoExistsController,
    getVideoController,
);

router.post(
    '/videos/:videoId/votes',
    authUserController,
    userExistsController,
    videoExistsController,
    voteVideoController,
);

router.delete('/videos/:videoId', authUserController, deleteVideoController);

export default router;
