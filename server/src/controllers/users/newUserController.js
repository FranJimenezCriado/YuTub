import insertUserModel from '../../models/users/insertUserModel.js';

import { missingFieldsError } from '../../services/errorService.js';

const newUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            missingFieldsError();
        }

        await insertUserModel(username, email, password);

        res.status(201).send({
            status: 'ok',
            message: 'User created',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
