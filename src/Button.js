import React from "react";

function Button({ children, onClick, className, type }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button