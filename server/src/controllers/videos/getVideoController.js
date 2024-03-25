import selectVideoByIdModel from '../../models/videos/selectVideoByIdModel.js';

import selectAllCommentsModel from '../../models/videos/selectAllCommentsModel.js';

const getVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const video = await selectVideoByIdModel(videoId);

        const comments = await selectAllCommentsModel(videoId);

        for (let i = 0; i < comments.length; i++) {
            video.comments = comments;
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
