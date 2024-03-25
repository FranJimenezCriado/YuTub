import getPool from '../../db/getPool.js';

const deleteEntryModel = async (videoId) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM videolikes WHERE videoId = ?`, [videoId]);

    await pool.query(`DELETE FROM videocomments WHERE videoId = ?`, [videoId]);

    await pool.query(`DELETE FROM videos WHERE id = ?`, [videoId]);
};

export default deleteEntryModel;
