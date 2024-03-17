import getPool from '../../db/getPool.js';

const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, avatar, email FROM users WHERE id = ?`,
        [userId],
    );

    return users[0];
};

export default selectUserByIdModel;
