import { Router } from 'express';
import {
	createMessageController,
	getMessagesController,
	getMessageController,
	updateMessageController,
	deleteMessageController,
	deleteMessagesManyController,
} from './message.controller';

export const router = Router();

router.post('/', createMessageController);
router.get('/chat/:chatId', getMessagesController);
router.get('/single/:messageId', getMessageController);
router.put('/:messageId', updateMessageController);
router.delete('/:messageId', deleteMessageController);
router.delete('/many', deleteMessagesManyController);
