import React from "react";

const Overview = () => (
  <div
    style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px 60px" }}
  >
    <p
      style={{
        fontSize: "9px",
        color: "#2a2a2a",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: "32px",
      }}
    >
      Tampilan Ringkas Semua Provinsi
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "1.5rem",
            color: "var(--accent-jb)",
            letterSpacing: "0.08em",
            marginBottom: "12px",
          }}
        >
          JAWA BARAT{" "}
          <span
            style={{
              fontSize: "0.8rem",
              color: "#333",
              fontFamily: "'DM Mono',monospace",
            }}
          >
            27 wilayah · Bandung
          </span>
        </div>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          <svg
            className="city-map ov-map-mini"
            viewBox="0 0 470 210"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              opacity: "0.75",
            }}
          >
            <path
              d="M 10,30 L 420,18 L 455,120 L 440,150 L 400,185 L 320,165 L 220,120 L 60,155 L 30,152 L 8,135 Z"
              fill="none"
              stroke="#E53935"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeDasharray="4,3"
            />
            <path
              d="M 118,42 L 148,36 L 172,38 L 185,52 L 188,70 L 180,88 L 168,100 L 155,108 L 140,112 L 125,108 L 112,98 L 104,84 L 102,68 L 108,54 Z M 60,32 L 88,28 L 118,42 L 108,54 L 102,68 L 86,72 L 70,68 L 56,56 L 52,42 Z M 88,28 L 128,22 L 162,26 L 172,38 L 148,36 L 118,42 L 88,28 Z M 195,24 L 242,18 L 268,26 L 265,44 L 248,52 L 228,56 L 210,52 L 210,38 Z M 162,26 L 195,24 L 210,38 L 205,52 L 188,52 L 185,52 L 172,38 Z M 268,26 L 320,18 L 358,22 L 362,38 L 345,50 L 320,56 L 295,58 L 268,50 L 265,44 Z M 358,22 L 398,28 L 408,44 L 400,60 L 380,68 L 362,62 L 345,50 L 362,38 Z M 398,28 L 418,34 L 416,50 L 408,60 L 400,60 L 408,44 Z M 345,50 L 380,68 L 375,86 L 360,98 L 338,96 L 322,82 L 320,66 L 320,56 L 345,50 Z M 380,68 L 400,60 L 416,70 L 418,90 L 404,104 L 385,108 L 370,98 L 360,98 L 375,86 Z M 248,52 L 295,58 L 320,66 L 322,82 L 310,96 L 290,104 L 268,100 L 252,86 L 248,68 Z M 205,52 L 228,56 L 248,68 L 252,86 L 240,104 L 222,114 L 205,118 L 190,112 L 180,98 L 180,88 L 188,70 L 205,52 Z M 185,52 L 205,52 L 205,68 L 198,74 L 186,76 L 175,66 L 172,54 Z M 186,76 L 198,74 L 200,84 L 194,90 L 184,88 L 178,80 Z M 102,68 L 125,68 L 140,72 L 155,80 L 165,92 L 168,100 L 155,108 L 140,112 L 125,108 L 110,116 L 100,122 L 96,110 L 102,100 L 104,84 Z M 190,112 L 222,114 L 240,104 L 268,100 L 290,104 L 310,96 L 338,96 L 338,120 L 322,138 L 300,150 L 275,158 L 252,156 L 230,148 L 215,134 L 205,118 Z M 338,120 L 360,110 L 385,108 L 404,118 L 408,138 L 395,155 L 375,166 L 350,168 L 322,160 L 300,150 L 322,138 Z M 404,118 L 418,110 L 435,116 L 440,132 L 430,150 L 415,160 L 395,155 L 408,138 Z M 435,116 L 450,120 L 452,134 L 440,140 L 430,136 L 435,122 Z M 395,155 L 415,160 L 430,150 L 438,166 L 425,178 L 405,182 L 385,178 L 375,166 L 395,155 Z M 68,82 L 86,72 L 102,68 L 104,84 L 100,100 L 96,110 L 88,130 L 76,148 L 58,152 L 42,138 L 36,120 L 40,100 Z M 30,28 L 60,32 L 52,42 L 56,56 L 44,62 L 28,58 L 20,44 Z M 56,56 L 70,68 L 68,82 L 56,88 L 44,82 L 44,62 Z M 205,68 L 220,66 L 228,74 L 224,86 L 212,90 L 200,84 L 198,74 Z M 112,98 L 125,108 L 122,122 L 110,128 L 100,122 L 96,110 L 102,100 Z M 338,120 L 360,110 L 365,122 L 352,132 L 338,128 Z M 96,110 L 110,128 L 100,136 L 88,130 L 96,118 Z"
              fill="#E53935"
              fillOpacity="0.25"
              stroke="#E53935"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Jawa Tengah dan Jawa Timur dengan SVG yang sama dari kode asli */}
      {/* ... */}
    </div>
  </div>
);

export default Overview;
