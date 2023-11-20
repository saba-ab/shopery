import { instance } from "./dataLinks";
import ProductInterface from "../interfaces/ProductInterface";
import { SetStateType } from "../interfaces/otherInterfaces";
export const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
export const handleCategoryChange =
  (setSelectedCategory: React.Dispatch<React.SetStateAction<string>>) =>
  (category: string) => {
    setSelectedCategory(category);
  };

export const filteredData = (price: number[]) => (data: any[]) =>
  data.filter((product) => {
    return product.price >= price[0] && product.price <= price[1];
  });
export const handlePriceChangeX =
  (
    setPrice: React.Dispatch<React.SetStateAction<number[]>>,
    filterProductsByPrice: () => void
  ) =>
  (price: number[]): void => {
    setPrice(price);
    filterProductsByPrice();
  };
export const clearFilter = (
  setProducts: SetStateType<ProductInterface[]>,
  setProductsToFilter: SetStateType<ProductInterface[]>,
  setSelectedCategory: SetStateType<string>,
  setPrice: SetStateType<number[]>,
  setCategory: (category: string) => void
): void => {
  instance
    .get<ProductInterface[]>("products")
    .then((response) => {
      setProducts(response.data);
      setProductsToFilter(response.data);
      setSelectedCategory("");
      setPrice([0, 1000]);
      setCategory("");
    })
    .catch((error) => {
      console.error("Error clearing filters:", error);
    });
};
export const findExtremePricesX = (
  products: ProductInterface[]
): { lowestPrice: number; highestPrice: number } => {
  if (products.length === 0) {
    return { lowestPrice: 0, highestPrice: 1000 };
  }
  let lowestPrice = products[0].price;
  let highestPrice = products[0].price;

  products.forEach((product) => {
    if (product.price < lowestPrice) {
      lowestPrice = product.price;
    }
    if (product.price > highestPrice) {
      highestPrice = product.price;
    }
  });

  return { lowestPrice, highestPrice };
};
export const filterProductsByPriceX = (
  products: ProductInterface[],
  price: number[],
  selectedCategory: string,
  setProductsToFilter: SetStateType<ProductInterface[]>
): void => {
  const filtered =
    selectedCategory === ""
      ? products.filter(
          (product) => product.price >= price[0] && product.price <= price[1]
        )
      : products.filter(
          (product) =>
            product.price >= price[0] &&
            product.price <= price[1] &&
            product.category === selectedCategory
        );

  setProductsToFilter(filtered);
};
export const shortenString = (str: string, num: number = 50): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
export const addToCart = (
  product: ProductInterface,
  cart: ProductInterface[],
  setCart: SetStateType<ProductInterface[]>
): void => {
  const newCart = [...cart, product];
  setCart(newCart);
};
export const handleCartClickX =
  (
    productsToShow: ProductInterface[],
    setProductsToShow: (products: ProductInterface[]) => void
  ) =>
  (product: ProductInterface) => {
    const isProductInCart = productsToShow.some((p) => p.id === product.id);
    if (isProductInCart) {
      const updatedProducts = productsToShow.map((p) => {
        if (p.id === product.id) {
          const updatedQuantity = p.quantity ? p.quantity + 1 : 1;
          return { ...p, quantity: updatedQuantity };
        }
        return p;
      });
      setProductsToShow(updatedProducts);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setProductsToShow([...productsToShow, newProduct]);
    }
  };
