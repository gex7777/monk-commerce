import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Product } from "../ulits/interfaces";
import { VariantsEntity } from "./../ulits/interfaces";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface Props {
  products: Product[];
  setSelectedProducts: Dispatch<SetStateAction<Product[]>>;
  selectedProducts: Product[] | [];
  hasMore: boolean;
  setPageNumber: () => void;
  loading: boolean;
}
interface ItemProps {
  product: Product;
  ref?: any;
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

export default function TreeList({
  products,
  selectedProducts,
  setSelectedProducts,
  loading,
  hasMore,
  setPageNumber,
}: Props) {
  const [productz, setProductz] = useState(products);

  React.useEffect(() => setProductz(products), [products]);
  const elementRef = useRef(null);
  const onIntersection: IntersectionObserverCallback = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
      if (hasMore) setPageNumber();
    }
  };
  React.useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  });
  function handleParentCheckEvent(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    // Handle visual check state
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

    //when checked: add
    if (e.target.checked) {
      //check if present
      if (selectedProducts.some((product) => product.id === id)) {
        setSelectedProducts((prev) =>
          prev.filter((product) => product.id !== id)
        );
      }
      let prods = [...products];
      let productToAdd = prods.find((p) => p.id === id);

      if (!!productToAdd) {
        // null check beacuse typescript
        let pta = productToAdd;

        setSelectedProducts((prev) => [...prev, pta]);
      }
    } else {
      // when unchecked remove
      setSelectedProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    }
  }

  function handleChildCheckEvent(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    parentId: number
  ) {
    // Handle visual check state

    setProductz((prev) =>
      prev.map((product) => {
        if (product.id === parentId) {
          return {
            ...product,

            variants: product.variants?.map((variant) => {
              if (variant.id === id)
                return { ...variant, checked: e.target.checked };
              return variant;
            }),
          };
        }
        return product;
      })
    );
    //when checked:add
    if (e.target.checked) {
      //check if parent is present

      if (selectedProducts.some((product) => product.id === parentId)) {
        setSelectedProducts((prev) => {
          return prev.map((product) => {
            if (product.id === parentId) {
              let prods = [...products];
              let productToAdd = prods.find((p) => p.id === parentId);

              let variantToAdd = productToAdd?.variants?.find(
                (variant) => variant.id === id
              );

              if (!!variantToAdd) {
                return {
                  ...product,
                  variants: [...product.variants, { ...variantToAdd }],
                };
              }
            }
            return product;
          });
        });

        //if all children checked, then visually check parent
        let trueLength = productz.find((p) => p.id == parentId)?.variants
          .length;
        let parentLength = selectedProducts.find((p) => p.id == parentId)
          ?.variants.length;
        if (!!trueLength && !!parentLength && trueLength - 1 === parentLength) {
          setProductz((prev) =>
            prev.map((p) => {
              if (p.id === parentId) {
                return { ...p, checked: true };
              }
              return p;
            })
          );
        }
      } else {
        let prods = [...products];

        let productToAdd = prods.filter((p) => p.id === parentId)[0];
        let newproduct = {
          ...productToAdd,
          variants: productToAdd.variants.filter((v) => v.id === id),
        };

        setSelectedProducts((prev) => [...prev, newproduct]);
      }
    }
    if (!e.target.checked) {
      //when unchecked

      //if one unchecked and parent was checked, then visually uncheck parent
      let trueLength = productz.find((p) => p.id == parentId)?.variants.length;
      let parentLength = selectedProducts.find((p) => p.id == parentId)
        ?.variants.length;
      if (!!trueLength && !!parentLength && trueLength === parentLength) {
        setProductz((prev) =>
          prev.map((p) => {
            if (p.id === parentId) {
              return { ...p, checked: false };
            }
            return p;
          })
        );
      }
      if (
        //if last remove entire parent
        selectedProducts.find((product) => product.id === parentId)?.variants
          .length === 1
      ) {
        setProductz((prev) =>
          prev.map((product) => {
            if (product.id === parentId) {
              return { ...product, checked: false };
            }
            return product;
          })
        );
        setSelectedProducts((prev) =>
          prev.filter((product) => product.id !== parentId)
        );
      }
      //when unchecked: remove
      if (!e.target.checked) {
        setSelectedProducts((prev) =>
          prev.map((product) => {
            if (product.id === parentId) {
              return {
                ...product,
                variants: product.variants.filter(
                  (variant) => variant.id !== id
                ),
              };
            }
            return product;
          })
        );
      }
    }
  }
  function checkIntermediate(id: number): boolean {
    let booleanArray = productz
      .find((product) => product.id === id)
      ?.variants?.map((variant) => variant.checked);
    let intermediate = booleanArray?.every(Boolean) == true ? false : true;
    if (
      booleanArray?.every((val) => val === false) ||
      booleanArray?.every(
        (val) =>
          val === undefined ||
          (booleanArray?.some((val) => val === false) &&
            booleanArray?.some((val) => val !== true))
      )
    ) {
      intermediate = false;
    }

    if (
      booleanArray?.some((val) => val === true) &&
      !booleanArray.every(Boolean)
    ) {
      intermediate = true;
    }
    return intermediate ? intermediate : false;
  }
  function Child({
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
          checked={selectedProducts
            .find((product) => product.id == product_id)
            ?.variants.some((variant) => variant.id == id)}
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
  const Item: React.FC<ItemProps> = React.forwardRef(({ product }, ref) => {
    return (
      <Box sx={{ width: "100%" }} ref={ref} key={product.id}>
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
            checked={selectedProducts.some((prod) => prod.id === product.id)}
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
              handleChildCheckEvent={(e) =>
                handleChildCheckEvent(e, variant.id, variant.product_id)
              }
            />
          ))
        )}
      </Box>
    );
  });

  return (
    <>
      {productz.map((product, index) => {
        if (productz.length === index + 1) {
          console.log("last", product);

          return <Item ref={elementRef} key={product.id} product={product} />;
        } else {
          console.log("not last");
          return <Item key={product.id} product={product} />;
        }
      })}
    </>
  );
}
