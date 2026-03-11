import { useState } from "react";
import "@/styles/AboutUs.css";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ParallaxText from "./ParallaxText";
import AboutParallax from "./AboutParallax";
import CinematicParallax from "./ParallaxImageSticky";

import { useNavigate } from "react-router";
import DataNumbersSection from "./DataNumberSection";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  :root {
    --red: #c0392b;
    --dark: #0f0f0f;
    --light-bg: #f5f5f5;
    --text-dark: #1a1a1a;
    --text-muted: #777;
    --border: #e0e0e0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'arial', sans-serif;

    color: var(--text-dark);
  background-color: #000;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 48px;
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(10px);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    text-decoration: none;
  }

  .nav-logo-icon {
    width: 32px;
    height: 32px;
    background: var(--red);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .nav-links a {
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .nav-links a:hover, .nav-links a.active {
    color: #fff;
  }

  /* HERO */
  .hero {
    position: relative;
  );
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 60% 40%, #8b0000 0%, #3d0000 40%, #0a0a0a 100%);
    z-index: 0;
  }

  /* Blob overlays to mimic the red liquid photo */
  .hero-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    mix-blend-mode: screen;
  }

  .hero-blob-1 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #e74c3c 0%, #8b0000 60%, transparent 100%);
    top: -60px;
    right: 60px;
    opacity: 0.9;
  }

  .hero-blob-2 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #c0392b 0%, #5a0000 70%, transparent 100%);
    top: 40px;
    right: 200px;
    opacity: 0.7;
  }

  .hero-blob-3 {
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, #ff6b6b 0%, #8b0000 80%, transparent 100%);
    bottom: 60px;
    right: 100px;
    opacity: 0.5;
  }

  /* Sphere-like highlight */
  .hero-sphere {
    position: absolute;
    top: 20px;
    right: 40px;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #ff4444 0%, #8b0000 40%, #1a0000 80%, #000 100%);
    box-shadow: inset -20px -20px 60px rgba(0,0,0,0.8), 0 0 80px rgba(180,0,0,0.4);
    animation: floatSphere 6s ease-in-out infinite;
  }

  @keyframes floatSphere {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  /* Small decorative sphere */
  .hero-sphere-sm {
    position: absolute;
    top: 180px;
    right: 280px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #ff6666 0%, #8b0000 50%, #000 100%);
    box-shadow: inset -8px -8px 20px rgba(0,0,0,0.8);
    animation: floatSphere 6s ease-in-out infinite reverse;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.75) 40%, transparent 100%);
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 120px 48px 60px;
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .hero-tag-icon {
    width: 20px;
    height: 20px;
    background: var(--red);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  .hero-title {
    font-family: "Space Grotesk", sans-serif;
    font-size: 4rem;
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #E5E7EB;
  }

  .breadcrumb {
    position: absolute;
    bottom: 90px;
    right: 48px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.6);
  }

  .breadcrumb span { color: rgba(255,255,255,0.4); }
  .breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; }
  .breadcrumb a:hover { color: #fff; }
  .breadcrumb .current { color: #fff; }

  /* RED DOT ACCENT */
  .red-dot {
    width: 12px;
    height: 12px;
    background: var(--red);
    border-radius: 50%;
    display: inline-block;
  }

  /* MAIN CONTENT */
  .main {
    padding: 80px 1rem;
    margin: -1rem auto;
    height: 200vh;
  }

  /* INFO SECTION */
  .info-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
    margin-bottom: 80px;
  }

  .info-left .label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .info-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--text-dark);
    margin-bottom: 24px;
  }

  .info-left p {
    color: #555;
    line-height: 1.75;
    font-size: 0.95rem;
    margin-bottom: 32px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .info-item label {
    display: block;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 6px;
  }

  .info-item p {
    font-size: 0.88rem;
    color: var(--text-dark);
    font-weight: 500;
    margin-bottom: 4px;
    line-height: 1.5;
  }

  /* SOCIAL ICONS */
  .social-icons {
    display: flex;
    gap: 12px;
    margin-top: 4px;
  }

  .social-icon {
    width: 30px;
    height: 30px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
  }

  .social-icon:hover {
    background: var(--red);
    border-color: var(--red);
    color: #fff;
  }

  /* CONTACT FORM CARD */
  .contact-card {
    background: #f8f8f8;
    border-radius: 12px;
    padding: 36px;
    box-shadow: 0 4px 30px rgba(0,0,0,0.06);
  }

  .contact-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .contact-card .subtitle {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-control {
    width: 100%;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 12px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s;
  }

  .form-control::placeholder { color: #aaa; }

  .form-control:focus {
    border-color: var(--red);
  }

  textarea.form-control {
    resize: vertical;
    min-height: 100px;
  }

  .btn-primary {
    width: 100%;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 8px;
  }

  .btn-primary:hover { background: #a93226; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }

  /* MAP SECTION */
  .map-section {
    width: 100%;
    height: 280px;
    background: #e8e8e8;
    position: relative;
    overflow: hidden;
    margin-bottom: 0;
  }

  .map-placeholder {
    width: 100%;
    height: 100%;
    background:
      linear-gradient(rgba(200,200,200,0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,200,200,0.3) 1px, transparent 1px),
      #d4d0cb;
    background-size: 40px 40px;
    position: relative;
  }

  /* Simulated map roads */
  .map-road {
    position: absolute;
    background: #fff;
    border-radius: 2px;
  }

  .map-road.h { height: 6px; }
  .map-road.v { width: 6px; }
  .map-road.thick { height: 10px; background: #f0ece4; }
  .map-road.thick.v { width: 10px; height: auto; }

  .map-pin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 5;
  }

  .map-pin-dot {
    width: 16px;
    height: 16px;
    background: var(--red);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(192,57,43,0.5);
  }

  .map-pin-shadow {
    width: 8px;
    height: 4px;
    background: rgba(0,0,0,0.2);
    border-radius: 50%;
    margin: 2px auto 0;
    transform: rotate(0deg);
  }

  .map-info-box {
    position: absolute;
    top: 20px;
    left: 20px;
    background: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    min-width: 200px;
    z-index: 10;
  }

  .map-info-box .biz-name {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 4px;
  }

  .map-info-box .biz-addr {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .map-expand-btn {
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
    background: var(--dark);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background 0.2s;
  }

  .map-expand-btn:hover { background: var(--red); }

  .map-expand-icon {
    color: #fff;
    font-size: 1rem;
  }

  /* FOOTER */
  .footer {
    background: var(--dark);
    color: #fff;
    padding: 64px 48px 32px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 64px;
    margin-bottom: 48px;
  }

  .footer-brand h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 24px;
    color: #fff;
  }

  .footer-brand h2 span {
    color: var(--red);
  }

  .footer-brand p {
    font-size: 0.83rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.7;
    max-width: 280px;
  }

  .footer-col h4 {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.4);
    margin-bottom: 20px;
  }

  .footer-col ul {
    list-style: none;
  }

  .footer-col ul li {
    margin-bottom: 12px;
  }

  .footer-col ul li a {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-col ul li a:hover { color: #fff; }

  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-bottom p {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.3);
  }

  .footer-bottom-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.4);
    font-size: 0.75rem;
  }

  .footer-bottom-logo-icon {
    width: 20px;
    height: 20px;
    background: var(--red);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  /* STATS ROW */
  .stats-row {
    display: flex;
    gap: 48px;
    margin-bottom: 80px;
    padding: 40px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .stat-item { flex: 1; }

  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--text-dark);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-number span { color: var(--red); }

  .stat-label {
    font-size: 0.82rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .stat-divider {
    width: 1px;
    background: var(--border);
  }

  /* Animate on load */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up {
    animation: fadeUp 0.7s ease forwards;
  }

  .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
  .fade-up-2 { animation-delay: 0.25s; opacity: 0; }
  .fade-up-3 { animation-delay: 0.4s; opacity: 0; }
  .fade-up-4 { animation-delay: 0.55s; opacity: 0; }

  @media (max-width: 768px) {
    .info-section { grid-template-columns: 1fr; gap: 40px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .stats-row { flex-wrap: wrap; }
    .stat-divider { display: none; }
    .hero-title { font-size: 2.4rem; }
    .nav { padding: 16px 24px; }
    .main { padding: 60px 24px; }
    .footer { padding: 48px 24px 24px; }
    .hero-sphere { width: 180px; height: 180px; right: 20px; }
    .hero-sphere-sm { display: none; }
    .breadcrumb { right: 24px; }
  }
`;

function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      title: "HYPER-SPEED FIBER ECOSYSTEM",
      description:
        "NEXT-GENERATION FIBER INFRASTRUCTURE DESIGNED FOR ULTRA-LOW LATENCY AND CONSISTENT HIGH-BANDWIDTH PERFORMANCE ACROSS EVERY TOUCHPOINT.",
      image: "layout/background/hero-about-image.jpg",
    },
    {
      title: "ENTERPRISE-GRADE RELIABILITY",
      image: "layout/background/hero-about-image.jpg",

      description:
        "BUILT WITH REDUNDANT NETWORK ARCHITECTURE TO ENSURE MAXIMUM UPTIME, STABILITY, AND BUSINESS CONTINUITY WITHOUT INTERRUPTION.",
    },
    {
      title: "SEAMLESS DIGITAL INTEGRATION",
      image: "layout/background/hero-about-image.jpg",

      description:
        "SCALABLE CONNECTIVITY SOLUTIONS THAT ADAPT TO YOUR GROWTH, SUPPORTING CLOUD, IOT, AND FUTURE-READY TECHNOLOGIES.",
    },
  ];
  const explain = [
    "Kami menggunakan infrastruktur Full Fiber Optic generasi terbaru yang mampu menghantarkan data secepat cahaya. Bukan sekadar browsing, kami memastikan pengalaman cloud computing, 8K streaming, dan pro-gaming kamu berjalan tanpa hambatan (zero lag).",
    'Sistem kami didukung oleh AI yang secara otomatis mengalihkan rute trafik jika terjadi gangguan di jalur utama. Kami tidak menunggu teknisi datang; jaringan kami "menyembuhkan" dirinya sendiri sebelum kamu menyadari adanya masalah. Uptime 99.9% bukan janji, tapi standar sistem.',
    "Kami percaya teknologi hebat harus didampingi bantuan yang nyata. Akses bantuan 24/7 dengan satu klik melalui smart dashboard kami. Tanpa bot yang berbelit, kamu langsung terhubung dengan tim ahli yang siap menjaga duniamu tetap terhubung.",
  ];

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // gambar naik menutupi teks
  const imageY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <>
      <section style={{ position: "relative" }}>
        <style>{styles}</style>
        <svg width="0" height="0">
          <defs>
            <clipPath id="customClip" clipPathUnits="objectBoundingBox">
              <path
                d="
                M0 0
                L0.949 0
                Q1 0 1 0.175
                L1 0.75
                Q1 1 0.96 1
                L0.876 1
                Q0.838 1 0.838 .9
                Q0.839 0.8 0.803 .8
                L0.722 0.8
                Q0.693 0.8 0.693 0.9
                Q0.693 1 0.657 1
                L0.438 1
                L0 1
                Z
              "
              />
            </clipPath>
          </defs>
        </svg>

        {/* TEXT */}
        {/* <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "0 5vw",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "10rem",
              margin: 0,
              color: "#fff",
              paddingRight: "200rem",
              fontWeight: "900",
            }}
          >
            ABOUT US
          </h1>
        </div> */}
        {/* <motion.div */}
        {/* style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          y: imageY,
          zIndex: 2,
        }}
      > */}
        {/* <div className="hero-content min-h-screen bg-[url('/layout/background/c.jpg')] bg-cover bg-center"></div> */}
        <div className="hero-wrapper">
          <div
            id="hero-about"
            className="hero image-clip-path"
            style={{ clipPath: "url(#customClip)" }}
          >
            <div className="hero-content">
              <div className="hero-tag">
                <div className="hero-tag-icon" />
              </div>
              <h1 className="hero-title fade-up fade-up-1">About Us</h1>
            </div>

            <div className="breadcrumb">
              {/* <a href="#">Home</a>
            <span>/</span>
            <span className="current">About Us</span> */}
            </div>
          </div>
          {/* <div className="hero-notch-text">Get Started</div> */}

          <div className="hero-button">
            <p className="about-link" onClick={() => navigate("/")}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="arrow-icon-about"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Back Home
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chevron-icon-about"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <div className="hero-button-content"></div>
          {/* <div className="button-about-container">
          <div className="about-button">ABOUT US</div>
        </div> */}
        </div>
        {/* </motion.div> */}
        {/* </section> */}
        {/* MAIN */}
        <main className="main">
          <p className="about-value">
            "FIBERIX FUSES ADVANCED FIBER TECHNOLOGY WITH ENGINEERING PRECISION
            TO DELIVER STABLE, HIGH-SPEED NETWORKS YOU CAN RELY ON — WITHOUT
            COMPROMISE."
          </p>
          {/* <div className="about-box2 about-image">
          <img
            src="/layout/background/server-center.jpg"
            alt="About Veloxity"
            loading="lazy"
            decoding="async"
            width={1390}
            height={300}
          />
        </div> */}
          <ParallaxText></ParallaxText>
          <div className="box-info-container">
            {items.map((item, index) => (
              <div
                key={index}
                className={`box-info ${activeIndex === index ? "active" : ""}`}
                style={{ backgroundImage: `url(${item.image})` }}
                onMouseLeave={() => setActiveIndex(null)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <h3 className="box-title">{item.title}</h3>
                <p className="box-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </main>
        <AboutParallax></AboutParallax>
        <CinematicParallax></CinematicParallax>
        <DataNumbersSection></DataNumbersSection>

        <footer className="about-page-footer">
          <div className="">
            <h1 className="footer-big-text">FIBERIX</h1>
          </div>
          <div className="about-footer-subtext">
            <p>FIBERIX Company &copy; 2026</p>
            <p>Legal mention, kukis preferences</p>
            <p>Website by Danigazzz</p>
          </div>
        </footer>
        {/* <section className="about-design">
        <div class="about-design-title satu">A NETWORK</div>
        <div class="about-design-title dua">THAT FEELS</div>
        <div class="about-design-title tiga">RIGHT</div>
        <div className="about-design-image">
          <img
            src="/layout/background/cinematic look.webp"
            alt="About Veloxity"
            loading="lazy"
            className="about-design-img"
            decoding="async"
          />
        </div>
        <div class="about-design-faded div5">/ NOT</div>
        <div class="about-design-faded div8">JUST</div>
        <div class="about-design-faded div9">INTERNET</div>
        <div class="about-design-subtext">
          FIBERIX DELIVERS HIGH-PERFORMANCE FIBER CONNECTIVITY DESIGNED FOR
          SPEED, STABILITY, AND SEAMLESS DIGITAL LIVING.
        </div>
        <div class="div7">7</div>
      </section> */}
        {/* MAP */}
        {/* <div className="map-section">
        <div className="map-placeholder">
          <div
            className="map-road h"
            style={{ top: "30%", left: 0, width: "100%" }}
          />
          <div
            className="map-road h thick"
            style={{ top: "50%", left: 0, width: "100%" }}
          />
          <div
            className="map-road h"
            style={{ top: "70%", left: 0, width: "100%" }}
          />
          <div
            className="map-road v"
            style={{ left: "20%", top: 0, height: "100%" }}
          />
          <div
            className="map-road v thick"
            style={{ left: "45%", top: 0, height: "100%", width: "10px" }}
          />
          <div
            className="map-road v"
            style={{ left: "70%", top: 0, height: "100%" }}
          />
          <div
            className="map-road h"
            style={{ top: "15%", left: "20%", width: "50%" }}
          />
          <div
            className="map-road h"
            style={{ top: "85%", left: "30%", width: "40%" }}
          />

          <div className="map-pin">
            <div className="map-pin-dot" />
            <div className="map-pin-shadow" />
          </div>

          <div className="map-info-box">
            <div className="biz-name">Axion Studio, New York</div>
            <div className="biz-addr">
              354 St. Mary Avenue,
              <br />
              New York — 10053
              <br />
              <span style={{ color: "#27ae60" }}>
                Open now · 9:00 AM – 6:00 PM
              </span>
            </div>
          </div>

          <div className="map-expand-btn">
            <span className="map-expand-icon">⤢</span>
          </div>
        </div>
      </div> */}
        {/* FOOTER */}
        {/* <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>
              It's blow your
              <br />
              <span>Mind</span> with our
              <br />
              agency.
            </h2>
            <p>
              Platea felis nunc iaculis pulvinar enim feugiat dignissim
              parturient venenatis ante placerat.
            </p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Team Us</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
              <li>
                <a href="#">Awards &amp; Media</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#">Deep learning at scale</a>
              </li>
              <li>
                <a href="#">Neural Networks</a>
              </li>
              <li>
                <a href="#">Consulting</a>
              </li>
              <li>
                <a href="#">Research</a>
              </li>
              <li>
                <a href="#">Development</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Axion. All rights reserved.</p>
          <div className="footer-bottom-logo">
            <div className="footer-bottom-logo-icon" />
            www.axion.com
          </div>
        </div>
      </footer> */}
      </section>
    </>
  );
}

export default AboutUs;
