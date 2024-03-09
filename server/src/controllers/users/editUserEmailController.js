import updateUserEmailModel from '../../models/users/updateUserEmailModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserEmailSchema from '../../schemas/users/editUserEmailSchema.js';

const editUserEmailController = async (req, res, next) => {
    try {
        const { email, newEmail } = req.body;

        await validateSchemaUtil(editUserEmailSchema, req.body);

        await updateUserEmailModel(email, newEmail);

        res.send({
            status: 'ok',
            message: 'Email updated',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserEmailController;
