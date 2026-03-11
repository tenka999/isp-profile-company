import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapBackground = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize map only once
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [location.lat, location.lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
      });

      // Dark themed tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      ).addTo(mapInstanceRef.current);

      // Custom marker icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
            </svg>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // Add marker
      L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("Our Office");
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location]);

  return (
    <div className="map-background">
      <div ref={mapRef} id="map"></div>
      <div className="map-overlay"></div>
    </div>
  );
};

export default MapBackground;
