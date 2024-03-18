import editVideoModel from '../../models/videos/editVideoModel.js';

const editVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const { description } = req.body;

        await editVideoModel(videoId, description);

        res.send({
            status: 'ok',
            message: 'Description edited',
        });
    } catch (err) {
        next(err);
    }
};

export default editVideoController;
