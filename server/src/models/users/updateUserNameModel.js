import getPool from '../../db/getPool.js';

import selectUserByEmailModel from './selectUserByEmailModel.js';

import {
    notFoundError,
    usernameAlreadyExistsError,
} from '../../services/errorService.js';

const updateUserNameModel = async (newUsername, email) => {
    const pool = await getPool();

    const user = await selectUserByEmailModel(email);

    if (!user) {
        notFoundError('user');
    }

    const [users] = await pool.query('SELECT username FROM users');

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === newUsername) {
            usernameAlreadyExistsError();
        }
    }

    await pool.query(`UPDATE users SET username = ? WHERE id = ?`, [
        newUsername,
        user.id,
    ]);
};

export default updateUserNameModel;
