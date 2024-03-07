import express from 'express';

import {
    newVideoController,
    listVideosController,
    getVideoController,
    deleteVideoController,
    voteVideoController,
} from '../controllers/videos/index.js';

import { authUserController } from '../middlewares/index.js';

const router = express.Router();

router.post('/videos', authUserController, newVideoController);

router.get('/videos', listVideosController);

router.get('/videos/:videoId', getVideoController);

router.post('/videos/:videoId/votes', authUserController, voteVideoController);

router.delete('/videos/:videoId', authUserController, deleteVideoController);

export default router;
