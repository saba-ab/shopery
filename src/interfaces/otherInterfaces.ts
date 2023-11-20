export interface ILoader {
  children: React.ReactNode;
  isLoading: boolean;
}
export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IProduct {
  productId: number;
  quantity: number;
}
export interface ICart {
  date: string;
  id: number;
  products: IProduct[];
  userId: number;
  __v: number;
}
