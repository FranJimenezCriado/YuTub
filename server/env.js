import 'dotenv/config';

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    PORT,
    SECRET,
    UPLOADS_DIR,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CLIENT_URL,
} = process.env;

export {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    PORT,
    SECRET,
    UPLOADS_DIR,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CLIENT_URL,
};
