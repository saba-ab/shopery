import React, { useEffect, useState } from "react";
import { instance } from "../utils/dataLinks";
import { ICart } from "../interfaces/otherInterfaces";
import ProductInterface from "../interfaces/ProductInterface";
import { GreenButton } from "./styledComponents/GreenButton";
import { useNavigate } from "react-router-dom";
import { shortenString } from "../utils/tools";
import { useProductsContext } from "../contexts/ProductsContext";
const Cart = () => {
  const [cart, setCart] = useState<ICart>();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const { productsToShow, setProductsToShow } = useProductsContext();
  const navigate = useNavigate();

  useEffect(() => {
    instance.get("/carts/1").then((res) => setCart(res.data));
    instance.get("/products").then((res) => setProducts(res.data));
  }, []);

  const filterProductsForCart = (
    products: ProductInterface[],
    cart: ICart
  ): ProductInterface[] => {
    const filteredProducts = products.filter((product) =>
      cart.products.find((cartProduct) => cartProduct.productId === product.id)
    );
    return filteredProducts;
  };

  const findProductQuantity = (productId: number): string => {
    const product = cart?.products.find(
      (cartProduct) => cartProduct.productId === productId
    );
    return product?.quantity?.toString() || "";
  };

  const calculateTotalPrice = (product: ProductInterface): number => {
    const quantity = product.quantity || findProductQuantity(product.id);
    return product.price * (quantity ? parseInt(quantity) : 0);
  };

  useEffect(() => {
    if (cart) {
      const filteredProducts = filterProductsForCart(products, cart);
      setProductsToShow([...filteredProducts, ...productsToShow]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsToShow]);
  return (
    <div className="cart-products flex flex-col gap-14 my-10">
      {productsToShow?.map((product) => (
        <div
          key={product.id}
          className="cart-product flex place-items-center gap-10 justify-between border-b-2 border-gray-200 pb-5"
        >
          <div className="product-image w-28">
            <img src={product.image} alt="product" />
          </div>
          <div className="product-tittle">
            <h3>{shortenString(product.title)}</h3>
          </div>
          <div className="price-container flex justify-between w-36">
            <div className="product-price text-yellow-600">
              <h3>{product.price}</h3>
            </div>
            <div className="product-quantity text-black-600">
              <p>{product.quantity}</p>
            </div>
            <div className="product-total text-green-600">
              <p>{calculateTotalPrice(product)}</p>
            </div>
          </div>
        </div>
      ))}
      <div
        className="product-remove mx-auto my-4"
        onClick={() => navigate("/")}
      >
        <GreenButton>Return to HomePage</GreenButton>
      </div>
    </div>
  );
};

export default Cart;
