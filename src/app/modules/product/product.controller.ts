import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { ProductValidation } from "./product.validation";
import { z } from "zod";


// create product
const CreateProduct = async (req: Request, res: Response) => {
    try {
      const productData = req.body;
  
      // Zod validation
      const validatedProduct = ProductValidation.parse(productData);
  
      const result = await ProductServices.CreateProductIntoDb(validatedProduct);
  
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        //  Zod validation error
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error,
        });
      } else {
        // Handle other errors
        res.status(500).json({
          success: false,
          message: 'An unexpected error occurred',
          error,
        });
      }
    }
  };

  const GetProduct = async (req: Request, res: Response) => {
    try {
      const searchItem: string = req.query.searchItem as string;
      const result = await ProductServices.GetProductFormDb(searchItem);
      if (searchItem) {
        res.status(200).json({
          success: true,
          message: `Products matching search Term ${searchItem} fetched successfully!`,
          data: result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        });
      }
    } catch (error: unknown) {
      console.log(error);
      res.status(400).json({
        success: false,
        messege: 'Unexpected error occurred',
        error,
      });
    }
  };

  const GetProductById = async (req: Request, res: Response) => {
    try {
      const Id = req.params.productId;
      const result = await ProductServices.GetProductByIdFromDb(Id);
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Product fetched successfully!',
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Clouden't find the product!",
        });
      }
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: 'Unexpected error occurred',
        error,
      });
    }
  };

  const UpdateProductById = async (req: Request, res: Response) => {
    try {
      const Id = req.params.productId;
      const UpdateData = req.body;
      const result = await ProductServices.UpdateProductByFromId(Id, UpdateData);
      res.status(200).json({
        success: true,
        message: 'Product Updated Successfully!',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Cloudn't Update",
        error,
      });
    }
  };

  const DeleteProductById = async (req: Request, res: Response) => {
    try {
      const Id = req.params.productId;
      const result = await ProductServices.DeleteProductByIdFromDb(Id);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Unexpectedly product cloudn't delete!",
        error: error,
      });
    }
  };



  export const ProductController ={
    CreateProduct,
    GetProduct,
    GetProductById,
    UpdateProductById,
    DeleteProductById
  }