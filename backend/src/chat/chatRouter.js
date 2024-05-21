import { Router } from 'express';
import { chatController } from './chatController.js';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/passport/loginGuard.js';

const chatRouter = Router();

chatRouter.post('/rooms', isLoggedIn, chatController.createRooms);

chatRouter.get('/getRooms', chatController.getRooms);

chatRouter.get('/getRooms/:id', isLoggedIn, chatController.enterRoom);

chatRouter.delete('/rooms/:id', chatController.removeRoom);

chatRouter.post('/getRooms/:id/chat', chatController.sendChat);

export { chatRouter };
