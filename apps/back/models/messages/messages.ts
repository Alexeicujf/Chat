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
router.get('/:messageId', getMessagesController);
router.put('/:messageId', updateMessageController);
router.delete('/:messageId', deleteMessageController);
router.delete('/many', deleteMessagesManyController);
