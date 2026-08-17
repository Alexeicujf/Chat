import { Router } from 'express';
import {
	createUserController,
	getUserController,
	updateUserController,
	deleteUserController,
} from './user.controller';

export const router = Router();

router.post('/', createUserController);
router.get('/', getUserController);
router.put('/', updateUserController);
router.delete('/', deleteUserController);
