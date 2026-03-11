import { useEffect, useRef, useState } from "react";

export function useTypingOnView(text, speed = 60) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isVisible || done) return;

    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setDone(true);
    }
  }, [isVisible, index, text, speed, done]);

  return { ref, displayText, isVisible, done };
}
