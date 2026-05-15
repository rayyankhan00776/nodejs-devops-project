import express, { json } from 'express';
import morganMiddleware from './middlewares/morgan.middleware.js';
import configs from './config/config.js';
import connectdb from './db.js';
import authRouter from './routes/auth.routes.js';
import notesRouter from './routes/notes.routes.js';

// express app initialization
const app = express();
app.use(json());

// use modular morgan middleware
app.use(morganMiddleware);

// connect to database
connectdb();

// use auth routes
app.use('/api/auth', authRouter);

// use notes routes (protected by JWT middleware)
app.use('/api/notes', notesRouter);

// Port listening
app.listen(configs.PORT, () => {
    console.log(`Server is running on port ${configs.PORT}`);
});

export default app;