import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,900&family=DM+Sans:wght@300;400;500&display=swap');

  .ts-wrap {
    background: #080808;
    color: #f5f5f0;
    height:100vh;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    display:flex;
    flex-direction: column;
    align-items:center;
    padding: 128px 24px;
  }

  .ts-inner {
    width: 900px;
    height:30rem;
    margin: 0 auto;
    padding: 0 48px;
    
  }

  /* HEADER */
  .ts-header {
  position:absolute;
    text-align: center;
    margin-bottom: 72px;
  }

  .ts-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 20px;
  }

  .ts-title {
    position:relative;
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: clamp(60px, 9vw, 118px);
    line-height: 0.9;
    letter-spacing: -0.07em;
    color: #f5f5f0;

  }

  .ts-title.satu{
  top:-5rem;
  left:-12rem;
  }

  .ts-title.dua{
  top:2rem;
  left:34rem;
  z-index: 1;
   font-style: italic;
    color: transparent;
    -webkit-text-stroke: 1.2px rgba(255,255,255,0.55);
  }

  .ts-title.tiga{
    top:1rem;
    left:-9rem;}

  .ts-title em {
    font-style: italic;
    color: transparent;
    -webkit-text-stroke: 1.2px rgba(255,255,255,0.55);
  }

  /* CAROUSEL TRACK */
  .ts-carousel {
    position: relative;
  }

  .ts-track {
    position: relative;
    min-height: 320px;
  }

  /* CARD */
  .ts-card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 64px 80px;
    height: 310px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    background: #0e0e0e;
    transition: opacity 0.55s cubic-bezier(0.4,0,0.2,1),
                transform 0.55s cubic-bezier(0.4,0,0.2,1);
    pointer-events: none;
    margin-top:50px;
  }

  .ts-card.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
    position: relative;
    inset: unset;
  }

  .ts-card.exit-left {
    opacity: 0;
    transform: translateX(-32px) scale(0.98);
  }

  .ts-card.exit-right {
    opacity: 0;
    transform: translateX(32px) scale(0.98);
  }

  .ts-card.enter-left {
    opacity: 0;
    transform: translateX(32px) scale(0.98);
  }

  .ts-card.enter-right {
    opacity: 0;
    transform: translateX(-32px) scale(0.98);
  }

  /* BIG QUOTE MARKS */
  .ts-card-inner {
    position: relative;
  }

  .ts-mark {
    position: absolute;
    font-family: 'Playfair Display', serif;
    font-size: 200px;
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.04);
    user-select: none;
    pointer-events: none;
  }

  .ts-mark-open  { top: -60px; left: -20px; }
  .ts-mark-close { bottom: -100px; right: -20px; transform: rotate(180deg); }

  .ts-quote-text {
    font-size: clamp(17px, 2.2vw, 22px);
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.78);
    max-width: 640px;
    position: relative;
    z-index: 1;
  }

  .ts-quote-text strong {
    color: #f5f5f0;
    font-weight: 500;
  }

  .ts-author {
    margin-top: 36px;
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    z-index: 1;
  }

  .ts-author-line {
    width: 24px;
    height: 1px;
    background: rgba(255,255,255,0.2);
  }

  .ts-author-name {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .ts-author-role {
    font-size: 12px;
    font-weight: 300;
    color: rgba(255,255,255,0.22);
    margin-left: 4px;
  }

  /* BOTTOM NAV */
  .ts-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  /* Progress dots */
  .ts-dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ts-dot {
    height: 2px;
    background: rgba(255,255,255,0.15);
    border-radius: 2px;
    transition: width 0.4s ease, background 0.4s ease;
    cursor: pointer;
    width: 20px;
  }

  .ts-dot.active {
    width: 48px;
    background: #f5f5f0;
  }

  /* Unique nav: a pair of pill-shaped scrub buttons */
  .ts-btns {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    overflow: hidden;
  }

  .ts-btn {
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.45);
    cursor: pointer;
    padding: 14px 28px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition: color 0.2s, background 0.2s;
    position: relative;
  }

  .ts-btn:first-child::after {
    content: '';
    position: absolute;
    right: 0; top: 25%; bottom: 25%;
    width: 1px;
    background: rgba(255,255,255,0.1);
  }

  .ts-btn:hover {
    color: #f5f5f0;
    background: rgba(255,255,255,0.05);
  }

  .ts-btn svg {
    transition: transform 0.25s;
  }

  .ts-btn:first-child:hover svg { transform: translateX(-3px); }
  .ts-btn:last-child:hover svg  { transform: translateX(3px); }

  /* Count */
  .ts-count {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 700;
    color: rgba(255,255,255,0.18);
    letter-spacing: 0.05em;
  }

  .ts-count span {
    color: rgba(255,255,255,0.55);
  }

  @media (max-width: 680px) {
    .ts-inner { padding: 0 24px; }
    .ts-card { padding: 40px 32px; }
    .ts-mark { display: none; }
  }
`;

const reviews = [
  {
    quote: (
      <>
        Knowing that my internet{" "}
        <strong>never drops during critical calls</strong> gives me real peace
        of mind. The reliability speaks for itself — 14 months without a single
        interruption.
      </>
    ),
    name: "Reza Mahendra",
    role: "CTO, Studio Kode",
  },
  {
    quote: (
      <>
        Switched from three providers in four years. This is the first time I
        haven't had to restart my router.{" "}
        <strong>It just works, every single day.</strong>
      </>
    ),
    name: "Aditya Putra",
    role: "Home User, Jakarta",
  },
  {
    quote: (
      <>
        Installation was under two hours and speeds are{" "}
        <strong>exactly as advertised.</strong> No throttling after the first
        month — something every other ISP failed to deliver.
      </>
    ),
    name: "Siti Rahayu",
    role: "Home User, Bekasi",
  },
  {
    quote: (
      <>
        <strong>Customer support actually answers.</strong> I called at 11pm and
        someone picked up in under four minutes. That kind of service is rare —
        and it made me stay.
      </>
    ),
    name: "Budi Santoso",
    role: "Business Owner, Bandung",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState("active"); // active | exit-left | exit-right | enter-left | enter-right
  const [displayed, setDisplayed] = useState(0);
  const dir = useRef(1); // 1 = next, -1 = prev

  const go = (next, direction) => {
    dir.current = direction;
    setState(direction === 1 ? "exit-left" : "exit-right");

    setTimeout(() => {
      setDisplayed(next);
      setState(direction === 1 ? "enter-left" : "enter-right");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setState("active");
          setCurrent(next);
        });
      });
    }, 300);
  };

  const prev = () => go((current - 1 + reviews.length) % reviews.length, -1);
  const next = () => go((current + 1) % reviews.length, 1);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [current]);

  const r = reviews[displayed];

  return (
    <>
      <style>{css}</style>
      <section className="ts-wrap">
        <div className="ts-inner">
          <div className="ts-header">
            <div className="ts-eyebrow">Testimonials</div>
            <h2 className="ts-title satu">What they</h2>
            <h2 className="ts-title dua">Actually</h2>
            <h2 className="ts-title tiga">Thinks</h2>
          </div>
          <div className="ts-carousel">
            <div className="ts-track">
              <div className={`ts-card ${state}`}>
                <div className="ts-card-inner">
                  <span className="ts-mark ts-mark-open">"</span>
                  <p className="ts-quote-text">{r.quote}</p>
                  <div className="ts-author">
                    <div className="ts-author-line" />
                    <span className="ts-author-name">{r.name}</span>
                    <span className="ts-author-role">— {r.role}</span>
                  </div>
                  <span className="ts-mark ts-mark-close">"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ts-nav">
          <div className="ts-dots">
            {reviews.map((_, i) => (
              <div
                key={i}
                className={`ts-dot${i === current ? " active" : ""}`}
                onClick={() => go(i, i > current ? 1 : -1)}
              />
            ))}
          </div>

          <div className="ts-count">
            <span>0{current + 1}</span> / 0{reviews.length}
          </div>

          <div className="ts-btns">
            <button className="ts-btn" onClick={prev} aria-label="Previous">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Prev
            </button>
            <button className="ts-btn" onClick={next} aria-label="Next">
              Next
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
