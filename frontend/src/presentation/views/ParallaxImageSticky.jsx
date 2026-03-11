import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import "@/styles/ParallaxImageSticky.css";
export default function CinematicParallax() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Image parallax
  const image1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const image2Y = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const image3Y = useTransform(scrollYProgress, [0, 0.1], [0, -20]);
  const textOpacity = useTransform(scrollYProgress, [0, 3], [1, 0]);
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textOpacity2 = useTransform(scrollYProgress, [0, 1.1], [1, 0]);
  const textOpacity3 = useTransform(scrollYProgress, [0, 1.8], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 2], [1, 0]);
  const scaleImage2 = useTransform(scrollYProgress, [0, 3], [1, 0]);
  const scaleImage3 = useTransform(scrollYProgress, [0, 4], [1, 0]);

  return (
    <section ref={ref} className="cinematic-section">
      {/* STICKY BIG TEXT */}
      <div className="sticky-wrapper">
        <motion.div style={{ opacity: textOpacity }} className="">
          <h1 className="big-text">THE TECH</h1>
        </motion.div>
      </div>

      {/* IMAGES */}
      <div className="images-wrapper">
        <motion.div style={{ opacity: textOpacity1 }}>
          <div className="image-text-description">
            <h1 className="big-text">FIBER TO HOME</h1>
            <p>
              Powered by pure FTTH infrastructure — delivering true fiber speed
              directly to your home.
            </p>
          </div>
        </motion.div>
        <motion.div
          style={{ y: image1Y, scale: scaleImage }}
          className="image image-1"
        >
          <img src="/layout/background/cinematic look.webp" alt="" />
        </motion.div>

        <motion.div style={{ opacity: textOpacity2 }}>
          <div className="image-text-description right">
            <h1 className="big-text">GPON</h1>
            <p>
              Built on advanced GPON architecture for consistent, high-capacity
              connectivity.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ y: image2Y, scale: scaleImage2 }}
          className="image image-2"
        >
          <img src="/layout/background/server-center.webp" alt="" />
        </motion.div>

        <motion.div style={{ opacity: textOpacity3 }}>
          <div className="image-text-description ">
            <h1 className="big-text">IPv6 Ready Network</h1>
            <p>
              Future-ready IPv6 network ensuring limitless scalability and
              security.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ y: image3Y, scale: scaleImage3 }}
          className="image image-3"
        >
          <img src="/layout/background/hero-about-image.jpg" alt="" />
        </motion.div>
      </div>
    </section>
  );
}
