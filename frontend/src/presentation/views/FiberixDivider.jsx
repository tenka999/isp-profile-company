import React from "react";
import "../../styles/FiberixDivider.css";

const FiberixDivider = ({
  text = "FIBERIX",
  variant = "dark",
  itemCount = 20,
}) => {
  // Generate array of text items for seamless loop
  const textItems = Array(itemCount).fill(text);

  return (
    <div className={`diagonal-divider ${variant}`}>
      <div className="text-track">
        {textItems.map((item, index) => (
          <span key={index} className="text-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FiberixDivider;
