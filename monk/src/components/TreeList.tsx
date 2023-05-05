import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Product } from "../ulits/interfaces";
import { VariantsEntity } from "./../ulits/interfaces";
import { Box } from "@mui/material";
import { useState } from "react";

interface Props {
  products: Product[];
}

interface ChildProps {
  variant: VariantsEntity;
  checked?: boolean;
  handleChildCheckEvent: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    parentId: number
  ) => void;
}

function Child({
  checked,
  variant: { title, price, inventory_quantity, product_id, id },
  handleChildCheckEvent,
}: ChildProps) {
  return (
    <Box
      sx={{
        height: "61px",
        pl: "60px",
        width: "100%",
        pr: "35px",
        border: "1px solid #0000001A",
        borderTop: "0px",
        borderX: "0px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Checkbox
        checked={!!checked ? checked : false}
        onChange={(e) => handleChildCheckEvent(e, id, product_id)}
        disableFocusRipple
        disableRipple
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 33,
          },
        }}
      />
      <Box sx={{ flex: 3 }}>{title}</Box>
      <Box sx={{ textAlign: "right", flex: 2 }}>
        {inventory_quantity} available
      </Box>
      <Box sx={{ flex: 1, textAlign: "right" }}>${price} </Box>
    </Box>
  );
}

export default function TreeList({ products }: Props) {
  const [productz, setProductz] = useState(products);

  function handleParentCheckEvent(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    setProductz((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            checked: e.target.checked,
            variants: product.variants?.map((variant) => {
              return { ...variant, checked: e.target.checked };
            }),
          };
        }
        return product;
      })
    );
  }

  function handleChildCheckEvent(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    parentId: number
  ) {
    setProductz((prev) =>
      prev.map((product) => {
        if (product.id === parentId) {
          return {
            ...product,
            variants: product.variants?.map((variant) => {
              if (variant.id === id) {
                return { ...variant, checked: e.target.checked };
              }
              return variant;
            }),
          };
        }
        return product;
      })
    );
  }
  function checkIntermediate(id: number): boolean {
    let intermediate =
      productz
        .find((product) => product.id === id)
        ?.variants?.some((variant) => variant.checked === false) &&
      productz.find((product) => product.id === id)?.checked;
    return intermediate ? intermediate : false;
  }
  return (
    <>
      {productz.map((product) => (
        <Box sx={{ width: "100%" }} key={product.id}>
          <Box
            sx={{
              height: "61px",
              pl: "19px",
              width: "100%",
              m: 0,
              border: "1px solid #0000001A",
              borderTop: "0px",
              borderX: "0px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              pr: "35px",
            }}
          >
            <Checkbox
              indeterminate={checkIntermediate(product.id)}
              checked={!!product.checked ? product.checked : false}
              onChange={(e) => handleParentCheckEvent(e, product.id)}
              disableFocusRipple
              disableRipple
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 33,
                  strokeWidth: "1px",
                },
              }}
            />

            <img
              style={{
                objectFit: "cover",
                height: "36px",
                width: "36px",
                borderRadius: "4px",
              }}
              src={product.image.src}
            />

            <Box sx={{ fontSize: "16px" }}> {product.title}</Box>
            {product.variants?.length === 1 && (
              <>
                <Box sx={{ textAlign: "right", flex: 2 }}>
                  {product.variants[0]?.inventory_quantity} available
                </Box>
                <Box sx={{ flex: 1, textAlign: "right" }}>
                  ${product.variants[0]?.price}
                </Box>
              </>
            )}
          </Box>
          {product.variants?.length === 1 ? (
            <></>
          ) : (
            product.variants?.map((variant: VariantsEntity) => (
              <Child
                key={variant.id}
                variant={variant}
                checked={variant.checked}
                handleChildCheckEvent={handleChildCheckEvent}
              />
            ))
          )}
        </Box>
      ))}
    </>
  );
}
