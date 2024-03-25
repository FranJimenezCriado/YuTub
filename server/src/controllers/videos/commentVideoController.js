import insertCommentModel from '../../models/videos/insertCommentModel.js';

const commentVideoController = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const { comment } = req.body;

        const commentDone = await insertCommentModel(
            comment,
            videoId,
            req.user.id,
        );

        res.status(201).send({
            status: 'ok',
            data: {
                video: {
                    commentDone,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default commentVideoController;
