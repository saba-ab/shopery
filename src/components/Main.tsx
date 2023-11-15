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
  useEffect(() => {
    fetchData(categoryLink).then((data) => setCategories(data));
    fetchData(productsLink).then((data) => setProducts(data));
  }, []);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const filterProductsByCategory = () => {
    setCategory(selectedCategory);
    fetchData(singleCategoryLink(selectedCategory)).then((data) =>
      setProducts(data)
    );
  };
  const handlePriceChange = (price: number[]) => {
    setPrice(price);
  };
  console.log(price);
  return (
    <div className="main">
      <FilterProducts
        products={products}
        filterProductsByCategory={filterProductsByCategory}
      />
      <div className="products-container flex">
        <Categories
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
        />
        <div className="products flex flex-wrap">
          {products.map((product) => Product(product))}
        </div>
      </div>
    </div>
  );
};

export default Main;
