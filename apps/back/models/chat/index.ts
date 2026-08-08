import { Router } from 'express';
import {
	createChatController,
	getChatController,
	updateChatController,
	deleteChatController,
} from './chats.controller';

export const router = Router();

router.post('/', createChatController);
router.get('/', getChatController);
router.put('/:chatId', updateChatController);
router.delete('/:chatId', deleteChatController);
