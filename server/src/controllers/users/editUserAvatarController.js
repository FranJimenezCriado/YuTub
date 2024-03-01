import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';

import { deletePhoto, savePhoto } from '../../services/photoService.js';

import { missingFieldsError } from '../../services/errorService.js';

const editUserAvatarController = async (req, res, next) => {
    try {
        const avatar = req.files?.avatar;

        if (!avatar) {
            missingFieldsError();
        }

        const user = await selectUserByIdModel(req.user.id);

        if (user.avatar) {
            await deletePhoto(user.avatar);
        }

        const avatarName = await savePhoto(avatar, 150);

        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            data: {
                avatar: {
                    name: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserAvatarController;
