import getPool from '../../db/getPool.js';

const insertVideoModel = async (id, title, description, file, userId) => {
    const pool = await getPool();

    await pool.query(
        `INSERT INTO videos (id, title, description, file, userId) VALUES (?, ?, ?, ?, ?)`,
        [id, title, description, file, userId],
    );

    return id;
};

export default insertVideoModel;
