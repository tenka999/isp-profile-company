import React from "react";
import { DATA } from "../../data/jawaData";

const Legend = ({
  prov,
  selectedCity,
  onSelectCity,
  onHoverCity,
  onUnhoverCity,
}) => {
  return (
    <>
      <div className="legend-label">Daftar Wilayah</div>
      <div className="legend-grid">
        {DATA[prov].map((c) => {
          const num = c.id < 10 ? `0${c.id}` : `${c.id}`;
          return (
            <div
              key={c.id}
              className={`legend-item ${selectedCity === c.id ? "active" : ""}`}
              style={{ "--c": c.color }}
              onClick={() => onSelectCity(prov, c.id)}
              onMouseEnter={() => onHoverCity(prov, c.id)}
              onMouseLeave={() => onUnhoverCity(prov, c.id)}
            >
              <div className="leg-dot"></div>
              <span className="leg-num">{num}</span>
              <span className="leg-name">
                {c.name.replace("Kab. ", "").replace("Kota ", "")}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Legend;
