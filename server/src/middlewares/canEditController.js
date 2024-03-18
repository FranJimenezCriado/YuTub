import selectVideoByIdModel from '../models/videos/selectVideoByIdModel.js';

import { unauthorizedUserError } from '../services/errorService.js';

const canEditController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const video = await selectVideoByIdModel(videoId);

        if (video.userId !== req.user.id) {
            unauthorizedUserError();
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default canEditController;
