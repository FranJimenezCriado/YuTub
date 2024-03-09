import updateUserPassModel from '../../models/users/updateUserPassModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserPassSchema from '../../schemas/users/editUserPassSchema.js';

import { samePasswordError } from '../../services/errorService.js';

const editUserPassController = async (req, res, next) => {
    try {
        const { email, password, newPass, recoverPassCode } = req.body;

        await validateSchemaUtil(editUserPassSchema, req.body);

        if (password === newPass) {
            samePasswordError();
        }

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
