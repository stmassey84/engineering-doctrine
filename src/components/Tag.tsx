import React from "react";
import classNames from "classnames";

export enum TagColor {
  BLUE = "blue",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
  WHITE = "white",
}

type Props = {
  color?: TagColor;
  text?: string;
  className?: string;
};

const tagColorClasses = {
  blue: "bg-blue-200 text-blue-700",
  green: "bg-green-200 text-green-700",
  orange: "bg-orange-200 text-orange-700",
  red: "bg-red-200 text-red-700",
  white: "bg-white text-gray-700 border",
};

const Tag: React.FC<Props> = ({
  color = TagColor.WHITE,
  text = "",
  className,
}) => {
  const classes = classNames(
    "ml-4 text-sm inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full",
    tagColorClasses[color],
    className
  );
  return <div className={classes}>{text}</div>;
};

export default Tag;
