import React from "react";
import Navigation from "./Navigation";

type Props = {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className={"container mx-auto"}>
      <div className={"grid xl:grid-cols-[264px_960px] lg:grid-cols-[264px_648px] md:grid-cols-[264px_420px] sm:grid-cols-[264px_350px] lg:gap-8 grid-cols-1 w-full"}>
        <div><Navigation /></div>
        <div className={"pt-8 pb-16 lg:pt-16 lg:pb-24 ml-10 mr-5 sm:ml-0 sm:mr-0"}>{children}</div>
      </div>
    </div>
  );
};

export default Container;
