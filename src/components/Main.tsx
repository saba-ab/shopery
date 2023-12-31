import React, { useEffect, useState } from "react";
import "../styles/main.scss";
import FilterProducts from "./FilterProducts";
import Categories from "./Categories";
import ProductInterface from "../interfaces/ProductInterface";
import Product from "../components/Product";
import Loader from "./Loader";
import { instance } from "../utils/dataLinks";
import {
  handleCategoryChange,
  filteredData,
  clearFilter,
  findExtremePricesX,
  handlePriceChangeX,
  filterProductsByPriceX,
  handleCartClickX,
} from "../utils/tools";
import { useProductsContext } from "../contexts/ProductsContext";
interface Props {
  setCategory: (category: string) => void;
}

const Main = ({ setCategory }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [productsToFilter, setProductsToFilter] = useState<ProductInterface[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [price, setPrice] = useState<number[]>([0, 1000]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onCategoryChange = handleCategoryChange(setSelectedCategory);
  const filterData = filteredData(price);
  const { lowestPrice, highestPrice } = findExtremePricesX(products);
  const filterProductsByPrice = () =>
    filterProductsByPriceX(
      products,
      price,
      selectedCategory,
      setProductsToFilter
    );

  const handlePriceChange = handlePriceChangeX(setPrice, filterProductsByPrice);
  const onClearFilter = () => {
    clearFilter(
      setProducts,
      setProductsToFilter,
      setSelectedCategory,
      setPrice,
      setCategory
    );
  };
  const { productsToShow, setProductsToShow } = useProductsContext();
  const handleCartClick = handleCartClickX(productsToShow, setProductsToShow);
  useEffect(() => {
    setIsLoading(true);
    instance
      .get("products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    instance
      .get("products")
      .then((response) => {
        setProducts(response.data);
        setProductsToFilter(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const filterProductsByCategory = () => {
    selectedCategory !== "" && setCategory(selectedCategory);

    selectedCategory !== "" &&
      instance.get(`products/category/${selectedCategory}`).then((response) => {
        setProductsToFilter(filterData(response.data));
      });
  };
  useEffect(() => {
    instance.get("products").then((response) => {
      const lowestPrice = findExtremePricesX(response.data).lowestPrice;
      const highestPrice = findExtremePricesX(response.data).highestPrice;
      setPriceRange([lowestPrice, highestPrice]);
    });
  }, []);

  return (
    <div className="main w-screen flex justify-center">
      <Loader isLoading={isLoading}>
        <FilterProducts
          products={productsToFilter}
          filterProductsByCategory={filterProductsByCategory}
        />
        <div className="products-container flex justify-evenly">
          <Categories
            priceRange={priceRange}
            findExtremePrices={findExtremePricesX}
            products={products}
            clearFilter={onClearFilter}
            categories={categories}
            onCategoryChange={onCategoryChange}
            onPriceChange={handlePriceChange}
            defaultValue={[lowestPrice, highestPrice]}
          />
          <div className="products flex flex-wrap justify-center">
            {productsToFilter.map((product) => (
              <Product
                quantity={product.quantity}
                key={product.id}
                id={product.id}
                addCart={() => handleCartClick(product)}
                title={product.title}
                price={product.price}
                image={product.image}
                category={""}
                description={""}
                rating={{
                  rate: product.rating.rate,
                  count: product.rating.count,
                }}
              />
            ))}
          </div>
        </div>
      </Loader>
    </div>
  );
};

export default Main;
