import { useState } from "react";

const cities = [
  {
    id: 1,
    name: "Kab. Bogor",
    capital: "Cibinong",
    // large northwest-center region
    path: "M 118,42 L 148,36 L 172,38 L 185,52 L 188,70 L 180,88 L 168,100 L 155,108 L 140,112 L 125,108 L 112,98 L 104,84 L 102,68 L 108,54 Z",
    badge: { cx: 145, cy: 76 },
    label: { x: 145, y: 132 },
  },
  {
    id: 2,
    name: "Kota Bogor",
    capital: "Bogor",
    path: "M 112,98 L 125,108 L 122,122 L 110,128 L 100,122 L 96,110 L 102,100 Z",
    badge: { cx: 112, cy: 112 },
    label: { x: 112, y: 145 },
  },
  {
    id: 3,
    name: "Kab. Bekasi",
    capital: "Cikarang",
    path: "M 60,32 L 88,28 L 118,42 L 108,54 L 102,68 L 86,72 L 70,68 L 56,56 L 52,42 Z",
    badge: { cx: 86, cy: 52 },
    label: { x: 86, y: 88 },
  },
  {
    id: 4,
    name: "Kota Bekasi",
    capital: "Bekasi",
    path: "M 30,28 L 60,32 L 52,42 L 56,56 L 44,62 L 28,58 L 20,44 Z",
    badge: { cx: 40, cy: 44 },
    label: { x: 40, y: 78 },
  },
  {
    id: 5,
    name: "Kota Depok",
    capital: "Depok",
    path: "M 56,56 L 70,68 L 68,82 L 56,88 L 44,82 L 44,62 Z",
    badge: { cx: 56, cy: 72 },
    label: { x: 56, y: 104 },
  },
  {
    id: 6,
    name: "Kab. Karawang",
    capital: "Karawang",
    path: "M 88,28 L 128,22 L 162,26 L 172,38 L 148,36 L 118,42 L 88,28 Z",
    badge: { cx: 130, cy: 33 },
    label: { x: 130, y: 20 },
  },
  {
    id: 7,
    name: "Kab. Purwakarta",
    capital: "Purwakarta",
    path: "M 162,26 L 195,24 L 210,38 L 205,52 L 188,52 L 185,52 L 172,38 Z",
    badge: { cx: 192, cy: 38 },
    label: { x: 192, y: 20 },
  },
  {
    id: 8,
    name: "Kab. Subang",
    capital: "Subang",
    path: "M 195,24 L 242,18 L 268,26 L 265,44 L 248,52 L 228,56 L 210,52 L 210,38 Z",
    badge: { cx: 234, cy: 38 },
    label: { x: 234, y: 20 },
  },
  {
    id: 9,
    name: "Kab. Indramayu",
    capital: "Indramayu",
    path: "M 268,26 L 320,18 L 358,22 L 362,38 L 345,50 L 320,56 L 295,58 L 268,50 L 265,44 Z",
    badge: { cx: 316, cy: 40 },
    label: { x: 316, y: 20 },
  },
  {
    id: 10,
    name: "Kab. Cirebon",
    capital: "Sumber",
    path: "M 358,22 L 398,28 L 408,44 L 400,60 L 380,68 L 362,62 L 345,50 L 362,38 Z",
    badge: { cx: 380, cy: 46 },
    label: { x: 380, y: 26 },
  },
  {
    id: 11,
    name: "Kota Cirebon",
    capital: "Cirebon",
    path: "M 398,28 L 418,34 L 416,50 L 408,60 L 400,60 L 408,44 Z",
    badge: { cx: 410, cy: 44 },
    label: { x: 420, y: 40 },
  },
  {
    id: 12,
    name: "Kab. Majalengka",
    capital: "Majalengka",
    path: "M 345,50 L 380,68 L 375,86 L 360,98 L 338,96 L 322,82 L 320,66 L 320,56 L 345,50 Z",
    badge: { cx: 350, cy: 76 },
    label: { x: 350, y: 115 },
  },
  {
    id: 13,
    name: "Kab. Kuningan",
    capital: "Kuningan",
    path: "M 380,68 L 400,60 L 416,70 L 418,90 L 404,104 L 385,108 L 370,98 L 360,98 L 375,86 Z",
    badge: { cx: 392, cy: 86 },
    label: { x: 392, y: 118 },
  },
  {
    id: 14,
    name: "Kab. Sumedang",
    capital: "Sumedang",
    path: "M 248,52 L 295,58 L 320,66 L 322,82 L 310,96 L 290,104 L 268,100 L 252,86 L 248,68 Z",
    badge: { cx: 288, cy: 78 },
    label: { x: 288, y: 118 },
  },
  {
    id: 15,
    name: "Kab. Bandung",
    capital: "Soreang",
    path: "M 205,52 L 228,56 L 248,68 L 252,86 L 240,104 L 222,114 L 205,118 L 190,112 L 180,98 L 180,88 L 188,70 L 205,52 Z",
    badge: { cx: 218, cy: 86 },
    label: { x: 218, y: 134 },
  },
  {
    id: 16,
    name: "Kota Bandung",
    capital: "Bandung",
    path: "M 205,68 L 220,66 L 228,74 L 224,86 L 212,90 L 200,84 L 198,74 Z",
    badge: { cx: 212, cy: 78 },
    label: { x: 212, y: 104 },
  },
  {
    id: 17,
    name: "Kab. Bandung Barat",
    capital: "Ngamprah",
    path: "M 185,52 L 205,52 L 205,68 L 198,74 L 186,76 L 175,66 L 172,54 Z",
    badge: { cx: 192, cy: 63 },
    label: { x: 192, y: 42 },
  },
  {
    id: 18,
    name: "Kota Cimahi",
    capital: "Cimahi",
    path: "M 186,76 L 198,74 L 200,84 L 194,90 L 184,88 L 178,80 Z",
    badge: { cx: 192, cy: 82 },
    label: { x: 192, y: 100 },
  },
  {
    id: 19,
    name: "Kab. Cianjur",
    capital: "Cianjur",
    path: "M 140,112 L 155,108 L 168,100 L 180,98 L 180,88 L 175,66 L 168,100 L 155,108 L 140,112 L 125,108 L 112,98 L 104,84 L 100,100 L 105,118 L 122,122 L 125,108 Z",
    badge: { cx: 142, cy: 106 },
    label: { x: 142, y: 140 },
  },
  {
    id: 20,
    name: "Kab. Garut",
    capital: "Garut",
    path: "M 222,114 L 240,104 L 268,100 L 290,104 L 310,96 L 338,96 L 338,120 L 322,138 L 300,150 L 275,158 L 252,156 L 230,148 L 215,134 L 205,118 Z",
    badge: { cx: 272, cy: 128 },
    label: { x: 272, y: 172 },
  },
  {
    id: 21,
    name: "Kab. Tasikmalaya",
    capital: "Singaparna",
    path: "M 338,120 L 360,110 L 385,108 L 404,118 L 408,138 L 395,155 L 375,166 L 350,168 L 322,160 L 300,150 L 322,138 Z",
    badge: { cx: 362, cy: 138 },
    label: { x: 362, y: 182 },
  },
  {
    id: 22,
    name: "Kota Tasikmalaya",
    capital: "Tasikmalaya",
    path: "M 360,110 L 385,108 L 390,122 L 375,132 L 358,128 L 352,116 Z",
    badge: { cx: 372, cy: 118 },
    label: { x: 372, y: 102 },
  },
  {
    id: 23,
    name: "Kab. Ciamis",
    capital: "Ciamis",
    path: "M 404,118 L 418,110 L 435,116 L 440,132 L 430,150 L 415,160 L 395,155 L 408,138 Z",
    badge: { cx: 420, cy: 136 },
    label: { x: 420, y: 170 },
  },
  {
    id: 24,
    name: "Kota Banjar",
    capital: "Banjar",
    path: "M 435,116 L 450,120 L 448,136 L 438,142 L 430,136 L 430,150 L 440,132 Z",
    badge: { cx: 440, cy: 130 },
    label: { x: 454, y: 130 },
  },
  {
    id: 25,
    name: "Kab. Pangandaran",
    capital: "Parigi",
    path: "M 395,155 L 415,160 L 430,150 L 438,166 L 425,178 L 405,182 L 385,178 L 375,166 L 395,155 Z",
    badge: { cx: 406, cy: 168 },
    label: { x: 406, y: 196 },
  },
  {
    id: 26,
    name: "Kab. Sukabumi",
    capital: "Palabuhanratu",
    path: "M 68,82 L 86,72 L 102,68 L 104,84 L 112,98 L 100,122 L 88,140 L 72,152 L 55,150 L 42,136 L 36,118 L 40,100 Z",
    badge: { cx: 76, cy: 118 },
    label: { x: 76, y: 168 },
  },
  {
    id: 27,
    name: "Kota Sukabumi",
    capital: "Sukabumi",
    path: "M 96,110 L 110,128 L 100,136 L 88,130 L 88,118 Z",
    badge: { cx: 98, cy: 122 },
    label: { x: 98, y: 150 },
  },
];

const colorPalette = [
  "#E53935", "#1E88E5", "#43A047", "#8E24AA", "#F4511E",
  "#00897B", "#FB8C00", "#3949AB", "#D81B60", "#546E7A",
  "#6D4C41", "#039BE5", "#7CB342", "#C0CA33", "#FFB300",
  "#00ACC1", "#5E35B1", "#E67C73", "#33691E", "#BF360C",
  "#006064", "#4527A0", "#880E4F", "#37474F", "#1B5E20",
  "#0D47A1", "#4A148C",
];

export default function JawaBaratMap() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const activeCity = cities.find((c) => c.id === activeId);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <span style={styles.tag}>PROVINSI</span>
          <span style={styles.tag}>27 KOTA / KABUPATEN</span>
        </div>
        <h1 style={styles.title}>JAWA BARAT</h1>
        <p style={styles.subtitle}>Klik wilayah untuk melihat detail</p>
      </div>

      <div style={styles.mapContainer}>
        <svg
          viewBox="0 0 470 210"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.svg}
        >
          {/* Base background glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softglow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {cities.map((city, i) => {
            const color = colorPalette[i % colorPalette.length];
            const isHovered = hoveredId === city.id;
            const isActive = activeId === city.id;

            const fillColor = isActive
              ? color
              : isHovered
              ? color + "cc"
              : "#1c1c1c";

            const strokeColor = isActive
              ? color
              : isHovered
              ? color
              : "#3a3a3a";

            const strokeW = isActive ? 1.8 : isHovered ? 1.2 : 0.8;
            const filterAttr = isActive
              ? "url(#softglow)"
              : isHovered
              ? "url(#glow)"
              : "none";
            const scale = isActive ? 1.018 : isHovered ? 1.01 : 1;

            // Compute centroid for transform origin
            const cx = city.badge.cx;
            const cy = city.badge.cy;

            return (
              <g
                key={city.id}
                id={`kota-${city.id}`}
                className="city"
                style={{
                  cursor: "pointer",
                  transformOrigin: `${cx}px ${cy}px`,
                  transform: `scale(${scale})`,
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={() => setHoveredId(city.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleClick(city.id)}
              >
                <path
                  d={city.path}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeLinejoin="round"
                  filter={filterAttr}
                  style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
                />

                {/* Number badge — always show on active/hovered, else subtle */}
                {(isHovered || isActive) && (
                  <>
                    <circle
                      cx={city.badge.cx}
                      cy={city.badge.cy}
                      r={isActive ? 10 : 8}
                      fill={isActive ? "#ffffff" : color}
                      stroke={isActive ? color : "#ffffff"}
                      strokeWidth="1"
                      style={{ transition: "all 0.2s ease" }}
                    />
                    <text
                      x={city.badge.cx}
                      y={city.badge.cy + 4}
                      textAnchor="middle"
                      fontSize={isActive ? "8" : "7"}
                      fontFamily="'DM Mono', monospace"
                      fontWeight="900"
                      fill={isActive ? color : "#fff"}
                    >
                      {city.id}
                    </text>
                  </>
                )}

                {!isHovered && !isActive && (
                  <>
                    <circle
                      cx={city.badge.cx}
                      cy={city.badge.cy}
                      r={5}
                      fill="#2a2a2a"
                      stroke="#444"
                      strokeWidth="0.5"
                    />
                    <text
                      x={city.badge.cx}
                      y={city.badge.cy + 3.5}
                      textAnchor="middle"
                      fontSize="5"
                      fontFamily="monospace"
                      fontWeight="700"
                      fill="#666"
                    >
                      {city.id}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Province label */}
          <text
            x="235"
            y="206"
            textAnchor="middle"
            fontSize="7"
            fontFamily="monospace"
            fill="#333"
            letterSpacing="3"
          >
            JAWA BARAT · INDONESIA
          </text>
        </svg>
      </div>

      {/* Info panel */}
      <div style={styles.infoPanel}>
        {activeCity ? (
          <>
            <div
              style={{
                ...styles.infoDot,
                background: colorPalette[(activeCity.id - 1) % colorPalette.length],
              }}
            />
            <div>
              <div style={styles.infoName}>{activeCity.name}</div>
              <div style={styles.infoSub}>
                Ibu kota: <span style={styles.infoCapital}>{activeCity.capital}</span>
              </div>
            </div>
          </>
        ) : (
          <div style={styles.infoEmpty}>
            ← Pilih wilayah pada peta untuk detail
          </div>
        )}
      </div>

      {/* Legend grid */}
      <div style={styles.legendGrid}>
        {cities.map((city, i) => {
          const color = colorPalette[i % colorPalette.length];
          const isActive = activeId === city.id;
          return (
            <div
              key={city.id}
              style={{
                ...styles.legendItem,
                borderColor: isActive ? color : "transparent",
                background: isActive ? color + "18" : "transparent",
              }}
              onClick={() => handleClick(city.id)}
              onMouseEnter={() => setHoveredId(city.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                style={{
                  ...styles.legendDot,
                  background: color,
                  boxShadow: isActive ? `0 0 8px ${color}88` : "none",
                }}
              />
              <span style={{ ...styles.legendNum, color: isActive ? color : "#555" }}>
                {city.id}
              </span>
              <span style={{ ...styles.legendName, color: isActive ? "#fff" : "#666" }}>
                {city.name.replace("Kab. ", "").replace("Kota ", "")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#0a0a0a",
    minHeight: "100vh",
    padding: "32px 24px 48px",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    color: "#fff",
    maxWidth: 900,
    margin: "0 auto",
  },
  header: {
    marginBottom: 28,
  },
  headerTop: {
    display: "flex",
    gap: 12,
    marginBottom: 6,
  },
  tag: {
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "#444",
    border: "1px solid #222",
    padding: "2px 8px",
    borderRadius: 2,
  },
  title: {
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    letterSpacing: "0.05em",
    margin: 0,
    lineHeight: 1,
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 11,
    color: "#444",
    letterSpacing: "0.1em",
    marginTop: 6,
  },
  mapContainer: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 4,
    padding: "16px 8px",
    marginBottom: 16,
  },
  svg: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  infoPanel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 4,
    padding: "12px 18px",
    marginBottom: 16,
    minHeight: 52,
  },
  infoDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  },
  infoName: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.05em",
    color: "#fff",
  },
  infoSub: {
    fontSize: 10,
    color: "#555",
    marginTop: 2,
    letterSpacing: "0.05em",
  },
  infoCapital: {
    color: "#888",
  },
  infoEmpty: {
    fontSize: 11,
    color: "#333",
    letterSpacing: "0.08em",
  },
  legendGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 4,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "5px 8px",
    borderRadius: 3,
    cursor: "pointer",
    border: "1px solid",
    transition: "all 0.15s ease",
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
    transition: "box-shadow 0.2s",
  },
  legendNum: {
    fontSize: 9,
    fontWeight: 700,
    minWidth: 14,
  },
  legendName: {
    fontSize: 9,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    transition: "color 0.15s",
  },
};
