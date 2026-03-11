import React, { useContext, useRef, useState } from "react";
import { StyleClass } from "primereact/styleclass";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { LayoutContext } from "@/context/Context";
import { Link } from "react-router";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { ProductService } from "@/demo/service/ProductService";
import { useEffect } from "react";
import { Panel } from "primereact/panel";
import { Dialog } from "primereact/dialog";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import TypingText from "@/helpers/TypingSection";
import { useFadeSectionOnce } from "@/hooks/useFadeInOnce";
import Navbar from "./Navbar";
import Footer from "@/layouts/Footer";
import ArticleSection from "./ArticleSection";
import SpotlightGallery from "./SpotlightGallery";
import PrincingSection from "./PricingSection";
import FiberixDivider from "../FiberixDivider";
import ContactSection from "../contac-section/ContactSection";
import Stats from "../Stats";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import HowItWorksSection from "./HowItWorksSection";
import ScrollVelocity from "./ScrollVelocity";
import ParallaxText from "../ParallaxText";
import JawaBaratMap from "../JawaBaratMap";
import JawaTengahMap from "../JawaTengahMap";
import { useNavigate } from "react-router";
import NoteSection from "./NotesSection";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      {/* <div className="" style={{ height: "100vh" }}></div> */}
      <div
        id="hero"
        className="hero-content min-h-screen bg-[url('/layout/background/realistic_wallpaper.jpg')] bg-cover bg-center"
      >
        <div className="">
          {/* <div className="badge">Case Study & Research</div> */}
          <h1 className="landing-hero-title">
            FUTURE <span>DRIVEN.</span>
          </h1>
          <p className="landing-hero-subtitle">
            Empowering your digital lifestyle with ultra-low latency and
            unbreakable bandwidth. The future of fiber is here.
          </p>
          <div
            className="gap-4 flex align-center justify-center  "
            style={{
              position: "relative",
              left: "1rem",
              top: "-2rem",
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <button
              className="btn btn-primary btn-slide h-12 "
              style={{
                position: "relative",
                top: "2rem",
              }}
            >
              <span className="btn-text">
                <span>Join Fiberix</span>
                <span>Join Fiberix</span>
              </span>
            </button>
            <button
              className=" btn-slide-neon  h-12  "
              onClick={() => {
                (navigate("/coverage-area"), window.scrollTo(0, 0));
              }}
              style={{
                position: "relative",
                top: "2rem",
                // background: "linear-gradient(135deg, #ff4fd8, #8b5cf6)",
              }}
            >
              <span className="btn-text">
                <span>Area Availability</span>
                <span>Area Availability</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="gradient"></div>
      {/* <section className="remark ">
        <div className="container remark-container">
          <div className="border-container">
            <span className="border-span border-satu"></span>
            <span className="border-span border-empat"></span>
          </div>

          <div className="remark-content">
            <TypingText />
          </div>
        </div>
      </section> */}
      <NoteSection />
      {/* <ParallaxText /> */}
      {/* <JawaBaratMap /> */}
      {/* <JawaTengahMap /> */}

      <section className="about ">
        <div className="about-container">
          <div className="about-box1">
            <h1 className="">ABOUT</h1>
          </div>

          <div className="about-box2 about-image">
            <img
              src="/layout/background/server-center.webp"
              alt="About Veloxity"
              loading="lazy"
            />
          </div>
          <div className="about-box3">
            <h1>US</h1>
          </div>
          <div className="about-box4">
            Designed for speed. Built for stability.
          </div>
          <div className="about-box5">
            Kami membangun layanan internet berbasis teknologi next-gen yang
            fokus pada kecepatan, stabilitas, dan pengalaman pengguna. Dirancang
            untuk performa tinggi, tanpa kompleksitas.
          </div>
          <div className="about-box6">
            <button
              className="learn-more-btn .abou"
              onClick={() => {
                (navigate("/about"), window.scrollTo(0, 0));
              }}
            >
              <span className="btn-text">Learn More</span>
              <span className="btn-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
      <PrincingSection />
      <ScrollVelocity
        texts={["FIBERIX", "XIREBIF"]}
        velocity={50}
        className="custom-scroll-text"
      />
      <ArticleSection />
      <SpotlightGallery />
      <TestimonialsSection />
      <FAQSection />
      <HowItWorksSection />
      <ContactSection />
      {/* <Stats /> */}
      <Footer />
    </>
  );
};

// Image Example Interactive Reveal Effect

export default LandingPage;
