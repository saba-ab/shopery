import React from "react";
import { ILoader } from "../interfaces/otherInterfaces";
import BounceLoader from "react-spinners/BounceLoader";

export const Loader: React.FC<ILoader> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="w-screen flex justify-center mt-20">
        <BounceLoader color="#36d7b7" size={320} />;
      </div>
    );
  }
  return <>{children}</>;
};

export default Loader;
