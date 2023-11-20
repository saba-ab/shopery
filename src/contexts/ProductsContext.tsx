import React, { createContext, useState, useContext, ReactNode } from "react";
import ProductInterface from "../interfaces/ProductInterface";

interface ProductsContextProps {
  productsToShow: ProductInterface[];
  setProductsToShow: (products: ProductInterface[]) => void;
}

const ProductsContext = createContext<ProductsContextProps>({
  productsToShow: [],
  setProductsToShow: (products: ProductInterface[]) => {},
});

export const useProductsContext = () => useContext(ProductsContext);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [productsToShow, setProductsToShow] = useState<ProductInterface[]>([]);

  return (
    <ProductsContext.Provider value={{ productsToShow, setProductsToShow }}>
      {children}
    </ProductsContext.Provider>
  );
};
