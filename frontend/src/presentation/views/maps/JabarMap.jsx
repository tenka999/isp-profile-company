import React from "react";

const JabarMap = ({
  selectedCity,
  hoverCity,
  onSelectCity,
  onHoverCity,
  onUnhoverCity,
}) => {
  return (
    <svg
      className="city-map"
      viewBox="0 0 470 210"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow-jb">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="aglow-jb">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Kab. Bogor */}
      <g
        className="city"
        onClick={() => onSelectCity("jabar", 1)}
        onMouseEnter={() => onHoverCity("jabar", 1)}
        onMouseLeave={() => onUnhoverCity("jabar", 1)}
      >
        <path
          d="M 118,42 L 148,36 L 172,38 L 185,52 L 188,70 L 180,88 L 168,100 L 155,108 L 140,112 L 125,108 L 112,98 L 104,84 L 102,68 L 108,54 Z"
          fill={
            selectedCity === 1
              ? "#E53935"
              : hoverCity === 1
                ? "#E53935bb"
                : "#181818"
          }
          stroke={selectedCity === 1 || hoverCity === 1 ? "#E53935" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 1 ? "1.6" : hoverCity === 1 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 1
              ? "url(#aglow-jb)"
              : hoverCity === 1
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="145"
          cy="76"
          r={selectedCity === 1 ? "10" : hoverCity === 1 ? "8" : "6"}
          fill={
            selectedCity === 1 ? "#fff" : hoverCity === 1 ? "#E53935" : "#222"
          }
          stroke={
            selectedCity === 1
              ? "#E53935"
              : hoverCity === 1
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="145"
          y="79"
          textAnchor="middle"
          fontSize={
            selectedCity === 1 ? "7.5" : hoverCity === 1 ? "6.5" : "5.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 1 ? "#E53935" : hoverCity === 1 ? "#fff" : "#555"
          }
        >
          01
        </text>
      </g>

      {/* Kota Bogor */}
      <g
        className="city"
        onClick={() => onSelectCity("jabar", 2)}
        onMouseEnter={() => onHoverCity("jabar", 2)}
        onMouseLeave={() => onUnhoverCity("jabar", 2)}
      >
        <path
          d="M 112,98 L 125,108 L 122,122 L 110,128 L 100,122 L 96,110 L 102,100 Z"
          fill={
            selectedCity === 2
              ? "#1E88E5"
              : hoverCity === 2
                ? "#1E88E5bb"
                : "#181818"
          }
          stroke={selectedCity === 2 || hoverCity === 2 ? "#1E88E5" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 2 ? "1.6" : hoverCity === 2 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 2
              ? "url(#aglow-jb)"
              : hoverCity === 2
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="112"
          cy="112"
          r={selectedCity === 2 ? "10" : hoverCity === 2 ? "8" : "5"}
          fill={
            selectedCity === 2 ? "#fff" : hoverCity === 2 ? "#1E88E5" : "#222"
          }
          stroke={
            selectedCity === 2
              ? "#1E88E5"
              : hoverCity === 2
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="112"
          y="115"
          textAnchor="middle"
          fontSize={selectedCity === 2 ? "7.5" : hoverCity === 2 ? "6.5" : "5"}
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 2 ? "#1E88E5" : hoverCity === 2 ? "#fff" : "#555"
          }
        >
          02
        </text>
      </g>

      {/* Kab. Bekasi */}
      {/* 3. Kab. Bekasi */}
      <g
        className="city"
        id="jb-3"
        onClick={() => onSelectCity("jabar", 3)}
        onMouseEnter={() => onHoverCity("jabar", 3)}
        onMouseLeave={() => onUnhoverCity("jabar", 3)}
      >
        <path
          d="M 60,32 L 88,28 L 118,42 L 108,54 L 102,68 L 86,72 L 70,68 L 56,56 L 52,42 Z"
          fill={
            selectedCity === 3
              ? "#43A047"
              : hoverCity === 3
                ? "#43A047bb"
                : "#181818"
          }
          stroke={selectedCity === 3 || hoverCity === 3 ? "#43A047" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 3 ? "1.6" : hoverCity === 3 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 3
              ? "url(#aglow-jb)"
              : hoverCity === 3
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="86"
          cy="52"
          r={selectedCity === 3 ? "10" : hoverCity === 3 ? "8" : "6"}
          fill={
            selectedCity === 3 ? "#fff" : hoverCity === 3 ? "#43A047" : "#222"
          }
          stroke={
            selectedCity === 3
              ? "#43A047"
              : hoverCity === 3
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="86"
          y="55"
          textAnchor="middle"
          fontSize={
            selectedCity === 3 ? "7.5" : hoverCity === 3 ? "6.5" : "5.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 3 ? "#43A047" : hoverCity === 3 ? "#fff" : "#555"
          }
        >
          03
        </text>
      </g>

      {/* 4. Kota Bekasi */}
      <g
        className="city"
        id="jb-4"
        onClick={() => onSelectCity("jabar", 4)}
        onMouseEnter={() => onHoverCity("jabar", 4)}
        onMouseLeave={() => onUnhoverCity("jabar", 4)}
      >
        <path
          d="M 30,28 L 60,32 L 52,42 L 56,56 L 44,62 L 28,58 L 20,44 Z"
          fill={
            selectedCity === 4
              ? "#8E24AA"
              : hoverCity === 4
                ? "#8E24AAbb"
                : "#181818"
          }
          stroke={selectedCity === 4 || hoverCity === 4 ? "#8E24AA" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 4 ? "1.6" : hoverCity === 4 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 4
              ? "url(#aglow-jb)"
              : hoverCity === 4
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="40"
          cy="44"
          r={selectedCity === 4 ? "10" : hoverCity === 4 ? "8" : "5"}
          fill={
            selectedCity === 4 ? "#fff" : hoverCity === 4 ? "#8E24AA" : "#222"
          }
          stroke={
            selectedCity === 4
              ? "#8E24AA"
              : hoverCity === 4
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="40"
          y="47"
          textAnchor="middle"
          fontSize={selectedCity === 4 ? "7.5" : hoverCity === 4 ? "6.5" : "5"}
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 4 ? "#8E24AA" : hoverCity === 4 ? "#fff" : "#555"
          }
        >
          04
        </text>
      </g>

      {/* 5. Kota Depok */}
      <g
        className="city"
        id="jb-5"
        onClick={() => onSelectCity("jabar", 5)}
        onMouseEnter={() => onHoverCity("jabar", 5)}
        onMouseLeave={() => onUnhoverCity("jabar", 5)}
      >
        <path
          d="M 56,56 L 70,68 L 68,82 L 56,88 L 44,82 L 44,62 Z"
          fill={
            selectedCity === 5
              ? "#F4511E"
              : hoverCity === 5
                ? "#F4511Ebb"
                : "#181818"
          }
          stroke={selectedCity === 5 || hoverCity === 5 ? "#F4511E" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 5 ? "1.6" : hoverCity === 5 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 5
              ? "url(#aglow-jb)"
              : hoverCity === 5
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="56"
          cy="72"
          r={selectedCity === 5 ? "10" : hoverCity === 5 ? "8" : "5"}
          fill={
            selectedCity === 5 ? "#fff" : hoverCity === 5 ? "#F4511E" : "#222"
          }
          stroke={
            selectedCity === 5
              ? "#F4511E"
              : hoverCity === 5
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="56"
          y="75"
          textAnchor="middle"
          fontSize={selectedCity === 5 ? "7.5" : hoverCity === 5 ? "6.5" : "5"}
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 5 ? "#F4511E" : hoverCity === 5 ? "#fff" : "#555"
          }
        >
          05
        </text>
      </g>

      {/* 6. Kab. Karawang */}
      <g
        className="city"
        id="jb-6"
        onClick={() => onSelectCity("jabar", 6)}
        onMouseEnter={() => onHoverCity("jabar", 6)}
        onMouseLeave={() => onUnhoverCity("jabar", 6)}
      >
        <path
          d="M 88,28 L 128,22 L 162,26 L 172,38 L 148,36 L 118,42 L 88,28 Z"
          fill={
            selectedCity === 6
              ? "#00897B"
              : hoverCity === 6
                ? "#00897Bbb"
                : "#181818"
          }
          stroke={selectedCity === 6 || hoverCity === 6 ? "#00897B" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 6 ? "1.6" : hoverCity === 6 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 6
              ? "url(#aglow-jb)"
              : hoverCity === 6
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="130"
          cy="33"
          r={selectedCity === 6 ? "10" : hoverCity === 6 ? "8" : "6"}
          fill={
            selectedCity === 6 ? "#fff" : hoverCity === 6 ? "#00897B" : "#222"
          }
          stroke={
            selectedCity === 6
              ? "#00897B"
              : hoverCity === 6
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="130"
          y="36"
          textAnchor="middle"
          fontSize={
            selectedCity === 6 ? "7.5" : hoverCity === 6 ? "6.5" : "5.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 6 ? "#00897B" : hoverCity === 6 ? "#fff" : "#555"
          }
        >
          06
        </text>
      </g>

      {/* 7. Kab. Purwakarta */}
      <g
        className="city"
        id="jb-7"
        onClick={() => onSelectCity("jabar", 7)}
        onMouseEnter={() => onHoverCity("jabar", 7)}
        onMouseLeave={() => onUnhoverCity("jabar", 7)}
      >
        <path
          d="M 162,26 L 195,24 L 210,38 L 205,52 L 188,52 L 185,52 L 172,38 Z"
          fill={
            selectedCity === 7
              ? "#FB8C00"
              : hoverCity === 7
                ? "#FB8C00bb"
                : "#181818"
          }
          stroke={selectedCity === 7 || hoverCity === 7 ? "#FB8C00" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 7 ? "1.6" : hoverCity === 7 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 7
              ? "url(#aglow-jb)"
              : hoverCity === 7
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="190"
          cy="38"
          r={selectedCity === 7 ? "10" : hoverCity === 7 ? "8" : "5"}
          fill={
            selectedCity === 7 ? "#fff" : hoverCity === 7 ? "#FB8C00" : "#222"
          }
          stroke={
            selectedCity === 7
              ? "#FB8C00"
              : hoverCity === 7
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="190"
          y="41"
          textAnchor="middle"
          fontSize={selectedCity === 7 ? "7.5" : hoverCity === 7 ? "6.5" : "5"}
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 7 ? "#FB8C00" : hoverCity === 7 ? "#fff" : "#555"
          }
        >
          07
        </text>
      </g>

      {/* 8. Kab. Subang */}
      <g
        className="city"
        id="jb-8"
        onClick={() => onSelectCity("jabar", 8)}
        onMouseEnter={() => onHoverCity("jabar", 8)}
        onMouseLeave={() => onUnhoverCity("jabar", 8)}
      >
        <path
          d="M 195,24 L 242,18 L 268,26 L 265,44 L 248,52 L 228,56 L 210,52 L 210,38 Z"
          fill={
            selectedCity === 8
              ? "#3949AB"
              : hoverCity === 8
                ? "#3949ABbb"
                : "#181818"
          }
          stroke={selectedCity === 8 || hoverCity === 8 ? "#3949AB" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 8 ? "1.6" : hoverCity === 8 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 8
              ? "url(#aglow-jb)"
              : hoverCity === 8
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="234"
          cy="36"
          r={selectedCity === 8 ? "10" : hoverCity === 8 ? "8" : "6"}
          fill={
            selectedCity === 8 ? "#fff" : hoverCity === 8 ? "#3949AB" : "#222"
          }
          stroke={
            selectedCity === 8
              ? "#3949AB"
              : hoverCity === 8
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="234"
          y="39"
          textAnchor="middle"
          fontSize={
            selectedCity === 8 ? "7.5" : hoverCity === 8 ? "6.5" : "5.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 8 ? "#3949AB" : hoverCity === 8 ? "#fff" : "#555"
          }
        >
          08
        </text>
      </g>

      {/* 9. Kab. Indramayu */}
      <g
        className="city"
        id="jb-9"
        onClick={() => onSelectCity("jabar", 9)}
        onMouseEnter={() => onHoverCity("jabar", 9)}
        onMouseLeave={() => onUnhoverCity("jabar", 9)}
      >
        <path
          d="M 268,26 L 320,18 L 358,22 L 362,38 L 345,50 L 320,56 L 295,58 L 268,50 L 265,44 Z"
          fill={
            selectedCity === 9
              ? "#D81B60"
              : hoverCity === 9
                ? "#D81B60bb"
                : "#181818"
          }
          stroke={selectedCity === 9 || hoverCity === 9 ? "#D81B60" : "#2a2a2a"}
          strokeWidth={
            selectedCity === 9 ? "1.6" : hoverCity === 9 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 9
              ? "url(#aglow-jb)"
              : hoverCity === 9
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="316"
          cy="36"
          r={selectedCity === 9 ? "10" : hoverCity === 9 ? "8" : "6"}
          fill={
            selectedCity === 9 ? "#fff" : hoverCity === 9 ? "#D81B60" : "#222"
          }
          stroke={
            selectedCity === 9
              ? "#D81B60"
              : hoverCity === 9
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="316"
          y="39"
          textAnchor="middle"
          fontSize={
            selectedCity === 9 ? "7.5" : hoverCity === 9 ? "6.5" : "5.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 9 ? "#D81B60" : hoverCity === 9 ? "#fff" : "#555"
          }
        >
          09
        </text>
      </g>

      {/* 10. Kab. Cirebon */}
      <g
        className="city"
        id="jb-10"
        onClick={() => onSelectCity("jabar", 10)}
        onMouseEnter={() => onHoverCity("jabar", 10)}
        onMouseLeave={() => onUnhoverCity("jabar", 10)}
      >
        <path
          d="M 358,22 L 398,28 L 408,44 L 400,60 L 380,68 L 362,62 L 345,50 L 362,38 Z"
          fill={
            selectedCity === 10
              ? "#546E7A"
              : hoverCity === 10
                ? "#546E7Abb"
                : "#181818"
          }
          stroke={
            selectedCity === 10 || hoverCity === 10 ? "#546E7A" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 10 ? "1.6" : hoverCity === 10 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 10
              ? "url(#aglow-jb)"
              : hoverCity === 10
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="378"
          cy="44"
          r={selectedCity === 10 ? "10" : hoverCity === 10 ? "8" : "6"}
          fill={
            selectedCity === 10 ? "#fff" : hoverCity === 10 ? "#546E7A" : "#222"
          }
          stroke={
            selectedCity === 10
              ? "#546E7A"
              : hoverCity === 10
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="378"
          y="47"
          textAnchor="middle"
          fontSize={
            selectedCity === 10 ? "7.5" : hoverCity === 10 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 10 ? "#546E7A" : hoverCity === 10 ? "#fff" : "#555"
          }
        >
          10
        </text>
      </g>

      {/* 11. Kota Cirebon */}
      <g
        className="city"
        id="jb-11"
        onClick={() => onSelectCity("jabar", 11)}
        onMouseEnter={() => onHoverCity("jabar", 11)}
        onMouseLeave={() => onUnhoverCity("jabar", 11)}
      >
        <path
          d="M 398,28 L 418,34 L 416,50 L 408,60 L 400,60 L 408,44 Z"
          fill={
            selectedCity === 11
              ? "#6D4C41"
              : hoverCity === 11
                ? "#6D4C41bb"
                : "#181818"
          }
          stroke={
            selectedCity === 11 || hoverCity === 11 ? "#6D4C41" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 11 ? "1.6" : hoverCity === 11 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 11
              ? "url(#aglow-jb)"
              : hoverCity === 11
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="410"
          cy="44"
          r={selectedCity === 11 ? "10" : hoverCity === 11 ? "8" : "5"}
          fill={
            selectedCity === 11 ? "#fff" : hoverCity === 11 ? "#6D4C41" : "#222"
          }
          stroke={
            selectedCity === 11
              ? "#6D4C41"
              : hoverCity === 11
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="410"
          y="47"
          textAnchor="middle"
          fontSize={
            selectedCity === 11 ? "7.5" : hoverCity === 11 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 11 ? "#6D4C41" : hoverCity === 11 ? "#fff" : "#555"
          }
        >
          11
        </text>
      </g>

      {/* 12. Kab. Majalengka */}
      <g
        className="city"
        id="jb-12"
        onClick={() => onSelectCity("jabar", 12)}
        onMouseEnter={() => onHoverCity("jabar", 12)}
        onMouseLeave={() => onUnhoverCity("jabar", 12)}
      >
        <path
          d="M 345,50 L 380,68 L 375,86 L 360,98 L 338,96 L 322,82 L 320,66 L 320,56 L 345,50 Z"
          fill={
            selectedCity === 12
              ? "#039BE5"
              : hoverCity === 12
                ? "#039BE5bb"
                : "#181818"
          }
          stroke={
            selectedCity === 12 || hoverCity === 12 ? "#039BE5" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 12 ? "1.6" : hoverCity === 12 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 12
              ? "url(#aglow-jb)"
              : hoverCity === 12
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="348"
          cy="74"
          r={selectedCity === 12 ? "10" : hoverCity === 12 ? "8" : "6"}
          fill={
            selectedCity === 12 ? "#fff" : hoverCity === 12 ? "#039BE5" : "#222"
          }
          stroke={
            selectedCity === 12
              ? "#039BE5"
              : hoverCity === 12
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="348"
          y="77"
          textAnchor="middle"
          fontSize={
            selectedCity === 12 ? "7.5" : hoverCity === 12 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 12 ? "#039BE5" : hoverCity === 12 ? "#fff" : "#555"
          }
        >
          12
        </text>
      </g>

      {/* 13. Kab. Kuningan */}
      <g
        className="city"
        id="jb-13"
        onClick={() => onSelectCity("jabar", 13)}
        onMouseEnter={() => onHoverCity("jabar", 13)}
        onMouseLeave={() => onUnhoverCity("jabar", 13)}
      >
        <path
          d="M 380,68 L 400,60 L 416,70 L 418,90 L 404,104 L 385,108 L 370,98 L 360,98 L 375,86 Z"
          fill={
            selectedCity === 13
              ? "#7CB342"
              : hoverCity === 13
                ? "#7CB342bb"
                : "#181818"
          }
          stroke={
            selectedCity === 13 || hoverCity === 13 ? "#7CB342" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 13 ? "1.6" : hoverCity === 13 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 13
              ? "url(#aglow-jb)"
              : hoverCity === 13
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="392"
          cy="86"
          r={selectedCity === 13 ? "10" : hoverCity === 13 ? "8" : "6"}
          fill={
            selectedCity === 13 ? "#fff" : hoverCity === 13 ? "#7CB342" : "#222"
          }
          stroke={
            selectedCity === 13
              ? "#7CB342"
              : hoverCity === 13
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="392"
          y="89"
          textAnchor="middle"
          fontSize={
            selectedCity === 13 ? "7.5" : hoverCity === 13 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 13 ? "#7CB342" : hoverCity === 13 ? "#fff" : "#555"
          }
        >
          13
        </text>
      </g>

      {/* 14. Kab. Sumedang */}
      <g
        className="city"
        id="jb-14"
        onClick={() => onSelectCity("jabar", 14)}
        onMouseEnter={() => onHoverCity("jabar", 14)}
        onMouseLeave={() => onUnhoverCity("jabar", 14)}
      >
        <path
          d="M 248,52 L 295,58 L 320,66 L 322,82 L 310,96 L 290,104 L 268,100 L 252,86 L 248,68 Z"
          fill={
            selectedCity === 14
              ? "#C0CA33"
              : hoverCity === 14
                ? "#C0CA33bb"
                : "#181818"
          }
          stroke={
            selectedCity === 14 || hoverCity === 14 ? "#C0CA33" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 14 ? "1.6" : hoverCity === 14 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 14
              ? "url(#aglow-jb)"
              : hoverCity === 14
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="286"
          cy="76"
          r={selectedCity === 14 ? "10" : hoverCity === 14 ? "8" : "6"}
          fill={
            selectedCity === 14 ? "#fff" : hoverCity === 14 ? "#C0CA33" : "#222"
          }
          stroke={
            selectedCity === 14
              ? "#C0CA33"
              : hoverCity === 14
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="286"
          y="79"
          textAnchor="middle"
          fontSize={
            selectedCity === 14 ? "7.5" : hoverCity === 14 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 14 ? "#C0CA33" : hoverCity === 14 ? "#fff" : "#555"
          }
        >
          14
        </text>
      </g>

      {/* 15. Kab. Bandung */}
      <g
        className="city"
        id="jb-15"
        onClick={() => onSelectCity("jabar", 15)}
        onMouseEnter={() => onHoverCity("jabar", 15)}
        onMouseLeave={() => onUnhoverCity("jabar", 15)}
      >
        <path
          d="M 205,52 L 228,56 L 248,68 L 252,86 L 240,104 L 222,114 L 205,118 L 190,112 L 180,98 L 180,88 L 188,70 L 205,52 Z"
          fill={
            selectedCity === 15
              ? "#FFB300"
              : hoverCity === 15
                ? "#FFB300bb"
                : "#181818"
          }
          stroke={
            selectedCity === 15 || hoverCity === 15 ? "#FFB300" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 15 ? "1.6" : hoverCity === 15 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 15
              ? "url(#aglow-jb)"
              : hoverCity === 15
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="218"
          cy="86"
          r={selectedCity === 15 ? "10" : hoverCity === 15 ? "8" : "6"}
          fill={
            selectedCity === 15 ? "#fff" : hoverCity === 15 ? "#FFB300" : "#222"
          }
          stroke={
            selectedCity === 15
              ? "#FFB300"
              : hoverCity === 15
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="218"
          y="89"
          textAnchor="middle"
          fontSize={
            selectedCity === 15 ? "7.5" : hoverCity === 15 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 15 ? "#FFB300" : hoverCity === 15 ? "#fff" : "#555"
          }
        >
          15
        </text>
      </g>

      {/* 16. Kota Bandung */}
      <g
        className="city"
        id="jb-16"
        onClick={() => onSelectCity("jabar", 16)}
        onMouseEnter={() => onHoverCity("jabar", 16)}
        onMouseLeave={() => onUnhoverCity("jabar", 16)}
      >
        <path
          d="M 205,68 L 220,66 L 228,74 L 224,86 L 212,90 L 200,84 L 198,74 Z"
          fill={
            selectedCity === 16
              ? "#e53935"
              : hoverCity === 16
                ? "#e53935bb"
                : "#181818"
          }
          stroke={
            selectedCity === 16 || hoverCity === 16 ? "#e53935" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 16 ? "1.6" : hoverCity === 16 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 16
              ? "url(#aglow-jb)"
              : hoverCity === 16
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="212"
          cy="78"
          r={selectedCity === 16 ? "10" : hoverCity === 16 ? "8" : "5"}
          fill={
            selectedCity === 16 ? "#fff" : hoverCity === 16 ? "#e53935" : "#222"
          }
          stroke={
            selectedCity === 16
              ? "#e53935"
              : hoverCity === 16
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="212"
          y="81"
          textAnchor="middle"
          fontSize={
            selectedCity === 16 ? "7.5" : hoverCity === 16 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 16 ? "#e53935" : hoverCity === 16 ? "#fff" : "#555"
          }
        >
          16
        </text>
      </g>

      {/* 17. Kab. Bandung Barat */}
      <g
        className="city"
        id="jb-17"
        onClick={() => onSelectCity("jabar", 17)}
        onMouseEnter={() => onHoverCity("jabar", 17)}
        onMouseLeave={() => onUnhoverCity("jabar", 17)}
      >
        <path
          d="M 185,52 L 205,52 L 205,68 L 198,74 L 186,76 L 175,66 L 172,54 Z"
          fill={
            selectedCity === 17
              ? "#5E35B1"
              : hoverCity === 17
                ? "#5E35B1bb"
                : "#181818"
          }
          stroke={
            selectedCity === 17 || hoverCity === 17 ? "#5E35B1" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 17 ? "1.6" : hoverCity === 17 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 17
              ? "url(#aglow-jb)"
              : hoverCity === 17
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="192"
          cy="63"
          r={selectedCity === 17 ? "10" : hoverCity === 17 ? "8" : "5"}
          fill={
            selectedCity === 17 ? "#fff" : hoverCity === 17 ? "#5E35B1" : "#222"
          }
          stroke={
            selectedCity === 17
              ? "#5E35B1"
              : hoverCity === 17
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="192"
          y="66"
          textAnchor="middle"
          fontSize={
            selectedCity === 17 ? "7.5" : hoverCity === 17 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 17 ? "#5E35B1" : hoverCity === 17 ? "#fff" : "#555"
          }
        >
          17
        </text>
      </g>

      {/* 18. Kota Cimahi */}
      <g
        className="city"
        id="jb-18"
        onClick={() => onSelectCity("jabar", 18)}
        onMouseEnter={() => onHoverCity("jabar", 18)}
        onMouseLeave={() => onUnhoverCity("jabar", 18)}
      >
        <path
          d="M 186,76 L 198,74 L 200,84 L 194,90 L 184,88 L 178,80 Z"
          fill={
            selectedCity === 18
              ? "#E67C73"
              : hoverCity === 18
                ? "#E67C73bb"
                : "#181818"
          }
          stroke={
            selectedCity === 18 || hoverCity === 18 ? "#E67C73" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 18 ? "1.6" : hoverCity === 18 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 18
              ? "url(#aglow-jb)"
              : hoverCity === 18
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="190"
          cy="82"
          r={selectedCity === 18 ? "10" : hoverCity === 18 ? "8" : "4.5"}
          fill={
            selectedCity === 18 ? "#fff" : hoverCity === 18 ? "#E67C73" : "#222"
          }
          stroke={
            selectedCity === 18
              ? "#E67C73"
              : hoverCity === 18
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="190"
          y="85"
          textAnchor="middle"
          fontSize={
            selectedCity === 18 ? "7.5" : hoverCity === 18 ? "6.5" : "4.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 18 ? "#E67C73" : hoverCity === 18 ? "#fff" : "#555"
          }
        >
          18
        </text>
      </g>

      {/* 19. Kab. Cianjur */}
      <g
        className="city"
        id="jb-19"
        onClick={() => onSelectCity("jabar", 19)}
        onMouseEnter={() => onHoverCity("jabar", 19)}
        onMouseLeave={() => onUnhoverCity("jabar", 19)}
      >
        <path
          d="M 102,68 L 125,68 L 140,72 L 155,80 L 165,92 L 168,100 L 155,108 L 140,112 L 125,108 L 110,116 L 100,122 L 96,110 L 102,100 L 104,84 Z"
          fill={
            selectedCity === 19
              ? "#33691E"
              : hoverCity === 19
                ? "#33691Ebb"
                : "#181818"
          }
          stroke={
            selectedCity === 19 || hoverCity === 19 ? "#33691E" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 19 ? "1.6" : hoverCity === 19 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 19
              ? "url(#aglow-jb)"
              : hoverCity === 19
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="132"
          cy="92"
          r={selectedCity === 19 ? "10" : hoverCity === 19 ? "8" : "6"}
          fill={
            selectedCity === 19 ? "#fff" : hoverCity === 19 ? "#33691E" : "#222"
          }
          stroke={
            selectedCity === 19
              ? "#33691E"
              : hoverCity === 19
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="132"
          y="95"
          textAnchor="middle"
          fontSize={
            selectedCity === 19 ? "7.5" : hoverCity === 19 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 19 ? "#33691E" : hoverCity === 19 ? "#fff" : "#555"
          }
        >
          19
        </text>
      </g>

      {/* 20. Kab. Garut */}
      <g
        className="city"
        id="jb-20"
        onClick={() => onSelectCity("jabar", 20)}
        onMouseEnter={() => onHoverCity("jabar", 20)}
        onMouseLeave={() => onUnhoverCity("jabar", 20)}
      >
        <path
          d="M 190,112 L 222,114 L 240,104 L 268,100 L 290,104 L 310,96 L 338,96 L 338,120 L 322,138 L 300,150 L 275,158 L 252,156 L 230,148 L 215,134 L 205,118 Z"
          fill={
            selectedCity === 20
              ? "#BF360C"
              : hoverCity === 20
                ? "#BF360Cbb"
                : "#181818"
          }
          stroke={
            selectedCity === 20 || hoverCity === 20 ? "#BF360C" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 20 ? "1.6" : hoverCity === 20 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 20
              ? "url(#aglow-jb)"
              : hoverCity === 20
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="268"
          cy="128"
          r={selectedCity === 20 ? "10" : hoverCity === 20 ? "8" : "7"}
          fill={
            selectedCity === 20 ? "#fff" : hoverCity === 20 ? "#BF360C" : "#222"
          }
          stroke={
            selectedCity === 20
              ? "#BF360C"
              : hoverCity === 20
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="268"
          y="131"
          textAnchor="middle"
          fontSize={
            selectedCity === 20 ? "7.5" : hoverCity === 20 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 20 ? "#BF360C" : hoverCity === 20 ? "#fff" : "#555"
          }
        >
          20
        </text>
      </g>

      {/* 21. Kab. Tasikmalaya */}
      <g
        className="city"
        id="jb-21"
        onClick={() => onSelectCity("jabar", 21)}
        onMouseEnter={() => onHoverCity("jabar", 21)}
        onMouseLeave={() => onUnhoverCity("jabar", 21)}
      >
        <path
          d="M 338,120 L 360,110 L 385,108 L 404,118 L 408,138 L 395,155 L 375,166 L 350,168 L 322,160 L 300,150 L 322,138 Z"
          fill={
            selectedCity === 21
              ? "#006064"
              : hoverCity === 21
                ? "#006064bb"
                : "#181818"
          }
          stroke={
            selectedCity === 21 || hoverCity === 21 ? "#006064" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 21 ? "1.6" : hoverCity === 21 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 21
              ? "url(#aglow-jb)"
              : hoverCity === 21
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="360"
          cy="136"
          r={selectedCity === 21 ? "10" : hoverCity === 21 ? "8" : "7"}
          fill={
            selectedCity === 21 ? "#fff" : hoverCity === 21 ? "#006064" : "#222"
          }
          stroke={
            selectedCity === 21
              ? "#006064"
              : hoverCity === 21
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="360"
          y="139"
          textAnchor="middle"
          fontSize={
            selectedCity === 21 ? "7.5" : hoverCity === 21 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 21 ? "#006064" : hoverCity === 21 ? "#fff" : "#555"
          }
        >
          21
        </text>
      </g>

      {/* 22. Kota Tasikmalaya */}
      <g
        className="city"
        id="jb-22"
        onClick={() => onSelectCity("jabar", 22)}
        onMouseEnter={() => onHoverCity("jabar", 22)}
        onMouseLeave={() => onUnhoverCity("jabar", 22)}
      >
        <path
          d="M 338,120 L 360,110 L 365,122 L 352,132 L 338,128 Z"
          fill={
            selectedCity === 22
              ? "#4527A0"
              : hoverCity === 22
                ? "#4527A0bb"
                : "#181818"
          }
          stroke={
            selectedCity === 22 || hoverCity === 22 ? "#4527A0" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 22 ? "1.6" : hoverCity === 22 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 22
              ? "url(#aglow-jb)"
              : hoverCity === 22
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="350"
          cy="118"
          r={selectedCity === 22 ? "10" : hoverCity === 22 ? "8" : "5"}
          fill={
            selectedCity === 22 ? "#fff" : hoverCity === 22 ? "#4527A0" : "#222"
          }
          stroke={
            selectedCity === 22
              ? "#4527A0"
              : hoverCity === 22
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="350"
          y="121"
          textAnchor="middle"
          fontSize={
            selectedCity === 22 ? "7.5" : hoverCity === 22 ? "6.5" : "4.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 22 ? "#4527A0" : hoverCity === 22 ? "#fff" : "#555"
          }
        >
          22
        </text>
      </g>

      {/* 23. Kab. Ciamis */}
      <g
        className="city"
        id="jb-23"
        onClick={() => onSelectCity("jabar", 23)}
        onMouseEnter={() => onHoverCity("jabar", 23)}
        onMouseLeave={() => onUnhoverCity("jabar", 23)}
      >
        <path
          d="M 404,118 L 418,110 L 435,116 L 440,132 L 430,150 L 415,160 L 395,155 L 408,138 Z"
          fill={
            selectedCity === 23
              ? "#880E4F"
              : hoverCity === 23
                ? "#880E4Fbb"
                : "#181818"
          }
          stroke={
            selectedCity === 23 || hoverCity === 23 ? "#880E4F" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 23 ? "1.6" : hoverCity === 23 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 23
              ? "url(#aglow-jb)"
              : hoverCity === 23
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="420"
          cy="134"
          r={selectedCity === 23 ? "10" : hoverCity === 23 ? "8" : "6"}
          fill={
            selectedCity === 23 ? "#fff" : hoverCity === 23 ? "#880E4F" : "#222"
          }
          stroke={
            selectedCity === 23
              ? "#880E4F"
              : hoverCity === 23
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="420"
          y="137"
          textAnchor="middle"
          fontSize={
            selectedCity === 23 ? "7.5" : hoverCity === 23 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 23 ? "#880E4F" : hoverCity === 23 ? "#fff" : "#555"
          }
        >
          23
        </text>
      </g>

      {/* 24. Kota Banjar */}
      <g
        className="city"
        id="jb-24"
        onClick={() => onSelectCity("jabar", 24)}
        onMouseEnter={() => onHoverCity("jabar", 24)}
        onMouseLeave={() => onUnhoverCity("jabar", 24)}
      >
        <path
          d="M 435,116 L 450,120 L 452,134 L 440,140 L 430,136 L 435,122 Z"
          fill={
            selectedCity === 24
              ? "#37474F"
              : hoverCity === 24
                ? "#37474Fbb"
                : "#181818"
          }
          stroke={
            selectedCity === 24 || hoverCity === 24 ? "#37474F" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 24 ? "1.6" : hoverCity === 24 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 24
              ? "url(#aglow-jb)"
              : hoverCity === 24
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="442"
          cy="128"
          r={selectedCity === 24 ? "10" : hoverCity === 24 ? "8" : "5"}
          fill={
            selectedCity === 24 ? "#fff" : hoverCity === 24 ? "#37474F" : "#222"
          }
          stroke={
            selectedCity === 24
              ? "#37474F"
              : hoverCity === 24
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="442"
          y="131"
          textAnchor="middle"
          fontSize={
            selectedCity === 24 ? "7.5" : hoverCity === 24 ? "6.5" : "4.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 24 ? "#37474F" : hoverCity === 24 ? "#fff" : "#555"
          }
        >
          24
        </text>
      </g>

      {/* 25. Kab. Pangandaran */}
      <g
        className="city"
        id="jb-25"
        onClick={() => onSelectCity("jabar", 25)}
        onMouseEnter={() => onHoverCity("jabar", 25)}
        onMouseLeave={() => onUnhoverCity("jabar", 25)}
      >
        <path
          d="M 395,155 L 415,160 L 430,150 L 438,166 L 425,178 L 405,182 L 385,178 L 375,166 L 395,155 Z"
          fill={
            selectedCity === 25
              ? "#1B5E20"
              : hoverCity === 25
                ? "#1B5E20bb"
                : "#181818"
          }
          stroke={
            selectedCity === 25 || hoverCity === 25 ? "#1B5E20" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 25 ? "1.6" : hoverCity === 25 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 25
              ? "url(#aglow-jb)"
              : hoverCity === 25
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="405"
          cy="168"
          r={selectedCity === 25 ? "10" : hoverCity === 25 ? "8" : "6"}
          fill={
            selectedCity === 25 ? "#fff" : hoverCity === 25 ? "#1B5E20" : "#222"
          }
          stroke={
            selectedCity === 25
              ? "#1B5E20"
              : hoverCity === 25
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="405"
          y="171"
          textAnchor="middle"
          fontSize={
            selectedCity === 25 ? "7.5" : hoverCity === 25 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 25 ? "#1B5E20" : hoverCity === 25 ? "#fff" : "#555"
          }
        >
          25
        </text>
      </g>

      {/* 26. Kab. Sukabumi */}
      <g
        className="city"
        id="jb-26"
        onClick={() => onSelectCity("jabar", 26)}
        onMouseEnter={() => onHoverCity("jabar", 26)}
        onMouseLeave={() => onUnhoverCity("jabar", 26)}
      >
        <path
          d="M 68,82 L 86,72 L 102,68 L 104,84 L 100,100 L 96,110 L 88,130 L 76,148 L 58,152 L 42,138 L 36,120 L 40,100 Z"
          fill={
            selectedCity === 26
              ? "#0D47A1"
              : hoverCity === 26
                ? "#0D47A1bb"
                : "#181818"
          }
          stroke={
            selectedCity === 26 || hoverCity === 26 ? "#0D47A1" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 26 ? "1.6" : hoverCity === 26 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 26
              ? "url(#aglow-jb)"
              : hoverCity === 26
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="72"
          cy="116"
          r={selectedCity === 26 ? "10" : hoverCity === 26 ? "8" : "7"}
          fill={
            selectedCity === 26 ? "#fff" : hoverCity === 26 ? "#0D47A1" : "#222"
          }
          stroke={
            selectedCity === 26
              ? "#0D47A1"
              : hoverCity === 26
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="72"
          y="119"
          textAnchor="middle"
          fontSize={
            selectedCity === 26 ? "7.5" : hoverCity === 26 ? "6.5" : "5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 26 ? "#0D47A1" : hoverCity === 26 ? "#fff" : "#555"
          }
        >
          26
        </text>
      </g>

      {/* 27. Kota Sukabumi */}
      <g
        className="city"
        id="jb-27"
        onClick={() => onSelectCity("jabar", 27)}
        onMouseEnter={() => onHoverCity("jabar", 27)}
        onMouseLeave={() => onUnhoverCity("jabar", 27)}
      >
        <path
          d="M 96,110 L 110,128 L 100,136 L 88,130 L 96,118 Z"
          fill={
            selectedCity === 27
              ? "#4A148C"
              : hoverCity === 27
                ? "#4A148Cbb"
                : "#181818"
          }
          stroke={
            selectedCity === 27 || hoverCity === 27 ? "#4A148C" : "#2a2a2a"
          }
          strokeWidth={
            selectedCity === 27 ? "1.6" : hoverCity === 27 ? "1.1" : "0.7"
          }
          filter={
            selectedCity === 27
              ? "url(#aglow-jb)"
              : hoverCity === 27
                ? "url(#glow-jb)"
                : "none"
          }
          strokeLinejoin="round"
        />
        <circle
          className="badge-bg"
          cx="98"
          cy="122"
          r={selectedCity === 27 ? "10" : hoverCity === 27 ? "8" : "5"}
          fill={
            selectedCity === 27 ? "#fff" : hoverCity === 27 ? "#4A148C" : "#222"
          }
          stroke={
            selectedCity === 27
              ? "#4A148C"
              : hoverCity === 27
                ? "#fff"
                : "#3a3a3a"
          }
          strokeWidth="0.5"
        />
        <text
          className="badge-num"
          x="98"
          y="125"
          textAnchor="middle"
          fontSize={
            selectedCity === 27 ? "7.5" : hoverCity === 27 ? "6.5" : "4.5"
          }
          fontFamily="monospace"
          fontWeight="700"
          fill={
            selectedCity === 27 ? "#4A148C" : hoverCity === 27 ? "#fff" : "#555"
          }
        >
          27
        </text>
      </g>

      {/* Lanjutkan untuk semua wilayah lainnya... */}
      {/* Untuk lengkapnya, copy semua path dari kode sebelumnya */}

      <text
        x="235"
        y="205"
        textAnchor="middle"
        fontSize="6"
        fontFamily="monospace"
        fill="#161616"
        letterSpacing="3"
      >
        JAWA BARAT · INDONESIA · 27 WILAYAH
      </text>
    </svg>
  );
};

export default JabarMap;
