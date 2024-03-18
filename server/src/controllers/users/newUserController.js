import randomstring from 'randomstring';

import insertUserModel from '../../models/users/insertUserModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import newUserSchema from '../../schemas/users/newUserSchema.js';

const newUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await validateSchemaUtil(newUserSchema, req.body);

        const registrationCode = randomstring.generate(30);

        const id = crypto.randomUUID();

        await insertUserModel(id, username, email, password, registrationCode);

        res.status(201).send({
            status: 'ok',
            message:
                'User created. Please, verify your user through email verification',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
