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
import star from "../images/star.svg";
import blackstar from "../images/blackstar.svg";
import { shortenString } from "../utils/tools";
import "../styles/main.scss";
import cart from "../images/cart.svg";
const Product = ({
  title,
  price,
  image,
  id,
  rating,
  addCart,
  quantity,
}: ProductInterface) => {
  const navigate = useNavigate();
  const handleProductClick = (productId: number) => {
    navigate(`/${productId}`);
  };
  return (
    <div className="Product-card" key={id}>
      <Card>
        <ProductImage
          src={image}
          alt="product"
          onClick={() => handleProductClick(id)}
        />
        <ProductTitle>{shortenString(title)}</ProductTitle>
        <div className="cart-wrapper flex content-center gap-5">
          <ProductPrice>{price}</ProductPrice>
          <button className="add-to-cart">
            <img src={cart} alt="" onClick={() => addCart()} />
          </button>
        </div>

        <RatingContainer style={{ marginTop: "10px" }}>
          {Array.from({ length: Math.round(rating.rate) }, (_, index) => (
            <img key={index} src={star} alt="star" />
          ))}{" "}
          {Array.from({ length: 5 - Math.round(rating.rate) }, (_, index) => (
            <img key={index} src={blackstar} alt="star" />
          ))}
        </RatingContainer>
      </Card>
    </div>
  );
};

export default Product;
