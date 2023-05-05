import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useState } from "react";
import { useAsyncAbortable } from "react-async-hook";
import { Product } from "../ulits/interfaces";
import useConstant from "use-constant";

const searchProducts = async (
  query: string,
  abortSignal?: AbortSignal
): Promise<Product[]> => {
  const res = await fetch(
    `https://stageapibc.monkcommerce.app/admin/shop/product?search=${encodeURIComponent(
      query
    )}&page=1`,
    {
      signal: abortSignal,
    }
  );
  if (res.status !== 200) {
    throw new Error("bad status = " + res.status);
  }
  const result = await res.json();
  console.log(result);

  return result;
};

export const useSearchProducts = () => {
  // Handle the input text state
  const [inputText, setInputText] = useState("");

  // Debounce the original search async function
  const debouncedProducts = useConstant(() =>
    AwesomeDebouncePromise(searchProducts, 1000)
  );

  const search = useAsyncAbortable(
    async (abortSignal, text) => {
      // If the input is empty, return nothing immediately (without the debouncing delay!)
      if (text.length === 0) {
        return [];
      }
      // Else we use the debounced api
      else {
        return debouncedProducts(text, abortSignal);
      }
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [inputText]
  );

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    search,
  };
};
