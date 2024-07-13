import app from './app';
import { server } from './app/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ProductRoute from './app/modules/product/product.route';


app.use(express.json());
app.use(cors());
app.use('/api/products', ProductRoute);
app.all('*',(req,res)=>{
  res.status(400).json({
    success:false,
    messege:`Route Not found`
  })
})

async function main() {
  await mongoose.connect(server.database_url as string);

  app.listen(server.port, () => {
    console.log(`Example app listening on port ${server.port}`);
  });
}

main();
