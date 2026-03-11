import { useState } from "react";

const cities = [
  {
    id: 1,
    name: "Kab. Cilacap",
    capital: "Cilacap",
    color: "#E53935",
    path: "M 20,145 L 48,138 L 70,135 L 85,140 L 92,158 L 88,178 L 78,195 L 60,208 L 40,215 L 22,212 L 12,198 L 10,178 L 14,160 Z",
    badge: { cx: 52, cy: 175 },
  },
  {
    id: 2,
    name: "Kab. Banyumas",
    capital: "Purwokerto",
    color: "#1E88E5",
    path: "M 48,138 L 78,128 L 105,125 L 115,135 L 112,155 L 100,168 L 85,172 L 70,168 L 55,162 L 48,148 Z",
    badge: { cx: 82, cy: 148 },
  },
  {
    id: 3,
    name: "Kab. Purbalingga",
    capital: "Purbalingga",
    color: "#43A047",
    path: "M 105,125 L 128,118 L 145,122 L 148,138 L 138,150 L 122,155 L 112,150 L 112,135 Z",
    badge: { cx: 128, cy: 137 },
  },
  {
    id: 4,
    name: "Kab. Banjarnegara",
    capital: "Banjarnegara",
    color: "#8E24AA",
    path: "M 128,118 L 155,108 L 178,112 L 185,128 L 180,145 L 165,155 L 148,155 L 138,148 L 148,135 Z",
    badge: { cx: 158, cy: 132 },
  },
  {
    id: 5,
    name: "Kab. Brebes",
    capital: "Brebes",
    color: "#F4511E",
    path: "M 20,80 L 50,70 L 72,68 L 85,75 L 90,90 L 82,108 L 68,118 L 50,122 L 32,118 L 18,108 L 14,92 Z",
    badge: { cx: 55, cy: 95 },
  },
  {
    id: 6,
    name: "Kota Tegal",
    capital: "Tegal",
    color: "#00897B",
    path: "M 50,70 L 68,65 L 78,72 L 78,82 L 68,88 L 56,84 L 50,76 Z",
    badge: { cx: 64, cy: 77 },
  },
  {
    id: 7,
    name: "Kab. Tegal",
    capital: "Slawi",
    color: "#FB8C00",
    path: "M 68,65 L 95,58 L 112,62 L 115,78 L 108,92 L 90,100 L 75,100 L 68,90 L 75,78 Z",
    badge: { cx: 92, cy: 80 },
  },
  {
    id: 8,
    name: "Kab. Pemalang",
    capital: "Pemalang",
    color: "#3949AB",
    path: "M 112,62 L 138,55 L 155,58 L 158,75 L 150,90 L 135,98 L 118,96 L 108,86 L 115,72 Z",
    badge: { cx: 135, cy: 76 },
  },
  {
    id: 9,
    name: "Kota Pekalongan",
    capital: "Pekalongan",
    color: "#D81B60",
    path: "M 155,58 L 170,54 L 178,62 L 174,72 L 162,76 L 155,68 Z",
    badge: { cx: 164, cy: 64 },
  },
  {
    id: 10,
    name: "Kab. Pekalongan",
    capital: "Kajen",
    color: "#546E7A",
    path: "M 155,68 L 162,76 L 175,72 L 185,78 L 185,95 L 172,105 L 155,108 L 143,100 L 138,85 L 148,72 Z",
    badge: { cx: 162, cy: 90 },
  },
  {
    id: 11,
    name: "Kab. Batang",
    capital: "Batang",
    color: "#6D4C41",
    path: "M 170,54 L 198,48 L 215,52 L 215,68 L 205,80 L 190,85 L 178,80 L 175,68 L 178,60 Z",
    badge: { cx: 198, cy: 67 },
  },
  {
    id: 12,
    name: "Kab. Wonosobo",
    capital: "Wonosobo",
    color: "#039BE5",
    path: "M 155,108 L 178,112 L 195,108 L 200,125 L 192,140 L 175,148 L 158,145 L 148,132 L 150,115 Z",
    badge: { cx: 175, cy: 128 },
  },
  {
    id: 13,
    name: "Kab. Kebumen",
    capital: "Kebumen",
    color: "#7CB342",
    path: "M 115,155 L 138,150 L 148,155 L 148,172 L 138,185 L 120,192 L 102,188 L 92,175 L 95,158 L 108,152 Z",
    badge: { cx: 122, cy: 172 },
  },
  {
    id: 14,
    name: "Kab. Purworejo",
    capital: "Purworejo",
    color: "#C0CA33",
    path: "M 148,155 L 165,155 L 180,160 L 182,178 L 172,192 L 155,198 L 138,192 L 130,180 L 138,168 Z",
    badge: { cx: 158, cy: 175 },
  },
  {
    id: 15,
    name: "Kab. Magelang",
    capital: "Mungkid",
    color: "#FFB300",
    path: "M 192,140 L 215,135 L 232,140 L 235,158 L 225,172 L 208,178 L 192,172 L 182,158 L 185,142 Z",
    badge: { cx: 210, cy: 158 },
  },
  {
    id: 16,
    name: "Kota Magelang",
    capital: "Magelang",
    color: "#00ACC1",
    path: "M 215,148 L 225,145 L 230,155 L 222,162 L 214,158 Z",
    badge: { cx: 220, cy: 153 },
  },
  {
    id: 17,
    name: "Kab. Temanggung",
    capital: "Temanggung",
    color: "#5E35B1",
    path: "M 195,108 L 218,104 L 235,108 L 238,125 L 232,140 L 215,138 L 200,130 L 195,118 Z",
    badge: { cx: 218, cy: 120 },
  },
  {
    id: 18,
    name: "Kab. Kendal",
    capital: "Kendal",
    color: "#E67C73",
    path: "M 215,52 L 248,46 L 265,52 L 265,68 L 255,82 L 240,88 L 225,85 L 215,75 L 215,60 Z",
    badge: { cx: 242, cy: 67 },
  },
  {
    id: 19,
    name: "Kab. Semarang",
    capital: "Ungaran",
    color: "#33691E",
    path: "M 238,88 L 255,82 L 272,85 L 282,98 L 278,115 L 262,122 L 248,120 L 235,112 L 232,98 Z",
    badge: { cx: 258, cy: 104 },
  },
  {
    id: 20,
    name: "Kota Semarang",
    capital: "Semarang",
    color: "#f97316",
    path: "M 248,46 L 272,40 L 290,44 L 292,58 L 282,68 L 268,72 L 255,68 L 248,58 Z",
    badge: { cx: 270, cy: 56 },
  },
  {
    id: 21,
    name: "Kota Salatiga",
    capital: "Salatiga",
    color: "#BF360C",
    path: "M 255,90 L 265,87 L 272,95 L 266,104 L 256,103 L 252,96 Z",
    badge: { cx: 262, cy: 96 },
  },
  {
    id: 22,
    name: "Kab. Boyolali",
    capital: "Boyolali",
    color: "#006064",
    path: "M 278,100 L 298,95 L 315,100 L 318,115 L 308,128 L 292,132 L 278,125 L 272,112 Z",
    badge: { cx: 296, cy: 114 },
  },
  {
    id: 23,
    name: "Kab. Demak",
    capital: "Demak",
    color: "#4527A0",
    path: "M 290,44 L 318,38 L 335,44 L 335,60 L 322,70 L 305,72 L 292,65 L 290,52 Z",
    badge: { cx: 314, cy: 55 },
  },
  {
    id: 24,
    name: "Kab. Kudus",
    capital: "Kudus",
    color: "#880E4F",
    path: "M 335,44 L 358,40 L 370,48 L 368,62 L 355,70 L 340,68 L 330,58 Z",
    badge: { cx: 350, cy: 55 },
  },
  {
    id: 25,
    name: "Kab. Jepara",
    capital: "Jepara",
    color: "#37474F",
    path: "M 318,38 L 348,28 L 368,30 L 375,42 L 368,54 L 355,60 L 335,58 L 322,50 Z",
    badge: { cx: 348, cy: 44 },
  },
  {
    id: 26,
    name: "Kab. Pati",
    capital: "Pati",
    color: "#1B5E20",
    path: "M 370,48 L 400,42 L 420,48 L 422,65 L 410,78 L 392,82 L 375,78 L 365,65 L 368,54 Z",
    badge: { cx: 394, cy: 62 },
  },
  {
    id: 27,
    name: "Kab. Rembang",
    capital: "Rembang",
    color: "#0D47A1",
    path: "M 420,48 L 462,40 L 488,46 L 490,62 L 475,72 L 452,75 L 430,72 L 418,62 Z",
    badge: { cx: 454, cy: 58 },
  },
  {
    id: 28,
    name: "Kab. Blora",
    capital: "Blora",
    color: "#4A148C",
    path: "M 462,62 L 488,58 L 512,62 L 525,78 L 520,98 L 505,110 L 486,112 L 468,105 L 460,88 L 462,72 Z",
    badge: { cx: 492, cy: 86 },
  },
  {
    id: 29,
    name: "Kab. Grobogan",
    capital: "Purwodadi",
    color: "#B71C1C",
    path: "M 322,70 L 355,68 L 392,78 L 420,68 L 452,75 L 462,88 L 452,105 L 428,115 L 400,118 L 372,115 L 345,108 L 322,100 L 315,85 Z",
    badge: { cx: 388, cy: 96 },
  },
  {
    id: 30,
    name: "Kab. Klaten",
    capital: "Klaten",
    color: "#00897B",
    path: "M 290,152 L 312,148 L 325,158 L 322,172 L 308,180 L 292,178 L 282,168 L 284,156 Z",
    badge: { cx: 305, cy: 164 },
  },
  {
    id: 31,
    name: "Kota Surakarta",
    capital: "Solo",
    color: "#f97316",
    path: "M 330,148 L 345,145 L 352,155 L 345,164 L 332,163 L 326,155 Z",
    badge: { cx: 338, cy: 155 },
  },
  {
    id: 32,
    name: "Kab. Sukoharjo",
    capital: "Sukoharjo",
    color: "#FB8C00",
    path: "M 315,160 L 332,158 L 345,168 L 342,182 L 328,190 L 312,186 L 306,175 Z",
    badge: { cx: 326, cy: 174 },
  },
  {
    id: 33,
    name: "Kab. Karanganyar",
    capital: "Karanganyar",
    color: "#3949AB",
    path: "M 352,138 L 375,132 L 390,140 L 388,158 L 372,168 L 355,165 L 344,155 L 348,142 Z",
    badge: { cx: 368, cy: 152 },
  },
  {
    id: 34,
    name: "Kab. Sragen",
    capital: "Sragen",
    color: "#D81B60",
    path: "M 390,118 L 420,115 L 445,122 L 448,138 L 435,150 L 415,155 L 395,150 L 382,138 L 385,124 Z",
    badge: { cx: 415, cy: 136 },
  },
  {
    id: 35,
    name: "Kab. Wonogiri",
    capital: "Wonogiri",
    color: "#546E7A",
    path: "M 342,182 L 368,172 L 395,168 L 420,162 L 445,170 L 452,188 L 440,208 L 418,220 L 392,225 L 365,218 L 342,205 L 332,192 Z",
    badge: { cx: 390, cy: 196 },
  },
];

export default function JawaTengahMap() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => setActiveId((prev) => (prev === id ? null : id));

  const activeCity = cities.find((c) => c.id === activeId);

  return (
    <div style={s.wrapper}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.tags}>
          {["Provinsi", "29 Kabupaten", "6 Kota", "35 Wilayah"].map((t) => (
            <span key={t} style={s.tag}>
              {t}
            </span>
          ))}
        </div>
        <h1 style={s.title}>
          JAWA <span style={{ color: "#f97316" }}>TENGAH</span>
        </h1>
        <p style={s.subtitle}>Klik wilayah untuk detail · Ibu kota: Semarang</p>
      </div>

      {/* Map */}
      <div style={s.mapContainer}>
        <svg
          viewBox="0 0 600 280"
          xmlns="http://www.w3.org/2000/svg"
          style={s.svg}
        >
          <defs>
            <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="cb" />
              <feMerge>
                <feMergeNode in="cb" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="aglow2" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="cb" />
              <feMerge>
                <feMergeNode in="cb" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {cities.map((city) => {
            const isHov = hoveredId === city.id;
            const isAct = activeId === city.id;
            const fill = isAct
              ? city.color
              : isHov
                ? city.color + "bb"
                : "#181818";
            const stroke = isAct || isHov ? city.color : "#2a2a2a";
            const sw = isAct ? 1.6 : isHov ? 1.1 : 0.7;
            const filt = isAct
              ? "url(#aglow2)"
              : isHov
                ? "url(#glow2)"
                : "none";

            const bR = isAct ? 10 : isHov ? 8 : 6;
            const bFill = isAct ? "#fff" : isHov ? city.color : "#252525";
            const bStr = isAct ? city.color : isHov ? "#fff" : "#3a3a3a";
            const nFill = isAct ? city.color : isHov ? "#fff" : "#555";
            const nSz = isAct ? "7.5" : isHov ? "6.5" : "5.5";
            const num = city.id < 10 ? `0${city.id}` : `${city.id}`;

            return (
              <g
                key={city.id}
                id={`jt-${city.id}`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredId(city.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleClick(city.id)}
              >
                <path
                  d={city.path}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={sw}
                  strokeLinejoin="round"
                  filter={filt}
                  style={{ transition: "fill 0.18s,stroke 0.18s" }}
                />
                <circle
                  cx={city.badge.cx}
                  cy={city.badge.cy}
                  r={bR}
                  fill={bFill}
                  stroke={bStr}
                  strokeWidth="0.6"
                />
                <text
                  x={city.badge.cx}
                  y={city.badge.cy + 3.5}
                  textAnchor="middle"
                  fontSize={nSz}
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={nFill}
                >
                  {num}
                </text>
              </g>
            );
          })}

          <text
            x="300"
            y="272"
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="monospace"
            fill="#1a1a1a"
            letterSpacing="4"
          >
            JAWA TENGAH · INDONESIA · 35 WILAYAH
          </text>
        </svg>
      </div>

      {/* Info */}
      <div
        style={{
          ...s.infoPanel,
          borderColor: activeCity ? activeCity.color + "44" : "#181818",
        }}
      >
        {activeCity ? (
          <>
            <div
              style={{
                ...s.infoDot,
                background: activeCity.color,
                boxShadow: `0 0 12px ${activeCity.color}55`,
              }}
            />
            <div>
              <div style={s.infoName}>{activeCity.name}</div>
              <div style={s.infoMeta}>
                Ibu kota:{" "}
                <span style={s.infoCapital}>{activeCity.capital}</span>
                &nbsp;·&nbsp; No.{" "}
                {activeCity.id < 10 ? "0" + activeCity.id : activeCity.id}
                &nbsp;·&nbsp;{" "}
                {activeCity.name.startsWith("Kota")
                  ? "Kota Otonom"
                  : "Kabupaten"}
              </div>
            </div>
          </>
        ) : (
          <div style={s.infoEmpty}>← Klik wilayah pada peta untuk detail</div>
        )}
      </div>

      {/* Legend */}
      <div style={s.legendHeader}>Daftar Wilayah</div>
      <div style={s.legendGrid}>
        {cities.map((city) => {
          const isAct = activeId === city.id;
          return (
            <div
              key={city.id}
              style={{
                ...s.legendItem,
                "--color": city.color,
                borderColor: isAct ? city.color : "transparent",
                background: isAct ? city.color + "18" : "transparent",
              }}
              onClick={() => handleClick(city.id)}
              onMouseEnter={() => setHoveredId(city.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                style={{
                  ...s.legendDot,
                  background: city.color,
                  boxShadow: isAct ? `0 0 7px ${city.color}88` : "none",
                }}
              />
              <span
                style={{ ...s.legendNum, color: isAct ? city.color : "#444" }}
              >
                {city.id < 10 ? `0${city.id}` : city.id}
              </span>
              <span style={{ ...s.legendName, color: isAct ? "#ddd" : "#555" }}>
                {city.name.replace("Kab. ", "").replace("Kota ", "")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  wrapper: {
    background: "#080808",
    minHeight: "100vh",
    padding: "32px 24px 60px",
    fontFamily: "'DM Mono','Courier New',monospace",
    color: "#fff",
    maxWidth: 980,
    margin: "0 auto",
  },
  header: { marginBottom: 28 },
  tags: { display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" },
  tag: {
    fontSize: 8,
    letterSpacing: "0.22em",
    color: "#3a3a3a",
    border: "1px solid #1e1e1e",
    padding: "3px 10px",
    borderRadius: 2,
  },
  title: {
    fontFamily: "'Bebas Neue','Impact',sans-serif",
    fontSize: "clamp(2.8rem,7vw,5rem)",
    letterSpacing: "0.04em",
    lineHeight: 0.95,
    margin: 0,
  },
  subtitle: {
    fontSize: 10,
    color: "#333",
    letterSpacing: "0.14em",
    marginTop: 10,
  },
  mapContainer: {
    background: "#0e0e0e",
    border: "1px solid #181818",
    borderRadius: 6,
    padding: "20px 12px 12px",
    marginBottom: 14,
  },
  svg: { width: "100%", height: "auto", display: "block" },
  infoPanel: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#0e0e0e",
    border: "1px solid",
    borderRadius: 6,
    padding: "14px 20px",
    marginBottom: 14,
    minHeight: 58,
    transition: "border-color 0.2s",
  },
  infoDot: { width: 12, height: 12, borderRadius: "50%", flexShrink: 0 },
  infoName: { fontSize: 14, fontWeight: 700, letterSpacing: "0.05em" },
  infoMeta: {
    fontSize: 9,
    color: "#444",
    marginTop: 3,
    letterSpacing: "0.08em",
  },
  infoCapital: { color: "#777" },
  infoEmpty: { fontSize: 10, color: "#2a2a2a", letterSpacing: "0.1em" },
  legendHeader: {
    fontSize: 8,
    color: "#2a2a2a",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  legendGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: 3,
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
  legendDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  legendNum: { fontSize: 8, fontWeight: 700, minWidth: 18 },
  legendName: {
    fontSize: 8,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};
