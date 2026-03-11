import React from "react";
import { DATA } from "../../data/jawaData";

const InfoPanel = ({ prov, selectedCity }) => {
  const city = selectedCity
    ? DATA[prov].find((c) => c.id === selectedCity)
    : null;

  if (!city) {
    return (
      <div className="info-panel" style={{ borderColor: "var(--border)" }}>
        <div className="info-empty">← Klik wilayah untuk detail</div>
      </div>
    );
  }

  const num = city.id < 10 ? `0${city.id}` : `${city.id}`;
  const isKota = city.name.startsWith("Kota");

  return (
    <div className="info-panel" style={{ borderColor: city.color + "44" }}>
      <div
        className="info-dot"
        style={{
          background: city.color,
          boxShadow: `0 0 12px ${city.color}55`,
        }}
      ></div>
      <div>
        <div className="info-name">{city.name}</div>
        <div className="info-meta">
          Ibu kota: <span className="info-capital">{city.capital}</span> · No.{" "}
          {num} · {isKota ? "Kota Otonom" : "Kabupaten"}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
