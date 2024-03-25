import getPool from '../../db/getPool.js';

const insertVideoModel = async (
    id,
    title,
    category,
    description,
    file,
    userId,
) => {
    const pool = await getPool();

    await pool.query(
        `INSERT INTO videos (id, title, category, description, file, userId) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, title, category, description, file, userId],
    );

    return id;
};

export default insertVideoModel;
