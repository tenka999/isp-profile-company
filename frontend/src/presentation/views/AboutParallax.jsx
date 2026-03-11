import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function AboutDesign() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  // Different parallax speeds
  const title1Y = useTransform(scrollYProgress, [0, 1], [400, -300]);
  const title2Y = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const title3Y = useTransform(scrollYProgress, [1.5, 0], [200, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const fadedY = useTransform(scrollYProgress, [1, 0], [50, -100]);
  const fadedY1 = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const fadedY2 = useTransform(scrollYProgress, [0, 1], [100, -150]);
  const subtextY = useTransform(scrollYProgress, [0, 1], [300, -100]);
  const numberY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  return (
    <section ref={ref} className="about-design">
      {/* MAIN TITLES */}
      <motion.div style={{ x: title1Y }} className="about-design-title satu">
        A NETWORK
      </motion.div>

      <motion.div style={{ x: title2Y }} className="about-design-title dua">
        <p
          style={{
            transform: "translateX(100px)",
          }}
        >
          THAT FEELS
        </p>
      </motion.div>

      <motion.div style={{ x: title3Y }} className="about-design-title tiga">
        RIGHT
      </motion.div>

      {/* IMAGE */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="about-design-image"
      >
        <img
          src="/layout/background/cinematic look.webp"
          alt="About Fiberix"
          className="about-design-img"
        />
      </motion.div>

      {/* FADED TEXT */}
      <motion.div style={{ x: fadedY }} className="about-design-faded div5">
        / NOT
      </motion.div>

      <motion.div style={{ x: fadedY1 }} className="about-design-faded div8">
        JUST
      </motion.div>

      <motion.div style={{ x: fadedY2 }} className="about-design-faded div9">
        INTERNET
      </motion.div>

      {/* SUBTEXT */}
      <motion.div style={{ x: subtextY }} className="about-design-subtext">
        FIBERIX DELIVERS HIGH-PERFORMANCE FIBER CONNECTIVITY DESIGNED FOR SPEED,
        STABILITY, AND SEAMLESS DIGITAL LIVING.
      </motion.div>

      {/* NUMBER */}
      <motion.div style={{ y: numberY }} className="div7">
        7
      </motion.div>
    </section>
  );
}
