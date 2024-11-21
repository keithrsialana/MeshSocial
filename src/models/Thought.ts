import { Schema, Document, model } from 'mongoose';
import { reactionSchema } from './Reaction'; // Import the reaction schema

// Define the Thought interface
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string; // Reference to the user who created the thought
    reactions: any[]; // Array of reactions, using the reaction schema
}

// Create the Thought schema
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280, // Character limit for thoughts
        },
        createdAt: {
			type: Date,
			default: Date.now,
		},
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Use the imported reactionSchema here
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, // Include getters in the JSON output
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

// Initialize the Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;