import { useFadeSectionOnce } from "@/hooks/useFadeInOnce";
import { useNavigate } from "react-router";
const PrincingSection = () => {
  const navigate = useNavigate();
  return (
    <section className="pricing fade-section" ref={useFadeSectionOnce()}>
      <div className="pricing-header">
        <h1 className="pricing-head-title">
          P
          <span>
            <div className="">R</div>
            <div className="">I</div>
            <div className="">C</div>
            <div className="">I</div>
            <div className="">N</div>
          </span>
          G
        </h1>
      </div>
      <div className="pricing-container">
        <div className="pricing-card">
          <div className="pricing-plan">Starter Plan</div>
          <div className="box-content">
            <p className="pricing-title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              aperiam?
            </p>
            <div className="pricing-banner">
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">29</span>
                <span className="period">/month</span>
              </div>
              <button className="pricing-btn">GET STARTED</button>
            </div>
          </div>
          <div className="benefit">
            <ul className="features">
              <li>100 Mbps download speed</li>
              <li>10 Mbps upload speed</li>
              <li>Unlimited data usage</li>
              <li>24/7 customer support</li>
              <li>Free modem rental</li>
              <li>No contracts required</li>
            </ul>
          </div>
        </div>

        <div className="pricing-card border-hot" data-text="Pro Plan">
          <div className="pricing-plan">Pro Plan</div>
          <div className="box-content ">
            <span className="hot">Best Seller</span>
            <p className="pricing-title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              aperiam?
            </p>
            <div className="pricing-banner">
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">59</span>
                <span className="period">/month</span>
              </div>
              <button className="pricing-btn">GET STARTED</button>
            </div>
          </div>
          <div className="benefit">
            <ul className="features">
              <li>500 Mbps download speed</li>
              <li>50 Mbps upload speed</li>
              <li>Unlimited data usage</li>
              <li>Priority 24/7 support</li>
              <li>Free router upgrade</li>
              <li>No contracts required</li>
            </ul>
          </div>
        </div>

        <div className="pricing-card" data-text="Enterprise Plan">
          <div className="pricing-plan">Entreprise Plan</div>
          <div className="box-content">
            <p className="pricing-title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              aperiam?
            </p>
            <div className="pricing-banner">
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">99</span>
                <span className="period">/month</span>
              </div>
              <button className="pricing-btn">GET STARTED</button>
            </div>
          </div>
          <div className="benefit">
            <ul className="features">
              <li>1 Gbps download speed</li>
              <li>100 Mbps upload speed</li>
              <li>Unlimited data usage</li>
              <li>Dedicated support team</li>
              <li>Premium equipment</li>
              <li>Custom SLA available</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pricing-footer">
        <button className="learn-more-btn" onClick={() => navigate("/pricing")}>
          <span className="btn-text">See More</span>
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
    </section>
  );
};

export default PrincingSection;
