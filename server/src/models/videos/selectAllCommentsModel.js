import getPool from '../../db/getPool.js';

const insertCommentModel = async (videoId) => {
    const pool = await getPool();

    const [comments] = await pool.query(
        `SELECT comment FROM videocomments WHERE videoId = ?`,
        [videoId],
    );

    return comments;
};

export default insertCommentModel;
