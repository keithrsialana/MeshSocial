import { Request, Response } from "express";
import Thought from "../models/Thought.js";
import { User } from "../models/index.js";

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a single thought by ID
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        
        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all reactions by thought ID
export const getSingleThoughtReactions = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        
        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        } else {
            res.json(thought.reactions);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        let user:any = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // create new thought object
        const {thoughtText, username} = req.body;
        const newObj = {thoughtText, username};
        const dbThoughtData = await Thought.create(newObj);

        // save thought id in user's list of thoughts
        user.thoughts = [...user.thoughts, dbThoughtData._id];
        await user.save(); // update new user changes

        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response) => {
    try {
        const {thoughtText, username} = req.body;
        const newObj = {thoughtText, username};
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            newObj,
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        } else {
            res.json({ message: "Thought deleted successfully" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a reaction
export const createReaction = async (req: Request, res: Response) => {
    try {
        const { reactionBody, username } = req.body;
        const { thoughtId } = req.params;

        // Create a new reaction object
        const newReaction = {
            reactionBody,
            username
        };

        // Find the thought by ID and update its reactions
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: newReaction } },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
            return;
        }

        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: "Error creating reaction:", error });
    }
};

// Delete a reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params; // Extract thought ID from the request parameters
        const { reactionId } = req.body; // Extract reaction ID from the request body

        // Find the thought by ID and remove the reaction by ID
        const thought:any = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { _id: reactionId } } },
        );

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
            return;
        }

        res.json({ message: "Reaction deleted successfully"}); // Return success message and updated thought
    } catch (error) {
        res.status(500).json({ message: "Error deleting reaction:", error });
    }
};