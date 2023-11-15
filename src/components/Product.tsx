import React from "react";
import {
  Card,
  ProductImage,
  ProductPrice,
  ProductTitle,
  RatingContainer,
} from "./styledComponents/ProductCard";
import ProductInterface from "../interfaces/ProductInterface";

const Product = ({ title, price, image, id }: ProductInterface) => {
  return (
    <div className="Product-card" key={id}>
      <Card>
        <ProductImage src={image} alt="product" />
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>{price}</ProductPrice>
        <RatingContainer></RatingContainer>
      </Card>
    </div>
  );
};

export default Product;
