import mongoose, { Schema, models } from "mongoose";

const letterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create an interface that extends Mongoose's Document and defines the UserDocument type
interface LetterDocument extends Document {
  title: string;
  sender: string;
  receiver: string;
  message: string;
  userId: string;
  // Add other properties from schema if needed
}

const Letter =
  models.Letter || mongoose.model<LetterDocument>("Letter", letterSchema);
export default Letter;
export type { Letter };
