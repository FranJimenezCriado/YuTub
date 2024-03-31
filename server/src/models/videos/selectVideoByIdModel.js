import getPool from '../../db/getPool.js';

import { notFoundError } from '../../services/errorService.js';

const selectVideoByIdModel = async (videoId) => {
    const pool = await getPool();

    const [videos] = await pool.query(
        `
            SELECT 
                v.id,
                v.title,
                v.miniature,
                v.category,
                v.description,
                v.file,
                v.userId,
                u.username,
                COUNT(likes) AS Likes,
                COUNT(dislikes) AS Dislikes,
                v.createdAt
            FROM videos v
            INNER JOIN users u ON u.id = v.userId
            LEFT JOIN videolikes vo ON vo.videoId = v.id
            LEFT JOIN videoComments vc ON vc.videoId = v.id
            WHERE v.id = ?
        `,
        [videoId],
    );

    if (videos.length < 1 || !videos[0].id) {
        notFoundError('video');
    }

    return videos[0];
};

export default selectVideoByIdModel;
