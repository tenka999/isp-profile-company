import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function WhyChoose() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // tolerance dipersempit
    offset: ["start 80%", "end 10%"],
  });

  // WHY reveal
  const whyClip = useTransform(
    scrollYProgress,
    [0.15, 0.35],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  // CHOOSE reveal
  const chooseClip = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  // US reveal
  const usClip = useTransform(
    scrollYProgress,
    [0.35, 0.57],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  // Arrow move setelah US selesai
  const arrowX = useTransform(scrollYProgress, [0.55, 0.75], [0, 250]);
  const arrowY = useTransform(scrollYProgress, [0.55, 0.75], [0, 200]);
  const arrowChoose = useTransform(scrollYProgress, [0.25, 0.6], [200, 0]);

  return (
    <section
      ref={ref}
      style={{
        height: "110vh",
        background: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 5vw",
        width: "100%",
      }}
    >
      <div>
        <RevealText clip={whyClip}>WHY</RevealText>

        <motion.div
          style={{
            x: arrowChoose,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
          }}
        >
          <RevealText clip={chooseClip}>
            <p
              style={{
                transform: "translateX(100px)",
                display: "inline-block",
                width: "1000px",
              }}
            >
              CHOOSE
            </p>
          </RevealText>
        </motion.div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <motion.div
            style={{
              x: arrowY,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
            }}
          >
            <RevealText clip={usClip}>US</RevealText>
          </motion.div>

          <motion.div
            style={{
              x: arrowX,
              width: "70px",
              height: "70px",
              background: "#6C3EFF",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
            }}
          >
            →
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RevealText({ children, clip }) {
  return (
    <div>
      <motion.h1
        style={{
          clipPath: clip,
          fontSize: "8rem",
          fontWeight: 800,
          margin: 0,
          lineHeight: 1.05,
        }}
      >
        {children}
      </motion.h1>
    </div>
  );
}
