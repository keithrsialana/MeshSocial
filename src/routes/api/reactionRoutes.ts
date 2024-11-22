import express from 'express';
import {
    getReactions,
    getSingleReaction,
    createReaction,
    updateReaction,
    deleteReaction
} from '../../controllers/reactionController.js';

const router = express.Router();

// Route to get all reactions
router.get('/', getReactions);

// Route to get a single reaction by ID
router.get('/:reactionId', getSingleReaction);

// Route to create a new reaction
router.post('/', createReaction);

// Route to update a reaction by ID
router.put('/:reactionId', updateReaction);

// Route to delete a reaction by ID
router.delete('/:reactionId', deleteReaction);

export default router;