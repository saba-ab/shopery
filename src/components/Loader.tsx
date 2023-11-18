import React from "react";
import { ILoader } from "../interfaces/otherInterfaces";
import BounceLoader from "react-spinners/BounceLoader";

export const Loader: React.FC<ILoader> = ({ isLoading, children }) => {
  if (isLoading) {
    return <BounceLoader color="#36d7b7" size={320} />;
  }
  return <>{children}</>;
};

export default Loader;
