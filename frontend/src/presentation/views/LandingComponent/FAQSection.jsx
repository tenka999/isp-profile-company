import { useState } from "react";

const FAQS = [
  {
    id: 1,
    category: "Layanan",
    question: "Apa saja yang termasuk dalam paket internet Veloxity?",
    answer:
      "Setiap paket Veloxity mencakup koneksi internet berkecepatan tinggi, modem atau router gratis (tergantung paket), dukungan teknis 24/7, dan akses ke dashboard monitoring real-time. Paket bisnis ke atas juga mendapatkan static IP, SLA tertulis, dan dedicated account manager.",
    tags: ["Modem Gratis", "24/7 Support", "Dashboard"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=75",
  },
  {
    id: 2,
    category: "Billing",
    question: "Apakah ada kontrak jangka panjang yang wajib ditandatangani?",
    answer:
      "Tidak. Veloxity menawarkan fleksibilitas penuh — kamu bisa berlangganan secara bulanan tanpa kontrak jangka panjang. Untuk paket tahunan, kami memberikan diskon hingga 20% dengan fleksibilitas yang sama. Pembatalan dapat dilakukan kapan saja dengan pemberitahuan 30 hari sebelumnya.",
    tags: ["No Contract", "Bulanan", "Tahunan -20%"],
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=75",
  },
  {
    id: 3,
    category: "Teknis",
    question:
      "Seberapa cepat kecepatan internet yang sebenarnya bisa saya dapatkan?",
    answer:
      "Kecepatan yang tertera adalah kecepatan maksimum pada kondisi optimal. Dalam penggunaan harian, kamu akan mendapatkan rata-rata 85–95% dari kecepatan yang dijanjikan. Paket Dedicated memberikan kecepatan penuh 100% karena menggunakan jalur eksklusif tanpa berbagi bandwidth.",
    tags: ["85–95% Aktual", "Dedicated 100%", "No Throttling"],
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75",
  },
  {
    id: 4,
    category: "Instalasi",
    question: "Berapa lama proses instalasi dan apakah ada biaya tambahan?",
    answer:
      "Proses instalasi standar memakan waktu 2–4 jam kerja setelah survei lokasi disetujui. Biaya instalasi gratis untuk semua paket residensial. Untuk enterprise dan dedicated, instalasi white-glove termasuk konfigurasi jaringan lengkap tanpa biaya tambahan.",
    tags: ["Gratis", "2–4 Jam", "White-Glove"],
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=75",
  },
  {
    id: 5,
    category: "Support",
    question: "Bagaimana cara menghubungi tim support jika terjadi gangguan?",
    answer:
      "Tim support Veloxity tersedia 24 jam sehari, 7 hari seminggu melalui live chat di aplikasi, telepon hotline, dan email prioritas. Untuk paket bisnis dan enterprise, kamu mendapatkan jalur dedicated langsung ke tim NOC dengan waktu respons kurang dari 15 menit.",
    tags: ["Live Chat", "Hotline", "< 15 Menit"],
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=900&q=75",
  },
  {
    id: 6,
    category: "Layanan",
    question: "Apakah layanan Veloxity tersedia di seluruh Indonesia?",
    answer:
      "Saat ini Veloxity beroperasi di Jabodetabek, Bandung, Surabaya, Semarang, dan Yogyakarta. Ekspansi ke kota-kota besar lainnya sedang dalam proses. Kamu bisa mengecek ketersediaan di lokasimu melalui halaman Coverage Area.",
    tags: ["Jabodetabek", "Surabaya", "Bandung"],
    img: "https://images.unsplash.com/photo-1593640408182-31c228e68af4?w=900&q=75",
  },
  {
    id: 7,
    category: "Billing",
    question: "Metode pembayaran apa saja yang diterima Veloxity?",
    answer:
      "Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), kartu kredit/debit Visa & Mastercard, dompet digital (GoPay, OVO, Dana, ShopeePay), dan virtual account. Auto-debit tersedia untuk memastikan layanan tidak terputus.",
    tags: ["Transfer Bank", "E-Wallet", "Auto-Debit"],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=75",
  },
  {
    id: 8,
    category: "Layanan",
    question: "Bisakah saya upgrade atau downgrade paket kapan saja?",
    answer:
      "Ya, perubahan paket dapat dilakukan kapan saja melalui dashboard akun kamu. Upgrade langsung aktif dalam waktu 24 jam. Downgrade akan berlaku di siklus billing berikutnya. Tidak ada biaya administrasi untuk perubahan paket.",
    tags: ["Upgrade 24 Jam", "No Admin Fee", "Self-Service"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=75",
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060606;
    --line: rgba(255,255,255,0.08);
    --line-h: rgba(255,255,255,0.15);
    --text: #ececec;
    --text-2: rgba(236,236,236,0.42);
    --text-3: rgba(236,236,236,0.2);
    --text-4: rgba(236,236,236,0.1);
    --surf: rgba(255,255,255,0.025);
  }

  @font-face {
  font-family: "Stadium";
  src: url("../../public/themes/fonts/Stadium.ttf")
    format("opentype");
}

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── SECTION ── */
  .faq {
    position: relative;
    border-top: 1px solid var(--line);
    background:black;
  }

  /* Top header row (like "LET'S TALK →" area) */
  .faq-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 48px;
    border-bottom: 1px solid var(--line);
  }

  .faq-topbar-left {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.32em;
    color: var(--text-3); text-transform: uppercase;
  }

  .faq-talk-btn {
    display: flex; align-items: center; gap: 12px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--text-2); background: none;
    border: 1px solid var(--line-h); border-radius: 3px;
    padding: 12px 20px; cursor: pointer;
    transition: all 0.18s;
  }
  .faq-talk-btn:hover {
    border-color: rgba(255,255,255,0.3);
    color: var(--text);
    background: rgba(255,255,255,0.04);
  }

  /* Plus icon top-right (decorative, like reference) */
  .faq-plus-deco {
    font-size: 22px; color: var(--text-3); line-height: 1;
    user-select: none;
  }

  /* ── FAQ ROWS ── */
  .faq-list { }

  .faq-row {
    position: relative; overflow: hidden;
    cursor: pointer;
  }
  .faq-row:hover { 
    background:#eaeaea;
  
  }

  .faq-row:hover .faq-row-q{
  color:black;}

  .faq-row:hover .faq-row-num{
  color:black;
  }

  .faq-row.open{
  background:#eaeaea;
  }
  .faq-row.open .faq-row-q{
  color:black;
  }


  /* COLLAPSED: title bar */
  .faq-row-header {
    display: grid;
    border-top: 2px dotted #ffffffa1;

    grid-template-columns: 120px 1fr auto auto;
    align-items: center;
    padding: 28px 48px;
    gap: 0;
    min-height: 88px;
  }

  .faq-row-num {
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 800;
    color: white;
    letter-spacing: -0.02em;
    line-height: 1;
    transition: color 0.22s;
  }
  .faq-row.open .faq-row-num { color: var(--text-3); }

  .faq-row-q {
    font-size: clamp(18px, 2.2vw, 28px);
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    line-height: 1.15;
    padding-right: 32px;
    transition: color 0.2s;
  }

  

  .faq-row-cat {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--text-3);
    padding: 0 40px;
    white-space: nowrap;
    transition: color 0.2s;
    color: #ededed;
  }

  .faq-row:hover .faq-row-cat{
  color:black;
  }

  .faq-row.open .faq-row-cat { color: black; }

  .faq-row-icon {
    display: flex; align-items: center; justify-content: center;
    font-size: 38px; font-weight: 300; color: var(--text-3);
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                border-color 0.2s, color 0.2s;
    flex-shrink: 0;
    color: #eaeaea;

  }

  .faq-row:hover .faq-row-icon{
  color:black;
  }


  .faq-row.open .faq-row-icon {
    transform: rotate(45deg);
    border-color: rgba(255,255,255,0.25);
    color: #000;
  }

  /* EXPANDED panel */
  .faq-row-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.48s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .faq-row.open .faq-row-body { max-height: 600px; }

  .faq-row-inner {
    display: grid;
    grid-template-columns: 120px 1fr 1fr;
    gap: 0;
    padding: 0 48px 44px;
    background: #eaeaea;
    border-top: 1px solid var(--line);
    padding-top: 36px;
    color:black;
  }

  /* Left: tags */
  .faq-row-tags {
    display: flex; flex-direction: column; gap: 8px;
    padding-right: 24px;
  }

  .faq-tag-label {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.3em; color: var(--text-3);
    text-transform: uppercase; margin-bottom: 4px;
  }

  .faq-tag {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.12em;
    color: var(--text-3);
    border: 1px solid var(--line);
    border-radius: 3px; padding: 4px 9px;
    display: inline-block; width: fit-content;
    transition: border-color 0.2s, color 0.2s;
  }
  .faq-row.open .faq-tag {
    border-color: rgba(255,255,255,0.1);
    color: var(--text-2);
  }

  .faq-inner-faq{
  height:400px;
  width:100%;
  align-items:start;
  padding:0;
  margin:0;
  position:relative;
  }

  .faq-headline h1{
  font-family: 'Stadium', monospace;
  font-size: 35vw;
  color: #eaeaea;
  text-align:end;
  letter-spacing: 0.02em;
  position:relative;
  width:100%;
  flex:1;
  top:6rem;
  line-height: 0.4;
  transition: color 0.2s;
  }

  .faq-subline{
  flex:1;
  position:relative;
  top:-2rem;
  right:2.8rem;
  padding-right: 20px;
  text-align:end;
  font-size: 2.1vw;
  align-self: flex-end;
  color: #ffffffa1;
  }

  .faq-bottom-text h1{
  font-size: 195px;
  line-height:0.1;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.01em;
  text-align:start;
  line-height: .75;
  padding-right: 20px;
  transition: color 0.2s;
  }

  .faq-bottom-subtext{
  color: #ffffffa1;
  font-size: 17px;
  margin-left: 15px;
  
  margin-top: -55px;}

  .faq-bottom-buttons{
  position:relative;
  top:-9rem;
  left:-11rem;
  display:flex;
  height:120px;
  gap:10px;
  width:510px;
  flex-direction: column;
  }

  .faq-bottom-btn{
  font-weight: 600;
  letter-spacing: 2px ;
  flex:1;
  width:60%;
  z-index:1;
  overflow:hidden;
  background:black;
  position:relative;
  }

  .faq-bottom-btn.top{
  align-self:flex-end;
  }

  .faq-bottom-btn.bottom{
  align-self:flex-start;
  }
  
  .faq-bottom-btn::before{
  content:"";
  left:0;
  top:0;
  position:absolute;
  width:100%;
  height:100%;
  background:white;
  
  opacity:1;
  z-index:-1;
  tranform-origin:bottom;
  transform:translateY(-120%);
  transition:transform 0.3s ease;
  }

  .faq-bottom-btn:hover::before{
  opacity:1;
  transform:translateY(0);
  transition:transform 0.3s ease;
  }

  .faq-bottom-btn:active{
  transform:translateY(2px) scale(0.98);
  box-shadow:inset 0 3px 8px rgba(0,0,0,0.6);
}

  .faq-bottom-btn:hover{
  color:black;
  }

  /* Middle: answer text */
  .faq-row-answer { padding: 0 40px 0 0; }

  .faq-ans-text{
  }

  .faq-ans-label {
    font-fa mily: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.3em; color: var(--text-3);
    text-transform: uppercase; margin-bottom: 14px;
  }

  .faq-ans-text {
    font-family: 'sora', monospace;
    font-size: clamp(15px, 1.1vw, 13px);
    letter-spacing: 0.04em; color: var(--text-2);
    line-height: 1.85;
  color:black;

  }

  /* Right: image */
  .faq-row-img {
    overflow: hidden; border-radius: 2px;
    border: 1px solid var(--line);
    aspect-ratio: 16/10;
  }
  .faq-row-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: grayscale(20%) brightness(0.75);
    transition: filter 0.5s, transform 0.5s;
    display: block;
  }
  .faq-row.open .faq-row-img img {
    filter: grayscale(5%) brightness(0.9);
    transform: scale(1.03);
  }

  /* CTA row */
  .faq-row-cta-row {
    display: flex; align-items: center; gap: 12px;
    margin-top: 20px;
  }
  .faq-row-cta {
    font-family: 'DM Mono', monospace;
    font-weight: 600;
    font-size: 14px; letter-spacing: 0.18em; text-transform: uppercase;
    color: #eaeaea; background: black;
    border: 1px solid var(--line); border-radius: 3px;
    padding: 9px 16px; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all 0.18s;
  }
  .faq-row-cta:hover {
    border-color: black;
    color: black;
    background: rgba(0,0,0,0.04);
  }

  .faq-row-cta:active{
  transform:translateY(2px) scale(0.98);
}

    .faq-row.open .faq-row-num{
  color:black;
  }

  /* ── BOTTOM BAR ── */
  .faq-bottom {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 48px;
    border-top: 1px solid var(--line);
    flex-wrap: wrap; gap: 16px;
  }
  .faq-bottom-left {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; color: var(--text-3);
    text-transform: uppercase;
  }
  .faq-bottom-stats {
    display: flex; align-items: center; gap: 24px;
  }
  .faq-bstat {
    text-align: center;
  }
  .faq-bstat-num {
    font-size: 20px; font-weight: 800; color: var(--text-2);
    letter-spacing: -0.01em; line-height: 1;
  }
  .faq-bstat-label {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.22em; color: var(--text-3);
    text-transform: uppercase; margin-top: 3px;
  }
  .faq-bstat-div { width: 1px; height: 28px; background: var(--line); }
`;

export function FAQSection() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <style>{CSS}</style>
      <section className="faq">
        {/* <div className="faq-topbar">
          <div className="faq-topbar-left">
            Veloxity · FAQ · Pertanyaan Umum
          </div>
          <button className="faq-talk-btn">Hubungi Support &nbsp;→</button>
          <div className="faq-plus-deco">+</div>
        </div> */}
        <div className="faq-inner-faq">
          <div className="faq-subline">
            Answers to our most frequent inquiries
          </div>
          <div className="faq-headline">
            <h1>QUESTION.</h1>
          </div>
        </div>

        {/* Rows */}
        <div className="faq-list">
          {FAQS.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-row ${isOpen ? "open" : ""}`}
                onClick={() => toggle(faq.id)}
              >
                {/* Header (always visible) */}
                <div className="faq-row-header">
                  <div className="faq-row-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="faq-row-q">{faq.question}</div>
                  <div className="faq-row-cat">{faq.category}</div>
                  <div className="faq-row-icon">+</div>
                </div>

                {/* Expanded body */}
                <div className="faq-row-body">
                  <div
                    className="faq-row-inner"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Tags column */}
                    <div className="faq-row-tags"></div>

                    {/* Answer column */}
                    <div className="faq-row-answer">
                      <p className="faq-ans-text">{faq.answer}</p>
                      <div className="faq-row-cta-row">
                        <button className="faq-row-cta">
                          Butuh bantuan lebih? &nbsp;→
                        </button>
                      </div>
                    </div>

                    {/* Image column */}
                    {/* <div className="faq-row-img">
                      <img src={faq.img} alt={faq.question} loading="lazy" />
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="faq-bottom">
          {/* <div className="faq-bottom-left">
            Masih ada pertanyaan lain? Hubungi tim kami kapan saja.
          </div>
          <div className="faq-bottom-stats">
            <div className="faq-bstat">
              <div className="faq-bstat-num">{FAQS.length}</div>
              <div className="faq-bstat-label">Pertanyaan</div>
            </div>
            <div className="faq-bstat-div" />
            <div className="faq-bstat">
              <div className="faq-bstat-num">24/7</div>
              <div className="faq-bstat-label">Support</div>
            </div>
            <div className="faq-bstat-div" />
            <div className="faq-bstat">
              <div className="faq-bstat-num">&lt;15m</div>
              <div className="faq-bstat-label">Respons</div>
            </div>
          </div> */}
          <div className="faq-bottom-text">
            <h1>Need More Help?</h1>
          </div>
          <div className="faq-bottom-subtext">
            Connect with our technical advisors.
          </div>
          <div className="faq-bottom-buttons">
            <button className="faq-bottom-btn top">MORE QUESTIONS</button>
            <button className="faq-bottom-btn bottom">CONTACT SUPPORT</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQSection;
