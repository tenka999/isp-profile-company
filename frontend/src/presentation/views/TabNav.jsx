import React from "react";

const TabNav = ({ activeTab, setActiveTab }) => (
  <nav className="tab-nav">
    <button
      className={`tab-btn ${activeTab === "jabar" ? "active" : ""}`}
      onClick={() => setActiveTab("jabar")}
      style={{ "--tab-color": "var(--accent-jb)" }}
    >
      Jawa Barat
    </button>
    <button
      className={`tab-btn ${activeTab === "jateng" ? "active" : ""}`}
      onClick={() => setActiveTab("jateng")}
      style={{ "--tab-color": "var(--accent-jt)" }}
    >
      Jawa Tengah
    </button>
    <button
      className={`tab-btn ${activeTab === "jatim" ? "active" : ""}`}
      onClick={() => setActiveTab("jatim")}
      style={{ "--tab-color": "var(--accent-ji)" }}
    >
      Jawa Timur
    </button>
    <button
      className={`tab-btn ${activeTab === "semua" ? "active" : ""}`}
      onClick={() => setActiveTab("semua")}
      style={{ "--tab-color": "#aaa" }}
    >
      Semua
    </button>
  </nav>
);

export default TabNav;
