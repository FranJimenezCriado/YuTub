import bcrypt from 'bcrypt';

import getPool from '../../db/getPool.js';

import sendMailUtil from '../../utils/sendMailUtil.js';

import {
    userAlreadyRegisteredError,
    emailAlreadyRegisteredError,
} from '../../services/errorService.js';

import { CLIENT_URL } from '../../../env.js';

const insertUserModel = async (
    id,
    username,
    email,
    password,
    registrationCode,
) => {
    const pool = await getPool();

    let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);

    if (users.length > 0) {
        userAlreadyRegisteredError();
    }

    [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

    if (users.length > 0) {
        emailAlreadyRegisteredError();
    }

    const emailSubject = 'Activate your user at Yutub';

    const emailBody = `
            ¡Welcome ${username}!
    
            Thanks for registering in the website. To activate your account, click on the next link:
    
            <a href="${CLIENT_URL}users/validate/${registrationCode}">Activate my account</a>
        `;

    await sendMailUtil(email, emailSubject, emailBody);

    const hashedPass = await bcrypt.hash(password, 10);

    await pool.query(
        `INSERT INTO users (id, username, email, password, registrationCode) VALUES (?, ?, ?, ?, ?)`,
        [id, username, email, hashedPass, registrationCode],
    );
};

export default insertUserModel;
