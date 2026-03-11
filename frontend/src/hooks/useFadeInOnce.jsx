import { useEffect, useRef } from "react";

export function useFadeSectionOnce() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const waitForImages = async () => {
      const images = el.querySelectorAll("img");

      await Promise.all(
        [...images].map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => (img.onload = res)),
        ),
      );

      el.classList.add("show");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          waitForImages();
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
