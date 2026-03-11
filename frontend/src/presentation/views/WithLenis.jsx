// presentation/views/withLenis.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function withLenis(WrappedComponent) {
  return function WithLenisComponent(props) {
    const location = useLocation();

    useEffect(() => {
      // Fungsi untuk memastikan Lenis scroll ke atas
      const scrollToTop = () => {
        if (window.lenis) {
          console.log("Scroll dengan Lenis berhasil di:", location.pathname);
          window.lenis.scrollTo(0, {
            immediate: true,
            force: true,
          });
        } else {
          console.log("Lenis tidak tersedia di:", location.pathname);
          // Fallback
          window.scrollTo(0, 0);
        }
      };

      // Scroll segera
      scrollToTop();

      // Scroll setelah Lenis siap (dengan delay)
      const timeoutId = setTimeout(scrollToTop, 100);

      return () => clearTimeout(timeoutId);
    }, [location.pathname]);

    return <WrappedComponent {...props} />;
  };
}
