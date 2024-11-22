import { ObjectId } from "mongoose";
import User from "../models/User.js";
import { Request, Response } from "express";

export const getUsers = async (_req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getSingleUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ _id: req.params.userId }).select("-__v");

		if (!user) {
			res.status(404).json({ message: "No user with that ID" });
		} else {
			res.json(user);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    // TODO: Make sure to figure out how to create while honoring unique constraints
	try {
        const {username, email} = req.body;
        const user = {username, email};
		const dbUserData = await User.create(user);
		res.json(dbUserData);
	} catch (err) {
		res.status(500).json(err);
	}
};

// Update a user by ID
export const updateUser  = async (req: Request, res: Response) => {
    try {
        const {username, email} = req.body;
        const updatedUser = {username, email};
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            updatedUser,
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!user) {
            res.status(404).json({ message: "No user with that ID" });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a user by ID
export const deleteUser  = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: "No user with that ID" });
        } else {
            res.json({ message: "User deleted successfully" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add a friend id to user
export const addFriend = async (req: Request, res: Response) => {
    try {
        let dbUser:any = await User.findOne({ _id: req.params.userId });
        const friend = await User.findOne({ _id: req.params.friendId });
        if (!dbUser) {
            res.status(404).json({ message: "No user with that ID" });
            return;
        } else if (!friend) {
            res.status(404).json({ message: "No friend with that ID" });
            return;
        } else {
            dbUser.friends = [...dbUser.friends, friend._id];
            await dbUser.save();
        }
        return res.json(dbUser);
    } catch (error) {
        res.status(500).json({message: "Error adding friend", error});
        return;
    }
}

// remove a friend id from user
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        let dbUser:any = await User.findOne({ _id: req.params.userId });
        const friend = await User.findOne({ _id: req.params.friendId });
        if (!dbUser) {
            res.status(404).json({ message: "No user with that ID" });
            return;
        } else if (!friend) {
            res.status(404).json({ message: "No friend with that ID" });
            return;
        } else {
            dbUser.friends = dbUser.friends.filter((friend:ObjectId) => friend.toString() !== req.params.friendId);
            await dbUser.save();
        }
        res.json(dbUser);
    } catch (error) {
        res.status(500).json({message: "Error adding friend", error});
    }
}
