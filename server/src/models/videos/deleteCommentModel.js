import getPool from '../../db/getPool.js';

const deleteCommentModel = async (videoId, commentId) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM videocomments WHERE videoId = ? AND id = ?`, [
        videoId,
        commentId,
    ]);
};

export default deleteCommentModel;
