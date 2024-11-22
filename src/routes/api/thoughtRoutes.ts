import express from 'express';
import {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController.js';

const router = express.Router();

// Route to get all thoughts
router.get('/', getThoughts);

// Route to get a single thought by ID
router.get('/:thoughtId', getSingleThought);

// Route to create a new thought
router.post('/', createThought);

// Route to update a thought by ID
router.put('/:thoughtId', updateThought);

// Route to delete a thought by ID
router.delete('/:thoughtId', deleteThought);

export default router;