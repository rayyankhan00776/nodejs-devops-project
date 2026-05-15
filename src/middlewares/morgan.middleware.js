import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const logDirectory = path.join(process.cwd(), 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// File stream for persistent logs
const accessLogStream = fs.createWriteStream(
    path.join(logDirectory, 'access.log'),
    { flags: 'a' }
);

// Export reusable middleware array
const morganMiddleware = [
    // Production-style logs → file
    morgan('combined', { stream: accessLogStream }),

    // Dev-friendly logs → console
    morgan('dev')
];

export default morganMiddleware;