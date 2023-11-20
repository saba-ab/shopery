import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/tools";
import { singleProductLink } from "../utils/dataLinks";
import { useNavigate } from "react-router-dom";
import "../styles/productpage.scss";
import { GreenButton } from "../components/styledComponents/GreenButton";
import cartImg from "../images/add-to-cart-icon.svg";
import { handleCartClickX } from "../utils/tools";
import { useProductsContext } from "../contexts/ProductsContext";
import ProductInterface from "../interfaces/ProductInterface";

const ProductPage = () => {
  const [product, setProduct] = useState<ProductInterface>(
    {} as ProductInterface
  );
  const navigate = useNavigate();
  const { productId } = useParams();
  const { productsToShow, setProductsToShow } = useProductsContext();
  const handleCartClick = handleCartClickX(productsToShow, setProductsToShow);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetchData(singleProductLink(Number(productId)));
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <div className="product-page">
        <div className="product-page-box">
          <div className="product-page-image">
            <img src={product.image} alt="product" />
          </div>
          <div className="product-page-info">
            <h3>{product.title}</h3>
            <div className="line"></div>
            <p className="price-info">${product.price}</p>
            <div className="line"></div>

            <p>{product.description}</p>
            <div className="line"></div>
            <GreenButton
              style={{ margin: "0 auto" }}
              onClick={() => handleCartClick(product)}
            >
              Add to cart <img src={cartImg} alt="cart" />
            </GreenButton>
            <p>
              <span>Category - </span>
              {product.category}
            </p>
            <div className="line"></div>
          </div>
        </div>
      </div>
      <button className="return-button" onClick={() => navigate("/")}>
        Back to products
      </button>
    </>
  );
};

export default ProductPage;
