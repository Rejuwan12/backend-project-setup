import express from 'express';
import { ProductController } from './product.controller';


const ProductRoute = express.Router();

ProductRoute.post('/', ProductController.CreateProduct);
ProductRoute.get('/', ProductController.GetProduct);



export default ProductRoute;
