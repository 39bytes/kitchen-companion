import mongoose from 'mongoose';

export type UserDocument = {
    email: string,
    password: string,
}

const UserSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, unique: true },
    password: String,
});

const userModel = mongoose.model<UserDocument>("User", UserSchema, 'users');
export default userModel;