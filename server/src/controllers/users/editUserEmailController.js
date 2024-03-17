import updateUserEmailModel from '../../models/users/updateUserEmailModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserEmailSchema from '../../schemas/users/editUserEmailSchema.js';

const editUserEmailController = async (req, res, next) => {
    try {
        const { newEmail, actualPass } = req.body;

        const userId = req.user.id;

        await validateSchemaUtil(editUserEmailSchema, req.body);

        await updateUserEmailModel(newEmail, userId, actualPass);

        res.send({
            status: 'ok',
            message: 'Email updated',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserEmailController;
