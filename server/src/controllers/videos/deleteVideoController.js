import selectVideoByIdModel from '../../models/videos/selectVideoByIdModel.js';
import deleteVideoModel from '../../models/videos/deleteVideoModel.js';
import deleteDataModel from '../../models/videos/deleteDataModel.js';

import { unauthorizedUserError } from '../../services/errorService.js';

const deleteVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const video = await selectVideoByIdModel(videoId);

        if (video.userId !== req.user.id && req.user.role !== 'admin') {
            unauthorizedUserError();
        }

        await deleteDataModel(videoId);

        await deleteVideoModel(videoId);

        res.send({
            status: 'ok',
            message: 'Deleted video',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteVideoController;
