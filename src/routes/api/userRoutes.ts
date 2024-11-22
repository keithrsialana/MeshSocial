import express from 'express';
import {
    getUsers,
    getSingleUser ,
    createUser ,
    updateUser ,
    deleteUser, 
    addFriend,
    deleteFriend
} from '../../controllers/userController.js';

const router = express.Router();

// Route to get all users
router.get('/', getUsers);

// Route to create a new user
router.post('/', createUser );

// Route to get a single user by ID
router.get('/:userId', getSingleUser );

// Route to update a user by ID
router.put('/:userId', updateUser );

// Route to delete a user by ID
router.delete('/:userId', deleteUser );

// Routes for friends
router.post('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', deleteFriend);

export default router;