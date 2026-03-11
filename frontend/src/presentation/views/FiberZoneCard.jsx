import React from "react";
import "@/styles/Map.css";

const FiberZoneCard = () => {
  return (
    <div className="fiber-card">
      {/* Animated background elements */}
      <div className="fiber-bg-pulse"></div>
      <div className="fiber-bg-lines"></div>

      {/* Signal indicators */}

      {/* Main content */}
      <div className="card-content">
        <div className="header-section">
          <h1 className="title">
            Coordinate
            <span className="synchronized-text"> Synchronized!</span>
          </h1>

          <div className="badge">
            <span className="badge-text">LIVE</span>
            <span className="badge-pulse"></span>
          </div>
        </div>

        <div className="signal-strength">
          <div className="strength-indicator">
            <span className="strength-label">Signal Strength</span>
            <div className="strength-bars">
              <div className="strength-bar active"></div>
              <div className="strength-bar active"></div>
              <div className="strength-bar active"></div>
              <div className="strength-bar active"></div>
              <div className="strength-bar"></div>
            </div>
          </div>
        </div>

        <p className="high-speed-text">
          <span className="text-gradient">High-speed signals detected.</span>
          Your location is officially within our
          <span className="highlight"> hyper-growth fiber zone.</span>
        </p>

        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-value">1 Gbps</span>
            <span className="stat-label">Peak Speed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">&lt;1ms</span>
            <span className="stat-label">Latency</span>
          </div>
        </div>

        <p className="experience-text">
          Experience zero-latency connectivity with speeds up to
          <span className="speed-highlight"> 1 Gbps</span>. Our infrastructure
          is fully operational at your address.
        </p>

        <button className="cta-button">
          <span className="button-text">Check Availability</span>
          <span className="button-icon">→</span>
          <div className="button-glow"></div>
        </button>

        <div className="footer-status">
          <div className="status-dot"></div>
          <span className="status-text">Network Status: Fully Operational</span>
        </div>
      </div>
    </div>
  );
};

export default FiberZoneCard;
