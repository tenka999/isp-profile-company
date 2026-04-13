import "@/styles/Map.css";
import JavaProvincesMap from "./JavaProvincesMap";
import "@/styles/DataNumbersSection.css";
import FiberZoneCard from "./FiberZoneCard";
import StatusIcon from "./StatusIcon";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CoverageCityGrid } from "./CityList";
import FooterPage from "./FooterPage";
import Footer from "@/layouts/Footer";

const CoverageAreaPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const smoothScrollTo = (target) => {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const duration = 500;
    let startTime = null;

    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      window.scrollTo(0, start + (end - start) * easeInOut(progress));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  };

  const handleSubmit = (e) => {
    if (!value.trim()) return;
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      smoothScrollTo(document.getElementById("card-status"));
    }, 100);
    console.log(value);
  };
  const status = "available"; // Change to "unavailable" to test the unavailable state
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

      <h1 className="coverage-title">COVERAGE AREA </h1>
      <section className="coverage-hero">
        <div className="coverage-image-hero">
          <main className="search-coverage">
            <div className="">
              <h1 className="search-text">LOCATE YOUR LINK</h1>
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
              <h1
                className="coverage-sublink"
                onClick={() =>
                  smoothScrollTo(document.getElementById("javaMap"))
                }
              >
                Or explore our interactive map below
              </h1>
            </div>
          </main>
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
      {isSearching && (
        <section id="card-status" className="coverage-area-content">
          <div
            className={`coverage-area-card ${status}`}
            style={{ clipPath: "url(#customClip)" }}
          >
            <div className="coverage-cta-button-headline">
              {status === "available"
                ? "You're Within Reach"
                : status === "coming"
                  ? "Almost There"
                  : "Out of Reach"}
            </div>
            <div className="coverage-cta-button-sub-headline">
              {status === "available"
                ? "Great news! Your coordinates are officially within our high-performance fiber zone. High-speed signals are fully operational at your address."
                : status === "coming"
                  ? "We are currently initializing our network nodes in your area. Your location is in our immediate expansion plan. We’re working to bring the future to you soon."
                  : "Signal not detected. Our fiber backbone hasn't reached your sector yet, but we are expanding daily. Help us prioritize your area by requesting a connection."}
            </div>
            <div className="coverage-cta-button-icon">
              <StatusIcon size={50} status={status} />
            </div>

            <div className="coverage-cta-button-text">
              {status === "available"
                ? "Your location is officially within our fiber zone. High-speed signals are fully operational at your address."
                : status === "coming"
                  ? "We’re currently building our network in your sector. The future is arriving at your doorstep very soon."
                  : "Our fiber hasn’t reached your area yet. Help us prioritize your neighborhood by requesting a link below."}
            </div>
          </div>

          <div className={`coverage-cta-button ${status}`}>
            {status === "available"
              ? "SELECT PLAN"
              : status === "coming"
                ? "NOTIFY ME"
                : "REQUEST LINK"}
            {/* <div className="">PLAN</div> */}
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
        </section>
      )}

      <div className="" id="javaMap">
        <JavaProvincesMap />
      </div>

      <FooterPage />
    </>
  );
};

export default CoverageAreaPage;
