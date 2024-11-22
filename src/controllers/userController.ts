import { ObjectId } from "mongoose";
import User from "../models/User.js";
import { Request, Response } from "express";
import { Thought } from "../models/index.js";

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
	try {
		const { username, email } = req.body;
		const user = { username, email };
		if (!(await User.findOne({ username, email }))) {
			const dbUserData = await User.create(user);
			res.json(dbUserData);
		}
		// set status code for invalid request
		else res.status(400).json({ message: "Username already exists" });
	} catch (err) {
		res.status(500).json(err);
	}
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
	try {
		const { username, email } = req.body;
		const updatedUser = { username, email };
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
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.userId);
		if (!user) {
			res.status(404).json({ message: "No user with that ID" });
			return;
		}
		// remove all thoughts associated to the user before deleting the user
		const thoughts = user.thoughts;
		for (const thought of thoughts) {
			const dbThoughtData = await Thought.deleteOne({ _id: thought });
			if (!dbThoughtData) {
				res.status(404).json({ message: "No thought with that ID" });
				return;
			}
		}

		// delete the user after it's done
		await User.deleteOne({ _id: req.params.userId });
		res.json({ message: "User deleted successfully" });
	} catch (err) {
		res.status(500).json(err);
	}
};

// Add a friend id to user
export const addFriend = async (req: Request, res: Response) => {
	try {
		let dbUser: any = await User.findOne({ _id: req.params.userId });
		const friend = await User.findOne({ _id: req.params.friendId });
		if (!dbUser) {
			res.status(404).json({ message: "No user with that ID" });
			return;
		} else if (!friend) {
			res.status(404).json({ message: "No friend with that ID" });
			return;
		} else {
			// Check if the friend ID already exists in the friends list
			if (!dbUser.friends.includes(friend._id)) {
				dbUser.friends.push(friend._id); // Add the friend's ID if it doesn't exist
				await dbUser.save(); // Save the updated user
			} else {
				return res
					.status(400)
					.json({ message: "This user is already a friend." });
			}
		}
		return res.json(dbUser);
	} catch (error) {
		res.status(500).json({ message: "Error adding friend", error });
		return;
	}
};

// remove a friend id from user
export const deleteFriend = async (req: Request, res: Response) => {
	try {
		let dbUser: any = await User.findOne({ _id: req.params.userId });
		const friend = await User.findOne({ _id: req.params.friendId });
		if (!dbUser) {
			res.status(404).json({ message: "No user with that ID" });
			return;
		} else if (!friend) {
			res.status(404).json({ message: "No friend with that ID" });
			return;
		} else {
			dbUser.friends = dbUser.friends.filter(
				(friend: ObjectId) => friend.toString() !== req.params.friendId
			);
			await dbUser.save();
		}
		res.json(dbUser);
	} catch (error) {
		res.status(500).json({ message: "Error adding friend", error });
	}
};
