import mongoose, { PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = mongoose.Document & {
    email: string,
    password: string,
}

const UserSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, unique: true },
    password: String,
});

const userModel = mongoose.model<UserDocument>("User", UserSchema, 'users');
export default userModel;