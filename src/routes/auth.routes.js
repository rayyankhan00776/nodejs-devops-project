import express from 'express';

import {registerController , loginController} from '../controllers/auth.controller.js';
// creating router for authentication and authorization
const authRouter = express.Router();


// create routes for authentication and authorization here below 
authRouter.post('/register', registerController);
authRouter.post('/login', loginController);

// exporting the router of authentication and authorization
export default authRouter;
