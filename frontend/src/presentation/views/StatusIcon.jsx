import React from "react";
import "@/styles/Map.css";

export default function StatusIcon({ status = "available", size = 48 }) {
  return (
    <div
      className={`status-icon ${status}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100">
        {/* Outer Circle */}
        <circle
          className="outer-ring"
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />

        {/* Inner Icon */}
        {status === "available" && (
          <path
            className="icon-mark"
            d="M30 52 L45 67 L70 38"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {status === "coming" && (
          <>
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="35"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="50"
              y1="50"
              x2="62"
              y2="50"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        )}

        {status === "unavailable" && (
          <>
            <line
              x1="35"
              y1="35"
              x2="65"
              y2="65"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="65"
              y1="35"
              x2="35"
              y2="65"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}
