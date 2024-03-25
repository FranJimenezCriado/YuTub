import selectAllVideosModel from '../../models/videos/selectAllVideosModel.js';

import selectAllCommentsModel from '../../models/videos/selectAllCommentsModel.js';

import { notFoundError } from '../../services/errorService.js';

const listVideosController = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const videos = await selectAllVideosModel(keyword);

        if (!videos[0]) {
            notFoundError('video');
        }

        const comments = await selectAllCommentsModel(videos[0].id);

        for (let i = 0; i < comments.length; i++) {
            videos[0].comments = comments;
        }

        res.send({
            status: 'ok',
            data: {
                videos,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listVideosController;
