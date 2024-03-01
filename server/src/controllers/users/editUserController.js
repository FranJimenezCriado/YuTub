import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserModel from '../../models/users/updateUserModel.js';

import { missingFieldsError } from '../../services/errorService.js';

const editUserController = async (req, res, next) => {
    try {
        let { username, email } = req.body;

        if (!username && !email) {
            missingFieldsError();
        }

        const user = await selectUserByIdModel(req.user.id);

        username = username === user.username ? null : username;
        email = email === user.email ? null : email;

        await updateUserModel(username, email, req.user.id);

        res.send({
            status: 'ok',
            data: {
                user: {
                    username,
                    email,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserController;
