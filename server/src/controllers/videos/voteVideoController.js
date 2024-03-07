import selectVideoByIdModel from '../../models/videos/selectVideoByIdModel.js';
import insertVoteModel from '../../models/videos/insertVoteModel.js';

import {
    cannotVoteOwnVideoError,
    missingFieldsError,
    notValidVoteError,
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

        const validVotes = [1, 2, 3, 4, 5];

        if (!validVotes.includes(value)) {
            notValidVoteError();
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