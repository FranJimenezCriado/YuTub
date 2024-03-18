import getPool from '../../db/getPool.js';

import { voteAlreadyExistsError } from '../../services/errorService.js';

const insertVoteModel = async (videoId, userId) => {
    const pool = await getPool();

    let nothing;

    const [votes] = await pool.query(
        `SELECT id FROM videolikes WHERE videoId = ? AND userId = ?`,
        [videoId, userId],
    );

    if (votes.length > 0) {
        voteAlreadyExistsError();
    }

    await pool.query(
        `INSERT INTO videolikes (likes, dislikes, videoId, userId) VALUES (?, ?, ?, ?)`,
        [1, nothing, videoId, userId],
    );

    const [totalLikes] = await pool.query(
        `SELECT COUNT(likes) AS Likes FROM videolikes WHERE videoId = ?`,
        [videoId],
    );

    return Number(totalLikes[0].Likes);
};

export default insertVoteModel;
