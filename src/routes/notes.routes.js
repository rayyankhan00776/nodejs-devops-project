import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote } from '../controllers/notes.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import { validateNote, validateNoteId } from '../middlewares/notes.middleware.js';

// Create router for notes
const notesRouter = express.Router();

// All notes routes are protected by JWT verification middleware
// User must provide valid token in Authorization header (Bearer <token>)

// CREATE - POST /api/notes
// Middleware chain: verifyToken -> validateNote -> createNote
notesRouter.post('/', verifyToken, validateNote, createNote);

// READ - GET /api/notes (get all notes for authenticated user)
notesRouter.get('/', verifyToken, getAllNotes);

// UPDATE - PUT /api/notes/:id
// Middleware chain: verifyToken -> validateNoteId -> validateNote -> updateNote
notesRouter.put('/:id', verifyToken, validateNoteId, validateNote, updateNote);

// DELETE - DELETE /api/notes/:id
// Middleware chain: verifyToken -> validateNoteId -> deleteNote
notesRouter.delete('/:id', verifyToken, validateNoteId, deleteNote);

// Export the router
export default notesRouter;
