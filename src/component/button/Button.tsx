import React from "react";
import "./Button.scss";
type PropsType = {
  color: string;
  text?: string;
  handleClick: any;
};

const Button: React.FunctionComponent<PropsType> = ({
  color,
  text = "Click me",
  handleClick,
}) => {
  return (
    <button className="button-theme" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
