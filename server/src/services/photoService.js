import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

import { UPLOADS_DIR } from '../../env.js';

import { deleteFileError, saveFileError } from './errorService.js';

export const savePhoto = async (file, width) => {
    try {
        let uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

        try {
            await fs.access(uploadsDir);
        } catch {
            fs.mkdir(uploadsDir, function () {
                console.log(`Directory ${uploadsDir} created`);
            });
        }

        try {
            uploadsDir = path.join(process.cwd(), UPLOADS_DIR, 'images');

            await fs.access(uploadsDir);
        } catch {
            fs.mkdir(uploadsDir, function () {
                console.log(`Directory ${uploadsDir} created`);
            });
        }

        const sharpImg = sharp(file.data);

        sharpImg.resize(width);

        const imgName = `${crypto.randomUUID()}.png`;

        uploadsDir = path.join(process.cwd(), UPLOADS_DIR, 'images');

        const imgPath = path.join(uploadsDir, imgName);

        await sharpImg.toFile(imgPath);

        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError();
    }
};

export const deletePhoto = async (imgName) => {
    try {
        const imgPath = path.join(
            process.cwd(),
            UPLOADS_DIR,
            'images',
            imgName,
        );

        try {
            await fs.access(imgPath);
        } catch {
            return;
        }

        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        deleteFileError();
    }
};
