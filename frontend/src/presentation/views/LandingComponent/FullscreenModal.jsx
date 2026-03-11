import React from "react";
import "../../styles/FullscreenModal.css";

const FullscreenModal = ({ item, onClose, onPrev, onNext }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fullscreen-modal" onClick={onClose}>
      <button className="close-button" onClick={onClose}>
        ✕
      </button>

      <button
        className="nav-button prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ‹
      </button>

      <div className="fullscreen-content" onClick={handleContentClick}>
        <img src={item.image} alt={item.title} className="fullscreen-image" />
        <div className="fullscreen-info">
          <span className="fullscreen-category">{item.category}</span>
          <h3 className="fullscreen-title">{item.title}</h3>
          <p className="fullscreen-description">{item.description}</p>
        </div>
      </div>

      <button
        className="nav-button next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ›
      </button>
    </div>
  );
};

export default FullscreenModal;
