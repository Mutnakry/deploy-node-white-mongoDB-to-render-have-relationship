import express from 'express';
import { createUser, loginUser,GetUser } from '../controller/usersController.js';

const router = express.Router();

// POST route to create a new user
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', GetUser);

export default router;
