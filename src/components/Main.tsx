import React, { useEffect, useState } from "react";
import "../styles/main.scss";
import FilterProducts from "./FilterProducts";
import { fetchData } from "../utils/tools";
import {
  categoryLink,
  productsLink,
  singleCategoryLink,
  singleProductLink,
} from "../utils/dataLinks";
import Categories from "./Categories";
import ProductInterface from "../interfaces/ProductInterface";
import Product from "../components/Product";
import Loader from "./Loader";
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
  useEffect(() => {
    setIsLoading(true);
    fetchData(categoryLink)
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    fetchData(productsLink)
      .then((data) => {
        setProducts(data);
        setProductsToFilter(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const filteredData = (data: any[]) =>
    data.filter((product) => {
      return product.price >= price[0] && product.price <= price[1];
    });
  const filterProductsByCategory = () => {
    selectedCategory !== "" && setCategory(selectedCategory);

    selectedCategory !== "" &&
      fetchData(singleCategoryLink(selectedCategory)).then((data) =>
        setProductsToFilter(filteredData(data))
      );
  };
  const filterProductsByPrice = () => {
    selectedCategory === "" &&
      setProductsToFilter(
        products.filter(
          (product) => product.price >= price[0] && product.price <= price[1]
        )
      );
    selectedCategory !== "" &&
      setProductsToFilter(
        products.filter(
          (product) =>
            product.price >= price[0] &&
            product.price <= price[1] &&
            product.category === selectedCategory
        )
      );
  };
  const handlePriceChange = (price: number[]) => {
    setPrice(price);
    filterProductsByPrice();
  };
  const clrearFilter = () => {
    fetchData(productsLink).then((data) => setProducts(data));
    setSelectedCategory("");
    setPrice([0, 1000]);
    setProductsToFilter(products);
  };
  const findExtremePrices = (products: ProductInterface[]) => {
    if (products.length === 0) {
      return { lowestPrice: 0, highestPrice: 1000 };
    }
    let lowestPrice = products[0].price;
    let highestPrice = products[0].price;
    products.forEach((product) => {
      if (product.price < lowestPrice) {
        lowestPrice = product.price;
      }
      if (product.price > highestPrice) {
        highestPrice = product.price;
      }
    });
    return { lowestPrice, highestPrice };
  };
  useEffect(() => {
    fetchData(productsLink).then((data) => {
      const lowestPrice = findExtremePrices(data).lowestPrice;
      const highestPrice = findExtremePrices(data).highestPrice;
      setPriceRange([lowestPrice, highestPrice]);
    });
  }, []);
  console.log(price);
  return (
    <div className="main">
      <FilterProducts
        products={productsToFilter}
        filterProductsByCategory={filterProductsByCategory}
      />
      <div className="products-container flex justify-evenly">
        <Categories
          priceRange={priceRange}
          findExtremePrices={findExtremePrices}
          products={products}
          clearFilter={clrearFilter}
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
          defaultValue={[
            findExtremePrices(products).lowestPrice,
            findExtremePrices(products).highestPrice,
          ]}
        />
        <Loader isLoading={isLoading}>
          <div className="products flex flex-wrap justify-center">
            {productsToFilter.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={""}
                description={""}
                rating={{
                  count: 0,
                  rate: 0,
                }}
              />
            ))}
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default Main;
