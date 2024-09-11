import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create an interface that extends Mongoose's Document and defines the UserDocument type
interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: mongoose.Schema.Types.ObjectId;
  // Add other properties from schema if needed
}

const User = models.User || mongoose.model<UserDocument>("User", userSchema);
export default User;
export type { UserDocument };
