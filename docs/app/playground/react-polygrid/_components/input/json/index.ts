import productsJson from "./products.json";
import shoeJson from "./shoe.json";

export type SampleJsonName = keyof typeof SAMPLE_JSON_STRINGS;

export const SAMPLE_JSON_OBJECTS = {
  shoe: shoeJson,
  products: productsJson,
};

export const SAMPLE_JSON_STRINGS = {
  shoe: JSON.stringify(shoeJson, null, 2),
  products: JSON.stringify(productsJson, null, 2),
};

export const SAMPLE_JSON_NAMES = Object.keys(
  SAMPLE_JSON_STRINGS,
) as SampleJsonName[];
