import selectVideoByIdModel from '../../models/videos/selectVideoByIdModel.js';

const getVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const video = await selectVideoByIdModel(videoId);

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
