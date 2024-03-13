import getPool from './getPool.js';

const createTables = async () => {
    try {
        const pool = await getPool();

        console.log('Dropping tables...');

        await pool.query('DROP TABLE IF EXISTS videoVotes, videos, users');

        console.log('Creating tables...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS videos (
                id VARCHAR(100) PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                description TEXT NOT NULL,
                file VARCHAR(100) NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS videoLikes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                value TINYINT UNSIGNED NOT NULL,
                userId INT UNSIGNED NOT NULL,
                videoId VARCHAR(100) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (videoId) REFERENCES videos(id)
            )
        `);

        console.log('Tables created!');

        process.exit(0);
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
};

// Llamamos a la función anterior.
createTables();
