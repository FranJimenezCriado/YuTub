import getPool from '../../db/getPool.js';

import { notFoundError } from '../../services/errorService.js';

const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, password, role, recoverPassCode, active FROM users WHERE email = ?`,
        [email],
    );

    if (users.length < 1) {
        notFoundError('user');
    }

    return users[0];
};

export default selectUserByEmailModel;
