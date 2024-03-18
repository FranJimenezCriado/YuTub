import getPool from '../../db/getPool.js';

const editVideoModel = async (videoId, description) => {
    const pool = await getPool();

    await pool.query(`UPDATE videos SET description = ? WHERE id = ?`, [
        description,
        videoId,
    ]);
};

export default editVideoModel;
