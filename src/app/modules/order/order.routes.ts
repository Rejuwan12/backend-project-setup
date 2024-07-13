import express from 'express';
import OrderController from './order.controller';


const OrderRoute = express.Router();


OrderRoute.post('/', OrderController.CreateOrder);
OrderRoute.get('/', OrderController.GetProductByEmail);

export default OrderRoute;
