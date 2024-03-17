import getPool from '../db/getPool.js';

import { notFoundError } from '../services/errorService.js';

const videoExistsController = async (req, res, next) => {
    try {
        const pool = await getPool();

        const { videoId } = req.params;

        const [videos] = await pool.query(
            `SELECT id FROM videos WHERE id = ?`,
            [videoId],
        );

        if (videos.length < 1) {
            notFoundError('video');
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default videoExistsController;
