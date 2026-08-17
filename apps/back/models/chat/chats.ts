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
router.put('/', updateChatController);
router.delete('/', deleteChatController);
router.delete('/many', deleteChatsManyController);
