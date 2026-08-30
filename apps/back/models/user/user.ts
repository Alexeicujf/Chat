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
router.get('/:userId', getUserController);
router.put('/:userId', updateUserController);
router.delete('/:userId', deleteUserController);
