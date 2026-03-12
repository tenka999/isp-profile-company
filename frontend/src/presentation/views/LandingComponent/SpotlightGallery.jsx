import React, { useState } from "react";
import "../../../styles/SpotlightGallery.css";
import { useNavigate } from "react-router";

const SpotlightGallery = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const galleryItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=900&fit=crop",
      category: "Technology",
      title: "Future of AI",
      description:
        "Exploring the boundaries of artificial intelligence and machine learning in modern computing",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&h=900&fit=crop",
      category: "Design",
      title: "Creative Innovation",
      description:
        "Bold designs that push the envelope of creativity and redefine digital experiences",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=900&fit=crop",
      category: "Space",
      title: "Cosmic Exploration",
      description:
        "Journey through the stars and discover the mysteries of our vast universe",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=900&fit=crop",
      category: "Architecture",
      title: "Urban Futures",
      description:
        "Revolutionary architectural concepts that are reshaping our cities and skylines",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1400&h=900&fit=crop",
      category: "Innovation",
      title: "Tech Revolution",
      description:
        "Breaking boundaries with cutting-edge technology and transformative solutions",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=900&fit=crop",
      category: "Digital",
      title: "Code & Create",
      description:
        "Where programming meets artistic expression in the digital age",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&h=900&fit=crop",
      category: "Business",
      title: "Modern Workspace",
      description:
        "Redefining the future of work and collaboration in dynamic environments",
    },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const getVisibleItems = () => {
    const prevIndex =
      currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;

    return [
      { item: galleryItems[prevIndex], position: "side" },
      { item: galleryItems[currentIndex], position: "center" },
      { item: galleryItems[nextIndex], position: "side" },
    ];
  };

  const visibleItems = getVisibleItems();
  const currentItem = galleryItems[currentIndex];

  return (
    <>
      <div className="gallery-section">
        <div className="gallery-header">
          <div className="content-header">
            <h1 className="gallery-title satu">Gallery</h1>
          </div>
          <div className="">
            <div
              className="learn-more-btn gallery"
              onClick={() => navigate("/gallery")}
            >
              <span className="btn-text">See More</span>

              <span className="btn-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="carousel-container">
          <button className="nav-button prev" onClick={goToPrev}>
            ‹
          </button>

          <div className="carousel-wrapper">
            {visibleItems.map((item, index) => (
              <div
                key={`${item.item.id}-${index}`}
                className={`carousel-item ${item.position}`}
                onClick={() => {
                  if (item.position === "side" && index === 0) {
                    goToPrev();
                  } else if (item.position === "side" && index === 2) {
                    goToNext();
                  }
                }}
              >
                <img
                  src={item.item.image}
                  alt={item.item.title}
                  className="carousel-image"
                />
                <div className="neon-glow"></div>

                {item.position === "center" && (
                  <>
                    <span className="carousel-category">
                      {item.item.category}
                    </span>

                    <div className="carousel-overlay">
                      <h3 className="carousel-item-title">{item.item.title}</h3>
                      <p className="carousel-item-description">
                        {item.item.description}
                      </p>
                    </div>

                    <button className="image-button" onClick={openFullscreen}>
                      <span className="btn-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 12L3 3M12 12L21 3M12 12L3 21M12 12L21 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 6V3H6M18 3H21V6M3 18V21H6M18 21H21V18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span className="button-text">EXPAND</span>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <button className="nav-button next" onClick={goToNext}>
            ›
          </button>
        </div>

        <div className="carousel-indicators">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <button className="close-button" onClick={closeFullscreen}>
            ✕
          </button>

          <button
            className="nav-button prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
          >
            ‹
          </button>

          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="fullscreen-image"
            />
            <div className="fullscreen-info" style={{ display: "none" }}>
              <span className="fullscreen-category">
                {currentItem.category}
              </span>
              <h3 className="fullscreen-title">{currentItem.title}</h3>
              <p className="fullscreen-description">
                {currentItem.description}
              </p>
            </div>
          </div>

          <button
            className="nav-button next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default SpotlightGallery;
