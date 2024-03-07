import getPool from '../../db/getPool.js';

import { notFoundError } from '../../services/errorService.js';

const selectVideoByIdModel = async (videoId) => {
    const pool = await getPool();

    const [videos] = await pool.query(
        `
            SELECT 
                v.id,
                v.title,
                v.description,
                v.file,
                v.userId,
                u.username,
                AVG(IFNULL(vo.value, 0)) AS votes,
                v.createdAt
            FROM videos v
            INNER JOIN users u ON u.id = v.userId
            LEFT JOIN videoVotes vo ON vo.videoId = v.id
            WHERE v.id = ?
        `,
        [videoId],
    );

    if (videos.length < 1 || !videos[0].id) {
        notFoundError('entrada');
    }

    videos[0].votes = Number(videos[0].votes);

    return videos[0];
};

export default selectVideoByIdModel;
