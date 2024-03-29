import express from 'express';

import userRoutes from './userRoutes.js';
import vidRoutes from './vidRoutes.js';

const router = express.Router();

router.use(userRoutes);
router.use(vidRoutes);

export default router;
