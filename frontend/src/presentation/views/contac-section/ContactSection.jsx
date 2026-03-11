import React, { useState } from "react";
import MapBackground from "./MapBackground";
import ContactForm from "./ContactForm";
import InfoSection from "../manajemen/InfoSection";
// import "../../../style/ContactSection.css";
import "../../../styles/ContactSection.css";

const ContactSection = () => {
  const officeLocation = { lat: -6.3588788020287215, lng: 106.85420188891966 }; // Jakarta coordinates

  const openGoogleMaps = () => {
    const { lat, lng } = officeLocation;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      "_blank",
    );
  };

  return (
    <>
      <div className="contact-section">
        {/* Map Background */}
        <MapBackground location={officeLocation} />

        {/* Content */}
        <div className="content-wrapper">
          {/* Left - Heading */}
          <div className="heading-section">
            <button className="map-label" onClick={openGoogleMaps}>
              look at google maps
            </button>
            <h1 className="no-interaction">Contact us</h1>
          </div>

          {/* Right - Floating Form Card */}
          <ContactForm />
        </div>
      </div>

      {/* Info Section - Bottom */}
      <InfoSection />
    </>
  );
};

export default ContactSection;
