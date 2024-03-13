import selectVideoByIdModel from '../../models/videos/selectVideoByIdModel.js';
import insertVoteModel from '../../models/videos/insertVoteModel.js';

import {
    cannotVoteOwnVideoError,
    missingFieldsError,
} from '../../services/errorService.js';

const voteVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const { value } = req.body;

        const video = await selectVideoByIdModel(videoId);

        if (video.userId === req.user.id) {
            cannotVoteOwnVideoError();
        }

        if (!value) {
            missingFieldsError();
        }

        const votesAvg = await insertVoteModel(value, videoId, req.user.id);

        res.status(201).send({
            status: 'ok',
            data: {
                entry: {
                    votes: votesAvg,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default voteVideoController;
