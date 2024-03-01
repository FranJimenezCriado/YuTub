import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

import {
    missingFieldsError,
    invalidCredentialsError,
} from '../../services/errorService.js';

import { SECRET } from '../../../env.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            missingFieldsError();
        }

        const user = await selectUserByEmailModel(email);

        let validPass;

        if (user) {
            validPass = await bcrypt.compare(password, user.password);
        }

        if (!user || !validPass) {
            invalidCredentialsError();
        }

        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '7d',
        });

        res.status(201).send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
