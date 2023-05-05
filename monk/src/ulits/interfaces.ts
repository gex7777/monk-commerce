export interface Product {
  id: number;
  title: string;
  body_html: string;
  handle: string;
  options?: OptionsEntity[] | null;
  variants?: VariantsEntity[] | null;
  image: ImagesEntityOrImage;
  images?: ImagesEntityOrImage[] | null;
  admin_graphql_api_id: string;
  status: string;
}
export interface OptionsEntity {
  product_id: number;
  name: string;
  values?: string[] | null;
}
export interface VariantsEntity {
  id: number;
  product_id: number;
  title: string;
  inventory_policy: string;
  price: string;
  inventory_management: string;
  inventory_quantity: number;
  admin_graphql_api_id: string;
  option_values?: OptionValuesEntity[] | null;
}
export interface OptionValuesEntity {
  id: number;
  label: string;
  option_id: number;
  option_display_name: string;
}
export interface ImagesEntityOrImage {
  id: number;
  product_id: number;
  src: string;
}
