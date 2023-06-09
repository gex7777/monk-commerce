import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { Product } from "../ulits/interfaces";

export default function useProductSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;
    axios({
      method: "GET",
      url: "https://stageapibc.monkcommerce.app/admin/shop/product",
      params: { search: query, p: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(
          res.data,
          "page number:",
          pageNumber,
          products,
          [
            ...new Set(
              [...products, ...res.data].map((e) => JSON.stringify(e))
            ),
          ].map((e) => JSON.parse(e))
        );

        setProducts((prevProducts) => {
          if (!!res.data) {
            const uniqueResult = removeDuplicateObjects(
              [...prevProducts, ...res.data],
              "id"
            );
            console.log(uniqueResult);
            return [...products, ...res.data];
          } else return [...prevProducts];
        });

        // let totalresultsLength = removeDuplicateObjects(
        //   [...products, ...res.data],
        //   "id"
        // ).length;
        setHasMore(res.data.length > 9);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;
    axios({
      method: "GET",
      url: "https://stageapibc.monkcommerce.app/admin/shop/product",
      params: { search: query, p: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(
          res.data,
          "page number:",
          pageNumber,
          products,
          [
            ...new Set(
              [...products, ...res.data].map((e) => JSON.stringify(e))
            ),
          ].map((e) => JSON.parse(e))
        );

        setProducts((prevProducts) => {
          if (!!res.data) {
            const uniqueResult = removeDuplicateObjects([...res.data], "id");
            console.log(uniqueResult);
            return [...res.data];
          } else return [...prevProducts];
        });

        // let totalresultsLength = removeDuplicateObjects(
        //   [...products, ...res.data],
        //   "id"
        // ).length;
        setHasMore(res.data.length > 9);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query]);
  return { loading, error, products, hasMore };
}
function removeDuplicateObjects(array: any, property: any) {
  const uniqueIds: any[] = [];

  const unique = array.filter((element: any) => {
    const isDuplicate = uniqueIds.includes(element[property]);
    console.log(isDuplicate, isDuplicate ?? element.id);

    if (!isDuplicate) {
      uniqueIds.push(element[property]);

      return true;
    }

    return false;
  });

  return unique;
}
