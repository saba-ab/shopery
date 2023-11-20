export default interface ProductInterface {
  quantity: any;
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
  addCart: () => void;
}
export interface IProduct {
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
}
