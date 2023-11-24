import React from "react";

function Button({ onClick, children }) {
  return (
    <div className="btn" id="btn-ref" onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;