import routes from './api/index.js';
import express from 'express';
const router = express.Router();

// Use the API routes
router.use('/api', routes);

export default router;