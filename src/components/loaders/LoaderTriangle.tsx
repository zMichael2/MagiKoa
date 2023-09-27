import React from "react";
import { Triangle } from "react-loader-spinner";

export const LoaderTriangle: React.FC = () => {
  return (
    <Triangle
      height="150"
      width="150"
      color="#410C79"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass="absolute bottom-2 z-10 right-0"
      visible={true}
    />
  );
};
