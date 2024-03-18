import getPool from '../../db/getPool.js';

import { usernameAlreadyExistsError } from '../../services/errorService.js';

const updateUserNameModel = async (newUsername, userId) => {
    const pool = await getPool();

    const [users] = await pool.query('SELECT username FROM users');

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === newUsername) {
            usernameAlreadyExistsError();
        }
    }

    await pool.query(`UPDATE users SET username = ? WHERE id = ?`, [
        newUsername,
        userId,
    ]);
};

export default updateUserNameModel;
