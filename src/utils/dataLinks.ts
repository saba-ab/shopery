export const categoryLink = "https://fakestoreapi.com/products/categories";
export const productsLink = "https://fakestoreapi.com/products";
export const singleProductLink = (id: number) => {
  return `https://fakestoreapi.com/products/${id}`;
};
export const singleCategoryLink = (category: string) => {
  return `https://fakestoreapi.com/products/category/${category}`;
};
