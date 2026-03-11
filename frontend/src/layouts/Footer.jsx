import { useEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const bgTextRef = useRef(null);

  const smoothScrollTo = (target) => {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const duration = 700;
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

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current || !bgTextRef.current) return;

      const footerRect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the footer is visible
      const footerTop = footerRect.top;
      const scrollProgress = Math.max(0, windowHeight - footerTop);

      // Only animate when footer is in view
      if (footerTop < windowHeight && footerRect.bottom > 0) {
        const parallaxSpeed = 0.3;
        const movement = scrollProgress * parallaxSpeed;
        bgTextRef.current.style.transform = `translateY(-${movement}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Background text */}
      <div className="footer-bg-text" ref={bgTextRef}>
        FIBERIX
      </div>
      <div className="footer-bg-text seconde">FIBERIX</div>

      <div className="footer-inner">
        {/* TOP */}
        <div className="footer-top">
          <span className="brand">YourBrand</span>
          <span className="tagline">Smarter collaboration, less effort.</span>
        </div>

        {/* MIDDLE */}
        <div className="footer-middle">
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>
              Jakarta, Indonesia
              <br />
              support@yourbrand.com
            </p>
          </div>

          <div className="footer-nav">
            <div className="nav-column">
              <div className="nav-title">01 — Home</div>
            </div>
            <div className="nav-column">
              <div className="nav-title">02 — Projects</div>
            </div>
            <div className="nav-column">
              <div className="nav-title">03 — Company</div>
              <div className="nav-links">
                <span>Team</span>
                <span>Career</span>
              </div>
            </div>
            <div className="nav-column">
              <div className="nav-title">04 — How we work</div>
              <div className="nav-links">
                <span>Technologies</span>
              </div>
            </div>
          </div>

          <div className="footer-medsos">
            <h4>Follow us</h4>
            <div className="medsos-icons">
              <i className="pi pi-facebook"></i>
              <i className="pi pi-twitter"></i>
              <i className="pi pi-linkedin"></i>
              <i className="pi pi-instagram"></i>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <span>© 2026 YourBrand. All rights reserved.</span>
          <button
            className="up-btn"
            onClick={() => smoothScrollTo(document.getElementById("hero"))}
          >
            <i className="pi pi-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}
