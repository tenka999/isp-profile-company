import { useEffect, useState } from "react";

export function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 50);
      setScrollUp(currentY < lastY);

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrolled, scrollUp };
}

export default useScrollState;
