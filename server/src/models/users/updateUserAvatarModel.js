import getPool from '../../db/getPool.js';
const updateUserAvatarModel = async (avatarName, userId) => {
    const pool = await getPool();

    // Actualizamos el avatar del usuario.
    await pool.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
        avatarName,
        userId,
    ]);
};

export default updateUserAvatarModel;
