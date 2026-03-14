import React, { useState, useRef } from "react";
import { useFadeSectionOnce } from "@/hooks/useFadeInOnce";
import { useNavigate } from "react-router";
const ArticleSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  // Sample articles data - replace with your actual data
  const articles = [
    {
      id: 1,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "06.09",
      badge: "C",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "05.10",
      badge: "М",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "06.10",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "11.10",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "21.10",
      badge: "М",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "15.11",
      badge: "C",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1574267432644-f75e36836b33?w=800&h=600&fit=crop",
    },
    {
      id: 7,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "20.11",
      badge: "М",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=600&fit=crop",
    },
    {
      id: 8,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "25.11",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    },
    {
      id: 9,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "25.11",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    },
    {
      id: 10,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "25.11",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    },
    {
      id: 11,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "25.11",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    },
    {
      id: 12,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "25.11",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    },
    {
      id: 13,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "25.11",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    },
    {
      id: 14,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, amet?",
      date: "25.11",
      badge: "С",
      badgeText: "lorem",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const ArticleCard = ({ article, index }) => (
    <article
      className="article-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="article-header">
        <h3 className="article-title">{article.title}</h3>
      </div>
      <div className="article-date-wrapper">
        <div className="event-badge">
          <span className="event-badge-icon">{article.badge}</span>
          {article.badgeText}
        </div>
        <time className="article-date">{article.date}</time>
      </div>
      <div className="image-wrapper">
        <img
          src={article.image}
          alt={article.title}
          className="article-image"
        />
        <div className="image-overlay"></div>
      </div>
    </article>
  );

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    );
  };

  return (
    <div className="container article-section">
      {/* Events Section */}
      <div className="section-header news">
        {/* <div className="section-icon">C</div> */}
        <h1 className="section-title-news">
          News <span>FIBERIX</span>
        </h1>
        <div className="see-more-btn news" onClick={() => navigate("/article")}>
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

      <div className="articles-grid">
        {currentArticles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Archive Section */}
    </div>
  );
};

export default ArticleSection;
