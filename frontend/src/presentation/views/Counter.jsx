import { animate, useInView, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Counter({ value, duration = 2 }) {
  const ref = useRef(null);

  // IMPORTANT: once:false supaya replay
  const isInView = useInView(ref, {
    margin: "-100px",
    once: false,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    setCount(0);

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(latest.toFixed(0));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="counter"
    >
      {count}
    </motion.span>
  );
}
