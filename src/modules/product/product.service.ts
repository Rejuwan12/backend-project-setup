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












  export const ProductServices = {
    CreateProductIntoDb,
    GetProductFormDb
  };