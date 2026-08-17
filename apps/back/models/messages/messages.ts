import { Router } from 'express';
import {
	createMessageController,
	getMessagesController,
	updateMessageController,
	deleteMessageController,
	deleteMessagesManyController,
} from './message.controller';

export const router = Router();

router.post('/', createMessageController);
router.get('/', getMessagesController);
router.put('/', updateMessageController);
router.delete('/', deleteMessageController);
router.delete('/many', deleteMessagesManyController);
