import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Product } from "../ulits/interfaces";
import { VariantsEntity } from "./../ulits/interfaces";
interface Props {
  products: Product[];
}
interface ChildProps {
  variant: VariantsEntity;
}
export default function TreeList({ products }: Props) {
  const Child = ({
    variant: { title, price, inventory_quantity },
  }: ChildProps) => (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel label="Child" control={<Checkbox />} />
      {title} {price} {inventory_quantity}{" "}
    </Box>
  );

  return (
    <>
      {products.map((product) => (
        <div>
          <FormControlLabel label={product.title} control={<Checkbox />} />
          {product.variants?.length === 1 ? (
            <></>
          ) : (
            product.variants?.map((variant: VariantsEntity) => (
              <Child variant={variant} />
            ))
          )}
        </div>
      ))}
    </>
  );
}
