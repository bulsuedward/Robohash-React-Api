import React from "react";
import "../css/card.css";
export default function CardComponent({ children, onRemove }) {
  return (
    <>
      <div className="card-component">
        {children}
        {/* <button className="remove-button" onClick={onRemove}>
          Remove
        </button> */}
      </div>
    </>
  );
}
