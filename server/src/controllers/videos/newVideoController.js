import path from 'path';

import fs from 'fs/promises';

import insertVideoModel from '../../models/videos/insertVideoModel.js';

import { UPLOADS_DIR } from '../../../env.js';

import { missingFieldsError } from '../../services/errorService.js';

const newVideoController = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const file = req.files.file;

        if (!title || !description || !file) {
            missingFieldsError();
        }

        let uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

        try {
            await fs.access(uploadsDir);
        } catch {
            fs.mkdir(uploadsDir, function () {
                console.log(`Directory ${uploadsDir} created`);
            });
        }

        try {
            uploadsDir = path.join(process.cwd(), UPLOADS_DIR, 'videos');

            await fs.access(uploadsDir);
        } catch {
            fs.mkdir(uploadsDir, function () {
                console.log(`Directory ${uploadsDir} created`);
            });
        }

        const video = [];

        file.name = `${crypto.randomUUID()}.mp4`;

        const id = crypto.randomUUID();

        const videoName = file.name;

        const videoId = await insertVideoModel(
            id,
            title,
            description,
            file.name,
            req.user.id,
        );

        video.push({
            id: videoId,
            name: videoName,
        });

        uploadsDir = path.join(process.cwd(), UPLOADS_DIR, 'videos', videoName);

        file.mv(uploadsDir, function () {
            res.status(201).send({
                status: 'ok',
                data: {
                    video: {
                        id: videoId,
                        title,
                        description,
                        video,
                        userId: req.user.id,
                        createdAt: new Date(),
                    },
                },
            });
        });
    } catch (err) {
        next(err);
    }
};

export default newVideoController;
