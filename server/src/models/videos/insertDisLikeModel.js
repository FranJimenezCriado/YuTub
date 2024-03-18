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
        [nothing, 1, videoId, userId],
    );

    const [totalDisLikes] = await pool.query(
        `SELECT COUNT(dislikes) AS Dislikes FROM videolikes WHERE videoId = ?`,
        [videoId],
    );

    return Number(totalDisLikes[0].Dislikes);
};

export default insertVoteModel;
