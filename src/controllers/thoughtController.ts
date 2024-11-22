import { Request, Response } from "express";
import Thought from "../models/Thought.js";

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

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
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