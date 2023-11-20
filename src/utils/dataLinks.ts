import axios from "axios";
export const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const singleProductLink = (id: number) => {
  return `https://fakestoreapi.com/products/${id}`;
};
