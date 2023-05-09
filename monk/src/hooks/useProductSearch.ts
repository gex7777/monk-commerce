import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { Product } from "../ulits/interfaces";

export default function useProductSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
    console.log("fireed");
  }, [query]);

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
        setProducts((prevProducts) => {
          if (!!res.data) return [...new Set([...prevProducts, ...res.data])];
          else return [...new Set([...prevProducts])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, products, hasMore };
}
