import { Router } from 'express';
import { authMiddlware } from '../auth/auth.middlware';
import {
	createUserController,
	getUserController,
	updateUserController,
	deleteUserController,
} from './user.controller';

export const router = Router();

router.post('/', createUserController);
router.get('/', authMiddlware, getUserController);
// router.get('/:userId', getUserController);
router.put('/:userId', updateUserController);
router.delete('/:userId', deleteUserController);
