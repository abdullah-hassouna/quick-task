import { useEffect, useState } from "react";
import type ProductType from "../types/ProductType";
import { DEFUALT_PRODUCT_DATA } from "../data-sample/products-data";

export default function UseCallProductData(page: number) {
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const itemPerPage = 10;
    const itemsToSkip = (page - 1) * itemPerPage;
    const controller = new AbortController();

    const fetchProductData = async () => {
      setIsLoading((_) => true);
      setTimeout(() => {
        if (Math.random() < 0.1) {
          setError((_) => "Failed to fetch product data.");
        } else {
          setProductData((prevProductData) => [
            ...prevProductData,
            ...DEFUALT_PRODUCT_DATA.slice(
              itemsToSkip,
              itemsToSkip + itemPerPage,
            ),
          ]);
        }

        setIsLoading((_) => false);
      }, 2000);
    };

    fetchProductData();

    return () => {
      controller.abort();
    };
  });

  return { productData, isLoading, error };
}
