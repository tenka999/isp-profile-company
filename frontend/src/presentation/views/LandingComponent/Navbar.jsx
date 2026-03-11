"use client";
import { useScrollState } from "@/hooks/useScroll";
import { motion, AnimatePresence, color } from "framer-motion";
import { useState } from "react";
import "@/styles/Navbar.css";

export default function Navbar() {
  const { scrolled, scrollUp } = useScrollState();
  const [open, setOpen] = useState(false);

  const navVariants = {
    top: {
      width: "100%",
      top: 0,
      borderRadius: 0,
      backgroundColor: "rgba(35, 35, 35,0.5)",
      // borderTop: "1px solid rgba(255,255,255,1)",
      // borderBottom: "1px solid rgba(255,255,255,1)",
      fontSize: "1.1rem",
      fontWeight: "800",
    },
    scrolled: {
      width: "80%",
      top: 0,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,1)",
      backdropFilter: "blur(12px)",
      color: "#000",
      fontWeight: "800",
    },
    hidden: {
      y: -120,
    },
    visible: {
      y: 0,
    },
    open: {
      width: "97%",
      height: "96vh",
      top: 0,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,1)",
      backdropFilter: "blur(22px)",
      border: "1px solid rgba(255,255,255)",
      color: "#000",
    },
  };

  return (
    <div className="navbar">
      <motion.nav
        initial="top"
        animate={
          open
            ? "open"
            : !scrollUp && scrolled
              ? "hidden"
              : scrolled
                ? "scrolled"
                : "top"
        }
        variants={navVariants}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        // className="left-1/2 -translate-x-1/2"
        className="navbar"
        style={{
          position: open ? "fixed" : "fixed",
          zIndex: 9999,
        }}
      >
        <div className="navbar-content">
          <div className="navbar-links">
            <button
              className={`hamburger ${open ? "active" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" width="28" height="28">
                <line
                  className="line top"
                  stroke={`${scrolled ? "#000" : open ? "#000" : "#fff"}`}
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                />
                <line
                  className="line middle"
                  stroke={`${scrolled ? "#000" : open ? "#000" : "#fff"}`}
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                />
                <line
                  className="line bottom"
                  stroke={`${scrolled ? "#000" : open ? "#000" : "#fff"}`}
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                />
              </svg>
            </button>
            FIBERIX
          </div>
          <div className="navbar-links center">
            <div>HOME</div>
            <div>ABOUT</div>
            <div>PRICING</div>
            <div>ARTICLE</div>
            <div>GALLERY</div>
          </div>
          <div className="navbar-links">
            <div>login</div>
            <div>signup</div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="navbar-open"
              // className="flex flex-col items-center justify-center h-full text-4xl gap-8 navbar-open"
            >
              <div className="navbar-open-main">
                <div className="navbar-open-left">
                  <div className="navbar-open-left-top">
                    <div className="solution-headline">Solution</div>
                    <div className="solution-list">
                      <div className="solution-title">Residential</div>
                      <div className="solution-subtitle">
                        Paket internet rumah (Home Fiber).
                      </div>
                    </div>
                    <div className="solution-list">
                      <div className="solution-title">Business</div>
                      <div className="solution-subtitle">
                        Dedicated internet untuk kantor.
                      </div>
                    </div>
                    <div className="solution-list">
                      <div className="solution-title">Enterprise</div>
                      <div className="solution-subtitle">
                        Solusi data center & infrastruktur.
                      </div>
                    </div>
                  </div>
                  <div className="navbar-open-left-bottom">
                    <div className="navbar-open-bottom">
                      <div className="navbar-open-bottom-left">
                        <div className="navbar-footer-link">Company</div>
                        <div className="navbar-footer-link">Event</div>
                        <div className="navbar-footer-link">Testimonials</div>
                      </div>
                      <div className="navbar-open-bottom-right">
                        <div className="navbar-footer-link">Coverage Area</div>
                        <div className="navbar-footer-link">FAQ</div>
                        <div className="navbar-footer-link">Contact Us</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="navbar-open-right">
                  <div className="image1"></div>
                  <div className="image2"></div>
                  <div className="image3"></div>
                </div>
              </div>
              {/* <div>AE.1</div>
              <div>Technology</div>
              <div>Make it Yours</div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
