import deleteCommentModel from '../../models/videos/deleteCommentModel.js';

const deleteCommentVideoController = async (req, res, next) => {
    try {
        const { videoId, commentId } = req.params;

        await deleteCommentModel(videoId, commentId);

        res.status(201).send({
            status: 'ok',
            message: 'Deleted comment',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteCommentVideoController;
