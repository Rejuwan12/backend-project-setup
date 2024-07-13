import { z } from 'zod';

// Variants Validation
const VariantsValidation = z.object({
  type: z.string().min(1, 'Variant type is Required'),
  value: z.string().min(1, 'Variant value is Required'),
});

// Inventory Validation
const InventoryValidation = z.object({
  quantity: z.number().min(0, 'Inventory Quantity Is Required'),
  inStock: z.boolean(),
});

// Product Validation
const ProductValidation = z.object({
  name: z.string().min(1, 'Product name is Required'),
  description: z.string().min(1, 'Product description is Required'),
  price: z.number().min(0, 'Product price is Required'),
  category: z.string().min(1, 'Product category is Required'),
  tags: z.array(z.string()).min(1, 'Product tags are Required'),
  variants: z.array(VariantsValidation).min(1, 'Product variants are Required'),
  inventory: InventoryValidation,
});

export { ProductValidation, VariantsValidation, InventoryValidation };
