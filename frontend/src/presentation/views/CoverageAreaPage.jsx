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
import { useCoverageAreaApi } from "../logics/app/useCoverageAreaApi";
import Navbar from "./LandingComponent/Navbar";

const CoverageAreaPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const { useAllCoverageArea } = useCoverageAreaApi();
  const { data: coverageAreas, isLoading } = useAllCoverageArea();

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

  const handleSearch = (input) => {
    setValue(input);
  };

  const normalizeText = (text) =>
    (text || "").toString().toLowerCase().replace(/\s+/g, " ").trim();

  const searchCoverageArea = (query, areas = []) => {
    const q = normalizeText(query);
    if (!q) return null;
    if (q.length < 2) return null;

    const exactMatch = areas.find((area) => {
      const name = normalizeText(area.namaArea);
      const abbr = normalizeText(area.singkatan);
      return name === q || abbr === q;
    });
    if (exactMatch) return exactMatch;

    return areas.find((area) => {
      const name = normalizeText(area.namaArea);
      const abbr = normalizeText(area.singkatan);
      const prov = normalizeText(area.provinsi);
      const nameWords = name.split(" ");
      const provWords = prov ? prov.split(" ") : [];
      return (
        nameWords.some((w) => w.startsWith(q)) ||
        abbr.startsWith(q) ||
        provWords.some((w) => w.startsWith(q))
      );
    });
  };

  const getSuggestions = (query, areas = []) => {
    const q = normalizeText(query);
    if (!q || q.length < 2) return [];

    const matches = areas.filter((area) => {
      const name = normalizeText(area.namaArea);
      const abbr = normalizeText(area.singkatan);
      const prov = normalizeText(area.provinsi);
      const nameWords = name.split(" ");
      const provWords = prov ? prov.split(" ") : [];
      return (
        nameWords.some((w) => w.startsWith(q)) ||
        abbr.startsWith(q) ||
        provWords.some((w) => w.startsWith(q))
      );
    });

    const uniqueByName = new Map();
    matches.forEach((area) => {
      if (!uniqueByName.has(area.namaArea)) {
        uniqueByName.set(area.namaArea, area);
      }
    });

    return Array.from(uniqueByName.values()).slice(0, 5);
  };

  const handleSuggestionSelect = (area) => {
    setValue(area.namaArea);
    setSearchResult(area);
    setIsSearching(true);
    setTimeout(() => {
      smoothScrollTo(document.getElementById("card-status"));
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    const result = searchCoverageArea(value, coverageAreas || []);
    setSearchResult(result);
    setIsSearching(true);
    setTimeout(() => {
      smoothScrollTo(document.getElementById("card-status"));
    }, 100);
    console.log(value);
  };

  const statusMap = {
    TERSEDIA: "available",
    SEGERA_HADIR: "coming",
    TIDAK_TERSEDIA: "unavailable",
  };
  const status = searchResult
    ? statusMap[searchResult.status] || "unavailable"
    : "unavailable";

  const headlineText = searchResult
    ? status === "available"
      ? "You're Within Reach"
      : status === "coming"
        ? "Almost There"
        : "Out of Reach"
    : "Out of Reach";

  const subHeadlineText = searchResult
    ? status === "available"
      ? "Great news! Your coordinates are officially within our high-performance fiber zone. High-speed signals are fully operational at your address."
      : status === "coming"
        ? "We are currently initializing our network nodes in your area. Your location is in our immediate expansion plan. We’re working to bring the future to you soon."
        : "Signal not detected. Our fiber backbone hasn't reached your sector yet, but we are expanding daily. Help us prioritize your area by requesting a connection."
    : "Signal not detected. Our fiber backbone hasn't reached your sector yet, but we are expanding daily. Help us prioritize your area by requesting a connection.";

  const bodyText = searchResult
    ? status === "available"
      ? "Your location is officially within our fiber zone. High-speed signals are fully operational at your address."
      : status === "coming"
        ? "We’re currently building our network in your sector. The future is arriving at your doorstep very soon."
        : "Our fiber hasn’t reached your area yet. Help us prioritize your neighborhood by requesting a link below."
    : "Our fiber hasn’t reached your area yet. Help us prioritize your neighborhood by requesting a link below.";
  const styles = `
body{
background-color: black;
}
`;

  return (
    <>
      <style>{styles}</style>
      <Navbar />
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
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Enter your city..."
                    className="coverage-input"
                  />

                  <button className="coverage-btn" type="submit">
                    Check
                  </button>
                </div>
              </form>
              {value.trim().length >= 2 &&
                getSuggestions(value, coverageAreas || []).length > 0 && (
                  <div
                    className="coverage-suggestions"
                    style={{
                      marginTop: 10,
                      display: "grid",
                      position: "absolute",
                      gap: 6,
                      maxWidth: 520,
                    }}
                  >
                    {getSuggestions(value, coverageAreas || []).map((area) => (
                      <button
                        key={area.namaArea}
                        type="button"
                        onClick={() => handleSuggestionSelect(area)}
                        style={{
                          textAlign: "left",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#fff",
                          padding: "10px 300px 10px 20px",
                          borderRadius: 8,
                          cursor: "pointer",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <div style={{ fontSize: 14, fontWeight: 600 }}>
                          {area.namaArea}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            opacity: 0.6,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {area.provinsi || "Provinsi tidak diketahui"} ·{" "}
                          {area.singkatan || "-"}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
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
            <div className="coverage-cta-button-headline">{headlineText}</div>
            <div className="coverage-cta-button-sub-headline">
              {subHeadlineText}
            </div>
            <div className="coverage-cta-button-icon">
              <StatusIcon size={50} status={status} />
            </div>

            <div className="coverage-cta-button-text">{bodyText}</div>
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
