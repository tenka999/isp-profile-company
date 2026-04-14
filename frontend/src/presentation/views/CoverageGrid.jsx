import { transform } from "framer-motion";
import { useEffect, useState } from "react";

const cities = [
  { name: "Jakarta", code: "JKT", status: "available" },
  { name: "Surabaya", code: "SBY", status: "available" },
  { name: "Bandung", code: "BDG", status: "available" },
  { name: "Medan", code: "MDN", status: "available" },
  { name: "Semarang", code: "SMG", status: "available" },
  { name: "Makassar", code: "MKS", status: "coming_soon" },
  { name: "Palembang", code: "PLM", status: "coming_soon" },
  { name: "Yogyakarta", code: "YGY", status: "available" },
  { name: "Denpasar", code: "DPS", status: "coming_soon" },
  { name: "Balikpapan", code: "BPN", status: "unavailable" },
  { name: "Manado", code: "MDC", status: "unavailable" },
  { name: "Pekanbaru", code: "PKU", status: "coming_soon" },
  { name: "Pontianak", code: "PNK", status: "unavailable" },
  { name: "Banjarmasin", code: "BJM", status: "coming_soon" },
  { name: "Batam", code: "BTM", status: "available" },
  { name: "Padang", code: "PDG", status: "unavailable" },
  { name: "Samarinda", code: "SMD", status: "coming_soon" },
  { name: "Jambi", code: "JMB", status: "unavailable" },
  { name: "Kupang", code: "KPG", status: "unavailable" },
  { name: "Ambon", code: "AMB", status: "coming_soon" },
];

const STATUS = {
  TERSEDIA: {
    label: "Ready",
    dot: "#236958",
    border: "#2c8670",
    bg: "rgba(109,40,217,0.12)",
    badgeBg: " rgba(25, 76, 64, 0.50)",
    badgeColor: "#d1f0e8",
    textColor: "#d1f0e8",
    codeColor: "#ace3d6",
    pulse: true,
  },
  SEGERA_HADIR: {
    label: "In Progress",
    dot: "#fbbf24",
    border: "#92400e",
    bg: "rgba(120,53,15,0.10)",
    badgeBg: "rgba(251,191,36,0.15)",
    badgeColor: "#fbbf24",
    textColor: "#fde68a",
    codeColor: "#f59e0b",
    pulse: false,
  },
  TIDAK_TERSEDIA: {
    label: "Planned",
    dot: "#ff7c68",
    border: "#374151",
    bg: "rgba(17,17,17,0.0)",
    badgeBg: " rgba(102, 37, 27, 0.50)",
    badgeColor: "#fff",
    textColor: "#ffd8d2",
    codeColor: "#ff5d44",
    pulse: false,
  },
};

const filters = [
  { key: "all", label: "All Cities" },
  { key: "TERSEDIA", label: "Available" },
  { key: "SEGERA_HADIR", label: "Coming Soon" },
  { key: "TIDAK_TERSEDIA", label: "Next Locations" },
];

export default function CoverageGrid({ provinces }) {
  console.log("Received provinces in CoverageGrid:", provinces);
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? provinces : provinces.filter((c) => c.status === active);

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(167,139,250,0.55); }
          70% { box-shadow: 0 0 0 6px rgba(167,139,250,0); }
          100% { box-shadow: 0 0 0 0 rgba(167,139,250,0); }
        }

        .city-card {
          background: #0d0d0f;
          border-radius: 0px;
          padding: 18px 16px 14px;
          border: 1px solid #343a42;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
          background:#000;
        }
        .city-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .city-card:hover { transform: translateY(-2px); }
        .city-card.available:hover { border-color: #2c8670; background: rgb(25, 76, 64,0.20); }
        .city-card.coming_soon:hover { border-color: #92400e; background: rgba(120,53,15,0.20); }
        .city-card.unavailable:hover { border-color: #b34130; background: rgb(141, 51, 37,0.20); }

        .status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .status-dot.pulse { animation: pulse-ring 1.8s ease-out infinite; }

        .filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid #2a2a32;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
          letter-spacing: 0.02em;
        }
        .filter-btn:hover { border-color: #7c3aed; color: #c4b5fd; }
        .filter-btn.active-all { background: #7c3aed; border-color: #7c3aed; color: #fff; }
        .filter-btn.active-available { background: #7c3aed; border-color: #7c3aed; color: #fff; }
        .filter-btn.active-coming_soon { background: rgba(251,191,36,0.15); border-color: #92400e; color: #fbbf24; }
        .filter-btn.active-unavailable { background: rgba(75,85,99,0.2); border-color: #4b5563; color: #9ca3af; }

        .legend-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.label}>COVERAGE AREA</p>
        <h1 style={styles.title}>
          SERVICE <span style={styles.titleSpan}>COVERAGE</span>
        </h1>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        {Object.entries(STATUS).map(([key, s]) => (
          <div key={key} style={styles.legendItem}>
            <span className="legend-dot" style={{ background: s.dot }} />
            <span
              style={{
                fontSize: 12,
                color: "#9ca3af",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${active === f.key ? `active-${f.key}` : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {filtered.map((city) => {
          const s = STATUS[city.status];
          return (
            <div key={city.singkatan} className={`city-card ${city.status}`}>
              {/* Top row: code + status badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    color: s.codeColor,
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                  }}
                >
                  {city.singkatan}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: s.badgeBg,
                    color: s.badgeColor,
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    padding: "3px 8px",
                    borderRadius: 999,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    className={`status-dot${s.pulse ? " pulse" : ""}`}
                    style={{ background: s.dot }}
                  />
                  {s.label}
                </span>
              </div>

              {/* City name */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: s.textColor,
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                {city.namaArea}
              </p>

              {/* Bottom divider line (available only) */}
              {city.status === "available" && (
                <div
                  style={{
                    marginTop: 12,
                    height: 1,
                    background:
                      "linear-gradient(90deg, #7c3aed44 0%, transparent 100%)",
                    borderRadius: 1,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div style={styles.cta}>
        <p style={styles.count}>
          Menampilkan {filtered.length} dari {provinces.length} kota
        </p>
        <p>
          Don't see your city?{" "}
          <span
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => alert("Contact us at https://example.com")}
          >
            Contact Us
          </span>{" "}
          to request an expansion in your area.
        </p>
      </div>
      {/* Count */}
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#000",
    minHeight: "100vh",
    padding: "10px 32px 64px",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    marginBottom: 32,
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "#7c3aed",
    margin: "0 0 10px",
    fontWeight: 700,
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 150,
    fontWeight: 800,
    lineHeight: 0.75,
    color: "#f5f3ff",
    margin: "-15px 0 0px",
    letterSpacing: "-0.01em",
  },
  titleSpan: {
    position: "relative",
    color: "#7c3aed",
    left: "20rem",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    margin: 0,
    lineHeight: 1.6,
  },
  legend: {
    display: "none",
    gap: 20,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 7,
  },
  filters: {
    display: "flex",
    gap: 8,
    marginBottom: 28,
    flexWrap: "wrap",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 0,
  },
  count: {
    marginTop: 24,
    fontSize: 12,
    color: "#4b5563",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "0.05em",
  },
  cta: {
    marginTop: 16,
    fontSize: 13,
    color: "#6b7280",
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    justifyContent: "space-between",
  },
};
