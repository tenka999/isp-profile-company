// DataNumbersSection.jsx
import React, { useState, useEffect, useRef } from "react";
import "@/styles/DataNumbersSection.css";

const DataNumbersSection = () => {
  const [counts, setCounts] = useState({
    yawns: 0,
    clients: 0,
    years: 0,
    faceoffs: 0,
    team: 0,
    exits: 0,
  });

  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const targetNumbers = {
    yawns: 0,
    clients: 200,
    years: 12,
    faceoffs: 4,
    team: 55,
    exits: 6,
  };

  const animateNumbers = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const progress = Math.min((timestamp - startTimeRef.current) / 2000, 1); // 2 seconds duration

    setCounts({
      yawns: Math.floor(targetNumbers.yawns * progress),
      clients: Math.floor(targetNumbers.clients * progress),
      years: Math.floor(targetNumbers.years * progress),
      faceoffs: Math.floor(targetNumbers.faceoffs * progress),
      team: Math.floor(targetNumbers.team * progress),
      exits: Math.floor(targetNumbers.exits * progress),
    });

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animateNumbers);
    } else {
      // Ensure final values are exact
      setCounts(targetNumbers);
      hasAnimatedRef.current = true;
    }
  };

  const resetAndStartAnimation = () => {
    // Reset counts to 0
    setCounts({
      yawns: 0,
      clients: 0,
      years: 0,
      faceoffs: 0,
      team: 0,
      exits: 0,
    });

    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Reset animation state
    startTimeRef.current = null;
    hasAnimatedRef.current = false;

    // Start new animation
    animationFrameRef.current = requestAnimationFrame(animateNumbers);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation every time section becomes visible
            resetAndStartAnimation();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: "0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="data-numbers-section" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <div className="section-title-text">WE LET THE DATA TALK</div>
          <div className="number-item">
            <div className="number-value">{counts.yawns}</div>
            <div className="number-label">YAWNS IN THE BOARDROOM</div>
          </div>
        </div>

        <div className="numbers-grid">
          <div className="number-item">
            <div className="number-value">{counts.clients}+</div>
            <div className="number-label">CLIENTS SERVED GLOBALLY</div>
          </div>

          <div className="number-item">
            <div className="number-value">{counts.years}</div>
            <div className="number-label">
              YEARS SCALING AMBITIOUS BUSINESSES
            </div>
          </div>

          <div className="number-item">
            <div className="number-value">{counts.faceoffs}</div>
            <div className="number-label">NERF GUN OFFICE FACE-OFFS</div>
          </div>

          <div className="number-item">
            <div className="number-value">{counts.team}+</div>
            <div className="number-label">TEAM MEMBERS</div>
          </div>

          <div className="number-item">
            <div className="number-value">{counts.exits}</div>
            <div className="number-label">CLIENT EXITS</div>
          </div>
          <div className="number-item leave">
            {/* <div className="number-value">{counts.exits}</div> */}
            <div className="number-label">ALWAYS LEAVE ROOM TO GROW</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataNumbersSection;
