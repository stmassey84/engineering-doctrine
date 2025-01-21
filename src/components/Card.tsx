import React, { JSX } from "react";
import classNames from "classnames";

export const NewWindowIcon = (): JSX.Element => (
  <svg className={"w-5 h-5 ml-2"} fill={"currentColor"} viewBox={"0 0 20 20"} xmlns={"http://www.w3.org/2000/svg"}>
    <path
      d={"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}
    ></path>
    <path d={"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}></path>
  </svg>
);

type Props = {
  className?: string;
  title?: string;
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
};

const Card: React.FC<Props> = ({ className, title, children }) => {
  const classes = classNames(
    "max-w p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700",
    className
  );
  return (
    <div className={classes}>
      {title && <h4 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h4>}
      {children}
    </div>
  );
};

export default Card;
