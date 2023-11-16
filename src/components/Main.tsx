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
interface Props {
  setCategory: (category: string) => void;
}

const Main = ({ setCategory }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [price, setPrice] = useState<number[]>([0, 1000]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  useEffect(() => {
    fetchData(categoryLink).then((data) => setCategories(data));
    fetchData(productsLink).then((data) => setProducts(data));
  }, []);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const filteredData = (data: any[]) =>
    data.filter((product) => {
      return product.price >= price[0] && product.price <= price[1];
    });
  console.log(selectedCategory);
  const filterProductsByCategory = () => {
    selectedCategory !== "" && setCategory(selectedCategory);

    selectedCategory !== "" &&
      fetchData(singleCategoryLink(selectedCategory)).then((data) =>
        setProducts(filteredData(data))
      );
  };
  const handlePriceChange = (price: number[]) => {
    setPrice(price);
    filterProductsByCategory();
  };
  const clrearFilter = () => {
    fetchData(productsLink).then((data) => setProducts(data));
    setSelectedCategory("");
    setPrice([0, 1000]);
  };
  const findExtremePrices = (products: ProductInterface[]) => {
    let lowestPrice = 10;
    let highestPrice = 100;
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
  useEffect(() => {
    setPrice([
      findExtremePrices(products).lowestPrice,
      findExtremePrices(products).highestPrice,
    ]);
  }, [products]);
  console.log(price);
  return (
    <div className="main">
      <FilterProducts
        products={products}
        filterProductsByCategory={filterProductsByCategory}
      />
      <div className="products-container flex">
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
        <div className="products flex flex-wrap">
          {products.map((product) => Product(product))}
        </div>
      </div>
    </div>
  );
};

export default Main;
