import getPool from '../../db/getPool.js';

const deleteEntryModel = async (videoId) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM videoVotes WHERE videoId = ?`, [videoId]);

    await pool.query(`DELETE FROM videos WHERE id = ?`, [videoId]);
};

export default deleteEntryModel;
