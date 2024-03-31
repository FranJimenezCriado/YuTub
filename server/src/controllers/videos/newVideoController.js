import path from 'path';

import fs from 'fs/promises';

import sharp from 'sharp';

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

        const { title, category, description } = req.body;

        const file = req.files.file;

        const miniature = req.files.miniature;

        let uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

        try {
            await fs.access(uploadsDir);
        } catch {
            fs.mkdir(uploadsDir, function () {
                console.log(`Directory ${uploadsDir} created`);
            });
        }

        const sharpMiniature = sharp(miniature.data);

        sharpMiniature.resize(150);

        const imageExt = path.extname(miniature.name);

        const miniatureName = `${crypto.randomUUID()}${imageExt}`;

        const miniaturePath = path.join(uploadsDir, miniatureName);

        await sharpMiniature.toFile(miniaturePath);

        const fileExt = path.extname(file.name);

        file.name = `${crypto.randomUUID()}${fileExt}`;

        const id = crypto.randomUUID();

        const videoName = file.name;

        const videoId = await insertVideoModel(
            id,
            title,
            miniatureName,
            category,
            description,
            videoName,
            req.user.id,
        );

        uploadsDir = path.join(process.cwd(), UPLOADS_DIR, videoName);

        file.mv(uploadsDir, function () {
            console.log('Video uploaded!');
        });

        res.status(201).send({
            status: 'ok',
            data: {
                video: {
                    id: videoId,
                    title,
                    miniatureName,
                    category,
                    description,
                    videoName,
                    userId: req.user.id,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newVideoController;
