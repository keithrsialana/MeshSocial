import express from 'express';
import {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getSingleThoughtReactions,
    createReaction,
    deleteReaction,
} from '../../controllers/thoughtController.js';

const router = express.Router();

// Route to get all thoughts
router.get('/', getThoughts);
// Route to create a new thought
router.post('/', createThought);

// Route to get a single thought by ID
router.get('/:thoughtId', getSingleThought);
// Route to update a thought by ID
router.put('/:thoughtId', updateThought);
// Route to delete a thought by ID
router.delete('/:thoughtId', deleteThought);

// Route to get all reactions by thought ID
router.get('/:thoughtId/reactions', getSingleThoughtReactions);
// Route to add a reaction to thought
router.post('/:thoughtId/reactions', createReaction);
// Route to delete a reaction
router.delete('/:thoughtId/reactions', deleteReaction);

export default router;