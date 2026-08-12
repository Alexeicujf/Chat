import { Router } from 'express';
import {
	createUserController,
	getUserController,
	updateUserController,
	deleteUserController,
} from './user.controller';

export const router = Router();

router.post('/', createUserController);
router.get('/:id', getUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);
