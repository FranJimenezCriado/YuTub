import getPool from '../../db/getPool.js';

const selectVideosModel = async (keyword = '', userId = '') => {
    const pool = await getPool();

    // Obtenemos todas las entradas.
    const [videos] = await pool.query(
        `
            SELECT 
                v.id,
                v.title,
                v.category,
                v.description,
                v.file,
                v.userId = ? AS owner,
                u.username,
                COUNT(likes) AS Likes,
                COUNT(dislikes) AS Dislikes,
                v.createdAt
            FROM videos v
            INNER JOIN users u ON u.id = v.userId
            LEFT JOIN videoLikes vo ON vo.videoId = v.id
            LEFT JOIN videoComments vc ON vc.videoId = v.id
            WHERE v.title LIKE ? OR v.description LIKE ?
            GROUP BY v.id
            ORDER BY v.createdAt DESC
        `,
        [userId, `%${keyword}%`, `%${keyword}%`],
    );

    return videos;
};

export default selectVideosModel;
