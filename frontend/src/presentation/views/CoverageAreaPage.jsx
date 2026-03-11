import "@/styles/Map.css";
import JavaProvincesMap from "./JavaProvincesMap";
import "@/styles/DataNumbersSection.css";
import FiberZoneCard from "./FiberZoneCard";
import StatusIcon from "./StatusIcon";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CoverageCityGrid } from "./CityList";

const CoverageAreaPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };
  const styles = `
body{
background-color: black;
}
`;
  return (
    <>
      <style>{styles}</style>

      <svg width="0" height="0">
        <defs>
          <clipPath id="customClip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0 0
                L0.949 0
                L1 0  
                L1 0.75
                L1 1 
                L0.696 1
                Q0.638 1 0.638 .9
                Q0.639 0.8 0.603 .8
                L0.422 0.8
                Q0.383 0.8 0.383 0.9
                Q0.383 1 0.337 1
                L0.438 1
                L0 1
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      <h1 className="coverage-title">COVERAGE AREA</h1>
      <section className="coverage-hero">
        <div className="coverage-image-hero">
          <img
            className="image-coverage-hero"
            src="/layout/background/coverage-area-hero.jpg"
            alt="About Veloxity"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="coverage-hero-content">
          <div className="coverage-hero-subtext">
            <p className="coverage-hero-angka">003</p>
            <p>
              Our hyper-fiber network is constantly evolving. Check your local
              coordinates to see if you're ready for the next generation of
              speed.
            </p>
          </div>
          <div className="coverage-hero-subline">
            <h1>Expanding the Digital Horizon.</h1>
          </div>
        </div>
      </section>
      <main className="search-coverage">
        <div className="">
          <h1>LOCATE YOUR LINK</h1>
          {/* <div className="coverage-search-input">
            <input type="text" />
          </div>
           */}
          <form className="coverage-search" onSubmit={handleSubmit}>
            <div className="coverage-glow" />

            <div className="coverage-input-wrapper">
              <span className="icon left"></span>

              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your city..."
                className="coverage-input"
              />

              <button className="coverage-btn" type="submit">
                Check
              </button>
            </div>
          </form>
        </div>
      </main>
      <JavaProvincesMap />

      {/* <section className="coverage-area-content">
        <div
          className="coverage-area-card unavailable"
          style={{ clipPath: "url(#customClip)" }}
        >
          <div className="coverage-cta-button-headline">
            Coordinate Synchronized!
          </div>
          <div className="coverage-cta-button-icon">
            <StatusIcon size={56} />
          </div>
          <div className="coverage-cta-button-sub-headline">
            High-speed signals detected. Your location is officially within our
            hyper-growth fiber zone.
          </div>

          <div className="coverage-cta-button-text">
            Experience zero-latency connectivity with speeds up to 1 Gbps. Our
            infrastructure is fully operational at your address.
          </div>
        </div>

        <div className="coverage-cta-button unavailable ">
          INITIALIZE
          <div className="">CONNECTION</div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chevron-icon-coverage"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section> */}
      <footer
        className="about-page-footer"
        style={{ background: "black", padding: "0" }}
      >
        <div className="footer-big-text-container">
          <h1 className="footer-big-text">FIBERIX</h1>
        </div>
        <div className="about-footer-subtext">
          <p>FIBERIX Company &copy; 2026</p>
          <p onClick={() => navigate("/")}>Home, kukis preferences</p>
          <p>Website by Danigazzz</p>
        </div>
      </footer>
    </>
  );
};

export default CoverageAreaPage;
