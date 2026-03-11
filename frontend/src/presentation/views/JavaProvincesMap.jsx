import { useState } from "react";
import { CoverageCityGrid } from "./CityList";

// Paths carefully traced from reference image (colorful flat-style map)
// Each province matches the shape, color, and relative proportion from the reference
// ViewBox: 0 0 860 300

const provinces = [
  {
    id: "banten",
    number: 1,
    name: "Banten",
    capital: "Serang",
    labelX: 80,
    labelY: 210,
    color: "#fff",
    // West tip: has notched arm going NW (Semenanjung), main body below
    path: `M 20,220 L 30,210 L 25,190 L 40,200 L 54,190 L 50,180 L 50,150 L 50,190  L 53,148 L 63,112 L 90,112
           L 102,114 L 84,110 L 94,112 L 100,120 L 106,120 L 116,112 L 130,115 
           L 149,104 L 158,102 L 149,118 L 166,140 L 179,146 L 179,150 L 166,150 
           L 126,150 L 130,154 L 132,170 L 140,182 L 138,192
           L 142,190 L 150,198 L 158,198 L 149,215 L 150,240 L 124,232
           L 120,235 L 92,225 L 48,235 L 47,230 L 26,237
           L 10,236 L 4,224 Z`,
    cities: [
      { name: "Kota Tangerang", type: "Kota", covered: true },
      { name: "Kota Tangerang Selatan", type: "Kota", covered: true },
      { name: "Kota Serang", type: "Kota", covered: true },
      { name: "Kota Cilegon", type: "Kota", covered: true },
      { name: "Kab. Tangerang", type: "Kabupaten", covered: true },
      { name: "Kab. Serang", type: "Kabupaten", covered: false },
      { name: "Kab. Lebak", type: "Kabupaten", covered: false },
      { name: "Kab. Pandeglang", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "dki-jakarta",
    number: 2,
    name: "DKI Jakarta",
    capital: "Jakarta",
    labelX: 182,
    labelY: 185,
    color: "#fff",
    // Tiny coastal province on the north
    path: `M 163,125 L 174,127 L 188,122  L 210,126 L 200 145 
              L 190,146 
           L171,140 L 161,128 Z`,
    cities: [
      { name: "Jakarta Pusat", type: "Kota Adm.", covered: true },
      { name: "Jakarta Utara", type: "Kota Adm.", covered: true },
      { name: "Jakarta Barat", type: "Kota Adm.", covered: true },
      { name: "Jakarta Selatan", type: "Kota Adm.", covered: true },
      { name: "Jakarta Timur", type: "Kota Adm.", covered: true },
      { name: "Kep. Seribu", type: "Kab. Adm.", covered: false },
    ],
  },
  {
    id: "jawa-barat",
    number: 3,
    name: "Jawa Barat",
    capital: "Bandung",
    labelX: 280,
    labelY: 235,
    color: "#fff",
    // Large western province
    path: `M 130,152 L 157,155 L 186,152 L 198,155 L 209,145 L 218,105 L 224,100 L 242,110 L 258,108 L 272,128 L 290,133
           L 310,140 L 330,130 L 350,138 L 358,135 L 355,150 L  376,160 L 383,180 L 404,176 L 424,180
           L 420,190 L 400,193 L 400,210 L 410,210 L 424,220 L 392,230 L 390,242
           L 344,241 L 326,248  L 276,230 L 206,235
           L 168,257   L 158,266 L 160,255 L 170,230 L 156,214
           L 160,204 L 165,194 L 150,190 L 136,172 Z`,
    cities: [
      { name: "Kota Bandung", type: "Kota", covered: true },
      { name: "Kota Bekasi", type: "Kota", covered: true },
      { name: "Kota Depok", type: "Kota", covered: true },
      { name: "Kota Bogor", type: "Kota", covered: true },
      { name: "Kota Cimahi", type: "Kota", covered: true },
      { name: "Kab. Bogor", type: "Kabupaten", covered: true },
      { name: "Kab. Bekasi", type: "Kabupaten", covered: true },
      { name: "Kab. Karawang", type: "Kabupaten", covered: false },
      { name: "Kab. Subang", type: "Kabupaten", covered: false },
      { name: "Kab. Purwakarta", type: "Kabupaten", covered: false },
      { name: "Kab. Sukabumi", type: "Kabupaten", covered: false },
      { name: "Kab. Cianjur", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "jawa-tengah",
    number: 4,
    name: "Jawa Tengah",
    capital: "Semarang",
    labelX: 510,
    labelY: 228,
    color: "#fff",
    // Wide central province
    path: `M 425,192 L 430,180 L 410,170 L 422,157 L 438,158
           L 456,151 L 456,145 L 497,144 L 518,146 L 535,142 L 538,136 L 556,120  L 564,105 L 579,100 L 598,110 L 608,120 L 639,110 L 650,120 
           L 636,140 L 645,150 L 620,160 L 601,150 L 583,158 L 600,200 L 620,200 L 638,210 L 582,254
           L 588,268 L 580,232 L 537,223 L 520,201 L 501,216
           L 490,208 L 470,237 L 472,242 L 455,234 L 440,233
           L 428,234 L 436,233 L 404,238 L 392,236 L 403,228
           L 403,232 L 420,226 L 430,220 L 410,204 L 404,197 Z`,
    cities: [
      { name: "Kota Semarang", type: "Kota", covered: true },
      { name: "Kota Solo", type: "Kota", covered: true },
      { name: "Kota Magelang", type: "Kota", covered: true },
      { name: "Kab. Semarang", type: "Kabupaten", covered: true },
      { name: "Kab. Boyolali", type: "Kabupaten", covered: false },
      { name: "Kab. Klaten", type: "Kabupaten", covered: false },
      { name: "Kab. Purworejo", type: "Kabupaten", covered: false },
      { name: "Kab. Banyumas", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "diy",
    number: 5,
    name: "DI Yogyakarta",
    capital: "Yogyakarta",
    labelX: 524,
    labelY: 288,
    color: "#fff",
    // Small enclave on south coast of Jawa Tengah
    path: `M 482,224 L 488,216 L 490,211 L 503,220 L 520,205
           L 532,224 L 572,236 L 580,250 L 474,246 
           L 472,244 L 477,234 Z`,
    cities: [
      { name: "Kota Yogyakarta", type: "Kota", covered: true },
      { name: "Kab. Sleman", type: "Kabupaten", covered: true },
      { name: "Kab. Bantul", type: "Kabupaten", covered: true },
      { name: "Kab. Gunungkidul", type: "Kabupaten", covered: false },
      { name: "Kab. Kulon Progo", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "jawa-timur",
    number: 6,
    name: "Jawa Timur",
    capital: "Surabaya",
    labelX: 710,
    labelY: 240,
    color: "#fff",
    // Largest province + Madura island
    path: `M 602,197 L 586,160 L 599,153 L 624,166 L 642,157 L 654,150 L 641,140 L 655,120 
           L 662,120 L 684,126 L 706,123  L 728,122 L 755,126
           L 758,149 L 784,138 L 776,160 L 803,174 L 825,180
           L 891,166 L 892,210 L 898,202 L 877,244 L 811,221 L 771,237
           L 770,249 L 759,247 L 679,251 L 661,251 
           L 653,258 L 640,250 L 635,250 L 621,250 L 587,256
           L 644,212 L 624,198 Z
           M 812,93 L 828,88 L 848,76 L 866,80 L 880,70
           L 884,93 L 876,104 L 860,109 L 842,118 L 827,122
           L 756,112 L 772,95 Z`,
    cities: [
      { name: "Kota Surabaya", type: "Kota", covered: true },
      { name: "Kota Malang", type: "Kota", covered: true },
      { name: "Kota Sidoarjo", type: "Kota", covered: true },
      { name: "Kota Gresik", type: "Kota", covered: true },
      { name: "Kab. Malang", type: "Kabupaten", covered: true },
      { name: "Kab. Jombang", type: "Kabupaten", covered: false },
      { name: "Kab. Kediri", type: "Kabupaten", covered: false },
      { name: "Kab. Blitar", type: "Kabupaten", covered: false },
      { name: "Kab. Jember", type: "Kabupaten", covered: false },
      { name: "Kab. Banyuwangi", type: "Kabupaten", covered: false },
    ],
  },
];

export default function JavaProvincesMap() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState("dki-jakarta");

  const brighten = (hex, pct) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, ((num >> 16) & 255) + Math.round(255 * pct));
    const g = Math.min(255, ((num >> 8) & 255) + Math.round(255 * pct));
    const b = Math.min(255, (num & 255) + Math.round(255 * pct));
    return `rgba(${255},${0},${0},${pct})`;
  };

  const getFill = (id, color) => {
    const warna = "#f00";
    if (active === id) return brighten(color, 1);
    if (hovered === id) return brighten(warna, 0.74);
    return color;
  };

  const displayProvince =
    provinces.find((p) => p.id === active) ||
    provinces.find((p) => p.id === hovered);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          padding: "28px 16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative dots */}
        {[
          [8, 12],
          [18, 72],
          [28, 38],
          [38, 82],
          [48, 55],
          [58, 18],
          [68, 66],
          [78, 30],
          [88, 50],
          [95, 80],
          [5, 45],
          [15, 92],
          [25, 68],
          [45, 25],
          [55, 90],
          [65, 42],
          [75, 78],
          [85, 15],
          [35, 60],
          [92, 35],
        ].map(([l, t], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              width: i % 4 === 0 ? "4px" : "2px",
              height: i % 4 === 0 ? "4px" : "2px",
              background: `rgba(255,255,255,${0.15 + (i % 3) * 0.08})`,
              top: `${t}%`,
              left: `${l}%`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "18px", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "clamp(20px,3.5vw,32px)",
              fontWeight: "900",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#fff",
              margin: 0,
              textShadow: "0 2px 20px rgba(70,150,255,0.5)",
            }}
          >
            PULAU JAWA
          </h1>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#6688aa",
              margin: "5px 0 0",
              textTransform: "uppercase",
            }}
          >
            Peta Interaktif Provinsi · Indonesia
          </p>
        </div>

        {/* MAP */}
        <div style={{ width: "100%", maxWidth: "900px", zIndex: 1 }}>
          <svg
            viewBox="25 80 795 185"
            width="100%"
            style={{ display: "block", overflow: "visible" }}
            shapeRendering="geometricPrecision"
          >
            {provinces.map((p) => {
              const isActive = active === p.id;
              const isHov = hovered === p.id;
              return (
                <g key={p.id}>
                  <path
                    d={p.path}
                    fill={getFill(p.id, p.color)}
                    stroke="#000"
                    strokeWidth={isActive ? 2.5 : isHov ? 2 : 4}
                    strokeLinejoin="round"
                    style={{
                      cursor: "pointer",
                      transition: "fill 0.2s ease",
                      filter: isActive
                        ? `drop-shadow(0 0 14px ${p.color}cc)`
                        : isHov
                          ? `drop-shadow(0 0 7px ${p.color}99)`
                          : "drop-shadow(0 2px 5px rgba(0,0,0,0.45))",
                    }}
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(active === p.id ? null : p.id)}
                  />
                  {/* Province name */}
                  {p.name.split(" ").map((word, i) => (
                    <text
                      key={i}
                      x={p.labelX}
                      y={p.labelY - 80 + i * 9}
                      textAnchor="top"
                      style={{
                        transform:
                          p.id === "dki-jakarta"
                            ? "translateX(-20px)"
                            : p.id === "diy"
                              ? "translateY(50px) translateX(-20px)"
                              : "",
                        fontSize: ".7em",
                        fontWeight: "800",
                        fill: `${isActive || isHov ? "#fff" : "#000"}`,
                        fontFamily: "'Segoe UI', Arial, sans-serif",
                        pointerEvents: "none",
                        paintOrder: "stroke",
                        stroke: "rgba(255,255,255,1)",
                        strokeWidth: isActive || isHov ? 0 : 2.5,
                      }}
                    >
                      {word}
                    </text>
                  ))}
                  {/* Number circle */}
                  <circle
                    cx={p.labelX}
                    cy={p.labelY - 50}
                    r={9}
                    fill="#000"
                    stroke={isActive || isHov ? "rgba(255,255,255,1)" : "#f00"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{ pointerEvents: "none", transition: "stroke 0.2s" }}
                  />
                  <text
                    x={p.labelX}
                    y={p.labelY - 50}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                      fontSize: "7.5px",
                      fontWeight: "900",
                      fill: "#fff",
                      fontFamily: "Arial, sans-serif",
                      pointerEvents: "none",
                    }}
                  >
                    {p.number}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info + Legend */}
        <div
          style={{
            marginTop: "18px",
            zIndex: 1,
            width: "100%",
            maxWidth: "900px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{ minHeight: "58px", display: "flex", alignItems: "center" }}
          >
            <p
              style={{
                color: "#3a5070",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Hover atau klik provinsi untuk detail
            </p>
          </div>

          {/* <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {provinces.map((p) => {
              const isActive = active === p.id;
              const isHov = hovered === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(active === p.id ? null : p.id)}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    background: isActive
                      ? "rgba(255,255,255,0.13)"
                      : isHov
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${isActive ? p.color : isHov ? p.color + "88" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "8px",
                    padding: "6px 13px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    color: isActive || isHov ? "#fff" : "#6688aa",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: p.color,
                      display: "inline-block",
                      flexShrink: 0,
                      boxShadow: isActive ? `0 0 7px ${p.color}` : "none",
                      transition: "box-shadow 0.15s",
                    }}
                  />
                  {p.name}
                </button>
              );
            })}
          </div> */}
        </div>
      </div>
      <CoverageCityGrid
        provinces={provinces}
        defaultProvinceId="dki"
        activeIdd={active}
      />
    </>
  );
}
