// model-user.ts
import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    type: string;
    contact: string;
    address: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value: string) => {
                const re =
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Please enter a valid email address',
        },
    },
    password: {
        required: true,
        type: String,
    },
    type: {
        type: String,
        default: 'user',
    },
    contact: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
    },
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
