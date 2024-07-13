import { ProductInterface } from "./product.interface";
import ProductModel from "./product.model";


const CreateProductIntoDb = async (product: ProductInterface) => {
    const result = await ProductModel.create(product);
    return result;
  };

  const GetProductFormDb = async (searchItem: string) => {
    //eslint-disable-next-line
    const filterDoc: any = {};
  
    if (searchItem) {
      filterDoc.$or = [
        { name: { $regex: searchItem, $options: 'i' } },
        { description: { $regex: searchItem, $options: 'i' } },
        { category: { $regex: searchItem, $options: 'i' } },
        { tags: { $regex: searchItem, $options: 'i' } },
      ];
    }
    const result = await ProductModel.find(filterDoc);
    return result;
  };


  const GetProductByIdFromDb = async (id: string) => {
    const result = await ProductModel.findById({ _id: id });
    return result;
  };

  const UpdateProductByFromId = async (id: string, body: object) => {
    //eslint-disable-next-line
    const UpdateDoc: any = { $set: {} };
    Object.entries(body).forEach(([key, value]) => {
      UpdateDoc.$set[key] = value;
    });
    const result = await ProductModel.updateOne({ _id: id }, UpdateDoc);
    return result;
  };


  const DeleteProductByIdFromDb = async (id: string) => {
    const result = await ProductModel.findOneAndDelete({ _id: id });
    return result;
  };









  export const ProductServices = {
    CreateProductIntoDb,
    GetProductFormDb,
    GetProductByIdFromDb,
    UpdateProductByFromId,
    DeleteProductByIdFromDb
  };