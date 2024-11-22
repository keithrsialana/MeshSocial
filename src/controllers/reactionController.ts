import { Request, Response } from "express";
import  {Reaction} from "../models/Reaction.js"; // Ensure you import your Reaction model

// Get all reactions
export const getReactions = async (_req: Request, res: Response) => {
    try {
        const reactions = await Reaction.find();
        res.json(reactions);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a single reaction by ID
export const getSingleReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Reaction.findOne({ _id: req.params.reactionId });
        
        if (!reaction) {
            res.status(404).json({ message: "No reaction with that ID" });
        } else {
            res.json(reaction);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a new reaction
export const createReaction = async (req: Request, res: Response) => {
    try {
        const dbReactionData = await Reaction.create(req.body);
        res.json(dbReactionData);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a reaction by ID
export const updateReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Reaction.findOneAndUpdate(
            { _id: req.params.reactionId },
            req.body,
            { new: true }
        );

        if (!reaction) {
            res.status(404).json({ message: "No reaction with that ID" });
        } else {
            res.json(reaction);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a reaction by ID
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });

        if (!reaction) {
            res.status(404).json({ message: "No reaction with that ID" });
        } else {
            res.json({ message: "Reaction deleted successfully" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};