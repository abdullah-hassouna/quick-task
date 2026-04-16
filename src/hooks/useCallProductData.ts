import { useEffect, useState } from "react";
import type ProductType from "../types/ProductType";
import { DEFUALT_PRODUCT_DATA } from "../data-sample/products-data";

export default function UseCallProductData(page: number = 1) {
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("Fetching page:", page);
    const itemPerPage = 9;
    const itemsToSkip = (page - 1) * itemPerPage;

    setIsLoading(true);
    setError("");

    const timer = setTimeout(() => {
      if (Math.random() < 0.05) {
        setError("Failed to fetch product data.");
        setIsLoading(false);
      } else {
        const newData = DEFUALT_PRODUCT_DATA.slice(
          itemsToSkip,
          itemsToSkip + itemPerPage,
        );

        setProductData((prev) => [...prev, ...newData]);
        setIsLoading(false);
        console.log("Success! Items loaded:", newData.length);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [page]);

  return { productData, isLoading, error };
}
