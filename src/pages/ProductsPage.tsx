import ProductCard from "../components/ProductCard";
import UseCallProductData from "../hooks/useCallProductData";
import { useEffect, useState } from "react";

function ProductsPage() {
  const [page, setPage] = useState<number>(1);
  let { error, isLoading, productData } = UseCallProductData(page);

  useEffect(() => {}, [error, isLoading, productData]);
  return (
    <div className="App p-2">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        id="product-list"
        className="flex flex-col md:grid grid-cols-3 gap-6"
      >
        {productData.map((product) => (
          <ProductCard key={product.ID + "-" + product.Name} {...product} />
        ))}
        <div className="w-full col-span-3">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? "cursor-not-allowed opacity-0" : ""}`}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && productData.length === 0 && !error && (
        <span>No Data to Call</span>
      )}
    </div>
  );
}

export default ProductsPage;
