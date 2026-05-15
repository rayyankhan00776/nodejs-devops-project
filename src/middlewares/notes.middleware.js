// Validation middleware for notes
export const validateNote = (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Array to store validation errors
    const errors = [];

    // Validate title
    if (!title) {
      errors.push('Title is required');
    } else if (typeof title !== 'string') {
      errors.push('Title must be a string');
    } else if (title.trim().length === 0) {
      errors.push('Title cannot be empty or whitespace only');
    } else if (title.length < 3) {
      errors.push('Title must be at least 3 characters long');
    } else if (title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }

    // Validate description
    if (!description) {
      errors.push('Description is required');
    } else if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } else if (description.trim().length === 0) {
      errors.push('Description cannot be empty or whitespace only');
    } else if (description.length < 5) {
      errors.push('Description must be at least 5 characters long');
    } else if (description.length > 5000) {
      errors.push('Description cannot exceed 5000 characters');
    }

    // If validation errors exist, return error response
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    // Validation passed, proceed to next middleware
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Validation error',
      error: error.message
    });
  }
};

// Validate note ID format (MongoDB ObjectId)
export const validateNoteId = (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if id is a valid MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID format'
      });
    }

    // ID format is valid, proceed
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'ID validation error',
      error: error.message
    });
  }
};

export default { validateNote, validateNoteId };
