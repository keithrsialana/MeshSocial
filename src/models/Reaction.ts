import { Schema, Document, model, Types } from "mongoose";

// Define the Reaction interface
interface IReaction extends Document {
	reactionId: Types.ObjectId; // Unique identifier for the reaction
	reactionBody: string;
	username: string; // Reference to the user who created the reaction
	createdAt: Date;
}

// Create the Reaction schema
const reactionSchema = new Schema<IReaction>(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(), // Default value to a new ObjectId
		},
		reactionBody: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280, // Character limit for reactions
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {
			getters: true, // Include getters in the JSON output
		},
	}
);

// Initialize the Reaction model
const Reaction = model<IReaction>("Reaction", reactionSchema);

export {Reaction, reactionSchema};
