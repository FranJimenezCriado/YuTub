import bcrypt from 'bcrypt';

import getPool from '../../db/getPool.js';

import {
    emailAlreadyRegisteredError,
    invalidCredentialsError,
} from '../../services/errorService.js';

const updateUserPassModel = async (newEmail, userId, actualPass) => {
    const pool = await getPool();

    let validPass;

    const [user] = await pool.query('SELECT * FROM users');

    for (let i = 0; i < user.length; i++) {
        if (user[i].email === newEmail) {
            emailAlreadyRegisteredError();
        }

        if (userId === user[i].id) {
            validPass = await bcrypt.compare(actualPass, user[i].password);
        }

        if (!validPass) {
            invalidCredentialsError();
        }
    }

    await pool.query(`UPDATE users SET email = ? WHERE id = ?`, [
        newEmail,
        userId,
    ]);
};

export default updateUserPassModel;
