import getPool from '../../db/getPool.js';

const selectVideosModel = async () => {
    const pool = await getPool();

    // Obtenemos todas las entradas.
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
            GROUP BY v.id
            ORDER BY v.createdAt DESC
        `,
    );

    return videos;
};

export default selectVideosModel;
