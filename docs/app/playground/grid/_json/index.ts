import productsJson from "./products.json";
import shoeJson from "./shoe.json";

export const EXAMPLE_JSON = {
  shoe: JSON.stringify(shoeJson, null, 2),
  products: JSON.stringify(productsJson, null, 2),
};

export const EXAMPLE_JSON_LIST = Object.keys(EXAMPLE_JSON) as Array<
  keyof typeof EXAMPLE_JSON
>;
