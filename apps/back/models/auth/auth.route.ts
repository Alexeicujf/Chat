import {
	registerUserController,
	refreshUserController,
	loginUserController,
} from './auth.controller';
import { Router } from 'express';

export const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/refresh', refreshUserController);
