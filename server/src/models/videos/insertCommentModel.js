import getPool from '../../db/getPool.js';

const insertCommentModel = async (comment, videoId, userId) => {
    const pool = await getPool();

    await pool.query(
        `INSERT INTO videocomments (comment, videoId, userId) VALUES (?, ?, ?)`,
        [comment, videoId, userId],
    );

    const [commentDone] = await pool.query(
        `SELECT comment FROM videocomments WHERE videoId = ? AND comment = ?`,
        [videoId, comment],
    );

    return commentDone[0];
};

export default insertCommentModel;
