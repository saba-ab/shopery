import axios from "axios";
export const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  // You can also add other default settings here

  headers: {
    "Content-Type": "application/json",
    // other headers can be added here
  },
});

export const categoryLink = "https://fakestoreapi.com/products/categories";
export const productsLink = "https://fakestoreapi.com/products";
export const singleProductLink = (id: number) => {
  return `https://fakestoreapi.com/products/${id}`;
};
export const singleCategoryLink = (category: string) => {
  return `https://fakestoreapi.com/products/category/${category}`;
};
export const singleCartLink = "https://fakestoreapi.com/carts/1";

// instance.get("carts/user/1").then((res) => console.log(res.data));

instance.get("products/categories").then((response) => {
  console.log(response.data);
});
