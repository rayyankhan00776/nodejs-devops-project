import mongoose from "mongoose";

// Creating Note Schema
const noteSchema = new mongoose.Schema(
  {
    // Title of the note
    title: {
      type: String, // Data type should be String
      required: true, // Title is mandatory
    },

    // Description/content of the note
    description: {
      type: String, // Data type should be String
      required: true, // Description is mandatory
    },

    // User who created the note (reference to User model)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Each note must belong to a user
    },
  },
  {
    // Automatically adds:
    // createdAt -> when note is created
    // updatedAt -> when note is updated
    timestamps: true,
  }
);

// Exporting the model
export default mongoose.model("Note", noteSchema);