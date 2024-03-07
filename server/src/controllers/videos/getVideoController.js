import selectVideoByIdModel from '../../models/videos/selectVideoByIdModel.js';

import { notFoundError } from '../../services/errorService.js';

const getVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const video = await selectVideoByIdModel(videoId);

        if (!video.id) {
            notFoundError('video');
        }

        res.send({
            status: 'ok',
            data: {
                video,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getVideoController;
