import getPool from '../../db/getPool.js';

import { voteAlreadyExistsError } from '../../services/errorService.js';

const insertVoteModel = async (value, videoId, userId) => {
    const pool = await getPool();

    const [votes] = await pool.query(
        `SELECT id FROM videoVotes WHERE videoId = ? AND userId = ?`,
        [videoId, userId],
    );

    if (votes.length > 0) {
        voteAlreadyExistsError();
    }

    await pool.query(
        `INSERT INTO videoVotes (value, videoId, userId) VALUES (?, ?, ?)`,
        [value, videoId, userId],
    );

    const [votesAvg] = await pool.query(
        `SELECT AVG(value) AS avg FROM videoVotes WHERE videoId = ?`,
        [videoId],
    );

    return Number(votesAvg[0].avg);
};

export default insertVoteModel;
