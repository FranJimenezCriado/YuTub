import selectAllVideosModel from '../../models/videos/selectAllVideosModel.js';

const listVideosController = async (req, res, next) => {
    try {
        const videos = await selectAllVideosModel();

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
