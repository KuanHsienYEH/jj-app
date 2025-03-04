import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  pwd: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  pwd: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);