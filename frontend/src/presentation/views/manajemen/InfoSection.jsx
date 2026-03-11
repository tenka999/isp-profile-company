import React from 'react';

const InfoSection = () => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      label: 'f', 
      url: '#',
      icon: null 
    },
    { 
      name: 'Instagram', 
      label: null,
      url: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      label: null,
      url: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      label: null,
      url: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      )
    }
  ];

  return (
    <div className="info-section">
      <div className="info-wrapper">
        <div className="info-block">
          <h3>Our Address</h3>
          <p>
            123456 Jakarta<br />
            Lane Sudirman<br />
            building 47 office 202
          </p>
        </div>

        <div className="info-block">
          <h3>Our Contacts</h3>
          <p>
            <a href="mailto:hello@fiberix.com">hello@fiberix.com</a><br />
            <a href="tel:+628001234567">+62 800 123 45 67</a>
          </p>
        </div>

        <div className="social-section">
          <span className="social-label">— follow us</span>
          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="social-icon"
                aria-label={social.name}
              >
                {social.icon ? social.icon : social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
