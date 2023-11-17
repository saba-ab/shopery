import React from "react";
import {
  Card,
  ProductImage,
  ProductPrice,
  ProductTitle,
  RatingContainer,
} from "./styledComponents/ProductCard";
import ProductInterface from "../interfaces/ProductInterface";
import { useNavigate } from "react-router-dom";
const Product = ({ title, price, image, id }: ProductInterface) => {
  const navigate = useNavigate();
  const handleProductClick = (productId: number) => {
    navigate(`${productId}`);
  };
  return (
    <div
      className="Product-card"
      key={id}
      onClick={() => handleProductClick(id)}
    >
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
