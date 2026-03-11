// presentation/views/ScrollToTop.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const location = useLocation();
  const scrollAttempted = useRef(false);

  useEffect(() => {
    // Reset flag saat location berubah
    scrollAttempted.current = false;
  }, [location]);

  useEffect(() => {
    // Fungsi untuk mencoba scroll dengan Lenis
    const tryScrollWithLenis = () => {
      if (window.lenis && typeof window.lenis.scrollTo === "function") {
        try {
          window.lenis.scrollTo(0, {
            immediate: true,
            force: true, // Memaksa scroll jika ada
          });
          console.log("Scroll dengan Lenis berhasil");
          return true;
        } catch (error) {
          console.log("Gagal scroll dengan Lenis:", error);
          return false;
        }
      }
      return false;
    };

    // Fungsi untuk mencoba scroll biasa
    const tryNormalScroll = () => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant", // atau 'auto'
        });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        console.log("Scroll normal berhasil");
        return true;
      } catch (error) {
        console.log("Gagal scroll normal:", error);
        return false;
      }
    };

    // Coba scroll dengan berbagai metode
    const attemptScroll = () => {
      if (scrollAttempted.current) return;

      scrollAttempted.current = true;

      // Coba dengan Lenis dulu
      if (!tryScrollWithLenis()) {
        // Fallback ke normal scroll
        tryNormalScroll();
      }
    };

    // Coba segera
    attemptScroll();

    // Coba lagi setelah beberapa delay (untuk memastikan Lenis sudah siap)
    const timeouts = [50, 100, 200, 500];
    timeouts.forEach((delay) => {
      setTimeout(attemptScroll, delay);
    });

    // Observer untuk mendeteksi ketika Lenis tersedia
    const checkLenisInterval = setInterval(() => {
      if (window.lenis && !scrollAttempted.current) {
        attemptScroll();
        clearInterval(checkLenisInterval);
      }
    }, 50);

    return () => {
      clearInterval(checkLenisInterval);
      timeouts.forEach((delay) => clearTimeout(delay));
    };
  }, [location.pathname]); // Trigger saat pathname berubah

  return null;
}
