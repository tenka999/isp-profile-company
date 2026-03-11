import React from "react";

const Hero = () => (
  <div className="hero">
    <div className="hero-left">
      <div className="hero-eyebrow">Peta Interaktif · Pulau Jawa</div>
      <div className="hero-title">
        <span className="jb">JAWA</span>
        <br />
        <span className="jt">BARAT</span> · <span className="ji">TENGAH</span>
        <br />
        TIMUR
      </div>
      <div className="hero-sub">
        Klik wilayah untuk detail · 100 kabupaten &amp; kota
      </div>
    </div>
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-num" style={{ color: "var(--accent-jb)" }}>
          27
        </div>
        <div className="stat-label">Jawa Barat</div>
      </div>
      <div className="stat">
        <div className="stat-num" style={{ color: "var(--accent-jt)" }}>
          35
        </div>
        <div className="stat-label">Jawa Tengah</div>
      </div>
      <div className="stat">
        <div className="stat-num" style={{ color: "var(--accent-ji)" }}>
          38
        </div>
        <div className="stat-label">Jawa Timur</div>
      </div>
    </div>
  </div>
);

export default Hero;
