import { Router } from 'express';
import {
	createChatController,
	getChatController,
	updateChatController,
	deleteChatController,
	deleteChatsManyController,
} from './chats.controller';

export const router = Router();

router.post('/', createChatController);
router.get('/', getChatController);
router.get('/:chatId', getChatController);
router.put('/:chatId', updateChatController);
router.delete('/:chatId', deleteChatController);
router.delete('/many', deleteChatsManyController);
