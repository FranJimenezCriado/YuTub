import updateUserRegCodeModel from '../../models/users/updateUserRegCodeModel.js';

const validateUserController = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

        console.log(registrationCode);

        await updateUserRegCodeModel(registrationCode);

        res.send({
            status: 'ok',
            message: 'User activated',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;
