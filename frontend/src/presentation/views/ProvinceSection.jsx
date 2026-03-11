import React from "react";
import InfoPanel from "./InfoPanel";
import Legend from "./Legend";
import JabarMap from "./maps/JabarMap";
// Import JatengMap dan JatimMap nanti

const ProvinceSection = ({
  prov,
  selectedCity,
  hoverCity,
  onSelectCity,
  onHoverCity,
  onUnhoverCity,
}) => {
  const provNames = {
    jabar: {
      name: "JAWA BARAT",
      capital: "Bandung",
      tags: ["Provinsi", "18 Kabupaten", "9 Kota", "27 Wilayah"],
      color: "var(--accent-jb)",
    },
    jateng: {
      name: "JAWA TENGAH",
      capital: "Semarang",
      tags: ["Provinsi", "29 Kabupaten", "6 Kota", "35 Wilayah"],
      color: "var(--accent-jt)",
    },
    jatim: {
      name: "JAWA TIMUR",
      capital: "Surabaya",
      tags: ["Provinsi", "29 Kabupaten", "9 Kota", "38 Wilayah"],
      color: "var(--accent-ji)",
    },
  };

  const info = provNames[prov];

  const renderMap = () => {
    switch (prov) {
      case "jabar":
        return (
          <JabarMap
            selectedCity={selectedCity}
            hoverCity={hoverCity}
            onSelectCity={onSelectCity}
            onHoverCity={onHoverCity}
            onUnhoverCity={onUnhoverCity}
          />
        );
      case "jateng":
        // return <JatengMap ... />;
        return <div>Jateng Map (Coming Soon)</div>;
      case "jatim":
        // return <JatimMap ... />;
        return <div>Jatim Map (Coming Soon)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="province-section">
      <div className="prov-header">
        <div className="prov-title-block">
          <div className="prov-tags">
            {info.tags.map((tag, idx) => (
              <span key={idx} className="prov-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="prov-name" style={{ color: info.color }}>
            {info.name}
          </div>
          <div className="prov-capital">
            Ibu Kota: <span>{info.capital}</span>
          </div>
        </div>
      </div>

      <div className="map-wrap">
        {renderMap()}
        <div className="map-watermark">{info.name}</div>
      </div>

      <InfoPanel prov={prov} selectedCity={selectedCity} />

      <Legend
        prov={prov}
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
        onHoverCity={onHoverCity}
        onUnhoverCity={onUnhoverCity}
      />
    </div>
  );
};

export default ProvinceSection;
