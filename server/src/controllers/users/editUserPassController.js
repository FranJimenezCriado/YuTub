import updateUserPassModel from '../../models/users/updateUserPassModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserPassSchema from '../../schemas/users/editUserPassSchema.js';

const editUserPassController = async (req, res, next) => {
    try {
        const { email, recoverPassCode, newPass } = req.body;

        await validateSchemaUtil(editUserPassSchema, req.body);

        await updateUserPassModel(email, recoverPassCode, newPass);

        res.send({
            status: 'ok',
            message: 'Password updated',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserPassController;
