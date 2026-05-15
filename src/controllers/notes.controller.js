import Note from "../models/notes.model.js";

// ========================================
// CREATE NOTE
// ========================================
export const createNote = async (req, res) => {
  try {
    // Get data from request body
    // (Already validated by validateNote middleware)
    const { title, description } = req.body;

    // Get userId from verified token (attached by auth middleware)
    const userId = req.user.userId;

    // Create new note with userId
    const note = new Note({
      title: title.trim(),
      description: description.trim(),
      userId
    });

    // Save to database
    await note.save();

    // Send response
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });

  } catch (error) {
    // Error handling
    res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error.message,
    });
  }
};


// ========================================
// GET ALL NOTES (for authenticated user)
// ========================================
export const getAllNotes = async (req, res) => {
  try {
    // Get userId from verified token
    const userId = req.user.userId;

    // Fetch all notes for this user
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    // Send response
    res.status(200).json({
      success: true,
      count: notes.length,
      message: notes.length > 0 ? "Notes retrieved successfully" : "No notes found",
      data: notes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve notes",
      error: error.message,
    });
  }
};


// ========================================
// UPDATE NOTE
// ========================================
export const updateNote = async (req, res) => {
  try {
    // Get userId from verified token
    const userId = req.user.userId;

    // Prepare update data (trim if provided)
    const updateData = {};
    if (req.body.title) updateData.title = req.body.title.trim();
    if (req.body.description) updateData.description = req.body.description.trim();

    // Update note by ID (only if it belongs to the user)
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId }, // Ensure user owns this note
      updateData,
      {
        new: true,          // return updated data
        runValidators: true // validate schema
      }
    );

    // If not found
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or you don't have permission to update it",
      });
    }

    // Response
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error.message,
    });
  }
};


// ========================================
// DELETE NOTE
// ========================================
export const deleteNote = async (req, res) => {
  try {
    // Get userId from verified token
    const userId = req.user.userId;

    // Delete note by ID (only if it belongs to the user)
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId // Ensure user owns this note
    });

    // If not found
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or you don't have permission to delete it",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};