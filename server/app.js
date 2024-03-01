import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';

import { PORT, UPLOADS_DIR } from './env.js';

import routes from './src/routes/index.js';

import {
    errorController,
    notFoundController,
} from './src/controllers/errors/index.js';

const app = express();

app.use(express.json());

app.use(fileUpload());

app.use(express.static(UPLOADS_DIR));

app.use(cors());

app.use(morgan('dev'));

app.use(routes);

app.use(errorController);

app.use(notFoundController);

app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`);
});
