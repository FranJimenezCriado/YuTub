import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const getPublicUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await selectUserByIdModel(userId);

        delete user.email;

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPublicUserController;
