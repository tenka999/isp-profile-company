import { useState } from "react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      number: "01",
      title: "Create account",
      description:
        "Sign up in minutes with your email and basic information. No credit card required to get started.",
      icon: "👤",
      link: "Learn more",
    },
    {
      id: 2,
      number: "02",
      title: "Choose your plan",
      description:
        "Select the perfect internet package for your needs. Compare speeds, prices, and features easily.",
      icon: "📋",
      link: "View plans",
    },
    {
      id: 3,
      number: "03",
      title: "Schedule installation",
      description:
        "Pick a convenient time for our technicians to visit. Same-day installation available in most areas.",
      icon: "📅",
      link: "Check availability",
    },
    {
      id: 4,
      number: "04",
      title: "Get connected",
      description:
        "Our professionals will install and configure everything. Start enjoying high-speed internet immediately.",
      icon: "🚀",
      link: "Start now",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #000;
          color: #fff;
        }

        .how-it-works-section {
          min-height: 100vh;
          padding: 80px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        .how-it-works-container {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 100px;
          align-items: center;
        }

        /* Left Side - Phone Mockup */
        .phone-mockup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .phone-mockup {
          width: 340px;
          height: 680px;
          background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
          border-radius: 50px;
          padding: 14px;
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.8),
            inset 0 0 0 2px rgba(255, 255, 255, 0.2);
          position: relative;
        }

        .phone-notch {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 140px;
          height: 32px;
          background: #000;
          border-radius: 0 0 20px 20px;
          z-index: 2;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: #0d0d0d;
          border-radius: 38px;
          overflow: hidden;
          position: relative;
          padding: 60px 30px 40px;
        }

        .phone-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .phone-step-indicator {
          display: flex;
          gap: 8px;
          margin-bottom: 40px;
          justify-content: center;
        }

        .step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .step-dot.active {
          width: 24px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.8);
        }

        .phone-icon {
          font-size: 48px;
          margin-bottom: 30px;
          text-align: center;
        }

        .phone-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          text-align: center;
        }

        .phone-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .phone-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: auto;
        }

        .phone-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .phone-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .phone-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px 16px;
          color: #fff;
          font-size: 14px;
          outline: none;
        }

        .phone-button {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          border-radius: 8px;
          padding: 14px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }

        /* Right Side - Steps */
        .steps-content {
          display: flex;
          flex-direction: column;
        }

        .steps-header {
          margin-bottom: 48px;
        }

        .steps-subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }

        .steps-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 28px 32px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .step-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 1);
          transform: translateX(8px);
        }

        .step-card:hover::before {
          opacity: 1;
        }

        .step-card.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .step-card.active::before {
          opacity: 0;
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 12px;
        }

        .step-number {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          min-width: 30px;
        }

        .step-title {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          flex: 1;
        }

        .step-arrow {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .step-card:hover .step-arrow {
          background: rgba(255, 255, 255, 0.15);
          transform: translateX(4px);
        }

        .step-arrow::after {
          content: '→';
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
        }

        .step-description {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          padding-left: 50px;
          margin-bottom: 8px;
        }

        .step-link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          padding-left: 50px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.3s ease;
        }

        .step-link:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .step-link::after {
          content: '›';
          font-size: 18px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .how-it-works-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .phone-mockup-container {
            order: 2;
          }

          .steps-content {
            order: 1;
          }

          .steps-title {
            font-size: 40px;
          }
        }

        @media (max-width: 640px) {
          .how-it-works-section {
            padding: 60px 20px;
          }

          .phone-mockup {
            width: 300px;
            height: 600px;
          }

          .steps-title {
            font-size: 32px;
          }

          .step-card {
            padding: 24px;
          }

          .step-title {
            font-size: 18px;
          }

          .step-description,
          .step-link {
            padding-left: 0;
          }

          .step-header {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="how-it-works-section">
        <div className="how-it-works-container">
          {/* Left Side - Phone Mockup */}
          <div className="phone-mockup-container">
            <div className="phone-mockup">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="phone-content">
                  <div className="phone-step-indicator">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`step-dot ${activeStep === index ? "active" : ""}`}
                      />
                    ))}
                  </div>

                  <div className="phone-icon">{steps[activeStep].icon}</div>
                  <h3 className="phone-title">{steps[activeStep].title}</h3>
                  <p className="phone-description">
                    {steps[activeStep].description}
                  </p>

                  {activeStep === 0 && (
                    <div className="phone-form">
                      <div className="phone-input-group">
                        <label className="phone-label">Email address</label>
                        <input
                          type="email"
                          className="phone-input"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="phone-input-group">
                        <label className="phone-label">Full name</label>
                        <input
                          type="text"
                          className="phone-input"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="phone-input-group">
                        <label className="phone-label">Phone number</label>
                        <input
                          type="tel"
                          className="phone-input"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <button className="phone-button">Continue</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="steps-content">
            <div className="steps-header">
              <p className="steps-subtitle">
                Getting connected to our fiber network is a straightforward
                process.
              </p>
              <h2 className="steps-title">Simple Connection</h2>
            </div>

            <div className="steps-list">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`step-card ${activeStep === index ? "active" : ""}`}
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => {
                    (setActiveStep(index), console.log("hover", index));
                  }}
                >
                  <div className="step-header">
                    <div className="step-number">{step.number}</div>
                    <div className="step-title">{step.title}</div>
                    <div className="step-arrow"></div>
                  </div>
                  <p className="step-description">{step.description}</p>
                  <span className="step-link">{step.link}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
