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
                role ENUM('admin', 'normal') DEFAULT 'normal',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS videos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description TEXT NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        // Tabla de votos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS videoVotes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                value TINYINT UNSIGNED NOT NULL,
                userId INT UNSIGNED NOT NULL,
                videoId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (videoId) REFERENCES videos(id)
            )
        `);

        console.log('¡Tablas creadas!');

        // Cerramos el proceso con código 0 indicando que todo ha ido bien.
        process.exit(0);
    } catch (err) {
        console.error(err);

        // Cerramos el proceso con código 1 indicando que hubo un error.
        process.exit(1);
    }
};

// Llamamos a la función anterior.
createTables();
