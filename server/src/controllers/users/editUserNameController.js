import updateUserNameModel from '../../models/users/updateUserNameModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserNameSchema from '../../schemas/users/editUserNameSchema.js';

const editUserNameController = async (req, res, next) => {
    try {
        const { newUsername } = req.body;

        const userId = req.user.id;

        await validateSchemaUtil(editUserNameSchema, req.body);

        await updateUserNameModel(newUsername, userId);

        res.send({
            status: 'ok',
            message: 'Username updated',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserNameController;
