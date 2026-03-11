import React from "react";

const CarouselItem = ({
  item,
  position,
  index,
  onPrevClick,
  onNextClick,
  onExpandClick,
}) => {
  const handleClick = () => {
    if (position === "side" && index === 0) {
      onPrevClick();
    } else if (position === "side" && index === 2) {
      onNextClick();
    }
  };

  return (
    <div className={`carousel-item ${position}`} onClick={handleClick}>
      <img src={item.image} alt={item.title} className="carousel-image" />
      <div className="neon-glow"></div>

      {position === "center" && (
        <>
          <span className="carousel-category">{item.category}</span>

          <div className="carousel-overlay">
            <h3 className="carousel-item-title">{item.title}</h3>
            <p className="carousel-item-description">{item.description}</p>
          </div>

          <button className="image-button" onClick={onExpandClick}>
            <span className="button-text">EXPAND</span>
          </button>
        </>
      )}
    </div>
  );
};

export default CarouselItem;
