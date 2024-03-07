import fs from 'fs';

import path from 'path';

import getPool from '../../db/getPool.js';

import { UPLOADS_DIR } from '../../../env.js';

const deleteDataModel = async (videoId) => {
    const pool = await getPool();

    const [videoName] = await pool.query(
        `SELECT file FROM videos WHERE id = ?`,
        [videoId],
    );

    const uploadsDir = path.join(process.cwd(), UPLOADS_DIR, videoName[0].file);

    fs.unlink(uploadsDir, function () {});
};

export default deleteDataModel;
