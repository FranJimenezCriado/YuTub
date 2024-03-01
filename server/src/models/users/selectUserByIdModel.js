import getPool from '../../db/getPool.js';

import { notFoundError } from '../../services/errorService.js';

const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, avatar, email FROM users WHERE id = ?`,
        [userId],
    );

    if (users.length < 1) {
        notFoundError('usuario');
    }

    return users[0];
};

export default selectUserByIdModel;
