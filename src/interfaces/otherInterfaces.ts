export interface ILoader {
  children: React.ReactNode;
  isLoading: boolean;
}
export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;
