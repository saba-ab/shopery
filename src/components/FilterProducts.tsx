import React from "react";
import filter from "../images/filter.svg";
import "../styles/main.scss";
import { GreenButton } from "./styledComponents/GreenButton";
import ProductInterface from "../interfaces/ProductInterface";
interface Props {
  products: ProductInterface[];
  filterProductsByCategory: () => void;
}

const FilterProducts = ({ products, filterProductsByCategory }: Props) => {
  return (
    <div className="filter-products">
      <GreenButton onClick={filterProductsByCategory}>
        Filter <img src={filter} alt="filter" />
      </GreenButton>

      <p>
        <span>{products.length}</span> Results Found
      </p>
    </div>
  );
};

export default FilterProducts;
