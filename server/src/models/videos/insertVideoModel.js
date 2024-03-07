import getPool from '../../db/getPool.js';

const insertVideoModel = async (id, title, description, file, userId) => {
    const pool = await getPool();

    const [video] = await pool.query(
        `INSERT INTO videos (id, title, description, file, userId) VALUES (?, ?, ?, ?, ?)`,
        [id, title, description, file, userId],
    );

    return video.insertId;
};

export default insertVideoModel;
