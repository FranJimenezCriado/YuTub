import getPool from '../../db/getPool.js';

import sendMailUtil from '../../utils/sendMailUtil.js';

const updateRecoverPassModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);

    const emailSubject = 'Password recover';

    const emailBody = `
            Recover password has been requested for this email. 
                
            Use the following code to create a new password: ${recoverPassCode}

            If it wasn't you, ignore this email.
        `;

    await sendMailUtil(email, emailSubject, emailBody);
};

export default updateRecoverPassModel;
