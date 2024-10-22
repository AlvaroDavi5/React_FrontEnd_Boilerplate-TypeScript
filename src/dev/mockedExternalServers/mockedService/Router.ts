import express from 'express';
import cors from 'cors';
import defaultController from './controllers/defaultController';
import userController from './controllers/userController';


const DefaultRouter = express.Router();

DefaultRouter.use(express.json()).use(express.urlencoded({ extended: true }));
DefaultRouter.use(cors({
	origin: '*',
	allowedHeaders: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

DefaultRouter.use('/api', defaultController.router());
DefaultRouter.use('/api', userController.router());

export default DefaultRouter;
