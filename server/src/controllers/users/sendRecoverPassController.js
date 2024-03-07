import randomstring from 'randomstring';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import updateRecoverPassModel from '../../models/users/updateRecoverPassModel.js';

import { notFoundError } from '../../services/errorService.js';

const sendRecoverPassController = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Pendiente validación con Joi.

        const user = await selectUserByEmailModel(email);

        if (!user) {
            notFoundError('user');
        }

        const recoverPassCode = randomstring.generate(10);

        await updateRecoverPassModel(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Recover password sent to email',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoverPassController;
