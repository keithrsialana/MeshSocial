
import express from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
import reactionRoutes from './reactionRoutes.js';

const router = express.Router();

// Use user routes
router.use('/users', userRoutes);

// Use thought routes
router.use('/thoughts', thoughtRoutes);

// Use reaction routes
router.use('/reactions', reactionRoutes);

export default router;