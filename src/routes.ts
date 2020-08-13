import express from 'express';
import  UserController from './controllers/UserController';

const userController = new UserController();

const routes = express.Router();

routes.post('/users', userController.store);

export default routes;