import { useEffect, useRef, useState } from "react";

export default function ScrollFillText() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.65;
      const end = windowH * 0.1;
      const total = start - end;
      const current = start - rect.top;
      const p = Math.min(Math.max(current / total, 0), 1);
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lines = [
    "Internet isn't",
    "just about speed.",
    "It's about",
    "reliability & you.",
  ];

  // Flatten all chars with their global index
  const allChars = lines.flatMap((line) => line.split(""));
  const totalChars = allChars.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .wrapper {
          background: #0a0a0a;
          min-height: 100vh;
        }

        .spacer-top {
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hint {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.13);
        }

        .section {
          padding: 110px 64px 130px;
          position: relative;
        }

        .section::before {
          content: '';
          position: absolute;
          top: 0; left: 64px; right: 64px;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .text-block {
          max-width: 1100px;
          margin: 0 auto;
        }

        .line {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(3.5rem, 9vw, 9rem);
          line-height: 1.0;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .char {
          display: inline-block;
          color: rgba(255,255,255,0.1);
          transition: color 0.15s ease;
          white-space: pre;
        }

        .char.lit {
          color: #ffffff;
        }

        .spacer-bottom { height: 70vh; }
      `}</style>

      <div className="wrapper">
        {/* <div className="spacer-top">
          <span className="hint">↓ scroll down</span>
        </div> */}

        <section className="section" ref={sectionRef}>
          <div className="text-block">
            {(() => {
              let charIndex = 0;
              return lines.map((line, li) => (
                <span className="line" key={li}>
                  {line.split("").map((char, ci) => {
                    const idx = charIndex++;
                    const threshold = idx / totalChars;
                    const isLit = progress >= threshold;
                    return (
                      <span key={ci} className={`char${isLit ? " lit" : ""}`}>
                        {char}
                      </span>
                    );
                  })}
                </span>
              ));
            })()}
          </div>
        </section>

        {/* <div className="spacer-bottom" /> */}
      </div>
    </>
  );
}
