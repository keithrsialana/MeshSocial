
import express from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

const router = express.Router();

// Use user routes
router.use('/users', userRoutes);

// Use thought routes
router.use('/thoughts', thoughtRoutes);

export default router;