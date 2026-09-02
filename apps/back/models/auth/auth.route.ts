import { registerUserController } from './auth.controller';
import { Router } from 'express';

export const router = Router();

router.post('/register', registerUserController);
