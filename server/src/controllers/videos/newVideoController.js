import path from 'path';

import fs from 'fs/promises';

import insertVideoModel from '../../models/videos/insertVideoModel.js';

import { UPLOADS_DIR } from '../../../env.js';

import newVideoSchema from '../../schemas/videos/newVideoSchema.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

const newVideoController = async (req, res, next) => {
    try {
        await validateSchemaUtil(
            newVideoSchema,
            Object.assign(req.body, req.files),
        );

        const { title, description } = req.body;

        const file = req.files.file;

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

        const fileExt = path.extname(file.name);

        file.name = `${crypto.randomUUID()}${fileExt}`;

        const id = crypto.randomUUID();

        const videoName = file.name;

        const videoId = await insertVideoModel(
            id,
            title,
            description,
            file.name,
            req.user.id,
        );

        uploadsDir = path.join(process.cwd(), UPLOADS_DIR, 'videos', videoName);

        file.mv(uploadsDir, function () {
            res.status(201).send({
                status: 'ok',
                data: {
                    video: {
                        id: videoId,
                        title,
                        description,
                        videoName,
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
