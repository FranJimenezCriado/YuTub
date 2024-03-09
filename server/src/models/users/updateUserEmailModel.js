import getPool from '../../db/getPool.js';

import selectUserByEmailModel from './selectUserByEmailModel.js';

import {
    notFoundError,
    emailAlreadyRegisteredError,
} from '../../services/errorService.js';

const updateUserPassModel = async (email, newEmail) => {
    const pool = await getPool();

    const user = await selectUserByEmailModel(email);

    if (!user) {
        notFoundError('user');
    }

    const [users] = await pool.query('SELECT email FROM users');

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === newEmail) {
            emailAlreadyRegisteredError();
        }
    }

    await pool.query(`UPDATE users SET email = ? WHERE email = ?`, [
        newEmail,
        email,
    ]);
};

export default updateUserPassModel;
