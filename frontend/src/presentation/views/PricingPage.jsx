import { color } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
  { id: "all", label: "All", short: "ALL" },
  { id: "rumahan", label: "Rumahan", short: "HOME" },
  { id: "bisnis", label: "Bisnis", short: "BIZ" },
  { id: "enterprise", label: "Enterprise", short: "ENT" },
  { id: "dedicated", label: "Dedicated", short: "DED" },
];

const PLANS = [
  {
    id: "r1",
    category: "rumahan",
    name: "Home Lite",
    speed: "50 Mbps",
    price: { m: 19, y: 15 },
    tag: null,
    desc: "Browsing & streaming harian",
  },
  {
    id: "r2",
    category: "rumahan",
    name: "Home Plus",
    speed: "100 Mbps",
    price: { m: 29, y: 23 },
    tag: "Populer",
    desc: "Keluarga aktif & WFH ringan",
  },
  {
    id: "r3",
    category: "rumahan",
    name: "Home Pro",
    speed: "300 Mbps",
    price: { m: 45, y: 36 },
    tag: null,
    desc: "Gaming, 4K & smart home",
  },
  {
    id: "b1",
    category: "bisnis",
    name: "Biz Starter",
    speed: "200 Mbps",
    price: { m: 59, y: 47 },
    tag: null,
    desc: "Tim kecil & kantor startup",
  },
  {
    id: "b2",
    category: "bisnis",
    name: "Biz Pro",
    speed: "500 Mbps",
    price: { m: 89, y: 71 },
    tag: "Best Seller",
    desc: "Operasional bisnis harian",
  },
  {
    id: "b3",
    category: "bisnis",
    name: "Biz Max",
    speed: "1 Gbps",
    price: { m: 129, y: 103 },
    tag: null,
    desc: "Bisnis yang terus berkembang",
  },
  {
    id: "e1",
    category: "enterprise",
    name: "Corp Essential",
    speed: "1 Gbps",
    price: { m: 199, y: 159 },
    tag: null,
    desc: "Fondasi jaringan korporat",
  },
  {
    id: "e2",
    category: "enterprise",
    name: "Corp Advanced",
    speed: "2 Gbps",
    price: { m: 349, y: 279 },
    tag: "Rekomendasi",
    desc: "Multi-site & skala enterprise",
  },
  {
    id: "d1",
    category: "dedicated",
    name: "Dedicated 1G",
    speed: "1 Gbps",
    price: { m: 499, y: 399 },
    tag: null,
    desc: "Jalur eksklusif simetris",
  },
  {
    id: "d2",
    category: "dedicated",
    name: "Dedicated 10G",
    speed: "10 Gbps",
    price: { m: 999, y: 799 },
    tag: "Top Tier",
    desc: "Data center & cloud maksimum",
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #050505;
    --line: rgba(255,255,255,0.06);
    --line-h: rgba(255,255,255,0.13);
    --text: #ebebeb;
    --text-2: rgba(235,235,235,0.35);
    --text-3: rgba(235,235,235,0.16);
    --surface: rgba(255,255,255,0.03);
    --surface-h: rgba(255,255,255,0.055);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .pricing-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
  }

  .hero-img {
    position: absolute; inset: 0;
    background:
      linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.1) 40%, rgba(5,5,5,0.85) 85%, rgba(5,5,5,1) 100%),
      url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80') center/cover no-repeat;
  }

  .hero-word {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: clamp(100px, 18vw, 220px);
    font-weight: 800;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.1);
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    line-height: 1;
  }

  .pricing-hero-content {
    position: relative; z-index: 2;
    padding: 0 60px 56px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
  }

  .pricing-hero-left {
  position: relative;
  
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.35em; color: var(--text-3);
    text-transform: uppercase; margin-bottom: 16px;
  }
  .pricing-hero-title {
    font-size: clamp(42px, 7vw, 88px);
    font-weight: 800; letter-spacing: -0.01em;
    line-height: 0.92; color: var(--text);
    text-transform: uppercase;
  }

  .hero-right {
    text-align: right; flex-shrink: 0;
    padding-bottom: 6px;
  }
  .hero-stat-num {
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 800; color: var(--text); line-height: 1;
  }
  .hero-stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.25em; color: var(--text-3);
    text-transform: uppercase; margin-top: 6px;
  }

  /* ── NAV BAR ── */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: rgba(5,5,5,0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--line);
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    height: 56px;
  }

  .navbar-left {
    display: flex; align-items: center; gap: 0;
  }

  .nav-cat {
    font-family: 'DM Mono', monospace;
    font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
    color:rgb(136, 136, 136) ;
    padding: 0 20px; height: 56px;
    display: flex; align-items: center;
    cursor: pointer;
    border: none; background: none;
    border-right: 1px solid var(--line);
    transition: color 0.18s, background 0.18s;
    position: relative;
  }
  .nav-cat:first-child { border-left: 1px solid var(--line); }
  .nav-cat::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: rgba(255,255,255,0.5);
    transform: scaleX(0); transition: transform 0.22s ease;
  }
  .nav-cat:hover { color: var(--text-2); background: var(--surface); }
  .nav-cat.active { color: var(--text); }
  .nav-cat.active::after { transform: scaleX(1); }

  .nav-count {
    font-size: 7.5px; margin-left: 6px;
    color: var(--text-3); vertical-align: super;
  }

  .navbar-right {
    display: flex; align-items: center; gap: 16px;
  }

  .billing-toggle {
    display: flex; align-items: center; gap: 10px;
  }
  .btl {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-3); cursor: pointer; transition: color 0.18s;
  }
  .btl.on { color: var(--text-2); }

  .toggle-btn {
    width: 34px; height: 18px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--line-h);
    border-radius: 9px; position: relative; cursor: pointer;
  }
  .toggle-btn.on { background: rgba(255,255,255,0.08); }
  .t-knob {
    position: absolute; top: 2px; left: 2px;
    width: 12px; height: 12px; border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transition: transform 0.2s, background 0.2s;
  }
  .toggle-btn.on .t-knob { transform: translateX(16px); background: rgba(255,255,255,0.8); }

  .sort-select {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-3); background: none; border: 1px solid var(--line);
    border-radius: 4px; padding: 5px 10px; cursor: pointer;
    appearance: none; outline: none;
  }
  .sort-select option { background: #111; color: #eee; }

  /* ── MAIN LIST ── */
  .plans-section {
    padding: 0 60px 80px;
  }

  /* section divider */
  .section-divider {
    display: flex; align-items: center; gap: 20px;
    padding: 48px 0 0;
    margin-bottom: 24px;
  }
  .sd-label {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.35em; color: var(--text-3);
    text-transform: uppercase; white-space: nowrap;
  }
  .sd-line { flex: 1; height: 1px; background: rgb(94, 94, 94); }
  .sd-count {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.15em; color: var(--text-3);
  }

  /* ── PLAN ROW (large list item style) ── */
  .plan-row {
    display: grid;
    grid-template-columns: 48px 1fr auto auto 180px;
    align-items: center;
    gap: 0;
    border-bottom: 1px solid var(--line);
    padding: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
    animation: rowUp 0.35s ease both;
  }
  .plan-row:first-of-type { border-top: 1px solid var(--line); }
  .plan-row:hover { background: var(--surface-h); }
  .plan-row::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 2px;
    background: rgba(255,255,255,0.5);
    transform: scaleY(0);
    transition: transform 0.22s ease;
    transform-origin: bottom;
  }
  .plan-row:hover::before { transform: scaleY(1); }

  @keyframes rowUp {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .row-idx {
    padding: 28px 0 28px 24px;
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.1em; color: var(--text-3);
    align-self: stretch; display: flex; align-items: center;
  }

  .row-main {
    padding: 28px 32px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .row-tag {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-3);
    border: 1px solid var(--line-h); border-radius: 3px;
    padding: 1px 7px; display: inline-block; width: fit-content;
    margin-bottom: 2px;
  }
  .row-name {
    font-size: clamp(20px, 2.5vw, 32px);
    font-weight: 800; letter-spacing: -0.01em; color: var(--text);
    line-height: 1;
  }
  .row-desc {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.06em; color: var(--text-3);
    margin-top: 2px;
  }

  .row-speed {
    padding: 28px 32px;
    text-align: center;
  }
  .row-speed-val {
    font-size: clamp(16px, 2vw, 26px);
    font-weight: 700; color: var(--text-2); letter-spacing: 0.02em;
  }
  .row-speed-label {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.2em; color: var(--text-3);
    text-transform: uppercase; margin-top: 3px;
  }

  .row-category {
    padding: 28px 32px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-3); text-align: center;
  }

  .row-price {
    padding: 28px 24px 28px 0;
    text-align: right;
    display: flex; align-items: center; justify-content: flex-end; gap: 16px;
  }
  .row-price-box {
    text-align: right;
  }
  .row-price-amount {
    font-size: clamp(24px, 3vw, 42px);
    font-weight: 800; color: var(--text); line-height: 1;
  }
  .row-price-sym {
    font-family: 'DM Mono', monospace;
    font-size: 12px; color: var(--text-3);
    vertical-align: top; line-height: 2;
  }
  .row-price-per {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.15em; color: var(--text-3);
    text-transform: uppercase; margin-top: 3px;
  }

  .row-cta {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgb(136, 136, 136);
    background: none;
    color: var(--text-3);
    font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.18s, color 0.18s, background 0.18s;
    flex-shrink: 0;
  }
  .plan-row:hover .row-cta {
    border-color: rgba(255,255,255,0.3);
    color: var(--text);
    background: rgba(255,255,255,0.05);
  }

  /* ── EXPANDED DETAIL ── */
  .row-detail {
    grid-column: 1 / -1;
    background: rgba(255,255,255,0.025);
    border-top: 1px solid var(--line);
    padding: 32px 72px;
    display: flex; gap: 48px;
    flex-wrap: wrap;
  }

  .detail-image {
    width: 280px; height: 160px; flex-shrink: 0;
    border-radius: 8px; overflow: hidden;
    border: 1px solid var(--line);
  }
  .detail-image img {
    width: 100%; height: 100%;
    object-fit: cover; opacity: 0.7;
    filter: grayscale(30%);
  }

  .detail-content { flex: 1; min-width: 200px; }
  .detail-heading {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.3em; color: var(--text-3);
    text-transform: uppercase; margin-bottom: 16px;
  }
  .detail-features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px 24px;
  }
  .detail-feat {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.05em; color: var(--text-2);
    display: flex; align-items: center; gap: 8px;
  }
  .detail-feat::before {
    content: '—';
    color: var(--text-3); font-size: 8px;
  }

  .detail-cta-wrap { display: flex; align-items: flex-end; }
  .detail-cta {
    padding: 12px 28px;
    border: 1px solid var(--line-h);
    border-radius: 6px;
    background: none; color: var(--text-2);
    font-family: 'Syne', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .detail-cta:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.2);
    color: var(--text);
  }

  /* ── FOOTER STRIP ── */
  .footer-strip {
    border-top: 1px solid var(--line);
    padding: 32px 60px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
  }
  .fs-logo {
    font-size: 14px; font-weight: 800; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--text-2);
  }
  .fs-note {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; color: var(--text-3);
    text-transform: uppercase;
  }
`;

const DETAIL_FEATURES = {
  r1: [
    "50 Mbps download",
    "5 Mbps upload",
    "Unlimited data",
    "Email support",
    "1 static device",
    "Basic modem",
  ],
  r2: [
    "100 Mbps download",
    "10 Mbps upload",
    "Unlimited data",
    "24/7 support",
    "Free modem",
    "No contract",
    "WiFi included",
  ],
  r3: [
    "300 Mbps download",
    "30 Mbps upload",
    "Unlimited data",
    "Priority support",
    "Free router",
    "Gaming optimized",
    "Smart home ready",
  ],
  b1: [
    "200 Mbps download",
    "20 Mbps upload",
    "Unlimited data",
    "Business support",
    "Static IP option",
    "SLA 99.5%",
    "Multi-device",
  ],
  b2: [
    "500 Mbps download",
    "50 Mbps upload",
    "Unlimited data",
    "Priority 24/7",
    "Free router upgrade",
    "SLA 99.7%",
    "1 Static IP",
    "VPN ready",
  ],
  b3: [
    "1 Gbps download",
    "100 Mbps upload",
    "Unlimited data",
    "Dedicated support",
    "Premium equipment",
    "SLA 99.9%",
    "2 Static IP",
    "BGP option",
  ],
  e1: [
    "1 Gbps download",
    "100 Mbps upload",
    "Unlimited data",
    "Account manager",
    "Custom SLA",
    "5 Static IP",
    "Priority routing",
    "Multi-site",
  ],
  e2: [
    "2 Gbps download",
    "500 Mbps upload",
    "Unlimited data",
    "Dedicated team",
    "Custom SLA",
    "10 Static IP",
    "BGP routing",
    "24/7 NOC",
    "Redundancy",
  ],
  d1: [
    "1 Gbps symmetric",
    "Dedicated line",
    "Unlimited data",
    "White-glove install",
    "SLA 99.99%",
    "24/7 NOC",
    "Custom routing",
    "Failover",
  ],
  d2: [
    "10 Gbps symmetric",
    "Dedicated fiber",
    "Unlimited data",
    "Dedicated engineer",
    "SLA 99.99%",
    "24/7 NOC priority",
    "Full BGP",
    "Multi-homed",
    "Peering",
  ],
};

const DETAIL_IMAGES = {
  rumahan:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70",
  bisnis:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=70",
  enterprise:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70",
  dedicated:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=70",
};

function countCat(id) {
  return id === "all"
    ? PLANS.length
    : PLANS.filter((p) => p.category === id).length;
}

export default function PricingPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [yearly, setYearly] = useState(false);
  const [sort, setSort] = useState("default");
  const [expanded, setExpanded] = useState(null);

  const filtered = PLANS.filter(
    (p) => activeCat === "all" || p.category === activeCat,
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price.m - b.price.m;
    if (sort === "price-desc") return b.price.m - a.price.m;
    if (sort === "speed") return parseInt(b.speed) - parseInt(a.speed);
    return 0;
  });

  // Group for section headers when showing "all"
  const groups =
    activeCat === "all"
      ? ["rumahan", "bisnis", "enterprise", "dedicated"]
      : [activeCat];

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="pricing-hero">
        <div className="hero-img" />
        <div className="hero-word">PRICING</div>
        <div className="pricing-hero-content">
          <div className="pricing-hero-left">
            <div className="hero-eyebrow " style={{ color: "white" }}>
              Veloxity · Internet Service · Indonesia
            </div>
            <h6 className="pricing-hero-title">
              Pilih
              <br />
              Paketmu
            </h6>
          </div>
          <div className="hero-right">
            <div className="hero-stat-num">10</div>
            <div
              className="hero-stat-label"
              style={{ color: "rgb(94, 94, 94)", fontSize: "13px" }}
            >
              Paket tersedia
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY NAV ── */}
      <nav className="navbar">
        <div className="navbar-left">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`nav-cat ${activeCat === cat.id ? "active" : ""}`}
              onClick={() => {
                setActiveCat(cat.id);
                setExpanded(null);
              }}
            >
              {cat.short}
              <span className="nav-count">{countCat(cat.id)}</span>
            </button>
          ))}
        </div>
        <div className="navbar-right">
          <div className="billing-toggle">
            <span
              className={`btl ${!yearly ? "on" : ""}`}
              onClick={() => setYearly(false)}
              style={{ color: "rgb(94, 94, 94)", fontSize: "12px" }}
            >
              Mo
            </span>
            <div
              className={`toggle-btn ${yearly ? "on" : ""}`}
              onClick={() => setYearly((v) => !v)}
            >
              <div className="t-knob" />
            </div>
            <span
              className={`btl ${yearly ? "on" : ""}`}
              style={{ color: "rgb(94, 94, 94)", fontSize: "12px" }}
              onClick={() => setYearly(true)}
            >
              Yr
            </span>
          </div>
          <select
            className="sort-select"
            style={{ color: "rgb(94, 94, 94)", fontSize: "12px" }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Harga ↑</option>
            <option value="price-desc">Harga ↓</option>
            <option value="speed">Kecepatan</option>
          </select>
        </div>
      </nav>

      {/* ── PLANS ── */}
      <section className="plans-section">
        {activeCat === "all" ? (
          groups.map((grp) => {
            const rows = sorted.filter((p) => p.category === grp);
            if (!rows.length) return null;
            const catLabel = CATEGORIES.find((c) => c.id === grp)?.label ?? grp;
            return (
              <div key={grp}>
                <div className="section-divider">
                  <span
                    className="sd-label"
                    style={{ color: "rgb(136, 136, 136)", fontSize: "15px" }}
                  >
                    {catLabel}
                  </span>
                  <div className="sd-line" />
                  <span
                    className="sd-count"
                    style={{ color: "rgb(94, 94, 94)", fontSize: "11px" }}
                  >
                    {rows.length} paket
                  </span>
                </div>
                {rows.map((plan, i) => (
                  <PlanRow
                    key={plan.id}
                    plan={plan}
                    index={i + 1}
                    yearly={yearly}
                    expanded={expanded === plan.id}
                    onToggle={() => toggle(plan.id)}
                    delay={i * 40}
                  />
                ))}
              </div>
            );
          })
        ) : (
          <>
            <div className="section-divider">
              <span className="sd-label">
                {CATEGORIES.find((c) => c.id === activeCat)?.label}
              </span>
              <div className="sd-line" />
              <span className="sd-count">{sorted.length} paket</span>
            </div>
            {sorted.map((plan, i) => (
              <PlanRow
                key={plan.id}
                plan={plan}
                index={i + 1}
                yearly={yearly}
                expanded={expanded === plan.id}
                onToggle={() => toggle(plan.id)}
                delay={i * 50}
              />
            ))}
          </>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-strip">
        <div className="fs-logo">Veloxity</div>
        <div className="fs-note">
          Harga belum termasuk pajak · SLA tersedia untuk paket bisnis ke atas
        </div>
        <div className="fs-note">© 2026 Veloxity Indonesia</div>
      </footer>
    </>
  );
}

function PlanRow({ plan, index, yearly, expanded, onToggle, delay }) {
  const price = yearly ? plan.price.y : plan.price.m;
  const feats = DETAIL_FEATURES[plan.id] ?? [];
  const img = DETAIL_IMAGES[plan.category];

  return (
    <div
      className="plan-row"
      style={{
        animationDelay: `${delay}ms`,
        display: "grid",
        gridTemplateColumns: expanded ? "1fr" : "48px 1fr auto auto 180px",
        flexDirection: "column",
      }}
      onClick={onToggle}
    >
      {/* Use a nested grid trick: always render all cols, collapse with wrapper */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "48px 1fr auto auto 180px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div className="row-idx" style={{ color: "white" }}>
          {String(index).padStart(2, "0")}
        </div>

        <div className="row-main">
          {plan.tag && <div className="row-tag">{plan.tag}</div>}
          <div className="row-name">{plan.name}</div>
          <div
            className="row-desc"
            style={{ color: "rgb(136, 136, 136)", fontSize: "14px" }}
          >
            {plan.desc}
          </div>
        </div>

        <div className="row-speed">
          <div className="row-speed-val">{plan.speed}</div>
          <div
            className="row-speed-label"
            style={{ color: "rgb(136, 136, 136)" }}
          >
            Download
          </div>
        </div>

        <div
          className="row-category"
          style={{
            color: "rgb(136, 136, 136)",
            fontSize: "12px",
            marginRight: "25px",
          }}
        >
          {plan.category}
        </div>

        <div className="row-price">
          <div className="row-price-box">
            <div>
              <span className="row-price-sym" style={{ color: "white" }}>
                $
              </span>
              <span className="row-price-amount">{price}</span>
            </div>
            <div
              className="row-price-per"
              style={{ color: "rgb(136, 136, 136)", fontSize: "14px" }}
            >
              {yearly ? "mo · yearly" : "/ month"}
            </div>
          </div>
          <button
            className="row-cta"
            style={{ color: "rgb(136, 136, 136)" }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {expanded ? "−" : "+"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="row-detail" onClick={(e) => e.stopPropagation()}>
          <div className="detail-image">
            <img src={img} alt={plan.name} />
          </div>
          <div className="detail-content">
            <div className="detail-heading">Termasuk dalam paket</div>
            <div className="detail-features">
              {feats.map((f, i) => (
                <div key={i} className="detail-feat">
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="detail-cta-wrap">
            <button className="detail-cta" onClick={(e) => e.stopPropagation()}>
              Pilih Paket →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
