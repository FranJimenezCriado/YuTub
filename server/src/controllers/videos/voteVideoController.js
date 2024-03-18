import selectVideoByIdModel from '../../models/videos/selectVideoByIdModel.js';
import insertLikeModel from '../../models/videos/insertLikeModel.js';
import insertDisLikeModel from '../../models/videos/insertDisLikeModel.js';

import { cannotVoteOwnVideoError } from '../../services/errorService.js';

const voteVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const { like, dislike } = req.body;

        const video = await selectVideoByIdModel(videoId);

        if (video.userId === req.user.id) {
            cannotVoteOwnVideoError();
        }

        let likes;

        if (like) {
            likes = await insertLikeModel(videoId, req.user.id);
        }

        let dislikes;

        if (dislike) {
            dislikes = await insertDisLikeModel(videoId, req.user.id);
        }

        res.status(201).send({
            status: 'ok',
            data: {
                video: {
                    likes: likes,
                    dislikes: dislikes,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default voteVideoController;
