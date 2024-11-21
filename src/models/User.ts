import { Schema, Document, model, Types } from 'mongoose';

// Define the User interface
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[]; // ObjectId to reference thoughts
    friends: Types.ObjectId[]; // ObjectId to reference friends
}

// Create the User schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true, // Trim whitespace
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please fill a valid email address'], // Email validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that retrieves the length of the user's friends array
userSchema.virtual('friendCount').get(function (this: IUser) {
    return this.friends.length;
});

// Pre-save hook to trim username and email before creating a new document
userSchema.pre<IUser>('save', function(next) {
    if (this.isNew) {
        this.username = this.username.trim();
        this.email = this.email.trim();
    }
    next();
});

// Initialize our User model
const User = model<IUser>('User', userSchema);

export default User;